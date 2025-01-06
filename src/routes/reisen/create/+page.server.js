// Importiere benötigte Module
import { createReise, getPersonen } from '$lib/db.js';  // Funktion zum Erstellen einer Reise in der Datenbank

// Load function to fetch all available persons
export async function load() {
  try {
    const personen = await getPersonen();
    return { personen };
  } catch (error) {
    console.error("Error loading personen:", error);
    return {
      status: 500,
      error: new Error("Interner Serverfehler"),
    };
  }
}

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
        image: image, // Pass the entire File object
        teilnehmer_ids: data.getAll('teilnehmer_ids') // Add teilnehmer_ids
      };

      await createReise(reise);
      return { success: true };
    } catch (error) {
      console.error('Error creating reise:', error);
      return { success: false, error: error.message };
    }
  }
};