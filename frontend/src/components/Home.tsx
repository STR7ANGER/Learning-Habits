import { useAuth } from "../context/AuthContext";

const Home = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Welcome to YourApp
          </h1>
          <p className="mt-4 text-xl">
            Hello, {user?.email || "User"}! You are now logged in.
          </p>
          <div className="mt-10">
            <a
              href="#"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </a>
            <a
              href="#"
              className="ml-4 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 md:py-4 md:text-lg md:px-10"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;