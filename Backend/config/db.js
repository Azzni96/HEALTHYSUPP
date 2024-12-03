const { Sequelize } = require('sequelize');

// Set up the MariaDB connection
const sequelize = new Sequelize('HEALTHYSUPP', 'root', 'Kraskras', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false,
});

module.exports = sequelize;
