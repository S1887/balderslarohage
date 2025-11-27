import React, { useState } from 'react';

const ModeSelection = ({ mode, onStart, onBack }) => {
    const [selectedValue, setSelectedValue] = useState(mode === 'fixed' ? 50 : 60);

    const fixedOptions = [10, 20, 30, 40, 50];
    const timedOptions = [
        { value: 30, label: '30 sekunder', icon: '⚡', subtitle: 'Blixten!' },
        { value: 60, label: '1 minut', icon: '🔥', subtitle: 'Intensivt!' },
        { value: 120, label: '2 minuter', icon: '💪', subtitle: 'Maratonen!' }
    ];

    return (
        <div className="container" style={{ paddingTop: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                <h1 style={{ color: '#4A90E2', marginBottom: '1.5rem' }}>Välj ditt spelläge</h1>
            </div>

            {/* Mode Toggle */}
            <div style={{
                display: 'flex',
                background: '#f0f0f0',
                borderRadius: '0.5rem',
                padding: '0.25rem',
                marginBottom: '2rem',
                maxWidth: '500px',
                margin: '0 auto 2rem auto'
            }}>
                <button
                    onClick={() => { }}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: 'none',
                        borderRadius: '0.4rem',
                        background: mode === 'fixed' ? 'white' : 'transparent',
                        color: mode === 'fixed' ? '#4A90E2' : '#666',
                        fontWeight: mode === 'fixed' ? 'bold' : 'normal',
                        cursor: 'default',
                        transition: 'all 0.2s',
                        boxShadow: mode === 'fixed' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    📝 Fast antal
                </button>
                <button
                    onClick={() => { }}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: 'none',
                        borderRadius: '0.4rem',
                        background: mode === 'timed' ? 'white' : 'transparent',
                        color: mode === 'timed' ? '#4A90E2' : '#666',
                        fontWeight: mode === 'timed' ? 'bold' : 'normal',
                        cursor: 'default',
                        transition: 'all 0.2s',
                        boxShadow: mode === 'timed' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    ⏱️ Tidsutmaningen
                </button>
            </div>

            {/* Description */}
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
                {mode === 'fixed'
                    ? 'Välj antal frågor, klockan räknar uppåt'
                    : 'Välj tid, klockan räknar nedåt och du svarar på så många som möjligt'
                }
            </p>

            {/* Options */}
            {mode === 'fixed' ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap'
                }}>
                    {fixedOptions.map(num => (
                        <button
                            key={num}
                            onClick={() => setSelectedValue(num)}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '0.5rem',
                                border: selectedValue === num ? '3px solid #4A90E2' : '2px solid #ddd',
                                background: selectedValue === num ? '#FFA500' : 'white',
                                color: selectedValue === num ? 'white' : '#333',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: selectedValue === num ? '0 4px 8px rgba(255,165,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedValue !== num) {
                                    e.currentTarget.style.borderColor = '#4A90E2';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedValue !== num) {
                                    e.currentTarget.style.borderColor = '#ddd';
                                }
                            }}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginBottom: '2rem',
                    maxWidth: '500px',
                    margin: '0 auto 2rem auto'
                }}>
                    {timedOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => setSelectedValue(option.value)}
                            style={{
                                padding: '1.5rem',
                                borderRadius: '0.75rem',
                                border: selectedValue === option.value ? '3px solid #4A90E2' : '2px solid #ddd',
                                background: selectedValue === option.value ? '#FFA500' : 'white',
                                color: selectedValue === option.value ? 'white' : '#333',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: selectedValue === option.value ? '0 4px 8px rgba(255,165,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedValue !== option.value) {
                                    e.currentTarget.style.borderColor = '#4A90E2';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedValue !== option.value) {
                                    e.currentTarget.style.borderColor = '#ddd';
                                }
                            }}
                        >
                            <div style={{ fontSize: '2rem' }}>{option.icon}</div>
                            <div style={{ flex: 1, textAlign: 'left' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                    {option.label}
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    opacity: 0.9,
                                    color: selectedValue === option.value ? 'white' : '#666'
                                }}>
                                    {option.subtitle}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Action Buttons */}
            <div style={{
                background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
                padding: '1.5rem',
                borderRadius: '1rem',
                marginBottom: '1rem'
            }}>
                <button
                    onClick={() => onStart(selectedValue)}
                    className="btn"
                    style={{
                        width: '100%',
                        background: 'white',
                        color: '#4A90E2',
                        fontSize: '1.2rem',
                        padding: '1rem',
                        fontWeight: 'bold',
                        border: 'none'
                    }}
                >
                    Starta spelet! 🚀
                </button>
            </div>

            <button
                onClick={onBack}
                className="btn"
                style={{
                    width: '100%',
                    background: 'white',
                    color: '#333',
                    border: '2px solid #ddd'
                }}
            >
                Tillbaka
            </button>
        </div>
    );
};

export default ModeSelection;
