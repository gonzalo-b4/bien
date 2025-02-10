const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); // Importar el paquete cors

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

connectDB();

const app = express();

// Configurar CORS con opciones específicas
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stores', require('./routes/store'));
app.use('/api/reports', require('./routes/report')); // Añadir la ruta de reportes

// Sincronizar modelos con la base de datos
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));