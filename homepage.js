
if (!localStorage.getItem("currentUser")) {
  window.location.href = "login.html";
}

window.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  const welcomeElement = document.getElementById("welcome");

  if (currentUser) {
    welcomeElement.textContent = "Welcome, " + currentUser + "!";
  } else {
    welcomeElement.textContent = "No user logged in";
  }
  

window.history.replaceState(null, null, window.location.href);
window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload();
  }
};


  const data = JSON.parse(localStorage.getItem("userAchievements")) || {};
  const tableBody = document.querySelector("#userAchievementsTable tbody");
  tableBody.innerHTML = "";

  if (Object.keys(data).length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6">No achievements yet. </td></tr>`;
    return;
  }

  for (const [username, achievements] of Object.entries(data)) {
    if (!achievements || achievements.length === 0) continue;

    achievements.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${username}</td>
        <td>${item.activity}</td>
        <td>${item.weight}</td>
        <td>${item.lifted}</td>
        <td>${item.reps}</td>
        <td>${item.points}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  let totalAll = 0;
  for (const list of Object.values(data)) {
    totalAll += list.reduce((sum, a) => sum + a.points, 0);
  }

  const totalDiv = document.getElementById("totalPoints");
  if (totalDiv) {
    totalDiv.textContent = ` Combined Total Points (All Users): ${totalAll}`;
  }
});

document.getElementById("yourAchievementCard").onclick = function() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }document.getElementById("navTopScores").onclick = function () {
  document.getElementById("topAchievementCard").click();
};

  const section = document.getElementById("userAchievementsSection");
  const tableBody = document.querySelector("#personalAchievementsTable tbody");
  const totalDiv = document.getElementById("personalTotalPoints");

  const data = JSON.parse(localStorage.getItem("userAchievements")) || {};
  const userAchievements = data[currentUser];

  section.style.display = "block"; 
  tableBody.innerHTML = "";

  if (!userAchievements || userAchievements.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">No achievements yet. </td></tr>`;
    totalDiv.textContent = "";
    return;
  }

  userAchievements.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.activity}</td>
      <td>${item.weight}</td>
      <td>${item.lifted}</td>
      <td>${item.reps}</td>
      <td>${item.points}</td>
      <td><button class="edit-btn" data-index="${index}">Edit</button></td>
    `;
    tableBody.appendChild(row);
  });
  document.querySelectorAll(".edit-btn").forEach(button => {
  button.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    editAchievement(index);
  });
});

  const totalPoints = userAchievements.reduce((sum, a) => sum + a.points, 0);
  totalDiv.textContent = `Total Points: ${totalPoints}`;
};

document.getElementById("navYourAchievements").onclick = function () {
  document.getElementById("yourAchievementCard").click();
  };

document.getElementById("topAchievementCard").onclick = function () {
  const data = JSON.parse(localStorage.getItem("userAchievements")) || {};
  
  const section = document.getElementById("topAchievementsSection");
  const tableBody = document.querySelector("#topAchievementsTable tbody");

  tableBody.innerHTML = ""; 
  section.style.display = "block";

  let leaderboard = [];

  for (const [username, achievements] of Object.entries(data)) {
    if (!achievements || achievements.length === 0) continue;

    const best = achievements.reduce((max, current) => 
      current.points > max.points ? current : max
    );

    leaderboard.push({
      username,
      ...best
    });
  }

  leaderboard.sort((a, b) => b.points - a.points);

  leaderboard.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.username}</td>
      <td>${entry.activity}</td>
      <td>${entry.weight}</td>
      <td>${entry.lifted}</td>
      <td>${entry.reps}</td>
      <td>${entry.points}</td>
    `;
    tableBody.appendChild(row);
  });

  if (leaderboard.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6">No achievements found.</td></tr>`;
  }
};
document.getElementById("navTopScores").onclick = function () {
  document.getElementById("topAchievementCard").click();
};

  const data = JSON.parse(localStorage.getItem("userAchievements")) || {};


document.querySelectorAll('.feature-card').forEach(cardButton => {
  cardButton.addEventListener( 'click', () => {
    window.scrollTo({
       top: 0,
      behavior: 'smooth'
    });
  });
});

function logout(){
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function computePoints(weight, reps, lifted) {
    return Math.round((weight * reps * lifted) / 7000);
}

function editAchievement(index) {
  const currentUser = localStorage.getItem("currentUser");
  const data = JSON.parse(localStorage.getItem("userAchievements")) || {};
  const list = data[currentUser];

  const item = list[index];

  const newActivity = prompt("Activity:", item.activity);
  const newWeight = prompt("Weight:", item.weight);
  const newLifted = prompt("Lifted:", item.lifted);
  const newReps = prompt("Reps:", item.reps);

  if (newActivity === null) return;

  item.activity = newActivity;
  item.weight = Number(newWeight);
  item.lifted = Number(newLifted);
  item.reps = Number(newReps);

  item.points = computePoints(item.weight, item.reps, item.lifted);

  localStorage.setItem("userAchievements", JSON.stringify(data));

  document.getElementById("yourAchievementCard").click();
}
