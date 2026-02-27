"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

interface ProductModelViewerProps {
  url: string;
}

export function ProductModelViewer({ url }: ProductModelViewerProps) {
  return (
    <Canvas
      camera={{ position: [0.2, 0.4, 0.2], fov: 40 }}
      style={{ width: "100%", height: "120%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} />
      <directionalLight position={[0, -2, 4]} intensity={0.8} />
      <Suspense fallback={null}>
        <Model url={url} />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
