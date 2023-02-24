<!-- /printers -->
<script lang='ts'>
  import type { PageData } from './$types';
  export let data: PageData;
  import { Button } from 'flowbite-svelte';
  import { Launch, AddFilled } from 'carbon-icons-svelte';
</script>

<div>
  <div class='text-2xl'> Printers </div>
  <table>
    <thead></thead>
    <tbody>
      {#if data.printers.length > 0}
        {#each data.printers as printer}
          <tr>
            <td>
              <a href="/printers/{printer.printerId}">{printer.name}</a>
            </td>
            <td>
              <a href="{printer.address}">{printer.address} <Launch /> </a> 
            </td>
          </tr>
        {/each}
      {:else}
        <tr>
          <td colspan="2">
            No printers found, <Button size='sm' color='blue'><AddFilled /> add one</Button>
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>