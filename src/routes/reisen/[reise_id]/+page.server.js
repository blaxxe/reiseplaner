import { getReise } from '$lib/db.js';  // Importiere die Funktion zum Laden der Reise aus der DB

export async function load({ params }) {
  const reiseId = params.reise_id;  // Hole die Reise-ID aus der URL

  console.log('Loading reise with ID:', reiseId);  // Überprüfe, ob die Reise-ID korrekt abgerufen wird

  try {
    const reise = await getReise(reiseId);  // Hole die spezifische Reise
    if (!reise) {
      console.log('Reise not found with ID:', reiseId);  // Loggen, falls die Reise nicht gefunden wird
      return {
        status: 404,
        error: new Error('Reise nicht gefunden'),
      };
    }
    console.log('Reise found:', reise);  // Logge die gefundenen Reise-Daten
    return {
      reise,  // Übergabe der Reise-Daten an die Seite
    };
  } catch (error) {
    console.error('Fehler beim Laden der Reise:', error.message);
    console.error('Stack Trace:', error.stack);  // Logge den Stack Trace für detailliertere Fehleranalyse
    return {
      status: 500,
      error: new Error('Interner Serverfehler'),
    };
  }
}