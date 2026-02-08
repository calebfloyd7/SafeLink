# Project Log / Documentation

Friday - 5:00 PM | Project Kickoff & Ideation
- Brainstormed project ideas with a focus on cybersecurity and real-world usability
- Identified phishing and malidious links as a relatable and high impacted problem
- Defined a scope due to limited time
- Decided on a web-based URL risk scanner with clear explanations

Friday - 6:30 PM | Technical Planning
- Chose tech stake:
  - HTML, CSS, Vanilla JavaScript (frontend)
  - Node.js + Express (backend)
  - Google Safe Browsing API (threat intelligence)\
 
- Oulined client-server flow:
1. User enters URL
2. Client performs heuristic analysis
3. Server shecks URL against Safe Browsing
4. results combined and displayed

Friday - 8:00 PM | Frontend Structure
- Created basic HTML layout
- Ensured layout was minimal to keep focus on functionality
- Connected JavaScript file and verified DOM elements loaded correctly

Saturday - 10:00 AM | Heuristic Logic Implementation
- Implemented URL parsing with defensive try/catch
- Added heuristic checks:
  - Raw IP address usage
  - Excessive subdomains
  - Long URLs
  - Suspicous characters
  - lookalike domains
- Assigned weighted scores to r=each rule
- Generated human-readable reasons for each risk factor
Challenge: Preventing malformed URLs from crashing the app
Solution: Graceful failure with clear user feedback

Saturday - 12:00 PM | Backend Setup
- Initialized Node.js project
- Installed dependencies (Express, dotenv, fetch utility)
- Created Express server with a POST /api/scan endpoint
- Added .env support for API key security

Saturday - 2:00 PM | Google Safe Browsing API Integration
- Studied Safe Browsing request format
- Built request payload and response parsing
- Tested API with known malicious URLs
- Verified correct detection of phising/malware flags
Challenge: Understanding Safe Browsing response structure
Solution: Console logging and incremental testing

Saturday - 4:00 PM | Client-Server Integration
- Connected frontend fetch() call to backend endpoint
- Displayed loading state (“Scanning…”) during API calls
- Parsed backend response and merged with heuristic results
- Categorized results into Low / Medium / High risk

Saturday - 6:00 PM | Debugging and Stability
- Fixed event listener timing issues using defer
- Resolved button click issues caused by DOM load order
- Tested edge cases:
  - Empty input
  - Invalid URLs
  - Extremely long URLs
- Verified consistent behavior across multiple test cases

Saturday - 10:00 PM | Styling & UX Improvements
- Centered layout and improved spacing
- Ensured readable contrast and clean typography
- Simplified results display for quick interpretation
- Removed unnecessary visual clutter

Saturday - 1:00 PM | Documentation & Cleanup
- Organized project structure
- Added .gitignore for node_modules and .env
- Wrote README and setup instructions
- Verified project can be cloned and run with npm install

Saturday - 4:00 PM | Final Review & Submission
- Final functionality testing
- Confirmed API integration working
- Reviewed code for clarity and comments
- Prepared project for submission

## Final Outcome
SafeLink demonstrates:
- Practical phishing detection concepts
- Defensive Programming practices
- Real-world API integration
- Clear communication of cybersecurity risk to non-technical users
