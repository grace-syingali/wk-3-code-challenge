// Fetch data from db.json
fetch("db.json")
  .then((response) => response.json())
  .then((data) => {
    const movieList = data.films;
    const filmListElement = document.getElementById("film-list");

    // Populate movie details
    function populateMovieDetails(movie) {
      const posterElement = document.getElementById("poster");
      const titleElement = document.getElementById("title");
      const runtimeElement = document.getElementById("runtime");
      const showtimeElement = document.getElementById("showtime");
      const availableTicketsElement =
        document.getElementById("available-tickets");
      const buyTicketButton = document.getElementById("buy-ticket");
      const successMessage = document.getElementById("success-message");

      posterElement.src = movie.poster;
      titleElement.textContent = movie.title;
      runtimeElement.textContent = `Runtime: ${movie.runtime} mins`;
      showtimeElement.textContent = `Showtime: ${movie.showtime}`;
      availableTicketsElement.textContent = `Available Tickets: ${
        movie.capacity - movie.tickets_sold
      }`;

      // Event listener for Buy Ticket button
      buyTicketButton.addEventListener("click", () => {
        if (movie.tickets_sold < movie.capacity) {
          movie.tickets_sold++;
          availableTicketsElement.textContent = `Available Tickets: ${
            movie.capacity - movie.tickets_sold
          }`;
          successMessage.textContent = "Ticket purchased successfully!";
          successMessage.style.color = "green";

          // Update tickets_sold in the db.json file
          updateTicketsSold(movie.id, movie.tickets_sold);
        } else {
          successMessage.textContent = "Sorry, no more tickets available!";
          successMessage.style.color = "red";
        }

        // Check if movie is sold out and update UI
        if (movie.tickets_sold === movie.capacity) {
          buyTicketButton.textContent = "Sold Out";
          buyTicketButton.disabled = true;

          const filmItem = document.querySelector(
            `li[data-film-id="${movie.id}"]`
          );
          if (filmItem) {
            filmItem.classList.add("sold-out");
          }
        }
      });
    }

    // Update tickets_sold in the db.json file
    function updateTicketsSold(movieId, ticketsSold) {
      const updatedMovie = movieList.find((movie) => movie.id === movieId);
      if (updatedMovie) {
        updatedMovie.tickets_sold = ticketsSold;
      }
    }

    // Populate upcoming films list
    function populateFilmList() {
      for (const movie of movieList) {
        const filmItem = document.createElement("li");
        filmItem.classList.add("film", "item");
        filmItem.textContent = movie.title;
        filmItem.setAttribute("data-film-id", movie.id);
        filmListElement.appendChild(filmItem);

        filmItem.addEventListener("click", () => {
          populateMovieDetails(movie);
        });
      }
    }

    // Delete a film from the db.json file
    function deleteFilm(movieId) {
      const filmIndex = movieList.findIndex((movie) => movie.id === movieId);
      if (filmIndex !== -1) {
        movieList.splice(filmIndex, 1);
      }
    }

    // Initialize the page
    populateFilmList();

    // Event listener for Delete button
    filmListElement.addEventListener("click", (event) => {
      if (event.target.matches(".delete-button")) {
        const filmItem = event.target.parentElement;
        const movieId = filmItem.getAttribute("data-film-id");
        filmItem.remove();
        deleteFilm(movieId);
      }
    });
  })
  .catch((error) => console.log(error));