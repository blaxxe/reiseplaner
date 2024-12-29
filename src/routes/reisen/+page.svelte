<!--
  reisen/+page.svelte - Reiseübersichtsseite
  Zeigt alle Reisen an, ermöglicht Löschen und Kalenderansicht
-->

<script>
  // SvelteKit Imports für Formularhandling und Navigation
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  // Komponenten Imports
  import ReiseCard from "$lib/components/ReiseCard.svelte";
  import Calendar from "$lib/components/Calendar.svelte";
  import { onMount } from 'svelte';

  // Daten aus dem Server-Load
  export let data;
  let reisen = data.reisen;
  let showCalendar = false;

  // Löscht eine Reise nach Bestätigung
  async function deleteReise(id) {
    if (confirm('Möchten Sie diese Reise wirklich löschen?')) {
      try {
        const form = new FormData();
        form.append('id', id);
        
        const response = await fetch('?/delete', {
          method: 'POST',
          body: form
        });

        await invalidateAll();
        window.location.reload();
        
      } catch (error) {
        console.error('Delete Error:', error);
      }
    }
  }

  // Toggle für Kalenderansicht
  function toggleCalendar() {
    showCalendar = !showCalendar;
  }
</script>

<!-- Hauptcontainer -->
<div class="reisen-container">
  <h1>Reiseübersicht</h1>
  
  <!-- Aktionsbuttons -->
  <div class="reisen-actions">
    <a class="btn" href="/reisen/create" role="button">Neue Reise hinzufügen</a>
    <button class="btn" on:click={toggleCalendar}>
      {showCalendar ? 'Kalender ausblenden' : 'Kalender anzeigen'}
    </button>
  </div>

  <!-- Optionale Kalenderansicht -->
  {#if showCalendar}
    <Calendar reisen={reisen} />
  {/if}

  <!-- Reisen Grid-Ansicht -->
  <div class="reisen-grid">
    {#each data.reisen as reise}
      <div class="reise-card">
        <h2>{reise.title}</h2>
        <p>{reise.destination}</p>
        <p>Startdatum: {reise.start_date}</p>
        <p>Enddatum: {reise.end_date}</p>
        <img src={reise.image} alt={reise.title} class="reise-image" />
        <a href={`/reisen/${reise._id}`} class="btn">Details</a>
        <button class="btn delete-btn" on:click={() => deleteReise(reise._id)}>
          Löschen
        </button>
      </div>
    {/each}
  </div>
</div>
