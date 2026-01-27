import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';

const ContextCleaner = () => {
  const { gl } = useThree();

  useEffect(() => {
    return () => {
      try {
        const extension = gl.getExtension('WEBGL_lose_context');
        if (extension) extension.loseContext();
      } catch (error) {
        // WebGL context cleanup attempted
      }
    };
  }, [gl]);

  return null;
};

const FallbackBall = ({ icon }) => (
  <div className="w-full h-full rounded-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
    <img
      src={icon}
      alt="skill"
      className="w-1/2 h-1/2 object-contain"
      style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.15))' }}
    />
  </div>
);

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#f5f5f4"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const CanvasLoader = () => (
  <mesh>
    <sphereGeometry args={[0.5, 8, 8]} />
    <meshBasicMaterial color="#d6d3d1" wireframe />
  </mesh>
);

const SkillBallCanvas = ({ icon }) => {
  const [fallback, setFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!gl) {
        setFallback(true);
      } else {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(
            debugInfo.UNMASKED_RENDERER_WEBGL,
          );
          if (
            renderer.toLowerCase().includes('swiftshader') ||
            renderer.toLowerCase().includes('software')
          ) {
            setFallback(true);
          }
        }
      }
    } catch {
      setFallback(true);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  if (fallback || isMobile) {
    return <FallbackBall icon={icon} />;
  }

  return (
    <Canvas
      ref={canvasRef}
      frameloop="always"
      gl={{
        preserveDrawingBuffer: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: true,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
        <Ball imgUrl={icon} />
        <ContextCleaner />
      </Suspense>
      <Preload all={false} />
    </Canvas>
  );
};

export default SkillBallCanvas;
