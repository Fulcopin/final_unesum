// controllers/researchProjectController.js
const ResearchProject = require('../models/ResearchProject');
const ProjectImage = require('../models/ProjectImage');
const fs = require('fs');
const path = require('path');

exports.createProject = async (req, res) => {
    const { name, description, type, score } = req.body;
    const files = req.files; // Suponiendo que las imágenes se suben en files

    try {
        // Crear el proyecto en la base de datos
        const project = await ResearchProject.create({ name, description, type, score });

        // Guardar cada imagen en la base de datos con la ruta relativa
        const imagePaths = [];
        for (const file of files) {
            // Mover el archivo a la carpeta 'uploads' (ya realizado por multer)
            const imagePath = `uploads/${file.filename}`;

            // Crear el registro de imagen en la base de datos
            const image = await ProjectImage.create({
                path: imagePath, // Ruta relativa de la imagen
                projectId: project.id,
            });

            imagePaths.push(image.path);
        }

        res.status(201).json({ project, images: imagePaths });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ error: 'Error al crear el proyecto.' });
    }
};
