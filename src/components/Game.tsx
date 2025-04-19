import React, { useState, useEffect, useRef } from "react";
import { FaDove } from "react-icons/fa";
import QuestionModal from "./QuestionModal";
import { getRandomQuestion } from "../data/questions";
import { Question } from "../types";

// Constants
const GRAVITY = 0.08;
const JUMP_FORCE = -4.2;
const MAX_UPWARD_VELOCITY = -6; // Prevent stacking
const PIPE_SPEED = 2.5;
const PIPE_WIDTH = 60;
const PIPE_GAP = 180;
const BIRD_SIZE = 40;
const GAME_HEIGHT = 600;

const Game: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameWidth = useRef<number>(window.innerWidth);

  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const birdVelocityRef = useRef(0);

  const [pipes, setPipes] = useState<
    Array<{ x: number; topHeight: number; scored?: boolean }>
  >([]);
  const pipesRef = useRef(pipes);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(1);
  const [gameRunning, setGameRunning] = useState(true);

  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const animationFrameRef = useRef(0);

  useEffect(() => {
    const storedHigh = localStorage.getItem("flappyLearnHighScore");
    if (storedHigh) setHighScore(parseInt(storedHigh));

    const handleResize = () => {
      if (gameContainerRef.current) {
        gameWidth.current = gameContainerRef.current.offsetWidth;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    resetGame();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    pipesRef.current = pipes;
  }, [pipes]);

  const resetGame = () => {
    setScore(0);
    setBirdY(GAME_HEIGHT / 2);
    birdVelocityRef.current = 0;

    const initialPipes = Array.from({ length: 3 }, (_, i) => ({
      x: gameWidth.current + i * 300,
      topHeight: Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50,
    }));

    setPipes(initialPipes);
    setGameRunning(true);
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };

  const gameLoop = () => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    birdVelocityRef.current += GRAVITY;
    setBirdY((prevY) => {
      const nextY = prevY + birdVelocityRef.current;
      return Math.min(Math.max(nextY, 0), GAME_HEIGHT - BIRD_SIZE);
    });

    setPipes((prev) =>
      prev
        .map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
        .filter((pipe) => pipe.x + PIPE_WIDTH > 0)
    );

    if (pipesRef.current.length < 3) {
      const lastX = Math.max(
        ...pipesRef.current.map((p) => p.x),
        gameWidth.current
      );
      setPipes((prev) => [
        ...prev,
        {
          x: lastX + 300,
          topHeight: Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50,
        },
      ]);
    }

    const birdX = gameWidth.current / 2 - BIRD_SIZE / 2;
    const birdBottom = birdY + BIRD_SIZE;

    for (const pipe of pipesRef.current) {
      const inPipeX = birdX + BIRD_SIZE > pipe.x && birdX < pipe.x + PIPE_WIDTH;
      const inPipeY =
        birdY < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP;

      if (inPipeX && inPipeY) {
        handleCollision();
        return;
      }

      if (!pipe.scored && pipe.x + PIPE_WIDTH < birdX) {
        pipe.scored = true;
        setScore((prev) => prev + 1);
      }
    }

    if (birdY >= GAME_HEIGHT - BIRD_SIZE || birdY <= 0) {
      handleCollision();
    }
  };

  const handleCollision = () => {
    setGameRunning(false);
    cancelAnimationFrame(animationFrameRef.current);

    const question = getRandomQuestion();
    setCurrentQuestion(question);
    setShowQuestion(true);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("flappyLearnHighScore", score.toString());
    }
  };

  const handleQuestionAnswer = (correct: boolean) => {
    setShowQuestion(false);
    if (correct) setLives((prev) => prev + 1);
    resetGame();
  };

  const handleJump = () => {
    if (gameRunning) {
      // Prevent stacking jump force
      birdVelocityRef.current = Math.max(
        birdVelocityRef.current + JUMP_FORCE,
        MAX_UPWARD_VELOCITY
      );
    }
  };

  return (
    <div
      ref={gameContainerRef}
      className="relative w-full max-w-3xl h-[600px] bg-gradient-to-b from-sky-300 to-sky-500 overflow-hidden rounded-xl shadow-2xl border-4 border-white"
      onClick={handleJump}
      onKeyDown={(e) => e.key === " " && handleJump()}
      tabIndex={0}
    >
      <div className="absolute top-4 left-0 w-full flex justify-between px-4 z-10">
        <div className="bg-white/80 px-3 py-1 rounded-full shadow-md">
          <p className="font-bold text-base sm:text-lg">Score: {score}</p>
        </div>
        <div className="bg-white/80 px-3 py-1 rounded-full shadow-md">
          <p className="font-bold text-base sm:text-lg">High: {highScore}</p>
        </div>
      </div>

      <div className="absolute top-16 left-4 z-10">
        <div className="bg-white/80 px-3 py-1 rounded-full shadow-md flex items-center">
          <p className="font-bold text-base mr-1">Lives:</p>
          {Array.from({ length: lives }).map((_, i) => (
            <FaDove key={i} size={16} className="text-yellow-500 ml-1" />
          ))}
        </div>
      </div>

      <div
        className="absolute z-20 transition-transform"
        style={{
          left: `calc(50% - ${BIRD_SIZE / 2}px)`,
          top: `${birdY}px`,
          transition: "top 0.1s ease-out",
          transform: `rotate(${Math.min(
            Math.max(birdVelocityRef.current * 2, -30),
            30
          )}deg)`,
        }}
      >
        <FaDove size={BIRD_SIZE} className="text-yellow-500" />
      </div>

      {pipes.map((pipe, index) => (
        <React.Fragment key={index}>
          <div
            className="absolute bg-green-500 border-r-4 border-l-4 border-green-700"
            style={{
              left: `${pipe.x}px`,
              top: 0,
              width: PIPE_WIDTH,
              height: pipe.topHeight,
            }}
          >
            <div className="absolute bottom-0 h-6 w-full bg-green-600 rounded-b-lg border-b-4 border-green-700"></div>
          </div>
          <div
            className="absolute bg-green-500 border-r-4 border-l-4 border-green-700"
            style={{
              left: `${pipe.x}px`,
              top: pipe.topHeight + PIPE_GAP,
              width: PIPE_WIDTH,
              height: GAME_HEIGHT - pipe.topHeight - PIPE_GAP,
            }}
          >
            <div className="absolute top-0 h-6 w-full bg-green-600 rounded-t-lg border-t-4 border-green-700"></div>
          </div>
        </React.Fragment>
      ))}

      <div className="absolute bottom-0 w-full h-16 bg-amber-700 z-10">
        <div className="w-full h-6 bg-green-600 absolute top-0"></div>
      </div>

      {score === 0 && gameRunning && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-xl shadow-lg z-30 text-center max-w-xs">
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
