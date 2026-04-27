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
async function extractFrames(videoFile: File, frameCount: number = 4): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const frames: string[] = [];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const seekTimeoutMs = 4000;
    const maxDimension = 720;

    video.src = URL.createObjectURL(videoFile);
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.load();

    video.onloadeddata = async () => {
      const duration = video.duration;
      for (let i = 0; i < frameCount; i++) {
        const time = (duration / frameCount) * i;
        await new Promise<void>((res, rej) => {
          const timeoutId = window.setTimeout(() => {
            rej(new Error("Frame extraction timeout while seeking video."));
          }, seekTimeoutMs);
          video.onseeked = () => {
            window.clearTimeout(timeoutId);
            res();
          };
          video.currentTime = time;
        });

        const sourceWidth = video.videoWidth;
        const sourceHeight = video.videoHeight;
        const scale = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight));
        canvas.width = Math.max(1, Math.round(sourceWidth * scale));
        canvas.height = Math.max(1, Math.round(sourceHeight * scale));
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        frames.push(canvas.toDataURL("image/jpeg", 0.55));
      }
      URL.revokeObjectURL(video.src);
      resolve(frames);
    };

    video.onerror = (e) => reject(new Error("Error loading video for frame extraction."));
  });
}

export async function analyzeVideo(videoFile: File): Promise<AnalyzeResponse> {
  const maxVideoSizeMb = 80;
  if (videoFile.size > maxVideoSizeMb * 1024 * 1024) {
    throw new Error(`Video is too large (${Math.round(videoFile.size / 1024 / 1024)}MB). Please upload a file under ${maxVideoSizeMb}MB.`);
  }

  const frames = await extractFrames(videoFile);
  const controller = new AbortController();
  const requestTimeoutMs = 90000;
  const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ frames }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.statusText}`);
    }

    return response.json() as Promise<AnalyzeResponse>;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network request failed. Check deployment status and DASHSCOPE_API_KEY on Vercel, then retry with a 5-15s video.");
    }
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("AI analysis timed out. Please retry with a shorter video (5-15 seconds).");
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
