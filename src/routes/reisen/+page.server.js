import { getReisen, deleteReise } from '$lib/db.js';

// Lädt alle Reisen beim Seitenaufruf
export async function load() {
  try {
    const reisen = await getReisen();
    if (!reisen || reisen.length === 0) {
      return {
        status: 404,
        error: new Error('Keine Reisen gefunden'),
      };
    }
    return { reisen };
  } catch (error) {
    console.error('Error loading reisen:', error.message);
    return {
      status: 500,
      error: new Error('Interner Serverfehler'),
    };
  }
}


export const actions = {
  // Löscht eine Reise anhand ihrer ID
  delete: async ({ request }) => {
    try {
      const formData = await request.formData();
      const id = formData.get('id');

      if (!id) {
        return { success: false, error: 'Keine Reise-ID angegeben' };
      }

      await deleteReise(id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting reise:', error.message);
      return {
        success: false,
        error: 'Fehler beim Löschen der Reise'
      };
    }
  }
};