fetch(
  "https://api.visittampere.com/api/v1/visittampere/event/published/all/?format=json&lang=fi"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (responseJson) {
    kerro(responseJson);
  })
  .catch(function (error) {
    document.getElementById("vastaus").innerHTML =
      "<p class='text-danger'>Tietoa ei pystytä hakemaan</p>";
  });

function kerro(data) {
  let content = "";

  for (let i = 0; i < data.length; i++) {
    content += `
      <div class="mb-4">
        <h2 class="h4 text-dark">${data[i].title}</h2>
        <p class="text-muted">${data[i].description}</p>
        <p><a href="${data[i].url}" target="_blank" class="text-primary">${data[i].url}</a></p>
      </div>`;
  }

  document.getElementById("vastaus").innerHTML = content;
}
