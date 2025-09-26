// src/app/lib/db.ts
import { Db, MongoClient } from 'mongodb';

// URL della tua connessione a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:adminpassword@localhost:27017/'; // Usa la tua stringa di connessione MongoDB
const DB_NAME = process.env.DB_NAME || 'task-flow'; // Nome del database

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase() {
  // Usa la cache per evitare di creare una nuova connessione ad ogni richiesta
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGO_URI);

  // Connetti a MongoDB
  await client.connect();

  const db = client.db(DB_NAME);

  // Salva nella cache
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default connectToDatabase;
