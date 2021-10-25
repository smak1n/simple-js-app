let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Balbasaur',
      height: 0.7,
      type: ['grass', 'poison']
    },
    {
      name: 'Charizard',
      height: 1.7,
      type: ['fire', 'flying']
    },
    {
      name: 'Slowking',
      height: 2,
      type: ['psychic', 'water']
    },
    {
      name: 'Rhydon',
      height: 1.9,
      type: ['frock', 'ground']
    }
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'type' in pokemon
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
  
    button.addEventListener('click', function(){ //adding Event listener to the button when clicked
      showDetails(pokemon);
    });
  
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  
  function showDetails(pokemon) { //creating function to show more details about pokemon when clicked
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

//adding new pokemon to pokemonList array
pokemonRepository.add({name: 'Natu', height:0.08 , type: ['Psychic', 'Flying']});
console.log(pokemonRepository.getAll());

//Using forEach() function instead of the 'for' loop function // Outside of the IIFE

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

