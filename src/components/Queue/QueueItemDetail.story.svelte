<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import QueueItemDetail from './QueueItemDetail.svelte';

	export let Hst: Hst;

</script>

<Hst.Story title="QueueItemDetail" icon="carbon:tasksettings">
	<QueueItemDetail />
</Hst.Story>
