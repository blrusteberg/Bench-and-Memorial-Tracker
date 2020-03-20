import React from "react";

const Memorial = ({ data }) => {
  return (
    <div className="memorial">
      <h2>Donator: {data.donator}</h2>
      <h3>Date Donated: {data.dateDonated} </h3>
    </div>
  );
};

export default Memorial;
