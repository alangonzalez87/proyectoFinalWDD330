console.log("Script cargado");
async function fetchLeagues() {
    const token = "4553dec127msh97b86b12ab4f0eap10b4e3jsnd2f617c61161"; // Reemplaza con tu API Key
    const apiUrl = "https://api-football-v1.p.rapidapi.com/v3/leagues"; // Endpoint de ligas
  
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
      const desiredLeagueIds = [ 61, 78, 135,253,128,39,140]

    const filteredLeagues = data.response.filter((league) =>
      desiredLeagueIds.includes(league.league.id)
      
    );

    console.log("Ligas filtradas:", filteredLeagues);
      renderLeagues(filteredLeagues); // Llama a la función para mostrar los datos
    } catch (error) {
      console.error("Error al obtener las ligas:", error);
      document.getElementById("leagues").innerHTML = `<li>Error al cargar las ligas</li>`;
    }
  }
  
  function renderLeagues(leagues) {
    const leaguesContainer = document.getElementById("leagues");
    leaguesContainer.innerHTML = "";
  
    leagues.forEach((league) => {
      // Crear un enlace para cada liga
      const leagueElement = document.createElement("li");
      const leagueLink = document.createElement("a");
      leagueLink.href = `/pages/leagues-details.html?id=${league.league.id}`; // Enlace a la página de detalles
      leagueLink.classList.add("league-link"); // Agregar clase para estilos
      leagueLink.textContent = league.name;
  
      // Crear el contenedor para el escudo de la liga
      const leagueInfo = document.createElement("div");
      leagueInfo.classList.add("league-info");
  
      // Agregar el escudo de la liga
      const leagueImage = document.createElement("img");
      leagueImage.src = league.league.logo; // URL del escudo de la liga
      leagueImage.alt = `${league.league.name} - ${league.country.name} logo`; // País de la liga
  
      leagueImage.classList.add("league-logo"); // Agregar clase para estilos
  
      // Agregar el nombre de la liga
      const leagueName = document.createElement("span");
      leagueName.textContent = league.league.name;
      leagueName.classList.add("league-name"); // Agregar clase para estilos
  
      // Agregar escudo y nombre al contenedor de la liga
      leagueInfo.appendChild(leagueImage);
      leagueInfo.appendChild(leagueName);
  
      // Agregar el contenedor de liga al enlace
      leagueLink.appendChild(leagueInfo);
      
      // Agregar el enlace al elemento de la liga
      leagueElement.appendChild(leagueLink);
      
      // Agregar el elemento de la liga a la lista
      leaguesContainer.appendChild(leagueElement);
    });
  }
  
  
  
  console.log("Ejecutando fetchLeagues");
fetchLeagues();