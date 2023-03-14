import type {
  Association,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute
} from 'sequelize';
import { DataTypes, Model, Sequelize } from 'sequelize';
import JobEvent from './JobEvent';

export default class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
  declare jobId: CreationOptional<string>;

  declare jobName: string;

  declare slicer?: string;
  declare filamentDiameter?: number;
  declare nozzleDiameter?: number;
  declare layerHeight?: number;

  // Timestamps
  declare createdAt: Date;
  declare updatedAt: Date;

  public static initialize(sequelize: Sequelize) {
    return this.init(
      {
        jobId: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4
        },
        jobName: DataTypes.STRING,
        slicer: DataTypes.STRING,
        filamentDiameter: DataTypes.FLOAT,
        nozzleDiameter: DataTypes.FLOAT,
        layerHeight: DataTypes.FLOAT,
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
        tableName: 'jobs',
        modelName: 'Job',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
    );
  }

  // Associations
  declare events?: NonAttribute<JobEvent[]>;
  declare static associations: {
    events: Association<Job, JobEvent>;
  };

  public static associate(): void {
    Job.hasMany(JobEvent, {
      foreignKey: 'jobId',
      sourceKey: 'jobId',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      as: 'events'
    });
  }
}
