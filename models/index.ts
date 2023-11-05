'use strict';

import { users } from './users';
import { scores } from './scores';
import { config } from "../config/config";
import { Sequelize } from 'sequelize-typescript';
import mysql2 from 'mysql2';

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize({
  database: sequelizeConfig.database,
  dialect: sequelizeConfig.dialect,
  dialectModule: mysql2,
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true, 
  },
  username: sequelizeConfig.username,
  password: sequelizeConfig.password,
  host: sequelizeConfig.host,
  port: Number(sequelizeConfig.port),
  models: [users, scores]
});

export {sequelize, users, scores};