import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural wireframe globe for the Contact section.
 * Dotted latitude-longitude grid with slow auto-rotation and subtle glow.
 */

const GLOBE_RADIUS = 1.8;
const LAT_COUNT = 12;
const LON_COUNT = 18;
const POINTS_PER_LINE = 60;

const ContactGlobe = () => {
  const groupRef = useRef();

  // Generate latitude and longitude line points
  const { latPoints, lonPoints, dotPositions } = useMemo(() => {
    const latPts = [];
    const lonPts = [];
    const dots = [];

    // Latitude lines
    for (let i = 1; i < LAT_COUNT; i++) {
      const phi = (Math.PI * i) / LAT_COUNT;
      const positions = [];
      for (let j = 0; j <= POINTS_PER_LINE; j++) {
        const theta = (2 * Math.PI * j) / POINTS_PER_LINE;
        positions.push(
          GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
          GLOBE_RADIUS * Math.cos(phi),
          GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
        );
      }
      latPts.push(new Float32Array(positions));
    }

    // Longitude lines
    for (let i = 0; i < LON_COUNT; i++) {
      const theta = (2 * Math.PI * i) / LON_COUNT;
      const positions = [];
      for (let j = 0; j <= POINTS_PER_LINE; j++) {
        const phi = (Math.PI * j) / POINTS_PER_LINE;
        positions.push(
          GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
          GLOBE_RADIUS * Math.cos(phi),
          GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
        );
      }
      lonPts.push(new Float32Array(positions));
    }

    // Grid intersection dots
    for (let i = 1; i < LAT_COUNT; i++) {
      for (let j = 0; j < LON_COUNT; j++) {
        const phi = (Math.PI * i) / LAT_COUNT;
        const theta = (2 * Math.PI * j) / LON_COUNT;
        dots.push(
          GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
          GLOBE_RADIUS * Math.cos(phi),
          GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
        );
      }
    }

    return {
      latPoints: latPts,
      lonPoints: lonPts,
      dotPositions: new Float32Array(dots),
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.08;
      groupRef.current.rotation.x = 0.2; // Slight tilt
    }
  });

  return (
    <group ref={groupRef}>
      {/* Latitude lines */}
      {latPoints.map((positions, i) => (
        <line key={`lat-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#ea580c"
            transparent
            opacity={0.15}
            depthWrite={false}
          />
        </line>
      ))}

      {/* Longitude lines */}
      {lonPoints.map((positions, i) => (
        <line key={`lon-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#ea580c"
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </line>
      ))}

      {/* Grid intersection dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dotPositions.length / 3}
            array={dotPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ea580c"
          size={0.04}
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.05, 32, 32]} />
        <meshBasicMaterial
          color="#ea580c"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default ContactGlobe;
