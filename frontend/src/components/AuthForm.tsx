import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }: { route: string; method: "login" | "register" }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    interface AuthResponse {
        access: string;
        refresh: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        setLoading(true);
        setError("");
        e.preventDefault();

        // Password confirmation check for registration
        if (method === "register" && password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        } else if (method === "register" && password.length < 4) {
            setError("Password is too short");
            setLoading(false);
            return;
        }

        try {
            const res = await api.post<AuthResponse>(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/questions");
            } else {
                navigate("/login");
            }
        } catch (error: any) {
            setError("Username or password invalid");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
                    <p className="text-gray-600">Enter your credentials to continue</p>
                </div>
                
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {method === "register" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                                    confirmPassword && password !== confirmPassword
                                        ? 'border-red-300 focus:border-red-500'
                                        : 'border-gray-300 focus:border-blue-500'
                                }`}
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                            )}
                        </div>
                    )}
                </div>
                
                {loading && (
                    <div className="flex items-center justify-center py-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600">Loading...</span>
                    </div>
                )}
                
                <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading || (method === "register" && password !== confirmPassword)}
                >
                    {name}
                </button>
                <span className="flex items-center justify-center py-2">
                    {method === "login" ? (
                    <p>Don't have an account? <Link to ='/register' className="text-blue-600">Register</Link></p>
                    ) : (
                    <p>Already have an account? <Link to ='/login' className="text-blue-600">Login</Link></p>
                    )}
                    
                </span>
            </form> 
        </div>
    );
}

export default Form;