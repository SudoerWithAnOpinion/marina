<script lang='ts'>
  import {
    Button, 
    TextInput, 
    PasswordInput,
  } from 'carbon-components-svelte';
  import { 
    UserFollow,
  } from 'carbon-icons-svelte';
  import { z } from 'zod';

  const newUserSchema = z.object({
    username: z.string().min(4, 'Username must be at least 4 characters long'),
    newPassword: z.string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be at most 64 characters long'),
    confirmPassword: z.string(),
  }).superRefine(({newPassword, confirmPassword}, ctx)=>{
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password and confirm password do not match',
      });
    }
  });


  export let newUsername: string;
  export let newPassword: string;
  export let confirmPassword: string;

  let submitDisabled: boolean = true;
  $: {
    
  }

</script>

<div class='text-xl'>New User</div>
<TextInput 
  labelText='Username' 
  helperText='Choose a name to login with. Spaces and special characters are not permitted.'
  name='username' 
  autocomplete='username'
  bind:value={newUsername}
/>
<div class='mb-8' />
<PasswordInput 
  labelText='Password' 
  helperText='Passwords must be at least 8 characters long.'
  name='new-password' 
  autocomplete='new-password' 
  bind:value={newPassword}
/>
<div class='mb-8' />
<PasswordInput 
  labelText='Password' 
  name='confirm-password' 
  helperText='Retype your password to confirm.'
  autocomplete='confirm-password' 
  bind:value={confirmPassword}
/>
<div class='mb-8' />
<Button type='submit' size='field' kind='primary' icon={UserFollow}>Create User</Button>
