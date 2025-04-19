import React, { useState } from "react";
import { Question } from "../types";
import GameOverModal from "./GameOverModal";

interface QuestionModalProps {
  question: Question;
  score: number;
  onAnswer: (isCorrect: boolean) => void;
  onGameOver: () => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  score,
  onAnswer,
  onGameOver,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer === question.correctAnswer;
    const delay = isCorrect ? 1500 : 3000;

    setTimeout(() => {
      onAnswer(isCorrect);

      if (!isCorrect) {
        onGameOver(); // Notify Game.tsx of game over
      }
    }, delay);
  };

  const getAnswerClass = (answer: string) => {
    if (!isAnswered) {
      return "bg-white hover:bg-blue-50 border-gray-300";
    }
    if (answer === question.correctAnswer) {
      return "bg-green-100 border-green-500 text-green-800";
    }
    if (answer === selectedAnswer) {
      return "bg-red-100 border-red-500 text-red-800";
    }
    return "bg-gray-100 border-gray-300 text-gray-500";
  };

  return (
    <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
            {question.topic}
          </span>
          <h2 className="text-xl font-bold text-gray-800">{question.text}</h2>
        </div>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered}
              className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${getAnswerClass(
                option
              )} ${selectedAnswer === option ? "ring-2 ring-blue-500" : ""}`}
            >
              <span className="font-medium">
                {String.fromCharCode(65 + index)}.
              </span>{" "}
              {option}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div
            className={`p-4 rounded-lg ${
              selectedAnswer === question.correctAnswer
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {selectedAnswer === question.correctAnswer
              ? "✓ Correct! You get an extra life!"
              : `✗ Sorry, that's incorrect. The correct answer is: ${question.correctAnswer}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;
