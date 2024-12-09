// Seleccionar elementos del DOM
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

// Función para buscar datos en la API
async function searchFootballData(query) {
    const token = "4553dec127msh97b86b12ab4f0eap10b4e3jsnd2f617c61161";
    const apiUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?search=${query}`; // Ajusta el endpoint según la API
  
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": token, // Clave de RapidAPI
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Respuesta de la API:", data); // Inspecciona la estructura de los datos
      return data.response || []; // Ajusta según la respuesta real de la API
    } catch (error) {
      console.error("Error al llamar a la API:", error);
      return [];
    }
  }
  
  // Llamada a la función con un término de búsqueda
  searchFootballData("Barcelona");
  

// Función para mostrar resultados
function displayResults(results) {
  resultsDiv.innerHTML = ""; // Limpiar resultados anteriores
  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  const list = document.createElement("ul");
  results.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - ${item.info}`; // Ajusta según los datos de la API
    list.appendChild(listItem);
  });
  resultsDiv.appendChild(list);
}

// Manejar el formulario
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    resultsDiv.innerHTML = "<p>Por favor, ingresa un término de búsqueda.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>Buscando...</p>";
  const results = await searchFootballData(query);
  displayResults(results);
});
