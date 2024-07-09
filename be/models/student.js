'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.hasMany(models.Mark, {
        foreignKey: 'studentId',
        as: 'marks'
      });
    }
  }
  Student.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    class: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};
