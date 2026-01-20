import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import api from "../api";

interface Entry {
  date: string;
  cynicism_score: number;
  exhaustion_score: number;
  reduced_accomplishment_score: number;
  total_score: number;
}

const RecentEntry = () => {
  const navigate = useNavigate();

  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentEntry();
  }, []);

  const fetchRecentEntry = async (): Promise<void> => {
    

    api
    .get("http://localhost:8000/api/display/recent")
    .then((res) => {
        setEntry(res.data);
    })
    .catch((err) => {
        if (err.status === 403){
            navigate('/questions');
            return;
        }
        setError(err instanceof Error ? err.message : 'An error occurred');
    })
    .finally(() => {
        setLoading(false);
    });
  };

  const getScoreColor = (score: number): string => {
    if (score >= 75) return 'from-red-500 to-red-600';
    if (score >= 50) return 'from-orange-500 to-orange-600';
    if (score >= 25) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  const getScoreTextColor = (score: number): string => {
    if (score >= 75) return 'text-red-600';
    if (score >= 50) return 'text-orange-600';
    if (score >= 25) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 75) return 'bg-red-50';
    if (score >= 50) return 'bg-orange-50';
    if (score >= 25) return 'bg-yellow-50';
    return 'bg-green-50';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 75) return 'High';
    if (score >= 50) return 'Moderate';
    if (score >= 25) return 'Low';
    return 'Minimal';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h2>
          <p className="text-gray-600">{error || 'No recent entry available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Recent Assessment</h1>
          <p className="text-gray-600 text-lg">{formatDate(entry.date)}</p>
        </div>

        {/* Total Score - Hero Section */}
        <div className={`${getScoreBgColor(entry.total_score)} rounded-3xl shadow-2xl p-8 border-2 ${entry.total_score >= 75 ? 'border-red-200' : entry.total_score >= 50 ? 'border-orange-200' : entry.total_score >= 25 ? 'border-yellow-200' : 'border-green-200'}`}>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Overall Burnout Score</h2>
            <div className="relative inline-block">
              <svg className="transform -rotate-90 w-64 h-64">
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="url(#gradient)"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 112}`}
                  strokeDashoffset={`${2 * Math.PI * 112 * (1 - entry.total_score / 100)}`}
                  strokeLinecap="round"
                  className={`${getScoreColor(entry.total_score)} transition-all duration-1000 ease-out green-600`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className={getScoreColor(entry.total_score).split(' ')[0].replace('from-', 'stop-')} />
                    <stop offset="100%" className={getScoreColor(entry.total_score).split(' ')[1].replace('to-', 'stop-')} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-6xl font-bold ${getScoreTextColor(entry.total_score)}`}>
                  {Math.round(entry.total_score)}
                </span>
                <span className="text-gray-600 text-xl mt-2">{getScoreLabel(entry.total_score)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cynicism Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Cynicism</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-4xl font-bold ${getScoreTextColor(entry.cynicism_score)}`}>
                  {Math.round(entry.cynicism_score)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(entry.cynicism_score)} ${getScoreTextColor(entry.cynicism_score)}`}>
                  {getScoreLabel(entry.cynicism_score)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getScoreColor(entry.cynicism_score)} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${entry.cynicism_score}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Exhaustion Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Exhaustion</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-4xl font-bold ${getScoreTextColor(entry.exhaustion_score)}`}>
                  {Math.round(entry.exhaustion_score)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(entry.exhaustion_score)} ${getScoreTextColor(entry.exhaustion_score)}`}>
                  {getScoreLabel(entry.exhaustion_score)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getScoreColor(entry.exhaustion_score)} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${entry.exhaustion_score}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Reduced Accomplishment Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Reduced Accomplishment</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-4xl font-bold ${getScoreTextColor(entry.reduced_accomplishment_score)}`}>
                  {Math.round(entry.reduced_accomplishment_score)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(entry.reduced_accomplishment_score)} ${getScoreTextColor(entry.reduced_accomplishment_score)}`}>
                  {getScoreLabel(entry.reduced_accomplishment_score)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getScoreColor(entry.reduced_accomplishment_score)} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${entry.reduced_accomplishment_score}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Results</h3>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              Your overall burnout score is <span className={`font-bold ${getScoreTextColor(entry.total_score)}`}>{Math.round(entry.total_score)}</span>, 
              indicating a <span className="font-semibold">{getScoreLabel(entry.total_score).toLowerCase()}</span> level of burnout.
            </p>
            {entry.total_score >= 75 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-800">
                  <strong>High burnout detected.</strong> Consider seeking support from a mental health professional and discussing workload management with your supervisor.
                </p>
              </div>
            )}
            {entry.total_score >= 50 && entry.total_score < 75 && (
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="text-orange-800">
                  <strong>Moderate burnout.</strong> It's important to prioritize self-care and consider strategies to reduce stress.
                </p>
              </div>
            )}
            {entry.total_score < 50 && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-800">
                  <strong>Good news!</strong> Your burnout levels are in a healthy range. Continue maintaining work-life balance.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentEntry;