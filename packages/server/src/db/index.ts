import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({ dialect: 'sqlite' });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize
  .sync()
  .then(() => {
    console.log('Models synced');
  })
  .catch(err => {
    console.log(err);
  });

export default sequelize;
