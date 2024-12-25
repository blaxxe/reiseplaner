<script>
  export let reise;  // Die Reise, die als Prop übergeben wird
</script>

<div class="reise-card">
  <img src={reise.image} alt={reise.title} class="reise-image" />
  <h2>{reise.title}</h2>
  <p>{reise.destination}</p>
  <p>Startdatum: {reise.start_date}</p>
  <p>Enddatum: {reise.end_date}</p>
  <p>{reise.description}</p>

  <!-- Details-Button hinzufügen -->
  <a href={`/reisen/${reise._id}`} class="btn">Details</a>
</div>

<style>
  .reise-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    text-align: center;
  }

  .reise-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
  }
</style>
