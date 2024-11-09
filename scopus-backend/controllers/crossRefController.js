// backend/controllers/crossRefController.js
const axios = require('axios');

exports.searchCrossRef = async (req, res) => {
  const { searchType, query } = req.query;
  let searchQuery;

  switch (searchType) {
    case 'autor':
      searchQuery = `query.author=${query}`;
      break;
    case 'doi':
      searchQuery = `query=${query}`;
      break;
    case 'nombre':
      searchQuery = `query.title=${query}`;
      break;
    default:
      return res.status(400).json({ error: 'Tipo de búsqueda no válido' });
  }

  try {
    const response = await axios.get('https://api.crossref.org/works', {
      params: { [searchType === 'doi' ? 'query' : 'query.bibliographic']: query },
    });
    res.json(response.data.message.items);
  } catch (error) {
    console.error("Error en la búsqueda en CrossRef:", error);
    res.status(500).json({ error: "Error en la búsqueda en CrossRef" });
  }
};
