import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Login from './components/Login';
import GameSelector from './components/GameSelector';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import MultiplicationGame from './components/MultiplicationGame';
import MathGame from './components/MathGame';
import Profile from './components/Profile';
import Highscores from './components/Highscores';
import MathSelection from './components/MathSelection';

const AppContent = () => {
    const { user } = useGame();
    const [currentView, setCurrentView] = useState('game-selector');

    if (!user) {
        return <Login />;
    }

    switch (currentView) {
        case 'game-selector':
            return <GameSelector onNavigate={setCurrentView} />;
        case 'math-selection':
            return <MathSelection onNavigate={setCurrentView} onBack={() => setCurrentView('game-selector')} />;
        case 'geography-game':
            return <Game onBack={() => setCurrentView('game-selector')} />;
        case 'multiplication-game':
            return <MultiplicationGame onBack={() => setCurrentView('math-selection')} />;
        case 'math-game':
            return <MathGame onBack={() => setCurrentView('math-selection')} />;
        case 'profile':
            return <Profile onBack={() => setCurrentView('game-selector')} />;
        case 'highscores':
            return <Highscores onBack={() => setCurrentView('game-selector')} />;
        // Legacy support for old dashboard view
        case 'dashboard':
            return <Dashboard onNavigate={setCurrentView} />;
        default:
            return <GameSelector onNavigate={setCurrentView} />;
    }
};

function App() {
    return (
        <GameProvider>
            <AppContent />
        </GameProvider>
    );
}

export default App;

