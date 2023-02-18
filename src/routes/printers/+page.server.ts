
import type { PageServerLoad } from './$types';

import { Printer } from '$models';

export const load: PageServerLoad = async () => {
  return await Printer.findAll({
    attributes: {
      include: ['printerId', 'name', 'description', 'address']
    }
  }).then((printers) => {
    return {
      printers: printers.map((printer) => printer.toJSON()),
    };
  });
};