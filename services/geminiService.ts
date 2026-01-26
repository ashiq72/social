
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Safely retrieves the API Key from the environment.
 * This prevents 'process is not defined' errors in browser environments
 * where a build tool hasn't shimmed the process object.
 */
const getSafeApiKey = (): string => {
  try {
    // In many build environments (Vite, Webpack), process.env is shimmed.
    // If not, we catch the error and return an empty string.
    return (typeof process !== 'undefined' && process.env?.API_KEY) || '';
  } catch (e) {
    return '';
  }
};

export const enhanceDraft = async (draft: string): Promise<string> => {
  if (!draft) return "";
  
  const apiKey = getSafeApiKey();
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Check your environment variables.");
    return draft;
  }

  try {
    // Initialize inside the function call to ensure we use the freshest environment state
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance this social media post draft to be more engaging and viral, but keep it concise (under 280 chars). Add relevant hashtags if appropriate: "${draft}"`,
    });
    return response.text || draft;
  } catch (error) {
    console.error("Gemini Enhancement Error:", error);
    return draft;
  }
};

export const analyzePostSentiment = async (content: string): Promise<{ sentiment: string; tone: string }> => {
  const apiKey = getSafeApiKey();
  if (!apiKey) {
    return { sentiment: "Neutral", tone: "Casual" };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the sentiment and tone of this post: "${content}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING, description: "Positive, Neutral, or Negative" },
            tone: { type: Type.STRING, description: "Professional, Casual, Angry, etc." }
          },
          required: ["sentiment", "tone"]
        }
      }
    });
    
    const text = response.text;
    return text ? JSON.parse(text.trim()) : { sentiment: "Neutral", tone: "Casual" };
  } catch (error) {
    console.error("Sentiment Analysis Error:", error);
    return { sentiment: "Unknown", tone: "Unknown" };
  }
};
