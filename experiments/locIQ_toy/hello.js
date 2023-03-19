// import axios from "axios";

const axios = require("axios");

let og_addy = "222 NE Jessup St. Portland, OR 97211";

let add_url = `https://us1.locationiq.com/v1/search?key=API_KEY_GOES_HERR&q=${encodeURIComponent(
  og_addy
)}&format=json`;

console.log(`\nLooking for : ${og_addy}\n`);

axios.get(add_url).then((addy_response) => {
  let lat = addy_response.data[0].lat;
  let lon = addy_response.data[0].lon;

  let park_url = `https://us1.locationiq.com/v1/nearby?key=API_KEY_GOES_HERR&lat=${lat}&lon=${lon}&tag=park&radius=1600&format=json`;
  axios.get(park_url).then((response) => {
    results = response.data.map((location) => {
      let name = location.name;
      name += " ".repeat(30 - name.length);
      return `${name}lat:${location.lat}\tlon:${location.lon}`;
    });

    results.forEach((res) => {
      console.log(res);
    });

    console.log("\n pretty cool huh?... \n");
  });
});
