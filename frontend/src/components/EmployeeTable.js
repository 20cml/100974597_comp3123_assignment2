import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeTable = ({ employees, onEmployeeDeleted }) => {
    const handleDelete = async (employeeId) => {
        try {
            const response = await axios.delete(`http://localhost:5001/api/employees/${employeeId}`);
            if (response.status === 200) {
                onEmployeeDeleted(employeeId);
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div>
            <h1>Employee List</h1>
            <Link to="/add-employee">
                <button>Add New Employee</button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>
                                <Link to={`/employee-details/${employee._id}`}>View</Link> |
                                <Link to={`/edit-employee/${employee._id}`}>Edit</Link> |
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No employees found</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
