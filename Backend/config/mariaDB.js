const { Sequelize } = require('sequelize');

// Set up the MariaDB connection
const sequelize = new Sequelize('HEALTHYSUPP', 'root', 'Nihad1996', {
  host: 'localhost',
  dialect: 'mariadb',
});

module.exports = sequelize;
