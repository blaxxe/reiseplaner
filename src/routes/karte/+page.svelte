<script>
    // Import the Map component from library
    import Map from '$lib/components/Map.svelte';
    
    // Receive data from server-side load function
    export let data;
</script>

<!-- Map component with travel destinations -->
<!-- Passes reisen array from server to Map component -->
<Map reisen={data.reisen} />

