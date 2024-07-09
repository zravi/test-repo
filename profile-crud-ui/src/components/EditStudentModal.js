import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const EditStudentModal = ({ show, handleClose, student, handleUpdate }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        age: '',
        class: '',
    });

    useEffect(() => {
        if (student) {
            setFormData({
                id: student.id,
                name: student.name,
                age: student.age,
                class: student.class,
            });
        }
    }, [student]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleUpdate(formData);
            handleClose();
            Swal.fire('Success', 'Student updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating student:', error);
            Swal.fire('Error', 'Failed to update student.', 'error');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="text" placeholder="Enter age" name="age" value={formData.age} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formClass">
                        <Form.Label>Class</Form.Label>
                        <Form.Control type="text" placeholder="Enter class" name="class" value={formData.class} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditStudentModal;
