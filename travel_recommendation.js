document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".search-form");
  const clearButton = document.getElementById("clear-btn");
  const recommendationsDiv = document.getElementById("recommendations");

  let travelData = [];

  fetch("/travel_recommendation_api.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      return response.json();
    })
    .then((data) => {
      travelData = data;
      console.log(travelData); 

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = document
          .querySelector(".search-input")
          .value.trim()
          .toLowerCase();
        displayRecommendations(keyword);
      });

      
      clearButton.addEventListener("click", () => {
        document.querySelector(".search-input").value = "";
        clearRecommendations();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // Function to clear recommendations
  function clearRecommendations() {
    recommendationsDiv.innerHTML = "";
  }

  function displayRecommendations(keyword) {
    clearRecommendations(); 

    if (!keyword) {
      return; 
    }

    let foundResults = false;

    travelData.countries.forEach((country) => {
      country.cities.forEach((city) => {
        if (
          city.name.toLowerCase().includes(keyword) 
        ) {
          const cityDiv = document.createElement("div");
          cityDiv.innerHTML = `
                <img src="${city.imageUrl}" alt="${city.name}" width="200">
              <h3>${city.name}</h3>
              <p>${city.description}</p>
              <button>Visit</button>
            `;
          recommendationsDiv.appendChild(cityDiv);
          foundResults = true;
        }
      });
    });

    // Filter and display temples
    travelData.temples.forEach((temple) => {
      if (
        temple.name.toLowerCase().includes(keyword)
      ) {
        const templeDiv = document.createElement("div");
        templeDiv.innerHTML = `
          <img src="${temple.imageUrl}" alt="${temple.name}" width="200">
            <h3>${temple.name}</h3>
            <p>${temple.description}</p>
            <button>Visit</button>
          `;
        recommendationsDiv.appendChild(templeDiv);
        foundResults = true;
      }
    });

    // Filter and display beaches
    travelData.beaches.forEach((beach) => {
      if (
        beach.name.toLowerCase().includes(keyword)
      ) {
        const beachDiv = document.createElement("div");
        beachDiv.innerHTML = `
            <img src="${beach.imageUrl}" alt="${beach.name}">
            <h3>${beach.name}</h3>
            <p>${beach.description}</p>
            <button>Visit</button>
          `;
        recommendationsDiv.appendChild(beachDiv);
        foundResults = true;
      }
    });

    // Display message if no results found
    if (!foundResults) {
      const noResultsDiv = document.createElement("div");
      noResultsDiv.textContent = "No results found";
      recommendationsDiv.appendChild(noResultsDiv);
    }
  }
});
