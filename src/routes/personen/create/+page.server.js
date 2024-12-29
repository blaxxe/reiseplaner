// Import database operations for travels and person management
import { getReisen, createPerson } from "$lib/db.js";
// Import file system operations for profile image handling
import { writeFileSync } from "fs";
// Import UUID generator for unique profile image names
import { randomUUID } from "crypto";

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
      // Get uploaded profile image if present
      const file = data.get("profile_image");

      // Set default profile image path or generate new one for uploads
      let fileName = "/images/default-profile.jpg";
      if (file && file.size > 0) {
        // Extract file extension and create unique filename
        const ext = file.name.split(".").pop();
        fileName = `/images/${randomUUID()}.${ext}`;
        // Ensure static directory exists
        const filePath = `static${fileName}`;
        try {
          writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));
        } catch (err) {
          console.error("Error writing file:", err);
          return { success: false, error: "Failed to save image" };
        }
      }

      // Create person object with form data
      const person = {
        name: data.get("name"),
        email: data.get("email"),
        profile_image: fileName, // Store image path
        // Get all selected values
        reise_ids: data.getAll("reise_ids"), // Store associated travel IDs
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