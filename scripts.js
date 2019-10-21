// new container for the characters
const url = "https://ghibliapi.herokuapp.com/people";

// getting the dom element where I can then insert a list of characters
const charactersList = document.getElementById("characters");
// helper functions
function createCharacterListNode(element) {
  return document.createElement(element);
}
// helper functions
function append(parent, el) {
  return parent.appendChild(el);
}

// request for the characters
fetchPromise = fetch(url);
fetchPromise
  .then(response => {
    // console.log(response);
    return response.json();
  })
  .then(people => {
    const data = people;
    // console.log(data);

    const names = data
      .map(name => {
        let ul = createCharacterListNode("ul");
        let li = createCharacterListNode("li");
        li.innerHTML = name.name;
        append(charactersList, ul);
        append(ul, li);
      })
      .join("\n");
  })
  .catch(function(err) {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working`;
    app.appendChild(errorMessage);
  });

// Below is the XMLHttpRequest method
// Accessing the dom -> Inserting the film and each card into the root div
const app = document.getElementById("root");

const container = document.createElement("div");
container.setAttribute("class", "container");
// const logo = document.createElement("img");
// logo.src = "logo.png";

app.appendChild(container);
// app.appendChild(logo);

let request = new XMLHttpRequest();

request.open("GET", "https://ghibliapi.herokuapp.com/films", true);
request.onload = function() {
  let data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      // Create an h1 and set the text content to the film's title
      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      // Create a p and set the text content to the film's description
      const p = document.createElement("p");
      movie.description = movie.description.substring(0, 300); // Limit to 300 chars
      p.textContent = `${movie.description}...`; // End with an ellipses

      // Append the cards to the container element
      container.appendChild(card);

      // Each card will contain an h1 and a p
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    // console.log("error");
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working`;
    app.appendChild(errorMessage);
  }
};

request.send();
