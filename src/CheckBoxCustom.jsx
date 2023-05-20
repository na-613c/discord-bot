import React from "react";

const CheckBoxCustom = ({ title, isChecked = false, setChk }) => {
  return (
    <label>
      <input
        type="checkbox"
        defaultChecked={isChecked}
        onChange={() => setChk(title)}
      />
      {title}
    </label>
  );
};

export default CheckBoxCustom;
