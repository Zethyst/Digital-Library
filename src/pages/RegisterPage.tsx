import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const RegisterPage: React.FC = () => {
 const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await register(name, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative"
      style={{
        background:
          "linear-gradient(135deg, #2d1b0e 0%, #4a2c17 25%, #6b3e2a 50%, #4a2c17 75%, #2d1b0e 100%)",
      }}
    >
      {/* Wood grain texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M0 0h60v30H30V0zM30 30h30v30H30V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2
            className="text-4xl font-bold text-yellow-200 mb-4"
            style={{ fontFamily: '"Cutive Mono", monospace' }}
          >
            Create Account
          </h2>
          <p className="text-amber-300 text-lg">
            Join our community or{" "}
            <a
              href="/login"
              className="font-semibold text-yellow-200 hover:text-yellow-100 transition-colors duration-300 underline decoration-yellow-400"
            >
              sign in to existing account
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div
          className="py-10 px-8 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,153,0.15) 0%, rgba(212,175,55,0.15) 100%)",
            border: "2px solid rgba(212,175,55,0.4)",
            boxShadow:
              "inset 0 0 30px rgba(255,255,153,0.08), 0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {error && (
            <div
              className="p-4 rounded-lg mb-6 border-2"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
                color: "#fca5a5",
              }}
            >
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-yellow-200 mb-2"
                style={{ fontFamily: '"Cutive Mono", monospace' }}
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name..."
                className="w-full px-4 py-3 rounded-lg text-amber-900 placeholder-amber-700 outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 text-lg"
                style={{
                  backgroundColor: "rgba(255,255,153,0.9)",
                  border: "2px solid #d4af37",
                }}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-yellow-200 mb-2"
                style={{ fontFamily: '"Cutive Mono", monospace' }}
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full px-4 py-3 rounded-lg text-amber-900 placeholder-amber-700 outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 text-lg"
                style={{
                  backgroundColor: "rgba(255,255,153,0.9)",
                  border: "2px solid #d4af37",
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-yellow-200 mb-2"
                style={{ fontFamily: '"Cutive Mono", monospace' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password..."
                  className="w-full px-4 py-3 pr-12 rounded-lg text-amber-900 placeholder-amber-700 outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 text-lg"
                  style={{
                    backgroundColor: "rgba(255,255,153,0.9)",
                    border: "2px solid #d4af37",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-700 hover:text-amber-900 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-yellow-200 mb-2"
                style={{ fontFamily: '"Cutive Mono", monospace' }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password..."
                  className="w-full px-4 py-3 pr-12 rounded-lg text-amber-900 placeholder-amber-700 outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 text-lg"
                  style={{
                    backgroundColor: "rgba(255,255,153,0.9)",
                    border: "2px solid #d4af37",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-700 hover:text-amber-900 transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 mt-1 rounded focus:ring-yellow-400 focus:ring-2"
                style={{
                  backgroundColor: agreeToTerms
                    ? "#ffff99"
                    : "rgba(255,255,153,0.9)",
                  borderColor: "#d4af37",
                  color: "#2d1b0e",
                }}
              />
              <label
                htmlFor="terms"
                className="ml-3 text-amber-300 text-sm leading-relaxed"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-yellow-200 hover:text-yellow-100 underline decoration-yellow-400 font-semibold"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-yellow-200 hover:text-yellow-100 underline decoration-yellow-400 font-semibold"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 px-6 font-bold text-lg rounded-lg transition-all duration-300 transform ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:scale-105 hover:shadow-lg"
              }`}
              style={{
                backgroundColor: "#ffff99",
                color: "#2d1b0e",
                border: "2px solid #d4af37",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                fontFamily: '"Cutive Mono", monospace',
              }}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-amber-300 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-yellow-200 hover:text-yellow-100 underline decoration-yellow-400 font-semibold"
          >
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;