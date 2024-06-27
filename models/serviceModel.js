const sequelize = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Service', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        categouryId: {
            type: DataTypes.STRING
        },

        serviceName: {
            allowNull: false,
            type: DataTypes.DATE
        },
        type: {
            type: DataTypes.ENUM('Normal', 'VIP')
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }

    });
    return User
}