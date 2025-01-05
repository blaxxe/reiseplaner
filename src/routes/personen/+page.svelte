<script>
  // Importiere benötigte Komponenten und Funktionen
  import PersonCard from "$lib/components/PersonCard.svelte";
  import { invalidateAll } from '$app/navigation';
  
  // Hole die Daten von der Server-Komponente
  let { data } = $props();

  // Funktion zum Löschen einer Person
  async function deletePerson(id) {
    // Sicherheitsabfrage vor dem Löschen
    if (confirm('Möchten Sie diese Person wirklich löschen?')) {
      try {
        // Erstelle FormData mit der Person-ID
        const form = new FormData();
        form.append('id', id);
        
        // Sende DELETE-Request an den Server
        await fetch('?/delete', { method: 'POST', body: form });
        
        // Aktualisiere die Daten und lade die Seite neu
        await invalidateAll();
        window.location.reload();
      } catch (error) {
        console.error('Delete Error:', error);
      }
    }
  }
</script>

<!-- Hauptcontainer für die Personenliste -->
<div class="personen-container">
  <h1>Personen</h1>
  <!-- Button zum Hinzufügen neuer Personen -->
  <a href="/personen/create" class="btn">Neue Person hinzufügen</a>

  <!-- Grid-Layout für Personenkarten -->
  <div class="personen-grid">
    <!-- Iteriere über alle Personen -->
    {#each data.personen as person}
      <div class="person-card">
        <!-- Zeige PersonCard-Komponente -->
        <PersonCard {person} />
        <!-- Lösch-Button für jede Person -->
        <button class="btn delete-btn" on:click={() => deletePerson(person._id)}>
          Löschen
        </button>
      </div>
    {/each}
  </div>
</div>
