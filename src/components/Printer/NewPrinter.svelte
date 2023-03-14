<script lang="ts">
  import {
    Button,
    ButtonSet,
    PasswordInput,
    Modal,
    Select,
    SelectItem,
    TextInput,
    Toggle
  } from 'carbon-components-svelte';
  import { AddFilled, NextOutline, Locked, Unlocked } from 'carbon-icons-svelte';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import { newPrinterSchema } from '$lib/Schemas/NewPrinter';

  const doValidate = {
    all: () => {
      console.log('Printer: Do Validate');
      return [doValidate.name(), doValidate.url()].every(Boolean);
    },
    name: () => {
      const validation = newPrinterSchema.shape.name.safeParse(name);
      if (validation.success) {
        nameWarn = false;
        nameWarnText = undefined;
      } else {
        nameWarn = true;
        nameWarnText = validation.error.format()._errors.join('. ');
      }
      return validation.success;
    },
    description: () => {},
    url: () => {
      if ([null, 'none'].includes(connectionType)) return true;
      const validation = newPrinterSchema.shape.printerURL.safeParse(url);
      if (validation.success) {
        urlWarn = false;
        urlWarnText = undefined;
      } else {
        console.debug('Error in URL', validation);
        urlWarn = true;
        urlWarnText = validation.error.format()._errors.join('. ');
      }
      return validation.success;
    },
    // connectionType: () => {}, // Skip validation since it's a select box, let the server determine if it's acceptable
    apiKeyRequired: () => {},
    apiKey: () => {}
  };

  async function fetchPrinter(connType: 'moonraker' | 'octoprint', url: string, key?: string) {
    let localPrinterURL = url;
    if (connType == 'moonraker') {
      localPrinterURL = `${localPrinterURL}//server/info`.replace('//', '/');
    } else {
      localPrinterURL = `${localPrinterURL}//api/server`.replace('//', '/');
    }
    const localHeaders = new Headers({
      'Content-Type': `application/json`,
      Accept: 'application/json'
    });
    if (key !== undefined) {
      localHeaders.append('Authorization', `Bearer ${key}`);
    }
    return fetch(url, {
      method: 'GET',
      headers: localHeaders
    })
      .then((response) => {
        if (response.ok == false) {
          return {
            success: false,
            error: response.status,
            message: 'Failed to GET printer info'
          };
        }
        return response.json();
      })
      .catch((err) => {
        if (err instanceof TypeError) {
          return {
            success: false,
            error: 'BAD_URL',
            message: 'Printer URL invalid'
          };
        }
      });
  }
  export const validate = () => {
    return doValidate.all();
  };

  const transitionConfig = { delay: 250, duration: 300, easing: quintOut };
  const transitionSlideYConfig = { ...transitionConfig, axis: 'y' };

  export let name: string;
  let nameWarn = false;
  let nameWarnText: string | undefined;
  export let description: string;
  export let url: string;
  let urlWarn = false;
  let urlWarnText: string | undefined;
  export let connectionType: 'none' | 'moonraker' | 'octoprint' = 'none';
  export let apiKeyRequired: boolean = false;
  export let apiKey: string;

  let openModal = false;
  let modalMessage: string = '';

  async function checkPrinter() {
    let printerResponse: any;
    // Determine Connection Type and call the related API...
    switch (connectionType) {
      case 'moonraker':
        // Simplified test function, check for: bad url, host connected but no response, and other errors
        printerResponse = fetchPrinter('moonraker', url, apiKeyRequired ? apiKey : undefined);
        if (printerResponse.success === false) {
          modalMessage = printerResponse.message;
        }
      case 'octoprint':
        console.error(`Connection of type $connectionType has not been implemented`);
      default:
        console.error(`Unable to check connection of type $connectionType`);
    }
  }
</script>

<Modal bind:open={openModal} passiveModal={true} modalHeading="Printer Connection Error">
  <p>{modalMessage}</p>
</Modal>

<div class="text-xl">New Printer</div>
<div class="mb-8" />
<TextInput
  labelText="Printer Name"
  helperText="Enter a friendly name for your printer"
  name="printer_name"
  autocomplete="off"
  bind:value={name}
  bind:warn={nameWarn}
  bind:warnText={nameWarnText}
/>
<div class="mb-8" />
<TextInput
  labelText="Printer Description"
  helperText="Optionally, give your printer a short description (such as original model name)"
  name="printer_description"
  autocomplete="off"
  bind:value={description}
/>
<div class="mb-8" />
<Select name="printer_connection_type" bind:selected={connectionType}>
  <SelectItem value="none" text="None" />
  <SelectItem value="moonraker" text="Moonraker / Klipper" />
  <SelectItem value="octoprint" text="Octoprint" />
</Select>
<div class="mb-8" />
<TextInput
  labelText="Printer Address"
  helperText="Enter your printer's access URL with protocol, ex: http://mainsail.local"
  name="printer_url"
  autocomplete="off"
  disabled={!apiKeyRequired && connectionType === 'none'}
  bind:value={url}
  bind:warn={urlWarn}
  bind:warnText={urlWarnText}
/>
<div class="mb-8" />
<Toggle bind:toggled={apiKeyRequired} disabled={connectionType === 'none'} labelText="Use API Key">
  <span slot="labelA"><Unlocked class="inline" /> No API Key</span>
  <span slot="labelB"><Locked class="inline" /> Requires API Key</span>
</Toggle>
<div class="mb-8" />
<PasswordInput
  labelText="API Key"
  name="api_key"
  autocomplete="off"
  disabled={!apiKeyRequired && connectionType === 'none'}
  bind:value={apiKey}
/>
<div class="mb-8" />
<ButtonSet>
  <Button
    type="button"
    size="field"
    kind="secondary"
    icon={NextOutline}
    disabled={connectionType === 'none'}>Test Connection</Button
  >
  <Button type="submit" size="field" kind="secondary" icon={NextOutline}>Skip for Now</Button>
  <Button type="submit" size="field" kind="primary" icon={AddFilled}>Create Printer</Button>
</ButtonSet>
