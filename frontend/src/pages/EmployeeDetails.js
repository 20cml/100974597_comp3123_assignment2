import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };
        fetchEmployee();
    }, [id]);

    if (!employee) return <p>Loading employee details...</p>;

    return (
        <div>
            <h2>Employee Details</h2>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Department:</strong> {employee.department}</p>
        </div>
    );
};

export default EmployeeDetails;

