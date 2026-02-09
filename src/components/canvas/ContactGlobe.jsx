import { useGLTF, OrbitControls } from '@react-three/drei';

/**
 * Stylized planet model for the Contact section.
 * Loaded from GLTF, auto-rotates, and is draggable.
 */
const ContactGlobe = () => {
  const { scene } = useGLTF('/models/planet/scene.gltf');

  return (
    <>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.8}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <primitive object={scene} scale={2.5} />
    </>
  );
};

useGLTF.preload('/models/planet/scene.gltf');

export default ContactGlobe;
