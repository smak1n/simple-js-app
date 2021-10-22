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

    return {
        getAll: getAll,
        add: add
    };
})();

//adding new pokemon to pokemonList array
pokemonRepository.add({name: 'Natu', height:0.08 , type: ['Psychic', 'Flying']});
console.log(pokemonRepository.getAll());

//Using forEach() function instead of the 'for' loop function // Outside of the IIFE
function myPokemonRepository(pokemon) {
    document.write('<p>' + pokemon.name + ' (Height:' + pokemon.height + ')');
      if (pokemon.height > 1.9) {
        document.write(' - Wow, that\'s big!');
      }
        document.write('</p>')
}
pokemonRepository.getAll().forEach(myPokemonRepository);

