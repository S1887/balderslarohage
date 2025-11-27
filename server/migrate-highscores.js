// Migration script to clear old highscores data
import Datastore from 'nedb-promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../data');

const highscoresDb = Datastore.create({ filename: path.join(dataDir, 'highscores.db'), autoload: true });

async function migrate() {
    console.log('Clearing old highscores data...');
    await highscoresDb.remove({}, { multi: true });
    console.log('Migration complete! Old highscores cleared.');
    console.log('New highscores will be saved with the correct format (score, gameMode, etc.)');
    process.exit(0);
}

migrate().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
