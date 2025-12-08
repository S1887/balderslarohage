import React from 'react';
import { useGame } from '../context/GameContext';

const MathDashboard = ({ onStartGame, onNavigate, bestScores }) => {
    const { user } = useGame();

    return (
        <div className="container" style={{ paddingTop: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>➗</div>
                <h1 style={{ color: '#4A90E2', marginBottom: '0.5rem' }}>Hej, {user.username}!</h1>
                <p style={{ color: '#666', fontSize: '1.2rem' }}>Din nivå: <strong style={{ color: '#4A90E2' }}>{user.level}</strong></p>
                <div style={{ fontSize: '1.5rem', marginTop: '0.5rem', fontWeight: 'bold', color: '#666' }}>Matteutmaningen</div>
            </div>

            {/* Best Scores */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {/* Fixed Mode Best Score */}
                <div className="card" style={{ background: '#f0f7ff', border: '2px solid #e0eeff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>📝</span>
                        <h3 style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Bäst (Antal-läge)</h3>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4A90E2', marginBottom: '0.5rem' }}>
                        {bestScores?.fixed?.score || 0} poäng
                    </div>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>
                        {bestScores?.fixed?.questions || 50} frågor på {bestScores?.fixed?.time || '0:00'}
                    </p>
                </div>

                {/* Timed Mode Best Score */}
                <div className="card" style={{ background: '#fff5f0', border: '2px solid #ffe5d9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>⏱️</span>
                        <h3 style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Bäst (Tids-läge)</h3>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4A90E2', marginBottom: '0.5rem' }}>
                        {bestScores?.timed?.score || 0} poäng
                    </div>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>
                        {bestScores?.timed?.time || '30'} sekunder
                    </p>
                </div>
            </div>

            {/* Game Modes Section */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ textAlign: 'center', color: '#4A90E2', marginBottom: '1.5rem' }}>Spellägen</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {/* Fixed Number Mode */}
                    <div
                        className="card"
                        onClick={() => onStartGame('mode-selection-fixed')}
                        style={{
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            background: 'white'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
                        <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Fast antal</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>
                            Välj antal frågor, klockan räknar uppåt
                        </p>
                    </div>

                    {/* Timed Mode */}
                    <div
                        className="card"
                        onClick={() => onStartGame('mode-selection-timed')}
                        style={{
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            background: 'white'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏱️</div>
                        <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Tidsutmaningen</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>
                            Välj tid, klockan räknar nedåt och du svarar på så många som möjligt
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // Different color for Math
                padding: '1.5rem',
                borderRadius: '1rem',
                marginBottom: '1.5rem'
            }}>
                <button
                    onClick={() => onStartGame('quick-start')}
                    className="btn"
                    style={{
                        width: '100%',
                        background: 'white',
                        color: '#11998e',
                        fontSize: '1.2rem',
                        padding: '1rem',
                        fontWeight: 'bold',
                        border: 'none'
                    }}
                >
                    Starta spelet! 🚀
                </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => onNavigate('quick-start')}
                    className="btn"
                    style={{ flex: 1, minWidth: '150px', background: 'white', color: '#333', border: '2px solid #ddd' }}
                >
                    Snabbstart
                </button>
                <button
                    onClick={() => onNavigate('highscores')}
                    className="btn"
                    style={{ flex: 1, minWidth: '150px', background: 'white', color: '#333', border: '2px solid #ddd' }}
                >
                    Highscores 🏆
                </button>
                <button
                    onClick={() => onNavigate('game-selector')}
                    className="btn"
                    style={{ flex: 1, minWidth: '150px', background: 'white', color: '#333', border: '2px solid #ddd' }}
                >
                    Byt Spel
                </button>
            </div>
        </div>
    );
};

export default MathDashboard;
