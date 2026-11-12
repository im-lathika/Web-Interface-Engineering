import React from "react";
import "./Header.css";

function Header({ collegeName }) {
  return (
    <header className="header">

      <h1 className="header-title">
        {collegeName}
      </h1>

      <p className="header-subtitle">
        Student Dashboard
      </p>

    </header>
  );
}

export default Header;