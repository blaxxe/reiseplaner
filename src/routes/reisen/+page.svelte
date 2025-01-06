<script>
  // SvelteKit Imports für Formularhandling und Navigation
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  // Komponenten Imports
  import ReiseCard from "$lib/components/ReiseCard.svelte";
  import Calendar from "$lib/components/Calendar.svelte";
  import { onMount } from "svelte";

  // Daten aus dem Server-Load
  export let data;
  let reisen = data.reisen;
  let showCalendar = false;
  let showFilterModal = false;
  let searchTerm = "";
  let startDate = "";
  let endDate = "";
  let selectedDestination = "";

  // Destinationen für Filter auslesen
  $: destinations = [...new Set(reisen.map((r) => r.destination))].sort();

  // Filtern der Reisen
  $: filteredReisen = reisen.filter((reise) => {
    // Suchbegriff Filter
    const searchMatch =
      !searchTerm ||
      reise.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reise.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reise.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Destination Filter
    const destinationMatch =
      !selectedDestination || reise.destination === selectedDestination;

    // Datum Filter
    const dateMatch =
      (!startDate || new Date(reise.start_date) >= new Date(startDate)) &&
      (!endDate || new Date(reise.end_date) <= new Date(endDate));

    return searchMatch && destinationMatch && dateMatch;
  });

  // Löscht eine Reise nach Bestätigung
  async function deleteReise(id) {
    if (confirm("Möchten Sie diese Reise wirklich löschen?")) {
      try {
        const form = new FormData();
        form.append("id", id);

        const response = await fetch("?/delete", {
          method: "POST",
          body: form,
        });

        await invalidateAll();
        window.location.reload();
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  }

  // Toggle für Kalenderansicht
  function toggleCalendar() {
    showCalendar = !showCalendar;
  }

  // Filter zurücksetzen
  function resetFilters() {
    searchTerm = "";
    startDate = "";
    endDate = "";
    selectedDestination = "";
  }

  // Toggle für Filtermodal
  function toggleFilterModal() {
    showFilterModal = !showFilterModal;
  }
</script>

<!-- Hauptcontainer -->
<div class="reisen-container">
  <h1>Reiseübersicht</h1>

  <!-- Aktionsbuttons -->
  <div class="reisen-actions">
    <a class="btn" href="/reisen/create">Neue Reise hinzufügen</a>
    <button class="btn" on:click={toggleCalendar}>
      {showCalendar ? "Kalender ausblenden" : "Kalender anzeigen"}
    </button>
    <button class="btn" on:click={toggleFilterModal}>
      Filter {showFilterModal ? "ausblenden" : "anzeigen"}
    </button>
  </div>

  <!-- Filter -->
  {#if showFilterModal}
    <div class="filter-modal">
      <div class="filter-content">
        <div class="filter-group">
          <label for="search">Suche:</label>
          <input
            id="search"
            type="text"
            bind:value={searchTerm}
            placeholder="Suche nach Titel, Ziel oder Beschreibung"
          />
        </div>

        <div class="filter-group">
          <label for="destination">Reiseziel:</label>
          <select id="destination" bind:value={selectedDestination}>
            <option value="">Alle Ziele</option>
            {#each destinations as destination}
              <option value={destination}>{destination}</option>
            {/each}
          </select>
        </div>

        <div class="filter-group">
          <label for="zeitraum">Zeitraum:</label>
          <div class="date-inputs">
            <input
              id="zeitraum"
              type="date"
              bind:value={startDate}
              placeholder="Von"
            />
            <input
              id="zeitraum"
              type="date"
              bind:value={endDate}
              placeholder="Bis"
            />
          </div>
        </div>

        <div class="filter-actions">
          <button class="btn secondary" on:click={resetFilters}>
            Filter zurücksetzen
          </button>
          <button class="btn" on:click={toggleFilterModal}> Schließen </button>
        </div>
      </div>
    </div>
  {/if}

  <!--  Kalender -->
  {#if showCalendar}
    <Calendar {reisen} />
  {/if}

  <!-- Reisen Grid-Ansicht -->
  <div class="reisen-grid">
    {#each filteredReisen as reise}
      <div class="reise-card">
        <ReiseCard {reise} />
        <a href={`/reisen/${reise._id}`} class="btn">Details</a>
        <button class="btn delete-btn" on:click={() => deleteReise(reise._id)}>
          Löschen
        </button>
      </div>
    {/each}
  </div>
</div>
