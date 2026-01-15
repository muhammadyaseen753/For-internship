function askGemini(userQuestion) {
  const API_KEY = "YOUR_API_KEY";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${API_KEY}`;

  // This is the structure the API expects
  const requestBody = {
    contents: [{
      parts: [{ text: userQuestion }] // Your question goes here
    }]
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  })
    .then(res => res.json())
    .then(data => {
      // Pulling the answer out of the nested JSON
      const answer = data.candidates[0].content.parts[0].text;
      console.log("Gemini's Answer:", answer);
      
      // Example: Displaying it on a webpage
      // document.getElementById("response-box").innerText = answer;
    })
    .catch(err => console.error("Error:", err));
}

// How to use it:
askGemini("What is the capital of France?");
askGemini("How do I bake a chocolate cake?");

console.log("Try programiz.pro");