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

        {/* Resources Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Helpful Resources
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Learn more about burnout and mental health support
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Resource 1 */}
            <a
              href="https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900">WHO on Burnout</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Official WHO definition and classification of burnout as an occupational phenomenon
              </p>
              <p className="text-blue-600 text-sm font-semibold mt-4 group-hover:underline">
                Learn More →
              </p>
            </a>

            {/* Resource 2 */}
            <a
              href="https://www.apa.org/topics/healthy-workplaces/work-stress"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900">APA Work Stress</h3>
              </div>
              <p className="text-gray-700 text-sm">
                American Psychological Association resources on managing workplace stress and building resilience
              </p>
              <p className="text-green-600 text-sm font-semibold mt-4 group-hover:underline">
                Learn More →
              </p>
            </a>

            {/* Resource 3 */}
            <a
              href="https://www.mindful.org/how-to-manage-stress-with-mindfulness-and-meditation/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900">Mindfulness Guide</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Practical mindfulness and meditation techniques to manage stress and prevent burnout
              </p>
              <p className="text-purple-600 text-sm font-semibold mt-4 group-hover:underline">
                Learn More →
              </p>
            </a>
          </div>
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