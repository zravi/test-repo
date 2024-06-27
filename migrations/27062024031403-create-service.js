"use strict";
module.exports = {
    up: function (migration, DataTypes, done) {
        return migration.createTable("Services", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            categoryId: {
                type: DataTypes.INTEGER,
                onDelete: "SET NULL",
                references: {
                    model: "Categorys",
                    key: "id"
                }
            },
            serviceName: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.ENUM('Normal', 'VIP')
            },
            // price: {
            //     type: DataTypes.STRING
            // },

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
        return migration.dropTable("Service")
    }
};