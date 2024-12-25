<script>
  import ReiseCard from "$lib/components/ReiseCard.svelte"; // Importiere die ReiseCard-Komponente
  import { onMount } from 'svelte';

  let reisen = [];
  export let data;

  async function loadReisen() {
    // Simuliere das Laden der Reisen-Daten
    reisen = data.reisen;
  }

  function deleteReise(id) {
    reisen = reisen.filter(reise => reise._id !== id);
  }

  onMount(loadReisen);
</script>

<a class="btn" href="/reisen/create" role="button">Neue Reise hinzufügen</a>

{#if reisen.length > 0}
  <div class="reisen-grid">
    {#each reisen as reise}
      <div class="reise-card">
        <h2>{reise.title}</h2>
        <p>{reise.destination}</p>
        <p>Startdatum: {reise.start_date}</p>
        <p>Enddatum: {reise.end_date}</p>
        <p>{reise.description}</p>
        <img src={reise.image} alt={reise.title} class="reise-image" />
        
        <!-- Details-Button hinzufügen -->
        <a href={`/reisen/${reise._id}`} class="btn">Details</a>

        <button on:click={() => deleteReise(reise._id)}>Löschen</button>
      </div>
    {/each}
  </div>
{:else}
  <p>Keine Reisen gefunden.</p>
{/if}

<style>
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    text-align: center;
    font-size: 18px;
    color: #333;
  }

  .btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background-color: #0056b3;
  }

  .row {
    margin-top: 20px;
  }

  .col-sm-6, .col-md-4, .col-lg-3 {
    padding: 10px;
  }

  .error {
    color: red;
    font-weight: bold;
  }

  .reise-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  .reisen-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  .reise-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    width: 300px;
    box-sizing: border-box;
    text-align: center;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
  }
  button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
  }
</style>