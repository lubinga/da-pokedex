let input = document.getElementById("search");
let message = document.getElementById("search-message");
let searchSwitch = document.getElementById('searchSwitch');

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPokemon(input.value);
  }
});


async function searchPokemon(pokemonName) {
  document.getElementById('morePokemons').setAttribute('disabled', '');
  if (searchSwitch.checked === true) { //Get pokemon from server
    searchPokemonByApi(pokemonName);
  } else { // search pokemon from loaded list
    if (input.value == '') {
      await loadPokemons(true);
    } else {
      await getPokemonByString(pokemonName);
    }    
  }
}

async function searchPokemonByApi(pokemonName) {
  let nameToLower = pokemonName.toLowerCase();
  await getPokemonDetail(nameToLower);
  input.value = '';
}

