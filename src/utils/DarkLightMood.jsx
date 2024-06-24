import React, { useState } from "react";
import Style from "../css/DarkLightMode.module.css";
import { ThemeContext, themes } from "./ThemeContext";
import faSun from "../assets/icons/sunIcon.png";
import faMoon from "../assets/icons/faMoon.png";

import { Image } from "react-bootstrap";

export default function DarkLightMood() {
  const [darkMode, setDarkMode] = useState(themes.dark);

  return (
    <ThemeContext.Consumer>
      {({ changeTheme }) => (
        <section
          className={Style.Outer_section}
          onClick={() => {
            setDarkMode(!darkMode);
            changeTheme(darkMode ? themes.dark : themes.light);
          }}
        >
          {darkMode ? <Image src={faSun} width="28px" /> : <Image src={faMoon} width="16px" />}

        </section>
      )}
    </ThemeContext.Consumer>
  );
}
