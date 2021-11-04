let pokemonRepository = (function () {
  let pokemonList = [];
  //url link to fetch the data from API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let filter = document.querySelector('#filter');

  //Filter Pokemons
  filter.addEventListener('input', function () {
    let pokemons = document.querySelectorAll('.group-list-item');
    let value = filter.value.toLowerCase();

    pokemons.forEach(function (pokemon) {
      if (pokemon.innerText.toLowerCase().indexOf(value) > -1) {
        pokemon.style.display = '';
      } else {
        pokemon.style.display = 'none';
      }
    });
  });

  //Function to add Pokemon to pokemonList
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
  //Function to return all pokemon from pokemonList 
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    // Selecting pokemon-list class from html
    let pokemonList = document.querySelector('.group-list');
    // creating list items
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item','col-xl-2','col-lg-3','col-md-4','col-8');
    //creating button 
    let button = document.createElement('button');
    // assigning inner text of the button to show pokemons
    button.innerText = pokemon.name;
    //adding class for button
    button.classList.add('btn', 'btn-primary');

    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
  
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    
    //adding Event listener to the button when clicked
    button.addEventListener('click', function(){ 
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
          name: item.name.toUpperCase(),
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
      item.imageUrl = details.sprites.other.home.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }
  //creating function to show more details about pokemon when clicked
  function showDetails(pokemon) { 
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  //showModal function
  let modalContainer = document.querySelector('#pokemonModal');

  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let titleElement = document.createElement('h5');
    titleElement.innerText = pokemon.name;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height + 'm';

    let pokemonTypes = [];
    Object.keys(pokemon.types).forEach(key => {
      pokemonTypes.push(' ' + pokemon.types[key].type.name);
    });

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types: ' + ' ' + pokemonTypes;
    typesElement.classList.add('types-element');

    let pokemonAbilities = [];
    Object.keys(pokemon.abilities).forEach(key => {
      pokemonAbilities.push(' ' + pokemon.abilities[key].ability.name);
    });

    let abilitiesElement = document.createElement('p');
    abilitiesElement.innerText = 'Abilities: ' + pokemonAbilities;
    abilitiesElement.classList.add('abilities-element');

    let imageElement = document.createElement('img');
    imageElement.classList.add('pokeImage');
    imageElement.src = pokemon.imageUrl;

    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    modalBody.append(imageElement);
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

