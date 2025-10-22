window.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  const welcomeElement = document.getElementById("welcome");

  if (currentUser) {
    welcomeElement.textContent = "Welcome, " + currentUser + "!";
  } else {
    welcomeElement.textContent = "No user logged in";
  }

  document.getElementById("loginCard").onclick = function () {
    window.location.href = "login.html";
  };

  const data = JSON.parse(localStorage.getItem("userAchievements")) || {};
  const tableBody = document.querySelector("#userAchievementsTable tbody");
  tableBody.innerHTML = "";

  if (Object.keys(data).length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6">No achievements yet. Go earn some </td></tr>`;
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
  }

  const section = document.getElementById("userAchievementsSection");
  const tableBody = document.querySelector("#personalAchievementsTable tbody");
  const totalDiv = document.getElementById("personalTotalPoints");

  const data = JSON.parse(localStorage.getItem("userAchievements")) || {};
  const userAchievements = data[currentUser];

  section.style.display = "block"; 
  tableBody.innerHTML = "";

  if (!userAchievements || userAchievements.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">No achievements yet. Go earn some </td></tr>`;
    totalDiv.textContent = "";
    return;
  }

  userAchievements.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.activity}</td>
      <td>${item.weight}</td>
      <td>${item.lifted}</td>
      <td>${item.reps}</td>
      <td>${item.points}</td>
    `;
    tableBody.appendChild(row);
  });

  const totalPoints = userAchievements.reduce((sum, a) => sum + a.points, 0);
  totalDiv.textContent = `Total Points: ${totalPoints}`;
};

