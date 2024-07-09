// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Students', [
//       {
//         name: 'John Doe',
//         age: 20,
//         class: 'Physics',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Jane Smith',
//         age: 22,
//         class: 'Chemistry',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         name: 'Sam Wilson',
//         age: 19,
//         class: 'Mathematics',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('Students', null, {});
//   }
// };

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const students = await queryInterface.sequelize.query(
      `SELECT id from Student;`
    );

    const studentRows = students[0];

    return queryInterface.bulkInsert('Marks', [
      {
        subject: 'Physics',
        marks: 85,
        studentId: studentRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subject: 'Chemistry',
        marks: 90,
        studentId: studentRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subject: 'Mathematics',
        marks: 95,
        studentId: studentRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Marks', null, {});
  }
};
