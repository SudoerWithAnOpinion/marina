<script lang='ts'>
  import { Button, Card, Timeline, TimelineItem, ImagePlaceholder } from 'flowbite-svelte';
  import JobTimelineItem from './JobTimelineItem.svelte';
  import type JobEvent from '$models/Jobs/JobEvent';

  type orderOpts = 'vertical' | 'horizontal';
  export let order:orderOpts = 'vertical';

  export let jobEvents: JobEvent[] = [];

  // Sort the jobEvents array by createdAt date
  $: {
    jobEvents.sort((a, b) => {
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
    jobEvents.reverse();
  }
  /**
   * The ID of the latest event in the jobEvents array.
   */
  const latestEventId = jobEvents[jobEvents.length - 1].eventId;


</script>

<Timeline order={order}>
  {#if jobEvents.length === 0}
    <TimelineItem title="No Events">
      No Events
    </TimelineItem>
  {:else}
    {#each jobEvents as jobEvent}
      <JobTimelineItem jobEvent={jobEvent} isLatest={(jobEvent.eventId === latestEventId)} />
    {/each}
  {/if}
</Timeline>