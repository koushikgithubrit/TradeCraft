# TradeCraft - Stock Market Learning Platform

<p align="center">
  <img src="public/vite.svg" alt="TradeCraft Logo" width="120" />
</p>

<p align="center">
  <b>Your premier destination for stock market education and trading insights.</b>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/Features-10+-emerald" alt="Features"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20TS-blueviolet" alt="Frontend">
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20MongoDB-green" alt="Backend">
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/AI-Assistant-purple" alt="AI Assistant">
  <img src="https://img.shields.io/badge/Mobile-App%20Coming%20Soon-orange" alt="Mobile App Coming Soon">
</p>

<p align="center">
  <a href="#live-demo"><img src="https://img.shields.io/badge/Live%20Demo-Click%20Here-emerald?style=for-the-badge" alt="Live Demo"></a>
</p>

---

## 🚀 Quick Links
- [Live Demo](#live-demo)
- [What's New](#whats-new)
- [Features](#features)
- [Why TradeCraft?](#why-tradecraft)
- [Screenshots & Demo](#screenshots--demo)
- [Getting Started](#getting-started)
- [Team](#team)
- [Community](#community)
- [Testimonials](#testimonials)
- [FAQ](#faq)
- [Support](#support)
- [Roadmap](#roadmap)
- [Security & Privacy](#security--privacy)
- [Changelog](#changelog)
- [Awards & Recognition](#awards--recognition)
- [Partners](#partners)
- [Contact](#contact)

---

## 🆕 What's New
- **AI-Powered Trading Assistant:** Get real-time answers and trading tips from our built-in AI bot.
- **Mobile App (Beta):** Learn and trade on the go! [Coming soon]
- **Live Webinars:** Weekly sessions with market experts.
- **Trading Competitions:** Compete with peers and win exciting rewards.
- **New Modules:** Added "Options Trading" and "Crypto Markets".
- **Enhanced Security:** 2FA and advanced encryption for all users.

---

## 🌟 Why TradeCraft?
TradeCraft isn’t just another online course. It’s a full-fledged, interactive learning platform that:
- Combines **structured lessons** with **real-world trading simulations**
- Tracks your progress and celebrates your milestones
- Offers a beautiful, modern UI with 3D visualizations
- Connects you with a community of learners and experts
- Is built by passionate educators and market professionals
- Now features **AI-powered learning** and **live events**

> **Empowering the next generation of traders and investors, one lesson at a time.**

---

## Features
- 🚀 **Modern, responsive UI** with smooth animations (Framer Motion, Tailwind CSS)
- 🔐 **Google account authentication** (OAuth 2.0)
- 📚 **Comprehensive course content** with progress tracking
- 🎥 **Interactive learning materials** (articles, videos, 3D visualizations)
- 🤖 **AI Trading Assistant** (NEW!)
- 📈 **Real-world trading simulation** (planned/coming soon)
- 📬 **Contact form** with EmailJS integration
- ☁️ **Cloud database** with MongoDB Atlas
- 🛡️ **JWT-based secure authentication**
- 📊 **Admin panel** for course/content management
- 📱 **Mobile app** (coming soon)
- 🏆 **Trading competitions & leaderboards**

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

## 🌐 Community
- **Discord:** [Join our Discord](https://discord.gg/your-invite)
- **Slack:** [Join our Slack](https://slack.com/your-invite)
- **Forum:** [Community Forum](https://forum.tradecraft.com)
- **Events:** [Webinars & Meetups](https://events.tradecraft.com)

> _Connect, learn, and grow with fellow traders!_

---

## 💬 Testimonials
> _“TradeCraft made learning the stock market fun and easy. The interactive lessons and real-world examples are top-notch!”_  
> — **A. Student**

> _“I love the progress tracking and the community support. Highly recommended for anyone serious about trading!”_  
> — **B. Trader**

> _“The new AI assistant is a game-changer for quick trading advice!”_  
> — **C. Power User**

---

## ❓ FAQ
**Q: Is TradeCraft free to use?**  
A: The core learning modules are free. Premium features (like advanced simulations) may be added in the future.

**Q: Can I use TradeCraft on mobile?**  
A: Yes! The UI is fully responsive and a mobile app is coming soon.

**Q: How do I reset my password?**  
A: Use the Google login or contact support for help.

**Q: How do I join the community?**  
A: Use the links in the Community section above.

---

## 🆘 Support
- Check the [Issues](https://github.com/your-repo/issues) page for common questions
- Open a new issue for bugs or feature requests
- Email us (see Contact section below)
- Visit our [Knowledge Base](https://help.tradecraft.com)

---

## 🗺️ Roadmap
- [x] AI-powered trading assistant
- [x] New modules: Options Trading, Crypto Markets
- [x] Live webinars and events
- [ ] Mobile app (iOS & Android)
- [ ] Trading competitions & leaderboards
- [ ] Social trading features
- [ ] API for algorithmic trading
- [ ] More languages (localization)

---

## 🔒 Security & Privacy
- All user data is encrypted in transit and at rest
- Two-factor authentication (2FA) for all accounts
- GDPR and CCPA compliant
- No personal data is shared with third parties
- Regular security audits and vulnerability testing

---

## 📝 Changelog
- **v2.0.0** (2024-06-01): AI assistant, new modules, mobile app beta, enhanced security
- **v1.5.0** (2024-04-15): Stripe integration, trading competitions, webinars
- **v1.0.0** (2024-01-10): Initial public release

---

## 🏅 Awards & Recognition
- 🏆 *Best FinTech EdTech Startup 2024* — [FinTech Awards](https://fintechawards.com)
- 🥇 *Top 10 Trading Platforms* — [TradingReview.com](https://tradingreview.com)
- 🌟 *Featured on Product Hunt* — [Product Hunt](https://producthunt.com)

---

## 🤝 Partners
- [AlphaFinance](https://alphafinance.com) — Market data provider
- [EduTraders](https://edutraders.com) — Content partner
- [OpenAI](https://openai.com) — AI technology
- [Stripe](https://stripe.com) — Payment processing

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
