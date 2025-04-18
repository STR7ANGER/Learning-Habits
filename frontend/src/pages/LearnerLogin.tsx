import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";

const LearnerLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { login, setUserType } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Use the login function from context with role
    login({ email, role: 'learner' });

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Blue background with animated grid pattern, logo and text */}
      <div className="w-1/2 bg-blue-800 flex flex-col items-center justify-center text-white p-8 relative overflow-hidden">
        {/* Animated Grid Pattern */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "absolute inset-0 opacity-60"
          )}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 text-center ">
            <BlurText
              text="Learning Habits !!"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-5xl mb-8"
            />
          </div>
          <SplitText
            text="Empower your journey with interactive courses designed to help you master new skills at your own pace"
            className="text-2xl text-center text-gray-200 max-w-md"
            delay={10}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-2/3 bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

          <div className="flex mb-6 border-b">
            <div className="flex-1 py-2 text-center font-medium text-blue-600 border-b-2 border-blue-600">
              Login as Learner
            </div>
            <Link
              to="/expertlogin"
              className="flex-1 py-2 text-center font-medium text-gray-500 hover:text-blue-600"
            >
              Login as Expert
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerLogin;