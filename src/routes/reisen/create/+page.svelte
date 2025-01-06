<!--
  create/+page.svelte - Formular zum Erstellen einer neuen Reise
  Enthält Eingabefelder für alle Reisedetails und Erfolgsbestätigung
-->

<script>
  import { onMount } from "svelte";
  export let data;
  export let form;
  
  let showSuccess = false;
  let personen = [];
  let selectedTeilnehmer = [];

  // Load data
  onMount(() => {
    personen = data.personen;
  });

  // Success message handling
  $: if (form?.success) {
    showSuccess = true;
    setTimeout(() => {
      showSuccess = false;
    }, 5000);
  }

  // Toggle teilnehmer selection
  function toggleSelection(personId) {
    if (selectedTeilnehmer.includes(personId)) {
      selectedTeilnehmer = selectedTeilnehmer.filter(id => id !== personId);
    } else {
      selectedTeilnehmer = [...selectedTeilnehmer, personId];
    }
  }
</script>

<!-- Navigation zurück zur Übersicht -->
<a class="btn" href="/reisen" role="button">Zurück</a>

<!-- Reise-Erstellungsformular -->
<div class="new-reise-form">
  <h1>Neue Reise hinzufügen</h1>
  <form method="POST" action="?/create" enctype="multipart/form-data">
    <!-- Basis-Informationen -->
    <div class="mb-3">
      <label for="title" class="form-label">Titel</label>
      <input name="title" id="title" class="form-control" type="text" required />
    </div>
    
    <!-- Reiseziel -->
    <div class="mb-3">
      <label for="destination" class="form-label">Ziel</label>
      <input name="destination" id="destination" class="form-control" type="text" required />
    </div>

    <!-- Reisezeitraum -->
    <div class="date-wrapper">
      <div class="mb-3">
        <label for="start_date" class="form-label">Startdatum</label>
        <input name="start_date" id="start_date" class="form-control" type="date" required />
      </div>
      <div class="mb-3">
        <label for="end_date" class="form-label">Enddatum</label>
        <input name="end_date" id="end_date" class="form-control" type="date" required />
      </div>
    </div>

    <!-- Budget -->
    <div class="mb-3">
      <label for="budget" class="form-label">Budget (CHF)</label>
      <input name="budget" id="budget" class="form-control" type="number" step="0.01" required />
    </div>

    <!-- Beschreibung -->
    <div class="mb-3">
      <label for="description" class="form-label">Beschreibung</label>
      <textarea name="description" id="description" class="form-control" rows="3" required></textarea>
    </div>

    <!-- Bild -->
    <div class="mb-3">
      <label for="image" class="form-label">Bild</label>
      <input name="image" id="image" class="form-control" type="file" accept="image/*" required />
    </div>

    <!-- Neuer Teilnehmer-Bereich -->
    <div class="mb-3">
      <label for="teilnehmer" class="form-label">Teilnehmer:</label>
      <div class="custom-select">
        {#each personen as person}
          <div
            class="option {selectedTeilnehmer.includes(person._id) ? 'selected' : ''}"
            on:click={() => toggleSelection(person._id)}
            on:keydown={(e) =>
              e.key === 'Enter' || e.key === ' ' ? toggleSelection(person._id) : null
            }
            role="button"
            tabindex="0"
          >
            {person.name}
          </div>
        {/each}
      </div>
      <!-- Hidden inputs for selected teilnehmer -->
      {#each selectedTeilnehmer as teilnehmerId}
        <input type="hidden" name="teilnehmer_ids" value={teilnehmerId} />
      {/each}
    </div>

    <!-- Submit-Button -->
    <button type="submit" class="btn btn-primary">Reise hinzufügen</button>
  </form>

  <!-- Erfolgs-Message -->
  {#if showSuccess}
  <div class="success-message">
    Reise wurde erfolgreich hinzugefügt!
  </div>
  {/if}
</div>
