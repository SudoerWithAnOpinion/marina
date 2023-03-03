<script lang="ts">
  import { enhance } from '$app/forms';
  import { env } from '$env/dynamic/public';
</script>

<form use:enhance method="POST" action={`${env.PUBLIC_BASE_PATH}/auth/logout`}>
  <input type="submit" class="button" value="Sign out" />
</form>
