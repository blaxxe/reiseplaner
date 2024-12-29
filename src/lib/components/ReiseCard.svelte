<!--
  ReiseCard.svelte - Komponente zur Darstellung einer Reise-Vorschau
  Zeigt Bild, Titel, Ziel und einen Details-Link für eine Reise an
-->

<script>
  // Reise-Objekt mit: image, title, destination und _id
  export let reise;
</script>

<!-- Reise Vorschau Card -->
<img src={reise.image} alt={reise.title} class="reise-image" />
<h2>{reise.title}</h2>
<p>{reise.destination}</p>
<a href={`/reisen/${reise._id}`} class="btn">Details</a>
