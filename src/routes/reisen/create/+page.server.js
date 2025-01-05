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

      // Create reise object with image file
      const reise = {
        title: data.get('title'),
        destination: data.get('destination'),
        start_date: data.get('start_date'),
        end_date: data.get('end_date'),
        budget: parseFloat(data.get('budget')),
        description: data.get('description'),
        image: image // Pass the entire File object
      };

      await createReise(reise);
      return { success: true };
    } catch (error) {
      console.error('Error creating reise:', error);
      return { success: false, error: error.message };
    }
  }
};