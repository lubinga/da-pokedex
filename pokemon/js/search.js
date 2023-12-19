let input = document.getElementById("search");
let message = document.getElementById("search-message");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPokemon(input.value);
  }
});


async function searchPokemon(pokemonName) {
    await getPokemonDetail(pokemonName);
}

