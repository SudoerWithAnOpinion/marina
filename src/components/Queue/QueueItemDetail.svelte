<script lang='ts'>
import { Button, Card } from 'flowbite-svelte';
import JobTimeline from './Timeline/JobTimeline.svelte';
import ProgressBar from './ProgressBar.svelte';
import type { Job } from '$models';
export let job: Job;

</script>


<div class='--queue-item-detail-container px-5 py-1'>
<div class='mb-3'>
	<Card img="/images/image-1.webp" horizontal>
    <ProgressBar />
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{job.jobName}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
      Some Job Details
    </p>
  </Card>
</div>
  <Card class='--queue-item-detail-timeline-container'>
    <JobTimeline jobEvents={job.events} />
	</Card>
</div>  