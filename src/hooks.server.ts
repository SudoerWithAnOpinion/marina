import { env } from '$env/dynamic/public';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import Youch from 'youch';
import youchTerminal from 'youch-terminal';

import { handleHooks } from '@lucia-auth/sveltekit';
import { auth } from '$lib/auth/lucia';

import { setup_complete } from '$lib/initial-setup/flags';

// Youch Error Handling
export const handleError: HandleServerError = async ({ error }) => {
  const youchError = await new Youch(error, {}).toJSON();
  const options = {
    displayShortPath: false,
    prefix: ' ',
    hideErrorTitle: false,
    hideMessage: false,
    displayMainFrameOnly: false,
    framesMaxLimit: 3
  };
  console.error(youchTerminal(youchError, options));
};

// First-Time Setup Detection
export const firstTimeSetupCheck: Handle = ({ event, resolve }) => {
  const initialSetupPath = (env.PUBLIC_BASE_PATH ?? '') + '/_initial-setup'.replace('//', '/');
  const initialSetupUrl = event.url.origin + initialSetupPath;
  if (setup_complete === false && event.url.pathname !== initialSetupPath) {
    return Response.redirect(initialSetupUrl);
  }
  return resolve(event);
};

export const handle: Handle = sequence(firstTimeSetupCheck, handleHooks(auth));
