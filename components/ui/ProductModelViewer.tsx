"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";

function Model({ url, scale = 1, positionY = 0 }: { url: string; scale?: number; positionY?: number }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={[0, positionY, 0]} />;
}

interface ProductModelViewerProps {
  url: string;
}

export function ProductModelViewer({ url }: ProductModelViewerProps) {
  return (
    <Canvas
      camera={{ position: [0.45, 0.20, 1.73], fov: 30 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <Model url={url} scale={0.75} positionY={-0.45} />
        
        <Environment 
          files="/studio_small_01_4k.exr"
          environmentIntensity={0.6}
        />

        <ContactShadows 
          position={[0, -0.40, 0]} 
          opacity={0.8} 
          scale={10} 
          blur={3} 
          far={1} 
        />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        target={[0, -0.15, 0]}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
