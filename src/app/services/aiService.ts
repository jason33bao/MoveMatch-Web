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
  const frames = await extractFrames(videoFile);

  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ frames })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${response.statusText}`);
  }

  return response.json() as Promise<AnalyzeResponse>;
}
