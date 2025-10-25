import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export const generateDescriptionForProduct = async (productName: string) => {
    const prompt = `Genera una descripción atractiva y persuasiva para un producto llamado "${productName}". La descripción debe resaltar las características principales y beneficios del producto en un tono amigable y profesional. Limítate a 100 palabras.`;
    return await generateText(prompt);
}

export const generateText = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // o el modelo que quieras
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Fallo interno del servidor";
  }
};