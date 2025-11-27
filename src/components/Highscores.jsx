import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { getMultiplicationHighscores } from '../api/client';

const Highscores = ({ onBack }) => {
    const [selectedMode, setSelectedMode] = useState('total-xp');
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetchHighscores(selectedMode);
    }, [selectedMode]);

    const fetchHighscores = async (gameMode) => {
        try {
            let data = [];
            if (gameMode === 'total-xp') {
                const response = await fetch('http://localhost:5000/api/users/leaderboard');
                data = await response.json();
            } else if (gameMode === 'multiplication-fixed') {
                data = await getMultiplicationHighscores('fixed');
            } else if (gameMode === 'multiplication-timed') {
                data = await getMultiplicationHighscores('timed');
            } else {
                // Legacy support or other modes
                const response = await fetch(`http://localhost:5000/api/highscores?gameMode=${gameMode}`);
                data = await response.json();
            }
            setScores(data);
        } catch (error) {
            console.error('Failed to fetch highscores:', error);
        }
    };

    const modes = [
        { id: 'total-xp', label: 'Total XP' },
        { id: 'multiplication-fixed', label: 'Multiplikation (Antal)' },
        { id: 'multiplication-timed', label: 'Multiplikation (Tid)' },
        { id: 'standard', label: 'Geografi' }
    ];

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <button onClick={onBack} className="btn" style={{ marginBottom: '1rem' }}>← Tillbaka</button>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 className="title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Topplista</h2>

                {/* Game Mode Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #eee', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {modes.map(mode => (
                        <button
                            key={mode.id}
                            onClick={() => setSelectedMode(mode.id)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: selectedMode === mode.id ? 'var(--primary)' : 'transparent',
                                color: selectedMode === mode.id ? 'white' : 'inherit',
                                border: 'none',
                                borderBottom: selectedMode === mode.id ? '3px solid var(--primary)' : '3px solid transparent',
                                cursor: 'pointer',
                                fontWeight: selectedMode === mode.id ? 'bold' : 'normal',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap',
                                borderRadius: '0.5rem 0.5rem 0 0'
                            }}
                        >
                            {mode.label}
                        </button>
                    ))}
                </div>

                {scores.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>Inga resultat än. Bli den första!</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--background)' }}>
                                <th style={{ textAlign: 'left', padding: '1rem' }}>#</th>
                                <th style={{ textAlign: 'left', padding: '1rem' }}>Namn</th>
                                {selectedMode === 'total-xp' ? (
                                    <>
                                        <th style={{ textAlign: 'right', padding: '1rem' }}>XP</th>
                                        <th style={{ textAlign: 'right', padding: '1rem' }}>Nivå</th>
                                    </>
                                ) : selectedMode.startsWith('multiplication') ? (
                                    <>
                                        <th style={{ textAlign: 'right', padding: '1rem' }}>Poäng</th>
                                        <th style={{ textAlign: 'right', padding: '1rem' }}>Tid</th>
                                        <th style={{ textAlign: 'right', padding: '1rem' }}>Datum</th>
                                    </>
                                ) : (
                                    <>
                                        <th style={{ textAlign: 'right', padding: '1rem' }}>Poäng</th>
                                        <th style={{ textAlign: 'right', padding: '1rem' }}>Nivå</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((score, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{idx + 1}</td>
                                    <td style={{ padding: '1rem' }}>{score.username || score.name}</td>
                                    {selectedMode === 'total-xp' ? (
                                        <>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>{score.xp || 0}</td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>{score.level}</td>
                                        </>
                                    ) : selectedMode.startsWith('multiplication') ? (
                                        <>
                                            <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>{score.score}</td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>{score.time}</td>
                                            <td style={{ padding: '1rem', textAlign: 'right', fontSize: '0.9rem', color: '#666' }}>
                                                {new Date(score.timestamp).toLocaleDateString()}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>{score.score || '-'}</td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>{score.level}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Highscores;

