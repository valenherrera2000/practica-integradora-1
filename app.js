const express = require('express');
const app = express();
const port = 8080; // Puerto en el que se ejecutará la aplicación
const mongoose = require('mongoose');
const mongoDBUri = 'mongodb+srv://vherrera010:Jazmin1646!@ecommerce.2aqgasw.mongodb.net/?retryWrites=true&w=majority'; // Reemplaza con tu URL de conexión

mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch((err) => console.error('Error de conexión a MongoDB:', err));

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});