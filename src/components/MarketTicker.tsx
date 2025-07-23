import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const tickers = [
  { symbol: 'BTC/USD', price: '45,230.50', change: '+2.5%' },
  { symbol: 'ETH/USD', price: '2,890.75', change: '+1.8%' },
  { symbol: 'AAPL', price: '175.25', change: '+0.9%' },
  { symbol: 'TSLA', price: '245.80', change: '-1.2%' },
  { symbol: 'GOOGL', price: '138.90', change: '+1.5%' },
];

export default function MarketTicker() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      groupRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 1;
    }
  });

  return (
    <group ref={groupRef} position={[-15, 8, -5]}>
      {tickers.map((ticker, index) => (
        <group key={ticker.symbol} position={[0, -index * 2, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.8}
            color={ticker.change.startsWith('+') ? '#00ff88' : '#ff3366'}
            anchorX="left"
            maxWidth={10}
          >
            {`${ticker.symbol} ${ticker.price} ${ticker.change}`}
          </Text>
        </group>
      ))}
    </group>
  );
} 