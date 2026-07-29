require('dotenv').config();



const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));
const PORT = 3000;
const route = require('./routes/index');

app.use(express.json());
app.use('/', route);

const server = app.listen(PORT, () => {
  console.log('Serveur lancé sur http://localhost:' + PORT);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Serveur arrêté proprement');
    process.exit(0);
  });
});