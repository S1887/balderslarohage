import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import highscoreRoutes from './routes/highscores.js';
import multiplicationRoutes from './routes/multiplication.js';
import mathRoutes from './routes/math.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/highscores', highscoreRoutes);
app.use('/api/multiplication', multiplicationRoutes);
app.use('/api/math', mathRoutes);

// Serve static files from the React app
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Assuming the build output is in ../dist (relative to server/server.js)
const distPath = path.join(__dirname, '../dist');

if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    console.log('No build found in ../dist. Running in API-only mode.');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
