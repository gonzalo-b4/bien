const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Store = sequelize.define('Store', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'active', 'suspended'),
        defaultValue: 'pending'
    }
});

Store.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = Store;