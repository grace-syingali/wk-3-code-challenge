// Fetch the first movie's details when the page loads
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    // Update the DOM with the movie details
    const movieDetails = document.querySelector('.movie-details');
    const poster = movieDetails.querySelector('.poster');
    const title = movieDetails.querySelector('.title');
    const runtime = movieDetails.querySelector('.runtime');
    const showtime = movieDetails.querySelector('.showtime');
    const tickets = movieDetails.querySelector('.tickets');
    const buyTicketBtn = movieDetails.querySelector('.buy-ticket');

    poster.src = data.poster;
    title.textContent = data.title;
    runtime.textContent = `Runtime: ${data.runtime} minutes`;
    showtime.textContent = `Showtime: ${data.showtime}`;
    tickets.textContent = `Tickets: ${data.capacity - data.tickets_sold} available`;

    // Buy Ticket button event listener
    buyTicketBtn.addEventListener('click', () => {
      const availableTickets = data.capacity - data.tickets_sold;
      if (availableTickets > 0) {
        data.tickets_sold++;
        tickets.textContent = `Tickets: ${data.capacity - data.tickets_sold} available`;
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Fetch all movies for the menu
fetch('/films')
  .then(response => response.json())
  .then(data => {
    // Populate the films menu
    const filmsList = document.getElementById('films');
    filmsList.innerHTML = '';

    data.forEach(film => {
      const li = document.createElement('li');
      li.classList.add('film', 'item');
      li.textContent = film.title;
      filmsList.appendChild(li);
    });

    // Film menu item click event listener
    filmsList.addEventListener('click', (event) => {
      if (event.target.classList.contains('film')) {
        const filmId = event.target.dataset.filmId;
        fetch(`/films/${filmId}`)
          .then(response => response.json())
          .then(filmData => {
            // Update the movie details with the selected film's data
            const movieDetails = document.querySelector('.movie-details');
            const poster = movieDetails.querySelector('.poster');
            const title = movieDetails.querySelector('.title');
            const runtime = movieDetails.querySelector('.runtime');
            const showtime = movieDetails.querySelector('.showtime');
            const tickets = movieDetails.querySelector('.tickets');
            const buyTicketBtn = movieDetails.querySelector('.buy-ticket');

            poster.src = filmData.poster;
            title.textContent = filmData.title;
            runtime.textContent = `Runtime: ${filmData.runtime} minutes`;
            showtime.textContent = `Showtime: ${filmData.showtime}`;
            tickets.textContent = `Tickets: ${filmData.capacity - filmData.tickets_sold} available`;

            // Enable the Buy Ticket button
            buyTicketBtn.disabled = false;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
