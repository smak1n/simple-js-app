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

//Using forEach() function instead of the 'for' loop function
function myPokemonRepository(pokemon) {
    document.write('<p>' + pokemon.name + ' (Height:' + pokemon.height + ')');
      if (pokemon.height > 1.9) {
        document.write(' - Wow, that\'s big!');
      }
        document.write('</p>')
}
pokemonList.forEach(myPokemonRepository);