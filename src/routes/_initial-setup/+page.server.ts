import type { Actions, PageServerLoad } from './$types';

import { User, Printer } from '$models';
import { fail } from '@sveltejs/kit';

import { newSetupUserValidationSchema } from '$lib/Schemas/NewUser';
import { auth } from '$lib/auth/lucia';

export const load: PageServerLoad = async () => {
  const printersAvailable = Printer.count();
  const usersAvailable = User.count();
  return {
    printer_count: printersAvailable,
    user_count: usersAvailable
  };
};

export const actions: Actions = {
  first_user: async ({ request, locals }) => {
    // Get Form Inputs
    const parsedData = await request.formData().then((formData) => {
      const data = {
        username: formData.get('username'),
        newPassword: formData.get('new-password'),
        confirmPassword: formData.get('confirm-password')
      };
      console.debug('Got Data: ', data);
      // Validate Form Inputs
      return newSetupUserValidationSchema.safeParse(data);
    });
    // Check if the data is a failure
    if (parsedData.success === false) {
      return fail(400, {
        severity: 'error',
        message: 'Invalid form data provided.'
      });
    }
    // Double-Check that there are no users in the database
    const usersAvailable = await User.count();
    if (usersAvailable !== 0) {
      console.error(
        '[Initial Setup] Error: Users already created, unable to create a new inital user'
      );
      return fail(409, {
        severity: 'error',
        message: 'Users have already been created, inital setup has already been completed.'
      });
    }

    // All checks passed, create the user
    const fieldData = parsedData.data;
    try {
      const createdUser = await auth.createUser({
        key: {
          providerId: 'username',
          providerUserId: fieldData.username,
          password: fieldData.newPassword
        },
        attributes: {
          username: fieldData.username,
          role: 'ADMINISTRATOR'
        }
      });
      // Create the user's session so they're logged in automatically
      const session = await auth.createSession(createdUser.userId);
      locals.setSession(session);
      // Return step information to the client to proceed to the next step
      return {
        status: 200,
        body: {
          step: 1,
          message: 'User created successfully!'
        }
      };
    } catch (err) {
      console.error('[Initial Setup] Error: Unable to create initial user');
      console.error(err);
      return fail(500, {
        severity: 'error',
        message: 'An error occurred while creating the user.'
      });
    }
  },
  first_printer: async () => {
    // Double-Check that there are no printers in the database
    const printersAvailable = await Printer.count();
    if (printersAvailable !== 0) {
      return fail(409, {
        severity: 'error',
        message: 'Printers have already been created, inital setup has already been completed.'
      });
    }
    // Validate form inputs
  }
};
