

import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import config from '../constant';

const AddStudentModal = ({ show, handleClose, fetchStudents }) => {
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: '',
    class: '',
    marks: []
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleMarksChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMarks = [...newStudent.marks];
    updatedMarks[index][name] = value;
    setNewStudent({ ...newStudent, marks: updatedMarks });
  };

  const addMarkField = () => {
    setNewStudent({
      ...newStudent,
      marks: [...newStudent.marks, { subject: '', marks: '' }]
    });
  };

  const removeMarkField = index => {
    const updatedMarks = [...newStudent.marks];
    updatedMarks.splice(index, 1);
    setNewStudent({ ...newStudent, marks: updatedMarks });
  };

  const handleAddSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${config.BASE_URL}/student`, newStudent);
      handleClose(); 
      fetchStudents(); 
      Swal.fire('Success', 'Student added successfully!', 'success');
    } catch (error) {
      console.error('Error adding student:', error);
      Swal.fire('Error', 'Failed to add student.', 'error');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="name" value={newStudent.name} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Enter age" name="age" value={newStudent.age} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formClass">
            <Form.Label>Class</Form.Label>
            <Form.Control type="text" placeholder="Enter class" name="class" value={newStudent.class} onChange={handleInputChange} required />
          </Form.Group>
          {/* Marks input fields */}
          {newStudent.marks.map((mark, index) => (
            <div key={index}>
              <Form.Group controlId={`formSubject-${index}`}>
                <Form.Label>Subject {index + 1}</Form.Label>
                <Form.Control type="text" placeholder="Enter subject" name="subject" value={mark.subject} onChange={e => handleMarksChange(index, e)} required />
              </Form.Group>
              <Form.Group controlId={`formMarks-${index}`}>
                <Form.Label>Marks {index + 1}</Form.Label>
                <Form.Control type="number" placeholder="Enter marks" name="marks" value={mark.marks} onChange={e => handleMarksChange(index, e)} required />
              </Form.Group>
              {index > 0 && (
                <Button variant="danger" onClick={() => removeMarkField(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}{"  "}
          <Button variant="secondary" onClick={addMarkField}>
            Add More
          </Button>
          <Button variant="primary" type="submit" style={{ marginLeft: '10px' }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddStudentModal;
