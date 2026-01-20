import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import api from "../api";

interface Question {
  id: number;
  text: string;
  question_type: string;
  order: number;
  created_at: string;
}

// interface Redirect {
//     redirect: string;
// }

interface QuestionEntry {
  question: number;
  score: number;
}

interface Scores {
  [key: number]: number | null;
}

const question_options = ['Strongly Disagree', 'Disagree', 'Slightly Disagree', 'Slightly Agree', 'Agree', 'Strongly Agree']

const Questions = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [scores, setScores] = useState<Scores>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async (): Promise<void> => {

        api
        .get("http://localhost:8000/api/questions/get")
        .then((res) => {
            setQuestions(res.data);
        })
        .catch((err) => {
            if (err.status === 403){
                navigate('/recent-entry');
                return;
            }
            console.log(err)
            setError(err instanceof Error ? err.message : 'An error occurred');
        })
        .finally(() => {
            setLoading(false);
        });
        /*
        try {
            // const response = await fetch('http://localhost:8000/api/questions/get', {
            //     credentials: 'include',
            // });


            // if (response.status === 403) {
            //     navigate('/recent-entry');
            //     return;
            // }

            

            // const data: Question[] = await response.json();

            // if (!response.ok) throw new Error('Failed to fetch questions');

            
            
            // Initialize scores object
            const initialScores: Scores = {};
            questions.forEach(q => {
                initialScores[q.id] = null;
            });
            setScores(initialScores);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }*/
    };

    const getCsrfToken = (): string | null => {
        const name = 'csrftoken';
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [key, value] = cookie.trim().split('=');
            if (key === name) return value;
        }
        return null;
    };

    const handleScoreChange = (questionId : number, value : number) => {
        setScores(prev => ({
        ...prev,
        [questionId]: value
        }));
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
        
        api
        .post("http://localhost:8000/api/questions/input", {entries})
        .then(() => {
            setSuccess(true);
            navigate('/recent-entry');
        })
        .catch((err) => {
            console.log(err)
            alert(err)
        })
        .finally(() => {
            setSubmitting(false);
        });

        // try {
        // const csrfToken = getCsrfToken();
        // const response = await fetch('http://localhost:8000/api/questions/input', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     'X-CSRFToken': csrfToken || '', 
        //     },
        //     body: JSON.stringify({ entries })
        // });

        // if (!response.ok) throw new Error('Failed to submit answers');
        
        // const data = await response.json(); //Unused
        // setSuccess(true);
        
        // // Reset form

        // const resetScores: Scores = {};
        // questions.forEach(q => {
        //     resetScores[q.id] = null;
        // });
        // setScores(resetScores);
        // } catch (err) {
        // setError(err instanceof Error ? err.message : 'An error occurred');
        // } finally {
        // setSubmitting(false);
        // }
    };

    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-lg text-gray-600">Loading questions...</div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Question Survey
            </h1>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800">Answers submitted successfully!</p>
                </div>
            )}

            <div className="space-y-6">
                {questions.map((question) => (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="mb-4">
                    <span className="text-lg font-medium text-gray-700">
                        {question.text}
                    </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center sm:items-stretch">
                    {question_options.map((value, score) => (
                        <button
                        key={question.id + "-" + value}
                        onClick={() => handleScoreChange(question.id, score)}
                        className={`w-64 sm:w-40 sm:h-16 py-5 sm:py-0 rounded-lg font-semibold text-lg transition flex items-center justify-center ${
                            scores[question.id] === score
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        >
                        {value}
                        </button>
                    ))}
                    </div>
                </div>
                ))}
            </div>

            <div className="mt-8">
                <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`w-full py-3 px-6 rounded-md text-white font-semibold text-lg transition ${
                    submitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                }`}
                >
                {submitting ? 'Submitting...' : 'Submit Answers'}
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}


export default Questions
