// app/api/description/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { productName } = await req.json();

    if (!productName) {
      return Response.json(
        { error: "Falta el nombre del producto" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Genera una descripción atractiva y persuasiva para un producto llamado "${productName}". La descripción debe resaltar las características principales y beneficios del producto en un tono amigable y profesional. Limítate a 100 palabras.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ description: text });
  } catch (error) {
    console.error("Gemini error:", error);
    return Response.json(
      { error: "Fallo interno del servidor" },
      { status: 500 }
    );
  }
}

export function GET() {
  return Response.json({ error: "Método no permitido" }, { status: 405 });
}
