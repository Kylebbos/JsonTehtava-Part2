function haeSaa(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lang=fi&q=${city}&units=metric&APPID=665ecd56dfc08dbb50feb8b8f5034e28`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson) {
      naytaSaa(responseJson);
    })
    .catch(function (error) {
      document.getElementById("weather-container").innerHTML +=
        `<p class="text-danger">Tietoa ei pystytä hakemaan kaupungille: ${city}</p>`;
    });
}

function naytaSaa(data) {
  let content = `
    <div class="col-md-6 mb-3">
      <h3 class="h5 text-dark">${data.name}</h3>
      <ul class="text-muted">
        <li>Lämpötila: ${data.main.temp} °C</li>
        <li>Tuntuu kuin: ${data.main.feels_like} °C</li>
        <li>Kuvaus: ${data.weather[0].description}</li>
        <li>Tuuli: ${data.wind.speed} m/s, suunta ${data.wind.deg}°</li>
        <li>Ilmankosteus: ${data.main.humidity}%</li>
        <li>Ilmanpaine: ${data.main.pressure} hPa</li>
      </ul>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
           alt="${data.weather[0].description}" class="img-fluid">
    </div>`;

  document.getElementById("weather-container").innerHTML += content;
}

haeSaa("Tampere");
haeSaa("Helsinki");