import { getPersonen, createPerson, deletePerson } from "$lib/db.js";

// Lade alle Personen aus der Datenbank
export async function load() {
  try {
    // Hole alle Personen
    const personen = await getPersonen();

    // Prüfe ob Personen gefunden wurden
    if (!personen) {
      return {
        status: 404,
        error: new Error("Keine Personen gefunden"),
      };
    }

    // Stelle sicher, dass reise_ids immer ein Array ist
    const serializablePersonen = personen.map(person => ({
      ...person,
      reise_ids: Array.isArray(person.reise_ids) ? person.reise_ids : []
    }));

    // Gib serialisierte Personen zurück
    return { personen: serializablePersonen };
  } catch (error) {
    // Fehlerbehandlung
    console.error("Fehler beim Laden der Personen:", error.message);
    return {
      status: 500,
      error: new Error("Interner Serverfehler"),
    };
  }
}

// Server-Actions für Personen-Verwaltung
export const actions = {
  // Action zum Erstellen einer neuen Person
  create: async ({ request }) => {
    try {
      const data = await request.formData();
      // Erstelle Person-Objekt aus Formulardaten
      const person = {
        name: data.get('name'),
        email: data.get('email'),
        reise_ids: []
      };

      // Speichere Person in Datenbank
      await createPerson(person);
      return { success: true };
    } catch (error) {
      console.error("Fehler beim Erstellen der Person:", error);
      return { success: false, error: error.message };
    }
  },

  // Action zum Löschen einer Person
  delete: async ({ request }) => {
    try {
      const data = await request.formData();
      const id = data.get('id');
      await deletePerson(id);
      return { success: true };
    } catch (error) {
      console.error("Fehler beim Löschen der Person:", error);
      return { success: false, error: error.message };
    }
  }
};
