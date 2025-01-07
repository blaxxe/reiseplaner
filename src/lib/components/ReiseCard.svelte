<!--reise als prop verfügbar machen-->
<script>
  export let reise;
  
  //Datum formatieren
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('de-CH');
  }
</script>

<!-- Reise Card Inhalt -->
<img src={reise.image} alt={reise.title} class="reise-image" />
<h2>{reise.title}</h2>
<p>{reise.destination}</p>
<p>Startdatum: {formatDate(reise.start_date)}</p>
<p>Enddatum: {formatDate(reise.end_date)}</p>
