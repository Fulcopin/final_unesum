const Document = require('../models/Document');
const ResearchProject = require('../models/researchProject');
const path = require('path');
const fs = require('fs');
exports.getProjectDocuments = async (req, res) => {
    const { projectId } = req.params; // Captura el projectId de la URL

    try {
        console.log('ID del Proyecto recibido:', projectId); // Log para verificar
        const documents = await Document.findAll({
            where: { projectId }, // Filtrar por el ID del proyecto
            attributes: ['id', 'filename', 'path'], // Seleccionar los campos necesarios
        });

        if (!documents.length) {
            return res.status(404).json({ 
                error: 'No se encontraron documentos para este proyecto',
                projectId 
            });
        }

        res.json(documents);
    } catch (error) {
        console.error('Error al obtener los documentos:', error);
        res.status(500).json({ 
            error: 'Error al obtener los documentos',
            details: error.message 
        });
    }
};



exports.getDocument = async (req, res) => {
    try {
        const { filename } = req.params;
        const uploadsDir = path.join(__dirname, '../uploads');

        // Leer todos los archivos en la carpeta uploads
        fs.readdir(uploadsDir, (err, files) => {
            if (err) {
                console.error('Error al leer la carpeta uploads:', err);
                return res.status(500).send('Error al leer la carpeta uploads');
            }

            // Encontrar el primer archivo que contenga el nombre especificado
            const matchingFile = files.find(file => file.includes(filename));
            if (!matchingFile) {
                return res.status(404).send('Archivo no encontrado');
            }

            const filePath = path.join(uploadsDir, matchingFile);
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error('Error al enviar el archivo:', err);
                    res.status(404).send('Archivo no encontrado');
                }
            });
        });
    } catch (error) {
        console.error('Error al obtener el documento:', error);
        res.status(500).json({ 
            error: 'Error al obtener el documento',
            details: error.message 
        });
    }
};
exports.getUserProjects = async (req, res) => {
  const { userId } = req.params;

  try {
    const projects = await ResearchProject.findAll({
      where: { userId },
      attributes: ['id', 'name', 'description', 'type', 'period']
    });

    if (!projects.length) {
      return res.status(404).json({ 
        error: 'No se encontraron proyectos para este usuario',
        userId 
      });
    }

    res.json(projects); 
  } catch (error) {
    console.error('Error al obtener los proyectos:', error); 
    res.status(500).json({ 
      error: 'Error al obtener los proyectos',
      details: error.message 
    });
  }
};