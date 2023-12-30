import process from "process";
import { Dialect } from "sequelize";

export let config = {
	development: {
		username: process.env.db_username_dev as string,
		password: process.env.db_password_dev as string,
		database: process.env.db_database_dev as string,
		host: process.env.db_host_dev as string,
		port: process.env.db_port as string,
		dialect: process.env.db_dialect as Dialect,
	},
	test: {
		username: process.env.db_username_dev as string,
		password: process.env.db_password_dev as string,
		database: process.env.db_database_dev as string,
		host: process.env.db_host_dev as string,
		port: process.env.db_port as string,
		dialect: process.env.db_dialect as Dialect,
	},
	"docker-dev": {
		username: process.env.db_username_dev as string,
		password: process.env.db_password_dev as string,
		database: process.env.db_database_dev as string,
		host: process.env.db_host_dev_docker as string,
		port: process.env.db_port as string,
		dialect: process.env.db_dialect as Dialect,
	},
	production: {
		username: process.env.db_username_production as string,
		password: process.env.db_password_production as string,
		database: process.env.db_database_production as string,
		host: process.env.db_host_production as string,
		port: process.env.db_port as string,
		dialect: process.env.db_dialect as Dialect,
	},
	"docker-production": {
		username: process.env.db_username_production as string,
		password: process.env.db_password_production as string,
		database: process.env.db_database_production as string,
		host: process.env.db_host_production as string,
		port: process.env.db_port as string,
		dialect: process.env.db_dialect as Dialect,
	},
};
