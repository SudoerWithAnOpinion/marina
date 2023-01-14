<script lang='ts'>
  import { Card } from 'flowbite-svelte';

  export let printer: any; // Printer;

  let stateClass = '';
  switch (printer.state){
    case 'idle':
      stateClass = 'bg-slate-300';
      break;
    case 'alert':
      stateClass = 'bg-red-600';
      break;
    case 'printing':
      stateClass = 'bg-blue-700';
      break;
    case 'offline':
      stateClass = 'bg-gray-600';
      break;
    case 'paused':
      stateClass = 'bg-yellow-600';
      break;
    case 'finished':
      stateClass = 'bg-green-600';
      break;
  }

</script>

<Card color='none' class={stateClass}>
  <h5 class='mb-2 text-2xl font-bold tracing-tight'>{printer.name}</h5>
  <div class=''>(Camera Feed or Print Thumbnail)</div>
  <!-- Footer -->
  <div class='grid grid-cols-2 gap-1'>
    {#each printer.heaters as heater}
    <div>
      <div class='text-bold'>{heater.name}</div>
      <div>
        <span>{heater.currentTemp}</span><span class='text-sm'>°</span>
        / 
        <span>{heater.targetTemp}</span><span class='text-sm'>°</span>
      </div>
    </div>
    {/each}
</Card>