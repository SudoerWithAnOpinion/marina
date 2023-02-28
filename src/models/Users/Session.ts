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

export default class Session extends Model<
  InferAttributes<Session>, 
  InferCreationAttributes<Session>
> {
  /**
   * id of the key
   */
  declare id: CreationOptional<string>;
  
  declare active_expires: number;
  declare idle_expires: number;

  // Associations
  declare user_id: ForeignKey<User['id']>;
  declare user?: NonAttribute<User>;
  declare static associations: {
    user: Association<Session, User>;
  }

  public static initialize(sequelize: Sequelize) {
    return this.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      active_expires: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idle_expires: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    },{
      sequelize,
      modelName: 'Session',
      tableName: 'sessions',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    })
  };
  public static associate(){
    Session.belongsTo(User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
}