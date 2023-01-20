<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import QueueItemDetail from './QueueItemDetail.svelte';
	export let Hst: Hst;

	import type { Printer, Job, JobEvent } from '$models';
	import { Select } from 'flowbite-svelte';

	const printers = {
		idle: {
			printerId: '11111111-1111-1111-1111-111111111111',
			name: 'Idle Printer'
		} as Printer,
		printing: {
			printerId: '11111111-1111-1111-1111-111111111112',
			name: 'Printing Printer'
		} as Printer
	}
	const jobEvents = {
		submitted: {
			eventId: '11111111-1111-1111-0000-111111111112',
			jobId: '11111111-1111-1111-9999-111111111111',
			printerId: printers.printing.printerId,
			printer: printers.idle,
			eventType: 'SUBMITTED',
			createdAt: new Date()
		} as JobEvent,
		printing: {
			eventId: '11111111-1111-1111-0000-111111111113',
			jobId: '11111111-1111-1111-9999-111111111111',
			printerId: printers.printing.printerId,
			printer: printers.printing,
			eventType: 'PRINTING',
			createdAt: new Date()
		} as JobEvent
	}
	const jobs = {
		idle: {
			jobId: '11111111-1111-1111-9999-111111111110',
			jobName: 'printing.gcode',
			createdAt: new Date(),
			updatedAt: new Date(),
			events: [
				jobEvents.submitted
			]
		} as unknown as Job,
		printing: {
			jobId: '11111111-1111-1111-9999-111111111111',
			jobName: 'printing.gcode',
			createdAt: new Date(),
			updatedAt: new Date(),
			events: [
				jobEvents.submitted,
				jobEvents.printing
			]
		} as unknown as Job,
	}
	let selectedJob: (keyof typeof jobs) = 'printing';
</script>

<Hst.Story title="Queue Item Detail" icon="carbon:tasksettings">
	<svelte:fragment slot="controls">
		<Hst.Select title='Job State' bind:value={selectedJob} options={{
			idle: 'Idle',
			printing: 'Printing'
		}}
		/>

  </svelte:fragment>
	<QueueItemDetail job={jobs[selectedJob]}/>
	
</Hst.Story>