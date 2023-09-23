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
let time = convertTo24HourFormat('8:54 PM')
isAvailable(time.hours,time.minutes)