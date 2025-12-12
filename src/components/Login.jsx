import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const Login = () => {
    const [name, setName] = useState('');
    const [pin, setPin] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const { login, register, error } = useGame();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || pin.length !== 4) return;

        if (isRegistering) {
            await register(name.trim(), pin);
        } else {
            await login(name.trim(), pin);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <h1 className="title" style={{ marginBottom: '0.5rem' }}>Balders självlärandehage</h1>
            <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '2rem', fontStyle: 'italic' }}>Utvecklad av Svante Örtendahl</p>
            <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h2>{isRegistering ? 'Skapa konto' : 'Logga in'}</h2>

                {error && <div style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                    {isRegistering && (
                        <p style={{ textAlign: 'left', marginBottom: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                            Använd ett gamingnamn (ej riktigt namn)
                        </p>
                    )}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isRegistering ? "Gamingnamn" : "Användarnamn"}
                        required
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.2rem',
                            borderRadius: '8px',
                            border: '2px solid #ddd',
                            marginBottom: '1rem'
                        }}
                    />
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="4-siffrig PIN"
                        required
                        maxLength={4}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.2rem',
                            borderRadius: '8px',
                            border: '2px solid #ddd',
                            marginBottom: '1rem',
                            letterSpacing: '0.5rem',
                            textAlign: 'center'
                        }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        {isRegistering ? 'Skapa konto' : 'Börja Spela'}
                    </button>
                </form>

                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', marginTop: '1rem', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    {isRegistering ? 'Har du redan ett konto? Logga in' : 'Inget konto? Skapa ett här'}
                </button>
            </div>
        </div>
    );
};

export default Login;
