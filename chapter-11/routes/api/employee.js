const express = require('express');
const path = require('path');
const { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../../controllers/employeesController');

const data = {};
data.employees = require('../../model/employees.json');
const router = express.Router();

router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee);

router.route('/:id')
    .get(getEmployee);


module.exports = router;

