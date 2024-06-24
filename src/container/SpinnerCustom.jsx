import React from "react";
import Style from "../css/SpinnerCustom.module.css";

export default function SpinnerCustom(props) {
  return (
    <>
      <div
        className={Style.container}
        style={{
          width: props.width ? props.width : "100%",
          height: props.height ? props.height : "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={Style.loader_three}></div>
      </div>
    </>
  );
}
