const express = require('express');
const path = require('path');

const data = {};
data.employees = require('../data/data.json');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        data.employees = [...data.employees, {
            "id": req.body.id,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        }];

        res.json(data.employees);
    })
    .put((req, res) => {
        data.employees = [...data.employees, {
            "id": req.body.id,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        }];

        res.json(data.employees);
    })
    .delete((req, res) => {
        const id = req.body.id;
        const employees = data.employees.filter
            ((employee) => employee.id !== id);
        data.employees = employees;
        res.json(data.employees);
    });

router.route('/:id')
    .get((req, res) => {
        res.json({
            "id": req.params.id
        });
    });


module.exports = router;

