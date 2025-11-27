import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usersDb } from '../utils/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, pin } = req.body;

        if (!username || !pin || pin.length !== 4) {
            return res.status(400).json({ message: 'Användarnamn och 4-siffrig PIN krävs.' });
        }

        const existingUser = await usersDb.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Användarnamnet är upptaget.' });
        }

        const pinHash = await bcrypt.hash(pin, 10);
        const newUser = {
            username,
            pinHash,
            xp: 0,
            level: 1,
            badges: ['Novis'],
            completedQuizzes: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const user = await usersDb.insert(newUser);
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);

        res.status(201).json({ token, user: { username: user.username, xp: user.xp, level: user.level, badges: user.badges } });
    } catch (error) {
        res.status(500).json({ message: 'Serverfel vid registrering.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, pin } = req.body;
        const user = await usersDb.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Fel användarnamn eller PIN.' });
        }

        const validPin = await bcrypt.compare(pin, user.pinHash);
        if (!validPin) {
            return res.status(400).json({ message: 'Fel användarnamn eller PIN.' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);
        res.json({ token, user: { username: user.username, xp: user.xp, level: user.level, badges: user.badges, completedQuizzes: user.completedQuizzes } });
    } catch (error) {
        res.status(500).json({ message: 'Serverfel vid inloggning.' });
    }
});

export default router;
