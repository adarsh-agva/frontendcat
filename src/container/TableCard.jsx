import React, { useState } from "react";
import { Card } from "react-bootstrap";

export default function TableCard(props) {
  // dark mode state
  const darkMode = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  )[0];
  return (
    <>
      <Card
        style={{
          height: props.height ? props.height : "100%",
          width: props.width ? props.width : "100%",
          borderRadius: props.borderRadius ? props.borderRadius : "10px",
          padding: props.padding ? props.padding : "0px",
          position: props.position ? props.position : "relative",
          right: props.right ? props.right : "",
          boxShadow: props.boxShadow ? props.boxShadow : "",
          top: props.top ? props.top : "",
          backgroundColor: darkMode ? "#202940" : null,
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
