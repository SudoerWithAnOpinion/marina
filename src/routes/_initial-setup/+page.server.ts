import type { PageServerLoad } from './$types';

import { User, Printer } from '$models';
import type { Actions } from './$types';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const printersAvailable = Printer.count();
  const usersAvailable = User.count();

  return {
    printer_count: printersAvailable,
    user_count: usersAvailable
  };
};

export const actions: Actions = {
  first_user: async ({ request }) => {
    // Get Form Inputs
    const { username, password } = request.formData().then((formData) => {
      const data = {
        username: formData.get('username'),
        password: formData.get('password')
      };
    });

    // Double-Check that there are no users in the database
    const usersAvailable = await User.count();
    if (usersAvailable !== 0)
      throw fail(409, {
        severity: 'error',
        message: 'Users have already been created, inital setup has already been completed.'
      });
  },
  first_printer: async () => {
    // Double-Check that there are no printers in the database
    const printersAvailable = await Printer.count();
    if (printersAvailable !== 0)
      throw fail(409, {
        severity: 'error',
        message: 'Printers have already been created, inital setup has already been completed.'
      });

    // Validate form inputs
  }
};
