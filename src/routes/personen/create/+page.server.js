import { getReisen, createPerson } from "$lib/db.js";


// funktion zum laden der Reisedaten
export async function load() {
  try {
    const reisen = await getReisen();
    return { reisen };
  } catch (error) {
    console.error("Error loading reisen:", error);
    return {
      status: 500,
      error: new Error("Interner Serverfehler"),
    };
  }
}

// Exportieren der Funktionen
export const actions = {
  create: async ({ request }) => {
    try {
      //Formular Daten auslesen
      const data = await request.formData();

      // Person Objekt erstellen
      const person = {
        name: data.get("name"),
        email: data.get("email"),
        reise_ids: data.getAll("reise_ids"), // Store associated travel IDs
        image: data.get("image") // Add image handling
      };

      // neue Person erstellen
      await createPerson(person);
      return { success: true };
    } catch (error) {
      console.error("Error creating person:", error);
      return { success: false, error: "Internal Server Error" };
    }
  },
};