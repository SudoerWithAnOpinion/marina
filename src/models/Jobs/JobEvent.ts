import Printer from '$models/Printer';
import type {
	Association,
	CreationOptional,
	ForeignKey,
	HasManyAddAssociationMixin,
	HasManyAddAssociationsMixin,
	HasManyCountAssociationsMixin,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
	HasManyHasAssociationMixin,
	HasManyHasAssociationsMixin,
	HasManyRemoveAssociationMixin,
	HasManyRemoveAssociationsMixin,
	HasManySetAssociationsMixin,
	InferAttributes,
	InferCreationAttributes,
	NonAttribute
} from 'sequelize';
import { DataTypes, Model, Sequelize } from 'sequelize';

import Job from './Job';

export default class JobEvent extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
	/**
	 * Unique event ID of the job
	 */
	declare eventId: CreationOptional<UUID>;

	/**
	 * Refers to the Job's jobId this event belongs to
	 */
	declare jobId: ForeignKey<Job['jobId']>;

	/**
	 * Refers to the Printer's pritnerId this event belongs to
	 */
	declare printerId?: ForeignKey<Printer['printerId']>;

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

export function init(sequelize: Sequelize) {
	JobEvent.init(/* TODO: Init JobEvent */);
}
export function associate() {
	JobEvent.belongsTo(Job, {
		foreignKey: 'jobId',
		targetKey: 'jobId',
		as: 'job'
	});
	JobEvent.hasOne(Printer, {
		as: 'printer'
	});
}
