// Function to get user's geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to reverse-geocode latitude and longitude to get a zip code
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Call a reverse geocoding API (OpenCage, for example) to get the zip code
    const apiKey = 'YOUR_OPENCAGE_API_KEY';  // Replace with your API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const zipCode = data.results[0].components.postcode;
            const growZone = calculateGrowZone(lat);  // Calculate grow zone based on latitude

            // Update the UI with the user's zip code and grow zone
            document.getElementById('zipcode').textContent = zipCode;
            document.getElementById('grow-zone').textContent = growZone;

            // Optionally, sync with the "Grow Zone" in the header
            document.querySelector('.grow-zone a').textContent = `Grow Zone: ${growZone}`;
        })
        .catch(error => {
            console.error('Error fetching geolocation data:', error);
        });
}

// Function to calculate grow zone based on latitude
function calculateGrowZone(lat) {
    if (lat >= 45) {
        return 3;
    } else if (lat >= 43) {
        return 4;
    } else if (lat >= 41) {
        return 5;
    } else if (lat >= 40) {
        return 6;
    } else {
        return 7;
    }
}

// Handle geolocation errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Call the getLocation function when the page loads
window.onload = getLocation;
