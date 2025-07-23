import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Grid3D() {
  const gridRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.PI * 0.5;
      gridRef.current.position.y = -5;
    }
    if (materialRef.current) {
      materialRef.current.opacity = (Math.sin(state.clock.elapsedTime * 0.5) + 1) * 0.2 + 0.2;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper
        args={[100, 100, '#4CAF50', '#1E293B']}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      >
        <lineBasicMaterial
          ref={materialRef}
          attach="material"
          color="#4CAF50"
          transparent
          opacity={0.2}
        />
      </gridHelper>
    </group>
  );
} 