import express from 'express';
import { usersDb } from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get leaderboard (top players by XP)
router.get('/leaderboard', async (req, res) => {
    try {
        const users = await usersDb.find({}).sort({ xp: -1 }).limit(10);
        // Don't send sensitive data
        const leaderboard = users.map(u => ({
            username: u.username,
            xp: u.xp,
            level: u.level
        }));
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
});

// Sync user progress
router.post('/sync', authenticateToken, async (req, res) => {
    try {
        const userData = req.body;
        await usersDb.update(
            { username: userData.username },
            { $set: { xp: userData.xp, level: userData.level, badges: userData.badges, completedQuizzes: userData.completedQuizzes } }
        );
        res.json({ message: 'Progress synced' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to sync progress' });
    }
});

export default router;
