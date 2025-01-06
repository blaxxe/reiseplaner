<script>
  // importieren der Funktion onMount (Code ausführen, wenn Komponente gerendert wird)
  import { onMount } from 'svelte';

  //prop reisen mit leerem Array übergeben
  export let reisen = [];

  //API-Key für OpenCage Geocoding API
  const apiKey = 'b1ced8cdd89e4934a08ccd9662eab6bf';

  //Map-Objekt
  let map;

  //Code ausführen, wenn Komponente im DOM verfügabr ist
  onMount(async () => {

    //prüfen ob Code im Browser ausgeführt wird
    if (typeof window !== 'undefined') {

      //importieren von Leaflet und OpenCage Geocoding API
      const L = await import('leaflet');
      const opencage = (await import('opencage-api-client')).default;
      await import('leaflet/dist/leaflet.css');

      //Marker-Icons von Leaflet anpassen
         delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
      });

      //Map-Objekt erstellen und Kartenausschnitt festlegen
      map = L.map('map').setView([40, 0], 2);

      //OpenStreetMap als Kartenlayer hinzufügen
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      //Reisen durchlaufen und Marker für Reiseziele hinzufügen
      reisen.forEach(reise => {

        //Geocoding für Reiseziel durchführen
        opencage
          .geocode({ q: reise.destination, key: apiKey })
          .then(response => {
            if (response.results.length > 0) {
              const { lat, lng } = response.results[0].geometry;
              
              //Marker für Reiseziel hinzufügen
              const marker = L.marker([lat, lng]).addTo(map);
              marker.bindPopup(`<b>${reise.title}</b><br>${reise.destination}`);
              
              //Beim Klick auf Marker zur Detailseite der Reise weiterleiten
              marker.on('click', () => {
                window.location.href = `/reisen/${reise._id}`;
              });
            }
          })
          .catch(error => {
            console.error(`Error geocoding ${reise.destination}:`, error);
          });
      });
    }
  });
</script>

<div id="map"></div>

