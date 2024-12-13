// Obtener el ID de la liga desde la URL
const urlParams = new URLSearchParams(window.location.search);
const leagueId = urlParams.get("id");

if (!leagueId) {
  console.error("No se encontró el ID de la liga en la URL.");
  document.getElementById("league-details").innerHTML = `<p>Error: No se encontró el ID de la liga.</p>`;
} else {
  console.log("League ID:", leagueId);
}

// API Key y configuración base
const token = "4553dec127msh97b86b12ab4f0eap10b4e3jsnd2f617c61161";
const baseUrl = "https://api-football-v1.p.rapidapi.com/v3";

// Función para obtener los detalles de la liga
async function fetchLeagueDetails() {
  const apiUrl = `${baseUrl}/standings?league=${leagueId}&season=2024`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": token,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    });

    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

    const data = await response.json();
    console.log("Datos de la liga:", data);

    const league = data.response[0].league;
    const standings = data.response[0].league.standings[0];

    // Mostrar nombre de la liga y temporada
    document.getElementById("season").textContent = `Liga: ${league.name} - Temporada: ${data.response[0].season}`;

    // Mostrar tabla de posiciones
    renderLeagueTable(standings);

    // Mostrar máximos goleadores
    renderTopScorers(leagueId, 2024);
  } catch (error) {
    console.error("Error al obtener los detalles de la liga:", error);
    document.getElementById("league-details").innerHTML = `<p>Error al cargar los detalles de la liga.</p>`;
  }
}

// Función para renderizar la tabla de posiciones
function renderLeagueTable(standings) {
  const tableBody = document.getElementById("score-table").querySelector("tbody");
  tableBody.innerHTML = "";

  standings.forEach((team, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${team.team.name}</td>
      <td>${team.all.played}</td>
      <td>${team.all.goals.for}</td>
      <td>${team.points}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Función para obtener y renderizar los máximos goleadores
async function renderTopScorers(leagueId, season) {
  const apiUrl = `${baseUrl}/players/topscorers?league=${leagueId}&season=${season}`;
  const topScorersList = document.getElementById("top-players");

  topScorersList.innerHTML = "<p>Cargando máximos goleadores...</p>";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": token,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    });

    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

    const data = await response.json();
    console.log("Datos de los máximos goleadores:", data);

    if (!data.response || data.response.length === 0) {
      topScorersList.innerHTML = "<p>No hay máximos goleadores disponibles para esta liga y temporada.</p>";
      return;
    }

    topScorersList.innerHTML = data.response
      .map(
        (scorer) => `
          <li>
            <img src="${scorer.player.photo}" alt="${scorer.player.name} photo" width="50" />
            ${scorer.player.name} (${scorer.statistics[0].team.name}) - Goles: ${scorer.statistics[0].goals.total}
          </li>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error al obtener los máximos goleadores:", error);
    topScorersList.innerHTML = "<p>Error al cargar los máximos goleadores.</p>";
  }
}

// Llamar a la función principal
fetchLeagueDetails();
