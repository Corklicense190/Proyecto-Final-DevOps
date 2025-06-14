// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Crear la app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importar ruta de pacientes
const pacientesRouter = require('./routes/pacientes');
app.use('/pacientes', pacientesRouter);

// Ruta raíz 
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Servir archivos estáticos del frontend 
app.use(express.static('public'));

// Ruta para obtener la clave secreta (solo para desarrollo)
app.get('/clave', (req, res) => {
  res.json({ clave: process.env.SECRET_KEY });
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((error) => console.error('❌ Error de conexión a MongoDB:', error));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});