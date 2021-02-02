import React from "react";

function Dropdown({ value, collection, onHandleChange, setLabel }) {
  return (
    <select value={value} onChange={onHandleChange}>
      {collection.map((item) => (
        <option value={item} multiple={true} key={item}>
          {setLabel ? setLabel(item) : item}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
