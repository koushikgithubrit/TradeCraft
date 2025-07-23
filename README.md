# TradeCraft - Stock Market Learning Platform

A modern, interactive platform for learning stock market trading through comprehensive courses, real-world examples, and practical strategies.

## Features

- Modern, responsive UI with smooth animations
- Google account authentication
- Course content management system
- Progress tracking for each course
- Interactive learning materials (articles and videos)
- Contact form with EmailJS integration
- MongoDB Atlas for data storage

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas connection string)

## Environment Variables

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

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stock-market-learning-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:
```bash
npm start
```

This will start both the frontend (Vite) and backend (Express) servers concurrently.

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
├── src/                  # Frontend source files
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── hooks/           # Custom React hooks
│   ├── context/         # React context providers
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── server/              # Backend source files
│   ├── models/          # MongoDB models
│   ├── routes/          # Express routes
│   └── index.ts         # Server entry point
└── public/              # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
