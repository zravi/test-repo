'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    static associate(models) {
      Mark.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
      });
    }
  }
  Mark.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    subject: {
      type: DataTypes.STRING
    },
    marks: {
      type: DataTypes.INTEGER
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Students',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Mark',
  });
  return Mark;
};
