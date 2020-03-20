import React from "react";
import "./App.css";

import GoogleMap from "./GoogleMap/component";
import Sidebar from "./Sidebar/component";

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
