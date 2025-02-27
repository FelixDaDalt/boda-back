"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_1 = require("./routes");
const database_1 = __importDefault(require("./config/database"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || "3001"; // Hace uso del puerto en .env o del 3001
const cors = require('cors');
const app = (0, express_1.default)(); // Nueva aplicación Express
// Configuración de CORS
app.use(cors({
    origin: '*', // O puedes poner un dominio específico como 'http://localhost:4200'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Asegúrate de permitir 'OPTIONS'
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
// También puedes agregar un manejo explícito para las solicitudes OPTIONS si es necesario
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});
// Middleware para procesar el cuerpo de la solicitud
app.use(express_1.default.json()); // Para recibir datos JSON en el cuerpo
app.use(express_1.default.urlencoded({ extended: true })); // Para recibir datos de formularios
// Servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use(routes_1.routes);
app.listen(PORT, () => console.log(`Escuchando ${PORT}`)); //escucha el puerto e informa
// Verificar la conexión a la base de datos
database_1.default.authenticate()
    .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
})
    .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
});
