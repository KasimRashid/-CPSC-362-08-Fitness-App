function addAchievements() {
  const username = localStorage.getItem("currentUser");

  if (!username) {
    alert("No user is currently logged in. Please log in first.");
    window.location.href = "login.html";
    return;
  }

  const table = document.getElementById("pointTable");
  const rows = table.querySelectorAll("tbody tr");
  if (rows.length === 0) {
    alert("No achievements to save!");
    return;
  }

  const achievements = [];
  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    achievements.push({
      activity: cells[0].textContent,
      weight: parseFloat(cells[1].textContent),
      lifted: parseFloat(cells[2].textContent),
      reps: parseInt(cells[3].textContent),
      points: parseInt(cells[4].textContent)
    });
  });

  let storedData = JSON.parse(localStorage.getItem("userAchievements")) || {};

  storedData[username] = (storedData[username] || []).concat(achievements);

  localStorage.setItem("userAchievements", JSON.stringify(storedData));

  document.querySelector("#pointTable tbody").innerHTML = "";

  alert(`Achievements saved successfully for ${username}!`);
}
