// https://www.omdbapi.com/?i=tt3896198&apikey=7eab3e7e&s

const API_KEY = "7eab3e7e";

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const movieGrid = document.querySelector("#movieGrid");
// const resultsInfo = document.querySelector("#resultsInfo");
// const sortSelect = document.querySelector("#sortSelect");

let currentMovies = [];

// Event Listeners
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = SearchInput.value.trim();
  if (searchTerm) {
    fetchMovies(searchTerm);
  }
});



// Show Skeleton Loading Cards
function showSkeletons() {
    const skeletons = Array(10).fill(0).map(() => `
    <div class="movie-card movie-card--skeleton">
    <div class="movie-card__img movie-card__img--skeleton"></div>
    <div class="movie-card__title movie-card__title--skeleton"></div>
    <div class="movie-card__year movie-card__year--skeleton"></div>
    </div>
    `).join('');

    moviesGrid.innerHTML = skeletons;
}



// Fetch Movies From API
async function fetchMovies(searchTerm) {
    showSkeletons();

    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${searchTerm}`);
    const data = await response.json();

    if (data.Response === 'True') {
        currentMovies = data.Search;
        resultsInfo.textContent = `Showing: ${searchTerm}`;
        sortSelect.value = `default`;
        displayMovies(currentMovies);
    } else {
        resultsInfo.textContent = `No results found for: ${searchTerm}`;
        movieGrid.innerHTML = '<p>No movies found.</p>';
        currentMovies = [];
    }
}

// Display Movies


