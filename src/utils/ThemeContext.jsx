import { createContext } from "react";

// implementing dark theme light theme by context api
export const themes = {
  dark: "",
  light: "light-theme",
};

// implementing sidebar
export const sideMenus = {
  menuShow: "sidebar",
  menuHide: "",
};

export const ThemeContext = createContext({
  theme: themes.light,
  changeTheme: () => {},

  // sidebar menu
  sideMenu: sideMenus.menuShow,
  changeSideMenu: () => {},
});
