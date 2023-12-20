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

function clearBody() {
    moreBtn.setAttribute('disabled', '');
    moreBtn.classList.add('d-none');
    content.innerHTML = '';
    message.innerHTML = '';
}

function showMessage(message, color){
    let content = document.getElementById('user-message');
    let col = '';    
    if (color){ col = `style="color:${color};"`}

    let res = `<span ${col} class="w-100 text-center">`;
    res += message;
    res += `</span>`;    
    content.innerHTML = res;
}
