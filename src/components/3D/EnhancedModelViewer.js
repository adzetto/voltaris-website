import React, { Suspense, useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  useGLTF, 
  ContactShadows,
  PerspectiveCamera,
  Float,
  SpotLight,
  Preload,
  useTexture,
  Html,
  useBVH
} from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { loadOptimizedModel, createLODModel } from '../../utils/ModelOptimizer';

// Loading indicator component
const LoadingIndicator = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-red-500 border-l-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-sm">Loading model...</p>
    </div>
  </Html>
);

// Enhanced lighting with optimized settings
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
        // Optimize shadow resolution for better performance
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.001}
      />
      <spotLight 
        position={[-8, 8, -8]} 
        intensity={0.6} 
        angle={0.3} 
        penumbra={0.7}
        color="#f0f0f0"
        // Disable shadows on secondary lights for performance
        castShadow={false}
      />
      
      {/* Added accent lights with Voltaris colors */}
      <pointLight position={[3, 0, 2]} intensity={0.3} color="#FF4254" /> {/* Red accent light */}
      <pointLight position={[-3, 0, -2]} intensity={0.3} color="#0044FF" /> {/* Blue accent light */}
    </>
  );
}

// Model component with optimized loading and rendering
function OptimizedCarModel() {
  // Fix the model path to use the proper location with process.env.PUBLIC_URL
  const modelPath = process.env.PUBLIC_URL + '/models/model_3d.draco.gltf';
  const groupRef = useRef();
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hovered, setHovered] = useState(false);
  
  // Apply BVH for better raycasting performance
  const bvh = useBVH();
  
  // Load the model using our optimized loader
  useEffect(() => {
    let isMounted = true;

    const loadModel = async () => {
      try {
        const optimizedModel = await loadOptimizedModel(
          modelPath,
          (progress) => {
            // You could update a progress indicator here
            console.log(`Loading model: ${progress.toFixed(2)}%`);
          }
        );
        
        // Apply BVH to meshes
        optimizedModel.traverse((child) => {
          if (child.isMesh && child.geometry) {
            bvh.current = child;
          }
        });
        
        if (isMounted) {
          setModel(optimizedModel);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load model:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadModel();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [modelPath, bvh]);
  
  // Handle hover state
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  
  // Subtle animation
  useFrame((state) => {
    if (groupRef.current && model) {
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
  
  if (isLoading) {
    return <LoadingIndicator />;
  }
  
  return (
    <group 
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={[0, 0, 0]}
      scale={[0.5, 0.5, 0.5]}
    >
      {model && <primitive object={model} />}
    </group>
  );
}

// Main component with performance optimizations
const EnhancedModelViewer = forwardRef((props, ref) => {
  // Camera controls reference
  const controlsRef = useRef();
  const cameraRef = useRef();
  
  // Define initial camera position
  const initialCameraPosition = [2, 1, 2];
  
  // Expose controls to parent components
  useImperativeHandle(ref, () => ({
    resetCamera: () => {
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
    }
  }));
  
  // Calculate a proper pixel ratio for performance
  const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
  
  return (
    <div className="w-full h-full bg-black/80"> {/* Added dark background for the container */}
      <Canvas 
        shadows
        camera={{ position: initialCameraPosition, fov: 45 }}
        dpr={pixelRatio} // Limit pixel ratio for performance
        gl={{ 
          antialias: true, 
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8, // Slightly darker exposure
          // Performance optimizations
          powerPreference: "high-performance",
          precision: "highp",
          physicallyCorrectLights: false, // Disable for performance
          logarithmicDepthBuffer: false
        }}
        performance={{ min: 0.5 }} // Allow performance adaptation
      >
        <Suspense fallback={<LoadingIndicator />}>
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
            <OptimizedCarModel />
          </Float>
          
          <ContactShadows 
            position={[0, -1.6, 0]} 
            opacity={0.7} 
            scale={10} 
            blur={1.5} 
            far={5} 
            resolution={256} // Reduced resolution for better performance
          />
          
          {/* Added technical grid floor */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -1.7, 0]} 
            receiveShadow
          >
            <planeGeometry args={[30, 30, 20, 20]} /> {/* Reduced grid detail */}
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