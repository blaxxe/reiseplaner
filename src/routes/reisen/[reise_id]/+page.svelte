<script>
  // Empfange die Daten von der Server-Komponente
  export let data;
</script>

<!-- Prüfe ob Reisedaten vorhanden sind -->
{#if data.reise}
  <div class="reise-details">
    <!-- Zeige das Reisebild und Details an -->
    <img src={data.reise.image} alt={data.reise.title} class="reise-image" />
    <h1>{data.reise.title}</h1>
    <!-- Zeige die Reisedetails in strukturierter Form -->
    <p><strong>Destination:</strong> {data.reise.destination}</p>
    <p><strong>Startdatum:</strong> {data.reise.start_date}</p>
    <p><strong>Enddatum:</strong> {data.reise.end_date}</p>
    <p>{data.reise.description}</p>

    <!-- Abschnitt für Teilnehmerliste -->
    <h2>Teilnehmer</h2>
    <!-- Prüfe ob Teilnehmer vorhanden sind -->
    {#if data.personen && data.personen.length > 0}
      <ul>
        <!-- Iteriere über alle Teilnehmer und zeige ihre Namen -->
        {#each data.personen as person}
          <li>{person.name}</li>
        {/each}
      </ul>
    {:else}
      <!-- Fallback wenn keine Teilnehmer vorhanden -->
      <p>Keine Teilnehmer gefunden.</p>
    {/if}
    <!-- Navigation zurück zur Übersicht -->
    <a class="btn" href="/reisen">Zurück</a>
  </div>
  
{:else}
  <!-- Fehlermeldung wenn keine Reisedaten geladen werden konnten -->
  <p>Die Reise konnte nicht geladen werden.</p>
{/if}