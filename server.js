const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3024;

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'PHW#84#jeor',  
  database: 'dbdb'
});

connection.connect(err => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ' + err.stack);
    return;
  }
  console.log('Подключено к базе данных MySQL');
});


app.use(express.static('public'));


app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM shipments', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
