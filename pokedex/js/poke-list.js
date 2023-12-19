let currentPokemons = [];
let filteredPokemons = [];
let pokemonTotalCount = 0;
let pokemonOffset = 0;
let pokemonLimit = 20;

let content = document.getElementById('pokedex');
let moreBtn = document.getElementById('morePokemons');

function getPokemonByString(input) {
    filteredPokemons = [];
    for (let i = 0; i < currentPokemons.length; i++) {
        if (currentPokemons[i].includes(input)) {
            filteredPokemons.push(currentPokemons[i]);
        }
    }
    if (filteredPokemons == ''){
        showNothingFound();
    } else {
        showFilteredPokemons(filteredPokemons); 
    }    
}

function showNothingFound(){
    document.getElementById('pokedex').innerHTML = '<span class="w-100 text-center">No Pokemon found.</span>';
}

async function showFilteredPokemons(x) {
    content.innerHTML = '';
    for (let i = 0; i < x.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${x[i]}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        const name = responseAsJson['name'];
        const imgUrl = responseAsJson['sprites']['other']['official-artwork']['front_shiny'];
        const id = responseAsJson['id'];
        renderPokemon(name, imgUrl, id);
        document.getElementById('morePokemons').setAttribute('disabled', '');
    }
}

function fetchPokemonNamesToArray(responseAsJson) {
    let pokemon = responseAsJson['results'];
    for (let i = 0; i < pokemon.length; i++) {
        currentPokemons.push(pokemon[i]['name']);
    }
}

async function loadPokemons(val) {
    checkSearch(val);
    moreBtn.setAttribute('disabled', '');

    let url = `https://pokeapi.co/api/v2/pokemon?offset=${pokemonOffset}&limit=${pokemonLimit}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let allPokemons = responseAsJson['results'];
    pokemonTotalCount = responseAsJson['count'];
    pokemonOffset += pokemonLimit;

    fetchPokemonNamesToArray(responseAsJson);
    getSinglePokemon(allPokemons);
    moreBtn.removeAttribute('disabled', '');
}

function checkSearch(val){
    if (val == true){
        pokemonOffset = 0;
        content.innerHTML = '';
        currentPokemons = [];
    }
}

async function loadPokemonDetail(pokemonUrl) {
    let response = await fetch(pokemonUrl);
    let responseAsJson = await response.json();

    const name = responseAsJson['name'];
    const imgUrl = responseAsJson['sprites']['other']['official-artwork']['front_shiny'];
    const id = responseAsJson['id'];
    renderPokemon(name, imgUrl, id);
}

async function getSinglePokemon(allPokemons) {
    for (let i = 0; i < allPokemons.length; i++) {
        const url = allPokemons[i]['url'];
        await loadPokemonDetail(url);
    }
}

function renderPokemon(name, imgUrl, id) {
    let content = document.getElementById('pokedex');
    content.innerHTML += `
        <div onclick="getPokemonDetail('${name}')" class="pkm-list-item d-flex align-items-center flex-column col-sm">
            <img class="pkm-list-img" src="${imgUrl}">
            <h3 class="pkm-list-name">${capitalizeFirstLetter(name)}</h3>
            <span class="pkm-id">#${padId(id, 3)}</span>
        </div>
        `;
}

function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
