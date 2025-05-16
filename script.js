const apiKey = '6bef70ae1d45580b74412ceaf2de9c11'; // Replace with your OpenWeatherMap API key

function fetchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const errorEl = document.getElementById('error');
  const weatherBox = document.getElementById('weatherBox');
  const app = document.getElementById('app');

  errorEl.textContent = '';
  weatherBox.style.display = 'none';
  app.className = 'app';

  if (!city) {
    errorEl.textContent = 'Please enter a city name.';
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((res) => {
      if (!res.ok) throw new Error('City not found');
      return res.json();
    })
    .then((data) => {
      const weatherType = data.weather[0].main.toLowerCase();
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;

      app.classList.add(weatherType);

      weatherBox.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].main}</p>
        <p>${Math.round(temp)}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${wind} m/s</p>
      `;
      weatherBox.style.display = 'block';
    })
    .catch(() => {
      errorEl.textContent = 'Could not fetch weather. Try again.';
    });
}
