import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Wireframe icosphere with vertex displacement.
 * Slow rotation + noise-based vertex animation.
 * Semi-transparent with edge glow.
 */

function noise3D(x, y, z) {
  const p = x * 1.1 + y * 2.3 + z * 3.7;
  return (
    Math.sin(p * 1.0) * 0.5 +
    Math.sin(p * 2.3 + 1.7) * 0.25 +
    Math.sin(p * 4.1 + 3.2) * 0.125
  );
}

const AbstractSphere = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef();
  const basePositions = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position;

    // Store base positions on first frame
    if (!basePositions.current) {
      basePositions.current = new Float32Array(posAttr.array);
    }

    const base = basePositions.current;
    for (let i = 0; i < posAttr.count; i++) {
      const idx = i * 3;
      const bx = base[idx];
      const by = base[idx + 1];
      const bz = base[idx + 2];

      const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
      const nx = bx / len;
      const ny = by / len;
      const nz = bz / len;

      const noiseVal = noise3D(
        bx * 0.8 + time * 0.2,
        by * 0.8 + time * 0.15,
        bz * 0.8 + time * 0.1
      );

      const displacement = noiseVal * 0.15;
      posAttr.array[idx] = bx + nx * displacement;
      posAttr.array[idx + 1] = by + ny * displacement;
      posAttr.array[idx + 2] = bz + nz * displacement;
    }

    posAttr.needsUpdate = true;

    // Slow rotation
    meshRef.current.rotation.y = time * 0.08;
    meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1.5, 3]} />
      <meshBasicMaterial
        color="#c2410c"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
};

export default AbstractSphere;
