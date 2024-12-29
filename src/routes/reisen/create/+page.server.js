// Importiere benötigte Module
import { createReise } from '$lib/db.js';  // Funktion zum Erstellen einer Reise in der Datenbank
import fs from 'fs';                       // Für Dateisystem-Operationen
import path from 'path';                   // Für Pfad-Operationen
import { v4 as uuidv4 } from 'uuid';      // Generiert eindeutige IDs

export const actions = {
  // Server-Action zum Erstellen einer neuen Reise
  create: async ({ request }) => {
    try {
      // Hole die Formulardaten vom Request
      const data = await request.formData();
      const image = data.get('image');

      // Wenn ein Bild hochgeladen wurde
      if (image && image.size > 0) {
        // Generiere einen eindeutigen Dateinamen mit UUID
        const imageName = `${uuidv4()}-${image.name}`;
        const imagePath = path.join('static/images', imageName);

        // Konvertiere das Bild in einen Buffer und speichere es
        const buffer = Buffer.from(await image.arrayBuffer());
        fs.writeFileSync(imagePath, buffer);

        // Erstelle das Reise-Objekt mit allen Formulardaten
        let reise = {
          title: data.get('title'),           // Titel der Reise
          destination: data.get('destination'),// Reiseziel
          start_date: data.get('start_date'), // Startdatum
          end_date: data.get('end_date'),     // Enddatum
          budget: parseFloat(data.get('budget')), // Budget als Nummer
          description: data.get('description'),   // Beschreibung
          image: `/images/${imageName}`          // Pfad zum gespeicherten Bild
        };

        console.log('Reise to be added:', reise);

        // Speichere die Reise in der Datenbank
        await createReise(reise);

        // Rückmeldung
        return { success: true };
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error creating reise:', error);
      return {
        status: 500,
        error: 'Interner Serverfehler',
      };
    }
  },
};