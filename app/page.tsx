export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-background transition-colors duration-300">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-8 text-yellow-500 dark:text-yellow-300 animate-pulse">
            Welcome to STUMBLE
          </h1>
          <p className="text-center mb-8 text-gray-700 dark:text-gray-300 animate-fade-in-down">
            Connect with fellow students who share your passion for research!
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <a
              href="/login"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              Register
            </a>
            <a
              href="#"
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
