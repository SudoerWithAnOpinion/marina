<script lang='ts'>
	import {DateTime} from 'luxon';
	import type { Hst } from '@histoire/plugin-svelte';
	import {Timeline} from 'flowbite-svelte';
	import JobTimelineItem from './JobTimelineItem.svelte';
	export let Hst: Hst;

	import type JobEvent from '$models/Jobs/JobEvent';
	import type { JobEventType } from '$models/Jobs/JobEvent';


	export let selectedEventType: JobEventType = 'SUBMITTED';

	const jobEvents = {
		SUBMITTED: {
			eventType: 'SUBMITTED',
			eventId: '11111111-1111-1111-1111-111111111111',
			printerId: '11111111-1111-1111-1111-111111111111',
			jobId: '11111111-1111-1111-1111-111111111111',
			printer: {
				name: 'Printer 1',
				createdAt: DateTime.now().plus({hours: -12}).toJSDate(),
				updatedAt: DateTime.now().plus({hours: -12}).toJSDate(),
			},
			createdAt: DateTime.now().plus({hours: -12}).toJSDate(),
			updatedAt: DateTime.now().plus({hours: -12}).toJSDate(),
		} as JobEvent,
		PRINTING: {
			eventType: 'PRINTING',
			eventId: '11111111-1111-1111-1111-111111111111',
			printerId: '11111111-1111-1111-1111-111111111111',
			jobId: '11111111-1111-1111-1111-111111111111',
			printer: {
				name: 'Printer 1',
				createdAt: DateTime.now().plus({hours: -10}).toJSDate(),
				updatedAt: DateTime.now().plus({hours: -10}).toJSDate(),
			},
			createdAt: DateTime.now().plus({hours: -10}).toJSDate(),
			updatedAt: DateTime.now().plus({hours: -10}).toJSDate(),
		} as JobEvent,
		PAUSED: {
			eventType: 'PAUSED',
			eventId: '11111111-1111-1111-1111-111111111111',
			printerId: '11111111-1111-1111-1111-111111111111',
			jobId: '11111111-1111-1111-1111-111111111111',
			printer: {
				name: 'Printer 1',
				createdAt: DateTime.now().plus({hours: -6}).toJSDate(),
				updatedAt: DateTime.now().plus({hours: -6}).toJSDate(),
			},
			createdAt: DateTime.now().plus({hours: -6}).toJSDate(),
			updatedAt: DateTime.now().plus({hours: -6}).toJSDate(),
		} as JobEvent,
		CANCELLED: {
			eventType: 'CANCELLED',
			eventId: '11111111-1111-1111-1111-111111111111',
			printerId: '11111111-1111-1111-1111-111111111111',
			jobId: '11111111-1111-1111-1111-111111111111',
			printer: {
				name: 'Printer 1',
				createdAt: DateTime.now().plus({hours: -2}).toJSDate(),
				updatedAt: DateTime.now().plus({hours: -2}).toJSDate(),
			},
			createdAt: DateTime.now().plus({hours: -2}).toJSDate(),
			updatedAt: DateTime.now().plus({hours: -2}).toJSDate(),
		} as JobEvent,
		ERROR: {
			eventType: 'ERROR',
			eventId: '11111111-1111-1111-1111-111111111111',
			printerId: '11111111-1111-1111-1111-111111111111',
			jobId: '11111111-1111-1111-1111-111111111111',
			printer: {
				name: 'Printer 1',
				createdAt: DateTime.now().plus({hours: -1}).toJSDate(),
				updatedAt: DateTime.now().plus({hours: -1}).toJSDate(),
			},
			createdAt: DateTime.now().plus({hours: -1}).toJSDate(),
			updatedAt: DateTime.now().plus({hours: -1}).toJSDate(),
		} as JobEvent,
		PRINT_DONE: {
			eventType: 'PRINT_DONE',
			eventId: '11111111-1111-1111-1111-111111111111',
			printerId: '11111111-1111-1111-1111-111111111111',
			jobId: '11111111-1111-1111-1111-111111111111',
			printer: {
				name: 'Printer 1',
				createdAt: DateTime.now().plus({hours: -1}).toJSDate(),
				updatedAt: DateTime.now().plus({hours: -1}).toJSDate(),
			},
			createdAt: DateTime.now().plus({hours: -1}).toJSDate(),
			updatedAt: DateTime.now().plus({hours: -1}).toJSDate(),
		} as JobEvent,
		FAILED: {
			eventType: 'FAILED',
			eventId: '11111111-1111-1111-1111-111111111111',
			printerId: '11111111-1111-1111-1111-111111111111',
			jobId: '11111111-1111-1111-1111-111111111111',
			printer: {
				name: 'Printer 1',
				createdAt: DateTime.now().toJSDate(),
				updatedAt: DateTime.now().toJSDate(),
			},
			createdAt: DateTime.now().toJSDate(),
			updatedAt: DateTime.now().toJSDate(),
		} as JobEvent,
		COMPLETED: {
			eventType: 'COMPLETED',
			eventId: '11111111-1111-1111-1111-111111111111',
			printerId: '11111111-1111-1111-1111-111111111111',
			jobId: '11111111-1111-1111-1111-111111111111',
			printer: {
				name: 'Printer 1',
				createdAt: DateTime.now().toJSDate(),
				updatedAt: DateTime.now().toJSDate(),
			},
			createdAt: DateTime.now().toJSDate(),
			updatedAt: DateTime.now().toJSDate(),
		} as JobEvent,
	} as Record<string, JobEvent>;

</script>

<Hst.Story title="Job Timeline Item" icon="carbon:task-settings">
	<svelte:fragment slot="controls">
		<Hst.Select title='Job State' bind:value={selectedEventType} options={{
			SUBMITTED: 'Submitted',
			PRINTING: 'Printing',
			ERROR: 'Errror',
			COMPLETED: 'Completed',
			CANCELLED: 'Cancelled',
			PAUSED: 'Paused',
			RESUMED: 'Resumed',
			PRINT_DONE: 'Print Done',
			FAILED: 'Failed',
		}}
		/>

  </svelte:fragment>
	<div class='p-5'>
		<Timeline order='vertical'>
			<JobTimelineItem jobEvent={jobEvents[selectedEventType]} />
		</Timeline>
	</div>
</Hst.Story>