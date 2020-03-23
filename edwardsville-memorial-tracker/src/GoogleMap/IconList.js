import React from "react";

import Icon from "./Icon";

const IconList = ({ memorialData }) => {
  const iconList = memorialData.map(m => 
    <li>
      <Icon lat={m.latitude} lng={m.longitude} />
    </li>
  );

  return <ul>{iconList}</ul>;
};

export default IconList;
