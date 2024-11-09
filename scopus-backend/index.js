// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const scopusRoutes = require('./routes/scopusRoutes');
const authRoutes = require('./routes/authRoutes');
const researchProjectRoutes = require('./routes/researchProjectRoutes');
const bookRoutes = require('./routes/bookRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
const searchRoutes = require('./routes/search');

app.use('/api/search', searchRoutes);
// Rutas
app.use('/api', researchProjectRoutes);
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api', scopusRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
