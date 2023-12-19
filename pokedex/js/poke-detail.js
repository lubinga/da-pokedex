let id = null;
let imageSrc = '';
let pokemonName = '';
let abilities = [];
let types = [];
let moves = [];
let baseExperience = null;
let height = null;

async function getPokemonDetail(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        let responseAsJson = await response.json();
        collectAbilities(responseAsJson);
        collectTypes(responseAsJson);
        collectMoves(responseAsJson);
        collectOther(responseAsJson);
        renderPokemonDetail();
    } catch (error) {
        // Display the error message on your HTML page
        document.getElementById('error-message').innerHTML = `An error occured. Try again 
        by typing exact the pokemon you want to search.`;
    }


}

function collectAbilities(responseAsJson) {
    let result = responseAsJson['abilities'];
    for (let i = 0; i < result.length; i++) {
        let ability = (result[i]['ability']['name']);
        abilities.push(ability);
    }
}

function collectTypes(responseAsJson) {
    let result = responseAsJson['types'];
    for (let i = 0; i < result.length; i++) {
        types.push(result[i]['type']['name']);
    }
}

function collectMoves(responseAsJson) {
    let result = responseAsJson['moves'];
    for (let i = 0; i < result.length; i++) {
        moves.push(result[i]['move']['name']);
    }
}

function collectOther(responseAsJson) {
    id = responseAsJson['id'];
    baseExperience = responseAsJson['base_experience'];
    height = responseAsJson['height'];
    imageSrc = responseAsJson['sprites']['other']['official-artwork']['front_shiny'];
    pokemonName = capitalizeFirstLetter(responseAsJson['name']);
}

function renderAbilities() {
    let content = '<ul>';
    for (let i = 0; i < abilities.length; i++) {
        content += `<li>${abilities[i]}</li>`;
    }
    content += '</ul>';
    return content;
}

function renderTypes() {
    let content = '<ul>';
    for (let i = 0; i < types.length; i++) {
        content += `<li>${types[i]}</li>`;
    }
    content += '</ul>';
    return content;
}

function renderMoves() {
    let content = '<ul>';
    for (let i = 0; i < moves.length; i++) {
        content += `<li>${moves[i]}</li>`;
    }
    content += '</ul>';
    return content;
}

function renderPokemonDetail() {
    let content = document.getElementById('modal');
    content.innerHTML = '';
    content.innerHTML = /*HTML*/ `
        ${renderDetailHeader()}
        ${renderDetailBody()}       
    `;
    showModal();
}

function renderDetailHeader() {
    return `
    <header class="d-flex overlay-header p-4 mt-4">
    <div class="flex-grow-1"><img onclick="hideModal()" class="back-arrow" src="./img/back.svg"></div>
    <div class="d-flex flex-column align-items-center">
        <h1>${pokemonName}</h1>
        <span>#${padId(id, 3)}</span>
    </div>
</header>`;
}

function renderDetailBody() {
    return `
    <div class="container-fluid mb-3">
    <div class="row">
    <div id="pokemonDetail" class="d-flex w-100 align-items-center flex-column mt-3">
        <div class="detail-image d-flex justify-content-center">
            <img class="pokemon-detail-image" src="${imageSrc}">
        </div>
        
        <div class="additional-information">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-general-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-general" type="button" role="tab" aria-controls="pills-general"
                        aria-selected="true">General</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-abilities-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-abilities" type="button" role="tab" aria-controls="pills-abilities"
                        aria-selected="false">Abilities</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-types-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-types" type="button" role="tab" aria-controls="pills-types"
                        aria-selected="false">Types</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-moves-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-moves" type="button" role="tab" aria-controls="pills-types"
                        aria-selected="false">Moves</button>
                </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-general" role="tabpanel"
                aria-labelledby="pills-general-tab">
                <ul>
                    <li><b>Id: </b>${padId(id, 3)}</li>
                    <li><b>Height: </b>${height}</li>
                    <li><b>Base Experience: </b>${baseExperience}</li>
                </ul>
            </div>

            <div class="tab-pane fade" id="pills-abilities" role="tabpanel" aria-labelledby="pills-abilities-tab">
                ${renderAbilities()}</div>

            <div class="tab-pane fade" id="pills-types" role="tabpanel" aria-labelledby="pills-types-tab">
                ${renderTypes()}</div>

            <div class="tab-pane fade" id="pills-moves" role="tabpanel" aria-labelledby="pills-moves-tab">
            ${renderMoves()}</div>

        </div>
        </div>
    </div>
    </div>
    </div>
    `;
}
