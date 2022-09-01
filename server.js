const express = require ('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
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
db.query(`SELECT * FROM employee WHERE id=1`, (err, rows)=>{
    if(err){
        console.log.apply(err);
    }
    console.log(rows);
});
 // Delete a employee
// db.query(`DELETE FROM employee WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//Create employee
const sql = `INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (?,?,?,?)`;
const params = [22, 'Ronald', 'Firbank', 3, 3];
db.query(sql, params, (err, result)=>{
    if (err){
        console.log(err);
    }
    console.log(result);
});

// Default response for any other request (Not Found)
app.use((req, res)=>{
    res.status(404).end();
});  //last one or it'll override others

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}!`);
});