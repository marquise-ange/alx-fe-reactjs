import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navStyle = {
    padding: "1rem 2rem",
    backgroundColor: "#222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // <-- add this line
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "2rem"
  };
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    marginRight: "2rem",
    fontWeight: 500,
    fontSize: "1.1rem",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background 0.2s"
  };
  const activeStyle = {
    background: "rgb(36 103 121)",
    color: "#fff"
  };
  return (
    <nav style={navStyle}>
      <Link to="/" style={{ ...linkStyle, ...(location.pathname === "/" ? activeStyle : {}) }}>Home</Link>
      <Link to="/about" style={{ ...linkStyle, ...(location.pathname === "/about" ? activeStyle : {}) }}>About</Link>
      <Link to="/services" style={{ ...linkStyle, ...(location.pathname === "/services" ? activeStyle : {}) }}>Services</Link>
      <Link to="/contact" style={{ ...linkStyle, ...(location.pathname === "/contact" ? activeStyle : {}) }}>Contact</Link>
    </nav>
  );
}

export default Navbar; 