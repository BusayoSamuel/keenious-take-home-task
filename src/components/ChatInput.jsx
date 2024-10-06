import React from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({
  inputText,
  setInputText,
  handleSendMessage,
  darkMode,
}) => {
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className={`chat-input-container ${darkMode ? "dark-mode" : ""}`}>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Message Keenious"
        onKeyDown={(e) =>
          e.key === "Enter" && !e.shiftKey && handleSendMessage()
        }
        className="chat-input"
      />
      <IconButton onClick={handleSendMessage} className="send-button">
        <SendIcon sx={{ color: "#6130ff" }} />
      </IconButton>
    </div>
  );
};

export default ChatInput;
