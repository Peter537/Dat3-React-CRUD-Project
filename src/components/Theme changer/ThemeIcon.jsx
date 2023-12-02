import React, { useState } from "react";
import Day from "./Day";
import Night from "./Night";

function ThemeIcon() {
  const [theme, setTheme] = useState(sessionStorage.getItem("theme") || "dark");

  function changeTheme() {
    if (theme === "dark") {
      sessionStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      sessionStorage.setItem("theme", "dark");
      setTheme("dark");
    }
    window.location.reload();
  }

  return (
    <>
      {theme === "dark" && <Night onChangeTheme={changeTheme} />}
      {theme === "light" && <Day onChangeTheme={changeTheme} />}
    </>
  );
}

export default ThemeIcon;
