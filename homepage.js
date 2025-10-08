
window.onload = function() {
  let currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    document.getElementById("welcome").textContent = "Welcome, " + currentUser + "!";
  } else {
    document.getElementById("Welcome").textContent = "No user logged in";
  }
};

function addAchievement() {
  window.location.href = "addachievement.html";
}
