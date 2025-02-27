import express from "express"
import dotenv from 'dotenv'
dotenv.config()
import { routes } from "./routes"
import Sequelize from "./config/database"
import path from 'path';

const PORT = process.env.PORT || "3001"; // Hace uso del puerto en .env o del 3001
const cors = require('cors');
const app = express(); // Nueva aplicación Express

// Configuración de CORS
app.use(cors({
  origin: '*',  // O puedes poner un dominio específico como 'http://localhost:4200'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Asegúrate de permitir 'OPTIONS'
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// También puedes agregar un manejo explícito para las solicitudes OPTIONS si es necesario
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

// Middleware para procesar el cuerpo de la solicitud
app.use(express.json()); // Para recibir datos JSON en el cuerpo
app.use(express.urlencoded({ extended: true })); // Para recibir datos de formularios

// Servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(routes)
app.listen(PORT,() => console.log(`Escuchando ${PORT}`)) //escucha el puerto e informa

// Verificar la conexión a la base de datos
  Sequelize.authenticate()
    .then(() => {
      console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch((err:any) => {
      console.error('Error al conectar con la base de datos:', err);
    });