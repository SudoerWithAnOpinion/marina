import { describe, expect, it, afterEach, beforeEach } from 'vitest';
import { testUserAdapter, type LuciaQueryHandler } from '@lucia-auth/adapter-test';
import { userAdapterCollection, UserAdapter } from '$lib/auth/lucia/sequelize-adapter';

import { Key, sequelize, Session, User } from '$models';

const db: LuciaQueryHandler = {
  user: {
    get: async () => await User.findAll(),
    insert: async (data) => {
      await User.create(data);
    },
    clear: async () => await User.truncate()
  },
  session: {
    get: async () => await Session.findAll(),
    insert: async (data) => {
      await Session.create(
        data as Overwrite<typeof data, { active_expires: number; idle_expires: number }>
      );
    },
    clear: async () => Session.truncate()
  },
  key: {
    get: async () => await Key.findAll(),
    insert: async (data) => {
      await Key.create(data);
    },
    clear: async () => await Key.truncate()
  }
};

beforeEach(async () => {
  await User.sync({ alter: true })
    .then(() => {
      return Key.sync({ alter: true });
    })
    .then(() => {
      return Session.sync({ alter: true });
    });
});
afterEach(async () => {
  await sequelize.drop();
});
describe('Lucia-Auth Sequelize Adapter', () => {
  it.skip('should not throw', async () => {
    // The test below passes, but will call process.exit() and break the tests
    await expect(testUserAdapter(userAdapterCollection, db)).resolves.not.toThrow();
  });
});
