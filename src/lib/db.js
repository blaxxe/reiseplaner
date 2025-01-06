//import von MongoDB und env Variablen
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

//Laden der Variablen
dotenv.config();

let db;

//Verbindung zur Datenbank
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

//erstellen einer Reise
export async function createReise(reise) {
  const database = await connectToDatabase();
  const reisenCollection = database.collection('reisen');
  const personenCollection = database.collection('personen');
  
  try {
    //Bild als Base64 String
    if (reise.image) {
      reise.imageType = reise.image.type;
      const arrayBuffer = await reise.image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      reise.image = buffer.toString('base64');
    }

    //fügt Reise in die Datenbank ein
    const result = await reisenCollection.insertOne(reise);

    //ID der Reise als String
    const reiseId = result.insertedId.toString();

    //Reise den Teilnehmern hinzufügen
    if (reise.teilnehmer_ids && reise.teilnehmer_ids.length > 0) {
      await Promise.all(reise.teilnehmer_ids.map(async (personId) => {
        await personenCollection.updateOne(
          { _id: new ObjectId(personId) }, //Findet die Person
          { $addToSet: { reise_ids: reiseId } } //Fügt die Reise hinzu
        );
      }));
    }

    console.log(`Reise erstellt (ID: ${reiseId}).`);
    return result;
  } catch (error) {
    console.error('Fehler beim Erstellen der Reise:', error);
    throw error;
  }
}

//alle Reisen abrufen
export async function getReisen() {
  const database = await connectToDatabase();
  const collection = database.collection('reisen');
  try {
    const reisen = await collection.find({}).toArray();
    return reisen.map((r) => ({
      ...r, // Alle bestehenden Eigenschaften kopieren
      _id: r._id.toString(), // ID in String umwandeln

      // Bild-URL erstellen für Base64
      image: r.image && r.imageType ? `data:${r.imageType};base64,${r.image}` : r.image
    }));
  } catch (error) {
    console.error('Fehler beim Abrufen der Reisen:', error);
    throw error;
  }
}

//einzelne Reise per id abrufen
export async function getReise(id) {
  const database = await connectToDatabase();
  const reisenCollection = database.collection('reisen');
  const personenCollection = database.collection('personen');

  //Reise abrufen
  try {
    const reise = await reisenCollection.findOne({ _id: new ObjectId(id) });
    if (reise) {
      reise._id = reise._id.toString();
      
      // Base64 String in Bild umwandeln
      if (reise.image && reise.imageType) {
        reise.image = `data:${reise.imageType};base64,${reise.image}`;
      }

      //Teilnehmer der Reise abrufen
      if (reise.teilnehmer_ids && reise.teilnehmer_ids.length > 0) {
        reise.teilnehmer = await personenCollection
          .find({ _id: { $in: reise.teilnehmer_ids.map(id => new ObjectId(id)) } })
          .toArray();
        
        reise.teilnehmer = reise.teilnehmer.map(person => ({
          ...person,
          _id: person._id.toString() //id als String
        }));
      }
    }
    return reise;
  } catch (error) {
    console.error(`Fehler bei Reise ${id}:`, error);
    throw error;
  }
}

//Reise löschen
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

//Person erstellen
export async function createPerson(person) {
  const database = await connectToDatabase();
  const collection = database.collection('personen');
  try {
    //Bild als Base64 String
    if (person.image instanceof File) {
      const imageType = person.image.type;
      const arrayBuffer = await person.image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      person.image = `data:${imageType};base64,${buffer.toString('base64')}`;
    }
  //Person in die Datenbank einfügen
    const result = await collection.insertOne(person);
    console.log(`Person erstellt (ID: ${result.insertedId}).`);
    return result;
  } catch (error) {
    console.error('Fehler beim Erstellen der Person:', error);
    throw error;
  }
}

//alle Personen abrufen
export async function getPersonen() {
  const database = await connectToDatabase();
  const collection = database.collection('personen');
  try {
    const personen = await collection.find({}).toArray(); //Personen als Array
    for (const person of personen) {
      person._id = person._id.toString();
      person.reisen = [];
      //Reisen der Person abrufen
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

//einzelne Person per id abrufen
export async function getPerson(id) {
  const database = await connectToDatabase();
  const collection = database.collection('personen');
  try {
    const person = await collection.findOne({ _id: new ObjectId(id) });
    if (person) {
      person._id = person._id.toString();

      // Base64 String in Bild umwandeln
      if (person.image && person.imageType) {
        person.image = `data:${person.imageType};base64,${person.image}`;
      }

      //Reisen der Person abrufen
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

//Personen einer Reise abrufen
export async function getPersonenByReiseId(reise_id) {
  const database = await connectToDatabase();
  const collection = database.collection('personen');
  try {
    //Personen die Reise-ID in ihrem reise_ids Array haben
    const personen = await collection.find({ reise_ids: reise_id }).toArray();
    return personen.map((p) => ({ ...p, _id: p._id.toString() }));
  } catch (error) {
    console.error(`Fehler bei Personen von Reise ${reise_id}:`, error);
    throw error;
  }
}

//Person löschen
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