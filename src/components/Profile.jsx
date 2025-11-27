import React from 'react';
import { useGame } from '../context/GameContext';

const Profile = ({ onBack }) => {
    const { user } = useGame();

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <button onClick={onBack} className="btn" style={{ marginBottom: '1rem' }}>← Tillbaka</button>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '100px', height: '100px', borderRadius: '50%',
                        background: 'var(--primary)', color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3rem', margin: '0 auto 1rem'
                    }}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h2>{user.name}</h2>
                    <p style={{ color: 'var(--text-light)' }}>Nivå {user.level} • {user.xp} XP</p>
                </div>

                <h3>Dina Utmärkelser</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                    {user.badges.length > 0 ? (
                        user.badges.map((badge, idx) => (
                            <div key={idx} style={{
                                background: 'var(--accent)', padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-full)', fontWeight: 'bold',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                🏆 {badge}
                            </div>
                        ))
                    ) : (
                        <p>Inga utmärkelser än. Spela mer för att låsa upp!</p>
                    )}
                </div>

                <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    <p><strong>Antal spelade quiz:</strong> {user.completedQuizzes}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
