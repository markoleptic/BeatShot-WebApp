'use strict';

import { users } from './users';
import { scores } from './scores';
import { config } from "../config/config"
import { Sequelize } from 'sequelize-typescript';

//const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config['development'];

const sequelize = new Sequelize({
  database: sequelizeConfig.database,
  dialect: sequelizeConfig.dialect,
  username: sequelizeConfig.username,
  password: sequelizeConfig.password,
  models: [users, scores]
});

export {sequelize, users, scores};