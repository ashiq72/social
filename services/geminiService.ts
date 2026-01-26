
import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';

export const enhanceDraft = async (draft: string): Promise<string> => {
  if (!draft) return "";
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance this social media post draft to be more engaging and viral, but keep it concise (under 280 chars). Add relevant hashtags if appropriate: "${draft}"`,
    });
    return response.text || draft;
  } catch (error) {
    console.error("Gemini Error:", error);
    return draft;
  }
};

export const analyzePostSentiment = async (content: string): Promise<{ sentiment: string; tone: string }> => {
  const ai = new GoogleGenAI({ apiKey });
  try {
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
    return JSON.parse(response.text.trim());
  } catch (error) {
    return { sentiment: "Unknown", tone: "Unknown" };
  }
};
