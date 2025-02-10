const { Sequelize } = require('sequelize');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected');
    } catch (error) {
        console.error('Error connecting to MySQL', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };