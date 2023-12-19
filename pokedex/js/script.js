async function init() {
    await loadPokemons();
}

function hideModal(){
    document.getElementById('modal').classList.add('d-none');
    document.body.style.overflow = 'auto';
}

function showModal(){
    document.getElementById('modal').classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}

function padId(num, totalLength){
    return String(num).padStart(totalLength, '0');
}
