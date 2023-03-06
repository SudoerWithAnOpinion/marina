<script lang='ts'>
  import { Spinner, Indicator } from 'flowbite-svelte';
  
  import type { PageData } from './$types';
  export let data: PageData ;



  $: pageTitle = data.printer !== null ? data.printer.name : 'Printer';
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div>
  <div>
    <strong>Printer</strong> {data.printer !== null ? data.printer.name : 'INVALID PRINTER ID'}
  </div>
  <div>
    <strong>Klipper</strong>
    <div>
      {#await data.remote.connectionAvailable}
        <Spinner size={'4'} />
      {:then connectionAvailable }
        <Indicator color={connectionAvailable?'green':'red'}/>
      {/await}
      {#await data.remote.updatesAvailable}
        <Spinner size={'4'} />
      {:then updatesAvailable }
        {updatesAvailable === null ? 'Updates Check Failed' : 'Updates Check Complete'}
      {/await}
    </div>
  </div>
</div>