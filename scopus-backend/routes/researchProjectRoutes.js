// routes/researchProjectRoutes.js

const express = require("express");
const multer = require("multer");
const researchProjectController = require("../controllers/researchProjectController");

const router = express.Router();

// Configuración de multer para guardar las imágenes en una carpeta específica
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Ruta para guardar el proyecto con múltiples imágenes
router.post("/projects", upload.array("images"), researchProjectController.createProject);

module.exports = router;
