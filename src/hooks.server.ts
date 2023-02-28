import { sequence } from '@sveltejs/kit/hooks';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { 
  Handle, 
  HandleServerError 
} from '@sveltejs/kit';
import Youch from 'youch';
import youchTerminal from 'youch-terminal';
import { createTRPCHandle } from 'trpc-sveltekit';

import { handleHooks } from '@lucia-auth/sveltekit';
import { auth } from '$lib/auth/lucia';

// Youch Error Handling
export const handleError: HandleServerError = async ({error}) =>{
  const youchError = await new Youch(error, {}).toJSON();
  const options = {
    displayShortPath: false,
    prefix: ' ',
    hideErrorTitle: false,
    hideMessage: false,
    displayMainFrameOnly: false,
    framesMaxLimit: 3,
  };
  console.error(youchTerminal(youchError, options))
}

// Authentication Hook
// export const authenticationHook = 
// Authorization Hook
// const authorizationHook = async ({ event, resolve }) => {
//   return resolve(event);
// } 

// tRPC
export const trpcHandle: Handle = createTRPCHandle({
  router,
  createContext,
  onError: ({ type, path, error }) =>
    console.error(`Encountered error while trying to process ${type} @ ${path}:`, error)
});
// TODO: implement session handling
export const handle: Handle = sequence(handleHooks(auth),trpcHandle);