<script lang='ts'>
	import type { Hst } from '@histoire/plugin-svelte';
  import { Card } from 'flowbite-svelte';
	import JobTimeline from './JobTimeline.svelte';
	export let Hst: Hst;

  import { jobs } from '$tests/unit/mockData';
</script>

<Hst.Story title="Queue/Timeline/Job Timeline" icon="carbon:roadmap">
	{#each jobs as job}
    <Hst.Variant title={job.jobName}>
      <Card>
        <JobTimeline jobEvents={job.events} />
      </Card>
    </Hst.Variant>
  {/each}
</Hst.Story>