// require sequelize
const Sequelize = require('sequelize');

// instantiate Sequelize
const db = new Sequelize('postgres://localhost:5432/wikistack');

// export your db
module.exports = {
  db,
};
