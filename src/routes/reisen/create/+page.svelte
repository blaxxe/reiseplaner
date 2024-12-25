<script>
  export let form;
  let showModal = false;

  $: if (form?.success) {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
</script>

<a class="btn" href="/reisen" role="button">Zurück</a>

<h1>Neue Reise hinzufügen</h1>
<form method="POST" action="?/create" enctype="multipart/form-data">
  <div class="mb-3">
    <label for="title" class="form-label">Titel</label>
    <input name="title" id="title" class="form-control" type="text" required />
  </div>
  <div class="mb-3">
    <label for="destination" class="form-label">Ziel</label>
    <input name="destination" id="destination" class="form-control" type="text" required />
  </div>
  <div class="mb-3">
    <label for="start_date" class="form-label">Startdatum</label>
    <input name="start_date" id="start_date" class="form-control" type="date" required />
  </div>
  <div class="mb-3">
    <label for="end_date" class="form-label">Enddatum</label>
    <input name="end_date" id="end_date" class="form-control" type="date" required />
  </div>
  <div class="mb-3">
    <label for="budget" class="form-label">Budget (CHF)</label>
    <input name="budget" id="budget" class="form-control" type="number" step="0.01" required />
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">Beschreibung</label>
    <textarea name="description" id="description" class="form-control" rows="3" required></textarea>
  </div>
  <div class="mb-3">
    <label for="image" class="form-label">Bild</label>
    <input name="image" id="image" class="form-control" type="file" accept="image/*" required />
  </div>
  <button type="submit" class="btn btn-primary">Reise hinzufügen</button>
</form>

{#if showModal}
  <div class="modal">
    <div class="modal-content">
      <span class="close" on:click={closeModal}>&times;</span>
      <p>Reise erfolgreich erstellt!</p>
    </div>
  </div>
{/if}

<style>
  .btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  p {
    color: #28a745;
    display: flex;
    justify-content: center;
    font-size: 18px;
    margin-top: 10px;
  }
  .form-label {
    font-weight: bold;
  }
  .form-control {
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  .mb-3 {
    margin-bottom: 15px;
  }
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    text-align: center;
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>