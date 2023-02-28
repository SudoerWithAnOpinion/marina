import type { 
  AdapterFunction,
  KeySchema,
  LuciaErrorConstructor,
  UserAdapter,
  UserSchema
} from "lucia-auth";
import {Op, type Attributes} from 'sequelize';
import {sequelize, Key, User} from '$models';

const adapter = (): AdapterFunction<UserAdapter> => 
(LuciaErrorConstructor: LuciaErrorConstructor) => {
  return {
    deleteKeysByUserId: async (userId: string): Promise<void> => {
      Key.destroy({
        where: {
          user_id: userId,
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
          id: userId,
        }
      });
    },
    getKey: async (keyId: string): Promise<KeySchema | null> => {
      return Key.findByPk(keyId);
    },
    getKeysByUserId: async (userId: string): Promise<KeySchema[]> => {
      return Key.findAll({
        where: {
          user_id: userId,
        }
      });
    },
    getUser: async (userId: string): Promise<UserSchema | null> => {
      return User.findByPk(userId);
    },
    setKey: async (key: KeySchema): Promise<void> => {
      Key.create({
        ...key
      });
    },
    setUser: async (
      userId: string,
      attributes: Record<string, unknown>,
      key: KeySchema | null
    ): Promise<UserSchema> => {
      const validAttributes  = Object.fromEntries(Object.entries(attributes).filter(([key]) => {
        return (key in User && key !== 'id');
      })) as Omit<Attributes<User>, 'id'>;
      return sequelize.transaction().then(async (xact)=>{
        return {
          user: User.create({
            id: userId,
            ...validAttributes
          }, {transaction: xact}), 
          xact
        };
      }).then(({user, xact})=>{
        if (key) {
          Key.create({
            ...key
          }, {transaction: xact});
        }
        return user; 
      });
    },
    updateKeyPassword: async (
      key: string,
      hashedPassword: string | null
    ): Promise<void> => {
      Key.update({
        hashed_password: hashedPassword
      },{
        where: {
          id: key
        }
      })
    },
    updateUserAttributes: async (
      userId: string,
      attributes: Partial<{username: string}>
    ): Promise<UserSchema> => {
      return User.findByPk(userId).then((user)=>{
        if (user === null) throw new LuciaErrorConstructor('AUTH_INVALID_USER_ID');
        user.set(attributes);
        return user.save();
      });
    },

  }
}

export {adapter as UserAdapter};