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
    <div className="mt-6 text-left bg-gray-50 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">🎲 Advanced Password Generator</h2>

      {/* Length Slider */}
      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Password Length: {length}</label>
        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
          />
          Uppercase (A-Z)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeLower}
            onChange={(e) => setIncludeLower(e.target.checked)}
          />
          Lowercase (a-z)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeNumber}
            onChange={(e) => setIncludeNumber(e.target.checked)}
          />
          Numbers (0-9)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeSymbol}
            onChange={(e) => setIncludeSymbol(e.target.checked)}
          />
          Symbols (!@#)
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
        <div className="mt-4 bg-white p-3 rounded border text-sm text-gray-800">
          <p className="mb-2">
            <strong>Generated Password:</strong>
            <br />
            <code className="break-all">{generatedPassword}</code>
          </p>
          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition text-sm"
            >
              📋 Copy
            </button>
            <button
              onClick={downloadPassword}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition text-sm"
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
