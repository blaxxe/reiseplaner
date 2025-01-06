<!--
  ReiseCard.svelte - Komponente zur Darstellung einer Reise-Vorschau
  Zeigt Bild, Titel, Ziel und einen Details-Link für eine Reise an
-->

<script>
  export let reise;
</script>

<!-- Reise Vorschau Card -->
<img src={reise.image} alt={reise.title} class="reise-image" />
<h2>{reise.title}</h2>
<p>{reise.destination}</p>
<p>Startdatum: {reise.start_date}</p>
<p>Enddatum: {reise.end_date}</p>
