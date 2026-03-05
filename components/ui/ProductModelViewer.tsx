"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";

useGLTF.preload("/models/SpacegoodsRender10.glb");

function Model({ url, scale = 1, positionY = 0, onLoaded }: { url: string; scale?: number; positionY?: number; onLoaded?: () => void }) {
  const { scene } = useGLTF(url);
  React.useEffect(() => { onLoaded?.(); }, [scene, onLoaded]);
  return <primitive object={scene} scale={scale} position={[0, positionY, 0]} />;
}

interface ProductModelViewerProps {
  url: string;
}

export function ProductModelViewer({ url }: ProductModelViewerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-supplied-amber/30 border-t-supplied-amber rounded-full animate-spin" />
        </div>
      )}
      <Canvas
        camera={{ position: [0.45, 0.20, 1.73], fov: 30 }}
        style={{ width: "100%", height: "100%", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <Model url={url} scale={0.75} positionY={-0.45} onLoaded={() => setLoaded(true)} />
          
          <Environment 
            files="/studio_small_01_1k.hdr"
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
    </div>
  );
}
