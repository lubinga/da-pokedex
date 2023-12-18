async function init() {
    await loadPokemons();
}

function hideModal(){
    document.getElementById('modal').classList.add('d-none');
}

function showModal(){
    document.getElementById('modal').classList.remove('d-none');
}

function padId(num, totalLength){
    return String(num).padStart(totalLength, '0');
}
