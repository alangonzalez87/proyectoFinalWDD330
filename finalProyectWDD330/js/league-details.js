// Obtener el ID de la liga desde la URL
const urlParams = new URLSearchParams(window.location.search);
const leagueId = urlParams.get('id');

// API Key
const token = "4553dec127msh97b86b12ab4f0eap10b4e3jsnd2f617c61161"; // Reemplaza con tu API Key
const apiUrl = `https://api-football-v1.p.rapidapi.com/v3/leagueTable?league=${leagueId}&season=2024`; // Ajusta para usar la temporada correcta

async function fetchLeagueDetails() {
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
    console.log("Datos de la liga:", data);

    
    const league = data.response[0];
    document.getElementById("season").textContent = `Temporada: ${league.season}`;

    
    const topPlayers = league.top_scorers; 
    const topPlayersList = document.getElementById("top-players");
    topPlayersList.innerHTML = "";
    topPlayers.forEach(player => {
      const playerItem = document.createElement("li");
      playerItem.textContent = `${player.player.name} (${player.team.name}) - Goles: ${player.statistics.goals.total}`;
      topPlayersList.appendChild(playerItem);
    });

   
    const tableBody = document.getElementById("score-table").querySelector("tbody");
    tableBody.innerHTML = ""; 
    league.standings[0].forEach((team, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${team.team.name}</td>
        <td>${team.all.played}</td>
        <td>${team.all.goals.for}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener los detalles de la liga:", error);
    document.getElementById("league-details").innerHTML = `<p>Error al cargar los detalles de la liga.</p>`;
  }
}

// Llamar a la función para obtener los detalles de la liga
fetchLeagueDetails();
