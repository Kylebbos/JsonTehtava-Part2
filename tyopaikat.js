fetch("https://gis.vantaa.fi/rest/tyopaikat/v1/kaikki")
  // Muunnetaan vastaus JSON muotoon
  .then(function (response) {
    return response.json();
  })
  // Käsitellään muunnettu (eli JSON muotoinen) vastaus
  .then(function (responseJson) {
    // Kutsutaan funktiota ja välitetään sille json-vastaus
    kerro(responseJson);
  })
  // Jos tuli jokin virhe
  .catch(function (error) {
    document.getElementById("vastaus").innerHTML =
      "<p>Tietoa ei pystytä hakemaan</p>";
  });

function kerro(data) {
  let teksti = "<ul>";

  for (var i = 0; i < data.length; i++) {
    teksti +=
      "<li>" +
      "Työtehtävä: " +
      data[i].tyotehtava +
      " " +
      "Osoite: " +
      data[i].osoite +
      " " +
      "Linkki: " +
      "<a href='" +
      data[i].linkki +
      "' target='_blank'>" +
      "Avaa työpaikkailmoitus" +
      "</a>" +
      "</li>";
  }

  teksti += "</ul>";
  // tulostus
  document.getElementById("vastaus").innerHTML = teksti;
}
