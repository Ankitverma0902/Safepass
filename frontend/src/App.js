import React, { useState } from 'react';
import PasswordChecker from './components/PasswordChecker';
import Generator from './components/Generator';

function App() {
  const [tab, setTab] = useState('checker');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-4xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">🔐 SafePass</h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setTab('checker')}
            className={`px-5 py-2 rounded-full font-semibold ${
              tab === 'checker'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Password Checker
          </button>
          <button
            onClick={() => setTab('generator')}
            className={`px-5 py-2 rounded-full font-semibold ${
              tab === 'generator'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
