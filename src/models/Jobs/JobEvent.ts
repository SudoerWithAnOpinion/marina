import type {
	Association,
	Attributes,
	CreationOptional,
	ForeignKey,
	InferAttributes,
	InferCreationAttributes,
	NonAttribute
} from 'sequelize';
import { DataTypes, Model, Sequelize } from 'sequelize';

import Printer from '$models/Printers/Printer';
import Job from '$models/Jobs/Job';

export type JobEventType = 'SUBMITTED' | 'PRINTING' | 'PAUSED' | 'CANCELLED' | 'ERROR' | 'PRINT_DONE' | 'COMPLETED';

export default class JobEvent extends Model<InferAttributes<JobEvent>, InferCreationAttributes<JobEvent>> {
	/**
	 * Unique event ID of the job
	 */
	declare eventId: CreationOptional<string>;

	/**
	 * Refers to the Job's jobId this event belongs to
	 */
	declare jobId: ForeignKey<Job['jobId']>;

	/**
	 * Refers to the Printer's pritnerId this event belongs to.
	 * This is optional as not all events are related to a printer.
	 */
	declare printerId?: ForeignKey<Printer['printerId']> | null;

	declare eventType: JobEventType;

	// Associations
	/**
	 * The associated job this event belongs to
	 */
	declare job?: NonAttribute<Job>;
	declare printer?: NonAttribute<Printer>;
	declare static associations: {
		job: Association<Job, JobEvent>;
		printer: Association<JobEvent, Printer>;
	};

	// Timestamps
	declare createdAt: Date;
	declare updatedAt: Date;
}
export type JobEventAttributes = Attributes<JobEvent>;

export function init(sequelize: Sequelize) {
	JobEvent.init({
		eventId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		jobId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'Job',
				key: 'jobId'
			}
		},
		printerId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'Printer',
				key: 'printerId'
			}
		},
		eventType: {
			type: DataTypes.STRING,
			allowNull: false
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
	}, {
		sequelize,
		tableName: 'job_events',
		modelName: 'JobEvent',
		timestamps: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt'
	});
}
export function associate() {
	JobEvent.belongsTo(Job, {
		foreignKey: 'jobId',
		targetKey: 'jobId',
		as: 'job'
	});
	JobEvent.hasOne(Printer, {
		foreignKey: 'printerId',
		sourceKey: 'printerId',
		as: 'printer',
		constraints: false
	});
}
