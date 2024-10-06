import React from "react";
import KeeniousLogo from "./KeeniousLogo";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Header = ({ darkMode, toggleDarkMode, clearChat }) => {
  return (
    <header className="App-header">
      <div className="header-content">
        <KeeniousLogo className="keenious-logo" />

        <div>
          <IconButton onClick={clearChat} color="inherit">
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
