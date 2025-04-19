import React from "react";
import { FaDove } from "react-icons/fa";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
      <h1 className="game-title text-2xl md:text-4xl text-blue-500 mb-6">
        FLAPPY LEARN
      </h1>

      <div className="mb-8 flex justify-center">
        <div className="bird-fly">
          <FaDove size={64} className="text-yellow-500" />
        </div>
      </div>

      <p className="mb-6 text-gray-700">
        Fly through pipes and test your software engineering knowledge!
      </p>

      <div className="mb-6 bg-gray-100 rounded-lg p-4 text-left">
        <h3 className="font-bold text-gray-800 mb-2">How to play:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click or tap to make the bird fly</li>
          <li>• Avoid hitting pipes</li>
          <li>
            • Answer questions correctly when you crash to get an extra life
          </li>
          <li>• See how high you can score!</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="pulse bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg"
      >
        START GAME
      </button>
    </div>
  );
};

export default StartScreen;
