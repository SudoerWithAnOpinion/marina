<script lang='ts'>
  import { Button, Card, Timeline, TimelineItem, ImagePlaceholder } from 'flowbite-svelte';
  import { Progressbar } from 'flowbite-svelte';

  /**
   * The progress of the progress bar.
   * @type {string|number} A number between 0 and 100.
   * @default 0
   */
  export const progress:string|number = 0;

  type stateString = 'unknown' | 'printing' | 'paused' | 'stopped';
  export let state:stateString = 'unknown';
  type stateColor = 'blue' | 'yellow' | 'green' | 'red' | 'gray';
  let stateColor:stateColor = 'blue';
  $: {
    switch (state) {
      case 'unknown':
        stateColor = 'gray';
        break;
      case 'printing':
        stateColor = 'green';
        break;
      case 'paused':
        stateColor = 'yellow';
        break;
      case 'stopped':
        stateColor = 'red';
        break;
      default:
        stateColor = 'blue';
        break;
    }
  }
</script>


<Progressbar progress={String(progress)} color={stateColor} size='h-5' labelInside={true} />