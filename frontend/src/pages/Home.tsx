import { Link } from 'react-router-dom';
import candle_logo_bw from '../assets/images/candle_logo_bw.png'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Logo Section */}
        <div className="flex justify-center mb-12">
          <img 
            src={candle_logo_bw} 
            alt="Candle Logo" 
            className="w-64 h-64 object-contain"
          />
        </div>

        {/* Hero Text */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Candle
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-4">
            Your personal burnout assessment and tracking companion.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Candle helps you monitor and understand your burnout levels through regular assessments. 
            Track your progress over time, identify patterns, and take proactive steps toward better 
            well-being and work-life balance.
          </p>
        </div>

        {/* Get Started Button */}
        <div className="flex justify-center mb-20">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
          >
            Get Started
          </Link>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;