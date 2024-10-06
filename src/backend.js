import axios from "axios";

// Helper function to make API calls to OpenAI
const openaiApiCall = async (messages) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    // Handle different types of errors with specific error messages
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error("Unauthorized: Please report this issue.");
        case 403:
          throw new Error("This service is not available in your region.");
        case 429:
          throw new Error(
            "Too Many Queries: You've exceeded your rate limit, pace your queries."
          );
        case 500:
          throw new Error(
            "Internal Server Error: Our servers have encountered an error, please try again later."
          );
        case 503:
          throw new Error("Service Unavailable: Please try again later.");
        default:
          throw new Error(
            `OpenAI API Error: ${error.response.status} - ${error.response.data.error.message}`
          );
      }
    } else if (error.request) {
      throw new Error(
        "No response received from OpenAI. Please check your internet connection."
      );
    } else {
      throw new Error("Error setting up the request to OpenAI.");
    }
  }
};

// Function to generate OpenAlex URL based on user input
export const generateOpenAlexUrl = async (inputText) => {
  try {
    const messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates OpenAlex Works API URL structures based on user queries and filters.",
      },
      {
        role: "user",
        content: `Generate an OpenAlex Works API URL structure based on the following query and filters:
          Query: ${inputText}
          Filters: publication_year (type: number), cited_by_count (type: number), is_oa (type: boolean), default_search (type: string)
          For example, if the user asks for "artificial intelligence articles published after 2015 with exactly 100 citations", the ChatGPT API should produce the following URL:
          https://api.openalex.org/works?filter=default.search:artificial+intelligence,publication_year:>2015,cited_by_count:100
          Only generate the URL and nothing else in your response.`,
      },
    ];

    return await openaiApiCall(messages);
  } catch (error) {
    throw new Error(error);
  }
};

// Function to fetch data from OpenAlex API
export const fetchOpenAlexData = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.data) {
      return response.data;
    } else {
      throw new Error(
        "No articles found. Please try a different search query."
      );
    }
  } catch (error) {
    if (error.status === 403) {
      throw new Error(
        "Invalid query parameters. Please try a different search query."
      );
    }
    throw new Error(
      "Our servers have encountered an error, please try again later"
    );
  }
};

// Function to summarize articles using OpenAI
export const summarizeArticles = async (inputText, articlesToSummarize) => {
  try {
    const messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes academic articles results from the OpenAlex API concisely.",
      },
      {
        role: "user",
        content: `Based on the following query: ${inputText}
          These are the articles that were found:
          ${articlesToSummarize}
          Please provide a brief summary of the results in about 2-3 sentences, summarising the year of publication, number of articles with open access, and conclude with any overall themes or connections between the articles.`,
      },
    ];

    return await openaiApiCall(messages);
  } catch (error) {
    throw new Error(error);
  }
};
