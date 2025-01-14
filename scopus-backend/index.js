require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const scopusRoutes = require('./routes/scopusRoutes');
const authRoutes = require('./routes/authRoutes');
const researchProjectRoutes = require('./routes/researchProjectRoutes');
const bookRoutes = require('./routes/bookRoutes');
const searchRoutes = require('./routes/search');
const sequelize = require('./config/db');
const ResearchProject = require('./models/researchProject');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const moderatorRoutes = require('./routes/moderatorRoutes');
const morgan = require('morgan'); 
// Importar el router del moderador
 // Asegúrate de que la ruta sea correcta

// Importar asociaciones
require('./models/associations');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', moderatorRoutes);
// Rutas
app.use('/api/search', searchRoutes);
app.use('/api', researchProjectRoutes);
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api', scopusRoutes);
app.use('/api/books', bookRoutes);
app.use('/api', userRoutes);

// Usar las rutas del moderador
 //  <--- Agregar esta línea

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
    .then(() => {
        console.log('¡Base de datos y tablas creadas!');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error);
    });

module.exports = {
    sequelize,
    ResearchProject,
    User
};