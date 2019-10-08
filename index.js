////Importing 
const Joi = require('joi');
const express = require('express');
const app = express();
var employees = require('./employees.json');

// Middleware function
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Welcome Select the employee!!!');
});

// Create an express API so that when you hit the endpoint with a 
// GET request we want the api to respond with all data on the employees.
// All Employees
app.get('/api/myendpointname.com/employees', (req, res) => {
    res.send([employees]);
});

// By one Employee
app.get('/api/myendpointname.com/employees/:id', (req, res) => {
    const employee = employees.find(c => c.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('The employee was not faund.')
    res.send(employee)
});


// app.get('/api/myendpointname/employees/:id', (req, res) => {
//     const employee = employees.find(c => c.id ===parseInt(req.params.id));
//     if (!course) return res.status(404).send('The course with the given ID was not found.')
//     res.send(course)
//  });


// If you hit the endpoint with their employeeID, we want to hand up only the information on that one employee.


////////////////////////////////////          HARD   /////////////////////////////////////////////////////////

// Post Method
app.post('/api/myendpointname.com/employees', (req, res) => {
    const { error } = validateEmployee(req.body);//result.error
    //400 Bad request
    if (error) return res.status(400).send(result.error.details[0].message);

    const employee = {
        id: employees.length + 1,
        name: req.body.name,
        departmentName: req.body.departmentName,
        salary: req.body.salary
    };
    employees.push(employee);
    res.send(employee);
})

// Put Method //need
app.put('/api/myendpointname.com/employees/:id', (req, res) => {
    // look up the employees and if not existing, return 404
    const employee = employees.find(c => c.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('The employee was not found.')

    // validate
    //object distructoring
    const { error } = validateEmployee(req.body);//result.error
    if (error) return res.status(400).send(result.error.details[0].message);

    // update course
    employee.name = req.body.name;
    res.send(employee)
    // return the updated course
});

// Delete Method
app.delete('/api/myendpointname.com/employees/:id', (req, res) => {
    // look up the employee
    // Not existing, return 404
    const employee = employees.find(c => c.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('The employee was not fould.')

    // delete
    const index = employees.indexOf(employee);
    employees.splice(index, 1);

    // Return the same course
    res.send(employee);
});

// joi Validation
function validateEmployee(employee) {
    const schema = {
        name: Joi.string().min(3).required(),
        departmentName: Joi.string().required(),
        salary: Joi.number().integer().required()
    }
    return Joi.validate(employee, schema);
}

app.listen(3000, () => console.log('Listening on port 3000'));
