import React, { useState } from "react";
import styled from "@emotion/styled";

const Icon = ({ type, id }) => {
  const [hovering, setHovering] = useState(false);

  const Icon = styled.img`
    width: 30px;
  `;

  function handleHover(e) {
    e.target.style.width = hovering ? "50px" : "40px";
    setHovering(!hovering);
  }

  return (
    <div className="icon">
      <Icon onMouseOver={handleHover} src={`./img/${type}.png`} />
      <h1>{id}</h1>
    </div>
  );
};

export default Icon;
