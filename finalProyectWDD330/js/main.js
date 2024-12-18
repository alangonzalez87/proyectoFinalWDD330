import { loadHeaderFooter } from "/src/utils/utils.mjs";


document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
});


const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");


async function searchFootballData(query) {
    const token = "4553dec127msh97b86b12ab4f0eap10b4e3jsnd2f617c61161";
    const apiUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?search=${query}`; 
  
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": token, 
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Respuesta de la API:", data); 
      return data.response || []; 
    } catch (error) {
      console.error("Error al llamar a la API:", error);
      return [];
    }
  }
  
  
  searchFootballData("Barcelona");
  


function displayResults(results) {
  resultsDiv.innerHTML = ""; 
  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  const list = document.createElement("ul");
  results.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - ${item.info}`; 
    list.appendChild(listItem);
  });
  resultsDiv.appendChild(list);
}


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
