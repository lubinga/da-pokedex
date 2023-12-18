let currentPokemons = [];
let pokemonTotalCount = 0;
let pokemonOffset = 0;
let pokemonLimit = 40;

async function loadPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${pokemonOffset}&limit=${pokemonLimit}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let allPokemons = responseAsJson['results'];
    pokemonTotalCount = responseAsJson['count'];

    pokemonOffset += pokemonLimit;   
    getSinglePokemon(allPokemons);
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