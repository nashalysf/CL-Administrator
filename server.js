const express = require ('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3003;
const app = express();
const inputCheck = require('./utils/inputCheck');

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// //route connection check
// app.get('/', (req, res)=>{
//     res.json({
//         message: 'Hello World'
//     });
// });

// Connect database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'assyen74',
        database: 'employee_trackerDB'
    },
    console.log('Connected to the employee_trackerDB database')
)
// --EMPLOYEES--
 // Delete a employee
 app.delete('/api/employee/:id', (req, res) =>{
    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result)=>{
        if(err){
            res.statusMessage(400).json({err: res.message});
        } else if(!result.affectedRows){
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: `Employee deleted`,
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
 });

//Create employee
app.post('/api/employee', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'manager_id', 'role_id');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }
    const sql = `INSERT INTO employee (first_name, last_name, manager_id, role_id)
    VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.manager_id, body.role_id];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//Update manager_id on employee
app.put("/api/employee/:id",(req, res) =>{
    const errors = inputCheck(req.body, 'manager_id');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }
const sql = `UPDATE employee SET manager_id = ?
    WHERE ID = ?`;
    const params = [req.body.manager_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({error: err.message});
        } else if (!result.affectedRows){
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

//RETRIVE employee
app.get('/api/employee', (req, res) => {
    const sql = 'SELECT * FROM employee';
    db.query(sql, (err, rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message:"success",
            data: rows
        });
    });
});
//single
app.get('/api/employee/:id', (req, res) =>{
    const sql = `SELECT * FROM employee WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) =>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// --MANAGERS--
 // Delete a manager
 app.delete('/api/managers/:id', (req, res) =>{
    const sql = `DELETE FROM managers WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result)=>{
        if(err){
            res.statusMessage(400).json({err: res.message});
        } else if(!result.affectedRows){
            res.json({
                message: 'Manager not found'
            });
        } else {
            res.json({
                message: `Manager deleted`,
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
 });

//Create manager
app.post('/api/managers', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'department_id');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }
    const sql = `INSERT INTO managers (first_name, last_name, role_id, department_id)
    VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.department_id];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//RETRIVE manager
app.get('/api/managers', (req, res) => {
    const sql = 'SELECT * FROM managers';
    db.query(sql, (err, rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message:"success",
            data: rows
        });
    });
});
//single
app.get('/api/managers/:id', (req, res) =>{
    const sql = `SELECT * FROM managers WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) =>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// --DEPARTMENT--
 // Delete a department
 app.delete('/api/department/:id', (req, res) =>{
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result)=>{
        if(err){
            res.statusMessage(400).json({err: res.message});
        } else if(!result.affectedRows){
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: `Department deleted`,
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
 });

//Create department
app.post('/api/department', ({body}, res) => {
    const errors = inputCheck(body, 'dep_name');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }
    const sql = `INSERT INTO department (dep_name)
    VALUES (?)`;
    const params = [body.dep_name];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//RETRIVE departments
app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
    });
//single
app.get('/api/department/:id', (req, res) =>{
    const sql = `SELECT * FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) =>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// --ROLE--
// Delete a role
app.delete('/api/role/:id', (req, res) =>{
    const sql = `DELETE FROM role WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result)=>{
        if(err){
            res.statusMessage(400).json({err: res.message});
        } else if(!result.affectedRows){
            res.json({
                message: 'Role not found'
            });
        } else {
            res.json({
                message: `Role deleted`,
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
 });
 //CREATE role
 app.post('/api/role', ({body}, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});
//RETRIVE roles
app.get('/api/role', (req, res) => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
    });
//single
app.get('/api/role/:id', (req, res) =>{
    const sql = `SELECT * FROM role WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) =>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Default response for any other request (Not Found)
app.use((req, res)=>{
    res.status(404).end();
});  //last one or it'll override others

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});