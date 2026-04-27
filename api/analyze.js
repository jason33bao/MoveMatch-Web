import { BASE_URL, MODEL_ID, COACH_PROMPT, parseResponseToJson } from "../shared/coachConfig.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing DASHSCOPE_API_KEY on server." });
  }

  const { frames } = req.body || {};
  if (!Array.isArray(frames) || frames.length === 0) {
    return res.status(400).json({ error: "No frames provided." });
  }

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: COACH_PROMPT },
              ...frames.map((frame) => ({
                type: "image_url",
                image_url: { url: frame },
              })),
            ],
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      const message = result?.error?.message || response.statusText;
      return res.status(response.status).json({ error: `DashScope API error: ${message}` });
    }

    const content = result?.choices?.[0]?.message?.content;
    if (!content) {
      return res.status(502).json({ error: "Invalid response from model provider." });
    }

    const parsed = parseResponseToJson(content);
    return res.status(200).json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    return res.status(500).json({ error: message });
  }
}
