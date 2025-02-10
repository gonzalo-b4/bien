const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Store = require('./Store');
const Product = require('./Product');

const Report = sequelize.define('Report', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'resolved'),
        defaultValue: 'pending'
    }
});

Report.belongsTo(User, { foreignKey: 'userId' });
Report.belongsTo(Store, { foreignKey: 'storeId' });
Report.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Report;