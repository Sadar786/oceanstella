import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from '../redux/Theme/ThemeSlice';


export default function ThemeToggle() {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-4 py-2 rounded-md shadow bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
    >
      {mode === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
