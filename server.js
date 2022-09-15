const express = require ('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

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
);
db.query(`SELECT * FROM employee `, (err, rows)=>{
    console.log(rows);
});
 // Delete a employee
 db.query(`DELETE FROM employee WHERE id = 12`, (err, result) => {
   if (err) {
     console.log(err);
   }
   console.log(result);
 });

//Create employee
const sql = `INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUES (?,?,?,?,?)`;
const params = [12,"Gina", "Port", 2, 4];
db.query(sql, params, (err, result)=>{
    if (err){
        console.log(err);
    }
    console.log(result);
});
//RETRIVE EMPLOYEE DATA
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

//RETRIEVE INGLE EMPLOYEE DATA
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

// Default response for any other request (Not Found)
app.use((req, res)=>{
    res.status(404).end();
});  //last one or it'll override others

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}!`);
});