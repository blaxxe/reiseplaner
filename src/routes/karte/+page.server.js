
import { getReisen } from '$lib/db.js';
//Reisedaten für Karte laden
export async function load() {
  try {
    const reisen = await getReisen();
    return { reisen };
  } catch (error) {
    console.error('Error loading reisen:', error);
    return {
      status: 500,
      error: new Error('Interner Serverfehler'),
    };
  }
}