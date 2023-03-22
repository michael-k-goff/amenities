// import axios from "axios";
function initMap() {
  const bounds = new google.maps.LatLngBounds();
  const markersArray = [];
  const origin_to_get_work = { lat: 45.56373, lng: -122.66293 }; // my house
  const map = new google.maps.Map(document.getElementById("map"), {
    // center: { lat: 45.56, lng: -122.66 }, // pdx
    center: origin_to_get_work,
    zoom: 10,
  });
  // const axios = require("axios");
  // const axios = require('axios/dist/node/axios.cjs'); // node
  // const axios = require("axios/dist/browser/axios.cjs"); // browser

  let og_addy = "222 NE Jessup St. Portland, OR 97211";

  let add_url = `https://us1.locationiq.com/v1/search?key=PUT_LOC_API_HERR&q=${encodeURIComponent(
    og_addy
  )}&format=json`;

  const service = new google.maps.DistanceMatrixService();

  console.log(`\nLooking for : ${og_addy}\n`);

  // first upper call takes in an address and returns a lat lon
  axios.get(add_url).then((addy_response) => {
    let lat = addy_response.data[0].lat;
    let lon = addy_response.data[0].lon;

    let park_url = `https://us1.locationiq.com/v1/nearby?key=PUT_LOC_API_HERR&lat=${lat}&lon=${lon}&tag=park&radius=1600&format=json`;

    console.log(lat + ", " + lon);
    // second api call takes the lat lon and returns number of parks.
    axios.get(park_url).then((response) => {
      // let origin1 = { lat: parseFloat(lat), lng: parseFloat(lon) };
      var origin1 = new google.maps.LatLng(parseFloat(lat), parseFloat(lon));
      var search_array = [];

      let results = response.data.map((location) => {
        let name = location.name;
        name += " ".repeat(30 - name.length);
        search_array.push({
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon),
        });
        return `${name}lat:${location.lat}\tlon:${location.lon}`;
      });

      // this is going to be new stuff putting in...
      const request = {
        origins: [origin1], // took out , origin2
        // destinations: [destinationA, destinationB],
        destinations: search_array,
        travelMode: google.maps.TravelMode.WALKING, // chang from DRIVING
        unitSystem: google.maps.UnitSystem.IMPERIAL, // ch from METRIC
        avoidHighways: false,
        avoidTolls: false,
      };

      service.getDistanceMatrix(request).then((response) => {
        // put response
        // show on map
        const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;
        const distances = response.rows[0].elements;
        var aString = "";
        for (let i = 0; i < destinationList.length; ++i) {
          aString += destinationList[i] + "\n";
        }
        var anotherString = "";
        for (let i = 0; i < distances.length; ++i) {
          anotherString +=
            "text (imp):" +
            distances[i].distance.text +
            "\tfeet (val):" +
            distances[i].distance.value +
            "\n";
        }
        console.log("aString:\n" + aString);
        console.log("anotherString:\n" + anotherString);
      });

      results.forEach((res) => {
        console.log(res);
      });

      console.log("\n pretty cool huh?... \n");
    });
  });
}

window.initMap = initMap;
