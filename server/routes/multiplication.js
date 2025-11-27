import express from 'express';
import { multiplicationScoresDb } from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Save multiplication game score
router.post('/score', authenticateToken, async (req, res) => {
    try {
        const { username, mode, score, time, questions } = req.body;

        const scoreData = {
            username,
            mode, // 'fixed' or 'timed'
            score,
            time,
            questions,
            timestamp: new Date()
        };

        await multiplicationScoresDb.insert(scoreData);
        res.json({ message: 'Score saved', data: scoreData });
    } catch (error) {
        console.error('Error saving multiplication score:', error);
        res.status(500).json({ message: 'Failed to save score' });
    }
});

// Get highscores for multiplication game
router.get('/highscores', async (req, res) => {
    try {
        const { mode } = req.query;

        let query = {};
        if (mode) {
            query.mode = mode;
        }

        const scores = await multiplicationScoresDb.find(query)
            .sort({ score: -1, time: 1 })
            .limit(10);

        res.json(scores);
    } catch (error) {
        console.error('Error fetching multiplication highscores:', error);
        res.status(500).json({ message: 'Failed to fetch highscores' });
    }
});

// Get user's best scores
router.get('/best/:username', async (req, res) => {
    try {
        const { username } = req.params;

        const bestFixed = await multiplicationScoresDb.findOne({ username, mode: 'fixed' })
            .sort({ score: -1, time: 1 });

        const bestTimed = await multiplicationScoresDb.findOne({ username, mode: 'timed' })
            .sort({ score: -1 });

        res.json({
            fixed: bestFixed || null,
            timed: bestTimed || null
        });
    } catch (error) {
        console.error('Error fetching best scores:', error);
        res.status(500).json({ message: 'Failed to fetch best scores' });
    }
});

export default router;
