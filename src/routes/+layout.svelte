<script lang='ts'>
  import { page } from '$app/stores';
  import { handleSession } from "@lucia-auth/sveltekit/client";
  import '../app.css';
  import {Content, Theme} from 'carbon-components-svelte'
  import Header from '$components/Header/Header.svelte';
  handleSession(page);

  let theme = "g90"

</script>
<Theme bind:theme />
<Header />
<Content>
  <slot />
</Content>