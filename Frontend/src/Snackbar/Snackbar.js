import React, { useState } from "react";

import "./Snackbar.css";
import {GrFormClose} from "react-icons/gr"
import { useEffect } from "react";

export default function Snackbar(props) {
  const [toggleclass, setToggleclass] = useState();

  useEffect(()=>{
    setToggleclass(props.toggle)
  },[props])
  // const messageTitle = ["info", "success", "warning", "danger"];

  return (
    <div className="App">
      <div className={`${toggleclass==="true" ? "received" : ""} notification`}>
        <div className={`notification__message message--${props.type}`}>
          <h1>{props.title}</h1>
          <p>{props.message}</p>

          <button
            onClick={() => {
              setToggleclass("false");
              window.location.href = props.Route

            }}
          >
           <GrFormClose/>
          </button>
        </div>
      </div>


    </div>
  );
}
