let currentPage = 1;
let filters = { name: '', status: '' };

async function fetchCharacters() {            // get.element ile karakter bilgilerinin çekilmesi
  const tableBody = document.querySelector("#characterTable tbody");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  const details = document.getElementById("characterDetails");

  tableBody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";
  details.style.display = "none";

  const url = new URL("https://rickandmortyapi.com/api/character");  // verilen linkten fetch fonksiyonu ile verilerin çekilmesi
  url.searchParams.append("page", currentPage);
  if (filters.name) url.searchParams.append("name", filters.name);
  if (filters.status) url.searchParams.append("status", filters.status);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("No result found.");
    const data = await response.json();

    tableBody.innerHTML = data.results
      .map(
        (character) =>            //Karakter Ayrıntıları
          `<tr onclick="showDetails(${character.id}, '${character.name}', '${character.status}', '${character.species}', '${character.image}')">
            <td>${character.name}</td>
            <td>${character.status}</td>
            <td>${character.species}</td>
          </tr>`
      )
      .join("");

    prevButton.disabled = !data.info.prev;
    nextButton.disabled = !data.info.next;
  } catch (error) {
    tableBody.innerHTML = "<tr><td colspan='3'>No result found.</td></tr>";
  }
}

function applyFilters() {       //Filtrelerin uygulanması
  filters.name = document.getElementById("filterName").value.trim();
  filters.status = document.getElementById("filterStatus").value;
  currentPage = 1;
  fetchCharacters();
}

function changePage(direction) {   //Sayfa değişimi
  currentPage += direction;
  fetchCharacters();
}

function showDetails(id, name, status, species, image) {        //Karakter bilgilerinin gösterimi
  const details = document.getElementById("characterDetails");
  document.getElementById("detailsName").innerText = `Name: ${name}`;
  document.getElementById("detailsStatus").innerText = `Condition: ${status}`;
  document.getElementById("detailsSpecies").innerText = `Type: ${species}`;
  document.getElementById("detailsImage").src = image;

  details.style.display = "block";
}

fetchCharacters();