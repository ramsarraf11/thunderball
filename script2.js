let one = Number(document.getElementById('one').value);
let two = Number(document.getElementById('two').value);
let three = Number(document.getElementById('three').value);
let four = Number(document.getElementById('four').value);


let form = document.querySelector('form');
console.log(form)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log([form.one.value, form.two.value, form.three.value, form.four.value])
    localStorage.setItem('api-nums', JSON.stringify([form.one.value, form.two.value, form.three.value, form.four.value]));
})