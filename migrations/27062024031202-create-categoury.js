"use strict";
module.exports = {
    up: function (migration, DataTypes, done) {
        return migration.createTable("Categorys", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            categouryName: {
                type: DataTypes.STRING,
                allowNull: true
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
        return migration.dropTable("Category")
    }
};