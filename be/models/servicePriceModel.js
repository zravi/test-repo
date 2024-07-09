const sequelize = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Service', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        serviceId: {
            type: DataTypes.INTEGER,
            
        },
        duration: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING,
            required: true
        },
        type: {
            type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly')
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });
    return User
}