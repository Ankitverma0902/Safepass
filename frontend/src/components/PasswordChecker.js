import React, { useState } from 'react';

const getStrength = (password) => {
  let score = 0;
  if (password.length > 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;
  return score;
};

const getStrengthLabel = (score) => {
  if (score >= 4) return 'Strong';
  if (score >= 2) return 'Moderate';
  return 'Weak';
};

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [breachCount, setBreachCount] = useState(null);

  const checkPassword = async (pwd) => {
    setPassword(pwd);

    if (!pwd) {
      setStrength(0);
      setBreachCount(null);
      return;
    }

    setStrength(getStrength(pwd));

    try {
      const res = await fetch('http://localhost:5000/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      const data = await res.json();
      setBreachCount(data.count);
    } catch (err) {
      console.error('API error:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([password], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'password.txt';
    a.click();
  };

  const barColor =
    strength >= 4 ? 'bg-green-500' : strength >= 2 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="mb-4 text-left">
      {/* Input with Show/Hide */}
  <div className="relative w-full mb-4">
  <input
    type={showPassword ? 'text' : 'password'}
    placeholder="Enter password"
    value={password}
    onChange={(e) => checkPassword(e.target.value)}
    className="w-full pl-4 pr-20 py-3 text-base rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-indigo-600 text-sm font-medium flex items-center gap-1"
  >
    <span>{showPassword ? 'Hide' : 'Show'}</span>
    <span role="img" aria-label="eye">{showPassword ? '🙈' : '👁️'}</span>
  </button>
</div>


      {/* Strength Meter */}
      {password && (
        <>
          <div className="w-full bg-gray-200 h-3 rounded mb-1">
            <div
              className={`h-3 rounded transition-all duration-300 ${barColor}`}
              style={{ width: `${strength * 20}%` }}
            ></div>
          </div>
          <p className="text-sm mb-2 text-gray-600">
            🔐 Password Strength: <strong>{getStrengthLabel(strength)}</strong>
          </p>
        </>
      )}

      {/* Live Suggestions */}
      {password && strength < 4 && (
        <ul className="text-sm text-red-500 mb-2 ml-4 list-disc">
          {password.length <= 8 && <li>Use at least 8 characters</li>}
          {!/[A-Z]/.test(password) && <li>Include uppercase letters</li>}
          {!/[a-z]/.test(password) && <li>Include lowercase letters</li>}
          {!/\d/.test(password) && <li>Add numbers</li>}
          {!/[@$!%*?&]/.test(password) && <li>Add special characters</li>}
        </ul>
      )}

      {/* Breach Info */}
      {password && breachCount !== null && (
        <div className="text-sm mt-2">
          {breachCount > 0 ? (
            <p className="text-yellow-700">
              ⚠️ This password appeared in <strong>{breachCount}</strong> breaches. Avoid using it.
            </p>
          ) : (
            <p className="text-green-600">✅ This password has not been found in known breaches.</p>
          )}
        </div>
      )}

    </div>
  );
};

export default PasswordChecker;
