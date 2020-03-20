import React, { useState } from "react";
import styled from "@emotion/styled";

<<<<<<< HEAD
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
=======
const Icon = ({ type }) => {
  const [hovered, setHovered] = useState(false);

  const Icon = styled.img`
    width: ${hovered ? 50 : 40}px;
  `;
  return <Icon src="./img/poi.png" />;
>>>>>>> 45b81145150996f351a79acf21b81140249a6b3b
};

export default Icon;
