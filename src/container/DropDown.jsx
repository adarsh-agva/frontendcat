import React, { useState } from "react";
import { Card } from "react-bootstrap";

export default function CustomeDropDown(props) {
  // dark mood state

  const darkMode = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  )[0];

  return (
    <>
      <Card
        style={{
          borderRadius: "10px",
          width : "300px",
          height : "360px",
          padding: props.padding ? props.padding : "10px",
          boxShadow: props.boxShadow
            ? props.boxShadow
            : "0px 0px 30px #00000029",
          display: "flex",
          alignItems: props.alignItems ? props.alignItems : "center",
          marginTop: props.marginTop && "",
          position: props.position ? props.position : "",
          top : "8%",
          right: "5%",
          marginRight: props.marginRight ? props.marginRight : "",
          zIndex: props.zIndex ? props.zIndex : "",
          backgroundColor: darkMode ? "#202940" : null,
          gap:"0.8rem",
          border:"0px",
          visibility: props.visibility ? props.visibility : "",
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
