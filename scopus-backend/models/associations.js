const ResearchProject = require('./researchProject'); // Asegúrate de que el nombre del archivo sea correcto
const User = require('./User'); // Asegúrate de que el nombre del archivo sea correcto
ResearchProject.belongsTo(User, { as: 'creator', foreignKey: 'userId' });
ResearchProject.belongsToMany(User, {
    through: 'project_participants',
    foreignKey: 'project_id',
    as: 'participants'
});

User.belongsToMany(ResearchProject, {
    through: 'project_participants',
    foreignKey: 'user_id',
    as: 'projects'
});