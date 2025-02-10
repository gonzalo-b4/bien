const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Store = require('./Store');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false
    }
});

Product.belongsTo(Store, { foreignKey: 'storeId' });

module.exports = Product;