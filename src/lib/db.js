import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db;

export async function connectToDatabase() {
  if (!db) {
    try {
      console.log('Connecting to database with URI:', process.env.DB_URI); // Log the DB URI
      const client = new MongoClient(process.env.DB_URI);
      await client.connect();
      db = client.db('reiseplaner');
      console.log('Database connection established');
    } catch (error) {
      console.error('Error connecting to database:', error.message);
      console.error('Stack Trace:', error.stack);
      throw error;
    }
  }
  return db;
}

// Holen aller Reisen
export async function getReisen() {
  await connectToDatabase(); // Ensure the database connection is established
  const collection = db.collection('reisen');
  return await collection.find({}).toArray();
}

// Holen einer einzelnen Reise basierend auf ihrer ID
export async function getReise(id) {
  try {
    await connectToDatabase(); // Ensure the database connection is established
    console.log('Fetching reise with ID:', id); // Log the reise ID
    const collection = db.collection('reisen');
    const reise = await collection.findOne({ _id: new ObjectId(id) });

    if (reise) {
      reise._id = reise._id.toString(); // ObjectId in String umwandeln
    }

    console.log('Fetched reise:', reise); // Log the fetched reise
    return reise;
  } catch (error) {
    console.error('Error fetching reise:', error.message);
    console.error('Stack Trace:', error.stack);
    throw error;
  }
}

// Erstellen einer neuen Reise
export async function createReise(reise) {
  try {
    await connectToDatabase(); // Ensure the database connection is established
    const collection = db.collection('reisen');
    const result = await collection.insertOne(reise);
    console.log('Inserted reise:', result);
    return result;
  } catch (error) {
    console.error('Error inserting reise:', error);
    throw error;
  }
}

// Löschen einer Reise
export async function deleteReise(id) {
  try {
    await connectToDatabase(); // Ensure the database connection is established
    const collection = db.collection('reisen');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log('Deleted reise:', result);
    return result;
  } catch (error) {
    console.error('Error deleting reise:', error);
    throw error;
  }
}