// import axios from "axios";

const axios = require("axios");

let og_addy = "222 NE Jessup St. Portland, OR 97211";

let add_url = `https://us1.locationiq.com/v1/search?key=APIKEYHERE&q=${encodeURIComponent(
  og_addy
)}&format=json`;

console.log(add_url);

let park_url =
  "https://us1.locationiq.com/v1/nearby?key=APIKEYHERE&lat=45.563730&lon=-122.662930&tag=park&radius=1600&format=json";

axios.get(add_url).then((response) => {
  console.log(response);
});
// axios.get(park_url).then((response) => {
//   results = response.data.map((location) => {
//     let name = location.name;
//     name += " ".repeat(30 - name.length);
//     return `${name}lat:${location.lat}\tlon:${location.lon}`;
//   });

//   results.forEach((res) => {
//     console.log(res);
//   });
// });
