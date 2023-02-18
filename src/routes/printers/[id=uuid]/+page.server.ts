import type { PageServerLoad } from './$types';
import { Printer } from '$models';
import { getUpdateStatus } from '$lib/Moonraker/UpdateManager';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const printer = await Printer.findByPk(params.id).then(printer => {
      if (!printer) throw new Error('Invalid printer id');
      return printer;
    });
    const update_status = await getUpdateStatus(printer.address);
    return {
      printer: printer.toJSON(),
      update_status
    }
  } catch (error) {
    throw new Error('Invalid printer id');
  }

};

