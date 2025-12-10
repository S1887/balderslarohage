import React from 'react';
import { useGame } from '../context/GameContext';

const GameSelector = ({ onNavigate }) => {
    const { user, logout } = useGame();

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Välkommen, {user.username}! 🎓</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Nivå {user.level} • {user.xp} XP</p>
                </div>
                <button onClick={logout} className="btn" style={{ background: '#ddd' }}>Logga ut</button>
            </header>

            {/* <h2 style={{ textAlign: 'center', color: 'var(--primary-dark)', marginBottom: '2rem' }}>Välj ditt spel</h2> */
/* Commenting out header to let the cards speak for themselves, or could rename to "Mina Spel" */}
            <h2 style={{ textAlign: 'center', color: 'var(--primary-dark)', marginBottom: '2rem' }}>Välj aktivitet</h2>

            {/* Matteutmaningen Main Card */}
            <div
                className="game-card"
                onClick={() => onNavigate('math-selection')}
                style={{
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    color: 'white',
                    padding: '2rem',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
            >
                <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>🧮</div>
                <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '1rem' }}>Matteutmaningen</h3>
                <p style={{ textAlign: 'center', opacity: 0.9 }}>
                    Träna multiplikation, plus och minus!
                </p>
            </div>

            {/* Geography Quest Card */}
            <div
                className="game-card"
                onClick={() => onNavigate('geography-game')}
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '2rem',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
            >
                <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>🌍</div>
                <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '1rem' }}>Geografijakten</h3>
                <p style={{ textAlign: 'center', opacity: 0.9 }}>
                    Utforska världen!
                </p>
            </div>

            {/* Quick Links */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => onNavigate('profile')}
                    className="btn btn-secondary"
                    style={{ minWidth: '150px' }}
                >
                    👤 Min Profil
                </button>
                <button
                    onClick={() => onNavigate('highscores')}
                    className="btn btn-secondary"
                    style={{ minWidth: '150px' }}
                >
                    🏆 Topplista
                </button>
            </div>
        </div>
    );
};

export default GameSelector;
