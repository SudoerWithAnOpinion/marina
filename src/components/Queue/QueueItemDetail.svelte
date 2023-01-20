<script lang='ts'>
import { Button, Card, Timeline, TimelineItem, ImagePlaceholder } from 'flowbite-svelte';
import type { Job } from '$models';
export let job: Job;

</script>


<div class='px-5 py-1'>
<div class='mb-3'>
	<Card img="/images/image-1.webp" horizontal>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{job.jobName}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
      Some Job Details
    </p>
  </Card>
</div>
  <Card>
		<Timeline order="vertical">
      {#if job.events === undefined || job.events === null || job.events.length === 0}
        <TimelineItem title="No Events">
					No Events
				</TimelineItem>
      {:else}
        {#each job.events as event}
          <TimelineItem title={event.eventType} date={event.createdAt.toISOString()}>
            {#if event.printer !== undefined}
              <p>Handling Printer: {(event.printer).name}</p>
            {/if}
          </TimelineItem>
        {/each}
      {/if}
    </Timeline>
	</Card>
</div>  