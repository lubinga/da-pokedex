let inputField = document.getElementById("search");

inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    startSearch();
  }
});

function startSearch() {
  const inputValue = inputField.value;
  const input = inputValue.toLowerCase();
  clearBody();
  validateInput(input);
}

function clearBody() {
  content.innerHTML = '';
  message.innerHTML = '';
  moreBtn.classList.add('d-none');
}

function validateInput(input) {
  if (!input == '') {
    if (searchSwitch.checked == true){
      showExternalFilteredPokemons(input); // Filter external Pokemon
    } else {
      getPokemonByString(input); // Filter lokal Pokemon
    }    
  } else {
    pokemonOffset = 0;
    searchSwitch.checked = false;
    currentPokemons = [];
    loadPokemons(); // Just load the list with Offset 0 and Limit provided
    moreBtn.classList.remove('d-none');
  }
}

function getPokemonByString(input) {
  filteredPokemons = [];
  filterCurrentPokemonsBySearchTerm(input);
  if (filteredPokemons == '') {
      showMessage('No Pokemon found locally. Try the external search.', 'red');
  } else {
      showFilteredPokemons(filteredPokemons);
  }
}

function filterCurrentPokemonsBySearchTerm(input) {
  for (let i = 0; i < currentPokemons.length; i++) {
      if (currentPokemons[i].includes(input)) {
          filteredPokemons.push(currentPokemons[i]);
      }      
  }
  pokemonOffset = 0;
}


