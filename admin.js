let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let four = document.getElementById('four');


let form = document.querySelector('form');
console.log(form)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log([form.one.value, form.two.value, form.three.value, form.four.value])
    localStorage.setItem('api-nums', JSON.stringify([form.one.value, form.two.value, form.three.value, form.four.value]));
})
function getFromattedTime() {
    let localTime = (new Date()).toLocaleString({ hour12: true });
    let ist = new Date(localTime);
    let date = `${ist.getDate()}-${ist.getMonth()}-${ist.getFullYear()}`;
    let ampm = Number(ist.getHours()) >= 12 ? 'PM' : 'AM';
    return { timeStamp: `${ist.getHours()}:${ist.getMinutes()} ${ampm}`, date };
}
document.getElementById('submit').addEventListener('click', (e) => {
    console.log("Clicked");
    let { date, timeStamp } = getFromattedTime();
    console.log(one.value)
    fetch('http://localhost:3000/api/data', {
        method: "POST",
        body: JSON.stringify({ numbers: [Number(one.value), Number(two.value), Number(three.value), Number(four.value)], timeStamp, user: "ADMIN", date }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then(data => console.log(data));
})