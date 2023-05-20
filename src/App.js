import React, { useState } from "react";
import CheckBoxCustom from "./CheckBoxCustom";
import { data } from "./data";

const App = () => {
  let defaultData = localStorage.getItem("data");
  if (!defaultData) localStorage.setItem("data", JSON.stringify(data));

  const [state, setState] = useState(JSON.parse(defaultData) || data);

  const setChk = title => {
    let newState = state.map(e => {
      return e.title === title ? { title, isChk: !e.isChk } : e;
    });
    setState(newState);
    localStorage.setItem("data", JSON.stringify(newState));
  };
  const getInputs = () =>
    state.map(e => (
      <CheckBoxCustom
        key={e.title}
        title={e.title}
        isChecked={e.isChk}
        setChk={setChk}
      />
    ));

  const submit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: state }),
    };
    fetch("http://localhost:2000/", requestOptions).then(response =>
      response.json()
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: 20 }}>
      {getInputs()}
      <input
        type={"button"}
        className="gradient-button"
        value="Отправить"
        onClick={submit}
      />
    </div>
  );
};

export default App;
