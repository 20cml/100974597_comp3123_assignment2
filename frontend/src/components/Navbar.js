import { useState } from 'react';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState({ department: '', position: '' });
    const [error, setError] = useState('');
    const [employees, setEmployees] = useState([]);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery({
            ...searchQuery,
            [name]: value,
        });
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        const { department, position } = searchQuery;
        try {
            const response = await fetch(
                `/api/employees/search?department=${department}&position=${position}`
            );
            if (!response.ok) {
                setError('No employees found matching the criteria.');
                setEmployees([]);
            } else {
                const data = await response.json();
                setEmployees(data);
                setError('');
            }
        } catch (error) {
            setError('Error searching employees. Please try again later.');
        }
    };
    return (
        <nav>
            <div>
                <a href="/">Login</a> | <a href="/signup">Signup</a> | <a href="/employee-list">Employee List</a>
            </div>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    name="department"
                    placeholder="Search by department"
                    value={searchQuery.department}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    name="position"
                    placeholder="Search by position"
                    value={searchQuery.position}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {employees.length > 0 && (
                <ul>
                    {employees.map((employee) => (
                        <li key={employee._id}>
                            {employee.name} - {employee.position} - {employee.department}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};
export default Navbar;
