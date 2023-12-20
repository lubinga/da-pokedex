// MAIN Script

let currentPokemons = [];
let filteredPokemons = [];
let pokemonOffset = 0;
let pokemonLimit = 20;

let content = document.getElementById('pokedex');
let moreBtn = document.getElementById('morePokemons');
let message = document.getElementById('user-message');



async function loadPokemons() {
    moreBtn.setAttribute('disabled', '');
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${pokemonOffset}&limit=${pokemonLimit}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let allPokemons = responseAsJson['results'];
    pokemonOffset += pokemonLimit;

    updateCurrentPokemons(responseAsJson);
    await getSinglePokemonUrl(allPokemons);
    moreBtn.removeAttribute('disabled', '');
}

function updateCurrentPokemons(responseAsJson) {
    let pokemon = responseAsJson['results'];
    for (let i = 0; i < pokemon.length; i++) {
        currentPokemons.push(pokemon[i]['name']);
    }
}

async function getSinglePokemonUrl(allPokemons) {
    for (let i = 0; i < allPokemons.length; i++) {
        const url = allPokemons[i]['url'];
        await fetchPokemonDetail(url);
    }
}

async function fetchPokemonDetail(url) {
    let response = await fetch(url);
    let responseAsJson = await response.json();

    const name = responseAsJson['name'];
    const imgUrl = responseAsJson['sprites']['other']['official-artwork']['front_shiny'];
    const id = responseAsJson['id'];
    renderPokemon(name, imgUrl, id);
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


async function showFilteredPokemons(x) {
    for (let i = 0; i < x.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${x[i]}`;
        let response = await fetch(url);
        showFilteredPokemon(response);
    }
}

// Checks external API for a Pokemon
async function showExternalFilteredPokemons(x) {
    showMessage('Trying to fetch pokemon.', '');
    let name = x.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let response = await fetch(url);
    if (response.ok == false) {
        clearBody();
        showMessage('We couldn\`t find that Pokemon. Try again', 'red');
    } else {
        clearBody();
        showFilteredPokemon(response);
    }
}

async function showFilteredPokemon(response) {
    const responseAsJson = await response.json();
    const name = responseAsJson['name'];
    const imgUrl = responseAsJson['sprites']['other']['official-artwork']['front_shiny'];
    const id = responseAsJson['id'];
    renderPokemon(name, imgUrl, id);
    document.getElementById('morePokemons').setAttribute('disabled', '');
}


