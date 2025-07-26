"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            About Our Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            We're dedicated to providing high-quality education in stock market trading,
            helping individuals achieve their financial goals through comprehensive learning.
          </motion.p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300">
              At TradeCraft, our mission is to empower individuals—especially beginners—with the knowledge and confidence to navigate the complex world of stock market trading. We strive to bridge the gap between theoretical education and practical application by offering an all-in-one platform that blends structured learning, real-time simulations, and interactive tools. Our goal is to make financial literacy accessible, engaging, and actionable for everyone, regardless of their background or experience level.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300">
              We envision a future where stock market education is no longer a privilege limited to experts or professionals. TradeCraft aims to become a leading platform in FinTech and EdTech by redefining how people learn and practice investing. By integrating cutting-edge technologies like interactive 3D content, personalized learning paths, and real-world trading simulations, we seek to create a global community of financially empowered individuals equipped to make smart investment decisions.
            </p>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-emerald-500 mb-4">{member.role}</p>
                <p className="text-gray-300">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20"
              >
                <div className="text-emerald-500 mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const team = [
  {
    name: 'Nikita Maity',
    role: 'Frontend & Researcher',
    description: '4th year student, expert in building responsive user interfaces and conducting in-depth market and UX research',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    name: 'Sucharita Sahoo',
    role: 'Frontend & Testing',
    description: '4th year student, expert in developing intuitive user interfaces and ensuring application reliability through rigorous testing.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    name: 'Neha Maiti',
    role: 'Frontend',
    description: '4th year student, expert in crafting responsive and user-friendly web interfaces using modern frontend technologies.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from course content to student support.',
    icon: '⭐',
  },
  {
    title: 'Innovation',
    description: 'We continuously innovate our teaching methods and course materials.',
    icon: '💡',
  },
  {
    title: 'Integrity',
    description: 'We maintain the highest standards of integrity in our educational content.',
    icon: '🤝',
  },
  {
    title: 'Community',
    description: 'We foster a supportive community of learners and traders.',
    icon: '👥',
  },
];
