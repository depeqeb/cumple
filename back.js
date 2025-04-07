const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Configurar conexión MySQL
const db = mysql.createConnection({
    host: 'localhost:3306',
    user: 'david',
    password: '#Holamundo10',   // Tu contraseña de MySQL
    database: 'citas_romanticas'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Ruta para servir el HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cita.html'));
});

// Ruta para procesar el formulario
app.post('/submit-cita', (req, res) => {
  const { nombre, fecha, hora, lugar, mensaje } = req.body;

  const query = 'INSERT INTO citas (nombre, fecha, hora, lugar, mensaje) VALUES (?, ?, ?, ?, ?)';
  const values = [nombre, fecha, hora, lugar, mensaje];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar cita:', err);
      res.status(500).send('Error al guardar la cita');
    } else {
      console.log('Cita guardada exitosamente');
      res.redirect('/'); // O podrías redirigir a una página de confirmación
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
