<script>
  //reisen als prop mit leerem array übergeben
  export let reisen = [];

  //Funktion um Datum in String umzuwandeln
  function getDateString(date) {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  }

  //Funktion um Anzahl der Tage im Monat zu berechnen
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  //aktuelles Datum
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();

  //Funktion um zwischen Monaten zu navigieren
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

  //Funktion um zu prüfen ob ein Datum innerhalb einer Reiseperiode liegt
  function isDateInRange(date, startDate, endDate) {
    const currentDate = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return currentDate >= start && currentDate <= end;
  }

  //Funktion um zu einer Reise zu navigieren
  function navigateToReise(event, reiseId) {
    event.preventDefault();
    window.location.href = `/reisen/${reiseId}`;
  }
</script>

<!--Kalender anzeigen-->
<div class="calendar">
  <!--Kalender-Header-->
  <div class="calendar-header">
    <button on:click={() => changeMonth(-1)}>&lt;</button>
    <span
      >{new Date(year, month).toLocaleString("default", { month: "long" })}
      {year}</span
    >
    <button on:click={() => changeMonth(1)}>&gt;</button>
  </div>
  <!--Kalender-Grid-->
  <div class="calendar-grid">
    {#each Array(daysInMonth(month, year))
      .fill(0)
      .map((_, i) => i + 1) as day}
      <div class="calendar-day">
        <span>{day}</span>
        {#each reisen as reise}
          {#if isDateInRange(new Date(year, month, day), reise.start_date, reise.end_date)}
            <a
              href={`/reisen/${reise._id}`}
              class="event"
              title={reise.title}
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
