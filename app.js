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
app.get('/clientes', (req, res)=>{
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
app.get('/clientes/:id', (req, res)=>{
    const {id} = req.params;
    const sql = `SELECT * FROM customers WHERE id=${id}`;
    connection.query(sql, (error, result)=>{
        if(error) throw error;
        if(result.length >0){
            res.json(result);
        }else{
            res.send("No hay resultados");
        }
    });

});

// Registrar cliente
app.post('/agregar', (req, res)=>{
    sql = "INSERT INTO customers SET ?";
    const costumerObject ={
        name: req.body.name,
        city: req.body.city
    }
    connection.query(sql, costumerObject, error =>{
        if(error) throw error;
        res.send("Cliente creado");        
    });
});

// Actualizar cliente
app.put('/actualizar/:id', (req, res)=>{
    const {id} = req.params;
    const {name, city} = req.body;
    const sql = `UPDATE customers SET name='${name}', city='${city}' WHERE id=${id}`;
    connection.query(sql, error =>{
        if(error) throw error;
        res.send("Cliente actualizado");        
    });
});

// Eliminar cliente
app.delete('/eliminar/:id', (req, res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM customers WHERE id=${id}`;
    connection.query(sql, error =>{
        if(error) throw error;
        res.send("Cliente eliminado");        
    });
});

// Checando conexión
connection.connect(error=>{
    if(error) throw error;
    console.log('\x1b[33m%s\x1b[0m',"Database server running");
})

app.listen(PORT, ()=> console.log('\x1b[32m%s\x1b[0m',`Server running on port ${PORT}`));