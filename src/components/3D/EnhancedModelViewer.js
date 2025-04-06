import React, { Suspense, useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  useGLTF, 
  ContactShadows,
  PerspectiveCamera,
  Float,
  SpotLight,
  Preload
} from '@react-three/drei';
import * as THREE from 'three';



// Enhanced lighting with spotlight
function EnhancedLighting() {
  return (
    <>
      <ambientLight intensity={0.3} /> {/* Reduced ambient light for more dramatic look */}
      <SpotLight
        position={[10, 10, 5]}
        intensity={0.8}
        angle={0.4}
        penumbra={0.9}
        distance={20}
        castShadow
        attenuation={5}
        anglePower={4}
        color="#ffffff"
      />
      <spotLight 
        position={[-8, 8, -8]} 
        intensity={0.6} 
        angle={0.3} 
        penumbra={0.7}
        castShadow
        color="#f0f0f0"
      />
      
      {/* Added accent lights with Voltaris colors */}
      <pointLight position={[3, 0, 2]} intensity={0.3} color="#FF4254" /> {/* Red accent light */}
      <pointLight position={[-3, 0, -2]} intensity={0.3} color="#0044FF" /> {/* Blue accent light */}
    </>
  );
}

// Model component with enhanced materials
function EnhancedCarModel() {
  // Fix the model path to use the proper location with process.env.PUBLIC_URL
  const modelPath = process.env.PUBLIC_URL + '/models/model_3d.gltf';
  const { scene } = useGLTF(modelPath);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  
  // Apply enhanced materials to model and optimize performance
  useEffect(() => {
    // Enable instancing for better performance
    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        child.geometry.computeVertexNormals();
        // Enable instancing if possible
        if (child.material && child.material.map) {
          child.material.map.anisotropy = 16;
        }
      }
    });
    scene.traverse((child) => {
      if (child.isMesh) {
        // Apply better material properties
        if (child.material) {
          // Create a physical material for more realistic rendering
          const newMaterial = new THREE.MeshPhysicalMaterial({
            color: child.material.color || new THREE.Color(0x888888),
            metalness: 0.85,
            roughness: 0.2,
            clearcoat: 0.4,
            clearcoatRoughness: 0.2,
            envMapIntensity: 1.2,
            reflectivity: 0.6
          });
          
          child.material = newMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    });
  }, [scene]);
  
  // Handle hover state
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  
  // Subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle vertical floating motion
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.03;
      
      // Subtle rotation that responds to being hovered
      if (hovered) {
        groupRef.current.rotation.y += 0.005; // Faster rotation when hovered
      } else {
        groupRef.current.rotation.y += 0.002; // Slower rotation when not hovered
      }
    }
  });
  
  return (
    <group 
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={[0, 0, 0]}
      scale={[0.5, 0.5, 0.5]}
    >
      <primitive object={scene} />
    </group>
  );
}

// Main enhanced model viewer component without any UI elements
const EnhancedModelViewer = forwardRef((props, ref) => {
  // Camera controls reference
  const controlsRef = useRef();
  const cameraRef = useRef();
  const initialCameraPosition = [2, 0.7, 3];
  const initialTarget = [0, 0, 0];

  // Function to reset camera view
  const resetCameraView = () => {
    console.log("resetCameraView called in EnhancedModelViewer");
    
    if (controlsRef.current) {
      // First try the standard reset
      controlsRef.current.reset();
      
      // Then force the position and target update
      controlsRef.current.object.position.set(...initialCameraPosition);
      controlsRef.current.target.set(...initialTarget);
      
      // Make sure updates are applied
      controlsRef.current.update();
      
      console.log("Camera position after reset:", 
        controlsRef.current.object.position,
        "Target:", controlsRef.current.target);
    }
  };
  
  // Expose reset method via ref
  useImperativeHandle(ref, () => ({
    resetCameraView: () => {
      console.log("resetCameraView called via ref");
      resetCameraView();
    }
  }), []);
  
  // Event listener for resetting the camera view
  useEffect(() => {
    const handleResetView = () => {
      console.log("Reset view event received");
      resetCameraView();
    };
    
    window.addEventListener('reset-view', handleResetView);
    return () => window.removeEventListener('reset-view', handleResetView);
  }, []);
  
  return (
    <div className="w-full h-full bg-black/80"> {/* Added dark background for the container */}
      <Canvas 
      shadows
      camera={{ position: initialCameraPosition, fov: 45 }}
      dpr={window.devicePixelRatio > 1 ? 1.5 : 1} // Performance optimization
      gl={{ 
        antialias: true, 
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.8 // Slightly darker exposure
      }}
      >
        <Suspense fallback={
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
        }>
          <color attach="background" args={["#050505"]} /> {/* Changed to dark background color */}
          <fog attach="fog" args={["#050505", 10, 50]} />
          
          <PerspectiveCamera 
            ref={cameraRef}
            makeDefault 
            position={initialCameraPosition} 
            fov={40} 
          />
          
          <EnhancedLighting />
          
          <Float 
            speed={1}
            rotationIntensity={0}
            floatIntensity={0.1}
            floatingRange={[-0.05, 0.05]}
          >
            <EnhancedCarModel />
          </Float>
          
          <ContactShadows 
            position={[0, -1.6, 0]} 
            opacity={0.7} 
            scale={10} 
            blur={1.5} 
            far={5} 
          />
          
          {/* Added technical grid floor */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -1.7, 0]} 
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
            />
          </mesh>
          
          <Environment preset="studio" background={false} />
          {/* Preload the model to improve subsequent renders */}
          <Preload all />
        </Suspense>
        
        <OrbitControls 
          ref={controlsRef}
          camera={cameraRef.current}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={1.8}
          maxDistance={6}
          zoomSpeed={0.5}
          rotateSpeed={0.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
});

export default EnhancedModelViewer;