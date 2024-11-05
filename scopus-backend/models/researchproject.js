// models/ResearchProject.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ResearchProject = sequelize.define('ResearchProject', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Valor predeterminado de 0
        allowNull: false,
    },
}, {
    tableName: 'researchprojects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = ResearchProject;
