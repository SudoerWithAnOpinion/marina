import { LuciaError } from 'lucia-auth';
import type {
  AdapterFunction,
  KeySchema,
  LuciaErrorConstructor,
  UserAdapter,
  UserSchema
} from 'lucia-auth';
import { Op, type Attributes, type UniqueConstraintError } from 'sequelize';
import { sequelize, Key, User } from '$models';
import { Transaction } from 'sequelize';
const userAdapter: UserAdapter = {
  deleteKeysByUserId: async (userId: string): Promise<void> => {
    Key.destroy({
      where: {
        user_id: userId
      }
    });
  },
  deleteNonPrimaryKey: async (...key: string[]): Promise<void> => {
    Key.destroy({
      where: {
        id: { [Op.in]: key },
        primary: false
      }
    });
  },
  deleteUser: async (userId: string): Promise<void> => {
    User.destroy({
      where: {
        id: userId
      }
    });
  },
  getKey: async (keyId: string): Promise<KeySchema | null> => {
    const key = await Key.findByPk(keyId);
    if (key !== null && key.expires !== null) {
      const keyAttr = key.get();
      key.destroy();
      return keyAttr;
    }
    return key;
  },
  getKeysByUserId: async (userId: string): Promise<KeySchema[]> => {
    return Key.findAll({
      where: {
        user_id: userId
      }
    });
  },
  getUser: async (userId: string): Promise<UserSchema | null> => {
    return User.findByPk(userId);
  },
  setKey: async (key: KeySchema): Promise<void> => {
    await Key.create({
      ...key
    }).catch((err) => {
      switch (err.name) {
        case 'SequelizeForeignKeyConstraintError':
          throw new LuciaError('AUTH_INVALID_USER_ID');
        case 'SequelizeUniqueConstraintError':
          throw new LuciaError('AUTH_DUPLICATE_KEY_ID');
        default:
          console.error(err);
      }
    });
  },
  setUser: async (
    userId: string,
    attributes: Record<string, unknown>,
    key: KeySchema | null
  ): Promise<UserSchema> => {
    const modelKeys = Object.keys(User.getAttributes());
    const validAttributes = Object.fromEntries(
      Object.entries(attributes).filter((entry) => {
        return modelKeys.includes(entry[0]) && !['id', 'createdAt', 'updatedAt'].includes(entry[0]); // TODO!: key in User does not work
      })
    ) as Omit<Attributes<User>, 'id'>;
    return await sequelize
      .transaction({ type: Transaction.TYPES.IMMEDIATE }, async (transaction) => {
        const user = await User.create(
          {
            id: userId,
            ...validAttributes
          },
          { transaction }
        );
        if (key !== null) {
          await Key.create(
            {
              ...key
            },
            { transaction }
          );
        }
        return user;
      })
      .catch((err) => {
        if (err.name == 'SequelizeUniqueConstraintError')
          throw new LuciaError('AUTH_DUPLICATE_KEY_ID');
        console.error(err);
        throw new Error('UNKNOWN_ERROR');
      });
  },
  updateKeyPassword: async (key: string, hashedPassword: string | null): Promise<void> => {
    return Key.update(
      {
        hashed_password: hashedPassword
      },
      {
        fields: ['hashed_password'],
        where: {
          id: key
        }
      }
    ).then((result) => {
      if (result[0] != 1) {
        throw new LuciaError('AUTH_INVALID_KEY_ID');
      }
    });
  },
  updateUserAttributes: async (
    userId: string,
    attributes: Partial<{ username: string }>
  ): Promise<UserSchema> => {
    return User.findByPk(userId).then((user) => {
      if (user === null) throw new LuciaError('AUTH_INVALID_USER_ID');
      user.set(attributes);
      return user.save();
    });
  }
};

const adapter = (): AdapterFunction<UserAdapter> => (E: LuciaErrorConstructor) => userAdapter;

export { adapter as UserAdapter, userAdapter as userAdapterCollection };
