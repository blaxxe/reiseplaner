<script>
  // Import onMount lifecycle function from Svelte
  import { onMount } from "svelte";
  // Export data and form props that can be passed to this component
  export let data;
  export let form;
  // Initialize empty array for storing trips
  let reisen = [];
  // Initialize success message flag
  let showSuccess = false;
  let selectedReisen = [];

  // When component mounts, populate reisen array with data from props
  onMount(() => {
    reisen = data.reisen;
  });

  // Reactive statement: when form.success changes, show success message
  // and hide it after 5 seconds using setTimeout
  $: if (form?.success) {
    showSuccess = true;
    setTimeout(() => {
      showSuccess = false;
    }, 5000); // Hide message after 5 seconds
  }

  function toggleSelection(reiseId) {
    if (selectedReisen.includes(reiseId)) {
      selectedReisen = selectedReisen.filter(id => id !== reiseId);
    } else {
      selectedReisen = [...selectedReisen, reiseId];
    }
  }
</script>

<!-- Back button that links to persons overview page -->
<a class="btn" href="/personen" role="button">Zurück</a>
<!-- Main container for the new person form -->
<div class="new-person-form">
  <h1>Neue Person hinzufügen</h1>

  <!-- Form that submits to create action endpoint and supports file upload -->
  <form 
    method="POST" 
    action="?/create" 
    enctype="multipart/form-data"
  >
    <div>
      <!-- Input field for person's name -->
      <label for="name">Name:</label>
      <input name="name" type="text" required />
    </div>

    <div>
      <!-- Input field for person's email -->
      <label for="email">Email:</label>
      <input name="email" type="email" required />
    </div>

    <div>
      <label for="image">Profilbild:</label>
      <input name="image" id="image" type="file" accept="image/*" />
    </div>

    <div>
      <label for="reise">Reisen:</label>
      <div class="custom-select">
        {#each reisen as reise}
          <div 
            class="option {selectedReisen.includes(reise._id) ? 'selected' : ''}"
            on:click={() => toggleSelection(reise._id)}
            on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? toggleSelection(reise._id) : null}
            role="button"
            tabindex="0"
          >
            {reise.title}
          </div>
        {/each}
      </div>
      {#each selectedReisen as reiseId}
        <input type="hidden" name="reise_ids" value={reiseId}>
      {/each}
    </div>

    <!-- Submit button -->
    <button type="submit" class="btn">Hinzufügen</button>
  </form>
  <!-- Conditional rendering of success message -->
  {#if showSuccess}
    <div class="success-message">
      Person wurde erfolgreich hinzugefügt!
    </div>
  {/if}
</div>
