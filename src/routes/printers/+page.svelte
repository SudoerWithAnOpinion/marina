<!-- /printers -->
<script lang='ts'>
  import type { PageData } from './$types';
  export let data: PageData;

  import { Launch } from 'carbon-icons-svelte';
</script>

<div>
  <div class='text-2xl'> Printers </div>
  <table>
    <thead></thead>
    <tbody>
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
    </tbody>
  </table>
</div>