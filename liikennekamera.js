fetch("https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/history")
  .then(function (response) {
    return response.json();
  })
  .then(function (responseJson) {
    kerro(responseJson.presets);
  })
  .catch(function (error) {
    document.getElementById("vastaus").innerHTML =
      "<p class='text-danger'>Tietoa ei pystytä hakemaan</p>";
  });

function kerro(data) {
  let teksti = "<ul>";

  for (var i = 0; i < data.length; i++) {

    let sortedHistory = data[i].history.sort(function(a, b) {
      return new Date(b.lastModified) - new Date(a.lastModified);
    });

    let recentHistory = sortedHistory.slice(0, 2);

    for (var j = 0; j < recentHistory.length; j++) {
      teksti += "<li>" + recentHistory[j].lastModified + "</li>";
      teksti += "<p><img src='" + recentHistory[j].imageUrl + "' alt='Camera Image' /></p>";
    }
  }

  teksti += "</ul>";
  document.getElementById("vastaus").innerHTML = teksti;
}
