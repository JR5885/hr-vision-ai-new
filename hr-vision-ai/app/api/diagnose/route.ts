import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const MODEL = "gemini-1.5-flash";
const SYSTEM_PROMPT = "你是一位專業的 HR 戰略顧問，請針對使用者的組織挑戰提供專業、可落地的診斷與行動方案。";

export async function POST(req: Request) {
  let body: { message?: string; domains?: string[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const message = (body.message ?? "").trim();
  if (!message) {
    return new Response("Missing `message`", { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response("Server is missing GEMINI_API_KEY", { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: SYSTEM_PROMPT,
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const result = await model.generateContentStream(
          `請分析以下 HR 議題並提供診斷建議：\n${message}`
        );

        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(encoder.encode(text));
        }

        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
