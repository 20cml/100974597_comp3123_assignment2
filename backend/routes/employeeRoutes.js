const express = require('express');
const {
    createEmployee,
    getEmployees,
    searchEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('./controllers/employeeController');

const router = express.Router();

router.post('/employees', createEmployee);
router.get('/employees', getEmployees);
router.get('/employees/search', searchEmployees);
router.get('/employees/:id', getEmployeeById);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

module.exports = router;
