let timeContainer = document.getElementById("time");
let timeWrapper = document.getElementById('time-container');
let backWardTimeContainer = document.getElementById("back");
let numberFromApiCall = JSON.parse(localStorage.getItem("api-nums")) || [];
let fragmentElements = [];
let animationInterval;
let collisionStarted = false;
document.getElementById('results').addEventListener('click',(e)=>{
  window.location.href = './table.html'
})
const getTheLatestEntryAndDisplay = async () => {
  let data = await fetch("http://localhost:3000/api/admin?latest=admin");
  data = await data.json();
  data = data.numbers;
  Array.from(document.getElementsByClassName("number-container")).map(
    (e, index) => {
      e.textContent = data[index];
    }
  );
};
getTheLatestEntryAndDisplay();
const anotherInterval = (date) => {
    backWardTimeContainer.innerHTML = ''
  let h1 = document.createElement("h1");
  let h2 = document.createElement("h1");
  if (date.getMinutes() % 15 === 0 && date.getSeconds() === 0) {
    h1.textContent = `${15}m`;
    h2.textContent = `0${0}sec`;
  } else if (date.getSeconds() === 0) {
    h1.textContent = `${
      Math.floor(
        (date.getMinutes() +
          (15 - (date.getMinutes() % 15)) -
          date.getMinutes()) /
          10
      ) === 0
        ? "0"
        : ""
    }${
      date.getMinutes() + (15 - (date.getMinutes() % 15)) - date.getMinutes()
    }m`;
    h2.textContent = `${
      Math.floor((60 - date.getSeconds()) / 10) === 0 ? "0" : ""
    }${date.getSeconds()}sec`;
  } else {
    h1.textContent = `${
      Math.floor(
        (date.getMinutes() +
          (15 - (date.getMinutes() % 15)) -
          date.getMinutes() -
          1) /
          10
      ) === 0
        ? "0"
        : ""
    }${
      date.getMinutes() +
      (15 - (date.getMinutes() % 15)) -
      date.getMinutes() -
      1
    }m`;
    h2.textContent = `${
      Math.floor((60 - date.getSeconds()) / 10) === 0 ? "0" : ""
    }${60 - date.getSeconds()}sec`;
  }
  let span = document.createElement("h1");
  span.innerHTML = ":";
  backWardTimeContainer.append(h1, span, h2);
};

setInterval(() => {
  timeContainer.innerHTML = "";
  let localTime = new Date();
  let ist = new Date(localTime);
  let ampm = Number(ist.getHours()) >= 12 ? "PM" : "AM";
  let h1 = document.createElement("h1");
  h1.id = "hour";
  h1.innerHTML = `${localTime.getHours() > 12 ? localTime.getHours() % 12 : localTime.getHours()}:`;
  let h2 = document.createElement("h1");
  h2.id = "minute";
  h2.innerHTML = `${ist.getMinutes()}:`;
  let h3 = document.createElement("h1");
  h3.id = "sec";
  h3.innerHTML = `${ist.getSeconds()} ${ampm}`;
  let div = document.createElement('div');
  let heading = document.createElement('h1');
  heading.textContent = 'Current Time';
  div.append(heading);
  timeContainer.append(h1);
  timeContainer.append(h2);
  timeContainer.append(h3);
  anotherInterval(new Date());
  if (ampm === "AM") {
    if (Number(ist.getMinutes()) % 15 === 0 && ist.getSeconds() === 0) {
      console.log("AM GOT TRIGGERED");
      getTimeAndCollide();
      adminNumber();
      generateNumbers();
    }
  } else if (ampm === "PM") {
    if (Number(ist.getMinutes()) % 15 === 0 && ist.getSeconds() === 0) {
      console.log("PM RUNNING");
      getTimeAndCollide();
      adminNumber();
      generateNumbers();
    }
  }
}, 1000);

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
  const colors = ["color-1", "color-2", "color-3", "color-4", "color-5"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to update the position of fragments smoothly within the circular boundary
function updateFragmentPositions() {
  fragmentElements.forEach((fragmentElement) => {
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
  let localTime = new Date().toLocaleString({ hour12: true });
  let ist = new Date(localTime);
  let date = `${ist.getDate()}-${ist.getMonth()}-${ist.getFullYear()}`;
  let ampm = Number(ist.getHours()) >= 12 ? "PM" : "AM";
  return {
    timeStamp: `${ist.getHours()}:${ist.getMinutes()} ${ampm}`,
    date,
    hour: ist.getHours(),
    minutes: ist.getMinutes(),
  };
}

function postNumber(numbers) {
  let dateTime = getFromattedTime();
  fetch("http://localhost:3000/api/data", {
    method: "POST",
    body: JSON.stringify({
      numbers: [...numbers].map(Number),
      timeStamp: dateTime.timeStamp,
      date: dateTime.date,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(numbers);
}

function generateRandomNumber() {
  return Math.floor(Math.random() * (100 - 1 + 1) + 1); // Generates a random 2-digit number between 10 and 99
}

function generateNumbers() {
  numberFromApiCall = JSON.parse(localStorage.getItem("api-nums")) || [];
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
    console.log("Called Finally", numberFromApiCall);
    if (numberFromApiCall?.length >= 4) {
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
    console.log(numberFromApiCall);
    if (numberFromApiCall?.length >= 4) {
      Array.from(document.getElementsByClassName("number-container"))?.map(
        (elem, index) => {
          elem.innerHTML = numberFromApiCall[index];
        }
      );
      localStorage.removeItem("api-nums");
    } else {
      postNumber([
        number1.textContent,
        number2.textContent,
        number3.textContent,
        number4.textContent,
      ]);
    }
    getTheLatestEntryAndDisplay();
  }, 1000);
}

async function adminNumber() {
  let data = await fetch("http://localhost:3000/api/data");
  data = await data.json();
  data = data?.filter((e) => e?.user === "ADMIN");
  for (let i = 0; i < data?.length; i++) {
    let e = data[i];
    let date = getDateAndTime(`${e?.date} ${e?.timeStamp}`);
    let todayDate = getFromattedTime();
    let timeDiff = calculateTimeDifferences(e?.timeStamp.split(" ")[0]);
    console.log("Running But Not Going");
    if (date.date === todayDate.date) {
      console.log("DATE MATCHED");
      let time = convertTo24HourFormat(e?.timeStamp);
      if (isAvailable(time.hours, time.minutes)) {
        console.log("Finally Avilable");
        numberFromApiCall = [...e.numbers];
        console.log(numberFromApiCall);
        console.log("RECORD FOUND");
        break;
      }
    }
  }
}

function calculateTimeDifferences(inputTime) {
  const [hours, minutes] = inputTime.split(":").map(Number);
  // Get the current time in IST
  const currentTime = new Date();
  const currentHoursUTC = currentTime.getUTCHours();
  const currentMinutesUTC = currentTime.getUTCMinutes();

  // Calculate the total minutes from midnight for the current time in IST
  const totalMinutesCurrentIST =
    (currentHoursUTC + 5) * 60 + currentMinutesUTC + 30;

  // Calculate the nearest time divisible by 15 minutes before the current time in IST
  const time15Before = Math.floor(totalMinutesCurrentIST / 15) * 15;

  // Calculate the time difference between current time and the nearest time divisible by 15 before
  const timeDifference15Before = minutes - time15Before;

  // Calculate the nearest time divisible by 15 minutes after the current time in IST
  const time15After = (Math.floor(totalMinutesCurrentIST / 15) + 1) * 15;

  // Calculate the time difference between current time and the nearest time divisible by 15 after
  const timeDifference15After = time15After - minutes;

  return {
    nextTimeDifference: {
      hours: Math.floor(timeDifference15Before / 60),
      minutes: timeDifference15Before % 60,
    },
    previousTimeDifference: {
      hours: Math.floor(timeDifference15After / 60),
      minutes: timeDifference15After % 60,
    },
  };
}

function getDateAndTime(dateComp) {
  let dateString = dateComp;
  // Split the date and time parts
  let parts = dateString.split(" ");
  let datePart = parts[0];
  let timePart = parts[1] + " " + parts[2];

  // Split the date into day, month, and year
  let dateParts = datePart.split("-");
  let day = parseInt(dateParts[0], 10);
  let month = parseInt(dateParts[1], 10) - 1; // Month is 0-based in JavaScript
  let year = parseInt(dateParts[2], 10);

  let timeParts = timePart.split(":");
  let hours = parseInt(timeParts[0], 10);
  let minutes = parseInt(timeParts[1], 10);

  let dateObject = new Date(year, month, day, hours, minutes);
  return getDate(dateObject);
}

function getDate(date) {
  return {
    date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, // Adding 1 to month to make it 1-based
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}

// document.getElementById('num-gen').addEventListener('click', generateNumbers);

new Date(new Date().toLocaleDateString);

let timeDiff = calculateTimeDifferences("1:40 AM".split(" ")[0]);
console.log(
  timeDiff.nextTimeDifference.minutes,
  timeDiff.previousTimeDifference.minutes
);

function isAvailable(hours, minutes) {
  const currentTime = new Date();
  console.log(currentTime.getHours(), currentTime.getMinutes());
  // Parse the particular time (e.g., "15:27")
  const enteredTime = new Date(currentTime);
  enteredTime.setHours(hours, minutes, 0, 0); // Set the hours and minutes

  // Calculate the previous time with minutes divisible by 15
  let previousTime = new Date(currentTime);
  if (previousTime.getMinutes() % 15 == 0) {
    previousTime.setMinutes(
      currentTime.getMinutes() - (currentTime.getMinutes() % 15) - 15
    );
  } else {
    previousTime.setMinutes(
      currentTime.getMinutes() - (currentTime.getMinutes() % 15)
    );
  }

  // Check if enteredTime falls between previousTime and nextTime
  const isBetween = enteredTime >= previousTime && enteredTime < currentTime;

  // Print the results
  console.log("Entered Time:", enteredTime.toLocaleTimeString());
  console.log("Previous Time is", previousTime.toLocaleTimeString());
  console.log("Is Entered Time between Previous and Next Time:", isBetween);

  return isBetween;
}

function convertTo24HourFormat(time12hr) {
  // Split the input time into hours, minutes, and meridian (AM/PM)
  const timeParts = time12hr.split(" ");
  const time = timeParts[0];
  const meridian = timeParts[1].toLowerCase();

  // Split the time into hours and minutes
  let [hours, minutes] = time.split(":").map(Number);

  // Convert to 24-hour format
  if (meridian === "pm" && hours !== 12) {
    console.log("PM FOUND");
    hours += 12;
  } else if (meridian === "am" && hours === 12) {
    hours = 0;
  }

  // Format the result as HH:MM
  return {
    hours,
    minutes,
  };
}

