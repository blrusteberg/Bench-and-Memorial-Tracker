import React, { useState } from "react";
import styled from "@emotion/styled";

const Icon = ({ type }) => {
  const [hovered, setHovered] = useState(false);

  const Icon = styled.img`
    width: ${hovered ? 50 : 40}px;
  `;
  return <Icon src="./img/poi.png" />;
};

export default Icon;
