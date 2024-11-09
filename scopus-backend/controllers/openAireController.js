// backend/controllers/openAireController.js
const axios = require('axios');

exports.searchOpenAIRE = async (req, res) => {
  const { searchType, query } = req.query;
  let searchParam;

  switch (searchType) {
    case 'autor':
      searchParam = `author=${query}`;
      break;
    case 'doi':
      searchParam = `doi=${query}`;
      break;
    case 'nombre':
      searchParam = `title=${query}`;
      break;
    default:
      return res.status(400).json({ error: 'Tipo de búsqueda no válido' });
  }

  try {
    const response = await axios.get('https://api.openaire.eu/search/publications', {
      params: { [searchType]: query },
    });
    res.json(response.data.response.results.result);
  } catch (error) {
    console.error("Error en la búsqueda en OpenAIRE:", error);
    res.status(500).json({ error: "Error en la búsqueda en OpenAIRE" });
  }
};
