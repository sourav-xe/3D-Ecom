// src/components/Hero3D.jsx
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, ContactShadows, AdaptiveDpr, AdaptiveEvents, Preload, PresentationControls } from '@react-three/drei';

function ShoeModel() {
  const { scene } = useGLTF('/models/shoe/scene.gltf'); // Prefer .glb if you optimize
  const shoeRef = useRef();

  // Keep a minimal idle “breathing” motion; pause when dragging for clarity
  useFrame(({ clock }) => {
    if (!shoeRef.current) return;
    const t = clock.getElapsedTime();
    shoeRef.current.rotation.y += Math.sin(t * 0.1) * 0.0008; // very subtle idle
  });

  return <primitive ref={shoeRef} object={scene} scale={2} position={[2.2, -1.2, 0]} />;
}

useGLTF.preload('/models/shoe/scene.gltf');

function Fallback() {
  return (
    <div className="absolute inset-0 grid place-items-center text-white/70 text-sm">
      Loading 3D…
    </div>
  );
}

export default function Hero3D({ dropIn = true }) {
  return (
    // IMPORTANT: allow pointer events so cursor interaction works
    <div className="absolute inset-0 z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance', stencil: false, depth: true }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 4, 5]} intensity={1.2} />

        <Suspense fallback={<Fallback />}>
          {/* PresentationControls = orbit-like, clamped rotation, inertial feel */}
          <PresentationControls
            global
            cursor
            snap
            // Damping physics for feel
            config={{ mass: 2, tension: 400, friction: 30 }}
            // Start rotation (radians)
            rotation={[0, 0, 0]}
            // Limit vertical tilt (polar) and left-right (azimuth)
            polar={[-Math.PI / 8, Math.PI / 8]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <group style={{ transform: dropIn ? 'translateY(0)' : 'translateY(-200px)' }}>
              <ShoeModel />
            </group>
          </PresentationControls>

          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.35}
            scale={10}
            blur={2}
            far={4.5}
            frames={1}  // bake once = perf win
          />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
