// Allows user to click the scan button and see the resluts.
document.getElementById("scanBtn").addEventListener("click", async () => {
  const url = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");

  // Prompt incase of empty input.
  if (!url) {
    resultDiv.innerHTML = "Please enter a URL.";
    return;
  }

  resultDiv.innerHTML = "Scanning...";

  // Call the backend API to scan the URL and get the risk score and reasons.
  const response = await fetch("http://localhost:3000/api/scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  const data = await response.json();

  // Color code the risk level
  const color =
    data.risk === "High" ? "red" :
    data.risk === "Medium" ? "orange" :
    "green";

  // Display the results with reasons in a user-friendly format.
  resultDiv.innerHTML = `
    <p style="font-weight:700; color:${color}">
      Risk: ${data.risk} (${data.score})
    </p>
    <p><strong>Reasons:</strong></p>
    <ul>
      ${(data.reasons || []).map(r => `<li>${r}</li>`).join("")}
    </ul>
  `;
});
