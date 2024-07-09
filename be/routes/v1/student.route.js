const express = require('express');
const validateRequest = require('../../middlewares/validateRequest');
const StudentController = require('../../controller/student.controller');
const studentCreateSchema = require('../../validation/studentValidation');


const router = express.Router();

// router.post('/',validateRequest(studentCreateSchema), StudentController.createStudent);
router.post('/', StudentController.createStudent);
router.get('/', StudentController.getStudents);
router.get('/:id', StudentController.getStudentById);
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;
