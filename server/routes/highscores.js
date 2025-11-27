import express from 'express';
import { highscoresDb } from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { gameMode } = req.query;
        const query = gameMode ? { gameMode } : {};
        const scores = await highscoresDb.find(query).sort({ score: -1 }).limit(10);
        res.json(scores);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch highscores' });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { username, score, gameMode, xp, level } = req.body;

        // Check if user already has a score for this game mode
        const existingScore = await highscoresDb.findOne({ username, gameMode });

        if (existingScore) {
            // Update if new score is higher
            if (score > existingScore.score) {
                await highscoresDb.update(
                    { username, gameMode },
                    { $set: { score, xp, level, updatedAt: new Date() } }
                );
            }
        } else {
            // Insert new score
            await highscoresDb.insert({
                username,
                score,
                gameMode,
                xp,
                level,
                createdAt: new Date()
            });
        }

        res.json({ message: 'Highscore saved' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save highscore' });
    }
});

export default router;
