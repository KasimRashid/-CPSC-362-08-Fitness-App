function addAchievements() {
  // Retrieve logged-in username from localStorage
  const username = localStorage.getItem("currentUser");

  if (!username) {
    alert("No user is currently logged in. Please log in first.");
    window.location.href = "login.html"; // redirect if needed
    return;
  }

  // Get table
  const table = document.getElementById("pointTable");
  const rows = table.querySelectorAll("tbody tr");
  if (rows.length === 0) {
    alert("No achievements to save!");
    return;
  }

  // Extract data
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

  // Load and update data
  let storedData = JSON.parse(localStorage.getItem("userAchievements")) || {};
  storedData[username] = achievements;
  localStorage.setItem("userAchievements", JSON.stringify(storedData));

  alert(`Achievements saved successfully for ${username}!`);
}
