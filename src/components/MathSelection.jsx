import React from 'react';

const MathSelection = ({ onNavigate, onBack }) => {
    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <button
                    onClick={onBack}
                    className="btn"
                    style={{ background: '#ddd', marginRight: '1rem' }}
                >
                    ⬅ Tillbaka
                </button>
                <h1 style={{ color: 'var(--primary-dark)', margin: 0 }}>Matteutmaningen 🧮</h1>
            </header>

            <h2 style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>Vad vill du träna på idag?</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Multiplication Card */}
                <div
                    className="game-card"
                    onClick={() => onNavigate('multiplication-game')}
                    style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
                    <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>🎯</div>
                    <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '1rem' }}>Multiplikationstabellen</h3>
                    <p style={{ textAlign: 'center', opacity: 0.9 }}>
                        Träna multiplikation! Bli snabbare och säkrare med tabellerna.
                    </p>
                </div>

                {/* Plus & Minus Card */}
                <div
                    className="game-card"
                    onClick={() => onNavigate('math-game')}
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
                    <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>➕➖</div>
                    <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '1rem' }}>Plus & Minus</h3>
                    <p style={{ textAlign: 'center', opacity: 0.9 }}>
                        Träna plus och minus! Utmana dig själv och bli snabbare.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MathSelection;
