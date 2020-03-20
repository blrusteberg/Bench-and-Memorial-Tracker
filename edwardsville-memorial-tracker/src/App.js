import React from "react";
import "./App.css";

import GoogleMap from "./GoogleMap/component";
import Sidebar from "./Sidebar/component";

<<<<<<< HEAD
const memorialData = require("./memorials.json").memorials;
const currentLocation = { lat: 38.812203, lng: -89.957655 };

function App() {
  console.log(memorialData);
=======
const currentLocation = { lat: 38.812203, lng: -89.957655 };
const memorialData = [
  {
    id: 1,
    type: "Tree",
    donator: "John Doe",
    latitude: 38.806649,
    longitude: -89.938928,
    dateDonated: "1/2/2020"
  },
  {
    id: 2,
    type: "Bench",
    donator: "Noah Dirk",
    latitude: 38.810782,
    longitude: -89.957078,
    dateDonated: "1/3/2020"
  }
];

function App() {
>>>>>>> 45b81145150996f351a79acf21b81140249a6b3b
  return (
    <div className="App">
      <GoogleMap
        memorialData={memorialData}
        currentLocation={currentLocation}
      />
      <Sidebar memorialData={memorialData} />
    </div>
  );
}

export default App;
