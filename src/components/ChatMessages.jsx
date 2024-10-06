import React, { useEffect, useRef } from "react";
import { Avatar, Skeleton, Stack, Box } from "@mui/material";
import KeeniousIcon from "./KeeniousIcon";
import ArticleCard from "./ArticleCard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

// Component for rendering text loading skeleton
const TextSkeleton = () => (
  <div style={{ marginBottom: 16 }}>
    <Skeleton variant="text" width="100%" height={24} />
    <Skeleton variant="text" width="100%" height={24} />
    <Skeleton variant="text" width="100%" height={24} />
  </div>
);

// Component for rendering article loading skeleton
const ArticleSkeleton = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <Stack xs={12} key={index}>
        <Skeleton variant="rectangular" height={140} />
      </Stack>
    ))}
  </>
);

const ChatMessages = ({ messages, isLoading, darkMode }) => {
  const messagesEndRef = useRef(null);
  const userMessageRef = useRef(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to scroll to the latest user message
  const scrollToUserMessage = () => {
    userMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to user message when loading starts
  useEffect(() => {
    if (isLoading) {
      scrollToUserMessage();
    }
  }, [isLoading]);

  // Scroll to bottom when window is reopenned
  useEffect(() => {
    scrollToBottom();
  }, []);

  // Check if a message is the first in a sequence from the same sender
  const isFirstInSequence = (index) => {
    if (index === 0) return true;
    return messages[index].sender !== messages[index - 1].sender;
  };

  return (
    <div className={`chat-messages ${darkMode ? "dark-mode" : ""}`}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message`}
          ref={
            index === messages.length - 1 && msg.sender === "user"
              ? userMessageRef
              : null
          }
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "10px",
            width: "50%",
            color: msg.sender === "bot" ? "#6130ff" : "black",
            textAlign: "left",
            justifyContent: "flex-start",
          }}
        >
          {isFirstInSequence(index) &&
            (msg.sender === "user" ? (
              <Avatar
                sx={{
                  bgcolor: "transparent",
                  color: darkMode ? "white" : "black",
                  marginRight: "10px",
                  marginTop: "-12px",
                  padding: "0px",
                }}
              >
                <PersonOutlineIcon />
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  bgcolor: "transparent",
                  color: "#6030FF",
                  marginRight: "10px",
                  marginTop: "-13px",
                  padding: "0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <KeeniousIcon sx={{ fontSize: 24 }} />
              </Avatar>
            ))}
          <div
            style={{
              flex: 1,
              alignItems: "left",
              color:
                msg.sender === "user"
                  ? darkMode
                    ? "white"
                    : "black"
                  : "#6130ff",
              marginLeft: isFirstInSequence(index) ? "0" : "40px",
            }}
          >
            {msg.text === "articles" ? (
              <Box display="flex" flexDirection="column" gap={2}>
                {msg.articles?.map((article, articleIndex) => (
                  <Box key={articleIndex}>
                    <ArticleCard article={article} darkMode={darkMode} />
                  </Box>
                ))}
              </Box>
            ) : (
              msg.text
            )}
          </div>
        </div>
      ))}
      {isLoading && (
        <div
          className="message"
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "10px",
            width: "50%",
            textAlign: "left",
            justifyContent: "flex-start",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "transparent",
              color: "#6030FF",
              marginRight: "10px",
              marginTop: "-13px",
              padding: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KeeniousIcon sx={{ fontSize: 24 }} />
          </Avatar>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextSkeleton />
            <Stack spacing={2}>
              <ArticleSkeleton />
            </Stack>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
