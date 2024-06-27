const sequelize = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Category', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        categouryName: {
            type: DataTypes.STRING
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