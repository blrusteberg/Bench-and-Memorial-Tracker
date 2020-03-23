import React from "react";
import "./App.css";

import GoogleMap from "./GoogleMap/component";
import Sidebar from "./Sidebar/component";

const memorialData = require("./memorials.json").memorials;
const currentLocation = { lat: 38.812203, lng: -89.957655 };

function App() {
  console.log(memorialData);
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
