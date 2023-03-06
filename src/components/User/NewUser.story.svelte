<script lang='ts'>
  import type { Hst } from '@histoire/plugin-svelte';

  import NewUser from './NewUser.svelte';

  export let Hst: Hst;
  
  let newUsername: string;
  let newPassword: string;
  let confirmPassword: string;

</script>

<Hst.Story
  title='New User'
  icon='carbon:user-follow'
  layout={{type:'grid', width: '100%'}}
>

<NewUser 
  bind:newUsername
  bind:newPassword
  bind:confirmPassword
/>

</Hst.Story>
