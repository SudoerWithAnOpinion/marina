import { env } from '$env/dynamic/private';
import type { InferAttributes, InferCreationAttributes, Model, Options } from 'sequelize';
import { Sequelize } from 'sequelize';
import * as dbConfigFile from '../../sequelize.config.json';
import Job from './Jobs/Job';
import JobEvent from './Jobs/JobEvent';
import Printer from './Printers/Printer';
import Material from './Materials/Material';
import MaterialUsage from './Materials/MaterialUsage';

let dbConfig: Options;

if (env.NODE_ENV === 'production' && env.SEQUELIZE_PROD_CONFIG === undefined) {
	//Forces Dev DB if the production config is not set
	dbConfig = dbConfigFile['development'] as Options;
} else {
	switch (env.NODE_ENV) {
		case 'production':
			dbConfig = env.SEQUELIZE_PROD_CONFIG as Options; // TODO! This is likely not working
			break;
		case 'test':
			dbConfig = dbConfigFile['test'] as Options;
			break;
		case 'development':
		default:
			dbConfig = dbConfigFile['development'] as Options;
			dbConfig.logging = process.env.SEQUELIZE_VERBOSE == 'true' ? console.log : false;
			break;
	}
}

// Get Sequelize Instance
const sequelize = new Sequelize({
	...dbConfig
});
// Setup Models
const Models: Record<string, typeof Model<InferAttributes<Model>, InferCreationAttributes<Model>> & { associate?: () => void }> = {
	Printer: Printer.initialize(sequelize),
	JobEvent: JobEvent.initialize(sequelize),
	Job: Job.initialize(sequelize),
	Material: Material.initialize(sequelize),
	MaterialUsage: MaterialUsage.initialize(sequelize),
};
// Setup Associations, if the model has an associate function
Object
	.values(Models)
	.filter((model) => {
		return model.associate !== undefined;
	})
	.forEach((model) => model.associate);

export {
	sequelize,
	Printer,
	JobEvent,
	Job,
	Material,
	MaterialUsage,
};
