import React from "react";

interface GameOverModalProps {
  score: number;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score }) => {
  return (
    <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Game Over</h2>
        <p className="text-lg text-gray-800 mb-6">
          Your Score: <span className="font-semibold">{score}</span>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
