// import React from 'react'
// import Demo from './Components/Demo'

// const App = () => {
//   return (
//     <div>
//       <Demo />
//     </div>
//   )
// }

// export default App


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from './Components/Navbar';
import Searchbar from './Components/Searchbar';
import EmployeeTable from './Components/EmployeeTable';
import Pagination from './Components/Pagination';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

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

  // Handlers for Modals
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (employee) => {
    setCurrentEmployee(employee);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentEmployee(null);
  };

  // CRUD Operations
  const handleAddSubmit = async (newEmployee) => {
    try {
      await axios.post('http://localhost:5000/employees', newEmployee);
      fetchEmployees();
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleEditSubmit = async (updatedEmployee) => {
    try {
      await axios.put(`http://localhost:5000/employees/${updatedEmployee.id}`, updatedEmployee);
      fetchEmployees();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`http://localhost:5000/employees/${employeeId}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  // Search and Pagination Logic
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const filteredEmployees = employees.filter(employee =>
    String(employee.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (employee.manager && employee.manager.toLowerCase().includes(searchQuery.toLowerCase())) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(employee.salary).includes(searchQuery)
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Navbar onShowAddModal={handleShowAddModal} />
        <Card.Body>
          <Searchbar onSearch={handleSearch} onClear={handleClearSearch} value={searchQuery} />
          <EmployeeTable
            employees={currentEmployees}
            onEdit={handleShowEditModal}
            onDelete={handleDelete}
          />
          <Pagination
            itemsPerPage={employeesPerPage}
            totalItems={filteredEmployees.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Card.Body>
        <Card.Footer className="text-muted text-center py-3">
          Total Employees: <span className="fw-bold">{employees.length}</span>
        </Card.Footer>
      </Card>
      
      {/* Modals for Add and Edit */}
      <AddEmployee show={showAddModal} onHide={handleCloseAddModal} onSubmit={handleAddSubmit} />
      {currentEmployee && (
        <EditEmployee
          show={showEditModal}
          onHide={handleCloseEditModal}
          onSubmit={handleEditSubmit}
          employee={currentEmployee}
        />
      )}
    </Container>
  );
}

export default App;