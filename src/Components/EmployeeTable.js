import React from 'react';
import { Table, Button } from 'react-bootstrap';

// Helper function to format salary
const formatSalary = (salary) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(salary);
};

// Helper function to format ID
const formatId = (id) => {
  return `EMP${String(id).padStart(3, '0')}`;
};

function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <Table striped variant='light' bordered hover className="">
        <thead className="table-dark">
          <tr className='text-center'>
            <th className="py-3">ID</th>
            <th className="py-3">Name</th>
            <th className="py-3">Manager</th>
            <th className="py-3">Department</th>
            <th className="py-3">Salary</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td className="align-middle">{formatId(employee.id)}</td>
              <td className="align-middle">{employee.name}</td>
              <td className="align-middle">{employee.manager}</td>
              <td className="align-middle">{employee.department}</td>
              <td className="align-middle">{formatSalary(employee.salary)}</td>
              <td className="text-center align-middle">
                <Button variant="outline-success" className="me-2 py-2 my-1" onClick={() => onEdit(employee)}>
                  <i className="fas fa-edit me-1"></i>Edit
                </Button>
                <Button className="align-middle py-2 my-1" variant="outline-danger" onClick={() => onDelete(employee.id)}>
                  <i className="fas fa-trash-alt me-1"></i>Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeTable;