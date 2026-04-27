import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload,
  Video,
  Zap,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Play,
  RotateCcw,
  ChevronRight,
  Award,
  Target,
  Loader,
  Star,
  Brain,
  Flame,
  Camera,
  ArrowUpRight,
  Watch,
  Shield,
  Package,
  Scan,
  Timer,
  MapPin,
  Users,
  X,
  ChevronDown,
  Dumbbell,
  HeartPulse,
  Cpu,
  Crosshair,
  Layers,
  Activity,
  Gauge,
  Trophy,
  Info,
  Lightbulb,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { analyzeVideo, type AnalyzeResponse } from "../services/aiService";

type AnalysisState = "idle" | "uploading" | "analyzing" | "done";
type UploadMethod = "camera" | "album" | null;

/* ─── Mock data ─── */
const mockAnalysisResult = {
  overallScore: 78,
  scoreLabel: "Rally Ready",
  sport: "Tennis",
  technique: "Forehand Swing",
  sessionDate: "Apr 9, 2026",
  comparisonToLast: "+5% Forehand Topspin",
  shotConsistency: 73,
  positiveReinforcement:
    "Compared to last week, your contact point is 15% further in front — that's a massive improvement!",

  // Biomechanical analysis
  biomechanics: [
    {
      joint: "Elbow Angle",
      finding: "155° (too straight)",
      tip: "Maintain a 90-120° angle for better power transfer",
      status: "warning",
    },
    {
      joint: "Knee Flexion",
      finding: "Knees locked on impact",
      tip: "Load the back leg to drive forward",
      status: "warning",
    },
    {
      joint: "Swing Path",
      finding: "15° upward trajectory",
      tip: "Ideal range for topspin: 20-30°. Brush up the back of the ball more",
      status: "info",
    },
    {
      joint: "Hip Rotation",
      finding: "92° rotation (excellent)",
      tip: "Perfect coil and release pattern",
      status: "success",
    },
  ],

  // Shot placement heatmap data
  shotPlacement: [
    { x: 75, y: 15, zone: "deep-corner", quality: "winner" },
    { x: 68, y: 22, zone: "deep-corner", quality: "winner" },
    { x: 50, y: 45, zone: "center-baseline", quality: "rally" },
    { x: 52, y: 42, zone: "center-baseline", quality: "rally" },
    { x: 48, y: 48, zone: "center-baseline", quality: "rally" },
    { x: 30, y: 65, zone: "service-box", quality: "short" },
    { x: 70, y: 12, zone: "deep-corner", quality: "winner" },
    { x: 55, y: 40, zone: "center-baseline", quality: "rally" },
    { x: 65, y: 25, zone: "deep-corner", quality: "winner" },
    { x: 45, y: 50, zone: "center-baseline", quality: "rally" },
  ],
  avgBounceDepth: 2.1,
  targetDepth: 1.5,

  // Tactical suggestions
  tacticalPattern: "80% Cross-Court",
  suggestedDrill: "Down-the-Line Challenge",
  footworkEfficiency: {
    actual: "4.2m per shot",
    efficient: "3.1m per shot",
    extraSteps: 4,
  },

  // Skill radar metrics
  skillRadar: [
    { skill: "Power", score: 74, max: 100 },
    { skill: "Consistency", score: 73, max: 100 },
    { skill: "Spin", score: 68, max: 100 },
    { skill: "Net Clearance", score: 81, max: 100 },
    { skill: "Footwork", score: 65, max: 100 },
  ],

  // Milestone progress
  currentBadge: "Forehand Foundation: Silver",
  nextBadge: "Topspin Titan",
  sessionsToNextBadge: 5,
  targetConsistency: 80,

  // Pro comparison
  proSimilarity: 72,
  proPlayerName: "Carlos Alcaraz",
  estimatedLevel: "USTA 3.5",

  // Next session prescription
  nextSession: {
    focus: "Crosscourt Consistency",
    drill: "60-Second Crosscourt Rally",
    instruction: "Set timer for 60 seconds. Count how many shots you can hit past the service line without missing.",
    yourTarget: 22,
    lastScore: 18,
  },

  strengths: [
    "Excellent hip rotation during follow-through",
    "Consistent racket head speed",
    "Good ball toss positioning",
  ],
  improvements: [
    "Elbow drops too early — keep it up through contact",
    "Plant back foot more firmly before swinging",
    "Wrist snap timing is slightly late",
  ],
  metrics: [
    { label: "Form", score: 82, color: "#10B981" },
    { label: "Power", score: 74, color: "#14B8A6" },
    { label: "Consistency", score: 71, color: "#F59E0B" },
    { label: "Footwork", score: 65, color: "#3B82F6" },
    { label: "Timing", score: 80, color: "#06B6D4" },
  ],
  recommendations: [
    {
      type: "Drill",
      title: "Wall Rebound Drill",
      description: "50 forehand swings against a wall to build muscle memory",
      duration: "15 min",
      difficulty: "Beginner",
      tutorialTitle: "3-min Fixed Follow-Through Drill",
      tutorialDuration: "3 min",
    },
    {
      type: "Video",
      title: "Elbow Positioning Guide",
      description: "Watch professional players' elbow path during contact",
      duration: "8 min",
      difficulty: "All Levels",
      tutorialTitle: "Pro Elbow Mechanics Breakdown",
      tutorialDuration: "5 min",
    },
    {
      type: "Session",
      title: "Book a Coach",
      description: "30-min session with a certified tennis coach",
      duration: "30 min",
      difficulty: "Personalized",
      tutorialTitle: null,
      tutorialDuration: null,
    },
  ],
  nearbyCoaches: [
    { name: "Sarah M.", rating: 4.9, distance: "0.8 km", specialty: "Forehand & Serve", available: true },
    { name: "James T.", rating: 4.7, distance: "1.2 km", specialty: "Match Strategy", available: true },
    { name: "Liu W.", rating: 4.8, distance: "2.0 km", specialty: "Footwork & Movement", available: false },
  ],
  progressHistory: [
    { date: "Wk 1", score: 58 },
    { date: "Wk 2", score: 63 },
    { date: "Wk 3", score: 70 },
    { date: "Wk 4", score: 78 },
  ],
};

const recentAnalyses = [
  { sport: "Tennis", technique: "Forehand", score: 78, date: "2 days ago", trend: "+5", emoji: "🎾" },
  { sport: "Basketball", technique: "Free Throw", score: 85, date: "1 week ago", trend: "+12", emoji: "🏀" },
  { sport: "Swimming", technique: "Freestyle", score: 71, date: "2 weeks ago", trend: "+3", emoji: "🏊" },
];

const sports = ["Golf", "Tennis", "Baseball", "Billiards", "Soccer", "Basketball"];

const sportEquipmentSuggestions: Record<string, string[]> = {
  Tennis: ["Wilson Blade V9", "Babolat Pure Aero", "Head Speed MP"],
};

/* AI analysis rotating messages */
const aiMessages = [
  { icon: Crosshair, text: "AI is extracting skeletal nodes…" },
  { icon: Layers, text: "Reconstructing ball trajectory…" },
  { icon: Cpu, text: "Computing swing velocity vectors…" },
  { icon: HeartPulse, text: "Correlating biometric data…" },
  { icon: Brain, text: "Identifying root technique issues…" },
  { icon: TrendingUp, text: "Building longitudinal performance report…" },
];

const scoreColor = (score: number) =>
  score >= 80 ? "#10B981" : score >= 65 ? "#F59E0B" : "#EF4444";

const scoreBg = (score: number) =>
  score >= 80 ? "bg-emerald-50 text-emerald-600" : score >= 65 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-500";

/* ─────────────────────────── Component ─────────────────────────── */
export function AICoaching() {
  const [state, setState] = useState<AnalysisState>("idle");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState("Tennis");
  const [progress, setProgress] = useState(0);
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Onboarding
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState<"health" | "done">("health");
  const [healthAuthorized, setHealthAuthorized] = useState<boolean | null>(null);

  // Equipment
  const [equipmentInput, setEquipmentInput] = useState("");
  const [registeredEquipment, setRegisteredEquipment] = useState<string | null>(null);
  const [showEquipmentSuggestions, setShowEquipmentSuggestions] = useState(false);

  // AR camera
  const [arCountdown, setArCountdown] = useState<number | null>(null);
  const [arBodyDetected, setArBodyDetected] = useState(false);

  // Analysis message rotation
  const [aiMsgIndex, setAiMsgIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Rotate AI messages while analysing */
  useEffect(() => {
    if (state !== "analyzing") return;
    const id = setInterval(() => {
      setAiMsgIndex((i) => (i + 1) % aiMessages.length);
    }, 1800);
    return () => clearInterval(id);
  }, [state]);

  /* AR body-detection simulation */
  useEffect(() => {
    if (uploadMethod !== "camera") return;
    const t = setTimeout(() => setArBodyDetected(true), 2200);
    return () => clearTimeout(t);
  }, [uploadMethod]);

  useEffect(() => {
    if (!arBodyDetected) return;
    let count = 3;
    setArCountdown(count);
    const id = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(id);
        setArCountdown(null);
        setArBodyDetected(false);
        setUploadMethod(null);
        setUploadedFile("camera_capture.mp4");
        // In a real app, camera capture would provide a File object here
        // For this demo/merge, we'll suggest using a local album or mock the capture
        setState("idle");
        alert("Camera capture currently simulation. Please use Local Album to analyze real video.");
      } else {
        setArCountdown(count);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [arBodyDetected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setUploadMethod(null);
      runRealAnalysis(file);
    }
  };

  const runRealAnalysis = async (file: File) => {
    setErrorMessage(null);
    setState("uploading");
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) {
          clearInterval(interval);
          return 95;
        }
        return p + 5;
      });
    }, 100);

    try {
      // In a few seconds, switch to analyzing state to show AI rotation
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setState("analyzing");
      }, 1500);

      const result = await analyzeVideo(file);
      setAnalysisResult(result);
      setState("done");
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Analysis failed. Please try again.");
      setState("idle");
    }
  };

  const startAnalysis = () => {
    // This was the old mock function, now handled by runRealAnalysis
    if (fileInputRef.current?.files?.[0]) {
      runRealAnalysis(fileInputRef.current.files[0]);
    } else {
      // Demo case
      setErrorMessage("Please upload a real video for analysis.");
    }
  };

  const reset = () => {
    setState("idle");
    setUploadedFile(null);
    setProgress(0);
    setUploadMethod(null);
    setArBodyDetected(false);
    setArCountdown(null);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const displayResult = useMemo(() => {
    if (!analysisResult) return mockAnalysisResult;
    return {
      ...mockAnalysisResult,
      overallScore: analysisResult.summary.score,
      scoreLabel: analysisResult.summary.level,
      sessionDate: "Just now",
      shotConsistency: Math.round(
        (analysisResult.shotAnalysis.forehand.successRate +
          analysisResult.shotAnalysis.backhand.successRate +
          analysisResult.shotAnalysis.serve.successRate) /
        3
      ),
      positiveReinforcement:
        analysisResult.technicalInsights[0]?.description ||
        mockAnalysisResult.positiveReinforcement,
      biomechanics: analysisResult.technicalInsights.map((insight) => ({
        joint: insight.title,
        finding: insight.description.substring(0, 30) + (insight.description.length > 30 ? "..." : ""),
        tip: insight.description,
        status: insight.severity === "high" ? ("warning" as const) : ("success" as const),
      })),
      shotPlacement: analysisResult.courtMap.map((pt) => ({
        x: pt.x,
        y: pt.y,
        zone: pt.result === "in" ? "rally" : "out",
        quality: pt.result === "in" ? ("rally" as const) : ("short" as const),
      })),
      skillRadar: [
        { skill: "Power", score: analysisResult.physicalMetrics.power, max: 100 },
        {
          skill: "Consistency",
          score: Math.round(
            (analysisResult.shotAnalysis.forehand.successRate +
              analysisResult.shotAnalysis.backhand.successRate) /
            2
          ),
          max: 100,
        },
        { skill: "Spin", score: analysisResult.physicalMetrics.speed, max: 100 }, // using speed for spin in demo
        { skill: "Net Clearance", score: analysisResult.physicalMetrics.stability, max: 100 },
        { skill: "Footwork", score: analysisResult.physicalMetrics.agility, max: 100 },
      ],
      stats: analysisResult.stats,
      trainingPlan: analysisResult.trainingPlan,
    };
  }, [analysisResult]);

  const handleEquipmentRegister = (value?: string) => {
    const eq = value ?? equipmentInput.trim();
    if (eq) {
      setRegisteredEquipment(eq);
      setEquipmentInput("");
      setShowEquipmentSuggestions(false);
    }
  };

  const AiMsgIcon = aiMessages[aiMsgIndex].icon;

  /* ───────────── Render ───────────── */
  return (
    <div className="w-full pb-24 md:pb-8">

      {/* ── Onboarding Modal ── */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            key="onboarding-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 relative overflow-hidden"
            >
              {/* decorative gradient */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-teal-100 rounded-full blur-2xl pointer-events-none" />

              {onboardingStep === "health" && (
                <>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-teal-200">
                      <Watch className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-gray-900 mb-1" style={{ fontWeight: 800, fontSize: "1.15rem" }}>
                      Connect Your Smartwatch
                    </h2>
                    <p className="text-gray-500 mb-4" style={{ fontSize: "0.82rem" }}>
                      To unlock deeper AI coaching, authorize your health & sports data.
                    </p>

                    {/* Value proposition */}
                    <div className="bg-teal-50 border border-teal-100 rounded-2xl p-3.5 mb-5">
                      <div className="flex items-start gap-2.5">
                        <HeartPulse className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <p className="text-teal-700" style={{ fontSize: "0.78rem" }}>
                          <span style={{ fontWeight: 700 }}>Why this matters:</span> By authorizing heart rate data, the AI can analyze the relationship between your physical exertion and shot quality during long rallies — giving you elite-level insights.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-5">
                      <Shield className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-400" style={{ fontSize: "0.7rem" }}>
                        Data is processed locally and never sold to third parties.
                      </span>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => { setHealthAuthorized(true); setShowOnboarding(false); }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-2xl shadow-md shadow-teal-100 hover:shadow-lg transition-all"
                        style={{ fontWeight: 700, fontSize: "0.88rem" }}
                      >
                        <Watch className="w-4 h-4" />
                        Authorize Health Data
                      </button>
                      <button
                        onClick={() => { setHealthAuthorized(false); setShowOnboarding(false); }}
                        className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 py-2.5 rounded-2xl transition-colors"
                        style={{ fontWeight: 600, fontSize: "0.82rem" }}
                      >
                        Skip for Now
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 px-4 md:px-8 pt-6 pb-10 md:pt-8 md:pb-12">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-cyan-100" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>AI-Powered Analysis</span>
          </div>

          <p className="text-cyan-100" style={{ fontSize: "0.875rem", maxWidth: "400px" }}></p>

          {/* Health data badge */}
          {healthAuthorized && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1">
              <HeartPulse className="w-3 h-3 text-pink-300" />
              <span className="text-white" style={{ fontSize: "0.7rem", fontWeight: 600 }}>Biometric data connected</span>
            </div>
          )}

          {/* Quick stats */}
          <div className="flex gap-4 mt-5">
            {[
              { label: "Analyses Done", value: "3" },
              { label: "Avg Score", value: "78" },
              { label: "Improvement", value: "+20pts" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur border border-white/10 rounded-xl px-3 py-2 flex-1">
                <p className="text-cyan-100" style={{ fontSize: "0.68rem" }}>{s.label}</p>
                <p className="text-white" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="max-w-5xl mx-auto px-3 md:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">

          {/* ── Main Panel ── */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="wait">

              {/* ────── IDLE ────── */}
              {state === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Step 1 — Sport & Equipment */}
                    <div className="px-4 md:px-5 pt-5 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-teal-700" style={{ fontSize: "0.65rem", fontWeight: 800 }}>1</span>
                        </div>
                        <p className="text-gray-700" style={{ fontSize: "0.78rem", fontWeight: 700 }}>Context & Equipment</p>
                      </div>

                      {/* Sport pills */}
                      <p className="text-gray-400 mb-2" style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        Select Sport
                      </p>
                      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-4">
                        {sports.map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              setSelectedSport(s);
                              setRegisteredEquipment(null);
                              setEquipmentInput("");
                              setShowEquipmentSuggestions(false);
                            }}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-lg border transition-all ${selectedSport === s
                                ? "bg-teal-50 border-teal-200 text-teal-700"
                                : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                              }`}
                            style={{ fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      {/* Equipment entry - only for Tennis */}
                      {selectedSport === "Tennis" && (
                        <>
                          <p className="text-gray-400 mb-2" style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            Register Your Gear <span className="normal-case text-gray-300">(optional)</span>
                          </p>

                          {registeredEquipment ? (
                            <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2.5">
                              <Package className="w-4 h-4 text-teal-500 flex-shrink-0" />
                              <span className="text-teal-700 flex-1" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{registeredEquipment}</span>
                              <button
                                onClick={() => setRegisteredEquipment(null)}
                                className="text-teal-300 hover:text-teal-500 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="flex gap-2">
                                <div className="flex-1 relative">
                                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                  <input
                                    type="text"
                                    value={equipmentInput}
                                    onChange={(e) => { setEquipmentInput(e.target.value); setShowEquipmentSuggestions(true); }}
                                    onFocus={() => setShowEquipmentSuggestions(true)}
                                    placeholder={`e.g. ${sportEquipmentSuggestions[selectedSport]?.[0] ?? "Your gear"}`}
                                    className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 outline-none focus:border-teal-300 focus:bg-white transition-colors"
                                    style={{ fontSize: "0.8rem" }}
                                  />
                                </div>
                                <button
                                  onClick={() => handleEquipmentRegister()}
                                  disabled={!equipmentInput.trim()}
                                  className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white rounded-xl transition-colors flex-shrink-0"
                                  style={{ fontSize: "0.78rem", fontWeight: 600 }}
                                >
                                  Add
                                </button>
                              </div>

                              {/* Suggestions dropdown */}
                              <AnimatePresence>
                                {showEquipmentSuggestions && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                                  >
                                    {(sportEquipmentSuggestions[selectedSport] ?? [])
                                      .filter((s) => s.toLowerCase().includes(equipmentInput.toLowerCase()))
                                      .map((suggestion) => (
                                        <button
                                          key={suggestion}
                                          onMouseDown={() => handleEquipmentRegister(suggestion)}
                                          className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-teal-50 text-left transition-colors"
                                        >
                                          <Package className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                                          <span className="text-gray-700" style={{ fontSize: "0.78rem" }}>{suggestion}</span>
                                        </button>
                                      ))}
                                    <button
                                      onMouseDown={() => setShowEquipmentSuggestions(false)}
                                      className="w-full flex items-center gap-2 px-3 py-2 border-t border-gray-100 hover:bg-gray-50 text-left transition-colors"
                                    >
                                      <span className="text-gray-400" style={{ fontSize: "0.72rem" }}>Close suggestions</span>
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {registeredEquipment && (
                            <p className="text-teal-600 mt-1.5" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                              ✓ AI will account for your {registeredEquipment} hardware variables
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {/* Step 2 — Upload method */}
                    <div className="p-4 md:p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-teal-700" style={{ fontSize: "0.65rem", fontWeight: 800 }}>2</span>
                        </div>
                        <p className="text-gray-700" style={{ fontSize: "0.78rem", fontWeight: 700 }}>Upload Training Video</p>
                      </div>

                      {/* Upload method toggle */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <button
                          onClick={() => setUploadMethod("camera")}
                          className={`flex flex-col items-center gap-1.5 py-3.5 rounded-xl border-2 transition-all ${uploadMethod === "camera"
                              ? "bg-teal-50 border-teal-300"
                              : "bg-gray-50 border-gray-200 hover:border-teal-200"
                            }`}
                        >
                          <Camera className={`w-5 h-5 ${uploadMethod === "camera" ? "text-teal-600" : "text-gray-400"}`} />
                          <span className={`${uploadMethod === "camera" ? "text-teal-700" : "text-gray-600"}`} style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                            In-App Camera
                          </span>
                          <span className="text-gray-400" style={{ fontSize: "0.65rem" }}>AR-guided capture</span>
                        </button>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center gap-1.5 py-3.5 rounded-xl border-2 bg-gray-50 border-gray-200 hover:border-teal-200 transition-all"
                        >
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600" style={{ fontSize: "0.75rem", fontWeight: 700 }}>Local Album</span>
                          <span className="text-gray-400" style={{ fontSize: "0.65rem" }}>MP4, MOV, AVI</span>
                        </button>
                      </div>

                      {/* AR Camera view */}
                      <AnimatePresence>
                        {uploadMethod === "camera" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="relative bg-gray-900 rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                              {/* simulated camera feed */}
                              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-950" />

                              {/* AR skeleton overlay */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                  className={`border-2 rounded-2xl transition-all duration-700 ${arBodyDetected ? "border-emerald-500 shadow-lg shadow-emerald-500/30" : "border-dashed border-teal-400/60"
                                    }`}
                                  style={{ width: "38%", height: "75%", position: "relative" }}
                                >
                                  {/* Skeleton joints */}
                                  {arBodyDetected && (
                                    <>
                                      {[
                                        { top: "8%", left: "42%" }, // head
                                        { top: "22%", left: "35%" }, // L shoulder
                                        { top: "22%", left: "58%" }, // R shoulder
                                        { top: "42%", left: "38%" }, // L hip
                                        { top: "42%", left: "55%" }, // R hip
                                        { top: "62%", left: "36%" }, // L knee
                                        { top: "62%", left: "57%" }, // R knee
                                        { top: "80%", left: "34%" }, // L ankle
                                        { top: "80%", left: "59%" }, // R ankle
                                      ].map((pos, idx) => (
                                        <div
                                          key={idx}
                                          className="absolute w-2 h-2 rounded-full bg-emerald-500 shadow shadow-emerald-500/50"
                                          style={{ top: pos.top, left: pos.left, transform: "translate(-50%,-50%)" }}
                                        />
                                      ))}
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Status badge */}
                              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${arBodyDetected ? "bg-emerald-500 animate-pulse" : "bg-amber-400 animate-pulse"}`} />
                                <span className="text-white" style={{ fontSize: "0.68rem", fontWeight: 600 }}>
                                  {arBodyDetected ? "Body Detected" : "Align within frame…"}
                                </span>
                              </div>

                              {/* AR scanning line */}
                              {!arBodyDetected && (
                                <motion.div
                                  className="absolute inset-x-0 h-0.5 bg-teal-400/60"
                                  animate={{ top: ["15%", "85%", "15%"] }}
                                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                />
                              )}

                              {/* Countdown overlay */}
                              {arCountdown !== null && (
                                <motion.div
                                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  <motion.span
                                    key={arCountdown}
                                    initial={{ scale: 1.6, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-white"
                                    style={{ fontSize: "5rem", fontWeight: 900 }}
                                  >
                                    {arCountdown}
                                  </motion.span>
                                </motion.div>
                              )}

                              {/* Hint bar */}
                              <div className="absolute bottom-3 inset-x-3">
                                <div className="bg-black/50 backdrop-blur rounded-xl px-3 py-2 flex items-center gap-2">
                                  <Scan className="w-3.5 h-3.5 text-teal-300 flex-shrink-0" />
                                  <p className="text-gray-200" style={{ fontSize: "0.68rem" }}>
                                    {arBodyDetected
                                      ? "Full body in frame — auto-recording in…"
                                      : "Stand ~2m away · ensure full body is visible · good lighting"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => setUploadMethod(null)}
                              className="mt-2 w-full flex items-center justify-center gap-1.5 text-gray-400 hover:text-gray-600 py-1.5 transition-colors"
                              style={{ fontSize: "0.75rem" }}
                            >
                              <X className="w-3.5 h-3.5" />
                              Cancel Camera
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Drop zone (shown when no method selected) */}
                      {!uploadMethod && (
                        <>

                          <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                          {errorMessage && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5"
                            >
                              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <p className="text-red-700 font-medium" style={{ fontSize: "0.78rem" }}>{errorMessage}</p>
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ────── LOADING ────── */}
              {(state === "uploading" || state === "analyzing") && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center"
                >
                  {/* spinner */}
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <div className="w-20 h-20 rounded-full border-4 border-gray-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {state === "uploading"
                        ? <Upload className="w-7 h-7 text-teal-500" />
                        : <AiMsgIcon className="w-7 h-7 text-teal-500" />}
                    </div>
                  </div>

                  <h3 className="text-gray-800 mb-1.5" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    {state === "uploading" ? "Uploading Video…" : "AI Analysing Technique…"}
                  </h3>

                  {/* Rotating AI message */}
                  {state === "analyzing" && (
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={aiMsgIndex}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="text-teal-600 mb-5"
                        style={{ fontSize: "0.875rem", fontWeight: 600 }}
                      >
                        {aiMessages[aiMsgIndex].text}
                      </motion.p>
                    </AnimatePresence>
                  )}

                  {state === "uploading" && (
                    <p className="text-gray-500 mb-5" style={{ fontSize: "0.875rem" }}>
                      {Math.min(progress, 100)}% uploaded
                    </p>
                  )}

                  {state === "uploading" && (
                    <div className="bg-gray-100 rounded-full h-2 max-w-xs mx-auto">
                      <div
                        className="bg-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {state === "analyzing" && (
                    <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                      {aiMessages.map((msg, i) => {
                        const Icon = msg.icon;
                        const done = i < aiMsgIndex;
                        const active = i === aiMsgIndex;
                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all ${done ? "bg-emerald-50" : active ? "bg-teal-50" : "bg-gray-50"
                              }`}
                          >
                            {done
                              ? <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                              : active
                                ? <Loader className="w-3 h-3 animate-spin text-teal-500 flex-shrink-0" />
                                : <Icon className="w-3 h-3 text-gray-300 flex-shrink-0" />}
                            <span
                              className={done ? "text-emerald-600" : active ? "text-teal-700" : "text-gray-400"}
                              style={{ fontSize: "0.62rem", fontWeight: 500 }}
                            >
                              {msg.text.replace("AI is ", "").replace("…", "")}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ────── RESULTS ────── */}
              {state === "done" && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* ══════════ 1. EXECUTIVE SUMMARY ══════════ */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.2rem" }}>Session Summary</h2>
                        <p className="text-gray-400" style={{ fontSize: "0.75rem", fontWeight: 500 }}>Objective assessment of your latest performance</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Overall Score */}
                      <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <svg className="w-16 h-16 -rotate-90">
                            <circle cx="32" cy="32" r="26" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                            <motion.circle
                              cx="32" cy="32" r="26" fill="none"
                              stroke={scoreColor(displayResult.overallScore)}
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 26}`}
                              initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - displayResult.overallScore / 100) }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: scoreColor(displayResult.overallScore) }}>
                              {displayResult.overallScore}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500" style={{ fontSize: "0.7rem", fontWeight: 600 }}>OVERALL SCORE</p>
                          <p className="text-gray-900 font-bold" style={{ fontSize: "1rem" }}>{displayResult.scoreLabel}</p>
                        </div>
                      </div>

                      {/* Level */}
                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-gray-500" style={{ fontSize: "0.7rem", fontWeight: 600 }}>SKILL LEVEL</p>
                        <p className="text-gray-900 font-bold text-xl mt-1">{displayResult.estimatedLevel}</p>
                        <p className="text-gray-400" style={{ fontSize: "0.68rem" }}>{displayResult.sport} Groundstrokes</p>
                      </div>

                      {/* Duration */}
                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-gray-500" style={{ fontSize: "0.7rem", fontWeight: 600 }}>FOOTAGE DURATION</p>
                        <p className="text-gray-900 font-bold text-xl mt-1">{analysisResult?.summary.duration || "0:00"}</p>
                        <p className="text-gray-400" style={{ fontSize: "0.68rem" }}>Analyzed {displayResult.sessionDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* ══════════ 2. SHOT ANALYSIS ══════════ */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-teal-600" />
                      <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Shot-by-Shot Performance</h3>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: "Serve", value: analysisResult?.shotAnalysis.serve },
                        { label: "Forehand", value: analysisResult?.shotAnalysis.forehand },
                        { label: "Backhand", value: analysisResult?.shotAnalysis.backhand },
                      ].map((shot) => (
                        <div key={shot.label}>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-gray-700 font-bold" style={{ fontSize: "0.85rem" }}>{shot.label}</span>
                            <span className="text-teal-600 font-bold" style={{ fontSize: "0.85rem" }}>
                              {shot.value?.successRate || 0}% <span className="text-gray-400 font-medium ml-1">({shot.value?.attempts || 0} shots)</span>
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${shot.value?.successRate || 0}%` }}
                              className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ══════════ 3. TECHNICAL INSIGHTS ══════════ */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Technical Insights</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {analysisResult?.technicalInsights.map((insight, i) => (
                        <motion.div
                          key={i}
                          className={`p-4 rounded-2xl border ${insight.severity === "high" ? "bg-amber-50 border-amber-100" : "bg-blue-50 border-blue-100"
                            }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {insight.severity === "high" ? (
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                            ) : (
                              <Info className="w-4 h-4 text-blue-600" />
                            )}
                            <p className={`font-bold ${insight.severity === "high" ? "text-amber-900" : "text-blue-900"}`} style={{ fontSize: "0.85rem" }}>
                              {insight.title}
                            </p>
                          </div>
                          <p className={insight.severity === "high" ? "text-amber-700" : "text-blue-700"} style={{ fontSize: "0.78rem" }}>
                            {insight.description}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${insight.severity === "high" ? "bg-amber-200 text-amber-800" : "bg-blue-200 text-blue-800"
                              }`}>
                              {insight.severity} priority
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* ══════════ 4. SHOT PLACEMENT ══════════ */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Shot Placement Visual</h3>
                      </div>
                    </div>

                    <div className="relative aspect-[4/3] bg-emerald-700 rounded-2xl border-4 border-emerald-800 shadow-inner overflow-hidden p-6">
                      <div className="absolute inset-x-6 inset-y-6 border-2 border-white/40" />
                      <div className="absolute left-1/2 top-6 bottom-6 w-0.5 bg-white/40" />
                      <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-white/40" />

                      {/* Points */}
                      {analysisResult?.courtMap.map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`absolute w-3 h-3 rounded-full shadow-lg border border-white/50 -translate-x-1/2 -translate-y-1/2 ${point.result === "in" ? "bg-lime-400" : "bg-orange-500"
                            }`}
                          style={{ left: `${point.x}%`, top: `${point.y}%` }}
                        />
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-lime-400" />
                        <span className="text-gray-500 text-xs font-semibold">IN ({analysisResult?.courtMap.filter(p => p.result === "in").length})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-gray-500 text-xs font-semibold">OUT ({analysisResult?.courtMap.filter(p => p.result === "out").length})</span>
                      </div>
                    </div>
                  </div>

                  {/* ══════════ 5. SKILL PERFORMANCE ══════════ */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-sky-600" />
                      <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Skill Performance</h3>
                    </div>

                    <div className="flex justify-center py-4">
                      <svg viewBox="0 0 200 200" className="w-64 h-64">
                        <polygon points="100,20 176,76 147,165 53,165 24,76" fill="none" stroke="#E5E7EB" strokeWidth="1" />
                        <polygon points="100,40 157,82 135,149 65,149 43,82" fill="none" stroke="#E5E7EB" strokeWidth="1" />
                        <polygon points="100,60 138,88 123,133 77,133 62,88" fill="none" stroke="#E5E7EB" strokeWidth="1" />
                        <polygon points="100,80 119,94 111,116 89,116 81,94" fill="none" stroke="#E5E7EB" strokeWidth="1" />

                        {displayResult.skillRadar.map((skill, i) => {
                          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                          const radius = (skill.score / 100) * 80;
                          return (
                            <line key={i} x1="100" y1="100" x2={100 + Math.cos(angle) * 80} y2={100 + Math.sin(angle) * 80} stroke="#E5E7EB" strokeWidth="1" />
                          );
                        })}

                        <motion.polygon
                          points={displayResult.skillRadar.map((skill, i) => {
                            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                            const radius = (skill.score / 100) * 80;
                            return `${100 + Math.cos(angle) * radius},${100 + Math.sin(angle) * radius}`;
                          }).join(" ")}
                          fill="rgba(20, 184, 166, 0.2)"
                          stroke="#14B8A6"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </svg>
                    </div>

                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {displayResult.skillRadar.map((skill, i) => (
                        <div key={i} className="text-center">
                          <p className="text-gray-400" style={{ fontSize: "0.6rem", fontWeight: 700 }}>{skill.skill}</p>
                          <p className="text-teal-600 font-bold" style={{ fontSize: "0.8rem" }}>{skill.score}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ══════════ 6. POST-MATCH STATS ══════════ */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Post-Match Stats</h3>
                    </div>

                    <div className="space-y-2 overflow-hidden rounded-xl border border-gray-100">
                      {[
                        { label: "Winners", value: analysisResult?.stats.winners, icon: Trophy },
                        { label: "Unforced Errors", value: analysisResult?.stats.unforcedErrors, icon: AlertCircle },
                        { label: "Avg Ball Speed", value: `${analysisResult?.stats.avgBallSpeed} km/h`, icon: Gauge },
                        { label: "Win Rate", value: `${analysisResult?.stats.winRate}%`, icon: TrendingUp },
                        { label: "1st Serve In", value: `${analysisResult?.stats.winRate}%`, icon: Target },
                      ].map((stat, i) => (
                        <div key={i} className={`flex items-center justify-between p-3 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                          <div className="flex items-center gap-2 text-gray-600">
                            <stat.icon className="w-4 h-4" />
                            <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{stat.label}</span>
                          </div>
                          <span className="text-gray-900 font-bold" style={{ fontSize: "0.85rem" }}>{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ══════════ 7. TRAINING PLAN ══════════ */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-6">
                      <Calendar className="w-5 h-5 text-teal-600" />
                      <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Training Plan (Next 7 Days)</h3>
                    </div>

                    <div className="space-y-4">
                      {analysisResult?.trainingPlan.map((plan, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-gray-50 rounded-2xl border border-gray-100 p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-teal-600 text-white px-3 py-1 rounded-xl text-xs font-bold">{plan.day}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${plan.intensity === "high" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                              }`}>
                              {plan.intensity} Intensity
                            </span>
                          </div>
                          <p className="text-gray-900 font-bold mb-2" style={{ fontSize: "0.95rem" }}>{plan.focus}</p>

                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                              <p className="text-gray-400" style={{ fontSize: "0.6rem", fontWeight: 700 }}>COURT DRILL</p>
                              <p className="text-gray-800 leading-tight mt-1" style={{ fontSize: "0.75rem", fontWeight: 600 }}>{plan.courtTraining}</p>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                              <p className="text-gray-400" style={{ fontSize: "0.6rem", fontWeight: 700 }}>HOME TRAINING</p>
                              <p className="text-gray-800 leading-tight mt-1" style={{ fontSize: "0.75rem", fontWeight: 600 }}>{plan.homeTraining}</p>
                            </div>
                          </div>

                          <div className="bg-teal-50/50 p-2.5 rounded-xl border border-teal-50 flex items-start gap-2">
                            <Lightbulb className="w-3.5 h-3.5 text-teal-600 mt-0.5" />
                            <p className="text-teal-700" style={{ fontSize: "0.72rem" }}>
                              <span className="font-bold">Recovery Tip:</span> {plan.restNote}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl transition-all shadow-lg shadow-gray-200"
                    style={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Re-upload & Analyze
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-4">

            {/* Progress Tracker */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Progress</h3>
                </div>
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                  +20 pts
                </span>
              </div>

              <div className="space-y-2.5">
                {displayResult.progressHistory.map((p, i) => (
                  <div key={p.date} className="flex items-center gap-3">
                    <span className="text-gray-500 w-8 flex-shrink-0" style={{ fontSize: "0.72rem" }}>{p.date}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${p.score}%` }}
                        transition={{ delay: i * 0.1, duration: 0.7 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: scoreColor(p.score) }}
                      />
                    </div>
                    <span className="w-7 text-right flex-shrink-0" style={{ fontSize: "0.72rem", fontWeight: 700, color: scoreColor(p.score) }}>
                      {p.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-teal-600" />
                </div>
                <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Recent Sessions</h3>
              </div>
              <div className="space-y-2">
                {recentAnalyses.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm text-lg">
                      {a.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 truncate" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                        {a.sport}
                        <span className="text-gray-400 font-normal"> · {a.technique}</span>
                      </p>
                      <p className="text-gray-400" style={{ fontSize: "0.68rem" }}>{a.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p style={{ fontSize: "0.875rem", fontWeight: 700, color: scoreColor(a.score) }}>{a.score}</p>
                      <p className="text-emerald-600" style={{ fontSize: "0.65rem", fontWeight: 600 }}>{a.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smartwatch Health Card */}
            {healthAuthorized && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-pink-50 rounded-lg flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-pink-500" />
                  </div>
                  <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Biometrics</h3>
                  <span className="ml-auto flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-600" style={{ fontSize: "0.65rem", fontWeight: 700 }}>Live</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Avg HR", value: "142 bpm", icon: "❤️" },
                    { label: "Peak HR", value: "178 bpm", icon: "🔥" },
                    { label: "HRV", value: "42 ms", icon: "📊" },
                    { label: "Recovery", value: "Good", icon: "✅" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-gray-400 mb-0.5" style={{ fontSize: "0.62rem" }}>{stat.icon} {stat.label}</p>
                      <p className="text-gray-800" style={{ fontSize: "0.82rem", fontWeight: 700 }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pro Tips */}
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-4 shadow-lg shadow-teal-100">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-300" fill="currentColor" />
                <h3 className="text-white" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Pro Tips</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "Film from the side for best swing analysis",
                  "Good lighting improves joint detection",
                  "Upload 3–5 reps for consistent feedback",
                  "Wear fitted clothing for body tracking",
                  "Authorize heart rate data for deeper insights",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ fontSize: "0.75rem" }}>
                    <span className="text-yellow-300 flex-shrink-0 mt-0.5">•</span>
                    <span className="text-cyan-50">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Upgrade to Pro</h3>
              </div>
              <p className="text-gray-500 mb-3" style={{ fontSize: "0.75rem" }}>
                Get unlimited analyses, frame-by-frame breakdown, biometric correlation and live coach review.
              </p>
              <button
                className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-2.5 rounded-xl shadow-md shadow-teal-100 hover:shadow-lg transition-all"
                style={{ fontWeight: 600, fontSize: "0.8rem" }}
              >
                Upgrade Now
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
