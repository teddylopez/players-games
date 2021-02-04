import React, {useEffect} from "react";

function Dropdown({ value, label, collection, onHandleChange, setLabel }) {
  if (collection.length <= 2) return null;

  return (
    <div className="dropdown-container">
      <label htmlFor={value}>{label}:</label>
      <select value={value} onChange={onHandleChange}>
        {collection.map((item) => (
          <option value={item} key={item}>
            {setLabel ? setLabel(item) : item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
