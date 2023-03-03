import { type Actions, fail } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';
import { auth } from '$lib/auth/lucia';

export const actions: Actions = {
  default: async ({ locals }) => {
    const session = await locals.validate();
    if (!session) return fail(401);
    await auth.invalidateSession(session.sessionId); // Invalidate session
    locals.setSession(null); // Remove cookie
  }
};
