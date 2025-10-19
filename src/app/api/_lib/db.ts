import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { articles: [], services: [] };
  }
}

export function writeDb(data: unknown) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}
