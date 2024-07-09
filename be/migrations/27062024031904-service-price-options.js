"use strict";
module.exports = {
    up: function (migration, DataTypes, done) {
        return migration.createTable("priceOptions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            serviceId: {
                type: DataTypes.INTEGER,
                onDelete:"SET NULL",
                references:{
                    model:"Services",
                    key:"id"
                }
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
        })
    },
    down: function (migration, DataTypes) {
        return migration.dropTable("priceOption")
    }
};