<script>
  import { onMount } from "svelte";
  export let data;
  export let form;

  let showSuccess = false;
  let reisen = [];
  let selectedReisen = [];

  // Daten laden
  onMount(() => {
    reisen = data.reisen;
  });

  // Erfolgsmeldung
  $: if (form?.success) {
    showSuccess = true;
    setTimeout(() => {
      showSuccess = false;
    }, 5000);
  }

  // Reisen-Auswahl togglen für Custom Select
  function toggleSelection(reiseId) {
    if (selectedReisen.includes(reiseId)) {
      selectedReisen = selectedReisen.filter(id => id !== reiseId);
    } else {
      selectedReisen = [...selectedReisen, reiseId];
    }
  }
</script>

<!--Zurück Button-->
<a class="btn" href="/personen" role="button">Zurück</a>


<div class="new-person-form">
  <h1>Neue Person hinzufügen</h1>

  <form method="POST" action="?/create" enctype="multipart/form-data">
    <!-- Name -->
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
        name="name"
        id="name"
        class="form-control"
        type="text"
        required
      />
    </div>

    <!-- Email -->
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        name="email"
        id="email"
        class="form-control"
        type="email"
        required
      />
    </div>

    <!-- Profilbild -->
    <div class="mb-3">
      <label for="image" class="form-label">Profilbild</label>
      <input
        name="image"
        id="image"
        class="form-control"
        type="file"
        accept="image/*"
      />
    </div>

    <!-- Reisen -->
    <div class="mb-3">
      <label for="reise" class="form-label">Reisen:</label>
      <!-- Custom Select -->
      <div class="custom-select">
        {#each reisen as reise}
          <div
            class="option {selectedReisen.includes(reise._id) ? 'selected' : ''}"
            on:click={() => toggleSelection(reise._id)}
            on:keydown={(e) =>
              e.key === 'Enter' || e.key === ' ' ? toggleSelection(reise._id) : null
            }
            role="button"
            tabindex="0"
          >
            {reise.title}
          </div>
        {/each}
      </div>
      <!-- Hidden Inputs -->
      {#each selectedReisen as reiseId}
        <input type="hidden" name="reise_ids" value={reiseId} />
      {/each}
    </div>

    <!--Hinuzfügen Button -->
    <button type="submit" class="btn btn-primary">Person hinzufügen</button>
  </form>

  <!-- Erfolgsmeldung -->
  {#if showSuccess}
    <div class="success-message">
      Person wurde erfolgreich hinzugefügt!
    </div>
  {/if}
</div>
