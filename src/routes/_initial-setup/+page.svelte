<script lang='ts'>
  import { enhance } from '$app/forms';
  import {
    Button, 
    ButtonSet,
    TextInput, 
    PasswordInput,
    ProgressIndicator,
    ProgressStep,
    InlineNotification,
    Toggle,
  } from 'carbon-components-svelte';
  import { 
    AddFilled,
    NextOutline,
    UserFollow,
    Locked,
    Unlocked,
  } from 'carbon-icons-svelte';
  import { z } from 'zod';

  import NewUser from '$components/User/NewUser.svelte';

  import type { PageData } from './$types';
  export let data: PageData;

  let step: number = 0;
  $: step;

  const newUserSchema = z.object({
    username: z.string().min(4, 'Username must be at least 4 characters long'),
    newPassword: z.string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be at most 64 characters long'),
    confirmPassword: z.string(),
  });

  const newPrinterSchema = z.object({
    url: z.string().url(),
    apiKey: z.optional(z.string()),
  })

  let newUsername: string;
  let newUsernameInvalid: boolean = false;
  let newPassword: string;
  let confirmPassword: string;
  async function checkUser(){
    const newUser = {
      username: newUsername,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    const result = newUserSchema.parse(newUser); 
    console.debug(result);
  }

  let newPrinterName: string;
  let newPrinterURL: string;
  let newPrinterApiKeyRequired: boolean = false;
  let newPrinterApiKey: string;

  async function checkPrinter(){

  }

</script>

<Button kind="danger-tertiary" on:click={()=>{step=0}}> Step 0 </Button>
<Button kind="danger-tertiary" on:click={()=>{step=1}}> Step 1 </Button>

{#if data.user_count > 0}
  <InlineNotification 
    hideCloseButton
    kind='error'
    title='Error:'
    subtitle='Users exist in database. Setup has already been completed.'
  />
{:else}
  <InlineNotification 
  hideCloseButton
  kind='success'
  title='Ready:'
  subtitle='Application is ready for first-time setup.'
  />
  <ProgressIndicator 
    class='mb-8'
    preventChangeOnClick 
    currentIndex={step}
  >
    <ProgressStep label='Users' />
    <ProgressStep label='Printers' />
    <ProgressStep label='Groups' />
  </ProgressIndicator>
  
  <div class:hidden={step != 0}>
    <form use:enhance method='POST' action='?first_user'>
      <NewUser bind:newUsername bind:newPassword bind:confirmPassword />
    </form>
  </div>

  <div class:hidden={step != 1}>
    <form use:enhance method='POST' action='?first_printer'>
      <div class='text-xl'>New Printer</div>
      <TextInput 
        labelText='Printer Address' 
        helperText="Enter your printer's access URL with protocol, ex: http://mainsail.local"
        name='printer_url' 
        autocomplete='off'
      />
      <Toggle bind:toggled={newPrinterApiKeyRequired} labelText='Use API Key'>
        <span slot='labelA'><Unlocked class='inline' /> No API Key</span>
        <span slot='labelB'><Locked class='inline' /> Requires API Key</span>
      </Toggle>
      <PasswordInput 
        labelText='API Key' 
        name='api_key' 
        autocomplete='off'
        disabled={!newPrinterApiKeyRequired}
      />
      <ButtonSet>
        <Button type='submit' size='field' kind='secondary' icon={NextOutline}>Skip for Now</Button>
        <Button type='submit' size='field' kind='primary' icon={AddFilled}>Create Printer</Button>
      </ButtonSet>
    </form>
  </div>

{/if}