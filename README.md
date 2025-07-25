# TradeCraft - Stock Market Learning Platform

<p align="center">
  <img src="public/vite.svg" alt="TradeCraft Logo" width="120" />
</p>

<p align="center">
  <b>Your premier destination for stock market education and trading insights.</b>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/Features-8+-emerald" alt="Features"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20TS-blueviolet" alt="Frontend">
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20MongoDB-green" alt="Backend">
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs Welcome">
</p>

<p align="center">
  <a href="#live-demo"><img src="https://img.shields.io/badge/Live%20Demo-Click%20Here-emerald?style=for-the-badge" alt="Live Demo"></a>
</p>

---

## 🚀 Quick Links
- [Live Demo](#live-demo)
- [Features](#features)
- [Why TradeCraft?](#why-tradecraft)
- [Screenshots & Demo](#screenshots--demo)
- [Getting Started](#getting-started)
- [Team](#team)
- [Testimonials](#testimonials)
- [FAQ](#faq)
- [Contact](#contact)

---

## 🌟 Why TradeCraft?
TradeCraft isn’t just another online course. It’s a full-fledged, interactive learning platform that:
- Combines **structured lessons** with **real-world trading simulations**
- Tracks your progress and celebrates your milestones
- Offers a beautiful, modern UI with 3D visualizations
- Connects you with a community of learners and experts
- Is built by passionate educators and market professionals

> **Empowering the next generation of traders and investors, one lesson at a time.**

---

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

---

## 🟢 Live Demo
> _Add your deployment link below_

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-emerald?style=for-the-badge)](https://your-demo-link.com)

---

## 🎬 Screenshots & Demo
> _Replace the placeholder below with your own GIF or screenshots!_

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2J6b2Z2d3F2b2J6d3F2b2J6d3F2b2J6d3F2b2J6d3F2b2J6/giphy.gif" alt="Demo GIF" width="600"/>
</p>

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

## 💬 Testimonials
> _“TradeCraft made learning the stock market fun and easy. The interactive lessons and real-world examples are top-notch!”_  
> — **A. Student**

> _“I love the progress tracking and the community support. Highly recommended for anyone serious about trading!”_  
> — **B. Trader**

---

## ❓ FAQ
**Q: Is TradeCraft free to use?**  
A: The core learning modules are free. Premium features (like advanced simulations) may be added in the future.

**Q: Can I use TradeCraft on mobile?**  
A: Yes! The UI is fully responsive and works great on all devices.

**Q: How do I reset my password?**  
A: Use the Google login or contact support for help.

---

## 🆘 How to Get Help
- Check the [Issues](https://github.com/your-repo/issues) page for common questions
- Open a new issue for bugs or feature requests
- Email us (see Contact section below)

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

## 🌐 Social & Contact
- **Email:** [Add your contact email here]
- **Website:** [Add your website or deployment link here]
- **LinkedIn:** [Add your LinkedIn or team profiles here]
- **Twitter:** [Add your Twitter handle here]

---

## 🙏 Acknowledgements
- Thanks to all contributors, beta testers, and the open-source community!
- Special thanks to the creators of React, Vite, Tailwind CSS, MongoDB, and all supporting libraries.
