<script lang='ts'>
  import _ from 'lodash';
  import { Button, Card, Timeline, TimelineItem, ImagePlaceholder } from 'flowbite-svelte';
  import {CloudUpload, PlayFilledAlt, PauseFilled, StopFilledAlt, Misuse, ErrorFilled, ConditionPoint, UndefinedFilled } from 'carbon-icons-svelte';
	import type { JobEventType } from '$models/Jobs/JobEvent';
	import type Printer from '$models/Printers/Printer';

  /**
   * The job event to display in the timeline item.
   * Can provide a JobEvent object or a custom object with the same properties.
   */
  export let jobEvent: {
    eventType: JobEventType,
    createdAt: Date,
    printer?: Printer
  }; 
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
    {:else if jobEvent.eventType === 'ERROR'}
      <span class='
        flex absolute -left-3 justify-center items-center w-6 h-6 bg-rose-300
        rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-rose-700'>
        <Misuse />
      </span>
    {:else if jobEvent.eventType === 'CANCELLED'}
     <span class='
        flex absolute -left-3 justify-center items-center w-6 h-6 bg-yellow-900
        rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-yellow-900'>
      <ErrorFilled />
      </span>
    {:else if jobEvent.eventType === 'PRINT_DONE'}
      <span class='
        flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-500
        rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-500'>
      <ConditionPoint />
      </span>
    {:else if jobEvent.eventType === 'COMPLETED'}
      <span class='
        flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-900
        rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-green-900'>
        <UndefinedFilled />
      </span>
    {:else if jobEvent.eventType === 'FAILED'}
      <span class='
        flex absolute -left-3 justify-center items-center w-6 h-6 bg-orange-500
        rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-orange-900'>
        <UndefinedFilled />
      </span>
    {:else}
    <span class='flex absolute -left-3 justify-center items-center w-6 h-6 bg-slate-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-slate-700'>
     {#if jobEvent.eventType === 'SUBMITTED'}
        <CloudUpload/>
      {:else if jobEvent.eventType === 'PAUSED'}
        <PauseFilled />
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