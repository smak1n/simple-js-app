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
document.write(`<ul>`); //creating unordered list
for (let i = 0; i < pokemonList.length; i++)  {

    document.write(`<li> <p> ${pokemonList[i].name} (Height: ${pokemonList[i].height})`); //creating list items for unordered list and Writes pokemon names and heights on website's DOM 
    if (pokemonList[i].height > 1.9)  {
      document.write(' - Wow, that\'s big!'); //adding code to highlight big pokemons in the list
    }
    document.write(`</p> </li>`);
}
document.write(`</ul>`);