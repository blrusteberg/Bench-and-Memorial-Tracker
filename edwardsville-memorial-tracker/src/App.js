import React from "react";
import "./App.css";

import GoogleMap from "./GoogleMap/component";
import Memorial from "./GoogleMap/Memorial";

const currentLocation = {lat: 38.806649, lng: -89.938928}
const memorialData = {
  "id":1,
  "donator":"John Doe",
  "x-coordinate":38.806649, 
  "y-coordinate":-89.938928
}


function App() {
  return (
    <div className="App">
      <Memorial/>
    </div>
  );
}

export default App;
