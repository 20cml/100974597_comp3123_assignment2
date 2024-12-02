import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleEmployeeDeleted = async (employeeId) => {
        try {
            await axios.delete(`http://localhost:5001/api/employees/${employeeId}`);
            setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee._id !== employeeId)
            );
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleAddEmployee = () => {
        navigate('/add-employee');
    };
    return (
        <div>
            <h1>Employee List</h1>
            <button onClick={handleAddEmployee}>Add New Employee</button>
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
                                {/* Actions: View, Edit, Delete */}
                                <button onClick={() => navigate(`/employee-details/${employee._id}`)}>View</button>
                                <button onClick={() => navigate(`/edit-employee/${employee._id}`)}>Edit</button>
                                <button onClick={() => handleEmployeeDeleted(employee._id)}>Delete</button>
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
export default EmployeeList;
