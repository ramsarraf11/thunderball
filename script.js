let numberFromApiCall = JSON.parse(localStorage.getItem('api-nums')) || [];
let fragmentElements = [];
let animationInterval;
let collisionStarted = false;

document.getElementById('click-me').addEventListener('click', (e) => {
    const number1 = document.getElementById("number1").textContent;
    const number2 = document.getElementById("number2").textContent;
    const number3 = document.getElementById("number3").textContent;
    const number4 = document.getElementById("number4").textContent;
    console.log("clicked")
    e.preventDefault();
    fetch('http://localhost:3000/api/data', {
        method: 'POST',
        body: JSON.stringify({ numbers: [number1, number2, number3, number4].map(Number) }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        });

})


let timeContainer = document.getElementById('time');
setInterval(() => {
    timeContainer.innerHTML = ''
    let localTime = (new Date()).toLocaleString({ hour12: true });
    let ist = new Date(localTime);
    let ampm = Number(ist.getHours()) >= 12 ? 'PM' : 'AM';
    let h1 = document.createElement('h1');
    h1.id = 'hour'
    h1.innerHTML = `${Number(ist.getHours()) % 12}hr`;
    let h2 = document.createElement('h1');
    h2.id = 'minute'
    h2.innerHTML = `${ist.getMinutes()}min`;
    let h3 = document.createElement('h1');
    h3.id = 'sec'
    h3.innerHTML = `${ist.getSeconds()}sec ${ampm}`;
    timeContainer.append(h1);
    timeContainer.append(h2);
    timeContainer.append(h3);
    // if (Number(ist.getSeconds() % 10 === 0)) {
    //     getTimeAndCollide();
    //     generateNumbers();
    // }
}, 1000)

// Function to generate a random number from 1 to 100
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
let prevData = [];
// Function to create a number fragment
function createNumberFragment(container, number) {
    const numberFragment = document.createElement("div");
    numberFragment.classList.add("fragment", getRandomColorClass());
    numberFragment.innerText = number;
    container.appendChild(numberFragment);
    return numberFragment;
}

// Function to generate a random color class (color-1 to color-5)
function getRandomColorClass() {
    const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to update the position of fragments smoothly within the circular boundary
function updateFragmentPositions() {
    fragmentElements.forEach(fragmentElement => {
        if (!collisionStarted) {
            // Position fragments within the circular boundary
            const radius = 180; // Half of the circle's diameter
            const angle = Math.random() * Math.PI * 2; // Random angle
            const x = Math.cos(angle) * radius + 200; // Center X + radius * cos(angle)
            const y = Math.sin(angle) * radius + 200; // Center Y + radius * sin(angle)
            fragmentElement.style.transform = `translate(${x}px, ${y}px)`;
        } else {
            // Animate fragments when collision is active
            const newX = Math.random() * (400 - 30);
            const newY = Math.random() * (400 - 30);
            fragmentElement.style.transform = `translate(${newX}px, ${newY}px)`;
        }
    });
}

// Start collision animation based on button click
const collisionButton = document.getElementById("collisionButton");
collisionButton.addEventListener("click", () => {

});

function getTimeAndCollide() {
    if (!collisionStarted) {
        collisionStarted = true;
        // Start animation and stop after 10 seconds
        animationInterval = setInterval(updateFragmentPositions, 500); // Adjust the interval for your preferred speed
        setTimeout(() => {
            clearInterval(animationInterval); // Stop the animation after 10 seconds
            collisionStarted = false; // Reset the collision flag
        }, 10000); // 10 seconds in milliseconds
    }
}

// Add 100 number fragments to the container
const container = document.getElementById("container");
for (let i = 1; i <= 100; i++) {
    const fragmentElement = createNumberFragment(container, i);
    fragmentElements.push(fragmentElement);
}

function getFromattedTime() {
    let localTime = (new Date()).toLocaleString({ hour12: true });
    let ist = new Date(localTime);
    let ampm = Number(ist.getHours()) >= 12 ? 'PM' : 'AM';
    return `${ist.getHours()}:${ist.getMinutes()} ${ampm}`;
}

function postNumber(numbers) {
    fetch('http://localhost:3000/api/data', {
        method: 'POST',
        body: JSON.stringify({ numbers: [...numbers].map(Number),timeStamp: getFromattedTime()}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        });

    console.log(numbers);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * (100 - 1 + 1) + 1); // Generates a random 2-digit number between 10 and 99
}

function generateNumbers() {
    numberFromApiCall = JSON.parse(localStorage.getItem('api-nums')) || [];
    const number1 = document.getElementById("number1");
    const number2 = document.getElementById("number2");
    const number3 = document.getElementById("number3");
    const number4 = document.getElementById("number4");

    const animationDuration = 10000; // Animation duration in milliseconds

    const interval = 5; // Interval for each step of the animation

    let currentNumber1 = 0;
    let currentNumber2 = 0;
    let currentNumber3 = 0;
    let currentNumber4 = 0;

    const animation = setInterval(() => {
        number1.textContent = currentNumber1;
        number2.textContent = currentNumber2;
        number3.textContent = currentNumber3;
        number4.textContent = currentNumber4;

        currentNumber1 = Math.floor(Math.random() * 90 + 10);
        currentNumber2 = Math.floor(Math.random() * 90 + 10);
        currentNumber3 = Math.floor(Math.random() * 90 + 10);
        currentNumber4 = Math.floor(Math.random() * 90 + 10);
    }, interval);

    setTimeout(() => {
        clearInterval(animation);

        if (numberFromApiCall.length >= 4) {
            number1.textContent = numberFromApiCall[0];
            number2.textContent = numberFromApiCall[1];
            number3.textContent = numberFromApiCall[2];
            number4.textContent = numberFromApiCall[3];
        } else {
            // If there are not enough values in numberFromApiCall, fill with random numbers
            const randomNumber1 = generateRandomNumber();
            const randomNumber2 = generateRandomNumber();
            const randomNumber3 = generateRandomNumber();
            const randomNumber4 = generateRandomNumber();

            number1.textContent = randomNumber1;
            number2.textContent = randomNumber2;
            number3.textContent = randomNumber3;
            number4.textContent = randomNumber4;
        }
    }, animationDuration);
    setTimeout(() => {
        clearInterval(animation);
        postNumber([number1.textContent, number2.textContent, number3.textContent, number4.textContent]);
        if (numberFromApiCall.length >= 4) {
            Array.from(document.getElementsByClassName("number-container"))?.map((elem, index) => {
                elem.innerHTML = numberFromApiCall[index];
            })
            localStorage.removeItem('api-nums');
        }
    }, 1000)

}


document.getElementById('num-gen').addEventListener('click', generateNumbers);
