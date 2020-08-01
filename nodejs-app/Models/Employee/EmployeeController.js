const express = require('express');
const path = require('path');
const employees = require('../../database/employees.json')
const dataPath = path.join(__dirname, '../../database/employees.json');
const fs = require('fs');

// // helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }
        callback(returnJson ? JSON.parse(data) : data);
    });
};


const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
    fs.writeFile(filePath, fileData, encoding, (err, data) => {
        if (err) {
            throw err;
        }
        callback();
    });
};

//Check if required parameters are passed
function checkParams(req) {
    console.log("in checkparams", req.body)
    if (req.body.name == '' || req.body.location == '' || req.body.age == null || req.body.image == '' || req.body.role == '' || req.body.email == '' || req.body.phone == '')
        return false;
    else
        return true;
}

//Get all employees
exports.getAllEmployees = function (req, res) {
    try {
        readFile((dataPath) => {
            res.status(200).send(JSON.parse(dataPath));
        });
    } catch (err) {
        res.status(500).send("Internal server error");
    }
}

//Create a new Employee
exports.createEmployee = function (req, res) {
    try {
        if (!checkParams(req)) {
            console.log("MISSING INFOOO!")
            res.status(422).send("Missing information");
        }
        readFile(dataPath => {
            const newEmployeeId = Object.keys(dataPath).length + 1;
            req.body.id = newEmployeeId.toString();
            employees.push(req.body);

            // add the new employee id
            dataPath[newEmployeeId.toString()] = req.body;

            // add employee to the json database file
            writeFile(JSON.stringify(employees), () => {
                res.status(200).send("New Employee added");
                console.log("res", res.body);
            });
        }, true);
    } catch{
        console.log("There was a problem creating an employee", err);
        res.status(500).send("There was a problem adding the employee");
    }
};
