import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { profile } from "./data";
import { Home, About, Skills, Projects, Certificates, Journey, Resume, Contact } from "./pages";

const PAGES = [
  { id: "home", label: "Home", View: Home },
  { id: "about", label: "About", View: About },
  { id: "skills", label: "Skills", View: Skills },
  { id: "projects", label: "Projects", View: Projects },
  { id: "certs", label: "Certificates", View: Certificates },
  { id: "journey", label: "Journey", View: Journey },
  { id: "resume", label: "Resume", View: Resume },
  { id: "contact", label: "Contact", View: Contact },
];
const fromHash = () => {
  const id = window.location.hash.replace("#/", "");
  return PAGES.some((p) => p.id === id) ? id : "home";
};

export default function App() {
  const [page, setPage] = useState(fromHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { View, label } = PAGES.find((p) => p.id === page);

  useEffect(() => {
    document.title = `${label} | ${profile.name}`;
    window.scrollTo(0, 0);
  }, [label]);
  useEffect(() => {
    const onHash = () => setPage(fromHash());
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const go = useCallback((id) => { window.location.hash = "/" + id; setMenuOpen(false); }, []);

  return (
    <div className="shell">
      <a href="#content" className="skip">Skip to content</a>
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="nav-inner">
          <button className="brand" onClick={() => go("home")} aria-label={profile.name + " home"}>
            <img className="avatar" src={import.meta.env.BASE_URL + "profile.jpg"} alt="" />
            <span><strong>{profile.name}</strong><small>{profile.role}</small></span>
          </button>
          <nav className={"links" + (menuOpen ? " open" : "")} aria-label="Main">
            {PAGES.filter((p) => p.id !== "contact").map((p) => (
              <button key={p.id} className={"link" + (p.id === page ? " active" : "")}
                aria-current={p.id === page ? "page" : undefined} onClick={() => go(p.id)}>
                {p.label}
              </button>
            ))}
            <button className="btn nav-cta" onClick={() => go("contact")}>Contact me</button>
          </nav>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
      <main id="content" className="content" key={page}><View go={go} /></main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.department}</span>
      </footer>
    </div>
  );
}
