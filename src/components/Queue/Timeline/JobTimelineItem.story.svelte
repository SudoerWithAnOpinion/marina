<script lang='ts'>
	import type { Hst } from '@histoire/plugin-svelte';
	import {jobEvents} from '$tests/unit/mockData';
	import {Card, Timeline} from 'flowbite-svelte';
	import JobTimelineItem from './JobTimelineItem.svelte';
	
	export let Hst: Hst;
	let isLatest = false;
</script>

<Hst.Story title="Queue/Timeline/Job Timeline Item" icon="carbon:progress-bar">
	<svelte:fragment slot="controls">
		<Hst.Checkbox title='isLatest' bind:value={isLatest} />
	</svelte:fragment>
	{#each jobEvents as jobEvent}
		<Hst.Variant title={jobEvent.eventType} >
			<Card>
				<Timeline order='vertical'>
					<JobTimelineItem jobEvent={jobEvent} isLatest={isLatest}/>
				</Timeline>
			</Card>
		</Hst.Variant>
	{/each}
</Hst.Story>