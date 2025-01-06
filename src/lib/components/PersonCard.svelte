<!--
  PersonCard.svelte - Komponente zur Anzeige von Benutzerinformationen
  Zeigt Profilbild, Name, Email und zugehörige Reisen eines Benutzers an
-->

<script>
  export let person;
</script> 

<!-- Benutzer Profil Sektion -->

  <img src={person.image} alt={person.name} class="profile-image" />


<h2>{person.name}</h2>
<p><strong>E-Mail:</strong> {person.email}</p>

<!-- Liste der Reisen -->
<p><strong>Reisen:</strong></p>
<ul>
  {#each person.reisen as reise}
    <li><a href={`/reisen/${reise._id}`}>{reise.title}</a></li>
  {/each}
</ul>
