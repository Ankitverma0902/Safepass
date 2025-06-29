import React, { useState, useEffect } from 'react';
import PasswordChecker from './components/PasswordChecker';
import Generator from './components/Generator';

function App() {
  const [tab, setTab] = useState('checker');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center transition-all">
      {/* Dark Mode Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-1 rounded-full text-sm shadow"
        >
          {darkMode ? '🌞 ' : '🌙 '}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl w-full max-w-4xl p-6 md:p-10 text-gray-800 dark:text-gray-100 transition-all">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-8">🔐 SafePass</h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setTab('checker')}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              tab === 'checker'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Password Checker
          </button>
          <button
            onClick={() => setTab('generator')}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              tab === 'generator'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Password Generator
          </button>
        </div>

        {/* Sections */}
        {tab === 'checker' && (
          <div className="animate-fade-in">
            <PasswordChecker />
          </div>
        )}
        {tab === 'generator' && (
          <div className="animate-fade-in">
            <Generator />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
