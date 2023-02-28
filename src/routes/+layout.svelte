<script lang='ts'>
  import { page } from '$app/stores';
  import { handleSession } from "@lucia-auth/sveltekit/client";
  import '../app.css';
  import Navbar from '$components/Navbar/Navbar.svelte';
  
  handleSession(page);
</script>

<Navbar />
<slot />