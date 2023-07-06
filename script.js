/* JavaScript */

// Base URL for fetching movie data
const baseUrl = "http://localhost:3000/films";

// Fetch movies and populate the film list
function fetchMovies() {
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((films) => {
        let li = document.createElement("li");
        li.textContent = films.title;
        li.addEventListener("click", (e) => {
          let buttonContent = document.querySelector("button#buy-ticket");
          buttonContent.textContent = "Buy Tickets";
          let title = document.getElementById("movie-title");
          title.textContent = films.title;
          let img = document.getElementById("movie-poster");
          img.src = films.poster;
          let showTime = document.getElementById("showtime");
          showTime.textContent = films.showtime;
          let runTime = document.getElementById("runtime");
          runTime.textContent = `${films.runtime} Minutes`;
          let tickets = document.querySelector("div#ticket-counter");
          tickets.textContent = films.capacity - films.tickets_sold;
        });
        document.querySelector("ul#films").appendChild(li);
      });
function fetchFilms() {
    fetch('https://api.npoint.io/0b2aef194151f5771a43/films/')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Unable to fetch film data');
        }
      })
      .then(data => renderFilms(data))
      .catch(error => {
        console.log(error);
        renderErrorMessage();
      });
  } 
  // Fetch movies on page load
fetchMovies();
  function renderFilms(data) {
    const div = document.getElementById('card');
    const ul = document.getElementById('films');
    //Set the initial movie as the base movie
function baseMovie() {
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("h3#movie-title").textContent = data[0].title;
      document
        .querySelector("img#movie-poster")
        .setAttribute("src", `${data[0].poster}`);
      document.querySelector("div#showtime").textContent = data[0].showtime;
      document.querySelector("div#runtime").textContent = `${data[0].runtime} Minutes`;
      document.querySelector("ul#films").firstElementChild.remove();
      document.querySelector("div#ticket-counter").textContent =
        data[0].capacity - data[0].tickets_sold;
    });
}
    data.forEach(movie => {
        const li = document.createElement('li');
        li.classList.add('pointer', 'bold-italic-text');
        li.innerHTML = movie.title;
        //Set the base movie on page load
        baseMovie();
    
        const filmCard = document.createElement("div");
        filmCard.classList.add('film-card');
        filmCard.innerHTML = `
          <img src="${movie.poster}" height="500px" width="300px"/>
          <h2 class="bold-text">${movie.title}</h2>
          <p class="bold-text">${movie.description}</p>
          <p class="film-byline">Made by ABVSS1300</p>
          <p><span class="highlight bold-text">Runtime: ${movie.runtime}</span></p>
          <p><span class="highlight bold-text">Showtime: ${movie.showtime}</span></p>
          <p class="bold-italic-text">Available tickets: ${(movie.capacity) - (movie.tickets_sold)}</p>
          <button class="buy-button">Buy ticket</button>
        `;
        // Function to handle ticket purchase
function buyTicket() {
    let button = document.querySelector("button#buy-ticket");
    button.addEventListener("click", function () {
      let currentLi = document.querySelector("div#ticket-counter");
      let number = parseInt(currentLi.textContent);
      if (number > 0) {
        currentLi.textContent = currentLi.textContent - 1;
      } else {
        button.textContent = "Sold Out";
        button.style.backgroundColor = "gray";
        button.style.cursor = "not-allowed";
      }
        li.addEventListener('click', () => {
            div.innerHTML = "";
            div.appendChild(filmCard);
            if (!filmCard.classList.contains('active')) {
              filmCard.classList.add('active');
              div.appendChild(filmCard);
            }
          });
      
          ul.appendChild(li);
        });
      }
      // Call the buyTicket function
buyTicket();
      function renderErrorMessage() {
        const div = document.getElementById('card');
        div.innerText = "Unable to fetch film data. Please try again later.";
      }
      
      fetchFilms();
      
      }