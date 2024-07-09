const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

dotenv.config({ path: path.join(__dirname, '../../.env') });
const basename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize({
  username:"postgres",
  password: "postgres",
  database: "test_DB",
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 60000
  }
});
try {
  sequelize.authenticate();
} catch (err) {
 console.error('Unable to connect to the database:', err)
}
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // eslint-disable-line import/no-dynamic-require, global-require
    // eslint-disable-next-line no-console
    console.log(model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
