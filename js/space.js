const resultsContainer = document.getElementById("contenedor");
const btnBuscar = document.getElementById("btnBuscar");
let resultsArray = [];

function cleanList() {
  resultsContainer.innerHTML = "";
  console.log(resultsContainer);
}

function searchResults(query) {
  resultsArray = [];
  fetch(`https://images-api.nasa.gov/search?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      resultsArray.push(...data.collection.items);
      console.log(resultsArray);
      showContent(resultsArray);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

btnBuscar.addEventListener("click", function () {
  let query = document.getElementById("inputBuscar").value;

  cleanList();

  searchResults(query);
});

function showContent(array) {

  if (array.length == 0) {
    let noResultsAlert = document.createElement("div");
    noResultsAlert.classList.add("alert", "alert-dark", "text-center");
    noResultsAlert.setAttribute("role", "alert");
    noResultsAlert.innerHTML = `No se encontraron resultados para tu búsqueda.`;
    resultsContainer.appendChild(noResultsAlert);
  } else {
    for (let element of array) {
      const imgUrl = element.links?.[0]?.href;
      const title = element.data?.[0]?.title || "No hay título disponible";
      const description =
        element.data?.[0]?.description || "No hay descripción disponible";
      const dateCreated =
        element.data?.[0]?.date_created || "No hay fecha disponible";
      let card = document.createElement("div");
      card.classList.add("col-md-4");
      card.innerHTML = `
        <div class="card" style="width: 100%;">
          <img src="${imgUrl}" class="card-img-top fixed-height" alt="...">
          <div class="card-body fixed-card-body">
            <div class="card-content-container">
            <h5 class="card-title">${title}</h5>
            
            <p class="card-text" id="description">${description}</p>
            </div>
            <p class="card-text"><small class="text-body-secondary">${dateCreated}</small></p>
          </div>
        </div>`;
      resultsContainer.appendChild(card);
    }
  }
}
