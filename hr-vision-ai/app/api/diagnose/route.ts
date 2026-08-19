export const runtime = "nodejs";

const SYSTEM_PROMPT =
  "你是一位專業的 HR 戰略顧問，請針對使用者的組織挑戰提供專業、可落地的診斷與行動方案。";

// 自動備援模型清單（按優先順序嘗試，確保 100% 呼叫成功）
const CANDIDATE_MODELS = [
  "gemini-2.0-flash",
  "gemini-2.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash-002",
  "gemini-1.5-pro",
];

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

  let lastErrorMessage = "";

  // 依序嘗試可用模型
  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${SYSTEM_PROMPT}\n\n請分析以下 HR 議題並提供診斷建議：\n${message}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "未能取得有效診斷建議。";

        return new Response(replyText, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        });
      }

      lastErrorMessage = await response.text();
    } catch (err: any) {
      lastErrorMessage = err.message;
    }
  }

  return new Response(`Gemini API Error: ${lastErrorMessage}`, {
    status: 500,
  });
}
