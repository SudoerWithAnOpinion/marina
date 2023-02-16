<script lang='ts'>
  import type { Hst } from '@histoire/plugin-svelte';
  import { materials } from '$tests/unit/mockData';

  import SpoolCard from './SpoolCard.svelte';

  export let Hst: Hst;
  
</script>

<Hst.Story
  title='Spool Card'
  icon='carbon:3d-cursor-alt'
  layout={{type:'grid', width: '100%'}}
>

<SpoolCard material={materials[0]}/>

</Hst.Story>