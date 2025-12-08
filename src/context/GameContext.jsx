import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  loginUser,
  registerUser,
  syncProgress,
  getHighscores,
  saveMultiplicationScore,
  getMultiplicationBestScores,
  saveMathScore,
  getMathBestScores
} from '../api/client';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('gq_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Failed to parse user from local storage", e);
      localStorage.removeItem('gq_user');
      return null;
    }
  });

  const [highscores, setHighscores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('gq_user', JSON.stringify(user));
      // Sync with backend whenever user state changes (debounced in a real app, but direct here for simplicity)
      syncProgress(user).catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    // Initial fetch of highscores
    fetchHighscores();
    const interval = setInterval(fetchHighscores, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Fetch best scores for multiplication game when user logs in
  useEffect(() => {
    if (user?.username) {
      fetchMultiplicationBestScores();
      fetchMathBestScores();
    }
  }, [user?.username]);

  const fetchHighscores = async () => {
    try {
      const scores = await getHighscores();
      setHighscores(scores);
    } catch (err) {
      console.error('Failed to fetch highscores:', err);
    }
  };

  const fetchMultiplicationBestScores = async () => {
    if (!user) return;
    try {
      const bestScores = await getMultiplicationBestScores(user.username);
      setUser(prev => ({
        ...prev,
        multiplicationBestFixed: bestScores.fixed,
        multiplicationBestTimed: bestScores.timed
      }));
    } catch (err) {
      console.error('Failed to fetch best scores:', err);
    }
  };

  const fetchMathBestScores = async () => {
    if (!user) return;
    try {
      const bestScores = await getMathBestScores(user.username);
      setUser(prev => ({
        ...prev,
        mathBestFixed: bestScores.fixed,
        mathBestTimed: bestScores.timed
      }));
    } catch (err) {
      console.error('Failed to fetch math best scores:', err);
    }
  };

  const login = async (username, pin) => {
    try {
      setError(null);
      const data = await loginUser(username, pin);
      localStorage.setItem('gq_token', data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Inloggning misslyckades');
      return false;
    }
  };

  const register = async (username, pin) => {
    try {
      setError(null);
      const data = await registerUser(username, pin);
      localStorage.setItem('gq_token', data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registrering misslyckades');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gq_user');
    localStorage.removeItem('gq_token');
  };

  const addXP = (amount) => {
    if (!user) return;

    setUser(prev => {
      const newXP = prev.xp + amount;
      const nextLevelXP = prev.level * 100;

      let newLevel = prev.level;
      let newBadges = [...prev.badges];

      if (newXP >= nextLevelXP) {
        newLevel += 1;
        if (newLevel === 3) newBadges.push('Utforskare');
        if (newLevel === 5) newBadges.push('Mästare');
        if (newLevel === 10) newBadges.push('Geografiproffs');
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        badges: newBadges,
        completedQuizzes: prev.completedQuizzes + 1
      };
    });
  };

  const saveScore = async (mode, score, time, questions) => {
    if (!user) return;
    try {
      await saveMultiplicationScore(user.username, mode, score, time, questions);
      await fetchMultiplicationBestScores(); // Refresh best scores
    } catch (err) {
      console.error('Failed to save score:', err);
    }
  };

  const saveMathScoreFunc = async (mode, score, time, questions) => {
    if (!user) return;
    try {
      await saveMathScore(user.username, mode, score, time, questions);
      await fetchMathBestScores(); // Refresh best scores
    } catch (err) {
      console.error('Failed to save math score:', err);
    }
  };

  return (
    <GameContext.Provider value={{ user, login, register, logout, addXP, highscores, error, saveScore, saveMathScore: saveMathScoreFunc }}>
      {children}
    </GameContext.Provider>
  );
};

