# AI Developer Assistant (`dev-agent`) 🤖

An intelligent Command Line Interface (CLI) tool powered by **Google Gemini** that automates and assists in common development workflows. 

This project demonstrates the use of Large Language Models (LLMs) to automatically understand code, generate inline documentation, and build comprehensive unit test suites. 

Built for **Assignment 2**, it showcases a seamless integration of AI directly into the developer's local environment.

## ✨ Features

- **Code Explanation (`explain`)**: Analyzes any source code file and outputs a clear, human-readable summary of its logic.
- **Documentation Generation (`doc`)**: Scans code and automatically writes standard JSDoc/Docstrings for functions and classes directly into the file.
- **Automated Unit Testing (`test`)**: Reads your code and automatically generates a complete and robust Jest unit test suite saved to a new `.test.js` file.

## 🚀 Setup & Installation

### Prerequisites
- Node.js installed on your machine.
- A valid Google Gemini API Key.

### 1. Clone the repository
\`\`\`bash
git clone git@github.com:HarshS99/LegalSeva.org.git
cd LegalSeva.org
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Setup
Create a `.env` file in the root directory and add your Google Gemini API Key:
\`\`\`bash
cp .env.example .env
\`\`\`
Edit the `.env` file:
\`\`\`env
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

## 💻 Usage

To test the agent, you can run the commands directly on the provided `example.js` file:

### Explain Code
Understand what a file does without reading every line.
\`\`\`bash
node index.js explain example.js
\`\`\`

### Generate Documentation
Add JSDoc comments to your undocumented code. 
\`\`\`bash
node index.js doc example.js
\`\`\`

### Generate Unit Tests
Automatically create a Jest test suite (creates `example.test.js`).
\`\`\`bash
node index.js test example.js
\`\`\`

## 🛠️ Built With
- **Node.js**
- **Commander.js** - For parsing CLI arguments.
- **@google/genai** - Google's official Gemini AI SDK.
- **Ora** - For elegant terminal spinners.
