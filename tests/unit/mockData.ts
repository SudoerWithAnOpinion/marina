import type Printer from '$models/Printers/Printer';
import type Job from '$models/Jobs/Job';
import type JobEvent from '$models/Jobs/JobEvent';


export const printers: Printer[] = [
  {
    printerId: '6d433b7c-8805-4d31-87bf-ea8eec033c53',
    name: 'Fauxron 2.4',
    description: 'Fauxron 3D Printer',
    address: 'localhost',
    volume: '{x:220,y:220,z:220}',
    createdAt: new Date('2023-01-01T00:00:00.000Z'),
    updatedAt: new Date('2023-01-01T00:00:00.000Z'),
  } as Printer
];

export const jobEvents: JobEvent[] = [
  {
    eventId: '293e64eb-1144-40b7-8f71-a5cbf5d44ecf',
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    eventType: 'SUBMITTED',
    printerId: '6d433b7c-8805-4d31-87bf-ea8eec033c53',
    printer: printers[0],
    createdAt: new Date('2023-01-01T00:10:00.000Z'),
    updatedAt: new Date('2023-01-01T00:10:00.000Z'),
  } as JobEvent,
  {
    eventId: '68c7a842-b5e4-42c7-b512-6f3572a9152d',
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    eventType: 'PRINTING',
    printerId: '6d433b7c-8805-4d31-87bf-ea8eec033c53',
    printer: printers[0],
    createdAt: new Date('2023-01-01T00:10:02.000Z'),
    updatedAt: new Date('2023-01-01T00:10:02.000Z'),
  } as JobEvent,
  {
    eventId: '22877185-6d3e-4135-8817-18284c078a09',
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    eventType: 'PAUSED',
    printerId: '6d433b7c-8805-4d31-87bf-ea8eec033c53',
    printer: printers[0],
    createdAt: new Date('2023-01-01T00:11:00.000Z'),
    updatedAt: new Date('2023-01-01T00:11:00.000Z'),
  } as JobEvent,
  {
    eventId: '919b40ec-0adc-4077-9a04-bc6d005af800',
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    eventType: 'RESUMED',
    printerId: '6d433b7c-8805-4d31-87bf-ea8eec033c53',
    printer: printers[0],
    createdAt: new Date('2023-01-01T00:11:40.000Z'),
    updatedAt: new Date('2023-01-01T00:11:40.000Z'),
  } as JobEvent,
  {
    eventId: '0b389061-2fdb-4090-b716-657b99846b95',
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    eventType: 'CANCELLED',
    printerId: '6d433b7c-8805-4d31-87bf-ea8eec033c53',
    printer: printers[0],
    createdAt: new Date('2023-01-01T00:12:00.000Z'),
    updatedAt: new Date('2023-01-01T00:12:00.000Z'),
  } as JobEvent,
  {
    eventId: '0b389061-2fdb-4090-b716-657b99846b95',
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    eventType: 'PRINT_DONE',
    printerId: '6d433b7c-8805-4d31-87bf-ea8eec033c53',
    printer: printers[0],
    createdAt: new Date('2023-01-01T00:15:00.000Z'),
    updatedAt: new Date('2023-01-01T00:15:00.000Z'),
  } as JobEvent,
  {
    eventId: '6a24424e-4dbe-44c6-a5b4-37d5ae79f617',
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    eventType: 'FAILED',
    createdAt: new Date('2023-01-01T00:15:00.000Z'),
    updatedAt: new Date('2023-01-01T00:15:00.000Z'),
  } as JobEvent,
  {
    eventId: '263ea350-7462-4a44-af63-82541ce09917',
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    eventType: 'COMPLETED',
    createdAt: new Date('2023-01-01T00:15:40.000Z'),
    updatedAt: new Date('2023-01-01T00:15:40.000Z'),
  } as JobEvent,
];
export const jobs: Job[] = [
  {
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    jobName: 'Test Job (Submitted)',
    createdAt: new Date('2023-01-01T00:05:00.000Z'),
    updatedAt: new Date('2023-01-01T00:05:00.000Z'),
    events: [
      jobEvents[0]
    ]
  } as Job,
  {
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    jobName: 'Test Job (Paused & Cancelled)',
    createdAt: new Date('2023-01-01T00:05:00.000Z'),
    updatedAt: new Date('2023-01-01T00:05:00.000Z'),
    events: [
      jobEvents[0],
      jobEvents[1],
      jobEvents[2],
      jobEvents[5],
    ]
  } as Job,
  {
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    jobName: 'Test Job (Failed)',
    createdAt: new Date('2023-01-01T00:05:00.000Z'),
    updatedAt: new Date('2023-01-01T00:05:00.000Z'),
    events: [
      jobEvents[0],
      jobEvents[1],
      jobEvents[2],
      jobEvents[5],
      jobEvents[6],
    ]
  } as Job,
  {
    jobId: 'bfc07ad6-0867-4dde-9c22-4c3832464d38',
    jobName: 'Test Job (Completed)',
    createdAt: new Date('2023-01-01T00:05:00.000Z'),
    updatedAt: new Date('2023-01-01T00:05:00.000Z'),
    events: [
      jobEvents[0],
      jobEvents[1],
      jobEvents[2],
      jobEvents[3],
      jobEvents[5],
      jobEvents[7],
    ]
  } as Job
];