const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function explainCode(code) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Explain the following code, what it does, and its purpose. Provide a concise summary followed by an explanation of the core logic.\n\nCode:\n${code}`
    });
    return response.text;
  } catch (err) {
    if (err.message.includes('API key')) {
      return "Error: Missing or Invalid API key. Please check your GEMINI_API_KEY in the .env file.";
    }
    throw err;
  }
}

async function documentCode(code) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate comprehensive JSDoc (or standard docstrings) for the following code. Return ONLY the code with the documentation added, and no other markdown or conversational text. Do not wrap in markdown code blocks, just return raw text.\n\nCode:\n${code}`
    });
    let result = response.text;
    if (result.startsWith('\`\`\`') && result.endsWith('\`\`\`')) {
       result = result.replace(/^\`\`\`[a-z]*\n/, '').replace(/\n\`\`\`$/, '');
    }
    return result;
  } catch (err) {
    if (err.message.includes('API key')) {
      return "Error: Missing or Invalid API key.";
    }
    throw err;
  }
}

async function generateTest(code, filename) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert developer. Generate a Jest unit test suite for the following code. The test should import the necessary functions and have at least a couple of basic assertions. The original file is named '${filename}'. Return ONLY the raw code for the test file, with no markdown code blocks or extra text.\n\nCode:\n${code}`
    });
    let result = response.text;
    if (result.startsWith('\`\`\`') && result.endsWith('\`\`\`')) {
       result = result.replace(/^\`\`\`[a-z]*\n/, '').replace(/\n\`\`\`$/, '');
    }
    return result;
  } catch (err) {
    if (err.message.includes('API key')) {
      return "Error: Missing or Invalid API key.";
    }
    throw err;
  }
}

module.exports = { explainCode, documentCode, generateTest };
