import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import MathDashboard from './MathDashboard';
import ModeSelection from './ModeSelection';

const MathGame = ({ onBack }) => {
    const { user, addXP, saveMathScore } = useGame();
    const [view, setView] = useState('dashboard');
    const [gameMode, setGameMode] = useState(null); // 'fixed' or 'timed'
    const [settings, setSettings] = useState(null); // number of questions or time in seconds
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [gameResults, setGameResults] = useState(null);
    const [bestScores, setBestScores] = useState({
        fixed: { score: 0, time: '0:00', questions: 50 },
        timed: { score: 0, time: '30' }
    });

    const timerRef = useRef(null);

    // Load best scores from user data
    useEffect(() => {
        if (user?.mathBestFixed) {
            setBestScores(prev => ({
                ...prev,
                fixed: user.mathBestFixed
            }));
        }
        if (user?.mathBestTimed) {
            setBestScores(prev => ({
                ...prev,
                timed: user.mathBestTimed
            }));
        }
    }, [user]);

    // Timer effect
    useEffect(() => {
        if (view === 'playing') {
            timerRef.current = setInterval(() => {
                if (gameMode === 'fixed') {
                    setTimeElapsed(prev => prev + 1);
                } else if (gameMode === 'timed') {
                    setTimeRemaining(prev => {
                        if (prev <= 1) {
                            finishGame();
                            return 0;
                        }
                        return prev - 1;
                    });
                }
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [view, gameMode]);

    // Generate random math question (plus or minus)
    const generateQuestion = () => {
        const isAddition = Math.random() > 0.5;
        let num1, num2, correctAnswer, operator;

        if (isAddition) {
            // Addition: 1-20 + 1-20
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
            correctAnswer = num1 + num2;
            operator = '+';
        } else {
            // Subtraction: 1-20 - 1-20 (ensure positive result or simple negative?)
            // Let's ensure num1 >= num2 for now to avoid negatives for easier difficulty
            const a = Math.floor(Math.random() * 20) + 1;
            const b = Math.floor(Math.random() * 20) + 1;
            num1 = Math.max(a, b);
            num2 = Math.min(a, b);
            correctAnswer = num1 - num2;
            operator = '-';
        }

        // Generate 3 wrong answers
        const wrongAnswers = new Set();
        while (wrongAnswers.size < 3) {
            const offset = Math.floor(Math.random() * 10) - 5; // Smaller offset for +/-
            if (offset === 0) continue;

            const wrongAnswer = correctAnswer + offset;

            // Allow negative answers if the question was subtraction and resulted in negative (though we avoided that above)
            // But prevent illogical negatives for simple addition if we want to stick to positive integers?
            // With current logic, correctAnswer >= 0.
            if (wrongAnswer >= 0 && wrongAnswer !== correctAnswer) {
                wrongAnswers.add(wrongAnswer);
            }
        }

        const options = [correctAnswer, ...Array.from(wrongAnswers)];
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        return {
            num1,
            num2,
            operator,
            correctAnswer,
            options
        };
    };

    const startGame = (mode, value) => {
        setGameMode(mode);
        setSettings(value);

        const numQuestions = mode === 'fixed' ? value : 100; // Generate many questions for timed mode
        const newQuestions = Array.from({ length: numQuestions }, generateQuestion);

        setQuestions(newQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeElapsed(0);
        setTimeRemaining(mode === 'timed' ? value : 0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setView('playing');
    };

    const handleAnswer = (answer) => {
        if (showFeedback) return;

        setSelectedAnswer(answer);
        setShowFeedback(true);

        const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        // Move to next question after a short delay
        setTimeout(() => {
            if (gameMode === 'fixed' && currentQuestionIndex + 1 >= settings) {
                finishGame();
            } else if (gameMode === 'timed' && timeRemaining <= 0) {
                finishGame();
            } else {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer(null);
                setShowFeedback(false);
            }
        }, 800);
    };

    const finishGame = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        const finalTime = gameMode === 'fixed' ? timeElapsed : settings;
        const finalScore = score;
        const questionsAnswered = gameMode === 'fixed' ? settings : currentQuestionIndex + 1;

        // Calculate XP based on performance
        const xpEarned = finalScore * 5;
        addXP(xpEarned);

        // Format time
        const minutes = Math.floor(finalTime / 60);
        const seconds = finalTime % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Save score to backend
        if (saveMathScore) {
            saveMathScore(gameMode, finalScore, timeString, questionsAnswered);
        }

        setGameResults({
            score: finalScore,
            total: questionsAnswered,
            time: timeString,
            timeSeconds: finalTime,
            xpEarned,
            mode: gameMode
        });

        setView('results');
    };

    const handleStartFromDashboard = (action) => {
        if (action === 'quick-start') {
            startGame('fixed', 50);
        } else if (action === 'mode-selection-fixed') {
            setGameMode('fixed');
            setView('mode-selection');
        } else if (action === 'mode-selection-timed') {
            setGameMode('timed');
            setView('mode-selection');
        }
    };

    const handleNavigate = (destination) => {
        if (destination === 'game-selector') {
            onBack();
        } else if (destination === 'highscores') {
            // TODO: Navigate to highscores
            console.log('Navigate to highscores');
        } else if (destination === 'quick-start') {
            startGame('fixed', 50);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Dashboard View
    if (view === 'dashboard') {
        return (
            <MathDashboard
                onStartGame={handleStartFromDashboard}
                onNavigate={handleNavigate}
                bestScores={bestScores}
            />
        );
    }

    // Mode Selection View
    if (view === 'mode-selection') {
        return (
            <ModeSelection
                mode={gameMode}
                onStart={(value) => startGame(gameMode, value)}
                onBack={() => setView('dashboard')}
            />
        );
    }

    // Playing View
    if (view === 'playing' && questions.length > 0) {
        const currentQuestion = questions[currentQuestionIndex];
        const progress = gameMode === 'fixed'
            ? ((currentQuestionIndex + 1) / settings) * 100
            : ((settings - timeRemaining) / settings) * 100;

        return (
            <div className="container" style={{ paddingTop: '2rem', maxWidth: '700px', margin: '0 auto' }}>
                {/* Header with timer and progress */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4A90E2' }}>
                            {gameMode === 'fixed' ? `Fråga ${currentQuestionIndex + 1}/${settings}` : `Poäng: ${score}`}
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFA500' }}>
                            ⏱️ {gameMode === 'fixed' ? formatTime(timeElapsed) : formatTime(timeRemaining)}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e0e0e0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #4A90E2, #357ABD)',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </div>

                {/* Question Card */}
                <div className="card" style={{
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // Different color for Math
                    color: 'white'
                }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        {currentQuestion.num1} {currentQuestion.operator} {currentQuestion.num2} = ?
                    </div>
                </div>

                {/* Answer Options */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = option === currentQuestion.correctAnswer;
                        const showCorrect = showFeedback && isCorrect;
                        const showWrong = showFeedback && isSelected && !isCorrect;

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                disabled={showFeedback}
                                style={{
                                    padding: '2rem',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    borderRadius: '1rem',
                                    border: showCorrect ? '3px solid #4CAF50' : showWrong ? '3px solid #f44336' : '2px solid #ddd',
                                    background: showCorrect ? '#4CAF50' : showWrong ? '#f44336' : 'white',
                                    color: showCorrect || showWrong ? 'white' : '#333',
                                    cursor: showFeedback ? 'default' : 'pointer',
                                    transition: 'all 0.2s',
                                    transform: isSelected ? 'scale(0.95)' : 'scale(1)'
                                }}
                                onMouseEnter={(e) => {
                                    if (!showFeedback) {
                                        e.currentTarget.style.background = '#f0f7ff';
                                        e.currentTarget.style.borderColor = '#4A90E2';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!showFeedback) {
                                        e.currentTarget.style.background = 'white';
                                        e.currentTarget.style.borderColor = '#ddd';
                                    }
                                }}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {/* Score display */}
                <div style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem' }}>
                    Rätt svar: <strong style={{ color: '#4CAF50' }}>{score}</strong>
                </div>
            </div>
        );
    }

    // Results View
    if (view === 'results' && gameResults) {
        const percentage = Math.round((gameResults.score / gameResults.total) * 100);
        const isNewBest = gameMode === 'fixed'
            ? gameResults.score > bestScores.fixed.score || (gameResults.score === bestScores.fixed.score && gameResults.timeSeconds < bestScores.fixed.timeSeconds)
            : gameResults.score > bestScores.timed.score;

        return (
            <div className="container" style={{ paddingTop: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '👍'}
                    </div>
                    <h1 style={{ color: '#4A90E2', marginBottom: '0.5rem' }}>Bra jobbat!</h1>
                    {isNewBest && (
                        <div style={{
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            display: 'inline-block',
                            fontWeight: 'bold',
                            marginBottom: '1rem'
                        }}>
                            🎉 Nytt rekord!
                        </div>
                    )}
                </div>

                <div className="card" style={{ marginBottom: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4A90E2', marginBottom: '1rem' }}>
                            {gameResults.score}/{gameResults.total}
                        </div>
                        <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>
                            {percentage}% rätt
                        </div>
                        <div style={{ fontSize: '1.1rem', color: '#888' }}>
                            ⏱️ Tid: {gameResults.time}
                        </div>
                        <div style={{ fontSize: '1.1rem', color: '#FFA500', marginTop: '1rem', fontWeight: 'bold' }}>
                            +{gameResults.xpEarned} XP
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        onClick={() => startGame(gameMode, settings)}
                        className="btn btn-primary"
                        style={{ fontSize: '1.1rem', padding: '1rem' }}
                    >
                        🔄 Spela igen
                    </button>
                    <button
                        onClick={() => setView('dashboard')}
                        className="btn btn-secondary"
                    >
                        Tillbaka till meny
                    </button>
                    <button
                        onClick={onBack}
                        className="btn"
                        style={{ background: 'white', color: '#333', border: '2px solid #ddd' }}
                    >
                        Byt spel
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default MathGame;
