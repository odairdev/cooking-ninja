import { useTheme } from "../hooks/useTheme";
import "./ThemeSelector.css";
import modeIcon from "../assets/mode-icon.svg";

const themeColors = ["#58249c", "#2496cb", "#b70233"];

export function ThemeSelector() {
  const { changeColor, mode, changeMode } = useTheme();

  const toggleMode = () => {
    mode === "light" ? changeMode("dark") : changeMode("light");
  };

  return (
    <div className="theme-selector">
      <img
        src={modeIcon}
        alt="Light/Dark mode icon"
        className="mode-icon"
        style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        onClick={toggleMode}
      />
      <div>
        {themeColors.map((color) => (
          <button
            key={color}
            className="theme-btn"
            style={{ backgroundColor: color }}
            onClick={() => changeColor(color)}
          ></button>
        ))}
      </div>
    </div>
  );
}
