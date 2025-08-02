const API_URL = "https://chat.ivislabs.in/api/chat/completions";
const API_TOKEN = "sk-bf725748416143d88b7ea444d68f0c90"; // Replace with your actual token

async function askBot() {
  const userMessage = document.getElementById("userInput").value;
  const responseDiv = document.getElementById("botResponse");

  if (!userMessage.trim()) {
    responseDiv.textContent = "Please enter a question.";
    return;
  }

  responseDiv.textContent = "Thinking...";

  const payload = {
    model: "llama3.2-vision:latest",
    messages: [
      {
        role: "user",
        content: userMessage
      }
    ]
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "No response from bot.";
    responseDiv.textContent = reply;
  } catch (error) {
    responseDiv.textContent = "Error: " + error.message;
  }
}
