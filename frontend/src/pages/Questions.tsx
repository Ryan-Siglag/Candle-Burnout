import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api";

interface Question {
  id: number;
  text: string;
  question_type: string;
  order: number;
  created_at: string;
}

interface QuestionEntry {
  question: number;
  score: number;
}

interface Scores {
  [key: number]: number | null;
}

const question_options = [
  { label: 'Strongly\nDisagree', short: 'SD' },
  { label: 'Disagree',           short: 'D'  },
  { label: 'Slightly\nDisagree', short: 'SD−' },
  { label: 'Slightly\nAgree',    short: 'SA' },
  { label: 'Agree',              short: 'A'  },
  { label: 'Strongly\nAgree',    short: 'SA+' },
];

const Questions = () => {
  const navigate = useNavigate();

  const [questions, setQuestions]   = useState<Question[]>([]);
  const [scores, setScores]         = useState<Scores>({});
  const [loading, setLoading]       = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError]           = useState<string | null>(null);
  const [success, setSuccess]       = useState<boolean>(false);

  useEffect(() => { fetchQuestions(); }, []);

  const fetchQuestions = async (): Promise<void> => {
    api.get("http://localhost:8000/api/questions/get")
      .then((res) => { setQuestions(res.data); })
      .catch((err) => {
        if (err.status === 403) { navigate('/recent-entry'); return; }
        setError(err instanceof Error ? err.message : 'An error occurred');
      })
      .finally(() => { setLoading(false); });
  };

  const handleScoreChange = (questionId: number, value: number) => {
    setScores(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const entries: QuestionEntry[] = Object.entries(scores)
      .filter(([_, score]) => score !== null)
      .map(([questionId, score]) => ({
        question: parseInt(questionId),
        score: score as number,
      }));

    if (entries.length === 0) {
      setError('Please answer at least one question');
      setSubmitting(false);
      return;
    }

    api.post("http://localhost:8000/api/questions/input", { entries })
      .then(() => { setSuccess(true); navigate('/recent-entry'); })
      .catch((err) => { console.log(err); alert(err); })
      .finally(() => { setSubmitting(false); });
  };

  const answeredCount = Object.values(scores).filter(v => v !== null).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading questions…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Question Survey</h1>
          <p className="text-sm text-gray-500 mt-1">
            {answeredCount} of {questions.length} answered
          </p>
          {/* Progress bar */}
          <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
            Answers submitted successfully!
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, idx) => (
            <div key={question.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              {/* Question text */}
              <p className="text-gray-800 font-medium mb-5 leading-relaxed">
                <span className="text-gray-400 text-sm font-normal mr-2">Q{idx + 1}.</span>
                {question.text}
              </p>

              {/* Scale labels */}
              <div className="flex justify-between text-xs text-gray-400 mb-2 px-1">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>

              {/* Option buttons — single row, equal width */}
              <div className="grid grid-cols-6 gap-2">
                {question_options.map((option, score) => {
                  const selected = scores[question.id] === score;
                  return (
                    <button
                      key={score}
                      onClick={() => handleScoreChange(question.id, score)}
                      title={option.label.replace('\n', ' ')}
                      className={`
                        py-3 rounded-lg text-xs font-semibold transition-all duration-150
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
                        ${selected
                          ? 'bg-blue-600 text-white shadow-md scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                        }
                      `}
                    >
                      {score + 1}
                    </button>
                  );
                })}
              </div>

              {/* Selected label feedback */}
              <p className="mt-2 text-xs text-center text-blue-600 h-4">
                {scores[question.id] !== null && scores[question.id] !== undefined
                  ? question_options[scores[question.id] as number].label.replace('\n', ' ')
                  : ''}
              </p>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={submitting || answeredCount === 0}
            className={`w-full py-3 px-6 rounded-xl text-white font-semibold text-base transition-all duration-150 ${
              submitting || answeredCount === 0
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-sm hover:shadow-md'
            }`}
          >
            {submitting ? 'Submitting…' : `Submit${answeredCount > 0 ? ` (${answeredCount}/${questions.length})` : ''}`}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Questions;