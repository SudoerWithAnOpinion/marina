import type {
	Association,
	CreationOptional,
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
import JobEvent from './JobEvent';

export default class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
	declare jobId: CreationOptional<UUID>;

	// Associations
	declare events?: NonAttribute<JobEvent[]>;
	declare static associations: {
		events: Association<Job, JobEvent>;
	};

	// Timestamps
	declare createdAt: Date;
	declare updatedAt: Date;
}

export function init(sequelize: Sequelize) {
	Job.init(/* TODO: Init Model */);
}

export function associate() {
	Job.hasMany(JobEvent, {
		foreignKey: 'jobId',
		sourceKey: 'jobId',
		as: 'events'
	});
}
