<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms';
  import {
    Button,
    ButtonSet,
    Loading,
    ProgressIndicator,
    ProgressStep,
    InlineNotification,
    Toggle
  } from 'carbon-components-svelte';
  import { AddFilled, NextOutline, UserFollow, Locked, Unlocked } from 'carbon-icons-svelte';
  import type { PageData, ActionData } from './$types';
  import NewUser from '$components/User/NewUser.svelte';
  import NewPrinter from '$components/Printer/NewPrinter.svelte';

  let doUserValidate: () => boolean;
  let doPrinterValidate: () => boolean;

  export let data: PageData;
  export let form: ActionData;
  $: loading = false;

  $: console.log(form);
  let step: number = 0;
  // Kick to the next step if users already exist
  if (data.user_count > 0) step = 1;
  // Kick to the next step is printers already exist (or skipped)
  // TODO!
  // if (data.printer_count > 0) step = 2;
  $: step;

  let newUsername: string;
  let newPassword: string;
  let confirmPassword: string;

  let newPrinterName: string;
  let newPrinterDescription: string;
  let newPrinterURL: string;
  let newPrinterConnectionType: 'none' | 'moonraker' | 'octoprint';
  let newPrinterApiKeyRequired: boolean = false;
  let newPrinterApiKey: string;

  let doStepOneSubmit: SubmitFunction = ({ form, data, action, cancel }) => {
    loading = true;
    console.debug('[Step 0/User]: Submit New User');
    if (doUserValidate() === false) {
      console.debug('[Step 0/User]: User validation failed, submission aborted');
      cancel();
      loading = false;
    }
    console.debug('[Step 0/User]: User validated');

    return async ({ result, update }) => {
      loading = false;
      if (result.status === 200) step++;
      await update();
    };
  };
  let doStepTwoSubmit: SubmitFunction = ({ form, data, action, cancel }) => {
    loading = true;
    console.debug('[Step 1/Printer: Submit New Printer');

    if (doPrinterValidate() === false) {
      console.debug('[Step 1/Printer]: Printer validation failed, submission aborted');
      cancel();
      loading = false;
    }
    return async ({ result, update }) => {
      loading = false;
      if (result.status === 200) step++;
      await update();
    };
  };
</script>

<Loading active={loading} />

<Button
  kind="danger-tertiary"
  on:click={() => {
    step = 0;
  }}
>
  Step 0
</Button>
<Button
  kind="danger-tertiary"
  on:click={() => {
    step = 1;
  }}
>
  Step 1
</Button>

<div class="text-3xl">Initial Setup</div>

{#if data.user_count > 0 && data.printer_count > 0}
  <InlineNotification
    hideCloseButton
    kind="error"
    title="Error:"
    subtitle="Users & printers exist in database. Setup has already been completed."
  />
  {console.error('Initial setup page was loaded, but users & printers exist in database.')}
{:else}
  <InlineNotification
    hideCloseButton
    kind="success"
    title="Ready:"
    subtitle="Application is ready for first-time setup."
  />
  <ProgressIndicator class="mb-8" preventChangeOnClick currentIndex={step}>
    <ProgressStep label="Users" complete={step > 0} />
    <ProgressStep label="Printers" complete={step > 1} />
    <!-- <ProgressStep label='Groups' complete={step > 3}/> -->
  </ProgressIndicator>

  <div class:hidden={step != 0}>
    <form use:enhance={doStepOneSubmit} method="POST" action="?/first_user">
      <NewUser
        bind:newUsername
        bind:newPassword
        bind:confirmPassword
        bind:validate={doUserValidate}
      />
    </form>
  </div>

  <div class:hidden={step != 1}>
    <form use:enhance={doStepTwoSubmit} method="POST" action="?/first_printer">
      <NewPrinter
        bind:name={newPrinterName}
        bind:description={newPrinterDescription}
        bind:url={newPrinterURL}
        bind:connectionType={newPrinterConnectionType}
        bind:apiKeyRequired={newPrinterApiKeyRequired}
        bind:apiKey={newPrinterApiKey}
        bind:validate={doPrinterValidate}
      />
    </form>
  </div>
{/if}
