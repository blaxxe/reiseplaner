<script>
    import "./styles.css"; // Deine globalen CSS-Dateien
    let { children } = $props();
  </script>
  
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand">Reiseplaner</a>
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
        </ul>
      </div>
    </div>
  </nav>
  
  <div class="container mt-5">
    {@render children()}
  </div>
  