
const mapOne = L.map('my-map').setView([38.9860, -76.9451], 10); // center map at McKeldin and zoom out enough to see all 4 markers

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib2FkZXdvbGUiLCJhIjoiY2s4a3F4NWV6MDA5djNmcHNoMjNhcDFiaSJ9.9StZnVwblvcflkIBrfAKmQ'
}).addTo(mapOne);

const mark1 = L.marker([38.9860, -76.9451]).addTo(mapOne); // marker at Mckeldin

mark1.bindPopup("<b>MCKELDIN LIBRARY</b>", {className:"lib-popup"}); // popup for McKeldin

// fetch PG Food Inspection dataset
fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
  .then((response) => { // why is this section necessary?
    return response.json();
  })
  .then((data) => {
    const establishments = []; 

    function randIndex(start, end) { // helper function: random num generator
        return Math.floor(Math.random() * (end - start) + start);
      }

    // pick 3 random establishments from dataset
    for (let i = 0; i < 3; i++) {
        idx = randIndex(0, data.length);
  
        // if selected place is already picked, pick randomly again 
        while (establishments.includes(data[idx])) {
          idx = randIndex(0, data.length);
        }
  
        // add establishment to list of establishments (name, lat, and long)
        establishments.push({
            "name": data[idx].name, 
            "lat": data[idx].geocoded_column_1.coordinates[1], 
            "long": data[idx].geocoded_column_1.coordinates[0]});
      }

    console.log(establishments);
    console.log(establishments[0]);

    // add marker and popup for each establishment
    establishments.forEach(e => {
        let title = "<b>" + e.name + "</b><br>";
        L.marker([e.lat, e.long]).addTo(mapOne)
            .bindPopup(title, {className:"lib-popup"});
        
    })
  });
