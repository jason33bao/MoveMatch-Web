const DASHSCOPE_API_KEY = import.meta.env.VITE_DASHSCOPE_API_KEY;
const BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const MODEL_ID = "qwen3-vl-plus";

const COACH_PROMPT = `
You are a demanding but professional tennis coach. You will see a series of frames extracted from a sports video.
Analyze these frames and provide a detailed analysis in JSON format. The output MUST strictly follow this JSON structure:
{
  "summary": { "score": number, "level": "string", "duration": "string" },
  "motionAssessment": {
    "weights": { "swing": 0.25, "contactPoint": 0.25, "recovery": 0.20, "footworkTiming": 0.20, "consistency": 0.10 },
    "subscores": { "swing": number, "contactPoint": number, "recovery": number, "footworkTiming": number, "consistency": number },
    "weightedScore": number,
    "ntrpLevel": "string",
    "videoReadiness": "string"
  },
  "shotAnalysis": {
    "serve": { "successRate": number, "attempts": number },
    "forehand": { "successRate": number, "attempts": number },
    "backhand": { "successRate": number, "attempts": number }
  },
  "courtMap": [{ "x": number, "y": number, "result": "in" | "out" }],
  "technicalInsights": [{ "title": "string", "description": "string", "severity": "high" | "medium" | "low" }],
  "physicalMetrics": { "power": number, "speed": number, "endurance": number, "agility": number, "stability": number },
  "stats": { "winners": number, "unforcedErrors": number, "avgBallSpeed": number, "winRate": number, "firstServeInRate": number },
  "trainingPlan": [{ "day": "string", "focus": "string", "durationMin": number, "intensity": "string", "courtTraining": "string", "homeTraining": "string", "restNote": "string" }]
}
Scoring rubric for "motionAssessment.subscores" (0-100 each):
- swing: swing chain quality (backswing, acceleration, follow-through)
- contactPoint: contact point quality and racket-face control
- recovery: post-hit balance and return-to-ready
- footworkTiming: movement efficiency and timing before impact
- consistency: repeatability across visible strokes
Compute "weightedScore" as:
0.25*swing + 0.25*contactPoint + 0.20*recovery + 0.20*footworkTiming + 0.10*consistency
Set "summary.score" equal to rounded "weightedScore".
Map score ranges to level labels:
- 0-20 Action Not Formed (NTRP 1.0-1.5)
- 21-35 Initial Foundation (NTRP 2.0)
- 36-50 Developing Form (NTRP 2.5)
- 51-65 Intermediate Recreational (NTRP 3.0)
- 66-75 Strong Club Player (NTRP 3.5)
- 76-84 Advanced Club Player (NTRP 4.0)
- 85-91 Competitive Advanced (NTRP 4.5-5.0)
- 92-96 Elite (NTRP 5.5-6.0)
- 97-100 Professional (NTRP 6.5-7.0)
Set "motionAssessment.videoReadiness" to one short sentence on short-video reliability (e.g., "High confidence: 6 clear contacts captured.").
Please return the JSON object directly.
`;

export interface AnalyzeResponse {
  summary: {
    score: number;
    level: string;
    duration: string;
  };
  motionAssessment?: {
    weights: {
      swing: number;
      contactPoint: number;
      recovery: number;
      footworkTiming: number;
      consistency: number;
    };
    subscores: {
      swing: number;
      contactPoint: number;
      recovery: number;
      footworkTiming: number;
      consistency: number;
    };
    weightedScore: number;
    ntrpLevel: string;
    videoReadiness: string;
  };
  shotAnalysis: {
    serve: { successRate: number; attempts: number };
    forehand: { successRate: number; attempts: number };
    backhand: { successRate: number; attempts: number };
  };
  courtMap: { x: number; y: number; result: string }[];
  technicalInsights: { title: string; description: string; severity: string }[];
  physicalMetrics: {
    power: number;
    speed: number;
    endurance: number;
    agility: number;
    stability: number;
  };
  stats: {
    winners: number;
    unforcedErrors: number;
    avgBallSpeed: number;
    winRate: number;
    firstServeInRate: number;
  };
  trainingPlan: {
    day: string;
    focus: string;
    durationMin: number;
    intensity: string;
    courtTraining: string;
    homeTraining: string;
    restNote: string;
  }[];
}

/**
 * Extracts frames from a video file to send to the vision model.
 */
async function extractFrames(videoFile: File, frameCount: number = 8): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const frames: string[] = [];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    video.src = URL.createObjectURL(videoFile);
    video.load();

    video.onloadeddata = async () => {
      const duration = video.duration;
      for (let i = 0; i < frameCount; i++) {
        const time = (duration / frameCount) * i;
        video.currentTime = time;
        await new Promise((res) => {
          video.onseeked = res;
        });

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        frames.push(canvas.toDataURL("image/jpeg", 0.7));
      }
      URL.revokeObjectURL(video.src);
      resolve(frames);
    };

    video.onerror = (e) => reject(new Error("Error loading video for frame extraction."));
  });
}

export async function analyzeVideo(videoFile: File): Promise<AnalyzeResponse> {
  if (!DASHSCOPE_API_KEY || DASHSCOPE_API_KEY === "YOUR_DASHSCOPE_API_KEY_HERE") {
    throw new Error("Missing or invalid VITE_DASHSCOPE_API_KEY in environment variables.");
  }

  const frames = await extractFrames(videoFile);

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DASHSCOPE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL_ID,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: COACH_PROMPT },
            ...frames.map(f => ({
              type: "image_url",
              image_url: { url: f }
            }))
          ]
        }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
  }

  const result = await response.json();
  const text = result.choices[0].message.content;
  
  try {
    return JSON.parse(text) as AnalyzeResponse;
  } catch (e) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Failed to parse AI response as JSON");
    return JSON.parse(jsonMatch[0]) as AnalyzeResponse;
  }
}
