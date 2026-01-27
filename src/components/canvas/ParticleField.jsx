import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Morphing particle sphere for the Hero section.
 * ~2000 points on a sphere with noise displacement,
 * constellation-style connecting lines, and mouse reactivity.
 */

// Simple 3D noise function (value noise)
function noise3D(x, y, z) {
  const p = x * 1.1 + y * 2.3 + z * 3.7;
  return (
    Math.sin(p * 1.0) * 0.5 +
    Math.sin(p * 2.3 + 1.7) * 0.25 +
    Math.sin(p * 4.1 + 3.2) * 0.125
  );
}

const PARTICLE_COUNT = 1500;
const SPHERE_RADIUS = 2.2;
const LINE_DISTANCE = 0.35;
const MAX_LINES = 800;

const ParticleField = () => {
  const pointsRef = useRef();
  const linesRef = useRef();
  const { mouse, viewport } = useThree();

  // Generate initial sphere positions
  const { positions, basePositions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const basePos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = SPHERE_RADIUS * Math.cos(phi);

      const idx = i * 3;
      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;
      basePos[idx] = x;
      basePos[idx + 1] = y;
      basePos[idx + 2] = z;

      // Orange-amber gradient color
      const t = i / PARTICLE_COUNT;
      col[idx] = 0.85 + t * 0.1; // R
      col[idx + 1] = 0.3 + t * 0.15; // G
      col[idx + 2] = 0.02 + t * 0.05; // B
    }

    return { positions: pos, basePositions: basePos, colors: col };
  }, []);

  // Line geometry (pre-allocated)
  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 6), []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const posArray = pointsRef.current.geometry.attributes.position.array;

    // Mouse world position
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const bx = basePositions[idx];
      const by = basePositions[idx + 1];
      const bz = basePositions[idx + 2];

      // Noise displacement
      const noiseVal = noise3D(
        bx * 0.5 + time * 0.15,
        by * 0.5 + time * 0.12,
        bz * 0.5 + time * 0.1
      );

      const displacement = noiseVal * 0.3;
      const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
      const nx = bx / len;
      const ny = by / len;
      const nz = bz / len;

      let px = bx + nx * displacement;
      let py = by + ny * displacement;
      let pz = bz + nz * displacement;

      // Mouse attraction
      const dx = mouseX - px;
      const dy = mouseY - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const pull = (1 - dist / 3) * 0.15;
        px += dx * pull;
        py += dy * pull;
      }

      posArray[idx] = px;
      posArray[idx + 1] = py;
      posArray[idx + 2] = pz;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;

    // Update constellation lines
    if (linesRef.current) {
      let lineIdx = 0;
      const maxCheck = Math.min(PARTICLE_COUNT, 400); // Limit checks for performance
      for (let i = 0; i < maxCheck && lineIdx < MAX_LINES; i++) {
        for (let j = i + 1; j < maxCheck && lineIdx < MAX_LINES; j++) {
          const i3 = i * 3;
          const j3 = j * 3;
          const ddx = posArray[i3] - posArray[j3];
          const ddy = posArray[i3 + 1] - posArray[j3 + 1];
          const ddz = posArray[i3 + 2] - posArray[j3 + 2];
          const d = ddx * ddx + ddy * ddy + ddz * ddz;

          if (d < LINE_DISTANCE * LINE_DISTANCE) {
            const li = lineIdx * 6;
            linePositions[li] = posArray[i3];
            linePositions[li + 1] = posArray[i3 + 1];
            linePositions[li + 2] = posArray[i3 + 2];
            linePositions[li + 3] = posArray[j3];
            linePositions[li + 4] = posArray[j3 + 1];
            linePositions[li + 5] = posArray[j3 + 2];
            lineIdx++;
          }
        }
      }

      // Zero out remaining
      for (let i = lineIdx * 6; i < MAX_LINES * 6; i++) {
        linePositions[i] = 0;
      }

      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.rotation.y = pointsRef.current.rotation.y;
      linesRef.current.rotation.x = pointsRef.current.rotation.x;
    }
  });

  return (
    <group position={[1.5, 0, 0]}>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Constellation Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={MAX_LINES * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ea580c"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </lineSegments>

      {/* Ambient light for subtle illumination */}
      <ambientLight intensity={0.5} />
    </group>
  );
};

export default ParticleField;
