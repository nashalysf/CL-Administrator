const express = require ('express');

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


// Default response for any other request (Not Found)
app.use((req, res)=>{
    res.status(404).end();
});  //last one or it'll override others

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}!`);
});