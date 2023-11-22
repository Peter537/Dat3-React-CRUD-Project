import React from "react";
import Day from "./Day";
import Night from "./Night";

function ThemeIcon() {
  const theme = sessionStorage.getItem("theme");

  return (
    <>
      {theme === "dark" && <Night />}
      {theme === "light" && <Day />}
    </>
  );
}

export default ThemeIcon;
