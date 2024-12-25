import { connectToDatabase, getReisen } from '$lib/db';

export async function load() {
  try {
    const db = await connectToDatabase();
    const reisen = await getReisen();

    // Convert the `_id` field from ObjectId to string
    const serializableReisen = reisen.map((reise) => ({
      ...reise,
      _id: reise._id.toString(), // Convert `_id` to string
    }));

    return { reisen: serializableReisen };
  } catch (error) {
    console.error('Fehler beim Laden der Reisen:', error.message);
    return {
      status: 500,
      error: 'Interner Serverfehler',
    };
  }
}