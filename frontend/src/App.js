import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/employee-list" element={<EmployeeList />} />
                <Route path="/employee-details/:id" element={<EmployeeDetails />} />
                <Route path="/add-employee" element={<AddEmployee />} />
                <Route path="/edit-employee/:id" element={<EditEmployee />} />
            </Routes>
        </Router>
    );
};

export default App;
