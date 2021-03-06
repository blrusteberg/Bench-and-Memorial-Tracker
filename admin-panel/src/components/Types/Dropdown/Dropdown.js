import React from "react"

const dropdown = (props) => {
  return (
    <div>
      <select onChange={(event) => props.dropdownChange(event)}>
        {props.selectedTypeIndex === 0 ?
        <option key={"selectType"} value={"selectType"}>
          Select a type
        </option>
        :
        null
        }
        {Object.values(props.types).map((list, n) => (
          <option key={list.Id} value={n}>
            {list.Name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default dropdown;
