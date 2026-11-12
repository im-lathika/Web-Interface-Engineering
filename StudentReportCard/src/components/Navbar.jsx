import { useState } from "react";
import { NavLink } from "react-router-dom";
import { semesters } from "../data";

const SEMS = Object.keys(semesters).map(Number);

function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="brand" onClick={close}>
          Academic Record
        </NavLink>

        <button
          className="menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>

        <button className="theme-btn" onClick={onToggleTheme}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={close}>Overview</NavLink>
          {SEMS.map((n) => (
            <NavLink key={n} to={`/semester/${n}`} onClick={close}>Semester {n}</NavLink>
          ))}
          <NavLink to="/predictor" onClick={close}>CGPA Predictor</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;