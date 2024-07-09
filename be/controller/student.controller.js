const StudentService = require('../service/student.service');


const createStudent = async (req, res) => {
    try {
        const profile = await StudentService.createStudent(req.body);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// const getStudents = async (req, res) => {
//     try {
//         const profiles = await StudentService.getStudents();
//         res.status(200).json(profiles);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const getStudents = async (req, res) => {
    let page = 1;
    let limit = 10;
    
    if (req.query && req.query.page) {
      page = parseInt(req.query.page);
    }
    if (req.query && req.query.limit) {
      limit = parseInt(req.query.limit);
    }
  
    try {
      const students = await StudentService.getAllStudents(page, limit);
      res.status(200).json(students);
    } catch (error) {
      // Handle errors appropriately
      console.error('Error in fetching students:', error);
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  };




const getStudentById = async (req, res) => {
    try {
        const profile = await StudentService.getStudentById(req.params.id);
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateStudent = async (req, res) => {
    try {
        const profile = await StudentService.updateStudent(req.params.id, req.body);
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const profile = await StudentService.deleteStudent(req.params.id);
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { createStudent, getStudents, getStudentById, updateStudent, deleteStudent };
