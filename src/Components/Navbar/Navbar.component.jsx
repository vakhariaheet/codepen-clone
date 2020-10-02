import React, { useEffect, useState } from "react";
import "./Navbar.styles.scss";
import { useHistory } from "react-router";
const Navbar = () => {
  const history = useHistory();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [history, currentPath]);
  return (
    <nav className="navabar">
      <h3>Logo</h3>
    </nav>
  );
};

export default Navbar;
