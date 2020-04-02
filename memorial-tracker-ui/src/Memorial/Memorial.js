import React from "react";
import "./Memorial.css";

const Memorial = props => {
  let type = "";
  switch (props.type) {
    case "tree":
      type = "tree";
      break;
    case "bench":
      type = "bench";
      break;
    case "art":
      type = "art";
      break;
    default:
      type = "memorial";
  }
  return (
    <div className="Memorial">
      <img
        className="icon"
        src={`./icons/${type}.png`}
        alt="memorial type icon"
      />
      <p>{props.donator}</p>
      <p>{props.type}</p>
    </div>
  );
};

export default Memorial;
