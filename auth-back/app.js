const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const authenticate = require('./auth/authenticate');

require('dotenv').config();

// Definimos el puerto en el que se ejecutará la aplicación
const PORT = process.env.PORT || 5000;

// Usamos el middleware de CORS y JSON de Express
app.use(cors());
app.use(express.json());

// Definimos una función asíncrona para conectar a la base de datos
async function connectDB() {
    // Usamos Mongoose para conectar a la base de datos
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Connected to DB!');
}

// Conectamos a la base de datos y manejamos cualquier error
connectDB().catch(console.error);

// Definimos las rutas de nuestra aplicación
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/user', authenticate, require('./routes/user'));
app.use('/api/todos', authenticate, require('./routes/todos'));
app.use('/api/refresh-token', require('./routes/refreshToken'));
app.use('/api/signout', require('./routes/signout'));

// Definimos una ruta GET para la raíz de nuestra aplicación
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Iniciamos el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Definimos una ruta GET para verificar que la API está funcionando
app.get('/api', (req, res) => {
    res.send('API is working');
});