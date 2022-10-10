let id='';
const fname = document.getElementById('fname');

window.addEventListener('keypress', automatic_data_entry);
function automatic_data_entry(e){
    if(e.key === 'Enter'){
        if(fname.value === ''){
            return;
        }else{
        id = fname.value;     
        posalji(id);
        fname.value = '';
        id='';
        }
    }else{
        fname.value = fname.value + e.key;
    }
}

function posalji(id){
    
    window.removeEventListener('keypress', automatic_data_entry, false);

    let url = '/';

    let xhr = new XMLHttpRequest();
    xhr.open('POST',url);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.addEventListener('load', function(){
        if(xhr.status === 200){
            sent_successfully();
        }
        else{
            sent_unsuccessfully();
        }
    });

    xhr.addEventListener('error', ()=>{
        console.log("Greska prilikom slanja")
    });
    xhr.send("id="+id);
}

const conteiner = document.getElementById('conteiner');
const h1 = document.getElementById('h1');
const buttons = document.getElementsByClassName('button');

function sent_successfully(){
    conteiner.classList.add('successfully');
    h1.textContent = 'Uspesno ocitavanje';
    h1.style.fontSize = '6vw';
    fname.classList.add('none');
    buttons[0].classList.add('none');
    sendbtn.classList = 'none';
    backbtn.classList = 'none';
    enterManuallybtn.classList = 'none';

    setTimeout(function(){
        location.reload();
    }, 1000);
}

function sent_unsuccessfully(){
    conteiner.classList.add('unsuccessfully');
    h1.textContent = 'Nespesno ocitavanje';
    fname.classList.add('none');
    buttons[0].classList.add('none');
    sendbtn.classList = 'none';
    backbtn.classList = 'none';
    enterManuallybtn.classList = 'none';

    setTimeout(function(){
        location.reload();
    }, 1000);
}

const enterManuallybtn = document.getElementById('enter_manually');
const backbtn = document.getElementById('back');

enterManuallybtn.addEventListener('click', (e)=>{
    fname.disabled = false;
    fname.classList = 'fname_enabled';
    window.removeEventListener('keypress', automatic_data_entry, false);
    fname.focus();
    h1.textContent = 'Otkucajte vas id' ;
    sendbtn.classList.add('block');
    backbtn.classList.add('block');
    enterManuallybtn.classList.add('none');
})

const sendbtn = document.getElementById('send');

sendbtn.addEventListener('click', (e)=>{
    id = fname.value;
    posalji(id);
    fname.value='';
    fname.disabled = true;
    fname.style.backgroundColor = '#cfebf7';
});

backbtn.addEventListener('click', (e)=>{
    location.reload();
})
