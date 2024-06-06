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

    // Sign Out functionality
    const signOutButton = document.querySelector('.title[data-title="Sign Out"]');
    if (signOutButton) {
        signOutButton.addEventListener('click', () => {
            window.location.href = 'signin.html'; // Redirect to sign-in page
        });
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Sample data for the line graph
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Sales Data',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [65, 59, 80, 81, 56, 55, 40] // Sample data points
            }]
        };
    
        // Configuration options for the line graph
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
    
        // Get the canvas element
        const ctx = document.getElementById('lineChart').getContext('2d');
    
        // Create the line chart
        const lineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
    });
    
});
