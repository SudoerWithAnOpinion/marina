// import {} from '';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { auth } from '$lib/auth/lucia';
// Check for existing user before showing login page
export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.validate();
  if (session !== null) throw redirect(302, '/');
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const data = await request.formData();
    console.debug('Login Form Action', data);

    // Validate Inputs
    const username = data.get('username');
    const password = data.get('password');
    if (username === null) return fail(400, { username, username_missing: true });
    if (password === null) return fail(400, { password_missing: true });

    if (typeof username !== 'string') return fail(400, { username_invalid: true });
    if (typeof password !== 'string') return fail(400, { password_invalid: true });

    // Check Username/Password

    auth
      .validateKeyPassword('username', username, password)
      .then((key) => {
        return auth.createSession(key.userId);
      })
      .then((session) => {
        locals.setSession(session);
      })
      .catch((err) => {
        // Authentication or Session Generation failed
        return fail(401, { credentials_invalid: true });
      });
  }
};
