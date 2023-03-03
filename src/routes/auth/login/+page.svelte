<script lang='ts'>
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  import { User, Password, Login } from 'carbon-icons-svelte';

  import { 
    Button, 
    TextInput, 
    PasswordInput
  } from 'carbon-components-svelte';

  export let form: ActionData;
  let userInvalid = false;
  let passwordInvalid = false;
  $: {
    userInvalid = (form?.username_missing === true);
    passwordInvalid = (form?.password_missing === true);
  }
</script>

<form use:enhance method='POST'>
  <TextInput labelText='Username' name='username' invalid={userInvalid} />
  <PasswordInput labelText='Password' name='password' invalid={passwordInvalid} />
  <Button type='submit' size='field' kind='primary' icon={Login}>Sign in</Button>
</form>