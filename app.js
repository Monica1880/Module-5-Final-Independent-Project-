// This is your API key - like a special password to talk to the movie database
const API_KEY = "7eab3e7e";

// These lines find the HTML elements on your page (like labeling boxes)
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const movieGrid = document.querySelector("#movieGrid");
const sortSelect = document.querySelector("#sort"); // 👈 grab the dropdown menu

// This is a "basket" to hold the movies we get back
let currentMovies = [];

// -------------------------------------------------------
// 👂 LISTEN for when someone clicks the Search button
// -------------------------------------------------------
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetchMovies(searchTerm);
  }
});

// -------------------------------------------------------
// 🔃 LISTEN for when someone changes the sort dropdown
// -------------------------------------------------------
sortSelect.addEventListener('change', () => {
  const sortValue = sortSelect.value; // What did they pick? "newest", "oldest", or "default"

  if (sortValue === 'newest') {
    // Sort by year, biggest number first (2024 before 2010)
    const sorted = [...currentMovies].sort((a, b) => b.Year - a.Year);
    displayMovies(sorted);
  } else if (sortValue === 'oldest') {
    // Sort by year, smallest number first (1980 before 2020)
    const sorted = [...currentMovies].sort((a, b) => a.Year - b.Year);
    displayMovies(sorted);
  } else {
    // "default" - show the original order from the API
    displayMovies(currentMovies);
  }
});


// -------------------------------------------------------
// 💀 SKELETON CARDS - Show fake "loading" cards while we wait
// (Like a blurry placeholder before a photo loads)
// -------------------------------------------------------
function showSkeletons() {
    const skeletons = Array(10).fill(0).map(() => `
    <div class="movie-card movie-card--skeleton">
      <div class="movie-card__img movie-card__img--skeleton"></div>
      <div class="movie-card__title movie-card__title--skeleton"></div>
      <div class="movie-card__year movie-card__year--skeleton"></div>
    </div>
    `).join('');

    movieGrid.innerHTML = skeletons; // FIX 4: was "moviesGrid", now matches HTML
}


// -------------------------------------------------------
// 📬 FETCH MOVIES - Send a "letter" to the API and get movies back
// -------------------------------------------------------
async function fetchMovies(searchTerm) {
    showSkeletons(); // Show loading cards first

    // This is the "letter" we send to the movie librarian (the API)
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
    
    // The librarian writes back - we open the letter here
    const data = await response.json();

    if (data.Response === 'True') {
        // 🎉 They found movies!
        currentMovies = data.Search; // Save the list of movies
        displayMovies(currentMovies); // Show them on the page
    } else {
        // 😢 No movies found
        movieGrid.innerHTML = '<p style="color:black; padding: 20px;">No movies found. Try a different search!</p>';
        currentMovies = [];
    }
}


// -------------------------------------------------------
// 🎬 DISPLAY MOVIES - Actually show the movie cards on screen
// FIX 5: This whole function was MISSING - now it's here!
// -------------------------------------------------------
function displayMovies(movies) {
    // For each movie in our list, build an HTML "card"
    const movieCards = movies.map(movie => {
        // Some movies don't have a poster - use a placeholder image if so
        const poster = movie.Poster !== 'N/A' 
            ? movie.Poster 
            : 'https://via.placeholder.com/300x445?text=No+Poster';

        return `
        <div class="movie-card">
          <img class="movie-card__img" src="${poster}" alt="${movie.Title}" />
          <h3 class="movie-card__title">${movie.Title}</h3>
          <p class="movie-card__year">${movie.Year}</p>
        </div>
        `;
    }).join(''); // Glue all the cards together

    movieGrid.innerHTML = movieCards; // Put the cards on the page!
}