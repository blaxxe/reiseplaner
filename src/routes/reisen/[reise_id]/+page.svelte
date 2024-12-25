<script>
  export let reise;

  // Logge reise-Daten zur Fehlerbehebung
  console.log('Reise-Daten:', reise);
</script>

<div class="reise-detail">
  {#if reise}
    <h1>{reise.title}</h1>
    <p><strong>Destination:</strong> {reise.destination}</p>
    <p><strong>Start Date:</strong> {reise.start_date}</p>
    <p><strong>End Date:</strong> {reise.end_date}</p>
    <p><strong>Description:</strong> {reise.description}</p>
    <img src={reise.image} alt={reise.title} class="reise-image" />
  {:else}
    <p>Die Reise konnte nicht geladen werden.</p>
  {/if}
</div>

<style>
  .reise-detail {
    text-align: center;
  }
  .reise-image {
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 5px;
  }
</style>