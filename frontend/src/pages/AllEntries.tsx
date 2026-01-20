import { useState, useEffect } from 'react';
import api from "../api";
import Loading from '../components/Loading';

interface Entry {
  id: number;
  date: string;
  cynicism_score: number;
  exhaustion_score: number;
  reduced_accomplishment_score: number;
  total_score: number;
}

interface Averages {
  avg_cynicism: number;
  avg_exhaustion: number;
  avg_reduced_accomplishment: number;
  avg_total: number;
}

const AllEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [averages, setAverages] = useState<Averages | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllEntries();
  }, []);

  const fetchAllEntries = async (): Promise<void> => {

    api
    .get('http://localhost:8000/api/display/all')
    .then((res) => {
        const data = res.data;
        setEntries(data || []);
        console.log(data)
        console.log(data.entries)
        if (data && data.length > 0) {
        const avg = {
          avg_cynicism: data.reduce((sum: number, e: Entry) => sum + e.cynicism_score, 0) / data.length,
          avg_exhaustion: data.reduce((sum: number, e: Entry) => sum + e.exhaustion_score, 0) / data.length,
          avg_reduced_accomplishment: data.reduce((sum: number, e: Entry) => sum + e.reduced_accomplishment_score, 0) / data.length,
          avg_total: data.reduce((sum: number, e: Entry) => sum + e.total_score, 0) / data.length,
        };
        setAverages(avg);
      }
    })
    .catch((err) => {
        console.log(err)

        if (err.status === 403){
          setEntries([]);
          return;
        }

        setError(err instanceof Error ? err.message : 'An error occurred');
    })
    .finally(() => {
        setLoading(false);
    });

    // try {
    //   const response = await fetch('http://localhost:8000/api/display/all', {
    //     credentials: 'include',
    //   });
      
    //   if (!response.ok) throw new Error('Failed to fetch entries');
      
    //   const data = await response.json();
    //   console.log(data.entries)
    //   setEntries(data || []);
      
    //   // Calculate averages
    //   if (data.entries && data.entries.length > 0) {
    //     const avg = {
    //       avg_cynicism: data.entries.reduce((sum: number, e: Entry) => sum + e.cynicism_score, 0) / data.entries.length,
    //       avg_exhaustion: data.entries.reduce((sum: number, e: Entry) => sum + e.exhaustion_score, 0) / data.entries.length,
    //       avg_reduced_accomplishment: data.entries.reduce((sum: number, e: Entry) => sum + e.reduced_accomplishment_score, 0) / data.entries.length,
    //       avg_total: data.entries.reduce((sum: number, e: Entry) => sum + e.total_score, 0) / data.entries.length,
    //     };
    //     setAverages(avg);
    //   }
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : 'An error occurred');
    // } finally {
    //   setLoading(false);
    // }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 75) return 'text-red-600';
    if (score >= 50) return 'text-orange-600';
    if (score >= 25) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 75) return 'bg-red-50 border-red-200';
    if (score >= 50) return 'bg-orange-50 border-orange-200';
    if (score >= 25) return 'bg-yellow-50 border-yellow-200';
    return 'bg-green-50 border-green-200';
  };

  const getScoreGradient = (score: number): string => {
    if (score >= 75) return 'from-red-500 to-red-600';
    if (score >= 50) return 'from-orange-500 to-orange-600';
    if (score >= 25) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <Loading>Loading your entries...</Loading>
      // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      //   <div className="flex flex-col items-center">
      //     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      //     <p className="mt-4 text-gray-600 text-lg">Loading your entries...</p>
      //   </div>
      // </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Entries Yet</h2>
          <p className="text-gray-600">Start by completing your first assessment!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Assessment History</h1>
          <p className="text-gray-600 text-lg">{entries.length} {entries.length === 1 ? 'entry' : 'entries'} recorded</p>
        </div>

 {/* Averages Section */}
{averages && (
  <div className="bg-white rounded-3xl shadow-2xl p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Overall Averages</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Average - Prominent */}
      <div className={`${getScoreBgColor(averages.avg_total)} rounded-2xl p-8 border-2 md:col-span-2 lg:col-span-4`}>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Average Total Score</h3>
            <p className={`text-6xl font-bold ${getScoreColor(averages.avg_total)}`}>
              {Math.round(averages.avg_total)}
            </p>
          </div>
          {/* <div>
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - averages.avg_total / 100)}`}
                strokeLinecap="round"
                className={`${getScoreColor(averages.avg_total)}`}
              />
            </svg>
          </div> */}
        </div>
      </div>

      {/* Individual Averages - Centered */}
      <div className="md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg Cynicism</h3>
          <p className={`text-3xl font-bold ${getScoreColor(averages.avg_cynicism)}`}>
            {Math.round(averages.avg_cynicism)}
          </p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-full bg-gradient-to-r ${getScoreGradient(averages.avg_cynicism)} rounded-full`}
              style={{ width: `${averages.avg_cynicism}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg Exhaustion</h3>
          <p className={`text-3xl font-bold ${getScoreColor(averages.avg_exhaustion)}`}>
            {Math.round(averages.avg_exhaustion)}
          </p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-full bg-gradient-to-r ${getScoreGradient(averages.avg_exhaustion)} rounded-full`}
              style={{ width: `${averages.avg_exhaustion}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg Reduced Accomplishment</h3>
          <p className={`text-3xl font-bold ${getScoreColor(averages.avg_reduced_accomplishment)}`}>
            {Math.round(averages.avg_reduced_accomplishment)}
          </p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-full bg-gradient-to-r ${getScoreGradient(averages.avg_reduced_accomplishment)} rounded-full`}
              style={{ width: `${averages.avg_reduced_accomplishment}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
        {/* Entries Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Individual Entries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <div 
                key={entry.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-t-4 border-blue-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Entry Date</p>
                    <p className="text-gray-900 text-lg font-semibold">{formatDate(entry.date)}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreBgColor(entry.total_score)}`}>
                    <span className={getScoreColor(entry.total_score)}>{Math.round(entry.total_score)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Cynicism</span>
                    <span className={`font-bold ${getScoreColor(entry.cynicism_score)}`}>
                      {Math.round(entry.cynicism_score)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreGradient(entry.cynicism_score)} rounded-full`}
                      style={{ width: `${entry.cynicism_score}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Exhaustion</span>
                    <span className={`font-bold ${getScoreColor(entry.exhaustion_score)}`}>
                      {Math.round(entry.exhaustion_score)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreGradient(entry.exhaustion_score)} rounded-full`}
                      style={{ width: `${entry.exhaustion_score}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Reduced Accomplishment</span>
                    <span className={`font-bold ${getScoreColor(entry.reduced_accomplishment_score)}`}>
                      {Math.round(entry.reduced_accomplishment_score)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreGradient(entry.reduced_accomplishment_score)} rounded-full`}
                      style={{ width: `${entry.reduced_accomplishment_score}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Total Score</span>
                    <span className={`text-2xl font-bold ${getScoreColor(entry.total_score)}`}>
                      {Math.round(entry.total_score)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEntries;