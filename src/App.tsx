import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import About from './pages/About';
import Courses from './pages/Courses';
import TradingCourse from './pages/TradingCourse';
import ModuleViewer from './components/ModuleViewer';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

// These components will be created later when needed
const CoursesPage = () => <div>Courses Page</div>;
const AboutPage = () => <div>About Page</div>;

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-[#0A0F1C]">
            <Navbar />
            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/trading-course" element={<TradingCourse />} />
                <Route path="/trading-course/:moduleId" element={<TradingCourse />} />
                <Route path="/trading-course/:moduleId/:lessonId" element={<TradingCourse />} />
                <Route path="/trading-modules/:moduleId" element={<ModuleViewer />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}
export default App;

