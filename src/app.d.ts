// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

/// <reference types="lucia-auth" />
declare namespace Lucia {
  type Auth = import('$lib/server/lucia').Auth;
  type UserAttributes = {
    username: string;
    role?: 'ADMINISTRATOR' | 'USER' | 'SERVICE_ACCOUNT';
  };
}

/// <reference types="@sveltejs/kit" />
declare namespace App {
  // interface Error {}
  interface Locals {
    validate: import('@lucia-auth/sveltekit').Validate;
    validateUser: import('@lucia-auth/sveltekit').ValidateUser;
    setSession: import('@lucia-auth/sveltekit').SetSession;
  }
  // interface PageData {}
  // interface Platform {}
}
