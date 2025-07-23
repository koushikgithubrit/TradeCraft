import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { Text } from '@react-three/drei';

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
  color: string;
}

export default function CandlestickChart3D() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate sample candlestick data
  const candleData = useMemo(() => {
    const data: Candle[] = [];
    let lastClose = 100;
    
    for (let i = 0; i < 20; i++) {
      const change = (Math.random() - 0.5) * 10;
      const open = lastClose;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;
      
      data.push({
        open,
        close,
        high,
        low,
        color: close > open ? '#00ff88' : '#ff3366'
      });
      
      lastClose = close;
    }
    
    return data;
  }, []);

  // Animate the chart
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {candleData.map((candle, index) => {
        const height = Math.abs(candle.close - candle.open);
        const wickHeight = candle.high - candle.low;
        const position = new Vector3(
          index * 2 - 20,
          (candle.high + candle.low) / 2 - 100,
          0
        );

        return (
          <group key={index} position={position}>
            {/* Candlestick body */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.5, height, 0.5]} />
              <meshStandardMaterial color={candle.color} />
            </mesh>
            
            {/* Candlestick wick */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.1, wickHeight, 0.1]} />
              <meshStandardMaterial color={candle.color} />
            </mesh>
          </group>
        );
      })}

      {/* Price labels */}
      <Text
        position={[-22, -90, 0]}
        color="white"
        fontSize={2}
        anchorX="left"
      >
        Price
      </Text>

      {/* Time labels */}
      <Text
        position={[0, -110, 0]}
        color="white"
        fontSize={2}
        anchorX="center"
      >
        Time
      </Text>
    </group>
  );
} 