const express = require('express');
const path = require('path');
const { getAllEmployees, createNewEmployee, updateOneEmployee, deleteOneEmployee, getOneEmployee } = require('../../controllers/employeesController');

const data = {};
data.employees = require('../data/data.json');
const router = express.Router();

router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateOneEmployee)
    .delete(deleteOneEmployee);

router.route('/:id')
    .get(getOneEmployee);


module.exports = router;

