import lucia, { type Env } from 'lucia-auth';
import { dev } from '$app/environment';
import { SessionAdapter, UserAdapter } from './sequelize-adapter';

export const auth = lucia({
  adapter: {
    user: UserAdapter(),
    session: SessionAdapter()
  },
  env: dev ? 'DEV' : 'PROD',
  sessionCookie: [{ sameSite: 'strict', path: '/' }],
  activePeriod: 1000 * 60 * 60 * 24, // 24 Hours
  idlePeriod: 1000 * 60 * 60 * 24 * 14 // 2 weeks
});

export type Auth = typeof auth;
