import { getReise, getPersonenByReiseId } from '$lib/db.js';

export async function load({ params }) {
  try {
    //  Reisedaten anhand der URL-Parameter (reise_id)
    const reise = await getReise(params.reise_id);
    
    //404 Fehler
    if (!reise) {
      return {
        status: 404,
        error: new Error('Reise nicht gefunden'),
      };
    }

    // alle Teilnehmer für diese Reise
    const personen = await getPersonenByReiseId(params.reise_id);

    // Reise- und Personendaten an die Frontend-Komponente zurück
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
