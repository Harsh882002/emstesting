import React, { useState } from 'react';
import { Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {

    const [modalType, setModalType] = useState('add');

    const handleShowAddModal = () => {
        setModalType('add');
        setCurrentEmployee({ id: '', name: '', manager: '', department: '', salary: '' });
        setShowModal(true);
    };
  return (
    <div className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Employee Management System</h2>
            <Button variant="primary" onClick={handleShowAddModal}>
                Add Employee
            </Button>
        </div>
    </div>
  )
}

export default Navbar
