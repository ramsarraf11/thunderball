let button = document.getElementById('play-btn');
 button.classList.add('hide')
setTimeout(()=>{
   button.classList.remove('hide');
},5000)

button.addEventListener('click',(e)=>{
    setTimeout(()=>{
        window.location.href = './play.html'
    },500)
})

function createButton(){
    console.log('Hi')
    let btn = document.createElement('button');
    btn.classList.add('btn')
    btn.classList.add('btn-info')
    let i = document.createElement('i');
    i.classList.add('fa-solid');
    i.classList.add('fa-play');
    i.classList.add('fa-fade');
    i.style = 'margin-right: 5px';
    btn.appendChild(i);
    btn.textContent = 'Play Now';
    button.append(btn);
}