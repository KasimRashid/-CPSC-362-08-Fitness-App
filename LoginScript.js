function GoToCreateAccout(){
    window.location.href = "createAccount.html";
  }
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");



  if (username === "fitness" && password === "a") {
    window.location.href = "homePage.html"
    message.style.color = "green";
    message.textContent = " You are in !";
  } else {

    message.style.color = "red";
    message.textContent = "Invalid username or password.";
  }



});
