
function GoToCreateAccount(){
    window.location.href = "createaccount.html";
  }
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");
  
  const accounts = JSON.parse(localStorage.getItem("accounts")) || {};


  if (username === "Admin" && password === "Admin1") {
    localStorage.setItem("currentUser", username);
    window.location.href = "homePage.html"
    message.style.color = "green";
    message.textContent = " You are in !";
    window.location.href = "homepage.html";
  }
  if (accounts[username] && accounts[username].password === password) {
    localStorage.setItem("currentUser", username);
    message.style.color = "green";
    message.textContentn = "You are in !"
    window.location.href = "homepage.html"
  } else {
    message.style.color = "red";
    message.textContent = "Invalid username or password.";
  }

});
