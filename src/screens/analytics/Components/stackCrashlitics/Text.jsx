import React from "react";
import Style from "../../../../css/Text.module.css";

export default function Text() {
  // GETTGIN DATA FROM URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const colData = urlParams.get("col");
  // HEADING DATA ANALYTIC

  return (
    <section className={`${Style.outerSection} darkModebgColor`}>
      <p className="darkModebgColor">{colData.split(" at")}</p>
      {/* <FontAwesomeIcon icon={faCaretDown} /> */}
    </section>
  );
}
