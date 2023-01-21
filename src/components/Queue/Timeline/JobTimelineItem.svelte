<script lang='ts'>
  import _ from 'lodash';
  import { Button, Card, Timeline, TimelineItem, ImagePlaceholder } from 'flowbite-svelte';
  import {CloudUpload, PlayFilledAlt, PauseFilled, StopFilledAlt, Misuse, ErrorFilled } from 'carbon-icons-svelte';
  import type JobEvent from '$models/Jobs/JobEvent';

  export let jobEvent: JobEvent; 
  export const isLatest: boolean = false;

</script>

<TimelineItem title={_.startCase(jobEvent.eventType.toLowerCase())} date={jobEvent.createdAt.toISOString()}>
  <svelte:fragment slot='icon'>
    {#if jobEvent.eventType === 'PRINTING'}
      <span class='
        flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-300 
        rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-800'>
        <PlayFilledAlt/>
      </span>  
    {:else}
    <span class='flex absolute -left-3 justify-center items-center w-6 h-6 bg-slate-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-slate-700'>
     {#if jobEvent.eventType === 'SUBMITTED'}
        <CloudUpload/>
      {:else if jobEvent.eventType === 'PAUSED'}
        <PauseFilled />
      {:else if jobEvent.eventType === 'CANCELLED'}
        <ErrorFilled />
      {:else if jobEvent.eventType === 'ERROR'}
        <Misuse class='text-rose-500' />
      {/if}
    </span>
    {/if}
  </svelte:fragment>
  <p>
  {#if jobEvent.eventType === 'SUBMITTED'}
      <strong>Sent to:</strong> {jobEvent.printer?.name}
  {:else if jobEvent.eventType === 'PRINTING'}
    <strong>Printing on:</strong> {jobEvent.printer?.name}
  {:else if jobEvent.eventType === 'PAUSED'}
    <strong>Paused on:</strong> {jobEvent.printer?.name}
  {:else if jobEvent.eventType === 'CANCELLED'}
    <strong>Cancelled on:</strong> {jobEvent.printer?.name}
  {:else if jobEvent.eventType === 'ERROR'}
      <strong class='text-rose-500'>Error</strong>
      {jobEvent.printer?.name}
  {/if}
  </p>
</TimelineItem>