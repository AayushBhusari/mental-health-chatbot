import { GoogleGenerativeAI } from "@google/generative-ai";

// Maintain the conversation history
let conversationHistory = [];

// Function to update the chat box with messages
const updateChatBox = (sender, message, isHTML = false) => {
  const chatBox = document.getElementById("chatBox");
  const messageElement = document.createElement("div");
  messageElement.className = sender;

  if (isHTML) {
    // Set the innerHTML if it's a parsed HTML message (for bot responses)
    messageElement.innerHTML = message;
  } else {
    // Use textContent for user inputs or non-HTML messages
    messageElement.textContent = message;
  }

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
};

// Format the MD elements in Gemini Response
const formatResponse = (text) => {
  // Use marked.js to convert Markdown to HTML
  const output = marked(text);
  return output;
};

// Function to handle user input
const getUserInput = () => {
  let userInput = document.getElementById("userInput").value;
  if (userInput === "") {
    alert("Please input something ......");
  } else {
    updateChatBox("user", userInput); // User input as text
    document.getElementById("userInput").value = "";
    getBotResponse(userInput);
  }
};

// Function to get bot response
const getBotResponse = async (userInput) => {
  try {
    // Directly include the API key here
    const API_KEY = "";
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Initialize the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Push user's input into conversation history
    conversationHistory.push({ role: "user", parts: [{ text: userInput }] });

    // Send the conversation history to the model and get a response
    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(userInput);

    // Now fetch the response parts from the result
    let text = result.response.candidates[0].content.parts[0].text;
    text = formatResponse(text); // Parse Markdown to HTML

    // Update the chat box with the bot's response (as HTML)
    updateChatBox("bot", text, true);

    // Push bot's response to conversation history
    conversationHistory.push({ role: "model", parts: [{ text: text }] });
  } catch (error) {
    console.error("Error getting bot response:", error);
    updateChatBox("bot", "Oops! Something went wrong. Please try again later.");
  }
};

// Add Event Listener
document.getElementById("sendButton").addEventListener("click", getUserInput);
document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getUserInput();
  }
});
