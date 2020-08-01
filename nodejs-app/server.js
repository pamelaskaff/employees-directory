const express = require("express");
const app = express();
const port = 8080; // default port to listen
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var employeeController = require('./models/Employee/EmployeeController');

//Define route handler for the employees routes
app.get('/employees', employeeController.getAllEmployees);
app.post('/employees', employeeController.createEmployee);
app.put('/employees/:id', employeeController.updateEmployee);
app.delete('/employees/:id', employeeController.deleteEmployee);


// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
