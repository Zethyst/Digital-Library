import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthContext from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    console.log("Logging in with", provider);
    
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
            Welcome Back
          </h2>
          <p className="text-amber-300 text-lg">
            Sign in to your account or{" "}
            <a
              href="/register"
              className="font-semibold text-yellow-200 hover:text-yellow-100 transition-colors duration-300 underline decoration-yellow-400"
            >
              create a new account
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password..."
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded focus:ring-yellow-400 focus:ring-2"
                  style={{
                    backgroundColor: rememberMe
                      ? "#ffff99"
                      : "rgba(255,255,153,0.9)",
                    borderColor: "#d4af37",
                    color: "#2d1b0e",
                  }}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 text-amber-300 text-sm font-medium"
                >
                  Remember me
                </label>
              </div>

              <a
                href="#"
                className="text-sm font-semibold text-yellow-200 hover:text-yellow-100 transition-colors duration-300 underline decoration-yellow-400"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
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
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </div>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute -z-10 inset-0 flex items-center">
                <div
                  className="w-full border-t-2"
                  style={{ borderColor: "rgba(212,175,55,0.4)" }}
                />
              </div>
              <div className="relative z-10 flex justify-center text-sm">
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="w-full inline-flex justify-center items-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: "rgba(255,255,153,0.9)",
                  color: "#2d1b0e",
                  border: "2px solid #d4af37",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google
              </button>

              <button
                onClick={() => handleSocialLogin("GitHub")}
                className="w-full inline-flex justify-center items-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: "rgba(255,255,153,0.9)",
                  color: "#2d1b0e",
                  border: "2px solid #d4af37",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-amber-300 text-sm">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="text-yellow-200 hover:text-yellow-100 underline decoration-yellow-400"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-yellow-200 hover:text-yellow-100 underline decoration-yellow-400"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
