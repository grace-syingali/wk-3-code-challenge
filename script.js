const baseurl = "https://api.npoint.io/77e14bdb8558314e1159/films/";
fetch(baseurl)
function Movies(){
    fetch(baseurl)
    .then((response)=> response.json())
    .then((data)=> {
        data.forEach((films) =>{
    let li = document.createElement("li");
       li.textContent = films.title;
             li.addEventListener("click",
            (e)=>{
              let button =
               document.getElementById("buy-ticket")
              button.textContent = "Buy Tickets"
                let movie =
             document.getElementById("movie-name");
                movie.textContent =
             films.title;
                let image =
             document.getElementById("movie-image");
               image.src =
             films.poster;
                let showTime =
             document.getElementById("show-time");
               showTime.textContent =
             films.showtime;
              let runTime =
             document.getElementById("run-time");
               runTime.textContent =
             `${films.runtime} Minutes`;
            let tickets =
           document.getElementById("ticket-Holder");
                 tickets.textContent = films["capacity"] - films["tickets_sold"]
            })
             document.querySelector("ul#films").appendChild(li)
         })
     })
 }Movies()
 function firstMovie(){ fetch(baseurl)
    .then(response => response.json())
    .then(data => {
    document.querySelector("h3#movie-name").textContent = data[0]["title"]
    document.querySelector("img#movie-image").setAttribute("src",`${data[0]["poster"]}`)
    document.querySelector("div#show-time").textContent = data[0]["showtime"]
    document.querySelector("div#run-time").textContent = `${data[0]["runtime"]} Minutes`
    document.querySelector("ul#films").firstElementChild.remove()
    document.querySelector("div#ticket-Holder").textContent = data[0]["capacity"] - data[0]["tickets_sold"]
    })
    }
    firstMovie()
    function Ticket(){
        let ticketButton = document.querySelector("button#buy-ticket")
        ticketButton.addEventListener("click",function(){
        let list = document.querySelector("div#ticket-Holder")
        let listNumber = parseInt(list.textContent)
        if(listNumber >0){
        list.textContent = list.textContent -1}
        else {document.querySelector("button#buy-ticket").textContent = "Sold Out"
          alert("We are sold out!")}
      }
      )
      }
      Ticket()