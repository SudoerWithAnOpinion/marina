/**
 * @file Initial Application Setup Page
 * This page is used for setting up the first user for this application.
 * Because this page bypasses all security checks, it *always* checks the
 * database before continuing.
 */
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { User } from '$models';

export const load: PageServerLoad = async ({ locals }) => {
  // Secure this route behind a check that the DB has no users
  return User.count().then((count) => {
    if (count > 0) {
      throw redirect(303, '..');
    }
  });
};
