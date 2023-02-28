import lucia, { type Env  } from 'lucia-auth';
import { NODE_ENV } from '$env/static/private';
import {SessionAdapter, UserAdapter} from './sequelize-adapter';

let env: Env;
if (NODE_ENV === 'production') {
  env = 'DEV'
} else {
  env = 'PROD'
}


export const auth = lucia({
  adapter: {
    user: UserAdapter(),
    session: SessionAdapter()
  },
  env,
  sessionCookie: [{ sameSite: "strict", path: "/" }],
  activePeriod: 1000 * 60 * 60 * 24, // 24 Hours
  idlePeriod: 1000 * 60 * 60 * 24 * 14 // 2 weeks
});

export type Auth = typeof auth;

