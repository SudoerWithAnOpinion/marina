<script lang='ts'>
  import {
    Button, 
    TextInput, 
    PasswordInput,
  } from 'carbon-components-svelte';
  import { 
    CheckmarkFilled,
    Connect,
    ErrorFilled,
    UserFollow,
  } from 'carbon-icons-svelte';
  
  import { 
    username as zUsername, 
    usernameValidator,
  } from '$lib/Schemas/User/Username';
  import {password as zPassword} from '$lib/Schemas/User/Password';

  export let newUsername: string;
  let newUserWarn = false;
  let newUserWarnText: string | undefined;
  export let newPassword: string;
  let newPasswordWarn = false;
  let newPasswordWarnText: string | undefined;
  export let confirmPassword: string;
  let confirmPasswordWarn = false;
  let confirmPasswordWarnText: string | undefined;
  export let disabled = false;
  

  const doValidate = {
    all: () => {
      if ([
        doValidate.username(),
        doValidate.newPassword(),
        doValidate.confirmPassword()
      ].every((v) => v)) {
        return true;
      } else {
        return false;
      }

    },
    username: () => {
      const validation = usernameValidator.safeParse(newUsername);
      if(validation.success){
        newUserWarnText = undefined;
        newUserWarn = false;
        return true;
      }else{
        newUserWarnText = validation.error.format()._errors.join('. ');
        newUserWarn = true;
        return false;
      }
    },
    newPassword: () => {
      const validation = zPassword.safeParse(newPassword);
      if(validation.success){
        newPasswordWarnText = undefined;
        newPasswordWarn = false;
        return true;
      }else{
        newPasswordWarnText = validation.error.format()._errors.join('. ');
        newPasswordWarn = true;
        return false;
      }
    },
    confirmPassword: () => {
      const validation = zPassword.safeParse(confirmPassword);
      if(validation.success){
        confirmPasswordWarnText = undefined;
        confirmPasswordWarn = false;
        return true;
      }else{
        confirmPasswordWarnText = validation.error.format()._errors.join('. ');
        confirmPasswordWarn = true;
        return false;
      }
    },
  };
  export const validate = () => {return doValidate.all()};


</script>

<div class='text-xl'>New User</div>
<div class='mb-8' />
<TextInput 
  labelText='Username' 
  helperText='Choose a name to login with. Spaces and special characters are not permitted.'
  name='username' 
  autocomplete='username'
  bind:value={newUsername}
  bind:warnText={newUserWarnText}
  bind:warn={newUserWarn}
/>
<div class='mb-8' />
<PasswordInput 
  labelText='Password' 
  helperText='Passwords must be at least 8 characters long.'
  name='new-password' 
  autocomplete='new-password'
  bind:value={newPassword}
  bind:warnText={newPasswordWarnText}
  bind:warn={newPasswordWarn}
/>
<div class='mb-8' />
<PasswordInput 
  labelText='Password' 
  name='confirm-password' 
  helperText='Retype your password to confirm.'
  autocomplete='confirm-password' 
  bind:value={confirmPassword}
  bind:warnText={confirmPasswordWarnText}
  bind:warn={confirmPasswordWarn}
/>
<div class='mb-8' />
<Button 
  type='submit' 
  size='field' 
  kind='primary' 
  icon={UserFollow} 
  bind:disabled
>Create User</Button>
