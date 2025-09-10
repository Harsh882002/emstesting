import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function EditEmployee({ show, onHide, onSubmit, employee }) {
    const [currentEmployee, setCurrentEmployee] = useState(employee);

    useEffect(() => {
        setCurrentEmployee(employee);
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentEmployee({ ...currentEmployee, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(currentEmployee);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title><i className="fas fa-edit"></i> Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" name="id" value={currentEmployee.id} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={currentEmployee.name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Manager</Form.Label>
                        <Form.Control type="text" name="manager" value={currentEmployee.manager} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Select name="department" value={currentEmployee.department} onChange={handleChange} required>
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
                        <Form.Control type="number" name="salary" value={currentEmployee.salary} onChange={handleChange} required />
                    </Form.Group>

                    <div className="d-grid mt-4">
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditEmployee;