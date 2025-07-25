# TradeCraft - Stock Market Learning Platform

![TradeCraft Logo](public/vite.svg)

> **Your premier destination for stock market education and trading insights.**

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Screenshots & Demo](#screenshots--demo)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Team](#team)
- [Values](#values)
- [Contributing](#contributing)
- [License](#license)
- [References & Inspiration](#references--inspiration)
- [Contact](#contact)

---

## About
TradeCraft is a modern, interactive web-based platform designed to facilitate learning about stock market trading. It provides users—especially beginners and enthusiasts—with comprehensive courses, real-world examples, and practical trading strategies in an engaging and user-friendly environment.

TradeCraft bridges the gap between static online courses and real-world trading by combining:
- Structured, interactive learning modules
- Real-world trading simulations
- Progress tracking and gamification
- Community and expert support

## Features
- 🚀 **Modern, responsive UI** with smooth animations (Framer Motion, Tailwind CSS)
- 🔐 **Google account authentication** (OAuth 2.0)
- 📚 **Comprehensive course content** with progress tracking
- 🎥 **Interactive learning materials** (articles, videos, 3D visualizations)
- 📈 **Real-world trading simulation** (planned/coming soon)
- 📬 **Contact form** with EmailJS integration
- ☁️ **Cloud database** with MongoDB Atlas
- 🛡️ **JWT-based secure authentication**
- 📊 **Admin panel** for course/content management

## Technology Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Framer Motion, Three.js
- **Backend:** Node.js, Express, TypeScript, MongoDB (Atlas), Mongoose
- **Authentication:** Google OAuth 2.0, JWT
- **Integrations:** EmailJS (contact), Stripe (planned for payments)

## Screenshots & Demo
> _Add screenshots or a demo video/gif here!_

- ![Screenshot Placeholder](public/vite.svg)
- _Demo: [Add your deployment link here]_ 

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account (or local MongoDB)
- EmailJS account (for contact form)

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_USER_ID=your_emailjs_user_id
```

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd TradeCraft
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development servers:**
   ```bash
   npm start
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

---

## Project Structure
```
├── src/                  # Frontend source files
│   ├── components/       # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── context/          # React context providers
│   └── utils/            # Utility functions
├── server/               # Backend source files
│   ├── models/           # MongoDB models
│   ├── routes/           # Express routes
│   └── index.ts          # Server entry point
├── public/               # Static assets (images, fonts, PDFs)
└── ...
```

---

## Team
Meet the people behind TradeCraft:

- **John Smith** — Founder & CEO  
  _20+ years of experience in financial markets and trading education._
- **Sarah Johnson** — Head of Education  
  _Certified financial analyst with a passion for teaching and mentoring._
- **Michael Chen** — Lead Market Analyst  
  _Expert in technical analysis and market strategy development._

---

## Values
- ⭐ **Excellence:** We strive for excellence in everything we do, from course content to student support.
- 💡 **Innovation:** We continuously innovate our teaching methods and course materials.
- 🤝 **Integrity:** We maintain the highest standards of integrity in our educational content.
- 👥 **Community:** We foster a supportive community of learners and traders.

---

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

We welcome contributions of all kinds: bug fixes, new features, documentation, and more!

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## References & Inspiration
- [Investopedia Stock Simulator](https://www.investopedia.com/simulator/)
- [Coursera Stock Market Courses](https://www.coursera.org/courses?query=stock%20market)
- [TradingView Paper Trading](https://www.tradingview.com/paper-trading/)
- “A Web-Based Stock Market Simulation Game for Enhancing the Learning of Finance,” IJIE, 2016.
- “The Impact of Online Learning Platforms on Financial Literacy,” Journal of Financial Education, 2019.
- [MongoDB Atlas Documentation](https://www.mongodb.com/atlas)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Three.js Documentation](https://threejs.org/)

---

## Contact
- **Email:** [Add your contact email here]
- **Website:** [Add your website or deployment link here]
- **LinkedIn:** [Add your LinkedIn or team profiles here]

---

> _Empowering the next generation of traders and investors, one lesson at a time._
