<script lang='ts'>
  import { enhance, type SubmitFunction } from '$app/forms';
  import {
    Button, 
    ButtonSet,
    Loading,
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
  import type { PageData, ActionData } from './$types';
  import NewUser from '$components/User/NewUser.svelte';
  import NewPrinter from '$components/Printer/NewPrinter.svelte';

  let doUserValidate: ()=>boolean;

  export let data: PageData;
  export let form: ActionData;
  $: loading = false;

  $: console.log(form);
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
  let newPrinterDescription: string;
  let newPrinterURL: string;
  let newPrinterConnectionType: 'none' | 'moonraker' | 'octoprint';
  let newPrinterApiKeyRequired: boolean = false;
  let newPrinterApiKey: string;

  let doStepOneSubmit: SubmitFunction = ({form, data, action, cancel})=>{
    loading = true;
    console.debug('[Step 0/User]: Submit New User');
    if(doUserValidate()===false) {
      console.debug('[Step 0/User]: User validation failed, submission aborted');
      cancel();
    }
    console.debug('[Step 0/User]: User validated');

    return async ({result, update})=>{
      loading = false;
      step++;
      await update();
    }

  };

</script>
<Loading active={loading} />

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
      <NewPrinter 
        bind:name={newPrinterName} 
        bind:description={newPrinterDescription}
        bind:url={newPrinterURL} 
        bind:connectionType={newPrinterConnectionType}
        bind:apiKeyRequired={newPrinterApiKeyRequired}
        bind:apiKey={newPrinterApiKey} />
    </form>
  </div>

{/if}
{#if form}
  <div>
    <div>{form.severity}</div>
    <div>{form.body}</div>
    <div>{form.status}</div>
    <div>{form.message}</div>
  </div>
{/if}