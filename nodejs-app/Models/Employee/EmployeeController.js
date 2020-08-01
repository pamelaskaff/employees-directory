const express = require('express');
const path = require('path');
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
