// Importiere Datenbankfunktionen für Reisen und Personen
import { getReise, getPersonenByReiseId } from '$lib/db.js';

// SvelteKit Ladefunktion, wird automatisch beim Seitenaufruf ausgeführt
export async function load({ params }) {
  try {
    // Hole Reisedaten anhand der URL-Parameter (reise_id)
    const reise = await getReise(params.reise_id);
    
    // Wenn keine Reise gefunden wurde, gib 404-Fehler zurück
    if (!reise) {
      return {
        status: 404,
        error: new Error('Reise nicht gefunden'),
      };
    }

    // Hole alle Teilnehmer für diese Reise
    const personen = await getPersonenByReiseId(params.reise_id);

    // Gib Reise- und Personendaten an die Frontend-Komponente zurück
    return { reise, personen };

  } catch (error) {
    // Bei Datenbankfehlern: Logge Fehler und gib 500er Status zurück
    console.error('Error loading reise:', error.message);
    return {
      status: 500,
      error: new Error('Interner Serverfehler'),
    };
  }
}
