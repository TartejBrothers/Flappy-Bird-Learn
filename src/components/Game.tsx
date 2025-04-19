// Game.tsx

import React, { useEffect, useRef, useState } from "react";
import { FaDove } from "react-icons/fa";
import { getRandomQuestion } from "../data/questions";
import QuestionModal from "./QuestionModal";
import { Question } from "../types";

// Constants
const GRAVITY = 5;
const JUMP_HEIGHT = 60;
const BIRD_SIZE = 50;
const PIPE_WIDTH = 80;
const GAME_HEIGHT = 600;
const PIPE_GAP = 200;

const Game: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameWidth = useRef<number>(window.innerWidth);

  const [birdY, setBirdY] = useState(200);
  const [pipes, setPipes] = useState<Array<{ x: number; y: number }>>([]);
  const [gameRunning, setGameRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const gravityInterval = useRef<NodeJS.Timeout | null>(null);
  const pipeMoveInterval = useRef<NodeJS.Timeout | null>(null);
  const pipeGeneratorInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedHigh = localStorage.getItem("flappyLearnHighScore");
    if (storedHigh) setHighScore(parseInt(storedHigh));

    const resizeHandler = () => {
      if (gameContainerRef.current) {
        gameWidth.current = gameContainerRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", resizeHandler);
    resizeHandler();

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (!gameRunning) return;

    gravityInterval.current = setInterval(() => {
      setBirdY((prev) => {
        const next = prev + GRAVITY;
        if (next + BIRD_SIZE >= GAME_HEIGHT) {
          stopGame();
        }
        return next;
      });
    }, 30);

    pipeMoveInterval.current = setInterval(() => {
      setPipes((prev) =>
        prev
          .map((pipe) => ({ ...pipe, x: pipe.x - 5 }))
          .filter((pipe) => pipe.x + PIPE_WIDTH > 0)
      );
    }, 30);

    pipeGeneratorInterval.current = setInterval(() => {
      setPipes((prev) => [
        ...prev,
        {
          x: gameWidth.current,
          y: Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP - 100)) + 50,
        },
      ]);
    }, 2000);

    return () => {
      clearInterval(gravityInterval.current!);
      clearInterval(pipeMoveInterval.current!);
      clearInterval(pipeGeneratorInterval.current!);
    };
  }, [gameRunning]);

  const stopGame = () => {
    setGameRunning(false);
    setDead(true);

    if (gravityInterval.current) clearInterval(gravityInterval.current);
    if (pipeMoveInterval.current) clearInterval(pipeMoveInterval.current);
    if (pipeGeneratorInterval.current)
      clearInterval(pipeGeneratorInterval.current);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("flappyLearnHighScore", score.toString());
    }

    const q = getRandomQuestion();
    setCurrentQuestion(q);
    setShowQuestion(true);
  };

  const startGame = () => {
    setDead(false);
    setBirdY(200);
    setPipes([]);
    setScore(0);
    setGameRunning(true);
  };

  const handleJump = () => {
    if (dead) return;
    if (!gameRunning) {
      startGame();
      return;
    }
    setBirdY((prev) => Math.max(prev - JUMP_HEIGHT, 0));
  };

  const handleQuestionAnswer = (correct: boolean) => {
    setShowQuestion(false);
    if (correct) startGame();
  };

  // Collision detection
  useEffect(() => {
    if (!gameRunning) return;
    const birdTop = birdY;
    const birdBottom = birdY + BIRD_SIZE;
    const birdLeft = gameWidth.current / 2 - BIRD_SIZE / 2;
    const birdRight = birdLeft + BIRD_SIZE;

    pipes.forEach((pipe) => {
      const inPipeX = birdRight > pipe.x && birdLeft < pipe.x + PIPE_WIDTH;
      const inPipeY = birdTop < pipe.y || birdBottom > pipe.y + PIPE_GAP;

      if (inPipeX && inPipeY) {
        stopGame();
      } else if (pipe.x + PIPE_WIDTH === birdLeft) {
        setScore((s) => s + 1);
      }
    });
  }, [birdY, pipes, gameRunning]);

  return (
    <div
      ref={gameContainerRef}
      className="relative w-full max-w-3xl h-[600px] bg-sky-300 overflow-hidden rounded-lg border-4 border-white"
      onClick={handleJump}
      tabIndex={0}
      onKeyDown={(e) => e.key === " " && handleJump()}
    >
      <div className="absolute top-4 left-4 z-10 font-bold bg-white/80 px-3 py-1 rounded-full shadow-md">
        Score: {score}
      </div>
      <div className="absolute top-4 right-4 z-10 font-bold bg-white/80 px-3 py-1 rounded-full shadow-md">
        High: {highScore}
      </div>

      <div
        className="absolute z-20 transition-transform"
        style={{
          left: `calc(50% - ${BIRD_SIZE / 2}px)`,
          top: `${birdY}px`,
          transform: `rotate(${dead ? 90 : -birdY / 10}deg)`,
        }}
      >
        <FaDove size={BIRD_SIZE} className="text-yellow-500" />
      </div>

      {pipes.map((pipe, idx) => (
        <React.Fragment key={idx}>
          <div
            className="absolute bg-green-500 border-2 border-green-700"
            style={{
              left: `${pipe.x}px`,
              top: 0,
              width: PIPE_WIDTH,
              height: pipe.y,
            }}
          />
          <div
            className="absolute bg-green-500 border-2 border-green-700"
            style={{
              left: `${pipe.x}px`,
              top: pipe.y + PIPE_GAP,
              width: PIPE_WIDTH,
              height: GAME_HEIGHT - pipe.y - PIPE_GAP,
            }}
          />
        </React.Fragment>
      ))}

      {!gameRunning && !dead && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white/90 p-4 rounded-xl shadow-lg z-30 text-center max-w-xs">
          <p className="font-bold mb-2">Click or tap to flap!</p>
          <p className="text-sm text-gray-600">
            Answer questions correctly when you crash to get an extra life!
          </p>
        </div>
      )}

      {showQuestion && currentQuestion && (
        <QuestionModal
          question={currentQuestion}
          onAnswer={handleQuestionAnswer}
        />
      )}
    </div>
  );
};

export default Game;
