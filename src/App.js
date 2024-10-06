import React, { useState, useEffect } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Header from "./components/Header";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const clearChat = () => {
    localStorage.removeItem("chatMessages");
    window.location.reload();
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        clearChat={clearChat}
      />
      <div className="app-content">
        <Chat darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;
