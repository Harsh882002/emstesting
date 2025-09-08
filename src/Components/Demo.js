import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

function Demo() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentEmployee, setCurrentEmployee] = useState({
    id: '',
    name: '',
    manager: '',
    department: '',
    salary: ''
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleShowAddModal = () => {
    setModalType('add');
    setCurrentEmployee({ id: '', name: '', manager: '', department: '', salary: '' });
    setShowModal(true);
  };

  const handleShowEditModal = (employee) => {
    setModalType('edit');
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        const {id, ...employeewithoutId} = currentEmployee;
        await axios.post('http://localhost:5000/employees', employeewithoutId);
      } else {
        await axios.put(`http://localhost:5000/employees/${currentEmployee.id}`, currentEmployee);
      }
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${employeeId}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Employee Management System</h2>
          <Button variant="light" onClick={handleShowAddModal}>
            <i className="fas fa-user-plus me-2"></i> Add Employee
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive className="text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Manager</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.manager}</td>
                  <td>{employee.department}</td>
                  <td>${employee.salary}</td>
                  <td>
                    <Button variant="outline-info" className="me-2" onClick={() => handleShowEditModal(employee)}>
                      <i className="fas fa-edit me-1"></i>Edit
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>
                      <i className="fas fa-trash-alt me-1"></i>Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          Total Employees: <span className="fw-bold">{employees.length}</span>
        </Card.Footer>
      </Card>
      
      {/* Modal for Add/Edit Employee */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title><i className={`fas ${modalType === 'add' ? 'fa-user-plus' : 'fa-edit'}`}></i> {modalType === 'add' ? 'Add Employee' : 'Edit Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {modalType === 'edit' && (
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="number" name="id" value={currentEmployee.id} onChange={handleChange} readOnly />
              </Form.Group>
            )}
            
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={currentEmployee.name} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                Please select a department.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="number" name="salary" value={currentEmployee.salary} onChange={handleChange} required />
            </Form.Group>

            <div className="d-grid mt-4">
              <Button variant="primary" type="submit">
                {modalType === 'add' ? 'Add' : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Demo;