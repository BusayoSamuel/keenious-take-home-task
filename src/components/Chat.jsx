import React, { useState, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import {
  generateOpenAlexUrl,
  fetchOpenAlexData,
  summarizeArticles,
} from "../backend";

const Chat = ({ darkMode }) => {
  // Initialize messages state from localStorage or empty array
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() !== "") {
      // Add user message to chat
      setMessages([...messages, { text: inputText, sender: "user" }]);
      setIsLoading(true);

      try {
        // Generate OpenAlex URL based on user input
        const generatedUrl = await generateOpenAlexUrl(inputText);
        // Fetch data from OpenAlex API
        const data = await fetchOpenAlexData(generatedUrl);

        // Prepare articles for summarization
        const articlesToSummarize = data.results
          .slice(0, 5)
          .map(
            (article, index) => `
            Title: ${article.title || ""}
            Authors: ${article.authorships
              .map((a) => a.author.display_name)
              .join(", ")}
            Year: ${article.publication_year || ""}
            Citations: ${article.cited_by_count || ""}
            isOpenAccess: ${article.open_access?.is_oa || ""}
          `
          )
          .join("\n\n");

        // Get summary of articles from OpenAI
        const summary = await summarizeArticles(inputText, articlesToSummarize);

        // Prepare articles for display
        const articlesToDisplay = data.results.slice(0, 5).map((article) => {
          const authorList = article.authorships.map(
            (a) => a.author.display_name
          );
          // Format authors as "First Author et al." if more than one
          const formattedAuthors =
            authorList.length > 1 ? `${authorList[0]} et al.` : authorList[0];

          return {
            title: article.title || "",
            authors: formattedAuthors,
            year: article.publication_year || "",
            doi: article.doi || "",
            citedByCount: article.cited_by_count || "",
            isOpenAccess: article.open_access.is_oa || "",
            type: article.type || "",
            source: article.primary_location?.source?.display_name || "",
          };
        });

        // Add bot messages to chat (summary and articles)
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: summary, sender: "bot" },
          {
            text: "articles",
            sender: "bot",
            articles: articlesToDisplay,
          },
        ]);
      } catch (error) {
        // Add error message to chat if something goes wrong
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: `${error.message}`,
            sender: "bot",
          },
        ]);
      } finally {
        // Reset loading state and input text
        setIsLoading(false);
        setInputText("");
      }
    }
  };

  return (
    <div className={`chat-container ${darkMode ? "dark-mode" : ""}`}>
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        darkMode={darkMode}
      />
      <div className="chat-input-wrapper">
        <ChatInput
          inputText={inputText}
          setInputText={setInputText}
          handleSendMessage={handleSendMessage}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default Chat;
