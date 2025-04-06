import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronDown, Menu, X, 
  ChevronRight, Cpu, Terminal, Camera, 
  GitMerge, Linkedin, Mail, Phone, Instagram, AlertTriangle
} from "lucide-react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import TechnicalDataViz from './TechnicalDataViz';
import SponsorshipModal from './SponsorshipModal';
import teamData from './teamData';
import { TeamStats } from './TeamComponents';
import { FlowingCircuitEntryAnimation, CircuitLoadingAnimation, ProfessionalOrgChart } from './components/new';
import AdasSystemArchitecture, { LaneDetectionDiagram, TrafficSignDetectionDiagram, CruiseControlSystemDiagram, BlindSpotDetectionDiagram } from './AdasSvgComponents';
import TechnicalModelViewer from './components/TechnicalModelViewer';
import EnhancedSponsorsBar from './components/EnhancedSponsorsBar';
import './styles.css';
import { useMouseTrail, useParallax, useScrollAnimation, useTechnicalSpecsAnimation } from './hooks/useInteractive';

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
          
          <div className="bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg border border-blue-900/30">
            <h5 className="text-blue-500 font-medium mb-2 flex items-center">
              <Cpu size={18} className="mr-2" />
              Algoritma Birimi
            </h5>
            <ul className="text-sm text-gray-400 space-y-1">
              <li className="flex items-start">
                <div className="text-blue-500 mr-2">•</div>
                <div>YOLOv5s Trafik İşaret Algılayıcı</div>
              </li>
              <li className="flex items-start">
                <div className="text-blue-500 mr-2">•</div>
                <div>PID Kontrolü Hız Sabitleyici</div>
              </li>
              <li className="flex items-start">
                <div className="text-blue-500 mr-2">•</div>
                <div>Görüntü İşleme ile Şerit Takibi</div>
              </li>
            </ul>
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
  
  // Use a default fallback model if the actual model fails to load
  // eslint-disable-next-line no-unused-vars
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  // Update the path to use public folder - React will look for assets in the public directory
  const modelPath = process.env.PUBLIC_URL + '/models/model_3d.gltf';
  
  // Technical specifications for different parts of the car
  const carSpecs = {
    body: {
      title: "VOLTARIS VOL-1",
      specs: [
        "Cam Elyaf Kabuk",
        "Aerodinamik Optimize",
        "230kg Toplam Ağırlık",
        "3136mm Uzunluk"
      ]
    },
    wheels: {
      title: "Tekerlekler",
      specs: [
        "17\" Çap",
        "Hafif Alaşım",
        "Düşük Yuvarlanma Direnci",
        "2.5 bar Basınç"
      ]
    },
    motor: {
      title: "Motor",
      specs: [
        "2x2.5kW BLDC Hub Motor",
        "%92 Verimlilik",
        "785 RPM Nominal Hız",
        "30.39 Nm Tork"
      ]
    },
    battery: {
      title: "Batarya",
      specs: [
        "3458 Wh Enerji",
        "68.97V Nominal Gerilim",
        "50Ah Kapasite",
        "100+ km Menzil"
      ]
    }
  };
  
  // Handle pointer events for interactive 3D elements
  const handlePointerOver = (e, part) => {
    e.stopPropagation();
    setHovered(true);
    setActivePart(part);
    setSpecs(carSpecs[part]);
    document.body.style.cursor = "pointer";
  };
  
  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
  };
  
  const handleClick = (e, part) => {
    e.stopPropagation();
    setClicked(!clicked);
    setActivePart(part);
    setSpecs(carSpecs[part]);
  };
  
  useEffect(() => {
    // Store the current ref value
    const currentGroup = group.current;
    
    // Try to load the model
    try {
      // Load the model directly in the component to handle errors
      const gltfLoader = new GLTFLoader();
      
      // Remove renderer from three.js for better memory usage
      THREE.Cache.enabled = true;
      
      gltfLoader.load(
        modelPath,
        (gltf) => {
          const modelScene = gltf.scene.clone();
          
          // Apply materials and optimizations after model is loaded
          modelScene.traverse((child) => {
            if (child.isMesh) {
              // Ensure the model casts and receives shadows
              child.castShadow = true;
              child.receiveShadow = true;
              
              // Enhance material properties if needed
              if (child.material) {
                child.material.roughness = 0.7;
                child.material.metalness = 0.8;
                
                // Add interactivity for special parts by detecting name patterns
                if (child.name.toLowerCase().includes('body')) {
                  bodyRef.current = child;
                  child.userData.part = 'body';
                } else if (child.name.toLowerCase().includes('wheel')) {
                  wheelsRef.current.push(child);
                  child.userData.part = 'wheels';
                } else if (child.name.toLowerCase().includes('light')) {
                  lightsRef.current.push(child);
                  child.userData.part = 'lights';
                  
                  // Add emissive material for lights
                  child.material.emissive = new THREE.Color(0xff4254);
                  child.material.emissiveIntensity = 1;
                }
                
                // Make parts interactive
                child.material = child.material.clone(); // Ensure we don't modify shared materials
              }
            }
          });
          
          // Center the model properly
          const box = new THREE.Box3().setFromObject(modelScene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
              
              // Optimize geometry to reduce memory usage
              modelScene.traverse((child) => {
                if (child.isMesh && child.geometry) {
                  child.geometry.dispose();
                  child.geometry = child.geometry.toNonIndexed();
                  child.geometry.computeVertexNormals();
                }
              });
          
          // Set the model to the center of the scene
          modelScene.position.x = -center.x;
          modelScene.position.y = -center.y;
          modelScene.position.z = -center.z;
          
          // Scale the model to fit the view if needed
          const scale = 0.5 / Math.max(size.x, size.y, size.z);
          modelScene.scale.set(scale, scale, scale);
          
          // Add the model to our group
          if (currentGroup) {
            currentGroup.add(modelScene);
            setModelLoaded(true);
          }
        },
        // Progress callback
        undefined,
        // Error callback
        (error) => {
          console.error('Error loading 3D model:', error);
          setLoadError(true);
        }
      );
    } catch (error) {
      console.error('Error in useEffect when loading model:', error);
      setLoadError(true);
    }
    
    // If model failed to load, use our fallback interactive model
    if (loadError) {
      setActivePart('body');
      setSpecs(carSpecs.body);
    }
    
    // Cleanup function - use the stored reference
    return () => {
      if (currentGroup) {
        while(currentGroup.children.length > 0) {
          currentGroup.remove(currentGroup.children[0]);
        }
      }
    };
  }, [modelPath, loadError, carSpecs.body]);
  
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

  return (
    <>
      <group 
        ref={group} 
        position={[0, -0.7, 0]}
        onClick={(e) => handleClick(e, 'body')}
        onPointerOver={(e) => handlePointerOver(e, 'body')}
        onPointerOut={handlePointerOut}
      >
        {/* Render our custom interactive model if the real model fails to load */}
        {loadError && (
          <>
            {/* Car body */}
            <mesh 
              position={[0, 0.4, 0]} 
              castShadow
              userData={{ part: 'body' }}
              onClick={(e) => handleClick(e, 'body')}
              onPointerOver={(e) => handlePointerOver(e, 'body')}
              onPointerOut={handlePointerOut}
            >
              <boxGeometry args={[3, 0.6, 1.3]} />
              <meshStandardMaterial 
                color="#0A0A14" 
                metalness={0.9} 
                roughness={0.1}
                emissive={activePart === 'body' ? "#ff4254" : "#000000"}
                emissiveIntensity={activePart === 'body' ? 0.2 : 0}
              />
            </mesh>
            
            {/* Cabin */}
            <mesh 
              position={[0, 0.9, 0]} 
              castShadow
              userData={{ part: 'body' }}
              onClick={(e) => handleClick(e, 'body')}
              onPointerOver={(e) => handlePointerOver(e, 'body')}
              onPointerOut={handlePointerOut}
            >
              <boxGeometry args={[1.5, 0.5, 1.2]} />
              <meshStandardMaterial 
                color="#080810" 
                metalness={0.8} 
                roughness={0.2}
                emissive={activePart === 'body' ? "#ff4254" : "#000000"}
                emissiveIntensity={activePart === 'body' ? 0.1 : 0}
              />
            </mesh>
            
            {/* Wheels */}
            <mesh 
              position={[0.8, 0, 0.7]} 
              castShadow
              userData={{ part: 'wheels' }}
              onClick={(e) => handleClick(e, 'wheels')}
              onPointerOver={(e) => handlePointerOver(e, 'wheels')}
              onPointerOut={handlePointerOut}
            >
              <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial 
                color="#050505" 
                metalness={0.5} 
                roughness={0.7}
                emissive={activePart === 'wheels' ? "#0044ff" : "#000000"}
                emissiveIntensity={activePart === 'wheels' ? 0.3 : 0}
              />
            </mesh>
            <mesh 
              position={[0.8, 0, -0.7]} 
              castShadow
              userData={{ part: 'wheels' }}
              onClick={(e) => handleClick(e, 'wheels')}
              onPointerOver={(e) => handlePointerOver(e, 'wheels')}
              onPointerOut={handlePointerOut}
            >
              <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial 
                color="#050505" 
                metalness={0.5} 
                roughness={0.7}
                emissive={activePart === 'wheels' ? "#0044ff" : "#000000"}
                emissiveIntensity={activePart === 'wheels' ? 0.3 : 0}
              />
            </mesh>
            <mesh 
              position={[-0.8, 0, 0.7]} 
              castShadow
              userData={{ part: 'wheels' }}
              onClick={(e) => handleClick(e, 'wheels')}
              onPointerOver={(e) => handlePointerOver(e, 'wheels')}
              onPointerOut={handlePointerOut}
            >
              <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial 
                color="#050505" 
                metalness={0.5} 
                roughness={0.7}
                emissive={activePart === 'wheels' ? "#0044ff" : "#000000"}
                emissiveIntensity={activePart === 'wheels' ? 0.3 : 0}
              />
            </mesh>
            <mesh 
              position={[-0.8, 0, -0.7]} 
              castShadow
              userData={{ part: 'wheels' }}
              onClick={(e) => handleClick(e, 'wheels')}
              onPointerOver={(e) => handlePointerOver(e, 'wheels')}
              onPointerOut={handlePointerOut}
            >
              <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial 
                color="#050505" 
                metalness={0.5} 
                roughness={0.7}
                emissive={activePart === 'wheels' ? "#0044ff" : "#000000"}
                emissiveIntensity={activePart === 'wheels' ? 0.3 : 0}
              />
            </mesh>
            
            {/* Motors */}
            <mesh 
              position={[0.8, 0, 0]} 
              castShadow
              userData={{ part: 'motor' }}
              onClick={(e) => handleClick(e, 'motor')}
              onPointerOver={(e) => handlePointerOver(e, 'motor')}
              onPointerOut={handlePointerOut}
            >
              <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
              <meshStandardMaterial 
                color="#303030" 
                metalness={0.9} 
                roughness={0.2}
                emissive={activePart === 'motor' ? "#ff4254" : "#000000"}
                emissiveIntensity={activePart === 'motor' ? 0.5 : 0}
              />
            </mesh>
            <mesh 
              position={[-0.8, 0, 0]} 
              castShadow
              userData={{ part: 'motor' }}
              onClick={(e) => handleClick(e, 'motor')}
              onPointerOver={(e) => handlePointerOver(e, 'motor')}
              onPointerOut={handlePointerOut}
            >
              <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
              <meshStandardMaterial 
                color="#303030" 
                metalness={0.9} 
                roughness={0.2}
                emissive={activePart === 'motor' ? "#ff4254" : "#000000"}
                emissiveIntensity={activePart === 'motor' ? 0.5 : 0}
              />
            </mesh>
            
            {/* Battery */}
            <mesh 
              position={[0, 0.1, 0]} 
              castShadow
              userData={{ part: 'battery' }}
              onClick={(e) => handleClick(e, 'battery')}
              onPointerOver={(e) => handlePointerOver(e, 'battery')}
              onPointerOut={handlePointerOut}
            >
              <boxGeometry args={[1.8, 0.2, 0.8]} />
              <meshStandardMaterial 
                color="#1A1A1A" 
                metalness={0.7} 
                roughness={0.3}
                emissive={activePart === 'battery' ? "#0044ff" : "#000000"}
                emissiveIntensity={activePart === 'battery' ? 0.3 : 0}
              />
            </mesh>
            
            {/* Red accent lights */}
            <mesh 
              position={[1.5, 0.4, 0.5]} 
              castShadow
              userData={{ part: 'body' }}
            >
              <boxGeometry args={[0.1, 0.1, 0.3]} />
              <meshStandardMaterial 
                color="#FF2233" 
                emissive="#FF0000" 
                emissiveIntensity={1.5 + Math.sin(Date.now() * 0.001) * 0.5}
              />
            </mesh>
            <mesh 
              position={[1.5, 0.4, -0.5]} 
              castShadow
              userData={{ part: 'body' }}
            >
              <boxGeometry args={[0.1, 0.1, 0.3]} />
              <meshStandardMaterial 
                color="#FF2233" 
                emissive="#FF0000" 
                emissiveIntensity={1.5 + Math.sin(Date.now() * 0.001) * 0.5}
              />
            </mesh>
            
            {/* Blue accent lights */}
            <mesh 
              position={[-1.5, 0.4, 0.5]} 
              castShadow
              userData={{ part: 'body' }}
            >
              <boxGeometry args={[0.1, 0.1, 0.3]} />
              <meshStandardMaterial 
                color="#0044FF" 
                emissive="#0044FF" 
                emissiveIntensity={1.2 + Math.sin(Date.now() * 0.001 + Math.PI) * 0.5}
              />
            </mesh>
            <mesh 
              position={[-1.5, 0.4, -0.5]} 
              castShadow
              userData={{ part: 'body' }}
            >
              <boxGeometry args={[0.1, 0.1, 0.3]} />
              <meshStandardMaterial 
                color="#0044FF" 
                emissive="#0044FF" 
                emissiveIntensity={1.2 + Math.sin(Date.now() * 0.001 + Math.PI) * 0.5}
              />
            </mesh>
          </>
        )}
        
        {/* Custom lighting effects to highlight the car */}
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.3} 
          penumbra={0.8} 
          intensity={1} 
          color="#ff4254" 
          castShadow 
        />
        <spotLight 
          position={[-5, 5, -5]} 
          angle={0.3} 
          penumbra={0.8} 
          intensity={1} 
          color="#0044ff" 
          castShadow 
        />
      </group>
      
      {/* Floating specs panel */}
      {(hovered || clicked) && specs && (
        <group position={[2, 0, 0]}>
          <mesh position={[0, 0.5, 0]}>
            <planeGeometry args={[2, 1.5]} />
            <meshBasicMaterial 
              color="#000000" 
              opacity={0.7} 
              transparent 
              side={THREE.DoubleSide} 
            />
          </mesh>
          <Text
            position={[0, 1.1, 0.1]}
            fontSize={0.15}
            color="#ff4254"
            font="/fonts/Inter-Bold.woff"
            anchorX="center"
            anchorY="middle"
          >
            {specs.title || "VOLTARIS"}
          </Text>
          {specs.specs && specs.specs.map((spec, index) => (
            <Text
              key={index}
              position={[0, 0.9 - index * 0.2, 0.1]}
              fontSize={0.1}
              color="#ffffff"
              font="/fonts/Inter-Regular.woff"
              anchorX="center"
              anchorY="middle"
            >
              {spec}
            </Text>
          ))}
        </group>
      )}
    </>
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
  
  // Initialize interactive effects
  useMouseTrail();
  useParallax();
  useScrollAnimation();
  useTechnicalSpecsAnimation();
  
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
        }
      });
    };

    // Add event listener with the callback function
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loadingTimer);
      clearTimeout(signatureTimer);
    };
  }, []);

  // Function for handling mobile menu toggle regardless of section
  const toggleMobileMenu = (e) => {
    if (e) e.preventDefault();
    console.log('Toggling mobile menu');
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Function to toggle the technical submenu in mobile view
  const toggleTechnicalSubmenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Toggling technical submenu');
    setMobileSubmenuOpen(!mobileSubmenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      
      // Don't automatically close the mobile menu when changing sections
      // This allows users to navigate between sections while keeping the menu open
      // The menu can still be closed explicitly with the X button
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
                src={`${process.env.PUBLIC_URL}/logo_sadece.png`} 
                alt="Voltaris Logo"
                width="40"
                height="40"
                loading="eager"
                className="h-8 w-8 md:h-10 md:w-10 mr-2 md:mr-3 hover:rotate-180 transition-all duration-1000 hover:scale-125" 
              />
              <span className="text-lg md:text-xl font-semibold tracking-wide">VOLTARIS</span>
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
          <button 
            className="md:hidden text-gray-300 focus:outline-none z-50" 
            onClick={toggleMobileMenu}
            aria-label="Menu Toggle"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation - Sliding Panel */}
        <div 
          className={`md:hidden fixed inset-y-0 right-0 w-full max-w-xs z-40 bg-black/95 backdrop-blur-lg shadow-xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} 
          style={mobileSlideStyles}
        >
          <div className="pt-20 pb-6 px-5 flex flex-col h-full overflow-y-auto">
            <div className="space-y-1">
              {['home', 'about', 'technical', 'sponsors', 'contact'].map((section) => (
                <div key={section}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (section === 'technical') {
                        toggleTechnicalSubmenu(e);
                      } else {
                        scrollToSection(section);
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={`text-sm uppercase tracking-wider py-3 font-medium px-3 rounded w-full text-left flex items-center justify-between
                      ${activeSection === section || (section === 'technical' && (activeSection === 'vehicle' || activeSection === 'adas')) 
                        ? 'bg-gradient-to-r from-red-900/30 to-black text-red-400 border-l-2 border-red-500' 
                        : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <span>
                      {section === 'home' ? 'Ana Sayfa' : 
                       section === 'about' ? 'Hakkımızda' : 
                       section === 'technical' ? 'Teknik Detaylar' :
                       section === 'sponsors' ? 'Sponsorluk' : 'İletişim'}
                    </span>
                    {section === 'technical' && <ChevronDown size={14} className={`transition-transform duration-300 ${activeSection === 'technical' || activeSection === 'vehicle' || activeSection === 'adas' ? 'transform rotate-180' : ''}`} />}
                  </button>
                  
                  {section === 'technical' && mobileSubmenuOpen && (
                    <div className="ml-6 mt-2 space-y-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection('technical');
                          setMobileMenuOpen(false);
                        }} 
                        className={`text-sm py-2 px-3 block w-full text-left rounded
                          ${activeSection === 'technical' 
                            ? 'bg-gradient-to-r from-red-900/20 to-black text-red-400 border-l border-red-500' 
                            : 'text-gray-400 hover:text-white'
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
                        className={`text-sm py-2 px-3 block w-full text-left rounded
                          ${activeSection === 'vehicle' 
                            ? 'bg-gradient-to-r from-red-900/20 to-black text-red-400 border-l border-red-500' 
                            : 'text-gray-400 hover:text-white'
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
                        className={`text-sm py-2 px-3 block w-full text-left rounded
                          ${activeSection === 'adas' 
                            ? 'bg-gradient-to-r from-red-900/20 to-black text-red-400 border-l border-red-500' 
                            : 'text-gray-400 hover:text-white'
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
            <div className="mt-auto pt-6 border-t border-gray-800">
              <div className="flex justify-center space-x-5 my-4">
                <a href="https://instagram.com/Voltaris.official" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/company/i̇yte-voltaris-teknofest-efficiency-challange/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:info@voltaris.com" className="text-gray-400 hover:text-white">
                  <Mail size={20} />
                </a>
              </div>
              <div className="text-center text-xs text-gray-500">
                © 2025 Voltaris
              </div>
            </div>
          </div>
        </div>
        
        {/* Backdrop for mobile menu */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" 
            onClick={toggleMobileMenu}
            style={{position: 'fixed', top: 0, right: 0, bottom: 0, left: 0}}
          ></div>
        )}
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
        
        {/* Technical measurement coordinates */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* X-axis coordinates */}
            {[...Array(10)].map((_, i) => (
              <div 
                key={`x-${i}`} 
                className="absolute text-[8px] text-gray-500 font-mono"
                style={{ left: `${i * 10}%`, top: '12px' }}
              >
                {i * 10}
              </div>
            ))}
            
            {/* Y-axis coordinates */}
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
          
          {/* Added diagonal scan lines for technical effect */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-red-500">Voltaris Elektromobil Takımı</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Voltaris, İzmir Yüksek Teknoloji Enstitüsü'nde elektrikli araçlar ve sürdürülebilir ulaşım teknolojileri alanında yenilikçi çözümler geliştiren bir öğrenci takımıdır.
              </p>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                2024 Mayıs tarihinde Prof. Dr. Erdal Çetkin danışmanlığında kurulan ekibimiz, İYTE'de bir kültür oluşturma amacıyla çıktığımız bu yolda, Teknofest Efficiency Challenge yarışmasının ilk akla gelen takımlarından olma ve teorik bilgilerimizi pratiğe dönüştürerek yarışmada tecrübe kazanma amacıyla çalışmalarımızı sürdürmeketeyiz.
              </p>
              <div className="bg-gray-900/50 backdrop-blur-sm p-3 sm:p-4 border border-gray-800 rounded-lg mt-5 sm:mt-6">
                <h4 className="font-bold mb-2 text-blue-500 text-sm sm:text-base">Misyonumuz</h4>
                <p className="text-xs sm:text-sm text-gray-400">
                  Mühendislik bilgimizi ve yaratıcılığımızı kullanarak, çevreye duyarlı ve enerji tasarrufu sağlayan yenilikçi elektrikli araçlar üretmektir. Bu süreçte sadece araç geliştirmekle kalmıyoruz; aynı zamanda yenilikçi enerji yönetimi sistemleri, daha verimli batarya çözümleri ve modern sürüş teknolojileri üzerine çalışmalar yapıyoruz.
                </p>
              </div>
            </div>
            <div className="bg-[#1c1d20]/70 p-4 sm:p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-blue-500">Takım İstatistikleri</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Takım Üyesi</span>
                    <span className="text-white font-bold">24</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-7/12"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Hedef Yarışma</span>
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-4/12"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Prototip Aşaması</span>
                    <span className="text-white font-bold">%35</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-4/12"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Ana Departman</span>
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-5/12"></div>
                  </div>
                </div>
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
            <AdasFeatureCard 
              title="Şerit Takip Sistemi" 
              description="Kamera verilerini işlemek için tasarlanan algoritma, şeritleri tespit edecek ve sürücüye sesli ve görsel uyarılar verecektir."
              icon={<GitMerge size={24} />}
              color="red"
              imageUrl={`${process.env.PUBLIC_URL}/images/lane-keeping.jpg`}
            />
            
            <AdasFeatureCard 
              title="Trafik İşareti Tanıma" 
              description="Yapay zeka tabanlı görüntü işleme algoritması ile trafik işaretlerini tanıyacak ve sürücüyü bilgilendirecektir."
              icon={<AlertTriangle size={24} />}
              color="blue"
              imageUrl={`${process.env.PUBLIC_URL}/images/traffic-sign.jpg`}
            />
            
            <AdasFeatureCard 
              title="Akıllı Hız Sabitleyici" 
              description="PID kontrol algoritması geliştirilerek hızı sabitleyecek ve enerji optimizasyonu sağlayacaktır."
              icon={<Cpu size={24} />}
              color="red"
              imageUrl={`${process.env.PUBLIC_URL}/images/cruise-control.jpg`}
            />
            
            <AdasFeatureCard 
              title="Kör Nokta Algılama" 
              description="Ultrasonik ve kızılötesi sensörler ile kör noktalardaki engelleri tespit etmek için geliştirilen sistem."
              icon={<Camera size={24} />}
              color="blue"
              imageUrl={`${process.env.PUBLIC_URL}/images/blind-spot.jpg`}
            />
          </div>
          
          <div className="overflow-x-auto">
            <AdasSystemArchitecture />
          </div>
          
          <div className="mt-12 overflow-x-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Şerit Takip Sistemi</h3>
            <LaneDetectionDiagram />
          </div>
          
          <div className="mt-12 overflow-x-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Trafik İşareti Tanıma</h3>
            <TrafficSignDetectionDiagram />
          </div>
          
          <div className="mt-12 overflow-x-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Kör Nokta Tespit Sistemi</h3>
            <BlindSpotDetectionDiagram />
          </div>
          
          <div className="mt-12 overflow-x-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Akıllı Hız Sabitleyici</h3>
            <CruiseControlSystemDiagram />
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
            <div className="bg-[#1c1d20]/70 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-yellow-600/30 hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1 text-center group h-full">
              <div className="text-yellow-500 font-bold text-xl sm:text-2xl mb-2">Platin</div>
              <div className="text-white text-lg sm:text-xl mb-3 sm:mb-4">₺50,000+</div>
              <ul className="text-left space-y-1.5 mb-4 sm:mb-6">
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-yellow-500 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Aracın ön ve yan yüzeylerinde büyük logo</span>
                </li>
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-yellow-500 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Tüm medya materyallerinde öncelikli tanıtım</span>
                </li>
                <li className="flex items-start text-xs sm:text-sm">
                  <span className="text-yellow-500 mr-2 mt-0.5">•</span>
                  <span className="text-gray-300">Özel VIP etkinlik davetleri</span>
                </li>
              </ul>
              <button 
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-white px-3 sm:px-4 py-2 rounded-lg text-sm"
                onClick={() => handleOpenSponsorshipModal('platinum')}
              >İletişime Geç</button>
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
                <form className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Adınız Soyadınız" 
                        className="w-full bg-[#1a1b1e]/70 border border-gray-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="E-posta Adresiniz" 
                        className="w-full bg-[#1a1b1e]/70 border border-gray-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Kurum/Şirket" 
                      className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Mesajınız" 
                      rows="3"
                      className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    ></textarea>
                  </div>
                  <div>
                    <button 
                      type="submit" 
                      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-5 py-2 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-colors text-sm"
                    >
                      Gönder
                    </button>
                  </div>
                </form>
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
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://instagram.com/Voltaris.official" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026a9.564 9.564 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
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