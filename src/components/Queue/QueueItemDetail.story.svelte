
<script lang='ts'>
	import type { Hst } from '@histoire/plugin-svelte';
	import { jobs } from '$tests/unit/mockData';
	import QueueItemDetail from './QueueItemDetail.svelte';
	
	export let Hst: Hst;

	$: selectedJobIndex = '0';
	$: selectedJob = jobs[parseInt(selectedJobIndex)];
	$:{
		console.log(selectedJobIndex);
	}

	const selections = jobs.map((job, index) => {
		return {
			label: job.jobName,
			value: index.toString()
		}
	});
</script>

<Hst.Story title="Queue/Queue Item Detail" icon="carbon:row">
	<svelte:fragment slot="controls">
		<Hst.Select title='Job' bind:value={selectedJobIndex} options={selections}
		/>
  </svelte:fragment>
	<QueueItemDetail job={selectedJob}/>
	
</Hst.Story>