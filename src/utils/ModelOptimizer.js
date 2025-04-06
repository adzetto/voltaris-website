import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

/**
 * Optimized model loader with DRACO compression support
 * Provides performance optimizations for loading 3D models
 */
export const loadOptimizedModel = (modelPath, onProgress = () => {}, onError = () => {}) => {
  return new Promise((resolve, reject) => {
    try {
      // Set up DRACO loader for decompression
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      dracoLoader.setDecoderConfig({ type: 'js' }); // Use JS decoder for wider compatibility
      
      // Set up GLTF loader with DRACO support
      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);
      
      // Load the model with progress tracking
      gltfLoader.load(
        modelPath,
        (gltf) => {
          const modelScene = gltf.scene.clone();
          
          // Performance optimizations
          modelScene.traverse((child) => {
            if (child.isMesh) {
              // Disable matrixAutoUpdate for static objects
              child.matrixAutoUpdate = false;
              child.updateMatrix();
              
              // Optimize shadow settings - only enable for larger objects
              const boundingBox = new THREE.Box3().setFromObject(child);
              const size = boundingBox.getSize(new THREE.Vector3());
              const maxDimension = Math.max(size.x, size.y, size.z);
              
              // Only allow larger objects to cast shadows
              child.castShadow = maxDimension > 0.5;
              child.receiveShadow = true;
              
              // Optimize materials
              if (child.material) {
                // Set proper texture filtering
                if (child.material.map) {
                  child.material.map.anisotropy = 4; // Good balance between quality and performance
                  child.material.map.minFilter = THREE.LinearFilter;
                  child.material.map.needsUpdate = true;
                }
                
                // Disable expensive material properties for better performance
                child.material.envMapIntensity = 0.8;
                child.material.needsUpdate = true;
              }
            }
          });
          
          // Center and scale the model
          const box = new THREE.Box3().setFromObject(modelScene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          modelScene.position.x = -center.x;
          modelScene.position.y = -center.y;
          modelScene.position.z = -center.z;
          
          // Scale model to fit view
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxDim;
          modelScene.scale.set(scale, scale, scale);
          
          resolve(modelScene);
          
          // Dispose of the DRACO loader to free memory
          dracoLoader.dispose();
        },
        // Progress callback
        (xhr) => {
          if (xhr.lengthComputable) {
            const progress = (xhr.loaded / xhr.total) * 100;
            onProgress(progress);
          }
        },
        // Error callback
        (error) => {
          console.error('Error loading 3D model:', error);
          onError(error);
          reject(error);
        }
      );
    } catch (error) {
      console.error('Error initializing model loader:', error);
      onError(error);
      reject(error);
    }
  });
};

/**
 * Creates a Level-of-Detail (LOD) version of the model
 * This allows different detail levels based on camera distance
 */
export const createLODModel = (highDetailModel, distances = [0, 10, 20]) => {
  // Create a new LOD object
  const lod = new THREE.LOD();
  
  // Add the high detail model as the closest level
  lod.addLevel(highDetailModel, distances[0]);
  
  // Create medium and low detail models by simplifying the geometry
  const mediumDetailModel = highDetailModel.clone();
  const lowDetailModel = highDetailModel.clone();
  
  // Simplify materials for medium distance
  mediumDetailModel.traverse((child) => {
    if (child.isMesh) {
      if (child.material) {
        // Create a simplified material
        const simplifiedMaterial = new THREE.MeshPhongMaterial({
          color: child.material.color || new THREE.Color(0x888888),
          shininess: 50,
        });
        
        if (child.material.map) {
          simplifiedMaterial.map = child.material.map;
        }
        
        child.material = simplifiedMaterial;
      }
    }
  });
  
  // Simplify materials further for low distance
  lowDetailModel.traverse((child) => {
    if (child.isMesh) {
      // Create a simple Lambert material for distant objects
      const simpleMaterial = new THREE.MeshLambertMaterial({
        color: child.material.color || new THREE.Color(0x888888),
      });
      
      child.material = simpleMaterial;
      child.castShadow = false; // Disable shadows for distant objects
    }
  });
  
  // Add the medium and low detail models
  lod.addLevel(mediumDetailModel, distances[1]);
  lod.addLevel(lowDetailModel, distances[2]);
  
  return lod;
};

/**
 * Preload models in the background to improve perceived performance
 */
export const preloadModels = (modelPaths = [], onComplete = () => {}) => {
  // Set up DRACO loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  
  // Create GLTF loader with DRACO support
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  
  let loadedCount = 0;
  
  // Load each model in sequence
  modelPaths.forEach(path => {
    gltfLoader.load(
      path,
      () => {
        loadedCount++;
        if (loadedCount === modelPaths.length) {
          onComplete();
          dracoLoader.dispose(); // Clean up
        }
      },
      undefined,
      (error) => console.warn(`Preloading warning for ${path}:`, error)
    );
  });
};

/**
 * Model optimizer utilities for better performance
 * These utilities can be used to further optimize models at runtime
 */

/**
 * Simplifies geometry by reducing vertex count
 * @param {THREE.BufferGeometry} geometry - The geometry to simplify
 * @param {number} targetReduction - Target percentage to reduce (0.0-1.0)
 * @returns {THREE.BufferGeometry} Simplified geometry
 */
export const simplifyGeometry = (geometry, targetReduction = 0.5) => {
  if (!geometry) return null;
  
  // Create a temporary non-indexed version if needed
  let tempGeometry = geometry;
  if (geometry.index) {
    tempGeometry = geometry.toNonIndexed();
  }
  
  // Get vertices and calculate target count
  const positions = tempGeometry.getAttribute('position');
  const vertexCount = positions.count;
  const targetCount = Math.max(
    Math.floor(vertexCount * (1 - targetReduction)), 
    50 // Minimum vertex count
  );
  
  // For production use, you'd use an actual simplification library
  // This is a basic implementation for educational purposes
  if (vertexCount <= targetCount) {
    return geometry;
  }
  
  // Simple algorithm to skip vertices
  const ratio = vertexCount / targetCount;
  const indices = [];
  
  // Create simplified index array
  for (let i = 0; i < vertexCount; i += 3) {
    if (Math.floor(i / 3) % Math.round(ratio) === 0) {
      indices.push(i, i + 1, i + 2);
    }
  }
  
  // Create new buffer geometry with index
  const simplified = new THREE.BufferGeometry();
  simplified.setAttribute('position', positions);
  
  // Copy other attributes
  for (const key in tempGeometry.attributes) {
    if (key !== 'position') {
      simplified.setAttribute(key, tempGeometry.attributes[key]);
    }
  }
  
  // Add indices
  simplified.setIndex(indices);
  simplified.computeVertexNormals();
  
  return simplified;
};

/**
 * Creates Level of Detail (LOD) instances for a model
 * @param {THREE.Object3D} model - Original high-detail model
 * @returns {THREE.LOD} LOD object with multiple detail levels
 */
export const createLODFromModel = (model) => {
  if (!model) return null;
  
  const lod = new THREE.LOD();
  
  // Add original model as highest detail level
  const highDetail = model.clone();
  lod.addLevel(highDetail, 0);
  
  // Create medium detail version
  const mediumDetail = model.clone();
  mediumDetail.traverse((node) => {
    if (node.isMesh && node.geometry) {
      // Simplify geometry
      const simplifiedGeometry = simplifyGeometry(node.geometry, 0.3);
      node.geometry = simplifiedGeometry;
      
      // Simplify materials if complex
      if (node.material && node.material.map) {
        const newMaterial = new THREE.MeshPhongMaterial({
          map: node.material.map,
          color: node.material.color || 0xffffff,
          shininess: 30
        });
        node.material = newMaterial;
      }
      
      // Disable shadows for medium distance
      node.castShadow = false;
    }
  });
  lod.addLevel(mediumDetail, 10);
  
  // Create low detail version
  const lowDetail = model.clone();
  lowDetail.traverse((node) => {
    if (node.isMesh && node.geometry) {
      // Heavily simplify geometry
      const simplifiedGeometry = simplifyGeometry(node.geometry, 0.7);
      node.geometry = simplifiedGeometry;
      
      // Use basic materials for low detail
      const color = node.material.color ? node.material.color.getHex() : 0xffffff;
      node.material = new THREE.MeshLambertMaterial({ color });
      
      // Disable shadows completely
      node.castShadow = false;
      node.receiveShadow = false;
    }
  });
  lod.addLevel(lowDetail, 30);
  
  return lod;
};

/**
 * Creates a frustum culling optimized model
 * @param {THREE.Object3D} model - The model to optimize
 * @returns {THREE.Object3D} Optimized model
 */
export const createFrustumCulledModel = (model) => {
  if (!model) return null;
  
  const optimized = model.clone();
  
  // Add culling to all meshes
  optimized.traverse((node) => {
    if (node.isMesh) {
      node.frustumCulled = true;
      
      // Calculate custom bounding sphere for better culling
      if (node.geometry) {
        node.geometry.computeBoundingSphere();
        node.geometry.boundingSphere.radius *= 1.1; // Add a small buffer
      }
    }
  });
  
  return optimized;
};

/**
 * Setup optimizers - This should be called once at the start of the application
 */
export const setupOptimizers = () => {
  // Cache common geometries to reduce memory usage
  THREE.Cache.enabled = true;
};

export default {
  loadOptimizedModel,
  createLODModel,
  preloadModels,
  simplifyGeometry,
  createLODFromModel,
  createFrustumCulledModel,
  setupOptimizers
}; 