function login() {
    const username = document.querySelector("#username");
    localStorage.setItem("username", username.value);

    const password = document.querySelector("#password");
    localStorage.setItem("password", password.value);

    window.location.href ="game.html";
}