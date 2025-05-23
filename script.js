const apiKey = "d98791f23bdd4a9397862152252305";

document.getElementById("searchBtn").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weather");
  const loadingMsg = document.getElementById("loading-message");
  weatherDiv.innerHTML = "";
  loadingMsg.style.display = "inline";

  if (!city) { 
    weatherDiv.innerHTML = `Please enter a city name.`;
    loadingMsg.style.display = "none";
    return;
  }

  // Correct WeatherAPI.com endpoint
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then(data => {
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      weatherDiv.innerHTML = `
        <p><strong>${data.location.name}, ${data.location.country}</strong></p>
        <p>🌡️ Temperature: ${temp} °C</p>
        <p>⛅ Condition: ${condition}</p>
      `;
    })
    .catch(error => {
      weatherDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    })
    .finally(() => {
      loadingMsg.style.display = "none";
    });
}