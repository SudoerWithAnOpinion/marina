import {
  type Association,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import Key from './Key';
import Session from './Session';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  /**
   * User ID Number
   * (Primary Key)
   */
  declare id: string;

  /**
   * Can be a username or email.
   */
  declare username: string;

  /**
   * User Account Role
   */
  declare role: 'ADMINISTRATOR' | 'USER' | 'SERVICE_ACCOUNT' | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static initialize(sequelize: Sequelize) {
    return this.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        role: {
          type: DataTypes.STRING,
          allowNull: true,
          set: (input: string) => {
            if (input in ['ADMINISTRATOR', 'USER', 'SERVICE_ACCOUNT', null]) {
              return input;
            } else {
              throw new Error(
                `Invalid role: '${input}'; must be one of 'ADMINISTRATOR', 'USER', 'SERVICE_ACCOUNT' or null`
              );
            }
          }
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
    );
  }

  // Associations
  declare keys: NonAttribute<Key[]>;
  declare sessions: NonAttribute<Session[]>;

  declare static associations: {
    keys: Association<User, Key>;
    sessions: Association<User, Session>;
  };

  public static associate() {
    this.hasMany(Key, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      as: 'keys',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    this.hasMany(Session, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      as: 'sessions',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  }

  public static loadScopes() {
    this.addScope('serviceAccounts', {
      where: {
        role: 'SERVICE_ACCOUNT'
      }
    });
  }
}
