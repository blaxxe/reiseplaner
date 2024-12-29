<script>
    // Liste der Reisen als Property
    export let reisen = [];
  
    // Funktion zum Formatieren eines Datums (DD.MM.YYYY)
    function getDateString(date) {
      const d = new Date(date);
      return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    }
  
    // Hilfsfunktion: Anzahl der Tage in einem Monat ermitteln
    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    // Aktuelles Datum als Startpunkt
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
  
    // Navigation zwischen Monaten
    function changeMonth(direction) {
      month += direction;
      if (month < 0) {
        month = 11;
        year--;
      } else if (month > 11) {
        month = 0;
        year++;
      }
    }
  
    // Prüft ob ein Datum innerhalb eines Zeitraums liegt
    function isDateInRange(date, startDate, endDate) {
      const currentDate = new Date(date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return currentDate >= start && currentDate <= end;
    }

    // Funktion zur Navigation zur Reisedetailseite
    function navigateToReise(event, reiseId) {
      event.preventDefault();
      window.location.href = `/reisen/${reiseId}`;
    }
</script>

<!-- Container für Kalender-->
<div class="calendar">
    <!-- Header mit Navigationsbuttons und aktuellem Monat/Jahr -->
    <div class="calendar-header">
        <button on:click={() => changeMonth(-1)}>&lt;</button>
        <span>{new Date(year, month).toLocaleString('default', { month: 'long' })} {year}</span>
        <button on:click={() => changeMonth(1)}>&gt;</button>
    </div>
    <!-- Grid für die Kalendertage -->
    <div class="calendar-grid">
        {#each Array(daysInMonth(month, year)).fill(0).map((_, i) => i + 1) as day}
            <div class="calendar-day">
                <span>{day}</span>
                {#each reisen as reise}
                    {#if isDateInRange(new Date(year, month, day), reise.start_date, reise.end_date)}
                        <a 
                            href={`/reisen/${reise._id}`}
                            class="event"
                            on:click={(e) => navigateToReise(e, reise._id)}
                        >
                            {reise.title}
                        </a>
                    {/if}
                {/each}
            </div>
        {/each}
    </div>
</div>

