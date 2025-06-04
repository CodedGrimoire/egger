"use client";
import { useEffect, useState } from "react";

const eggTypes = [
  { name: "Soft Boiled", time: 240, emoji: "🥚", description: "Runny yolk, set white" },
  { name: "Medium Boiled", time: 420, emoji: "🍳", description: "Creamy yolk, firm white" },
  { name: "Hard Boiled", time: 720, emoji: "🥚", description: "Fully set yolk and white" },
  { name: "Poached", time: 180, emoji: "🍳", description: "Delicate and silky" },
  { name: "Scrambled", time: 150, emoji: "🍳", description: "Fluffy and creamy" },
  { name: "Deviled Prep", time: 600, emoji: "😈", description: "Perfect for deviled eggs" },
  { name: "Ramen Egg", time: 390, emoji: "🍜", description: "Jammy yolk, perfect for ramen" }
];

export default function Home() {
  const [selectedType, setSelectedType] = useState(eggTypes[0]);
  const [secondsLeft, setSecondsLeft] = useState(selectedType.time);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    if (!isRunning) {
      setSecondsLeft(selectedType.time);
      setIsComplete(false);
    }
  }, [selectedType, isRunning]);

  const formatTime = (s) => {
    const min = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const reset = () => {
    setSecondsLeft(selectedType.time);
    setIsRunning(false);
    setIsComplete(false);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setIsRunning(false);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-200 text-gray-800 p-6 relative overflow-hidden">
      {/* Dancing Chickens */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="chicken-dance absolute top-10 left-10 text-4xl animate-bounce" style={{animationDelay: '0s'}}>🐔</div>
        <div className="chicken-dance absolute top-20 right-16 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🐓</div>
        <div className="chicken-dance absolute bottom-20 left-20 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🐔</div>
        <div className="chicken-dance absolute bottom-32 right-20 text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>🐓</div>
        <div className="chicken-dance absolute top-1/2 left-8 text-2xl animate-bounce" style={{animationDelay: '2s'}}>🐔</div>
        <div className="chicken-dance absolute top-1/3 right-8 text-2xl animate-bounce" style={{animationDelay: '2.5s'}}>🐓</div>
      </div>

      <style jsx>{`
        @keyframes dance {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-3deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        .chicken-dance {
          animation: dance 2s ease-in-out infinite;
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        .wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-pink-200">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          🥚 Eggy Timer 🐔
        </h1>

        {/* Egg Type Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-pink-600 mb-3 text-center">Choose Your Egg Style!</h2>
          <div className="grid grid-cols-2 gap-2">
            {eggTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => handleTypeChange(type)}
                className={`p-3 rounded-2xl text-sm font-medium transition-all ${
                  selectedType.name === type.name
                    ? 'bg-gradient-to-r from-pink-400 to-yellow-400 text-white shadow-lg transform scale-105'
                    : 'bg-pink-100 hover:bg-pink-200 text-pink-700'
                }`}
              >
                <div className="text-lg mb-1">{type.emoji}</div>
                <div className="font-bold">{type.name}</div>
                <div className="text-xs opacity-75">{formatTime(type.time)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Type Description */}
        <div className="text-center mb-6 p-3 bg-yellow-100 rounded-2xl border-2 border-yellow-200">
          <div className="text-2xl mb-1">{selectedType.emoji}</div>
          <div className="font-bold text-pink-600">{selectedType.name}</div>
          <div className="text-sm text-gray-600">{selectedType.description}</div>
        </div>

        {/* Timer Display */}
        <div className="relative w-48 h-48 mb-8 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#fce7f3"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={
                ((selectedType.time - secondsLeft) / selectedType.time) * 2 * Math.PI * 40
              }
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#facc15" />
              </linearGradient>
            </defs>
          </svg>
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${isComplete ? 'wiggle' : ''}`}>
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              {formatTime(secondsLeft)}
            </div>
            {isComplete && (
              <div className="text-4xl animate-bounce mt-2">🎉</div>
            )}
          </div>
        </div>

        {/* Completion Message */}
        {isComplete && (
          <div className="text-center mb-6 p-4 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-2xl border-2 border-pink-300 animate-pulse">
            <div className="text-2xl mb-2">🎊 Egg-cellent! 🎊</div>
            <div className="font-bold text-pink-600">Your {selectedType.name} is ready!</div>
            <div className="text-sm text-gray-600 mt-1">Time to enjoy your perfect egg! 🍽️</div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center items-end">
          {/* Super Cute Egg Button */}
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            disabled={isComplete}
            className={`relative w-24 h-28 transition-all transform hover:scale-110 ${
              isComplete ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'
            } ${isRunning ? 'animate-pulse' : ''}`}
            style={{
              background: 'linear-gradient(145deg, #fef3c7 0%, #fbbf24 30%, #ffffff 100%)',
              borderRadius: '50% 50% 50% 50% / 65% 65% 35% 35%',
              border: '4px solid #fde68a',
              boxShadow: '0 12px 30px rgba(251, 191, 36, 0.3), inset 0 4px 12px rgba(255, 255, 255, 0.6)',
              filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.4))'
            }}
          >
            {/* Cute Face */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Eyes */}
              <div className="flex gap-2 mb-1">
                <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              </div>
              
              {/* Play/Pause Icon as mouth */}
              <div className="text-lg mb-1">
                {isRunning ? "😴" : "😋"}
              </div>
              
              {/* Action Icon */}
              <div className="text-xs">
                {isRunning ? "⏸️" : "▶️"}
              </div>
            </div>

            {/* Sparkles around the egg */}
            <div className="absolute -top-2 -left-2 text-yellow-300 text-xs animate-ping">✨</div>
            <div className="absolute -top-1 -right-2 text-pink-300 text-xs animate-ping" style={{animationDelay: '0.5s'}}>✨</div>
            <div className="absolute -bottom-1 -left-1 text-yellow-300 text-xs animate-ping" style={{animationDelay: '1s'}}>✨</div>
            <div className="absolute -bottom-2 -right-1 text-pink-300 text-xs animate-ping" style={{animationDelay: '1.5s'}}>✨</div>

            {/* Blush cheeks */}
            <div className="absolute top-8 left-1 w-3 h-2 bg-pink-300 opacity-50 rounded-full"></div>
            <div className="absolute top-8 right-1 w-3 h-2 bg-pink-300 opacity-50 rounded-full"></div>

            {/* Egg shine */}
            <div 
              className="absolute top-3 left-4 w-4 h-6 bg-white opacity-60 rounded-full blur-sm"
              style={{ transform: 'rotate(-15deg)' }}
            ></div>
          </button>

          <button
            onClick={reset}
            className="bg-gradient-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white font-bold px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg border-2 border-pink-200"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="mt-6 text-center max-w-md">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border-2 border-yellow-200">
          <div className="text-lg mb-2">🐣 Fun Fact!</div>
          <div className="text-sm text-gray-700">
            The perfect egg timer has been helping cooks since 1891! 
            Our dancing chickens are just here for moral support! 🐔💃
          </div>
        </div>
      </div>
    </div>
  );
}