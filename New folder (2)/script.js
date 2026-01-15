const arrows = document.querySelectorAll('.arrow');

/* 🔧 CHANGE ONLY THIS VALUE */
const DURATION = 1000; // milliseconds (1000 = real clock)

function updateClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours   = now.getHours();

  arrows[0].style.rotate = `${seconds * 6 - 90}deg`;
  arrows[2].style.rotate = `${minutes * 6 - 90}deg`;
  arrows[1].style.rotate = `${hours * 30 - 90}deg`;
}

/* ⏱️ SYNC TO EXACT SECOND */
function startClock() {
  updateClock();

  const delay = DURATION - (new Date().getMilliseconds() % DURATION);

  setTimeout(() => {
    updateClock();
    setInterval(updateClock, DURATION);
  }, delay);
}

startClock();
function askGemini() {
  const API_KEY = "YOUR_API_KEY"; // REPLACE THIS
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: "Why is my API request failing?" }]
      }]
    })
  })
    .then(response => {
      // This part helps you debug the "Bad Request"
      if (!response.ok) {
        return response.json().then(err => { 
          console.error("Detailed Error:", err); 
          throw new Error("Check console for details");
        });
      }
      return response.json();
    })
    .then(data => {
      console.log("Success:", data.candidates[0].content.parts[0].text);
    })
    .catch(error => console.error("Request failed:", error));
}

askGemini();