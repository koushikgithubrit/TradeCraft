"use client"

import { Suspense } from "react"
import { Link } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { useState, useEffect, useRef } from "react"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Text3D, Float, Stars } from "@react-three/drei"
import { motion } from "framer-motion"
import { FaChartLine, FaGraduationCap, FaUsers, FaLightbulb, FaChartBar, FaRobot } from "react-icons/fa"
import CandlestickChart3D from "../components/CandlestickChart3D"
import MarketTicker from "../components/MarketTicker"
import Grid3D from "../components/Grid3D"

interface FloatingTextProps {
  text: string;
  position: [number, number, number];
}

// 3D Chart Component
function AnimatedChart() {
  const points = Array(20).fill(0).map((_, i) => {
    const x = (i - 10) * 0.3;
    const y = Math.sin(i * 0.2) * Math.random();
    const z = 0;
    return new THREE.Vector3(x, y, z);
  });

  const curve = new THREE.CatmullRomCurve3(points);
  const curvePoints = curve.getPoints(100);
  
  return (
    <group>
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={curvePoints.length}
            array={new Float32Array(curvePoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#22c55e" linewidth={2} />
      </mesh>
    </group>
  );
}

// Floating Text Component
function FloatingText({ text, position }: FloatingTextProps) {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.5}
        height={0.1}
        position={position}
      >
        {text}
        <meshStandardMaterial color="#22c55e" />
      </Text3D>
    </Float>
  );
}

// Scene Component
function Scene() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      <Grid3D />
      <CandlestickChart3D />
      <MarketTicker />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
    </Suspense>
  );
}

const courseModules = [
  {
    title: "Technical Analysis Mastery",
    description: "Learn to read charts, identify patterns, and make data-driven decisions",
    icon: <FaChartLine className="text-4xl text-emerald-500" />,
    duration: "8 weeks"
  },
  {
    title: "Fundamental Analysis",
    description: "Understand market fundamentals, economic indicators, and company valuations",
    icon: <FaChartBar className="text-4xl text-blue-500" />,
    duration: "6 weeks"
  },
  {
    title: "Risk Management",
    description: "Master the art of position sizing, stop-loss strategies, and portfolio management",
    icon: <FaLightbulb className="text-4xl text-yellow-500" />,
    duration: "4 weeks"
  },
  {
    title: "Algorithmic Trading",
    description: "Build and backtest automated trading strategies using modern tools",
    icon: <FaRobot className="text-4xl text-purple-500" />,
    duration: "10 weeks"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#0A0F1C] text-white overflow-hidden">
      {/* Hero Section with Enhanced 3D Animation */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
            <Scene />
          </Canvas>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500">
                Master the Art of Trading
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8">
                Transform your trading journey with our comprehensive learning platform
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Link
                  to="/courses"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Start Learning
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 bg-transparent border-2 border-emerald-500 hover:bg-emerald-500/10 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Modules Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0F172A]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-emerald-400 mb-4">
              Comprehensive Learning Path
            </h2>
            <p className="text-xl text-gray-400">
              Master every aspect of trading through our structured curriculum
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courseModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] backdrop-blur-lg border border-gray-800 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {module.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {module.description}
                    </p>
                    <span className="text-sm text-emerald-400 font-medium">
                      Duration: {module.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] backdrop-blur-lg border border-gray-800">
              <FaChartLine className="text-4xl text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-Time Trading</h3>
              <p className="text-gray-400">Practice with live market data and advanced charting tools</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] backdrop-blur-lg border border-gray-800">
              <FaGraduationCap className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Mentorship</h3>
              <p className="text-gray-400">Learn directly from professional traders with years of experience</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] backdrop-blur-lg border border-gray-800">
              <FaUsers className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-gray-400">Join a vibrant community of traders and share insights</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F172A] to-[#0A0F1C]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of successful traders who have transformed their trading career with our platform
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
