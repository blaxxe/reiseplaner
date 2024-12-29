<!--
  +layout.svelte - Hauptlayout-Komponente
  Definiert das grundlegende Layout und Navigation für alle Seiten
  Enthält: Navigation Bar und Container für Child-Komponenten
-->

<script>
  import "./styles.css"; // Import der globalen Styles
  let { children } = $props(); // Props für Child-Komponenten Rendering
</script>

<!-- Hauptnavigation -->
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <!-- Mobile Navigation Toggle Button -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navigation Links -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/">Startseite</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/reisen">Reisen</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/reisen/create">Neue Reise</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/personen">Personen</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/personen/create">Neue Person</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/karte">Karte</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Container für Child-Komponenten -->
<div class="container mt-5">
  {@render children()}
</div>