import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { swedenQuestions, countries, capitals, mapQuestions } from '../data/geographyData';
import MapComponent from './MapComponent';

const Game = ({ onBack }) => {
    const { addXP, user } = useGame();
    const [gameState, setGameState] = useState('menu'); // menu, playing, result
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // New settings state
    const [questionCount, setQuestionCount] = useState(5);
    const [gameMode, setGameMode] = useState('standard'); // standard, time-attack, map-quiz
    const [timeLimit, setTimeLimit] = useState(30); // seconds
    const [timeLeft, setTimeLeft] = useState(0);

    // Timer effect for Time Attack
    React.useEffect(() => {
        let timer;
        if (gameState === 'playing' && gameMode === 'time-attack' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        finishGame(score);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState, gameMode, timeLeft, score]);

    const startGame = (category) => {
        let allQuestions = [];
        if (category === 'sweden') allQuestions = [...swedenQuestions];
        else if (category === 'countries') allQuestions = [...countries];
        else if (category === 'capitals') allQuestions = [...capitals];
        else if (category === 'map') allQuestions = [...mapQuestions];
        else allQuestions = [...swedenQuestions, ...countries, ...capitals];

        // Filter by difficulty based on user level
        const userLevel = user ? user.level : 1;

        allQuestions = allQuestions.filter(q => {
            if (userLevel <= 2) return q.difficulty === 1;
            if (userLevel <= 5) return q.difficulty <= 2;
            return true; // Level 6+ gets everything
        });

        // Fallback
        if (allQuestions.length === 0) {
            if (category === 'sweden') allQuestions = [...swedenQuestions];
            else if (category === 'countries') allQuestions = [...countries];
            else if (category === 'capitals') allQuestions = [...capitals];
            else if (category === 'map') allQuestions = [...mapQuestions];
            else allQuestions = [...swedenQuestions, ...countries, ...capitals];
        }

        // Shuffle
        allQuestions = allQuestions.sort(() => 0.5 - Math.random());

        if (gameMode === 'standard' || gameMode === 'map-quiz') {
            let q = [];
            while (q.length < questionCount) {
                q = [...q, ...allQuestions];
            }
            q = q.slice(0, questionCount);
            setQuestions(q);
        } else {
            // Time Attack
            let q = [];
            for (let i = 0; i < 50; i++) q = [...q, ...allQuestions];
            setQuestions(q);
            setTimeLeft(timeLimit);
        }

        setCurrentIndex(0);
        setScore(0);
        setGameState('playing');
    };

    const handleAnswer = (option) => {
        if (showFeedback) return;

        const correct = option === questions[currentIndex].answer;
        let newScore = score;
        if (correct) {
            newScore = score + 1;
            setScore(newScore);
        }

        if (gameMode === 'time-attack') {
            // In Time Attack, we auto-advance to keep speed
            // Maybe show a quick flash? For now, instant next.
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(c => c + 1);
            }
        } else {
            // Standard mode: Show feedback and wait for manual next
            setSelectedAnswer(option);
            setShowFeedback(true);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(c => c + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            finishGame(score);
        }
    };


    const finishGame = async (finalScore) => {
        // Ensure we don't call this multiple times
        if (gameState === 'result') return;

        const xpEarned = finalScore * 10;
        addXP(xpEarned);
        setScore(finalScore);
        setGameState('result');

        // Submit highscore to backend
        try {
            const token = localStorage.getItem('gq_token');
            if (token && user) {
                await fetch('http://localhost:5000/api/highscores', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        username: user.username,
                        score: finalScore,
                        gameMode: gameMode,
                        xp: user.xp + xpEarned,
                        level: user.level
                    })
                });
            }
        } catch (error) {
            console.error('Failed to submit highscore:', error);
        }
    };


    if (gameState === 'menu') {
        return (
            <div className="container" style={{ paddingTop: '2rem', textAlign: 'center' }}>
                <button onClick={onBack} className="btn" style={{ float: 'left' }}>← Tillbaka</button>
                <h2 className="title" style={{ clear: 'both' }}>Inställningar</h2>

                <div style={{ marginBottom: '2rem', textAlign: 'left', maxWidth: '400px', margin: '0 auto 2rem auto', background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Spelläge:</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => setGameMode('standard')}
                                className={`btn ${gameMode === 'standard' ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ flex: 1, padding: '0.5rem' }}
                            >
                                Standard
                            </button>
                            <button
                                onClick={() => setGameMode('time-attack')}
                                className={`btn ${gameMode === 'time-attack' ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ flex: 1, padding: '0.5rem' }}
                            >
                                Tidspress
                            </button>
                            <button
                                onClick={() => setGameMode('map-quiz')}
                                className={`btn ${gameMode === 'map-quiz' ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ flex: 1, padding: '0.5rem' }}
                            >
                                Kartquiz
                            </button>
                        </div>
                    </div>

                    {gameMode === 'standard' || gameMode === 'map-quiz' ? (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Antal frågor:</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {[5, 10, 15, 20].map(count => (
                                    <button
                                        key={count}
                                        onClick={() => setQuestionCount(count)}
                                        className={`btn ${questionCount === count ? 'btn-primary' : 'btn-secondary'}`}
                                        style={{ flex: 1, padding: '0.5rem' }}
                                    >
                                        {count}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Tid:</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => setTimeLimit(30)}
                                    className={`btn ${timeLimit === 30 ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ flex: 1, padding: '0.5rem' }}
                                >
                                    30 sek
                                </button>
                                <button
                                    onClick={() => setTimeLimit(60)}
                                    className={`btn ${timeLimit === 60 ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ flex: 1, padding: '0.5rem' }}
                                >
                                    1 min
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <h2 className="title">Välj Kategori</h2>
                <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                    {gameMode === 'map-quiz' ? (
                        <button onClick={() => startGame('map')} className="btn btn-primary">Starta Kartquiz</button>
                    ) : (
                        <>
                            <button onClick={() => startGame('sweden')} className="btn btn-primary">Sverige Runt</button>
                            <button onClick={() => startGame('countries')} className="btn btn-secondary">Världens Länder</button>
                            <button onClick={() => startGame('capitals')} className="btn btn-primary">Huvudstäder</button>
                            <button onClick={() => startGame('mix')} className="btn btn-secondary">Blandat</button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    if (gameState === 'result') {
        return (
            <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
                <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Bra jobbat!</h2>
                    <p style={{ fontSize: '1.5rem' }}>
                        Du fick {score} {gameMode === 'standard' || gameMode === 'map-quiz' ? `av ${questions.length}` : 'poäng'} rätt.
                    </p>
                    <p style={{ fontSize: '1.2rem', color: 'var(--success)', margin: '1rem 0' }}>+{score * 10} XP</p>
                    <button onClick={() => setGameState('menu')} className="btn btn-primary">Spela Igen</button>
                    <br /><br />
                    <button onClick={onBack} className="btn">Tillbaka till menyn</button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="container" style={{ paddingTop: '2rem', maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem' }}>
                {gameMode === 'standard' || gameMode === 'map-quiz' ? (
                    <span>Fråga {currentIndex + 1} av {questions.length}</span>
                ) : (
                    <span style={{ color: timeLeft < 10 ? 'var(--error)' : 'inherit', fontWeight: 'bold' }}>Tid: {timeLeft}s</span>
                )}
                <span>Poäng: {score}</span>
            </div>

            <div className="card">
                <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>{currentQuestion.question}</h2>

                {currentQuestion.type === 'map' && (
                    <div style={{ marginBottom: '2rem' }}>
                        <MapComponent highlightedISO={currentQuestion.iso} />
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    {currentQuestion.options.map((opt, idx) => {
                        let style = {};
                        if (showFeedback) {
                            if (opt === currentQuestion.answer) style = { backgroundColor: 'var(--success)', color: 'white' };
                            else if (opt === selectedAnswer) style = { backgroundColor: 'var(--error)', color: 'white' };
                            else style = { opacity: 0.5 };
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(opt)}
                                className="btn btn-secondary" // Default style
                                style={{ ...style, height: '80px', fontSize: '1.1rem' }}
                                disabled={showFeedback}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>

                {showFeedback && (
                    <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s' }}>
                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            borderLeft: '4px solid var(--primary)'
                        }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Visste du att?</h3>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>{currentQuestion.fact}</p>
                        </div>
                        <button onClick={nextQuestion} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '0.8rem 2rem' }}>
                            {currentIndex < questions.length - 1 ? 'Nästa Fråga →' : 'Se Resultat →'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;
