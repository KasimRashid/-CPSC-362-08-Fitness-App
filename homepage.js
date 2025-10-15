
window.onload = function() {
  let currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    document.getElementById("welcome").textContent = "Welcome, " + currentUser + "!";
  } else {
    document.getElementById("welcome").textContent = "No user logged in";
  }
  
  document.getElementById("loginCard").onclick = function() {
  window.location.href = "login.html";
  };
};

function addAchievement() {
  window.location.href = "addachievement.html";
}


