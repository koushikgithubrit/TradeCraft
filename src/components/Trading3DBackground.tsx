// import { Canvas, useFrame } from '@react-three/fiber';
// import { Float, OrbitControls } from '@react-three/drei';
// import { useRef } from 'react';
// import * as THREE from 'three';

// Types for props
interface AnimatedCandlestickProps {
  x: number;
  color: string;
  height: number;
  glow?: boolean;
}

function AnimatedCandlestick({ x, color, height, glow = false }: AnimatedCandlestickProps) {
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={[x, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.2, height, 0.2]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={glow ? 1.2 : 0.5} />
        </mesh>
        <mesh position={[0, height / 2 + 0.3, 0]}>
          <boxGeometry args={[0.05, 0.6, 0.05]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
        <mesh position={[0, -height / 2 - 0.3, 0]}>
          <boxGeometry args={[0.05, 0.6, 0.05]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
      </group>
    </Float>
  );
}

function AnimatedSplineLine() {
  const ref = useRef<any>(null);
  // Animate the points for a "live" trading line effect
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      const points = [];
      for (let i = 0; i < 8; i++) {
        const x = i - 3.5;
        const y = Math.sin(t * 0.7 + i * 0.7) * 0.7 + Math.cos(t * 0.3 + i) * 0.2;
        points.push(new THREE.Vector3(x, y, 0));
      }
      (ref.current.geometry as THREE.BufferGeometry).setFromPoints(points);
    }
  });
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="#10b981" linewidth={3} />
    </line>
  );
}

interface FloatingDataPointProps {
  x: number;
  y: number;
  color: string;
}

function FloatingDataPoint({ x, y, color }: FloatingDataPointProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = y + Math.sin(clock.getElapsedTime() + x) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={[x, y, 0.1]}>
      <sphereGeometry args={[0.11, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
    </mesh>
  );
}

export default function Trading3DBackground() {
  return <div style={{width: '100vw', height: '100vh', background: '#0a0f1c'}} />;
} 