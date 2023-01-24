<script lang='ts'>
  import type { Hst } from '@histoire/plugin-svelte';
  import PrinterCard from './PrinterCard.svelte';

  export let Hst:Hst;

  let statesArray = ['idle', 'alert', 'printing', 'offline', 'paused', 'finished'];

</script>

<Hst.Story
  title='Printer Card'
  icon='carbon:printer'
  layout={{type:'grid', width: '100%'}}
>

  {#each statesArray as state}
    <Hst.Variant title={state}>
      <PrinterCard printer={{
        name: 'Some Printer', state,
        heaters: [
          {name: 'Hotend', currentTemp: Math.floor(Math.random() * 200), targetTemp: 200},
          {name: 'Bed', currentTemp: Math.floor(Math.random() * 60), targetTemp: 60},
        ]
      }} />
    </Hst.Variant>
  {/each}

</Hst.Story>