const { Student, Mark } = require('../models');
const { sequelize } = require('../models/index')

const createStudent = async (data) => {
  const { name, age, class: studentClass, marks } = data;

  let transaction;
  try {
    transaction = await sequelize.transaction();
    const student = await Student.create({ name, age, class: studentClass }, { transaction });
    const createdMarks = await Promise.all(marks.map(mark => {
      return Mark.create({
        subject: mark.subject,
        marks: mark.marks,
        studentId: student.id
      }, { transaction });
    }));
    await transaction.commit();
    return { student, marks: createdMarks };
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
};

const getAllStudents = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const students = await Student.findAndCountAll({
      include: 'marks',
      offset,
      limit
    });
    return students;
  } catch (error) {
    throw new Error(`Error fetching students: ${error.message}`);
  }
};


const getStudentById = async (id) => {
  return await Student.findByPk(id, {
    include: 'marks'
  });
}

const updateStudent = async (id, data) => {
  const profile = await Student.findByPk(id);
  if (profile) {
    return await profile.update(data);
  }
  return null;
}

const deleteStudent = async (id) => {
  const profile = await Student.findByPk(id);
  if (profile) {
    await profile.destroy();
    return profile;
  }
  return null;
}


module.exports = { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };
