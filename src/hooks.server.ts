import { sequence } from '@sveltejs/kit/hooks';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import Youch from 'youch';
import youchTerminal from 'youch-terminal';
import { createTRPCHandle } from 'trpc-sveltekit';
// Youch Error Handling

export const handleError: HandleServerError = async ({error, event}) =>{
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



// tRPC
export const trpcHandle: Handle = createTRPCHandle({
  router,
  createContext,
  onError: ({ type, path, error }) =>
    console.error(`Encountered error while trying to process ${type} @ ${path}:`, error)
});
// TODO: implement session handling
export const handle: Handle = sequence(trpcHandle);