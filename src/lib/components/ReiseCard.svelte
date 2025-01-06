<!--reise als prop verfügbar machen-->
<script>
  export let reise;
</script>

<!-- Reise Card Inhalt -->
<img src={reise.image} alt={reise.title} class="reise-image" />
<h2>{reise.title}</h2>
<p>{reise.destination}</p>
<p>Startdatum: {reise.start_date}</p>
<p>Enddatum: {reise.end_date}</p>
