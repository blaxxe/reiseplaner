<script>
    import Map from '$lib/components/Map.svelte';
    export let data;
</script>

<!--Map Komponente, übergabe der Reisedaten als Prop -->
<Map reisen={data.reisen} />

