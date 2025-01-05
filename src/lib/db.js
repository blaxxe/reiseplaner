import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Gemeinsam genutzte Variable für die DB-Verbindung.
let db;

/**
 * Verbindet sich mit der Datenbank oder nutzt eine vorhandene Verbindung.
 */
export async function connectToDatabase() {
  if (!db) {
    const client = new MongoClient(process.env.DB_URI);
    try {
      await client.connect();
      db = client.db(process.env.DB_NAME);
      console.log('Datenbank verbunden.');
    } catch (error) {
      console.error('Verbindungsfehler:', error);
      throw error;
    }
  }
  return db;
}

/**
 * Erstellt einen neuen Eintrag in der Sammlung "reisen".
 */
export async function createReise(reise) {
  const database = await connectToDatabase();
  const collection = database.collection('reisen');
  try {
    // Handle image as Base64 string
    if (reise.image) {
      reise.imageType = reise.image.type;
      const arrayBuffer = await reise.image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      reise.image = buffer.toString('base64');
    }

    const result = await collection.insertOne(reise);
    console.log(`Reise erstellt (ID: ${result.insertedId}).`);
    return result;
  } catch (error) {
    console.error('Fehler beim Erstellen der Reise:', error);
    throw error;
  }
}

/**
 * Lädt alle Personen und zieht für jede Person ihre zugeordneten Reisen heran.
 */
export async function getPersonen() {
  const database = await connectToDatabase();
  const collection = database.collection('personen');
  try {
    const personen = await collection.find({}).toArray();
    for (const person of personen) {
      person._id = person._id.toString();
      person.reisen = [];
      for (const id of person.reise_ids || []) {
        try {
          const reise = await database
            .collection('reisen')
            .findOne({ _id: new ObjectId(id) });
          if (reise) {
            reise._id = reise._id.toString();
            person.reisen.push(reise);
          }
        } catch (error) {
          console.error(`Fehler beim Abrufen von Reise ${id}:`, error);
        }
      }
    }
    return personen;
  } catch (error) {
    console.error('Fehler beim Abrufen der Personen:', error);
    throw error;
  }
}

/**
 * Erstellt eine neue Person in der Sammlung "personen".
 */
export async function createPerson(person) {
  const database = await connectToDatabase();
  const collection = database.collection('personen');
  try {
    const result = await collection.insertOne(person);
    console.log(`Person erstellt (ID: ${result.insertedId}).`);
    return result;
  } catch (error) {
    console.error('Fehler beim Erstellen der Person:', error);
    throw error;
  }
}

/**
 * Lädt eine Person anhand ihrer ID und ruft deren zugeordnete Reisen ab.
 */
export async function getPerson(id) {
  const database = await connectToDatabase();
  const collection = database.collection('personen');
  try {
    const person = await collection.findOne({ _id: new ObjectId(id) });
    if (person) {
      person._id = person._id.toString();
      person.reisen = [];
      for (const reiseId of person.reise_ids || []) {
        try {
          const reise = await getReise(reiseId);
          if (reise) person.reisen.push(reise);
        } catch (error) {
          console.error(`Fehler beim Abrufen der Reise ${reiseId}:`, error);
        }
      }
    }
    return person;
  } catch (error) {
    console.error(`Fehler bei Person ${id}:`, error);
    throw error;
  }
}

/**
 * Lädt eine bestimmte Reise anhand ihrer ID aus der Sammlung "reisen".
 */
export async function getReise(id) {
  const database = await connectToDatabase();
  const collection = database.collection('reisen');
  try {
    const reise = await collection.findOne({ _id: new ObjectId(id) });
    if (reise) {
      reise._id = reise._id.toString();
      // Create data URL from Base64 image
      if (reise.image && reise.imageType) {
        reise.image = `data:${reise.imageType};base64,${reise.image}`;
      }
    }
    return reise;
  } catch (error) {
    console.error(`Fehler bei Reise ${id}:`, error);
    throw error;
  }
}

/**
 * Lädt alle Reisen aus der Sammlung "reisen".
 */
export async function getReisen() {
  const database = await connectToDatabase();
  const collection = database.collection('reisen');
  try {
    const reisen = await collection.find({}).toArray();
    return reisen.map((r) => ({
      ...r,
      _id: r._id.toString(),
      // Convert Base64 to data URL if image exists
      image: r.image && r.imageType ? `data:${r.imageType};base64,${r.image}` : r.image
    }));
  } catch (error) {
    console.error('Fehler beim Abrufen der Reisen:', error);
    throw error;
  }
}

/**
 * Lädt alle Personen, die eine bestimmte Reise-ID enthalten.
 */
export async function getPersonenByReiseId(reise_id) {
  const database = await connectToDatabase();
  const collection = database.collection('personen');
  try {
    const personen = await collection.find({ reise_ids: reise_id }).toArray();
    return personen.map((p) => ({ ...p, _id: p._id.toString() }));
  } catch (error) {
    console.error(`Fehler bei Personen von Reise ${reise_id}:`, error);
    throw error;
  }
}

/**
 * Löscht eine bestimmte Reise aus der Sammlung "reisen" anhand ihrer ID.
 */
export async function deleteReise(id) {
  const database = await connectToDatabase();
  const collection = database.collection('reisen');
  try {
    await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(`Reise ${id} gelöscht.`);
  } catch (error) {
    console.error('Fehler beim Löschen der Reise:', error);
    throw error;
  }
}

/**
 * Löscht eine bestimmte Person aus der Sammlung "personen" anhand ihrer ID.
 */
export async function deletePerson(id) {
  const database = await connectToDatabase();
  const collection = database.collection('personen');
  try {
    await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(`Person ${id} gelöscht.`);
  } catch (error) {
    console.error('Fehler beim Löschen der Person:', error);
    throw error;
  }
}