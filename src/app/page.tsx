"use client"
import { useState } from 'react';

export default function Home() {
  const [num1, setNum1] = useState<number | string>('');
  const [num2, setNum2] = useState<number | string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleAddition = async () => {
    if (num1 !== '' && num2 !== '') {
      try {
        const response = await fetch('http://127.0.0.1:8000/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ num1: parseFloat(num1 as string), num2: parseFloat(num2 as string) }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResult(data.result);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">足し算アプリ</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Number 1"
            className="border border-gray-300 p-3 rounded-lg mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
          />
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Number 2"
            className="border border-gray-300 p-3 rounded-lg mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
          />
          <button
            onClick={handleAddition}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Add
          </button>
        </div>
        {result !== null && (
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-gray-700">答え: {result}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
