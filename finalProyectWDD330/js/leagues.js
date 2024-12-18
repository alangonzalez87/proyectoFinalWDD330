console.log("Script cargado");

async function fetchLeagues() {
  const token = "4553dec127msh97b86b12ab4f0eap10b4e3jsnd2f617c61161"; 
  const apiUrl = "https://api-football-v1.p.rapidapi.com/v3/leagues"; 

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
    console.log("Datos completos de la API:", data);

    const desiredLeagueIds = [61, 78, 135, 253, 128, 39, 140];
    const filteredLeagues = data.response.filter((league) =>
      desiredLeagueIds.includes(league.league.id)
    );

    console.log("Ligas filtradas:", filteredLeagues);
    renderLeagues(filteredLeagues); 
  } catch (error) {
    console.error("Error al obtener las ligas:", error);
    document.getElementById("leagues").innerHTML = `<p>Error al cargar las ligas</p>`;
  }
}

function renderLeagues(leagues) {
  const leaguesContainer = document.getElementById("leagues");
  leaguesContainer.innerHTML = ""; 

  leagues.forEach((league) => {
  
    const leagueCard = document.createElement("div");
    leagueCard.classList.add("league-card");

    
    const leagueLink = document.createElement("a");
    leagueLink.href = `/pages/leagues-details.html?id=${league.league.id}`; 
    leagueLink.classList.add("league-link"); 
    
    const leagueImage = document.createElement("img");
    leagueImage.src = league.league.logo; 
    leagueImage.alt = `${league.league.name} - ${league.country.name} logo`;
    leagueImage.classList.add("league-logo"); 
   
    const leagueName = document.createElement("h3");
    leagueName.textContent = league.league.name;
    leagueName.classList.add("league-name"); 

   
    leagueLink.appendChild(leagueImage);
    leagueLink.appendChild(leagueName);

  
    leagueCard.appendChild(leagueLink);

    leaguesContainer.appendChild(leagueCard);
  });
}

console.log("Ejecutando fetchLeagues");
fetchLeagues();
