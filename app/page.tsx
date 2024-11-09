export default function Home() {
  return (
    <>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-8 text-yellow-600 dark:text-yellow-400 animate-pulse">
            Welcome to STUMBLE
          </h1>
          <p className="text-center mb-8 text-gray-700 dark:text-gray-300 animate-fade-in-down">
            Connect with fellow students who share your passion for research!
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <a
              href="#"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
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
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">How It Works</h2>
            <ol className="list-decimal list-inside text-left text-gray-700 dark:text-gray-300">
              <li className="mb-2">Create your research profile</li>
              <li className="mb-2">Browse potential research partners</li>
              <li className="mb-2">Match with like-minded researchers</li>
              <li className="mb-2">Collaborate on exciting projects</li>
            </ol>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-green-50 dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">Connect</h3>
              <p className="text-gray-600 dark:text-gray-300">Find research partners who share your interests and goals.</p>
            </div>
            <div className="p-6 bg-green-50 dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">Collaborate</h3>
              <p className="text-gray-600 dark:text-gray-300">Work together on groundbreaking research projects.</p>
            </div>
            <div className="p-6 bg-green-50 dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">Create</h3>
              <p className="text-gray-600 dark:text-gray-300">Build meaningful research partnerships and advance knowledge.</p>
            </div>
          </div>
        </div>
    </>
  );
}