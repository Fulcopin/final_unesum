const axios = require('axios');

exports.searchScielo = async (req, res) => {
  const { searchType, query } = req.query;
  let url = '';
  let params = {
    fmt: 'json', // Formato de salida
    api: 'v2', // Versión de la API, si es necesario
    collection: 'scl', // Colección, ajustar según el caso
    begin_date: '2021-01', // Ejemplo de fecha de inicio
    end_date: '2021-12', // Ejemplo de fecha de fin
  };

  // Construir URL y parámetros según el tipo de búsqueda
  switch (searchType) {
    case 'autor':
      url = 'https://usage.apis.scielo.org/reports/ir_a1';
      params.author = query; // SciELO requiere este parámetro para autor
      break;
    case 'doi':
      url = 'https://usage.apis.scielo.org/reports/ir_a1';
      params.pid = query; // SciELO permite buscar por PID para artículos
      break;
    case 'nombre':
      url = 'https://usage.apis.scielo.org/reports/ir_a1';
      params.title = query; // Suponiendo que la API permite 'title' (verificar en la doc.)
      break;
    default:
      return res.status(400).json({ error: 'Tipo de búsqueda no válido' });
  }

  try {
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error("Error en la búsqueda en SciELO:", error);
    res.status(500).json({ error: "Error en la búsqueda en SciELO" });
  }
};
