"use strict";
module.exports = {
    up: function (migration, DataTypes, done) {
       return migration.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            email: {
                type: DataTypes.STRING,
                required: true
            },
            password: {
                type: DataTypes.STRING,
                required: true
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        })
    },
    down: function (migration, DataTypes) {
     return   migration.dropTable("Users")
    }
};