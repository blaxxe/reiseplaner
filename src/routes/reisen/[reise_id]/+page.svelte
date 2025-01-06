<script>
  export let data;
</script>

<!-- Prüfe ob Reisedaten vorhanden sind -->
{#if data.reise}
  <div class="reise-details">
    <!-- Reisebild und Details anzeigen -->
    <img src={data.reise.image} alt={data.reise.title} class="reise-image" />
    <h1>{data.reise.title}</h1>
    <p><strong>Destination:</strong> {data.reise.destination}</p>
    <p><strong>Startdatum:</strong> {data.reise.start_date}</p>
    <p><strong>Enddatum:</strong> {data.reise.end_date}</p>
    <p><strong>Budget:</strong> {data.reise.budget} CHF</p>
    <p>{data.reise.description}</p>

    <!-- Teilnehmerliste -->
    <h2>Teilnehmer</h2>
    {#if data.personen && data.personen.length > 0}
      <ul>
        {#each data.personen as person}
          <li>{person.name}</li>
        {/each}
      </ul>
    {:else}
      <p>Keine Teilnehmer gefunden.</p>
    {/if}

    <!--Zurück Button -->
    <a class="btn" href="/reisen">Zurück</a>
  </div>
{:else}
  <p>Die Reise konnte nicht geladen werden.</p>
{/if}
