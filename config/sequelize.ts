// sequelize.ts
import { Sequelize, DataTypes  } from 'sequelize';

// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export default sequelize;