import React from "react";

function Dropdown({ value, label, collection, onHandleChange }) {
  if (collection.length <= 2) return null;

  return (
    <div className="dropdown-container">
      <label htmlFor={value}>{label}:</label>
      <select value={value} onChange={onHandleChange} label={label}>
        {collection.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
