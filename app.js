const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT= process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.all('*', function(req, res, next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","X-Requested-With");
//     res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE, PATCH");
//     next();
// });

// mysql
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'concredito'
});

// Rutas
app.get('/', (req, res)=>{
    res.send("Bienvenido a mi API en NodeJs");
});

// Todos los prospectos
app.get('/prospectos', (req, res)=>{
    const sql= "SELECT * FROM prospectos";
    connection.query(sql, (error, results)=>{
        if(error) throw error;
        if(results.length >0){
            res.json(results);
        }else{
            res.send("No hay resultados");
        }
    });
});


// Obtener un prospecto
app.get('/prospectos/:id', (req, res)=>{
    const {id} = req.params;
    const sql = `SELECT * FROM prospectos WHERE id=${id}`;
    connection.query(sql, (error, result)=>{
        if(error) throw error;
        if(result.length >0){
            res.json(result);
        }else{
            res.send("No hay resultados");
        }
    });

});

// Registrar prospecto
app.post('/prospectos/add', (req, res)=>{
    sql = "INSERT INTO prospectos SET ?";
    const prospectoObject ={
        name: req.body.name,
        apellidop: req.body.apellidop,
        apellidom: req.body.apellidom,
        calle: req.body.calle,
        numero: req.body.numero,
        colonia: req.body.colonia,
        codigopostal: req.body.codigopostal,
        telefono: req.body.telefono,
        rfc: req.body.rfc,
        documento: req.body.documento,
        estatus: "E",
    }
    console.log(prospectoObject);
    connection.query(sql, prospectoObject, error =>{
        if(error) throw error;
        res.send("Prospecto creado");        
    });
});

// Actualizar prospecto
app.patch('/prospectos/:id', (req, res)=>{
    const {id} = req.params;
    const {estatus, observacion} = req.body;
    const sql = `UPDATE prospectos SET estatus='${estatus}', observacion='${observacion}' WHERE id=${id}`;
    connection.query(sql, error =>{
        if(error) throw error;
        res.send("Prospecto actualizado");        
    });
});

// Eliminar cliente
app.delete('/prospectos/:id', (req, res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM customers WHERE id=${id}`;
    connection.query(sql, error =>{
        if(error) throw error;
        res.send("Prospecto eliminado");        
    });
});

// Checando conexión
connection.connect(error=>{
    if(error) throw error;
    console.log('\x1b[33m%s\x1b[0m',"Database server running");
})

app.listen(PORT, ()=> console.log('\x1b[32m%s\x1b[0m',`Server running on port ${PORT}`));