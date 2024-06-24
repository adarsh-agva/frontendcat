import React from "react";
import { Card } from "react-bootstrap";
import Style from "../css/CustomeCard.module.css";

export default function CustomCard(props) {
  // dark mode state
  return (
    <>
      <Card
        className={Style.CardCustomeOuter}
        style={{
          display:"flex",
          flexDirection:"row",
          overflow: "hidden",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          boxShadow: "0px 0px 50px #00000029",
          borderRadius: "15px",
          opacity: 1,
          border:"0px",
          height:"100%",
          justifyContent:"center"
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
