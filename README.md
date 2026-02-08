# SafeLink

## Overview
SafeLink is a web-based URL risk scanner designed to help users quickly assess whether or not a link is safe. The project combines client-side heuristic analysis with server-side verification using external threat intelligence to provide an easy-to-understand risk score and explanation. This project was built as a part of the UGA Hacks 11 hackaton and focuses on usability, clarity, and practical cybersecurity concepts.

## Features
- URL risk scoring based on common phishing and malicious-link patterns
- Clear explantions for why a URL is flagged as risky
- Integration with the Google Safe Browsing API for known threats
- Simple and clean interface
- Fast feedback with minimal setup

## How It Works
### 1. Client-Side Analysis
When a user enters a URL, SafeLink first applies heuristic checks in the browser, including:
- Use of raw IP addresses instead of domain names
- Excessive subdomains
- Unusually long URLs
- Presence of suspicious characters
- Potential lookalike domains

Each condition contributes to a cumulative risk score.

### 2. Server-Side Verification
The URL is then sent to a Node.js backend, which queries the Google Safe Browsing API to determine whether the link is associated with:
- Malware
- Phishing
- Social engineering attacks
- Known unsafe content

### 3. Results
The final output risk score includes:
- A numerical risk score
- A qualitative risk level ( Low / Medium / High )
- A list of reasons explaining the score

## Tech Stack
Frontend
- HTML
- CSS
- Vanilla JavaScript

Backend
- Node.js
- Express.js

APIs
- Google Safe Browsing API

Tools
- VS Code
- GitHub
- ChatGPT

## Project Structure
```text
SafeLink/
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── server/
│   ├── package.json
│   └── server.js
└── README.md
```
## Setup Instructions
1. Clone the repository
```
git clone https://github.com/calebfloyd7/SafeLink.git
cd SafeLink
```
2. Install dependencies
```
npm install
```
3. Create a .env file
```
SAFE_BROWSING_API_KEY=your_api_key_here
```
4. In the server folder, start the server
```
npm start
```
5. In the SafeLink folder, start the application
```
open public/index.html
```

## Limitations
- Not a replacement for enterprise security tools
- Relies on heuristics that may produce a false posistive
- Requires an active Google Safe Browsing API key

## Future Improvements
- Visual risk meter or progress bar
- Browser extension version
- Expanded heuristic rules

## Project Log Summary
SafeLink was developed during a short, intensive hackaton window with the goal of creating a simple, user-friendly tool to evaluate the risk of suspicious URLs. The project combines client-side heuristic analysis with sever-side verification using the Google Safe Browsing API to provide both transparency and accuracy.

Development progressed from early planning and UI design to frontend implementation, backend API integration, debugging, and applying a final polish. Key challenges included syncing the frontend with the backend when using the scan button. Along with tricky URLs that should have gotten a high score but instead recieved a low score. By the end of th edevelopement window, SafeLink successfully demonstrated practical cybersecurity concepts, clean client-server communication, and a focus on explainability rather than a yes or no response on the safetly of the URL.
