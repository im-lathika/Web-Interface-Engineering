import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ReportCard from "./pages/ReportCard";
import Predictor from "./pages/Predictor";
import useTheme from "./hooks/useTheme";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="card empty">
      <h2>404</h2>
      <p>Page not found.</p>
      <Link className="btn btn--primary" to="/">Back to home</Link>
    </div>
  );
}

function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/semester/:id" element={<ReportCard />} />
          <Route path="/predictor" element={<Predictor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
