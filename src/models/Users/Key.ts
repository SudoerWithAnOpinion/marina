import {
  type Association,
  type ForeignKey,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import User from './User';

export default class Key extends Model<InferAttributes<Key>, InferCreationAttributes<Key>> {
  /**
   * id of the key
   */
  declare id: CreationOptional<string>;

  declare hashed_password: string | null;

  declare primary: boolean;
  declare expires: number | null;
  // Associations
  declare user_id: ForeignKey<User['id']>;
  declare user?: NonAttribute<User>;
  declare static associations: {
    user: Association<Key, User>;
  };

  public static initialize(sequelize: Sequelize) {
    return this.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        hashed_password: {
          type: DataTypes.STRING,
          allowNull: true
        },
        primary: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        expires: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        user_id: {
          type: DataTypes.STRING,
          references: {
            model: User,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      {
        sequelize,
        modelName: 'Key',
        tableName: 'keys',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    );
  }
  public static associate() {
    Key.belongsTo(User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  }
}
