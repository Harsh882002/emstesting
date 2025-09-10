import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Navbar({ onShowAddModal }) {
  return (
    <Card.Header className="bg-light text-dark d-flex flex-column flex-md-row justify-content-between align-items-center">
      <h2 className="mb-2 mb-md-0"><i className="fa-solid fa-users-gear me-3"></i>Employee Management System</h2>
      <Button className="py-2 w-50 w-md-100" variant="outline-primary" onClick={onShowAddModal}>
        <i className="fas fa-user-plus me-2"></i> Add Employee
      </Button>
    </Card.Header>
  );
}

export default Navbar;