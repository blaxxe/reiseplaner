import { getPerson } from "$lib/db.js";
import { ObjectId } from "mongodb";

// Server-seitige Ladefunktion für Personendetails
export async function load({ params }) {
  // Hole person_id aus URL-Parametern
  const personId = params.person_id;

  try {
    // Validiere ob die ID dem MongoDB Format entspricht
    if (!ObjectId.isValid(personId)) {
      return {
        status: 400,
        error: new Error("Ungültige Personen-ID"),
      };
    }

    // Versuche Person aus Datenbank zu laden
    const person = await getPerson(new ObjectId(personId));

    // Wenn keine Person gefunden wurde
    if (!person) {
      return {
        status: 404,
        error: new Error("Person nicht gefunden"),
      };
    }

    // Gib Personendaten zurück
    return { person };
  } catch (error) {
    // Fehlerbehandlung bei Datenbankproblemen
    console.error("Fehler beim Laden der Person:", error);
    return {
      status: 500,
      error: new Error("Interner Serverfehler"),
    };
  }
}
