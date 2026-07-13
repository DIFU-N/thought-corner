import { memo } from "react";
import "./DarkMode.css";
import { useTheme } from "next-themes";
import Sun from "../../atoms/Sun";
import Moon from "../../atoms/Moon";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <div className="items-center flex">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <div className="dark_mode_icons">
          <Sun />
          <Moon />
        </div>
      </label>
    </div>
  );
};

export default memo(ThemeToggle);
