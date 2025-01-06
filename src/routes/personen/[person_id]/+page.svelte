<script>
  export let data;
  let { person } = data;
</script>

{#if person}
  <!-- Personendetails -->
  <div class="person-details">
    <h1>{person.name}</h1>
    <p><strong>Email:</strong> {person.email}</p>
     <!-- Liste der Reisen -->
    <p><strong>Beteiligte Reisen:</strong></p>
    <ul>
      {#each person.reise_ids as reise}
        <li><a href={`/reisen/${reise}`}>Reise-ID: {reise}</a></li>
      {/each}
    </ul>
  </div>
{:else}
  <p>Person nicht gefunden.</p>
{/if}
