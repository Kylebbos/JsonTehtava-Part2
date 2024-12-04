fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/tpe?departing_trains=10&include_nonstopping=false")
  .then(function(response) {
    return response.json();
  })
  .then(function(responseJson) {
    console.log(responseJson); 
    kerro(responseJson);
  })
  .catch(function(error) {
    document.getElementById("vastaus").innerHTML =
      "<p class='text-danger'>Tietoa ei pystytä hakemaan</p>";
    console.error(error); 
  });

function kerro(data) {
  if (!data || data.length === 0) {
    document.getElementById("vastaus").innerHTML =
      "<p class='text-danger'>Junatietoja ei löytynyt.</p>";
    return;
  }

  let teksti = "<ul>";

  for (let i = 0; i < data.length; i++) {
    const train = data[i];

    if (!train.timeTableRows || train.timeTableRows.length === 0) continue;

    let departureTime = "";
    let arrivalTime = "";
    let departureStation = "";
    let destinationStation = "";
    for (let j = 0; j < train.timeTableRows.length; j++) {
      const timeTable = train.timeTableRows[j];
      if (timeTable.stationShortCode === "TPE" && timeTable.type === "DEPARTURE") {
 
        departureStation = train.timeTableRows[0].stationShortCode;
        departureTime = formatTime(timeTable.scheduledTime);
      }

      if (timeTable.stationShortCode === "HKI" && timeTable.type === "ARRIVAL") {
        destinationStation = train.timeTableRows[train.timeTableRows.length - 1].stationShortCode;
        arrivalTime = formatTime(timeTable.scheduledTime); 
      }
    }

    if (departureTime && arrivalTime && departureStation && destinationStation && train.trainCategory === "Long-distance") {
      teksti += `<li><strong>Juna Nro: </strong>${train.trainNumber}</li>`;
      teksti += `<li><strong>Junan tyyppi: </strong>${train.trainType}</li>`;
      teksti += `<li><strong>Lähtee Tampereelta: </strong>${departureTime}</li>`;
      teksti += `<li><strong>Saapuu Helsinkiin: </strong>${arrivalTime}</li>`;
      teksti += "<hr>";
    }
  }

  teksti += "</ul>";
  document.getElementById("vastaus").innerHTML = teksti;
}

function formatTime(timeString) {
  if (!timeString) return "Aika ei saatavilla";
  const date = new Date(timeString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${year}-${month}-${day} kello: ${hours}:${minutes}`;
}
