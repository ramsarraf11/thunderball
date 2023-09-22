document.getElementById("loginButton").addEventListener("click", function () {

    var username = document.querySelector(".inputs input[type='text']").value;
    var password = document.querySelector(".inputs input[type='password']").value;

    if (username.trim() === "" || password.trim() === "") {
        alert("Please enter both username and password.");
        return;
    }
    if (username === "admin" && password === "101010") {
        window.location.href = "admin.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});
