const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT= process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());


// mysql
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'node'
});

// Rutas
app.get('/', (req, res)=>{
    res.send("Bienvenido a mi API en NodeJs");
});

// Todos los clientes
app.get('/customers', (req, res)=>{
    const sql= "SELECT * FROM customers";
    connection.query(sql, (error, results)=>{
        if(error) throw error;
        if(results.length >0){
            res.json(results);
        }else{
            res.send("No hay resultados");
        }
    });
});


// Obtener un cliente
app.get('/customers/:id', (req, res)=>{
    res.send("Obtener un cliente");
});

// Registrar cliente
app.post('/add', (req, res)=>{
    res.send("Nuevo cliente");
});

// Actualizar cliente
app.put('/update/:id', (req, res)=>{
    res.send("actualizar cliente");
});

// Eliminar cliente
app.delete('/delete/:id', (req, res)=>{
    res.send("Eliminar cliente");
});

// Checando conexión
connection.connect(error=>{
    if(error) throw error;
    console.log('\x1b[33m%s\x1b[0m',"Database server running");
})

app.listen(PORT, ()=> console.log('\x1b[32m%s\x1b[0m',`Server running on port ${PORT}`));