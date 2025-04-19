import React, { useState } from 'react';
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-600 flex items-center justify-center p-4">
      {!gameStarted ? (
        <StartScreen onStart={() => setGameStarted(true)} />
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;