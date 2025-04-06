import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronDown, Menu, X, 
  ChevronRight, Cpu, Terminal, Camera, 
  GitMerge, Linkedin, Mail, Phone, Instagram, AlertTriangle, Navigation, Eye, Sun, CircuitBoard, 
  ArrowRight, BarChart, Activity, Zap, ChevronUp, PlusCircle, MinusCircle
} from "lucide-react";
import * as THREE from 'three';
import ExpandableSection from './components/ExpandableSection';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import TechnicalDataViz from './TechnicalDataViz';
import SponsorshipModal from './SponsorshipModal';
import teamData from './teamData';
import { TeamStats, SponsorShowcase } from './TeamComponents';
import { FlowingCircuitEntryAnimation, CircuitLoadingAnimation, ProfessionalOrgChart } from './components/new';
import AdasSystemArchitecture, { LaneDetectionDiagram, TrafficSignDetectionDiagram, CruiseControlSystemDiagram, BlindSpotDetectionDiagram } from './AdasSvgComponents';
import TechnicalModelViewer from './components/TechnicalModelViewer';
import EnhancedSponsorsBar from './components/EnhancedSponsorsBar';
import MobileMenuFallback from './components/MobileMenuFallback';
import './components/PlatinumStyles.css';
import './components/MobileMenu.css';
import './styles.css';
import './latex-styles.css';
import './advanced-latex.css';
import { useMouseTrail, useParallax, useScrollAnimation, useTechnicalSpecsAnimation } from './hooks/useInteractive';
import { setupOptimizers } from './utils/ModelOptimizer';
import { initMenuVisibilityController, updateMenuButtonVisibility } from './utils/MenuVisibilityController';
import { fixMobileMenuOnOpen, fixMobileMenuOnClose, fixTechnicalSubmenu, initMobileMenuFix } from './utils/MobileMenuFix';
import AckermannPrinciple from './components/AckermannPrinciple';
import ContactForm from './components/ContactForm';

// Initialize optimizers
setupOptimizers();

// Limit texture sizes for better performance
THREE.TextureLoader.prototype.crossOrigin = 'anonymous';
THREE.Cache.enabled = true;

// Set default pixel ratio for better performance
if (window.devicePixelRatio > 2) {
  // Create a temporary renderer to set pixel ratio
  const tempRenderer = new THREE.WebGLRenderer();
  tempRenderer.setPixelRatio(2); // Cap at 2x for better performance
  tempRenderer.dispose();
}

// ADAS Components Implementation
export const AdasFeatureCard = ({ title, description, icon, color = "red", imageUrl }) => {
  const colorClasses = {
    red: "from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-red-500",
    blue: "from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-blue-500"
  };
  
  return (
    <div className="bg-[#1a1b1e]/90 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700 h-full relative group">
      {/* Technical background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <div className="circuit-pattern w-full h-full"></div>
      </div>
      
      {/* Feature image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        <div className={`absolute top-4 right-4 p-2 rounded-full bg-black/50 ${color === 'red' ? 'text-red-500' : 'text-blue-500'}`}>
          {icon}
        </div>
      </div>
      
      <div className="p-6 relative z-10">
        <h4 className={`font-bold text-lg mb-3 ${color === 'red' ? 'text-red-500' : 'text-blue-500'}`}>{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        
        <div className={`w-0 group-hover:w-full h-0.5 bg-gradient-to-r ${colorClasses[color]} mt-4 transition-all duration-300 ease-in-out`}></div>
      </div>
    </div>
  );
};

export const AdasTechnicalDiagram = () => {
  return (
    <div className="bg-[#1c1d20]/70 backdrop-blur-sm p-6 rounded-lg border border-gray-700 relative overflow-hidden">
      {/* Circuit pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="circuit-pattern w-full h-full"></div>
      </div>
      
      <div className="relative z-10">
        <h4 className="text-xl font-bold mb-6 text-red-500">ADAS Sistem Mimarisi (Planlanan)</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1f2023]/70 backdrop-blur-sm p-4 rounded-lg border border-blue-900/30">
            <h5 className="text-blue-500 font-medium mb-2 flex items-center">
              <Terminal size={18} className="mr-2" />
              İşlem Birimi
            </h5>
            <ul className="text-sm text-gray-400 space-y-1">
              <li className="flex items-start">
                <div className="text-blue-500 mr-2">•</div>
                <div>Raspberry Pi 5 - 8GB RAM</div>
              </li>
              <li className="flex items-start">
                <div className="text-blue-500 mr-2">•</div>
                <div>Gerçek zamanlı görüntü işleme</div>
              </li>
              <li className="flex items-start">
                <div className="text-blue-500 mr-2">•</div>
                <div>STM32F407 ile CAN haberleşmesi</div>
              </li>
            </ul>
          </div>
          
          <div className="bg-[#1f2023]/70 backdrop-blur-sm p-4 rounded-lg border border-red-900/30">
            <h5 className="text-red-500 font-medium mb-2 flex items-center">
              <Camera size={18} className="mr-2" />
              Sensör Birimi
            </h5>
            <ul className="text-sm text-gray-400 space-y-1">
              <li className="flex items-start">
                <div className="text-red-500 mr-2">•</div>
                <div>1280x960 USB Kamera</div>
              </li>
              <li className="flex items-start">
                <div className="text-red-500 mr-2">•</div>
                <div>RD-03D Çoklu Nesne Algılama Radarı</div>
              </li>
              <li className="flex items-start">
                <div className="text-red-500 mr-2">•</div>
                <div>BH1750 Ortam Işığı Sensörü</div>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/30 via-black to-purple-900/20 p-6 rounded-lg border border-purple-900/30 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 mt-6">
              <div className="flex items-center mb-4">
                <div className="text-purple-500 mr-3">
                  <Sun size={24} />
                </div>
                <h3 className="text-xl font-bold text-purple-400">Otomatik Far Sistemi</h3>
              </div>
              <div className="latex-style-box bg-black/40 p-4 rounded-lg border border-purple-900/30">
                <div className="text-white math-formula purple-formula academic-formula">
                  <div className="formula-heading">Ortam Işığı Algılama</div>
                  <div className="formula-content">
                    <p>Sensör: BH1750 Ortam Işığı Modülü</p>
                    <p>Protokol: I<sup>2</sup>C Haberleşme</p>
                    <p>Eşik: I<sub>threshold</sub> = 10 lux</p>
                    <p>Kontrol İşlemi: L(I) = I &lt; I<sub>threshold</sub> ? "AÇIK" : "KAPALI"</p>
                  </div>
                  <div className="formula-parameters">Hassasiyet: 1-65535 lux | Çözünürlük: 1 lux</div>
                </div>
                <p className="text-gray-300 mt-3">
                  BH1750 ortam ışığı sensörü ile ortam karanlığı algılandığında otomatik olarak araç farları aktif edilir.
                </p>
              </div>
            </div>
        </div>
        
        {/* Connection diagram */}
        <div className="mt-8 relative">
          <svg className="w-full h-64" viewBox="0 0 800 200">
            {/* Central processing unit */}
            <rect x="350" y="80" width="100" height="50" rx="5" fill="none" stroke="#FF4254" strokeWidth="2" />
            <text x="400" y="110" className="text-sm" textAnchor="middle" fill="#FF4254">Raspberry Pi 5</text>
            
            {/* Left side inputs */}
            <rect x="100" y="30" width="120" height="30" rx="5" fill="none" stroke="#0044FF" strokeWidth="2" />
            <text x="160" y="50" className="text-sm" textAnchor="middle" fill="#0044FF">Kamera</text>
            <path d="M220 45 L350 90" stroke="#0044FF" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            
            <rect x="100" y="80" width="120" height="30" rx="5" fill="none" stroke="#0044FF" strokeWidth="2" />
            <text x="160" y="100" className="text-sm" textAnchor="middle" fill="#0044FF">Radar</text>
            <path d="M220 95 L350 105" stroke="#0044FF" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            
            <rect x="100" y="130" width="120" height="30" rx="5" fill="none" stroke="#0044FF" strokeWidth="2" />
            <text x="160" y="150" className="text-sm" textAnchor="middle" fill="#0044FF">Işık Sensörü</text>
            <path d="M220 145 L350 120" stroke="#0044FF" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            
            {/* Right side outputs */}
            <rect x="580" y="30" width="120" height="30" rx="5" fill="none" stroke="#FF4254" strokeWidth="2" />
            <text x="640" y="50" className="text-sm" textAnchor="middle" fill="#FF4254">Ekran</text>
            <path d="M450 90 L580 45" stroke="#FF4254" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            
            <rect x="580" y="80" width="120" height="30" rx="5" fill="none" stroke="#FF4254" strokeWidth="2" />
            <text x="640" y="100" className="text-sm" textAnchor="middle" fill="#FF4254">AKS</text>
            <path d="M450 105 L580 95" stroke="#FF4254" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            
            <rect x="580" y="130" width="120" height="30" rx="5" fill="none" stroke="#FF4254" strokeWidth="2" />
            <text x="640" y="150" className="text-sm" textAnchor="middle" fill="#FF4254">Uyarı Sistemi</text>
            <path d="M450 120 L580 145" stroke="#FF4254" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          </svg>
          
          {/* Technical decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
            <div className="circuit-dots w-full h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for placeholder images (used by imported components)
// eslint-disable-next-line no-unused-vars
const getPlaceholderImage = (width, height, color = "0A0A14") => {
  return `https://via.placeholder.com/${width}x${height}/${color}/FF4254?text=VOLTARIS`;
};

// Enhanced 3D Car Model Component with advanced interactivity
const CarModel = () => {
  const group = useRef();
  const bodyRef = useRef();
  const wheelsRef = useRef([]);
  const lightsRef = useRef([]);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [activePart, setActivePart] = useState(null);
  const [specs, setSpecs] = useState({});
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  
  useEffect(() => {
    // Store the ref in a variable to avoid React warnings
    const currentGroup = group.current;
    wheelsRef.current = [];
    lightsRef.current = [];
    
    if (!currentGroup) return;
    
    // Create a path to our 3D model, using the correct public URL path
    const modelPath = `${process.env.PUBLIC_URL}/3D/model_3d/model_3d.draco.gltf`;
    
    // Set up DRACO decoder - use the generic CDN for broader compatibility
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    dracoLoader.setDecoderConfig({ type: 'js' }); // Use JS decoder for compatibility
    
    // Configure the GLTF loader with DRACO support
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    
    try {
      // First attempt to fetch to detect any network issues
      fetch(modelPath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch model: ${response.status} ${response.statusText}`);
          }
          return response;
        })
        .catch(error => {
          console.error('Model fetch error:', error);
          // Create fallback model if fetch fails
          if (currentGroup) {
            const fallbackModel = createFallbackModel();
            currentGroup.add(fallbackModel);
            setModelLoaded(true);
          }
        });
      
      // Use GLTFLoader with progress tracking
      gltfLoader.load(
        modelPath,
        (gltf) => {
          if (currentGroup) {
            // Performance optimization: disable matrixAutoUpdate for static parts
            gltf.scene.traverse((child) => {
              if (child.isMesh) {
                // Identify car parts for interactive features
                if (child.name.includes('body') || child.name.includes('chassis')) {
                  bodyRef.current = child;
                } else if (child.name.includes('wheel')) {
                  wheelsRef.current.push(child);
                } else if (child.name.includes('light') || child.name.includes('lamp')) {
                  lightsRef.current.push(child);
                }
                
                // Performance optimizations
                child.matrixAutoUpdate = false;
                child.frustumCulled = true;
                
                // Only allow large objects to cast shadows for better performance
                const boundingBox = new THREE.Box3().setFromObject(child);
                const size = boundingBox.getSize(new THREE.Vector3());
                const maxDimension = Math.max(size.x, size.y, size.z);
                child.castShadow = maxDimension > 0.5;
                child.receiveShadow = true;
                
                // Apply optimized materials
                if (child.material) {
                  // Optimize textures
                  if (child.material.map) {
                    child.material.map.anisotropy = 4; // Good balance of quality/performance
                    child.material.map.minFilter = THREE.LinearFilter;
                  }
                  
                  // Set material properties for better performance
                  if (child.name.includes('body')) {
                    child.material = new THREE.MeshPhysicalMaterial({
                      color: new THREE.Color(0x2a2a2a),
                      metalness: 0.9,
                      roughness: 0.1,
                      clearcoat: 0.5,
                      clearcoatRoughness: 0.1
                    });
                  } else if (child.name.includes('window') || child.name.includes('glass')) {
                    child.material = new THREE.MeshPhysicalMaterial({
                      color: new THREE.Color(0xffffff),
                      transmission: 0.9,
                      transparent: true,
                      metalness: 0.1,
                      roughness: 0.05
                    });
                  } else if (child.name.includes('light') || child.name.includes('lamp')) {
                    child.material = new THREE.MeshBasicMaterial({
                      color: new THREE.Color(0xffffff),
                      emissive: new THREE.Color(0xffffaa),
                      emissiveIntensity: 1.0
                    });
                  }
                }
                
                // Update matrix once
                child.updateMatrix();
              }
            });
            
            // Add the model to our scene
            currentGroup.add(gltf.scene);
            setModelLoaded(true);
            
            // Extract specs from the model for information display
            setSpecs({
              polygons: getPolygonCount(gltf.scene),
              materials: getMaterialCount(gltf.scene),
              textures: getTextureCount(gltf.scene)
            });
          }
          
          // Clean up DRACO loader
          dracoLoader.dispose();
        },
        // Progress callback
        (xhr) => {
          if (xhr.lengthComputable) {
            const percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
            setLoadProgress(percentComplete);
          }
        },
        // Error callback
        (error) => {
          console.error('Error loading 3D model:', error);
          setLoadError(true);
          
          // Create fallback model if loading fails
          if (currentGroup) {
            const fallbackModel = createFallbackModel();
            currentGroup.add(fallbackModel);
            setModelLoaded(true);
          }
        }
      );
    } catch (error) {
      console.error('Error setting up 3D model loader:', error);
      setLoadError(true);
      
      // Create fallback model on error
      if (currentGroup) {
        const fallbackModel = createFallbackModel();
        currentGroup.add(fallbackModel);
        setModelLoaded(true);
      }
    }
    
    // Clean up function to remove the model when component unmounts
    return () => {
      if (currentGroup) {
        // Dispose of geometries and textures to prevent memory leaks
        currentGroup.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        });
        
        // Remove all children
        while (currentGroup.children.length > 0) {
          currentGroup.remove(currentGroup.children[0]);
        }
      }
    };
  }, []);
  
  // Helper functions to get model statistics
  const getPolygonCount = (model) => {
    let polygons = 0;
    model.traverse((child) => {
      if (child.isMesh && child.geometry) {
        polygons += child.geometry.attributes.position.count / 3;
      }
    });
    return Math.round(polygons);
  };
  
  const getMaterialCount = (model) => {
    const materials = new Set();
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        materials.add(child.material);
      }
    });
    return materials.size;
  };
  
  const getTextureCount = (model) => {
    const textures = new Set();
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.material.map) textures.add(child.material.map);
        if (child.material.normalMap) textures.add(child.material.normalMap);
        if (child.material.roughnessMap) textures.add(child.material.roughnessMap);
        if (child.material.metalnessMap) textures.add(child.material.metalnessMap);
      }
    });
    return textures.size;
  };
  
  // Creates a simple fallback model if the main model fails to load
  const createFallbackModel = () => {
    const fallbackGroup = new THREE.Group();
    
    // Create a simple car body
    const bodyGeometry = new THREE.BoxGeometry(2, 0.6, 4);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2a2a2a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    fallbackGroup.add(body);
    
    // Create wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
    
    // Front-left wheel
    const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFL.rotation.z = Math.PI / 2;
    wheelFL.position.set(-1, 0.4, -1.2);
    fallbackGroup.add(wheelFL);
    wheelsRef.current.push(wheelFL);
    
    // Front-right wheel
    const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFR.rotation.z = Math.PI / 2;
    wheelFR.position.set(1, 0.4, -1.2);
    fallbackGroup.add(wheelFR);
    wheelsRef.current.push(wheelFR);
    
    // Rear-left wheel
    const wheelRL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelRL.rotation.z = Math.PI / 2;
    wheelRL.position.set(-1, 0.4, 1.2);
    fallbackGroup.add(wheelRL);
    wheelsRef.current.push(wheelRL);
    
    // Rear-right wheel
    const wheelRR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelRR.rotation.z = Math.PI / 2;
    wheelRR.position.set(1, 0.4, 1.2);
    fallbackGroup.add(wheelRR);
    wheelsRef.current.push(wheelRR);
    
    // Create windows/cabin
    const cabinGeometry = new THREE.BoxGeometry(1.8, 0.5, 2);
    const cabinMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      transmission: 0.9,
      transparent: true
    });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.set(0, 1.1, 0);
    fallbackGroup.add(cabin);
    
    // Create lights
    const lightGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.1);
    const lightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffaa,
      emissive: 0xffffaa
    });
    
    // Front lights
    const lightFL = new THREE.Mesh(lightGeometry, lightMaterial);
    lightFL.position.set(-0.7, 0.7, -2);
    fallbackGroup.add(lightFL);
    lightsRef.current.push(lightFL);
    
    const lightFR = new THREE.Mesh(lightGeometry, lightMaterial);
    lightFR.position.set(0.7, 0.7, -2);
    fallbackGroup.add(lightFR);
    lightsRef.current.push(lightFR);
    
    return fallbackGroup;
  };
  
  const handlePointerOver = (e, part) => {
    if (!modelLoaded) return;
    e.stopPropagation();
    setHovered(true);
    setActivePart(part);
  };
  
  const handlePointerOut = (e) => {
    if (!modelLoaded) return;
    e.stopPropagation();
    setHovered(false);
    setActivePart(null);
  };
  
  const handleClick = (e, part) => {
    if (!modelLoaded) return;
    e.stopPropagation();
    setClicked(!clicked);
    setActivePart(part);
  };
  
  useFrame((state) => {
    if (group.current) {
      // More dynamic rotation based on clicked state
      if (clicked) {
        // Faster rotation when clicked
        group.current.rotation.y += 0.01;
      } else {
        // Standard smooth rotation when not clicked
        group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2 + Math.PI / 4;
      }
      
      // Enhanced floating motion
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05 - 0.7;
      
      // Animate wheels if available
      wheelsRef.current.forEach(wheel => {
        if (wheel) {
          wheel.rotation.z += 0.01; // Spinning wheels effect
        }
      });
      
      // Pulse lights if available
      lightsRef.current.forEach(light => {
        if (light && light.material) {
          light.material.emissiveIntensity = 0.5 + Math.sin(state.clock.getElapsedTime() * 3) * 0.5;
        }
      });
      
      // Scale effect when part is hovered
      if (bodyRef.current) {
        if (activePart === 'body' && hovered) {
          bodyRef.current.scale.set(1.05, 1.05, 1.05);
        } else {
          bodyRef.current.scale.set(1, 1, 1);
        }
      }
    }
  });
  
  // Render loading indicator if model is not yet loaded
  if (!modelLoaded && !loadError) {
    return (
      <group>
        {/* Yükleme göstergesi */}
        <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#444444" />
        </mesh>
        <Text 
        position={[0, -1, 0]} 
        color="white"
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
        >
        {`Model yükleniyor... ${loadProgress}%`}
        </Text>
      </group>
    );
  }
  
  // Warning for loading errors
  if (loadError) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#FF4254" />
        </mesh>
        <Text 
          position={[0, -1, 0]} 
          color="#FF4254"
          fontSize={0.2}
          anchorX="center"
          anchorY="middle"
        >
          Model yüklenemedi
        </Text>
      </group>
    );
  }
  
  return (
    <group 
      ref={group} 
      position={[0, 0, 0]}
      onPointerOver={(e) => handlePointerOver(e, 'model')}
      onPointerOut={handlePointerOut}
      onClick={(e) => handleClick(e, 'model')}
    >
      {/* Model will be added to this group via useEffect */}
      
      {/* Display technical specs if model is loaded */}
      {modelLoaded && specs.polygons && (
        <group position={[2, 0, 0]}>
          <Text
            position={[0, 0.5, 0]} 
            color="#FF4254"
            fontSize={0.15}
            anchorX="left"
            anchorY="middle"
          >
            {`Poligonlar: ${specs.polygons.toLocaleString()}`}
          </Text>
          <Text
            position={[0, 0.2, 0]} 
            color="#FF4254"
            fontSize={0.15}
            anchorX="left"
            anchorY="middle"
          >
            {`Materyaller: ${specs.materials}`}
          </Text>
          <Text
            position={[0, -0.1, 0]} 
            color="#FF4254"
            fontSize={0.15}
            anchorX="left"
            anchorY="middle"
          >
            {`Dokular: ${specs.textures}`}
          </Text>
        </group>
      )}
    </group>
  );
};

// Scene setup with lighting - not used directly, but needed for definition
// eslint-disable-next-line no-unused-vars
const Scene = () => {
  const floorRef = useRef();
  const gridRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  // eslint-disable-next-line no-unused-vars
  const { viewport, camera } = useThree();
  
  // Track mouse position for interactive lighting
  const updateMousePos = useCallback(({ clientX, clientY }) => {
    mousePos.current = {
      x: (clientX / window.innerWidth) * 2 - 1,
      y: -(clientY / window.innerHeight) * 2 + 1
    };
  }, []);
  
  useEffect(() => {
    window.addEventListener('mousemove', updateMousePos);
    return () => window.removeEventListener('mousemove', updateMousePos);
  }, [updateMousePos]);
  
  useFrame((state) => {
    if (floorRef.current) {
      // Create a ripple effect on the floor
      floorRef.current.material.displacementScale = 0.1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
    
    if (gridRef.current) {
      // Pulse the grid with mouse movement
      const targetX = mousePos.current.x * 0.5;
      const targetY = mousePos.current.y * 0.5;
      gridRef.current.rotation.x = THREE.MathUtils.lerp(gridRef.current.rotation.x, targetY * 0.2, 0.05);
      gridRef.current.rotation.y = THREE.MathUtils.lerp(gridRef.current.rotation.y, targetX * 0.2, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      <spotLight position={[-10, 10, 5]} intensity={0.5} castShadow angle={0.3} />
      
      {/* Dynamic accent lights that follow mouse position */}
      <pointLight 
        position={[5 + mousePos.current.x * 3, 5 + mousePos.current.y * 2, -5]} 
        intensity={0.5} 
        color="#FF2233" 
      />
      <pointLight 
        position={[-5 - mousePos.current.x * 3, 5 + mousePos.current.y * 2, 5]} 
        intensity={0.5} 
        color="#0044FF" 
      />
      
      <CarModel />
      
      {/* Reflective floor with grid */}
      <mesh 
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1, 0]} 
        receiveShadow
      >
        <planeGeometry args={[30, 30, 50, 50]} />
        <meshStandardMaterial 
          color="#050505" 
          metalness={0.8} 
          roughness={0.2}
          wireframe={true} 
          emissive="#0033FF"
          emissiveIntensity={0.1}
          displacementScale={0.1}
        />
      </mesh>
      
      {/* Background grid - interactive */}
      <group ref={gridRef} position={[0, 0, -5]}>
        <mesh receiveShadow>
          <planeGeometry args={[50, 30, 20, 20]} />
          <meshStandardMaterial 
            color="#000000"
            wireframe={true}
            emissive="#FF4254"
            emissiveIntensity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
      
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/2} />
    </>
  );
};

const mobileSlideStyles = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  width: '250px',
  maxWidth: '100%',
  zIndex: 9999,
  overflowY: 'auto'
};

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(true); // Default to open
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  // State declarations (but unused, could be removed later)
  const [sponsorshipModalOpen, setSponsorshipModalOpen] = useState(false);
  const [currentSponsorTier, setCurrentSponsorTier] = useState('platinum');
  const [isMenuTransitioning, setIsMenuTransitioning] = useState(false); // Add this to prevent multiple clicks
  
  // Initialize interactive effects
  useMouseTrail();
  useParallax();
  useScrollAnimation();
  useTechnicalSpecsAnimation();
  
  // Update body data attribute and menu visibility when active section changes
  useEffect(() => {
    document.body.setAttribute('data-section', activeSection);
    updateMenuButtonVisibility(activeSection, scrolled, true);
  }, [activeSection, scrolled]);
  
  const [showSignature, setShowSignature] = useState(true);

  useEffect(() => {
    // Simulate loading delay for animation effect
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    // Timer to hide signature after 4 seconds
    const signatureTimer = setTimeout(() => {
      setShowSignature(false);
    }, 4000);
    
    // Initialize the menu visibility controller
    const cleanup1 = initMenuVisibilityController(
      () => activeSection,
      () => scrolled
    );
    
    // Initialize mobile menu fixes
    const cleanup2 = initMobileMenuFix();
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Check if we're in a light section
      const sponsorsSection = document.getElementById('sponsors');
      if (sponsorsSection) {
        const sponsorsRect = sponsorsSection.getBoundingClientRect();
        // If sponsors section is in view
        if (sponsorsRect.top < window.innerHeight && sponsorsRect.bottom > 0) {
          // We can use this information if needed later
        }
      }

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 300;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
          
          // Update menu button visibility when section changes
          updateMenuButtonVisibility(sectionId, window.scrollY > 50);
        }
      });
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);
    
    // Initial update for visibility
    updateMenuButtonVisibility(activeSection, scrolled, true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
      clearTimeout(loadingTimer);
      clearTimeout(signatureTimer);
    };
  }, []);

  // Function for handling mobile menu toggle regardless of section
  const toggleMobileMenu = (e) => {
    if (e) e.preventDefault();
    
    // Prevent multiple rapid clicks during animation
    if (isMenuTransitioning) return;
    
    // Set transitioning state to block additional clicks
    setIsMenuTransitioning(true);
    
    console.log('Toggling mobile menu - current state:', mobileMenuOpen);
    const newMenuState = !mobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    
    if (newMenuState) {
      fixMobileMenuOnOpen();
    } else {
      fixMobileMenuOnClose();
    }
    
    // Direct DOM manipulation as a fallback to ensure menu display works
    const mobilePanel = document.querySelector('.mobile-menu-panel');
    if (mobilePanel) {
      console.log('Applying class to panel:', newMenuState ? 'show' : 'hide');
      if (newMenuState) {
        mobilePanel.classList.remove('hide');
        mobilePanel.classList.add('show');
        mobilePanel.style.transform = 'translateX(0)';
      } else {
        mobilePanel.classList.remove('show');
        mobilePanel.classList.add('hide');
        mobilePanel.style.transform = 'translateX(100%)';
      }
    } else {
      console.log('Mobile panel not found!');
    }
    
    // Release the block after animation completes
    setTimeout(() => {
      setIsMenuTransitioning(false);
    }, 350); // Slightly longer than animation duration (300ms)
  };

  // Function to toggle the technical submenu in mobile view
  const toggleTechnicalSubmenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Toggling technical submenu, current state:', mobileSubmenuOpen);
    const newSubmenuState = !mobileSubmenuOpen;
    setMobileSubmenuOpen(newSubmenuState);
    
    // Apply fix
    fixTechnicalSubmenu(newSubmenuState);
    
    // Direct manipulation of DOM as fallback
    setTimeout(() => {
      const submenu = document.querySelector('.mobile-submenu');
      if (submenu) {
        if (!mobileSubmenuOpen) {
          submenu.classList.add('visible');
          submenu.classList.remove('hidden');
          console.log('Technical submenu visible');
        } else {
          submenu.classList.add('hidden');
          submenu.classList.remove('visible');
          console.log('Technical submenu hidden');
        }
      } else {
        console.log('Technical submenu element not found');
      }
    }, 10);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Ensure menu is closed before scroll animation starts
      if (mobileMenuOpen) {
        // First close menu with short timeout to allow state update
        setMobileMenuOpen(false);
        
        // Then scroll after a short delay to ensure menu animation completes
        setTimeout(() => {
          window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
          });
          setActiveSection(sectionId);
        }, 350); // Match the menu animation duration
      } else {
        // If menu is already closed, scroll immediately
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
        setActiveSection(sectionId);
      }
    }
  };

  // Function to open sponsorship modal with the specified tier
  // eslint-disable-next-line no-unused-vars
  const handleOpenSponsorshipModal = (tier) => {
    setCurrentSponsorTier(tier);
    setSponsorshipModalOpen(true);
  };

  // Loading screen
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
        {/* Circuit animation in background */}
        <CircuitLoadingAnimation />
        
        {/* Colored glow effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-red-500/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
        </div>
        
        {/* Center logo box */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-48 h-48 bg-black border border-gray-800 rounded-lg overflow-hidden flex items-center justify-center mb-8
                       shadow-lg shadow-blue-500/20 relative">
            {/* Inner shadow effect */}
            <div className="absolute inset-0 shadow-inner"></div>
            
            {/* Logo - now with 180deg rotation to match the final position */}
            <img 
              src={`${process.env.PUBLIC_URL}/logo_sadece.png`}
              alt="Voltaris Logo" 
              width="128" 
              height="128" 
              loading="eager" 
              className="w-32 h-32 animate-spin-loading transition-all duration-1000" 
            />
            
            {/* Corner glow effects */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500/30 blur-md rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500/30 blur-md rounded-full"></div>
          </div>
          
          <div className="text-3xl font-bold text-white tracking-wider">VOLTARIS</div>
        </div>

        {/* Colored signature at bottom right - fades away after 2 seconds */}
        {showSignature && (
          <div className="fixed bottom-4 right-4 text-xs sm:text-sm font-mono z-50 transition-opacity duration-500">
            <span className="text-red-500">{'// '}</span>
            <span className="text-green-500">{'DESIGNED'}</span>
            <span className="text-yellow-500">{'_WITH_'}</span>
            <span className="text-blue-500">{'PASSION_'}</span>
            <span className="text-red-500">{'BY_'}</span>
            <span className="text-green-500">{'VOLTARIS_'}</span>
            <span className="text-yellow-500">{'TEAM'}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black via-[#27282c] to-[#27282c] text-gray-100 min-h-screen relative">
      {/* Add MobileMenuFallback for emergency fixes */}
      <MobileMenuFallback />
      
      {/* Standalone Mobile Menu Button */}
      <button 
        className="md:hidden text-gray-300 focus:outline-none fixed top-5 right-4 z-[9999] mobile-menu-button" 
        onClick={toggleMobileMenu}
        aria-label="Menu Toggle"
        style={{ 
          background: 'rgba(20, 20, 25, 0.9)',
          backdropFilter: 'blur(8px)',
          padding: '0.6rem',
          borderRadius: '0.375rem',
          display: activeSection === 'home' || window.innerWidth < 768 ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,66,84,0.3)',
          width: '42px',
          height: '42px'
        }}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Global technical background pattern with hole effect */}
      <div className="fixed inset-0 pointer-events-none z-0 hole-effect">
        <div className="absolute inset-0 bg-circuit-pattern opacity-[0.03]"></div>
        <div className="absolute inset-0 circuit-pattern opacity-[0.02]"></div>
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <path 
            className="circuit-path" 
            d="M0,100 Q50,50 100,100 T200,100 T300,100 T400,100" 
            fill="none" 
            stroke="#FF4254" 
            strokeWidth="0.5" 
          />
          <path 
            className="circuit-path" 
            d="M0,200 Q50,150 100,200 T200,200 T300,200 T400,200" 
            fill="none" 
            stroke="#0044FF" 
            strokeWidth="0.5"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
        
        {/* Add flowing circuit animation on page entry */}
        <FlowingCircuitEntryAnimation />
      </div>
      
      {/* Sponsorship Modal */}
      <SponsorshipModal 
        isOpen={sponsorshipModalOpen}
        onClose={() => setSponsorshipModalOpen(false)}
        currentTier={currentSponsorTier}
      />
      
      {/* Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-500 
        ${scrolled ? 'bg-[#1a1b1e]/95 shadow-lg shadow-red-900/10 backdrop-blur-md' : 'bg-transparent'}`}
        style={{position: 'fixed', top: 0, left: 0, right: 0}}>
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                id="headerLogo"
                src={`${process.env.PUBLIC_URL}/logo_sadece.png`} 
                alt="Voltaris Logo"
                width="40"
                height="40"
                loading="eager"
                className="h-8 w-8 md:h-10 md:w-10 mr-2 md:mr-3 hover:rotate-180 transition-all duration-1000 hover:scale-125" 
              />
              <span 
                className="text-lg md:text-xl font-semibold tracking-wide cursor-pointer"
                onClick={() => {
                  const logo = document.getElementById('headerLogo');
                  if (logo) {
                    // Remove any existing animation classes
                    logo.classList.remove('logo-wheel-spin');
                    
                    // Force a reflow to restart animation
                    void logo.offsetWidth;
                    
                    // Add the wheel spin animation class
                    logo.classList.add('logo-wheel-spin');
                  }
                }}
              >VOLTARIS</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {['home', 'about', 'technical', 'sponsors', 'contact'].map((section) => (
              <div key={section} className="relative group">
                <button
                  onClick={() => scrollToSection(section)}
                  className={`text-sm uppercase tracking-wider py-2 font-medium relative 
                    ${activeSection === section || (section === 'technical' && (activeSection === 'vehicle' || activeSection === 'adas')) 
                      ? 'text-red-500 border-b border-red-500' 
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {(activeSection === section || (section === 'technical' && (activeSection === 'vehicle' || activeSection === 'adas'))) && (
                    <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full"></span>
                  )}
                  {section === 'home' ? 'Ana Sayfa' : 
                   section === 'about' ? 'Hakkımızda' : 
                   section === 'technical' ? 'Teknik Detaylar' :
                   section === 'sponsors' ? 'Sponsorluk' : 'İletişim'}
                  {section === 'technical' && (
                    <ChevronDown size={14} className="ml-1 inline-block transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </button>
                {section === 'technical' && (
                  <div className="absolute top-full right-0 md:left-0 mt-2 bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg py-2 px-1 w-48 hidden group-hover:block z-50">
                    <button 
                      onClick={(e) => {e.stopPropagation(); scrollToSection('technical')}} 
                      className={`block w-full text-left px-3 py-2 text-sm ${activeSection === 'technical' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
                    >
                      Teknik Detaylar
                    </button>
                    <button 
                      onClick={(e) => {e.stopPropagation(); scrollToSection('vehicle')}} 
                      className={`block w-full text-left px-3 py-2 text-sm ${activeSection === 'vehicle' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
                    >
                      Araç Özellikleri
                    </button>
                    <button 
                      onClick={(e) => {e.stopPropagation(); scrollToSection('adas')}} 
                      className={`block w-full text-left px-3 py-2 text-sm ${activeSection === 'adas' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
                    >
                      ADAS Sistemleri
                    </button>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          {/* Remove this button since we already have one at the root level */}
        </div>

        {/* Mobile Navigation - Sliding Panel */}
        <div 
          className={`fixed inset-y-0 right-0 z-50 transform transition-all duration-300 mobile-menu-panel ${mobileMenuOpen ? 'translate-x-0 show' : 'translate-x-full hide'}`}
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            width: '85vw',
            maxWidth: '300px',
            zIndex: 9999,
            overflowY: 'auto',
            overflowX: 'hidden',
            willChange: 'transform',
            borderLeft: '1px solid rgba(75, 75, 75, 0.3)',
            visibility: 'visible',
            display: mobileMenuOpen ? 'flex' : 'none',
            opacity: 1,
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(12px)'
          }}
        >
          <div className="pt-20 pb-6 px-4 flex flex-col h-full overflow-y-auto menu-content"
            style={{
              display: 'flex',
              flexDirection: 'column',
              visibility: 'visible',
              opacity: 1,
              position: 'relative',
              zIndex: 10000,
              width: '100%',
              paddingTop: '5rem',
              paddingBottom: '1.5rem'
            }}>
            {/* Close button at top of mobile menu */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white"
              onClick={toggleMobileMenu}
              aria-label="Close Menu"
            >
              <X size={18} />
            </button>
            
            {/* Logo in menu */}
            <div className="flex items-center absolute top-6 left-4">
              <img 
                src={`${process.env.PUBLIC_URL}/logo_sadece.png`} 
                alt="Voltaris Logo"
                width="32"
                height="32"
                className="h-7 w-7 mr-2" 
              />
              <span className="text-base font-semibold tracking-wide text-white">VOLTARIS</span>
            </div>
            
            {/* Menu items */}
            <div className="space-y-2 mt-2 menu-items-container" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
              {['home', 'about', 'technical', 'sponsors', 'contact'].map((section) => (
                <div key={section}>
                  <button
                  onClick={(e) => {
                  e.stopPropagation();
                  if (section === 'technical') {
                  toggleTechnicalSubmenu(e);
                  } else {
                  scrollToSection(section);
                  }
                  }}
                  className={`text-sm uppercase tracking-wider py-3.5 font-medium px-4 rounded-md w-full text-left flex items-center justify-between mb-1.5 menu-item
                  ${activeSection === section || (section === 'technical' && (activeSection === 'vehicle' || activeSection === 'adas')) 
                  ? 'bg-gradient-to-r from-red-900/30 to-black text-red-400 border-l-2 border-red-500' 
                  : 'text-gray-300 hover:text-white bg-black/20 hover:bg-black/40'
                  }`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    visibility: 'visible',
                    opacity: 1,
                    width: '100%',
                    marginBottom: '0.75rem',
                    borderRadius: '0.375rem',
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                  >
                    <span>
                      {section === 'home' ? 'Ana Sayfa' : 
                       section === 'about' ? 'Hakkımızda' : 
                       section === 'technical' ? 'Teknik Detaylar' :
                       section === 'sponsors' ? 'Sponsorluk' : 'İletişim'}
                    </span>
                    {section === 'technical' && <ChevronDown size={16} className={`transition-transform duration-300 ${mobileSubmenuOpen ? 'transform rotate-180' : ''}`} />}
                  </button>
                  
                  {section === 'technical' && mobileSubmenuOpen && (
                    <div className="ml-4 mt-1 mb-3 space-y-1 border-l border-red-900/30 pl-3 mobile-submenu visible" 
                      style={{
                        display: 'block',
                        visibility: 'visible',
                        opacity: 1,
                        marginLeft: '1rem',
                        marginTop: '0.25rem',
                        marginBottom: '0.75rem', 
                        borderLeftWidth: '1px',
                        borderLeftColor: 'rgba(239, 68, 68, 0.3)',
                        paddingLeft: '0.75rem'
                      }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection('technical');
                          setMobileMenuOpen(false);
                        }} 
                        className={`text-sm py-2.5 px-3 block w-full text-left rounded-md
                          ${activeSection === 'technical' 
                            ? 'bg-gradient-to-r from-red-900/20 to-black text-red-400 border-l border-red-500' 
                            : 'text-gray-300 hover:text-white bg-black/10 hover:bg-black/30'
                          }`}
                      >
                        Teknik Detaylar
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection('vehicle');
                          setMobileMenuOpen(false);
                        }} 
                        className={`text-sm py-2.5 px-3 block w-full text-left rounded-md
                          ${activeSection === 'vehicle' 
                            ? 'bg-gradient-to-r from-red-900/20 to-black text-red-400 border-l border-red-500' 
                            : 'text-gray-300 hover:text-white bg-black/10 hover:bg-black/30'
                          }`}
                      >
                        Araç Özellikleri
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection('adas');
                          setMobileMenuOpen(false);
                        }} 
                        className={`text-sm py-2.5 px-3 block w-full text-left rounded-md
                          ${activeSection === 'adas' 
                            ? 'bg-gradient-to-r from-red-900/20 to-black text-red-400 border-l border-red-500' 
                            : 'text-gray-300 hover:text-white bg-black/10 hover:bg-black/30'
                          }`}
                      >
                        ADAS Sistemleri
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile footer links */}
            <div className="mt-auto pt-5 border-t border-gray-800/50">
              <div className="flex justify-center space-x-6 my-4">
                <a href="https://instagram.com/Voltaris.official" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white bg-gray-800/30 p-2.5 rounded-full hover:bg-gray-800/60 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://www.linkedin.com/company/i̇yte-voltaris-teknofest-efficiency-challange/" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-white bg-gray-800/30 p-2.5 rounded-full hover:bg-gray-800/60 transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="mailto:info@voltaris.com" 
                   className="text-gray-400 hover:text-white bg-gray-800/30 p-2.5 rounded-full hover:bg-gray-800/60 transition-colors">
                  <Mail size={18} />
                </a>
              </div>
              <div className="text-center text-xs text-gray-500 mb-1">
                © 2025 Voltaris
              </div>
            </div>
          </div>

{/* Backdrop for mobile menu */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm mobile-menu-backdrop" 
              onClick={(e) => {
                // Prevent event propagation to avoid multiple event handling
                e.stopPropagation();
                // Only process if not in transition
                if (!isMenuTransitioning) {
                  toggleMobileMenu(e);
                }
              }}
              style={{
                position: 'fixed', 
                top: 0, 
                right: 0, 
                bottom: 0, 
                left: 0,
                willChange: 'opacity',
                transition: 'opacity 0.3s ease-in-out',
                touchAction: 'none'
              }}
            ></div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16 md:pt-0 pb-32 sm:pb-36 md:pb-40">
        {/* Gradient background with enhanced light rays - darker version */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#020203] to-black z-0"></div>
        
        {/* Enhanced light ray effects */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 right-1/4 w-64 sm:w-96 h-screen rotate-15 bg-gradient-to-b from-red-900/30 via-red-700/10 to-transparent blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-64 sm:w-96 h-screen -rotate-15 bg-gradient-to-b from-blue-900/30 via-blue-700/10 to-transparent blur-3xl"></div>
        </div>
        
        {/* Enhanced technical grid pattern in background */}
        <div 
          className="absolute inset-0 z-0 opacity-10 bg-technical-grid"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        ></div>
        
        {/* Teknik ölçüm koordinatları */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* X-ekseni koordinatları */}
            {[...Array(10)].map((_, i) => (
              <div 
                key={`x-${i}`} 
                className="absolute text-[8px] text-gray-500 font-mono"
                style={{ left: `${i * 10}%`, top: '12px' }}
              >
                {i * 10}
              </div>
            ))}
            
            {/* Y-ekseni koordinatları */}
            {[...Array(10)].map((_, i) => (
              <div 
                key={`y-${i}`} 
                className="absolute text-[8px] text-gray-500 font-mono"
                style={{ top: `${i * 10}%`, left: '12px' }}
              >
                {i * 10}
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced animated accent lines */}
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-horizontalSweep"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-verticalSweep"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-horizontalSweep delay-500"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-red-500 to-transparent animate-verticalSweep delay-500"></div>
          
          {/* Teknik efekt için köşegen tarama çizgileri eklendi */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-[150vw] h-px bg-blue-500/20 origin-top-left animate-diagonalScan"
              style={{ transform: 'rotate(45deg)' }}
            ></div>
            <div 
              className="absolute bottom-0 left-0 w-[150vw] h-px bg-red-500/20 origin-bottom-left animate-diagonalScanReverse"
              style={{ transform: 'rotate(-45deg)' }}
            ></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="text-red-500 font-mono text-xs mb-2 tracking-widest animate-fadeIn flex items-center">
                <span className="inline-block w-2 h-2 bg-red-500/50 rounded-full mr-2"></span>
                {'// ELEKTRO_MOBİL_V1.0.2'}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fadeIn">
                <span className="text-red-500">Voltaris</span> Elektrikli Araç Projesi
              </h1>
              <div className="h-0.5 w-16 sm:w-20 bg-gradient-to-r from-red-500 to-transparent mb-4 sm:mb-6 animate-fadeInDelay"></div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 animate-fadeInDelay">
                İzmir Yüksek Teknoloji Enstitüsü Elektrikli Araç Takımı olarak, geleceğin temiz, sürdürülebilir ulaşım teknolojilerini geliştiriyoruz.
              </p>
              
              {/* Enhanced technical data visualization */}
              <div className="mb-6 sm:mb-8 animate-fadeInDelay relative max-w-full overflow-x-auto">
                <div className="flex flex-wrap sm:flex-nowrap justify-between text-xs mb-1 bg-black/40 backdrop-blur-sm rounded-md border border-gray-800/50 p-2 gap-1 sm:gap-0 tech-specs-text">
                  <span className="text-red-500 font-mono tracking-wider px-2 py-1 rounded bg-gradient-to-r from-red-900/20 to-transparent">BAT:68.97V</span>
                  <span className="text-blue-500 font-mono tracking-wider px-2 py-1 rounded bg-gradient-to-r from-blue-900/20 to-transparent">MOT:5kW</span>
                  <span className="text-yellow-500 font-mono tracking-wider px-2 py-1 rounded bg-gradient-to-r from-yellow-900/20 to-transparent">VER:2024</span>
                  <span className="text-purple-500 font-mono tracking-wider px-2 py-1 rounded bg-gradient-to-r from-purple-900/20 to-transparent">TYP:Elektromobil</span>
                  <span className="text-green-500 font-mono tracking-wider px-2 py-1 rounded bg-gradient-to-r from-green-900/20 to-transparent">PRG:%35</span>
                </div>
                <TechnicalDataViz />
                
                {/* Added technical scan line animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent absolute top-0 animate-scanLine"></div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fadeInDelayLong">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg flex items-center justify-center font-medium transition-colors shadow-lg shadow-red-900/20 relative overflow-hidden group text-sm"
                >
                  <span className="relative z-10 flex items-center">Bizi Tanıyın <ChevronRight className="ml-1" size={14} /></span>
                  {/* Added button light sweep effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </div>
            </div>
            
            {/* 3D Model - visible on larger screens by default */}
            <div className="order-1 md:order-2 md:block animate-fadeInDelay relative">
              {/* 3D Model Viewer */}
              <TechnicalModelViewer />
            </div>
          </div>
        </div>
        
        {/* Sponsorship Bar with advanced positioning */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 mb-5 sponsor-bar-container">
          <div className="container mx-auto w-full">
            <EnhancedSponsorsBar sponsors={teamData.sponsorData} />
          </div>
        </div>
      </section>

      {/* About Section - lighter background */}
      <section id="about" className="py-16 md:py-20 relative bg-[#27282c]/90">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Hakkımızda</h2>
            <div className="h-1 w-16 sm:w-20 bg-red-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 items-start">
          <div>
          <h3 className="text-xl font-bold mb-3 text-red-500 flex items-center">
          <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-red-500 to-transparent mr-2"></span>
          Voltaris Elektromobil Takımı
          </h3>
          <p className="text-gray-300 mb-3 text-sm leading-relaxed">
          Voltaris, İzmir Yüksek Teknoloji Enstitüsü'nde elektrikli araçlar ve sürdürülebilir ulaşım teknolojileri alanında yenilikçi çözümler geliştiren bir öğrenci takımıdır.
          </p>
          <p className="text-gray-300 mb-3 text-sm leading-relaxed">
          2024 Mayıs tarihinde Prof. Dr. Erdal Çetkin danışmanlığında kurulan ekibimiz, İYTE'de bir kültür oluşturma amacıyla çıktığımız bu yolda, Teknofest Efficiency Challenge yarışmasının ilk akla gelen takımlarından olma ve teorik bilgilerimizi pratiğe dönüştürerek yarışmada tecrübe kazanma amacıyla çalışmalarımızı sürdürmeketeyiz.
          </p>
          <div className="bg-gradient-to-br from-gray-900/70 via-black/60 to-gray-900/70 backdrop-blur-md p-3 border border-blue-900/30 rounded-lg mt-4 relative overflow-hidden group hover:border-blue-500/40 transition-all duration-300 shadow-lg">
          {/* Mission background animation */}
          <div className="absolute inset-0 bg-circuit-pattern opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-transparent opacity-50"></div>
          
          {/* Circling animation light */}
          <div className="absolute top-0 left-0 w-1 h-1 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-circleTopLeft"></div>
          
          <h4 className="font-bold mb-2 text-blue-400 text-base relative z-10 flex items-center">
          <span className="mr-2 text-blue-500">◈</span> Misyonumuz
          </h4>
          <div className="space-y-2">
          <p className="text-sm text-gray-300 relative z-10 pl-3 border-l border-blue-900/50 leading-relaxed">
          Mühendislik bilgimizi ve yaratıcılığımızı kullanarak, çevreye duyarlı ve enerji tasarrufu sağlayan yenilikçi elektrikli araçlar üretmektir. Bu süreçte sadece araç geliştirmekle kalmıyoruz; aynı zamanda yenilikçi enerji yönetimi sistemleri, verimli batarya çözümleri ve modern sürüş teknolojileri üzerine çalışmalar yapıyoruz.
          </p>
          </div>
          
          {/* Code-like blinking cursor */}
          <div className="w-1.5 h-4 bg-blue-500/70 animate-blink absolute bottom-3 right-3"></div>
          </div>
          
          {/* Sponsorship direct button */}
          <button
            onClick={() => scrollToSection('sponsors')}
            className="mt-4 group relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-white transition-all duration-300 ease-out border-2 border-red-500 rounded-md bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-600 hover:to-red-700"
          >
          <span className="relative flex items-center gap-2 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90"></span>
              Sponsorluk
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute -right-full -bottom-full h-40 w-40 rounded-full blur-md bg-red-500/20 transition-all duration-500 group-hover:scale-110"></span>
          </button>
          </div>
          
          <div className="bg-gradient-to-br from-[#1c1d20]/90 via-black/80 to-[#1c1d20]/90 backdrop-blur-md p-4 rounded-xl border border-gray-800/50 shadow-lg hover:shadow-blue-900/5 transition-all duration-300 relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-circuit-pattern opacity-[0.03]"></div>
            
            {/* Tech lines animation in background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent absolute top-0 animate-scanLine"></div>
            <div className="h-full w-0.5 bg-gradient-to-b from-transparent via-red-500/20 to-transparent absolute right-0 animate-scanVertical"></div>
          </div>
          
          <h3 className="text-lg font-bold mb-4 text-blue-400 flex items-center relative z-10">
            <span className="text-blue-500 mr-2"><BarChart size={18} /></span>
            Takım İstatistikleri
            <span className="ml-2 text-xs font-mono text-gray-500">[v2.4]</span>
          </h3>
          
          <div className="space-y-3 relative z-10">
            {/* Team member stat */}
            <div className="bg-black/40 rounded-lg p-3 border border-gray-800/50 hover:border-blue-900/50 transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-900/30 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-gray-300 text-sm">Takım Üyeleri</span>
          </div>
          <div className="bg-blue-900/20 rounded-full px-2 py-0.5 text-blue-400 font-mono text-sm flex items-center justify-center min-w-[32px]">
          24
          </div>
          </div>
          <div className="h-1.5 bg-gray-800/60 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-7/12 animate-pulse-slow rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full absolute -mt-1.5 ml-[calc(58.333%-3px)] shadow-md shadow-blue-500/30"></div>
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-gray-500">
          <span>0</span>
            <span>Mühendislik, Tasarım, Yönetim</span>
            <span>30</span>
          </div>
          </div>
          
          {/* Competition stat */}
          <div className="bg-black/40 rounded-lg p-3 border border-gray-800/50 hover:border-red-900/50 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-900/30 text-red-500">
                <Activity size={16} />
            </div>
          <span className="text-gray-300 text-sm">Teknofest Yarışması</span>
          </div>
          <div className="bg-red-900/20 rounded-full px-2 py-0.5 text-red-400 font-mono text-sm flex items-center justify-center min-w-[32px]">
          1
          </div>
          </div>
          <div className="h-1.5 bg-gray-800/60 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-4/12 rounded-full">
              <div className="h-full w-full bg-red-500 animate-pulse-slow"></div>
            </div>
          <div className="w-1.5 h-1.5 bg-red-400 rounded-full absolute -mt-1.5 ml-[calc(33.333%-3px)] shadow-md shadow-red-500/30"></div>
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-gray-500">
          <span>0</span>
            <span>Efficiency Challenge 2025</span>
            <span>1</span>
          </div>
          </div>
          
          {/* Prototype stage */}
          <div className="bg-black/40 rounded-lg p-3 border border-gray-800/50 hover:border-purple-900/50 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-900/30 text-purple-500">
                <Zap size={16} />
            </div>
          <span className="text-gray-300 text-sm">Prototip Aşaması</span>
          </div>
          <div className="bg-purple-900/20 rounded-full px-2 py-0.5 text-purple-400 font-mono text-sm flex items-center justify-center min-w-[32px]">
          %35
          </div>
          </div>
          <div className="h-1.5 bg-gray-800/60 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 w-4/12 animate-pulse-slow rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full absolute -mt-1.5 ml-[calc(33.333%-3px)] shadow-md shadow-purple-500/30"></div>
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-gray-500">
          <span>0%</span>
            <span>Tasarım, Üretim, Test</span>
            <span>100%</span>
          </div>
          </div>
          
          {/* Departments */}
          <div className="bg-black/40 rounded-lg p-3 border border-gray-800/50 hover:border-yellow-900/50 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-yellow-900/30 text-yellow-500">
                <CircuitBoard size={16} />
            </div>
          <span className="text-gray-300 text-sm">Ana Departmanlar</span>
          </div>
          <div className="bg-yellow-900/20 rounded-full px-2 py-0.5 text-yellow-400 font-mono text-sm flex items-center justify-center min-w-[32px]">
          2
          </div>
          </div>
          <div className="h-1.5 bg-gray-800/60 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 w-5/12 animate-pulse-slow rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full absolute -mt-1.5 ml-[calc(41.666%-3px)] shadow-md shadow-yellow-500/30"></div>
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-gray-500">
          <span>0</span>
            <span>Elektrik-Elektronik & Mekanik</span>
            <span>5</span>
          </div>
          </div>

          {/* Code-like corner decorations */}
          <div className="absolute top-1 right-2 text-blue-500/50 font-mono text-[9px]">{'<stats/>'}</div>
            <div className="absolute bottom-1 left-2 text-blue-500/50 font-mono text-[9px]">{'</data>'}</div>
          </div>
          </div>
          </div>
          
          {/* Team Members Section */}
          <div className="mt-16 md:mt-24">
            <div className="text-center mb-8 md:mb-12 relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <img src={`${process.env.PUBLIC_URL}/logo_sadece.png`} alt="Voltaris Logo" className="w-32 h-32 sm:w-64 sm:h-64" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-blue-500 inline-block relative">
                Takım Üyelerimiz
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
              </h3>
              <p className="text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-2">
                Ömer Ünal'ın kaptanlığında Makine Mühendisliği, Elektrik Elektronik Mühendisliği, İnşaat Mühendisliği, Malzeme Mühendisliği öğrencilerinden oluşan 24 kişilik ekibimiz, Teknofest'e ilk kez katılmanın heyecanını yaşıyoruz.
              </p>
              
              <TeamStats />
            </div>
            
            <div className="relative">
              {/* Academic grid pattern for background */}
              <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="w-full h-full" style={{ 
                  backgroundImage: "linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)",
                  backgroundSize: "25px 25px"
                }}></div>
              </div>
              
              {/* Team structure with expandable sections */}
              <div className="overflow-x-auto">
                <ProfessionalOrgChart teamData={teamData} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Section - lighter background */}
      <section id="vehicle" className="py-16 md:py-20 relative bg-[#27282c]/80">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Araç Özellikleri</h2>
            <div className="h-1 w-16 sm:w-20 bg-red-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-red-500/40 transition-colors group h-full">
              <div className="text-red-500 mb-4 flex justify-center">
                <Cpu size={32} className="sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">Motor & Elektronik</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Planlanan BLDC Hub Motor (2.5kW)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Geliştirilen Yerli Motor Sürücü</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Li-ion 68.97V 50Ah Batarya Planlaması</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Yerli BYS Sistemi Çalışmaları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>STM32F407 AKS Tasarımı</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-blue-500/40 transition-colors group h-full">
              <div className="text-blue-500 mb-4 flex justify-center">
                <Terminal size={32} className="sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">Şasi & Yapı</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Alüminyum 6063 T6 Şasi Tasarımı</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Cam Elyaf (Fiberglass) Kabuk Planlaması</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Bağımsız Süspansiyon Çalışmaları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Hidrolik Disk Fren Sistemi Tasarımı</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>17" Jant Özellikleri</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-800 hover:border-red-500/40 transition-colors group h-full">
              <div className="text-red-500 mb-4 flex justify-center">
                <Camera size={32} className="sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">ADAS Sistemleri</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Şerit Takip Sistemi Tasarımı</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Trafik İşareti Tanıma Çalışmaları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Akıllı Hız Sabitleme Geliştirmesi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Kör Nokta Algılama Prototipi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Sürücü Asistan Arayüz Konsepti</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 sm:mt-16 bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center text-gradient-red-blue">Teknik Özellikler</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {/* Technical data grid */}
            <div className="bg-[#1f2023]/60 p-3 sm:p-4 rounded-lg border border-gray-700">
            <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-red-500 mb-1">50+</div>
            <div className="text-xs uppercase tracking-wider text-gray-500">km/sa</div>
            <div className="text-xs sm:text-sm mt-1 text-gray-300">Hedef Hız</div>
            </div>
            </div>
            
            <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg border border-gray-800">
            <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-blue-500 mb-1">2.5</div>
            <div className="text-xs uppercase tracking-wider text-gray-500">kW</div>
            <div className="text-xs sm:text-sm mt-1 text-gray-300">Motor Gücü (x2)</div>
            </div>
            </div>
            
            <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg border border-gray-800">
            <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-red-500 mb-1">230</div>
            <div className="text-xs uppercase tracking-wider text-gray-500">kg</div>
            <div className="text-xs sm:text-sm mt-1 text-gray-300">Hedef Ağırlık</div>
            </div>
            </div>
            
            <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg border border-gray-800">
            <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-blue-500 mb-1">2024</div>
            <div className="text-xs uppercase tracking-wider text-gray-500">mayıs</div>
            <div className="text-xs sm:text-sm mt-1 text-gray-300">Kuruluş</div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Section - lighter background */}
      <section id="technical" className="py-16 md:py-20 relative bg-[#27282c]/90">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Teknik Detaylar</h2>
            <div className="h-1 w-16 sm:w-20 bg-red-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10">
            <div className="bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-500">Elektronik Sistem Mimarisi</h3>
              
              <div className="bg-[#1f2023]/60 p-3 sm:p-4 rounded-lg border border-gray-700 mb-4 sm:mb-6">
                <h4 className="font-medium mb-2 sm:mb-3 text-blue-500 text-sm">Güç Yönetim Sistemi (Tasarım)</h4>
                <ul className="space-y-1 sm:space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Planlanan Li-ion 48V 40Ah Batarya Paketi</span>
                </li>
                <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Geliştirilmekte olan Hücre Dengeleme Sistemi</span>
                </li>
                <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>DC-DC Dönüştürücü Tasarımı</span>
                </li>
                <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Rejeneratif Frenleme Sistemi Konsepti</span>
                </li>
                </ul>
              </div>
              
              <div className="bg-[#1f2023]/60 p-3 sm:p-4 rounded-lg border border-gray-700">
                <h4 className="font-medium mb-2 sm:mb-3 text-red-500 text-sm">Haberleşme Sistemi (Geliştirme)</h4>
                <ul className="space-y-1 sm:space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>CAN Bus Ana Veri Yolu Tasarımı</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>WiFi/Bluetooth Uzaktan İzleme Planlaması</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>I2C ve SPI Sensör Haberleşme Protokolleri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>STM32 MCU Tabanlı Kontrol Sistemi</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-500 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                VOL1 Teknik Özellikler
                <div className="ml-2 text-xs font-mono text-gray-500">[Prototip Aşaması: %35]</div>
              </h3>
              
              <div className="relative h-48 sm:h-64 mb-4 bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full p-4 flex items-center">
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0 technical-animation-bg"></div>
                      <div className="absolute inset-0 flex flex-col justify-center p-4 z-10">
                        <div className="text-sm font-mono text-blue-400 mb-2">// VOLTARİS_VOL1</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-black/30 p-2 rounded border border-gray-800">
                            <div className="text-gray-400">Şasi Malzeme:</div>
                            <div className="text-white">Alüminyum 6063 T6</div>
                          </div>
                          <div className="bg-black/30 p-2 rounded border border-gray-800">
                            <div className="text-gray-400">Kabuk Malzeme:</div>
                            <div className="text-white">Cam Elyaf (Fiberglass)</div>
                          </div>
                          <div className="bg-black/30 p-2 rounded border border-gray-800">
                            <div className="text-gray-400">Batarya:</div>
                            <div className="text-white">68.97V 50Ah Li-ion</div>
                          </div>
                          <div className="bg-black/30 p-2 rounded border border-gray-800">
                            <div className="text-gray-400">Motor:</div>
                            <div className="text-white">BLDC Hub Motor (2x2.5kW)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
              <h4 className="font-medium mb-2 text-red-500 text-sm">Süspansiyon</h4>
              <div className="text-xs text-gray-400">Çift salıncaklı süspansiyon sistemi, Mondial Drift L 125 amortisörler ile donatılmış, ayarlanabilir rotil bağlantıları.</div>
              </div>
              
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
              <h4 className="font-medium mb-2 text-blue-500 text-sm">Kabin ve Kabuk</h4>
              <div className="text-xs text-gray-400">Cam elyaf (fiberglass) kabuk, elle yatırma yöntemiyle üretim, 0.16 sürtünme katsayısı hedefi ile optimize edilmiş tasarım.</div>
              </div>
              </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                    <h4 className="font-medium mb-2 text-red-500 text-sm">Fren Sistemi</h4>
                    <div className="text-xs text-gray-400">Hidrolik disk fren, ön ve arka tekerleklerde fren diskleri, 50 km/h hızdan 14.05m'de durma performansı.</div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                    <h4 className="font-medium mb-2 text-blue-500 text-sm">Direksiyon Sistemi</h4>
                    <div className="text-xs text-gray-400">Kremayer-pinyon dişli sistemi, 35 derece dönme açısı, 3.47m minimum dönüş yarıçapı.</div>
                  </div>
                </div>
            </div>
          </div>
          
          {/* Add Ackermann Principle Component */}
          <div className="mt-8">
            <AckermannPrinciple />
          </div>
        </div>
      </section>

      {/* ADAS Systems Section - lighter background */}
      <section id="adas" className="py-16 md:py-20 relative bg-[#27282c]/80">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">ADAS Sistemi Planlaması</h2>
            <div className="h-1 w-16 sm:w-20 bg-red-500 mx-auto"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
              Advanced Driver Assistance Systems (ADAS) ile aracımız için planladığımız gelişmiş sürüş destek sistemleri.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-gradient-to-br from-red-900/30 via-black to-red-900/20 p-6 rounded-lg border border-red-900/30 hover:border-red-500/40 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
              <div className="flex items-center mb-4">
                <div className="text-red-500 mr-3">
                  <GitMerge size={24} />
                </div>
                <h3 className="text-xl font-bold text-red-400">Şerit Takip Sistemi</h3>
              </div>
              <div className="latex-style-box bg-black/40 p-4 rounded-lg border border-red-900/30">
                <div className="text-white math-formula red-formula academic-formula">
                  <div className="formula-heading">Şerit Tespit Algoritması</div>
                  <div className="formula-content">
                    <p>Perspektif Dönüşümü: M = <span className="matrix-notation">T<sub>src→dst</sub></span></p>
                    <p>Polinom Modeli: f(x) = ax<sup>2</sup> + bx + c</p>
                    <p>Ağırlıklı Filtre: W<sub>i</sub> = [0.4, 0.2, 0.15, 0.1, 0.075, 0.05, 0.025]</p>
                    <p>Kalibrasyon Faktörü: 0.0293 m/piksel</p>
                  </div>
                  <div className="formula-parameters">Performans: 23 FPS | Doğruluk: %95.7</div>
                </div>
                <p className="text-gray-300 mt-3">
                  Kamera görüntüsünden Canny edge detection ve Hough transform kullanarak şeritleri tespit eder. Sonuç olarak sürücüye sesli ve görsel uyarılar verilir.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 via-black to-blue-900/20 p-6 rounded-lg border border-blue-900/30 hover:border-blue-500/40 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
              <div className="flex items-center mb-4">
                <div className="text-blue-500 mr-3">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-xl font-bold text-blue-400">Trafik İşareti Tanıma</h3>
              </div>
              <div className="latex-style-box bg-black/40 p-4 rounded-lg border border-blue-900/30">
                <div className="text-white math-formula blue-formula academic-formula">
                  <div className="formula-heading">YOLOv5s CNN Mimarisi</div>
                  <div className="formula-content">
                    <p>Omurga: CSPDarknet53 | Özellik Çıkarıcı: PANet</p>
                    <p>Giriş Formatı: 640×640 px | Format: float16/32</p>
                    <p>Güven Eşiği: τ = 0.5</p>
                    <p>NMS Algoritması: IoU<sub>threshold</sub> = 0.45</p>
                  </div>
                  <div className="formula-parameters">Doğruluk: %91.75 | Çıkarım: 15-20ms | Sınıflar: 61</div>
                </div>
                <p className="text-gray-300 mt-3">
                  YOLOv5s tabanlı derin öğrenme modeli ile trafik işaretlerini gerçek zamanlı olarak tanır ve sürücüye bilgilendirici uyarılar verir.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-900/30 via-black to-red-900/20 p-6 rounded-lg border border-red-900/30 hover:border-red-500/40 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
              <div className="flex items-center mb-4">
                <div className="text-red-500 mr-3">
                  <Cpu size={24} />
                </div>
                <h3 className="text-xl font-bold text-red-400">Akıllı Hız Sabitleyici</h3>
              </div>
              <div className="latex-style-box bg-black/40 p-4 rounded-lg border border-red-900/30">
                <div className="text-white math-formula red-formula text-center pid-formula academic-formula">
                  <div className="formula-heading">PID Kontrolcü Denklemi</div>
                  <div className="formula-content formula-pid">
                    u(t) = K<sub>p</sub>e(t) + K<sub>i</sub> ∫<sub>0</sub><sup>t</sup> e(τ) dτ + K<sub>d</sub> ∂e(t)/∂t
                    <div className="pid-params">K<sub>p</sub> = 3.5, K<sub>i</sub> = 0.2, K<sub>d</sub> = 0.8</div>
                  </div>
                  <div className="formula-parameters">Frekans: 1kHz | PWM Aralığı: 0-1023 | I<sub>limit</sub>: ±25</div>
                </div>
                <p className="text-gray-300 mt-3">
                  Optimize edilmiş PID kontrol algoritması ile hız sabitlenir, enerji verimliliği maksimize edilir ve sürüş konforu artırılır.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 via-black to-blue-900/20 p-6 rounded-lg border border-blue-900/30 hover:border-blue-500/40 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
              <div className="flex items-center mb-4">
                <div className="text-blue-500 mr-3">
                  <Camera size={24} />
                </div>
                <h3 className="text-xl font-bold text-blue-400">Kör Nokta Algılama</h3>
              </div>
              <div className="latex-style-box bg-black/40 p-4 rounded-lg border border-blue-900/30">
                <div className="text-white math-formula blue-formula academic-formula">
                  <div className="formula-heading">Radar Tabanlı Tespit Sistemi</div>
                  <div className="formula-content">
                    <p>Model: RD-03D Çoklu Nesne Algılama Radarı</p>
                    <p>Algılama Mesafesi: 0.5 - 3m</p>
                    <p>Açısal Alan: θ = ±30°</p>
                    <p>Parametreler: Konum (x,y), Hız (v), Mesafe (d)</p>
                  </div>
                  <div className="formula-parameters">Yenileme Hızı: 50Hz | Montaj Konumu: Arka</div>
                </div>
                <p className="text-gray-300 mt-3">
                  Ultrasonik ve kızılötesi sensörler ile kör noktalardaki engeller tespit edilir ve sürücüye uyarı verilir.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 mb-10">
            {/* Using React state for more reliable and reactive toggling */}
            <ExpandableSection 
              title="ADAS Sistem Mimarisi" 
              color="purple"
              id="adasArchitecture"
            >
              <div className="animate-fadeIn">
                <AdasSystemArchitecture />
              </div>
            </ExpandableSection>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Lane Detection System */}
            <div className="bg-gradient-to-r from-red-900/30 via-black to-red-900/30 p-4 rounded-lg border border-red-500/30 hover:border-red-500/50 transition-all duration-300 shadow-lg collapsible-diagram-container relative overflow-hidden group">
              <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => {
                  const element = document.getElementById('laneDetectionContent');
                  if (element) {
                    element.classList.toggle('hidden');
                    document.getElementById('laneDetectionIcon')?.classList.toggle('rotate-180');
                  }
                }}
              >
                <h3 className="text-xl font-bold text-red-400">Şerit Takip Sistemi</h3>
                <ChevronDown id="laneDetectionIcon" className="text-red-400 transition-transform duration-300" />
              </div>
              <div id="laneDetectionContent" className="hidden mt-4 overflow-x-auto">
                <div className="animate-slideInUp">
                  <LaneDetectionDiagram />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            
            {/* Traffic Sign Detection */}
            <div className="bg-gradient-to-r from-blue-900/30 via-black to-blue-900/30 p-4 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 shadow-lg collapsible-diagram-container relative overflow-hidden group">
              <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => {
                  const element = document.getElementById('trafficSignContent');
                  if (element) {
                    element.classList.toggle('hidden');
                    document.getElementById('trafficSignIcon')?.classList.toggle('rotate-180');
                  }
                }}
              >
                <h3 className="text-xl font-bold text-blue-400">Trafik İşareti Tanıma</h3>
                <ChevronDown id="trafficSignIcon" className="text-blue-400 transition-transform duration-300" />
              </div>
              <div id="trafficSignContent" className="hidden mt-4 overflow-x-auto">
                <div className="animate-slideInUp">
                  <TrafficSignDetectionDiagram />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            
            {/* Blind Spot Detection */}
            <div className="bg-gradient-to-r from-green-900/30 via-black to-green-900/30 p-4 rounded-lg border border-green-500/30 hover:border-green-500/50 transition-all duration-300 shadow-lg collapsible-diagram-container relative overflow-hidden group">
              <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => {
                  const element = document.getElementById('blindSpotContent');
                  if (element) {
                    element.classList.toggle('hidden');
                    document.getElementById('blindSpotIcon')?.classList.toggle('rotate-180');
                  }
                }}
              >
                <h3 className="text-xl font-bold text-green-400">Kör Nokta Tespit Sistemi</h3>
                <ChevronDown id="blindSpotIcon" className="text-green-400 transition-transform duration-300" />
              </div>
              <div id="blindSpotContent" className="hidden mt-4 overflow-x-auto">
                <div className="animate-slideInUp">
                  <BlindSpotDetectionDiagram />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            
            {/* Cruise Control System */}
            <div className="bg-gradient-to-r from-yellow-900/30 via-black to-yellow-900/30 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 shadow-lg collapsible-diagram-container relative overflow-hidden group">
              <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => {
                  const element = document.getElementById('cruiseControlContent');
                  if (element) {
                    element.classList.toggle('hidden');
                    document.getElementById('cruiseControlIcon')?.classList.toggle('rotate-180');
                  }
                }}
              >
                <h3 className="text-xl font-bold text-yellow-400">Akıllı Hız Sabitleyici</h3>
                <ChevronDown id="cruiseControlIcon" className="text-yellow-400 transition-transform duration-300" />
              </div>
              <div id="cruiseControlContent" className="hidden mt-4 overflow-x-auto">
                <div className="animate-slideInUp">
                  <CruiseControlSystemDiagram />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Section - lighter background */}
      <section id="sponsors" className="py-16 md:py-20 relative bg-[#27282c]/90">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Sponsorluk</h2>
            <div className="h-1 w-16 sm:w-20 bg-red-500 mx-auto"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
              Voltaris Elektromobil Takımı olarak sponsorlarımızla birlikte geleceğin ulaşım teknolojilerini geliştirmeyi hedefliyoruz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 md:mb-12">
            <div className="bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg transition-all duration-300 text-center group h-full platinum-sponsor-card relative overflow-hidden">
              {/* Animated corner elements */}
              <div className="platinum-corner-effect platinum-corner-tl"></div>
              <div className="platinum-corner-effect platinum-corner-tr"></div>
              <div className="platinum-corner-effect platinum-corner-bl"></div>
              <div className="platinum-corner-effect platinum-corner-br"></div>
              
              <div className="absolute inset-0 bg-gradient-radial from-[#e5e4e2]/10 to-transparent opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="platinum-shimmer absolute inset-0 opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="text-[#e5e4e2] font-bold mb-2 platinum-text">Platin</div>
                <div className="text-white text-lg sm:text-xl mb-3 sm:mb-4">₺50,000+</div>
                <ul className="text-left space-y-1.5 mb-4 sm:mb-6">
                  <li className="flex items-start text-xs sm:text-sm">
                    <span className="text-[#e5e4e2] mr-2 mt-0.5">•</span>
                    <span className="text-gray-300">Aracın ön ve yan yüzeylerinde büyük logo</span>
                  </li>
                  <li className="flex items-start text-xs sm:text-sm">
                    <span className="text-[#e5e4e2] mr-2 mt-0.5">•</span>
                    <span className="text-gray-300">Tüm medya materyallerinde öncelikli tanıtım</span>
                  </li>
                  <li className="flex items-start text-xs sm:text-sm">
                    <span className="text-[#e5e4e2] mr-2 mt-0.5">•</span>
                    <span className="text-gray-300">Özel VIP etkinlik davetleri</span>
                  </li>
                </ul>
                <button 
                  className="w-full bg-gradient-to-r from-[#babac0] via-[#e5e4e2] to-[#babac0] text-gray-900 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-[#e5e4e2]/20 hover:shadow-[#e5e4e2]/40 transition-all duration-300"
                  onClick={() => handleOpenSponsorshipModal('platinum')}
                >İletişime Geç</button>
              </div>
            </div>
            
            <div className="bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-500/30 hover:border-gray-400/50 transition-all duration-300 transform hover:-translate-y-1 text-center group h-full">
              <div className="text-gray-400 font-bold text-xl sm:text-2xl mb-2">Gümüş</div>
              <div className="text-white text-lg sm:text-xl mb-3 sm:mb-4">₺25,000+</div>
              <ul className="text-left space-y-1.5 mb-4 sm:mb-6">
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-gray-400 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Aracın yan yüzeyinde orta boy logo</span>
                </li>
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-gray-400 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Sosyal medya tanıtımları</span>
                </li>
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-gray-400 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Etkinlik davetleri</span>
                </li>
              </ul>
              <button 
                className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg text-sm"
                onClick={() => handleOpenSponsorshipModal('silver')}
              >İletişime Geç</button>
            </div>
            
            <div className="bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-amber-700/30 hover:border-amber-600/50 transition-all duration-300 transform hover:-translate-y-1 text-center group h-full">
              <div className="text-amber-700 font-bold text-xl sm:text-2xl mb-2">Bronz</div>
              <div className="text-white text-lg sm:text-xl mb-3 sm:mb-4">₺10,000+</div>
              <ul className="text-left space-y-1.5 mb-4 sm:mb-6">
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-amber-700 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Aracın arka kısmında küçük logo</span>
                </li>
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-amber-700 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Web sitesinde tanıtım</span>
                </li>
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-amber-700 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Teşekkür sertifikası</span>
                </li>
              </ul>
              <button 
                className="w-full bg-gradient-to-r from-amber-700 to-amber-900 text-white px-3 sm:px-4 py-2 rounded-lg text-sm"
                onClick={() => handleOpenSponsorshipModal('bronze')}
              >İletişime Geç</button>
            </div>
            
            <div className="bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-blue-600/30 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 text-center group h-full">
              <div className="text-blue-500 font-bold text-xl sm:text-2xl mb-2">Destekçi</div>
              <div className="text-white text-lg sm:text-xl mb-3 sm:mb-4">₺5,000+</div>
              <ul className="text-left space-y-1.5 mb-4 sm:mb-6">
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-blue-500 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Web sitesi ve broşürlerde logo</span>
                </li>
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-blue-500 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Sosyal medya teşekkür paylaşımı</span>
                </li>
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-blue-500 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Teşekkür sertifikası</span>
                </li>
              </ul>
              <button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 sm:px-4 py-2 rounded-lg text-sm"
                onClick={() => handleOpenSponsorshipModal('supporter')}
              >İletişime Geç</button>
            </div>
          </div>
          
          <div className="bg-[#1c1d20]/70 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-500">Sponsorluk Fırsatları</h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Voltaris Elektromobil Takımı olarak, elektrikli araç teknolojilerinin gelişimine katkıda bulunmak isteyen kuruluşlara çeşitli sponsorluk paketleri sunmayı planlıyoruz.
                </p>
                
                <div className="space-y-3 sm:space-y-4 mt-5 sm:mt-6">
                  <div className="flex items-start">
                    <div className="text-red-500 mr-3 mt-1">
                      <Terminal size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">Teknoloji Transferi</h4>
                      <p className="text-xs sm:text-sm text-gray-400">Üniversite-sanayi işbirliği ile AR-GE projeleri ve teknoloji transferi imkanı.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-blue-500 mr-3 mt-1">
                      <Camera size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">Marka Görünürlüğü</h4>
                      <p className="text-xs sm:text-sm text-gray-400">Yarışma, etkinlik ve medya kanallarında markanızı gösterme fırsatı.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-500">İletişime Geçin</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - lighter background */}
      <section id="contact" className="py-16 md:py-20 relative bg-[#27282c]/80">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">İletişim</h2>
            <div className="h-1 w-16 sm:w-20 bg-red-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-700 text-center h-full">
              <div className="inline-block p-3 bg-red-900/20 rounded-full mb-3 sm:mb-4 text-red-500">
                <Cpu size={24} className="sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Adres</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                İzmir Yüksek Teknoloji Enstitüsü<br />
                Mühendislik Fakültesi<br />
                Urla, İzmir
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-800 text-center h-full">
              <div className="inline-block p-3 bg-blue-900/20 rounded-full mb-3 sm:mb-4 text-blue-500">
                <Terminal size={24} className="sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">İletişim</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                voltaris.official@gmail.com<br />
                +90 532 496 2216 (Gamze)<br />
                +90 532 777 5679 (Büşra)
              </p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-800 text-center h-full">
              <div className="inline-block p-3 bg-red-900/20 rounded-full mb-3 sm:mb-4 text-red-500">
                <Camera size={24} className="sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Sosyal Medya</h3>
              <div className="flex justify-center space-x-3 sm:space-x-4 mt-3">
      
              <a href="https://instagram.com/Voltaris.official" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">Instagram</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.172.053 1.803.248 2.228.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.168.425.361 1.055.413 2.228.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.052 1.172-.246 1.803-.413 2.228-.217.562-.477.96-.896 1.381-.42.419-.819.679-1.381.896-.425.168-1.056.361-2.228.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.172-.053-1.803-.248-2.228-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.168-.425-.361-1.055-.413-2.228-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.172.248-1.803.413-2.228.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.425-.168 1.056-.361 2.228-.413A31.89 31.89 0 0112 2.163zm0 1.646c-3.142 0-3.496.011-4.716.067-.976.044-1.502.232-1.82.36-.347.135-.587.319-.833.566-.247.247-.431.486-.566.833-.128.318-.316.844-.36 1.82-.056 1.22-.067 1.574-.067 4.716s.011 3.496.067 4.716c.044.976.232 1.502.36 1.82.135.347.319.587.566.833.247.247.486.431.833.566.318.128.844.316 1.82.36 1.22.056 1.574.067 4.716.067s3.496-.011 4.716-.067c.976-.044 1.502-.232 1.82-.36.347-.135.587-.319.833-.566.247-.247.431-.486.566-.833.128-.318.316-.844.36-1.82.056-1.22.067-1.574.067-4.716s-.011-3.496-.067-4.716c-.044-.976-.232-1.502-.36-1.82-.135-.347-.319-.587-.566-.833-.247-.247-.486-.431-.833-.566-.318-.128-.844-.316-1.82-.36-1.22-.056-1.574-.067-4.716-.067zM12 7.168a4.832 4.832 0 100 9.664 4.832 4.832 0 000-9.664zm0 8a3.168 3.168 0 110-6.336 3.168 3.168 0 010 6.336zm4.808-8.076a1.152 1.152 0 100 2.304 1.152 1.152 0 000-2.304z" clip-rule="evenodd" />
                </svg>
              </a>




                <a href="https://github.com/voltaris-official" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026a9.564 9.564 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-12 bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gradient-red-blue">Mesaj Gönderin</h3>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Adınız Soyadınız" 
                    className="w-full bg-[#1a1b1e]/70 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="E-posta Adresiniz" 
                    className="w-full bg-[#1a1b1e]/70 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Konu" 
                    className="w-full bg-[#1a1b1e]/70 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <textarea 
                    placeholder="Mesajınız" 
                    rows="5"
                    className="w-full bg-[#1a1b1e]/70 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  ></textarea>
                </div>
                <div className="text-right">
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white px-5 py-2.5 rounded-lg inline-flex items-center transition-colors shadow-lg shadow-red-900/20 text-sm"
                  >
                    Gönder <ChevronRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-gray-500">
            <p>© 2025 Voltaris Elektromobil Takımı. Tüm hakları saklıdır.</p>
          </div>
          

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1b1e] py-8 sm:py-12 border-t border-red-900/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8 sm:mb-8">
            <div className="flex items-center mb-5">
              <img 
                src={`${process.env.PUBLIC_URL}/logo_sadece.png`} 
                alt="Voltaris Logo" 
                className="h-10 w-10 sm:h-14 sm:w-14 mb-4 animate-pulse-slow hover:scale-125 transition-transform duration-500" 
              />
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-semibold tracking-wide">VOLTARIS</div>
              <div className="text-xs sm:text-sm text-gray-500">İYTE Elektrikli Araç Takımı</div>
            </div>
            
            <div className="flex space-x-4 mt-3">
              <a href="https://instagram.com/Voltaris.official" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.linkedin.com/company/i̇yte-voltaris-teknofest-efficiency-challange/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="mailto:unal.omer@proton.me" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="tel:+905531752708" className="text-gray-400 hover:text-white transition-colors">
                <Phone size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-900 pt-6 flex flex-col items-center">
            <div className="text-gray-500 text-xs sm:text-sm mb-3">
              © 2025 Voltaris. Tüm hakları saklıdır.
            </div>
            
            <div className="text-xs sm:text-sm mb-4 font-mono flex justify-center">
              <span className="text-red-500">{'// '}</span>
              <span className="text-green-500">{'DESIGNED'}</span>
              <span className="text-yellow-500">{'_WITH_'}</span>
              <span className="text-blue-500">{'PASSION_'}</span>
              <span className="text-red-500">{'BY_'}</span>
              <span className="text-green-500">{'VOLTARIS_'}</span>
              <span className="text-yellow-500">{'TEAM'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;