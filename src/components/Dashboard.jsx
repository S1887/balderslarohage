import React from 'react';
import { useGame } from '../context/GameContext';

const Dashboard = ({ onNavigate }) => {
    const { user, logout } = useGame();

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ color: 'var(--primary-dark)' }}>Hej, {user.username}!</h1>
                <button onClick={logout} className="btn" style={{ background: '#ddd' }}>Logga ut</button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3>Din Nivå</h3>
                    <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--secondary-dark)' }}>{user.level}</div>
                    <p>{user.xp} XP</p>
                    <button onClick={() => onNavigate('profile')} className="btn btn-secondary" style={{ marginTop: '1rem' }}>Se Profil</button>
                </div>

                <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3>Spela</h3>
                    <p style={{ margin: '1rem 0' }}>Utmana dig själv och lär dig mer!</p>
                    <button onClick={() => onNavigate('geography-game')} className="btn btn-primary">Starta Quiz</button>
                </div>

                <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3>Topplista</h3>
                    <p style={{ margin: '1rem 0' }}>Se hur du ligger till mot andra.</p>
                    <button onClick={() => onNavigate('highscores')} className="btn btn-secondary">Visa Topplista</button>
                    <button onClick={() => onNavigate('game-selector')} className="btn" style={{ marginTop: '1rem', background: 'transparent', border: '1px solid #ccc', color: '#666' }}>Byt Spel</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
