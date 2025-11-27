import Datastore from 'nedb-promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../data');

// MongoDB Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    pinHash: String,
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [String],
    completedQuizzes: { type: Number, default: 0 },
    multiplicationBestFixed: {
        score: Number,
        time: String,
        questions: Number
    },
    multiplicationBestTimed: {
        score: Number,
        time: String
    }
});

const highscoreSchema = new mongoose.Schema({
    username: String,
    score: Number,
    gameMode: String, // 'standard', 'time-attack', 'map-quiz'
    xp: Number,
    level: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

const multiplicationScoreSchema = new mongoose.Schema({
    username: String,
    mode: String, // 'fixed', 'timed'
    score: Number,
    time: String,
    questions: Number,
    timestamp: { type: Date, default: Date.now }
});

let usersDb, highscoresDb, multiplicationScoresDb;

// Wrapper to make Mongoose behave like NeDB for simple queries
const createMongooseWrapper = (Model) => ({
    find: (query) => Model.find(query),
    findOne: (query) => Model.findOne(query),
    insert: (doc) => Model.create(doc),
    update: (query, update, options) => {
        // Handle NeDB style $set if needed, though Mongoose supports it
        // NeDB update returns numAffected, Mongoose updateOne returns result object
        return Model.updateOne(query, update);
    },
    ensureIndex: () => { } // Mongoose handles this in schema
});

if (process.env.MONGODB_URI) {
    console.log('Connecting to MongoDB...');
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));

    const User = mongoose.model('User', userSchema);
    const Highscore = mongoose.model('Highscore', highscoreSchema);
    const MultiplicationScore = mongoose.model('MultiplicationScore', multiplicationScoreSchema);

    usersDb = createMongooseWrapper(User);
    highscoresDb = createMongooseWrapper(Highscore);
    multiplicationScoresDb = createMongooseWrapper(MultiplicationScore);
} else {
    console.log('Using local NeDB (file-based)...');
    usersDb = Datastore.create({ filename: path.join(dataDir, 'users.db'), autoload: true });
    highscoresDb = Datastore.create({ filename: path.join(dataDir, 'highscores.db'), autoload: true });
    multiplicationScoresDb = Datastore.create({ filename: path.join(dataDir, 'multiplication-scores.db'), autoload: true });

    // Ensure unique username
    usersDb.ensureIndex({ fieldName: 'username', unique: true });
}

export { usersDb, highscoresDb, multiplicationScoresDb };

