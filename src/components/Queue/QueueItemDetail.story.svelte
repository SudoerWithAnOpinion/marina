
<script lang='ts'>
	import {DateTime} from 'luxon';
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
			printerId: printers.idle.printerId,
			printer: printers.idle,
			eventType: 'SUBMITTED',
			createdAt: DateTime.now().plus({hours: -12}).toJSDate()
		} as JobEvent,
		printing: {
			eventId: '11111111-1111-1111-0000-111111111113',
			jobId: '11111111-1111-1111-9999-111111111111',
			printerId: printers.printing.printerId,
			printer: printers.printing,
			eventType: 'PRINTING',
			createdAt: DateTime.now().plus({hours: -10}).toJSDate()
		} as JobEvent,
		error: {
			eventId: '11111111-1111-1111-0000-111111111114',
			jobId: '11111111-1111-1111-9999-111111111111',
			printerId: printers.printing.printerId,
			printer: printers.printing,
			eventType: 'ERROR',
			createdAt: DateTime.now().plus({hours: -1}).toJSDate()
		} as JobEvent,
		cancelled: {
			eventId: '11111111-1111-1111-0000-111111111115',
			jobId: '11111111-1111-1111-9999-111111111111',
			printerId: printers.printing.printerId,
			printer: printers.printing,
			eventType: 'CANCELLED',
			createdAt: DateTime.now().plus({hours: -1}).toJSDate()
		} as JobEvent,
		paused: {
			eventId: '11111111-1111-1111-0000-111111111116',
			jobId: '11111111-1111-1111-9999-111111111111',
			printerId: printers.printing.printerId,
			printer: printers.printing,
			eventType: 'PAUSED',
			createdAt: DateTime.now().plus({hours: -4}).toJSDate()
		} as JobEvent,
		resumed: {
			eventId: '11111111-1111-1111-0000-111111111117',
			jobId: '11111111-1111-1111-9999-111111111111',
			printerId: printers.printing.printerId,
			printer: printers.printing,
			eventType: 'RESUMED',
			createdAt: DateTime.now().plus({hours: -5}).toJSDate()
		} as JobEvent,
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
		} as Job,
		printing: {
			jobId: '11111111-1111-1111-9999-111111111111',
			jobName: 'printing.gcode',
			createdAt: new Date(),
			updatedAt: new Date(),
			events: [
				jobEvents.submitted,
				jobEvents.printing
			]
		} as Job,
		error: {
			jobId: '11111111-1111-1111-9999-111111111111',
			jobName: 'printing.gcode',
			createdAt: DateTime.now().plus({hours: -1}).toJSDate(),
			updatedAt: DateTime.now().plus({hours: -1}).toJSDate(),
			events: [
				jobEvents.submitted,
				jobEvents.printing,
				jobEvents.error
			],
		} as Job,
		cancelled: {
			jobId: '11111111-1111-1111-9999-111111111111',
			jobName: 'printing.gcode',
			createdAt: DateTime.now().plus({hours: -1}).toJSDate(),
			updatedAt: DateTime.now().plus({hours: -1}).toJSDate(),
			events: [
				jobEvents.submitted,
				jobEvents.printing,
				jobEvents.paused,
				jobEvents.cancelled
			],
		} as Job,
	}
	let selectedJob: (keyof typeof jobs) = 'printing';
</script>

<Hst.Story title="Queue Item Detail" icon="carbon:task-settings">
	<svelte:fragment slot="controls">
		<Hst.Select title='Job State' bind:value={selectedJob} options={{
			idle: 'Idle',
			printing: 'Printing',
			error: 'Error',
			cancelled: 'Cancelled'
		}}
		/>
  </svelte:fragment>
	<QueueItemDetail job={jobs[selectedJob]}/>
	
</Hst.Story>