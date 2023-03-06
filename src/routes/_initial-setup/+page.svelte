<script lang='ts'>
  import { enhance, type SubmitFunction } from '$app/forms';
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
  import { newSetupUserSchema } from '$lib/Schemas/NewUser';

  import NewUser from '$components/User/NewUser.svelte';
  let doUserValidate: ()=>boolean;

  import type { PageData } from './$types';
  export let data: PageData;

  let step: number = 0;
  if (data.user_count > 0) step = 1;
  // if (data.printer_count > 0) step = 2;
  $: step;


//   const newPrinterSchema = z.object({
//     url: z.string().url(),
//     apiKey: z.optional(z.string()),
//   })

  let newUsername: string;
  let newPassword: string;
  let confirmPassword: string;

  let newPrinterName: string;
  let newPrinterURL: string;
  let newPrinterApiKeyRequired: boolean = false;
  let newPrinterApiKey: string;

  let doStepOneSubmit: SubmitFunction = ({form, data, action, cancel})=>{
    if(doUserValidate()===false) cancel();
  };

</script>

<Button kind="danger-tertiary" on:click={()=>{step=0}}> Step 0 </Button>
<Button kind="danger-tertiary" on:click={()=>{step=1}}> Step 1 </Button>

<div class='text-3xl'>Initial Setup</div>

{#if data.user_count > 0 && data.printer_count > 0}
  <InlineNotification 
    hideCloseButton
    kind='error'
    title='Error:'
    subtitle='Users & printers exist in database. Setup has already been completed.'
  />
  {console.error('Initial setup page was loaded, but users & printers exist in database.')}
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
    <ProgressStep label='Users' complete={step > 0} />
    <ProgressStep label='Printers' complete={step > 1}/>
    <ProgressStep label='Groups' complete={step > 3}/>
  </ProgressIndicator>
  
  <div class:hidden={step != 0}>
    <form use:enhance={doStepOneSubmit} method='POST' action='?/first_user'>
      <NewUser bind:newUsername bind:newPassword bind:confirmPassword bind:validate={doUserValidate} />
    </form>
  </div>

  <div class:hidden={step != 1}>
    <form use:enhance method='POST' action='?/first_printer'>
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
