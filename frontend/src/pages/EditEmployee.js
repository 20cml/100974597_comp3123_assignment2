import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/employees/${id}`);
                setName(response.data.name);
                setPosition(response.data.position);
                setDepartment(response.data.department);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5001/api/employees/${id}`, { name, position, department });
            navigate('/employee-list'); // Redirect to Employee List
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Employee</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
            />
            <button type="submit">Update Employee</button>
        </form>
    );
};

export default EditEmployee;
