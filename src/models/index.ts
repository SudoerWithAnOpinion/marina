import { env } from '$env/dynamic/private';
import type { Options } from 'sequelize';
import { Sequelize } from 'sequelize';
import * as dbConfigFile from '../../sequelize.config.json';
// import User, * as UserModelFile from './Users/User';
import Job, * as JobModelFile from './Jobs/Job';
import JobEvent, * as JobEventModelFile from './Jobs/JobEvent';
import Printer, * as PrinterModelFile from './Printers/Printer';


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
const Models = [
	JobModelFile,
	JobEventModelFile,
	PrinterModelFile
];
Models.forEach((model) => model.init(sequelize));
Models.forEach((model) => model.associate());

export {
	sequelize,
	Job,
	JobEvent,
	Printer
};
