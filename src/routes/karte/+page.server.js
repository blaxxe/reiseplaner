// Import database utility function
import { getReisen } from '$lib/db.js';

// Server-side load function that runs before page render
export async function load() {
  try {
    // Fetch all travel data from database
    const reisen = await getReisen();
    
    // Return travel data to the page component
    return { reisen };
  } catch (error) {
    // Log error for server-side debugging
    console.error('Error loading reisen:', error);
    
    // Return error state to client
    return {
      status: 500,
      error: new Error('Interner Serverfehler'), // "Internal Server Error" in German
    };
  }
}