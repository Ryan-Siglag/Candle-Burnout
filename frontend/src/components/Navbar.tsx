// Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import candle_logo from '../assets/images/candle_logo.png'

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <>
    <div className="h-16"></div>
    <nav className="fixed w-full top-0 start-0 z-50 h-16 bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white hover:text-blue-100 transition"
          >
            <img
              className="w-8 h-8" 
              src={candle_logo}
              alt="React Jobs"
            />
            <span className="text-xl font-bold">Candle</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/questions"
                  className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition font-medium"
                >
                  Weekly Form
                </Link>
                <Link
                  to="/history"
                  className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition font-medium"
                >
                  History
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition font-semibold shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg transition font-semibold shadow-md"
              >
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-blue-100 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/questions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:bg-blue-600 px-3 py-2 rounded-lg transition font-medium"
                >
                  Weekly Form
                </Link>
                <Link
                  to="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:bg-blue-600 px-3 py-2 rounded-lg transition font-medium"
                >
                  History
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white hover:bg-blue-600 px-3 py-2 rounded-lg transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:bg-blue-600 px-3 py-2 rounded-lg transition font-medium"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;