document.addEventListener("DOMContentLoaded", () => {
    const iframe = document.getElementById("wokwi-frame");
    const loadProjectBtn = document.getElementById("loadProject");

    function loadProject() {
        const projectId = "426050699253933057"; // Replace with your actual project ID
        iframe.src = `https://wokwi.com/projects/426050699253933057`;
    }

    loadProjectBtn.addEventListener("click", loadProject);
});
async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    // Display user message
    const chatbox = document.getElementById("chatbox");
    const userMessage = `<div class="user-message">${userInput}</div>`;
    chatbox.innerHTML += userMessage;

    // Clear input field
    document.getElementById("user-input").value = "";

    // Send question to backend
    try {
        const response = await fetch("http://127.0.0.1:5000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userInput })
        });

        const data = await response.json();
        const botResponse = `<div class="bot-message">${data.answer}</div>`;
        chatbox.innerHTML += botResponse;

        // Auto-scroll chatbox to latest message
        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
        console.error("Error fetching response:", error);
        chatbox.innerHTML += `<div class="bot-message">⚠️ Error fetching response.</div>`;
    }
}
