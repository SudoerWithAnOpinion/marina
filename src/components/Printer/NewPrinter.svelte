<script lang='ts'>
  import {
    Button, 
    ButtonSet,
    InlineNotification,
    PasswordInput,
    TextInput, 
    Toggle,
  } from 'carbon-components-svelte';
  import { 
    AddFilled,
    NextOutline,
    Locked,
    Unlocked,
  } from 'carbon-icons-svelte';

  import { z } from 'zod';

  const newPrinterSchema = z.object({
    url: z.string().url(),
    apiKey: z.optional(z.string()),
  });

  export let newPrinterName: string;
  export let newPrinterURL: string;
  export let newPrinterApiKeyRequired: boolean = false;
  export let newPrinterApiKey: string;

  async function checkPrinter(){

  }
</script>


<div class='text-xl'>New Printer</div>
<TextInput 
  labelText='Printer Address' 
  helperText="Enter your printer's access URL with protocol, ex: http://mainsail.local"
  name='printer_url' 
  autocomplete='off'
/>
<div class='mb-8' />
<Toggle 
  bind:toggled={newPrinterApiKeyRequired} 
  labelText='Use API Key'
>
  <span slot='labelA'><Unlocked class='inline' /> No API Key</span>
  <span slot='labelB'><Locked class='inline' /> Requires API Key</span>
</Toggle>
<div class='mb-8' />
<PasswordInput 
  labelText='API Key' 
  name='api_key' 
  autocomplete='off'
  disabled={!newPrinterApiKeyRequired}
/>
<div class='mb-8' />
<ButtonSet>
  <Button type='submit' size='field' kind='secondary' icon={NextOutline}>Skip for Now</Button>
  <Button type='submit' size='field' kind='primary' icon={AddFilled}>Create Printer</Button>
</ButtonSet>