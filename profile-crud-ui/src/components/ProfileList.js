import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Table, Pagination, Button, Modal, Form } from 'react-bootstrap';
import AddStudentModal from './AddStudentModal';
import EditStudentModal from './EditStudentModal';
import config from '../constant'; 

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStudentId, setDeleteStudentId] = useState(null);



  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/student?page=${currentPage}&limit=${studentsPerPage}`);
      setStudents(response.data.rows);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {

    fetchStudents();
  }, [currentPage, studentsPerPage]);


  const handleAddModalOpen = () => setShowAddModal(true);
  const handleAddModalClose = () => setShowAddModal(false);


  const handleEditModalOpen = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => setShowEditModal(false);

  const handleStudentUpdate = async (updatedStudent) => {
    try {
      const response = await axios.put(`${config.BASE_URL}/student/${updatedStudent.id}`, updatedStudent);
      console.log('Student updated:', response.data);
      fetchStudents();
      handleEditModalClose();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteModalOpen = (studentId) => {
    setDeleteStudentId(studentId);
    setShowDeleteModal(true);
  };
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteStudent = async () => {
    try {
      await axios.delete(`${config.BASE_URL}/student/${deleteStudentId}`);
      fetchStudents();
      handleDeleteModalClose();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  const confirmDeleteStudent = (studentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this student record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${config.BASE_URL}/student/${studentId}`);
          fetchStudents(); 
          Swal.fire('Deleted!', 'Your student record has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting student:', error);
          Swal.fire('Error!', 'Failed to delete student record.', 'error');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your student record is safe :)', 'info');
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    
      <div style={{ padding: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2>Student List</h2>
          <Button variant="success" onClick={handleAddModalOpen}>
            Add Student
          </Button>
        </div>
  
        <AddStudentModal show={showAddModal} handleClose={handleAddModalClose} fetchStudents={fetchStudents} />
  
        {selectedStudent && (
          <EditStudentModal show={showEditModal} handleClose={handleEditModalClose} student={selectedStudent} handleUpdate={handleStudentUpdate} />
        )}
  
        <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteModalClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteStudent}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
  
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Class</th>
              <th>Marks</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>
                  {student.marks.length > 0 ? (
                    student.marks.map((mark) => (
                      <div key={mark.id}>
                        Subject: {mark.subject}, Marks: {mark.marks}
                      </div>
                    ))
                  ) : (
                    'No marks'
                  )}
                </td>
                <td>{new Date(student.createdAt).toLocaleString()}</td>
                <td>{new Date(student.updatedAt).toLocaleString()}</td>
                <td>
                  <Button variant="info" onClick={() => handleEditModalOpen(student)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => confirmDeleteStudent(student.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        <Pagination style={{ justifyContent: 'flex-end' }}>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next onClick={() => paginate(currentPage + 1)} />
        </Pagination>
      </div>
  );
};

export default StudentList;
