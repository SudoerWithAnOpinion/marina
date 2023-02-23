import { InvalidAddress } from '$lib/Errors';
import {
  publicProcedure,
  router,
} from '$lib/trpc/router';
import { z } from 'zod';


const checkAddress = (address:string) => {
  // TODO: Make a Printer class that has a checkAddress method and a moonraker/octoprint property
}

const printerRouter = router({
  create: publicProcedure.input(z.object({
    name: z.string(),
    
  })).query((input)=>{
    // TODO
  }),
});
export default printerRouter;