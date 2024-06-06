document.addEventListener('DOMContentLoaded', () => {
  // Add hovered class to selected list item
  let list = document.querySelectorAll(".navigation li");

  function activeLink() {
      list.forEach((item) => {
          item.classList.remove("hovered");
      });
      this.classList.add("hovered");
  }

  list.forEach((item) => item.addEventListener("mouseover", activeLink));

  // Menu Toggle
  let toggle = document.querySelector(".toggle");
  let navigation = document.querySelector(".navigation");
  let main = document.querySelector(".main");

  toggle.onclick = function () {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
  };

  // Function to handle logout
  function handleLogout() {
      // Redirect to sign-in page
      window.location.href = 'signin.html'; // Replace 'signin.html' with the actual URL of your sign-in page
  }

  // Add click event listener to logout icon
  const logoutIcon = document.getElementById('logout-link');
  logoutIcon.addEventListener('click', handleLogout);

  // Function to create line chart using Chart.js
  function createChart() {
      const ctx = document.getElementById('lineChart').getContext('2d');
      const myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [{
                  label: 'Sample Data',
                  data: [10, 20, 15, 25, 30, 20, 35],
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderWidth: 1,
                  tension: 0.4 // Smoothes the line
              },
                  {
                      label: 'Dataset 2',
                      data: [15, 25, 20, 30, 35, 25, 40],
                      borderColor: 'rgba(255, 99, 132, 1)',
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderWidth: 1,
                      tension: 0.4 // Smoothes the line
                  },
                  {
                      label: 'Dataset 3',
                      data: [20, 30, 25, 35, 40, 30, 45],
                      borderColor: 'rgba(54, 162, 235, 1)',
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      borderWidth: 1,
                      tension: 0.4 // Smoothes the line
                  }
            ]
          },
          options: {
              responsive: true,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              },
              plugins: {
                  legend: {
                      display: true,
                      position: 'top'
                  }
              }
          }
      });
  }

  // Call createChart function when the page loads
  createChart();

  // Update the current month in the HTML
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  document.getElementById('currentMonth').textContent = `Current Month: ${currentMonth}`;
});
