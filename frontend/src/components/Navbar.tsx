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
            {/* <svg 
              className="w-8 h-8" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
            
              <path d="M12 2C10.9 2 10 2.9 10 4C10 4.7 10.4 5.4 11 5.7V7H9V9H11V20C11 21.1 11.9 22 13 22C14.1 22 15 21.1 15 20V9H17V7H15V5.7C15.6 5.4 16 4.7 16 4C16 2.9 15.1 2 14 2H12M12 3.5C12.3 3.5 12.5 3.7 12.5 4C12.5 4.3 12.3 4.5 12 4.5C11.7 4.5 11.5 4.3 11.5 4C11.5 3.7 11.7 3.5 12 3.5M13 9V20H13V9Z" />
            </svg> */}
            <img
              className="w-8 h-8" 
              src={candle_logo}
              alt="React Jobs"
            />
            {/* <img src='../assets/images/candle-logo.png' /> */}
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