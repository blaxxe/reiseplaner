<script>
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
  import iconUrl from 'leaflet/dist/images/marker-icon.png';
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
  
  // Props: Array of travel destinations
  export let reisen = [];
  
  // OpenCage Geocoding API key
  const apiKey = 'b1ced8cdd89e4934a08ccd9662eab6bf';
  
  // Leaflet map instance
  let map;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl
  });

  onMount(async () => {
    // Check if code runs in browser environment
    if (typeof window !== 'undefined') {
      // Dynamic imports for better performance
      const opencage = (await import('opencage-api-client')).default;
      await import('leaflet/dist/leaflet.css');

      // Initialize map centered at [40, 0] with zoom level 2
      map = L.map('map').setView([40, 0], 2);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add markers for each travel destination
      reisen.forEach(reise => {
        // Geocode the destination address to coordinates
        opencage
          .geocode({ q: reise.destination, key: apiKey })
          .then(response => {
            if (response.results.length > 0) {
              const { lat, lng } = response.results[0].geometry;
              
              // Create and add marker with popup
              const marker = L.marker([lat, lng]).addTo(map);
              marker.bindPopup(`<b>${reise.title}</b><br>${reise.destination}`);
              
              // Add click handler for navigation
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

<!-- Map container -->
<div id="map"></div>
