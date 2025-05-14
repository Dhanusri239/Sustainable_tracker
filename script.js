// Dark Mode Logic
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  }
  
  window.onload = () => {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }
  };
  
  // Login Page
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (username === "dhanu" && password === "tracker123") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "tracker.html";
      } else {
        alert("Invalid login 😬");
      }
    });
  }
  
  // Data Form + Chart
  const dataForm = document.getElementById("dataForm");
  if (dataForm) {
    dataForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const water = document.getElementById("waterUsage").value;
      const electricity = document.getElementById("electricityUsage").value;
      const carbon = document.getElementById("carbonFootprint").value;
  
      const entry = {
        date: new Date().toLocaleDateString(),
        water,
        electricity,
        carbon
      };
  
      const logs = JSON.parse(localStorage.getItem("sustainData")) || [];
      logs.push(entry);
      localStorage.setItem("sustainData", JSON.stringify(logs));
  
      alert("Saved ✅");
      dataForm.reset();
      drawChart(logs);
    });
  
    const logs = JSON.parse(localStorage.getItem("sustainData")) || [];
    if (logs.length > 0) drawChart(logs);
  }
  
  // Draw Chart
  function drawChart(data) {
    const ctx = document.getElementById("usageChart").getContext("2d");
    const labels = data.map(entry => entry.date);
    const waterData = data.map(entry => parseFloat(entry.water));
    const electricData = data.map(entry => parseFloat(entry.electricity));
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Water (L)',
            data: waterData,
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'Electricity (kWh)',
            data: electricData,
            borderColor: 'green',
            fill: false
          }
        ]
      }
    });
  }
  
  // Display Data
  const output = document.getElementById("output");
  if (output) {
    const logs = JSON.parse(localStorage.getItem("sustainData")) || [];
    if (logs.length === 0) {
      output.innerHTML = "<p>No entries yet 😕</p>";
    } else {
      logs.reverse().forEach(log => {
        output.innerHTML += `
          <div class="entry">
            <p><strong>Date:</strong> ${log.date}</p>
            <p>💧 Water: ${log.water} L</p>
            <p>⚡ Electricity: ${log.electricity} kWh</p>
            <p>☁️ Carbon: ${log.carbon} kg CO₂</p>
            <hr>
          </div>
        `;
      });
    }
  }
  