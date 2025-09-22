let accounts = JSON.parse(localStorage.getItem("accounts")) || {};

const message = document.getElementById("message");

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    message.style.color = "red";
    message.textContent = "Please Enter a username and Password";
    return;
  }

  if (accounts[username]) {
    message.style.color = "red";
    message.textContent = "That username is already registered";
    return;
  }

  accounts[username] = {
    password: password,
    achievements: []
  };

  localStorage.setItem("accounts", JSON.stringify(accounts));

  message.style.color = "green";
  message.textContent = "Account Created";

  

  e.target.reset();
});

function BackButton() {
  window.location.href = "login.html";
}
