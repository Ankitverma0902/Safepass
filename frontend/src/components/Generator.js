import React, { useState } from 'react';

const Generator = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = () => {
    let charset = '';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumber) charset += '0123456789';
    if (includeSymbol) charset += '@#$!%*?&';

    if (!charset) {
      alert('⚠️ Please select at least one character type!');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    setGeneratedPassword(password);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert('📋 Password copied to clipboard!');
  };

  const downloadPassword = () => {
    const blob = new Blob([generatedPassword], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_password.txt';
    a.click();
  };

  return (
    <div className="mt-6 text-left bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md transition-all">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">🎲 Advanced Password Generator</h2>

      {/* Length Slider */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
          Password Length: <span className="font-bold">{length}</span>
        </label>
        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full mt-2 accent-indigo-600"
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
        <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} />
          Uppercase (A-Z)
        </label>
        <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} />
          Lowercase (a-z)
        </label>
        <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <input type="checkbox" checked={includeNumber} onChange={(e) => setIncludeNumber(e.target.checked)} />
          Numbers (0-9)
        </label>
        <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <input type="checkbox" checked={includeSymbol} onChange={(e) => setIncludeSymbol(e.target.checked)} />
          Symbols (@#$!)
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        🔐 Generate Password
      </button>

      {/* Result */}
      {generatedPassword && (
        <div className="mt-5 bg-white dark:bg-gray-900 p-4 rounded border dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100">
          <p className="mb-3">
            <strong>Generated Password:</strong>
            <br />
            <code className="break-all font-mono">{generatedPassword}</code>
          </p>
          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              📋 Copy
            </button>
            <button
              onClick={downloadPassword}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              ⬇️ Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Generator;
