import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates translated subtitles in SRT format based on a provided transcript or topic.
 */
export const generateSubtitles = async (
  inputContext: string,
  targetLanguage: Language
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      You are an expert subtitle translator and generator.
      
      Task: Create or translate subtitles for a video based on the following input context (which may be a raw transcript, a summary, or a topic description).
      Target Language: ${targetLanguage}
      Output Format: Standard SRT (SubRip Subtitle) file format.
      
      Rules:
      1. If the input is a transcript, translate it accurately to ${targetLanguage} maintaining the timing (approximate the timing if not provided).
      2. If the input is just a topic, generate a REALISTIC, FICTIONAL 1-minute transcript in SRT format about that topic in ${targetLanguage}.
      3. Ensure the SRT format is strictly followed (Index, Timecode --> Timecode, Text, Empty Line).
      4. Do not include any markdown code blocks (like \`\`\`) in the output. Just return the raw SRT text string.
      
      Input Context:
      "${inputContext}"
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.3,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated");
    }

    // Clean up any potential markdown code blocks if the model ignores the instruction
    return text.replace(/^```(srt)?/gm, '').replace(/```$/gm, '').trim();

  } catch (error) {
    console.error("Error generating subtitles:", error);
    throw new Error("Failed to generate subtitles. Please try again.");
  }
};