let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/"; //url link to fetch the data from API

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
        console.log('pokemon is not correct');
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list"); // Selecting pokemon-list class from html
    let listpokemon = document.createElement("li"); // creating list items
    let button = document.createElement("button");  //creating button
    button.innerText = pokemon.name;  // assigning inner text of the button to show pokemons
    button.classList.add("button-class"); //adding styles from styles.css to the newly created button
  
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener('click', function(){ //adding Event listener to the button when clicked
      showDetails(pokemon);
    });
  }
  
  // create load function to fetch data from the API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //create load details function
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Adding the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) { //creating function to show more details about pokemon when clicked
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

//Using forEach() function instead of the 'for' loop function // Outside of the IIFE
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

