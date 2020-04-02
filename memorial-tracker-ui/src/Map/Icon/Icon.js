import React from "react";
import "./Icon.css";

const Icon = props => {
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
    <div>
      <img
        className="IconImage"
        src={`./icons/${type}.png`}
        alt="memorial icon"
      />
    </div>
  );
};

export default Icon;
