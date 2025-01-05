// Import database operations for travels and person management
import { getReisen, createPerson } from "$lib/db.js";


// Load function to fetch all available travels
export async function load() {
  try {
    // Get travels from database
    const reisen = await getReisen();
    return { reisen };
  } catch (error) {
    // Log and handle any errors during data fetching
    console.error("Error loading reisen:", error);
    return {
      status: 500,
      error: new Error("Interner Serverfehler"),
    };
  }
}

// Define form actions for person creation
export const actions = {
  // Handler for creating a new person
  create: async ({ request }) => {
    try {
      // Extract form data from the request
      const data = await request.formData();

      // Create person object with form data
      const person = {
        name: data.get("name"),
        email: data.get("email"),
        reise_ids: data.getAll("reise_ids"), // Store associated travel IDs
        image: data.get("image") // Add image handling
      };

      // Save new person to database
      await createPerson(person);
      return { success: true };
    } catch (error) {
      // Log and handle any errors during person creation
      console.error("Error creating person:", error);
      return { success: false, error: "Internal Server Error" };
    }
  },
};