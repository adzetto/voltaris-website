import React, { Suspense, useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  PerspectiveCamera,
  Float,
  SpotLight,
  Preload,
  Html,
  Bvh,
  BakeShadows
} from '@react-three/drei';
import * as THREE from 'three';
import { loadOptimizedModel } from '../../utils/ModelOptimizer';

/**
 * @file Advanced 3D Model Viewer with physically-based rendering
 * @description High-fidelity visualization component with optimized performance 
 * and photorealistic materials for academic/technical visualization
 * @version 2.1.0
 */

// Helper for creating custom car paint colors
const CAR_COLORS = {
  RED: new THREE.Color('#d81937'),        // Bright red
  BLUE: new THREE.Color('#004a9e'),       // Deep blue
  BLACK: new THREE.Color('#121212'),      // Near black
  SILVER: new THREE.Color('#c5c8d0'),     // Metallic silver
  WHITE: new THREE.Color('#f2f3f5'),      // Pearl white
  GRAY: new THREE.Color('#303234'),       // Gunmetal gray
  YELLOW: new THREE.Color('#ffb81c'),     // Racing yellow
  GREEN: new THREE.Color('#01644a')       // Racing green
};

// Loading indicator component
const LoadingIndicator = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-5 rounded-lg border border-gray-800">
      <div className="w-12 h-12 border-2 border-t-red-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-3"></div>
      <div className="text-white text-sm font-medium">Yükleniyor...</div>
    </div>
  </Html>
);

// Enhanced lighting setup
function EnhancedPBRLighting() {
  // Reference for main light
  const keyLightRef = useRef();
  
  // Subtle light animation
  useFrame(({ clock }) => {
    if (keyLightRef.current) {
      const t = clock.elapsedTime * 0.1;
      keyLightRef.current.position.x = 5 + Math.sin(t) * 0.2;
      keyLightRef.current.position.z = Math.cos(t) * 0.2;
    }
  });
  
  return (
    <>
      {/* Key light - main illumination */}
      <SpotLight 
        ref={keyLightRef}
        position={[5, 5, 0]} 
        angle={0.5} 
        penumbra={0.8} 
        intensity={1.0} 
        distance={20}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[1024, 1024]}
        color="#ffffff"
      />
      
      {/* Fill light - softer secondary illumination */}
      <SpotLight 
        position={[-5, 3, 0]} 
        angle={0.7} 
        penumbra={0.5} 
        intensity={0.5} 
        castShadow={false}
        color="#a0c0ff"
      />
      
      {/* Rim light - edge highlight */}
      <SpotLight 
        position={[0, 5, -5]} 
        angle={0.5} 
        penumbra={0.5} 
        intensity={0.7} 
        castShadow={false}
        color="#ffe0b0"
      />
      
      {/* Ambient light - base illumination */}
      <ambientLight intensity={0.1} />
    </>
  );
}

// Reflective floor
function ReflectiveFloor() {
  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -1.7, 0]} 
      receiveShadow
    >
      <planeGeometry args={[30, 30, 1, 1]} />
      <meshStandardMaterial
        color="#050505"
        metalness={0.8}
        roughness={0.3}
        envMapIntensity={1.0}
      />
    </mesh>
  );
}

// Optimized car model with performance enhancements
function OptimizedCarModel() {
  const modelPath = process.env.PUBLIC_URL + '/models/model_3d.gltf';
  const groupRef = useRef();
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hovered, setHovered] = useState(false);
  
  // Define our primary car color - Bright red is default
  const primaryColor = CAR_COLORS.RED;
  
  useEffect(() => {
    let isMounted = true;
    console.log("Loading optimized model...");

    const loadModel = async () => {
      try {
        const optimizedModel = await loadOptimizedModel(
          modelPath,
          (progress) => {
            console.log(`Loading model: ${progress.toFixed(1)}%`);
          }
        );
        
        if (isMounted) {
          // Apply materials and optimizations
          optimizedModel.traverse((child) => {
            if (child.isMesh) {
              // Enable high-quality mesh features
              child.frustumCulled = true;
              child.castShadow = true;
              child.receiveShadow = true;

              // Enhance geometry
              if (child.geometry) {
                child.geometry.computeVertexNormals();
              }

              // Apply realistic automotive materials
              if (child.material) {
                // Create a new material to avoid shared material issues
                let newMaterial;
                const materialName = child.material.name ? child.material.name.toLowerCase() : '';
                const objName = child.name ? child.name.toLowerCase() : '';
                
                // Determine material type from object/material name
                const isBody = objName.includes('body') || objName.includes('car') || 
                               objName.includes('chassis') || materialName.includes('body') ||
                               materialName.includes('paint') || materialName.includes('car');
                
                const isGlass = objName.includes('glass') || objName.includes('window') || 
                                objName.includes('windshield') || materialName.includes('glass');
                
                const isChrome = objName.includes('chrome') || objName.includes('metal') || 
                                 objName.includes('steel') || materialName.includes('chrome');
                
                const isInterior = objName.includes('interior') || objName.includes('seat') || 
                                   objName.includes('dash') || materialName.includes('interior');
                
                const isTire = objName.includes('tire') || objName.includes('wheel') || 
                               materialName.includes('rubber') || materialName.includes('tire');
                
                const isHeadlight = objName.includes('light') || objName.includes('lamp') || 
                                    materialName.includes('light');

                if (isBody) {
                  // Car body with glossy metallic paint
                  newMaterial = new THREE.MeshStandardMaterial({
                    color: primaryColor,
                    metalness: 0.9,
                    roughness: 0.15,
                    envMapIntensity: 2.0
                  });
                } else if (isGlass) {
                  // Window glass
                  newMaterial = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#203040'),
                    metalness: 0.8,
                    roughness: 0.1,
                    transparent: true,
                    opacity: 0.7,
                    envMapIntensity: 1.5
                  });
                } else if (isChrome) {
                  // Chrome trim
                  newMaterial = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#e8e8e8'),
                    metalness: 1.0,
                    roughness: 0.03,
                    envMapIntensity: 3.0
                  });
                } else if (isInterior) {
                  // Car interior
                  newMaterial = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#202020'),
                    metalness: 0.1,
                    roughness: 0.8
                  });
                } else if (isTire) {
                  // Tires
                  newMaterial = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#101010'),
                    metalness: 0.0,
                    roughness: 1.0
                  });
                } else if (isHeadlight) {
                  // Headlights
                  newMaterial = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#ffffff'),
                    emissive: new THREE.Color('#ffffe0'),
                    emissiveIntensity: 0.5,
                    metalness: 0.8,
                    roughness: 0.1
                  });
                } else {
                  // Default material for other parts
                  newMaterial = new THREE.MeshStandardMaterial({
                    color: child.material.color || new THREE.Color('#505050'),
                    metalness: 0.7,
                    roughness: 0.2
                  });
                }
                
                // Copy textures from original material if they exist
                if (child.material.map) {
                  newMaterial.map = child.material.map;
                  newMaterial.map.anisotropy = 16;
                }
                
                if (child.material.normalMap) {
                  newMaterial.normalMap = child.material.normalMap;
                }
                
                // Apply the new material
                child.material = newMaterial;
              }
            }
          });
          
          setModel(optimizedModel);
          setIsLoading(false);
          console.log("Model loaded successfully with enhanced materials");
        }
      } catch (error) {
        console.error('Failed to load model:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadModel();
    
    return () => {
      isMounted = false;
    };
  }, [primaryColor, modelPath]);

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  // Add a subtle continuous rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (hovered) {
        // Slower rotation when hovered
        groupRef.current.rotation.y += delta * 0.005;
      } else {
        // Normal rotation speed
        groupRef.current.rotation.y += delta * 0.01;
      }
    }
  });

  if (isLoading) {
    return null;
  }

  return (
    <group ref={groupRef}>
      {model && (
        <Bvh>
          <primitive 
            object={model} 
            scale={1} 
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          />
        </Bvh>
      )}
    </group>
  );
}

const EnhancedModelViewer = forwardRef((props, ref) => {
  const controlsRef = useRef();
  const cameraRef = useRef();
  const initialCameraPosition = [3.5, 1.8, 3.5];
  
  useImperativeHandle(ref, () => ({
    resetCamera: () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    },
    resetCameraView: () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    },
    rotateTo: (x, y, z) => {
      if (controlsRef.current) {
        controlsRef.current.setAzimuthalAngle(x);
        controlsRef.current.setPolarAngle(y);
        controlsRef.current.setRadius(z);
      }
    },
    focusOn: (position = [0, 0, 0]) => {
      if (controlsRef.current) {
        controlsRef.current.target.set(...position);
        controlsRef.current.update();
      }
    },
    setAutoRotate: (enabled) => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = enabled;
      }
    }
  }));
  
  const pixelRatio = Math.min(window.devicePixelRatio, 2.0);
  
  return (
    <div className="w-full h-full bg-black/90"> 
      <Canvas 
        shadows="soft"
        camera={{ position: initialCameraPosition, fov: 35 }}
        dpr={pixelRatio}
        gl={{ 
          antialias: true, 
          alpha: false,
          stencil: false,
          depth: true,
          powerPreference: "high-performance",
          precision: "highp",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap
          }
        }}
        style={{ background: 'radial-gradient(circle at 50% 70%, #080810 0%, #05050a 70%)' }}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <color attach="background" args={["#030305"]} />
          <fog attach="fog" args={["#030305", 15, 70]} />
          
          <PerspectiveCamera 
            ref={cameraRef}
            makeDefault 
            position={initialCameraPosition} 
            fov={35}
            near={0.1}
            far={100}
          />
          
          <EnhancedPBRLighting />
          
          <Float 
            speed={1}
            rotationIntensity={0}
            floatIntensity={0.1}
            floatingRange={[-0.05, 0.05]}
          >
            <OptimizedCarModel />
          </Float>
          
          <ContactShadows 
            position={[0, -1.6, 0]} 
            opacity={0.7} 
            scale={12} 
            blur={3.0} 
            far={5} 
            resolution={1024}
            smooth
            color="#000000"
            frames={1}
          />
          
          <ReflectiveFloor />
          
          <Environment preset="studio" background={false} />
          
          <BakeShadows />
          <Preload all />
        </Suspense>
        
        <OrbitControls 
          ref={controlsRef}
          camera={cameraRef.current}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.8}
          minDistance={1.8}
          maxDistance={8}
          zoomSpeed={0.5}
          rotateSpeed={0.5}
          dampingFactor={0.1}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
});

export default EnhancedModelViewer;