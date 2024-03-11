function login() {
    const username = document.querySelector("#username");
    localStorage.setItem("username", username.value);

    alert("Successful Login")
}


// developed from simon 
function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
  
        quoteEl.textContent = data.content;
  
        containerEl.appendChild(quoteEl);
      });
  }

  displayQuote();


    //const username = document.querySelector("#username");
    //localStorage.setItem("username", username.value);

    //const password = document.querySelector("#password");
    //localStorage.setItem("password", password.value);
            //window.location.href ="game.html";
