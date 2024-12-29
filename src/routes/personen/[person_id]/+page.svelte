<script>
  // Importiere Personendaten von der Server-Komponente
  export let data;
  // Destructure person aus den Daten
  let { person } = data;
</script>

<!-- Prüfe ob Personendaten vorhanden sind -->
{#if person}
  <!-- Hauptcontainer für Personendetails -->
  <div class="person-details">
    <!-- Profilbild der Person -->
    <img src={person.profile_image} alt="{person.name}" class="profile-image" />
    <!-- Name der Person als Überschrift -->
    <h1>{person.name}</h1>
    <!-- Kontaktinformationen -->
    <p><strong>Email:</strong> {person.email}</p>
    <!-- Überschrift für Reiseliste -->
    <p><strong>Beteiligte Reisen:</strong></p>
    <!-- Liste aller Reisen der Person -->
    <ul>
      <!-- Iteriere über alle Reise-IDs -->
      {#each person.reise_ids as reise}
        <!-- Einzelne Reise mit Link zur Detailansicht -->
        <li><a href={`/reisen/${reise}`}>Reise-ID: {reise}</a></li>
      {/each}
    </ul>
  </div>
<!-- Fallback wenn keine Person gefunden wurde -->
{:else}
  <p>Person nicht gefunden.</p>
{/if}
