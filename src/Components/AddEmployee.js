import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function AddEmployee({ show, onHide, onSubmit }) {
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        manager: '',
        department: '',
        salary: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newEmployee);
        setNewEmployee({
            name: '',
            manager: '',
            department: '',
            salary: ''
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title><i className="fas fa-user-plus"></i> Add Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={newEmployee.name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Manager</Form.Label>
                        <Form.Control type="text" name="manager" value={newEmployee.manager} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Select name="department" value={newEmployee.department} onChange={handleChange} required>
                            <option value="">-- Select Department --</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control type="number" name="salary" value={newEmployee.salary} onChange={handleChange} required />
                    </Form.Group>

                    <div className="d-grid mt-4">
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddEmployee;