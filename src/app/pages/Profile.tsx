import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Settings,
  Edit,
  Trophy,
  Activity,
  Users,
  Calendar,
  TrendingUp,
  Award,
  Flame,
  MapPin,
  ChevronRight,
  CheckCircle,
  BarChart3,
  Camera,
  Bell,
  X,
  Save,
  UserCheck,
  UserPlus,
  Star,
  Clock,
  Target,
  Share2,
  Copy,
  Link2,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  Play,
  Image as ImageIcon,
  FileText,
  MessageSquare,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  CartesianGrid, Tooltip, AreaChart, Area, XAxis, YAxis,
} from "recharts";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

import wechatLogo from "../../imports/wechat.png";
import xiaohongshuLogo from "../../imports/Xiaohongshu.png";

const tennisImg = "https://images.unsplash.com/photo-1761286753856-2f39b4413c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBjb3VydCUyMGFjdGlvbnxlbnwxfHx8fDE3NzQ5NTA2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const basketballImg = "https://images.unsplash.com/photo-1770042572491-0c3f1ca7d6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwdXJiYW4lMjBzdHJlZXQlMjBzcG9ydHxlbnwxfHx8fDE3NzQ5NTA2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const runningImg = "https://images.unsplash.com/photo-1758586326115-d4e9052b8f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwbWFyYXRob24lMjByYWNlJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc0OTUwNjU5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const golfImg = "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";

type TabType = "overview" | "activities" | "skills" | "achievements";

const progressData = [
  { month: "Nov", score: 58 },
  { month: "Dec", score: 63 },
  { month: "Jan", score: 68 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 78 },
];

const achievements = [
  { id: 1, title: "First Match Won", desc: "Won your first competitive match", icon: "🏆", earned: true, date: "Nov 2025" },
  { id: 2, title: "10 Activities", desc: "Joined 10 community activities", icon: "🎯", earned: true, date: "Jan 2026" },
  { id: 3, title: "Skill Master", desc: "Reached 80+ in any skill", icon: "⚡", earned: true, date: "Feb 2026" },
  { id: 4, title: "Social Butterfly", desc: "Connected with 50 athletes", icon: "🦋", earned: true, date: "Mar 2026" },
  { id: 5, title: "30-Day Streak", desc: "Active for 30 consecutive days", icon: "🔥", earned: false, progress: 12 },
  { id: 6, title: "AI Champion", desc: "Get AI score of 90+ in any sport", icon: "🤖", earned: false, progress: 78 },
  { id: 7, title: "Tournament Winner", desc: "Win an official tournament", icon: "👑", earned: false, progress: 0 },
  { id: 8, title: "Community Creator", desc: "Create an activity with 100+ joins", icon: "🌟", earned: false, progress: 34 },
];

const historyActivities = [
  {
    id: 1,
    title: "Tennis Practice",
    date: "Mar 30, 2026",
    duration: "90 min",
    score: 79,
    image: tennisImg,
    type: "Training",
    sport: "Tennis",
    description: "Intense training session focused on improving serve technique and forehand consistency. Started with a 15-minute warm-up including dynamic stretches and shadow swings. Main session concentrated on first serve percentage and placement, targeting specific zones in the service box. Coach provided real-time feedback on ball toss height and racket acceleration. The second half focused on forehand groundstrokes, working on generating topspin through the contact zone and maintaining balance during the stroke. Ended with 20 minutes of match-play simulation to apply learned techniques under pressure.",
    videoUrl: "https://www.youtube.com/embed/gy7fTm4nB6Y",
    highlights: ["Improved serve speed by 12% - now averaging 105 mph", "85% first serve success rate in practice rallies", "Strong forehand cross-court shots with 15% more topspin", "Better weight transfer during serve motion", "Reduced unforced errors by 40%"],
    gallery: [tennisImg, "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800", "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800"],
    reviews: [
      { id: 1, user: "Jamie Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie&backgroundColor=b6e3f4", rating: 5, comment: "Excellent training session! The coach's feedback was incredibly detailed and helpful. Saw immediate improvements in my serve technique.", date: "Mar 30, 2026" },
      { id: 2, user: "Marcus Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=c0aede", rating: 5, comment: "Great practice environment. The focus on serve mechanics really helped me understand the fundamentals better.", date: "Mar 30, 2026" },
    ],
  },
  {
    id: 2,
    title: "Basketball Pickup",
    date: "Mar 28, 2026",
    duration: "60 min",
    score: null,
    image: basketballImg,
    type: "Activity",
    sport: "Basketball",
    description: "Fun pickup game with local community players at the renovated downtown court. The session featured 5-on-5 full-court games with rolling substitutions to keep everyone fresh. Played four complete games, each to 21 points. Focused on improving defensive positioning and help-side rotations while on defense. Offensively, worked on creating space through off-ball movement and setting effective screens. The competition level was high, which pushed everyone to elevate their game. Made several new connections with regular players who meet every Tuesday and Thursday evening.",
    videoUrl: "https://www.youtube.com/embed/nj-Yd2qBeo0",
    highlights: ["Made 5 three-pointers including game-winner", "Great defensive plays with 3 steals and 2 blocks", "Team won 21-17 in final game", "Excellent court vision with 7 assists", "Connected on 65% of field goal attempts"],
    gallery: [basketballImg, "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800", "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800"],
    reviews: [
      { id: 1, user: "Chris Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris&backgroundColor=d1d4f9", rating: 5, comment: "Amazing game! The competition was tough but everyone played fair. That game-winning three was clutch! 🏀", date: "Mar 28, 2026" },
      { id: 2, user: "Sam Torres", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam&backgroundColor=ffd5dc", rating: 4, comment: "Really fun pickup session. Great mix of players and skill levels. Will definitely be back next week!", date: "Mar 28, 2026" },
      { id: 3, user: "Jordan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JordanL&backgroundColor=b6e3f4", rating: 5, comment: "Best pickup games in the city. Everyone brings good energy and the court is well-maintained.", date: "Mar 28, 2026" },
    ],
  },
  {
    id: 3,
    title: "City Tennis Open",
    date: "Mar 22, 2026",
    duration: "2h",
    score: null,
    image: tennisImg,
    type: "Tournament",
    sport: "Tennis",
    description: "Competed in the annual City Tennis Open tournament held at the municipal tennis center. The tournament featured 64 players across various skill levels in a single-elimination format. First round opponent was a solid baseliner, won 6-3, 6-4 by maintaining aggressive net approaches and varying shot selection. Second round match was more challenging against a former college player, pulled through 7-6, 4-6, 6-3 by staying mentally tough during crucial points. Quarterfinal match against the #3 seed was incredibly competitive but ultimately fell short 6-7, 6-4, 4-6. Despite the loss, gained invaluable experience competing under pressure and identified areas for improvement in big-point execution.",
    videoUrl: "https://www.youtube.com/embed/TH7QYn4hmWE",
    highlights: ["Won first 2 matches to reach quarterfinals", "Reached quarterfinals - best tournament result to date", "Great mental toughness shown in second round tiebreak", "Serve accuracy peaked at 78% first serves in", "Competed against #3 seed in close 3-set match"],
    gallery: [tennisImg, "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800", "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800"],
    reviews: [
      { id: 1, user: "Riley Morgan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley&backgroundColor=c0aede", rating: 5, comment: "Fantastic tournament! Well-organized with great competition. The facilities were top-notch and all matches ran on time.", date: "Mar 22, 2026" },
      { id: 2, user: "Dana Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dana&backgroundColor=d1d4f9", rating: 5, comment: "Best tennis tournament I've played in years. The level of play was impressive across all rounds.", date: "Mar 22, 2026" },
    ],
  },
  {
    id: 4,
    title: "Serve Analysis",
    date: "Mar 20, 2026",
    duration: "30 min",
    score: 74,
    image: tennisImg,
    type: "AI Session",
    sport: "Tennis",
    description: "AI-powered biomechanical analysis session examining serve mechanics in detail. Used high-speed cameras capturing 240 frames per second from three different angles to analyze every phase of the serve motion. The system evaluated ball toss consistency, shoulder rotation, hip drive, racket path, and follow-through. Key finding was inconsistent ball toss placement - varying by up to 8 inches between serves, leading to timing issues. Also identified limited hip rotation in the trophy position, reducing potential power generation by approximately 15%. Received a personalized 4-week training plan focusing on toss drills and hip mobility exercises. Follow-up session scheduled in one month to measure improvement.",
    videoUrl: "https://www.youtube.com/embed/pJFW-2gK3KM",
    highlights: ["Analyzed 45 serves across flat, slice, and kick varieties", "Identified toss inconsistency - main area for improvement", "Generated detailed improvement plan with weekly milestones", "Measured serve speed range: 92-108 mph", "Hip rotation analysis revealed 18% efficiency gap"],
    gallery: [tennisImg, "https://images.unsplash.com/photo-1617083278738-f5eacd02a65e?w=800"],
    aiReport: {
      sport: "Tennis",
      overallScore: 74,
      grade: "B",
      sessionSummary: "45 serves analyzed (flat, slice & kick) using 240fps 3-angle cameras. Full biomechanical sequencing captured from trophy position to follow-through.",
      breakdown: [
        { name: "Ball Toss Consistency", value: 62, status: "weak", note: "±8 inch variance" },
        { name: "Shoulder Rotation", value: 78, status: "good", note: "87° at peak" },
        { name: "Hip Drive", value: 65, status: "moderate", note: "Limited at trophy" },
        { name: "Racket Acceleration", value: 81, status: "good", note: "On-plane path" },
        { name: "Follow-Through", value: 71, status: "moderate", note: "Inconsistent finish" },
        { name: "Weight Transfer", value: 68, status: "moderate", note: "Heel lifts early" },
      ],
      keyMetrics: [
        { label: "Avg Serve Speed", value: "98 mph", sub: "range: 92–108 mph" },
        { label: "1st Serve %", value: "68%", sub: "target: 75%+" },
        { label: "Double Fault Rate", value: "8%", sub: "target: <5%" },
        { label: "Hip Rotation Gap", value: "18%", sub: "efficiency loss" },
      ],
      faults: [
        { issue: "Inconsistent Ball Toss", severity: "high", detail: "Toss placement varies ±8 inches horizontally, causing timing issues on 62% of serves." },
        { issue: "Limited Hip Rotation", severity: "medium", detail: "Hip rotation only 34° at trophy position vs. 52° recommended for optimal power transfer." },
        { issue: "Early Elbow Drop (Kick Serve)", severity: "medium", detail: "Elbow drops below shoulder on kick serves, reducing spin generation by ~15%." },
      ],
      weeklyPlan: [
        { week: 1, focus: "Toss Precision", tasks: ["200 isolated toss reps daily with target marker", "Film toss from behind-court angle", "Mirror drill: check arm path at peak release"] },
        { week: 2, focus: "Hip Mobility & Rotation", tasks: ["10-min hip flexor routine before each practice", "Hip rotation drill with racket (no ball) at 50% pace", "Combine toss + hip motion — full motion at slow speed"] },
        { week: 3, focus: "Full Serve Integration", tasks: ["Full serves under fatigue (20+ consecutive serves)", "Record & compare video to Week 1 baseline", "Coach focus check: trophy position elbow angle"] },
        { week: 4, focus: "Match Simulation", tasks: ["Serve games from both deuce and ad courts", "Pressure serve scenarios (tiebreak simulation)", "Re-measure all key metrics vs. baseline"] },
      ],
    },
    reviews: [
      { id: 1, user: "Alex Rivera", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexR&backgroundColor=b6e3f4", rating: 5, comment: "The AI analysis is incredible! Got insights I never would have noticed on my own. The personalized training plan is gold.", date: "Mar 20, 2026" },
      { id: 2, user: "Casey Brooks", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey&backgroundColor=ffd5dc", rating: 4, comment: "Very detailed biomechanical breakdown. The visual feedback really helps understand what needs to change.", date: "Mar 20, 2026" },
    ],
  },
  {
    id: 5,
    title: "Morning Run 5K",
    date: "Mar 18, 2026",
    duration: "28 min",
    score: 82,
    image: runningImg,
    type: "Training",
    sport: "Running",
    description: "Early morning 5K run through the scenic city park loop, starting at 6:15 AM. Perfect weather conditions with temperature at 58°F, clear skies, and a light breeze from the southeast. The route featured a mix of paved paths and slight elevation changes totaling 120 feet of gain. Focused on maintaining consistent effort rather than watching pace, using perceived exertion as the primary guide. First kilometer felt easy as the body warmed up, then settled into a comfortable rhythm. Heart rate stayed predominantly in zone 3 (aerobic range), which is ideal for building endurance base. Final kilometer included a strong finish, picking up pace by 15 seconds per km. Post-run stretching routine lasted 10 minutes, targeting hip flexors, hamstrings, and calves.",
    videoUrl: "https://www.youtube.com/embed/VvemT96Rozc",
    highlights: ["Personal best time: 28:14 - 32 seconds faster than previous PR", "Average pace: 5:38/km with negative split strategy", "Heart rate zone 3 for 75% of run (optimal aerobic training)", "Consistent kilometer splits: 5:42, 5:40, 5:38, 5:36, 5:38", "Felt strong throughout with excellent recovery"],
    gallery: [runningImg, "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800", "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800"],
    reviews: [
      { id: 1, user: "Taylor Swift", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor&backgroundColor=c0aede", rating: 5, comment: "Love this route! The park scenery is beautiful and the path is well-maintained. Perfect for morning runs.", date: "Mar 18, 2026" },
      { id: 2, user: "Morgan Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan&backgroundColor=d1d4f9", rating: 5, comment: "Great running community here. Always see friendly faces and the early morning vibe is unbeatable!", date: "Mar 18, 2026" },
    ],
  },
  {
    id: 6,
    title: "3v3 Basketball League",
    date: "Mar 15, 2026",
    duration: "45 min",
    score: null,
    image: basketballImg,
    type: "Tournament",
    sport: "Basketball",
    description: "Competed in the inaugural session of the local 3v3 basketball league held at the outdoor courts downtown. League format consists of 4 games per session, each game to 15 points with 1s and 2s scoring. Team composition remained consistent with two teammates who complement each other's playing styles well. First game was a nail-biter, winning 15-13 with a clutch two-pointer in the final possession. Second game was more dominant, utilizing strong pick-and-roll execution to control the pace. Third game exposed some defensive weaknesses against quick guards, resulting in a 12-15 loss. Bounced back in the fourth game with improved defensive communication and better shot selection. The half-court format really emphasizes decision-making and efficiency - every possession matters.",
    videoUrl: "https://www.youtube.com/embed/kiJ51IEUkDQ",
    highlights: ["Won 3 out of 4 games - tied for first place in standings", "Scored 18 points total with 58% field goal percentage", "Strong team chemistry developed through constant communication", "Defensive improvement noted from game 3 to game 4", "Excellent ball movement led to 11 team assists"],
    gallery: [basketballImg, "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800", "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800"],
    reviews: [
      { id: 1, user: "Blake Anderson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blake&backgroundColor=b6e3f4", rating: 5, comment: "Competitive 3v3 league with great organization. Every game is intense and the skill level keeps improving!", date: "Mar 15, 2026" },
      { id: 2, user: "Avery Stone", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Avery&backgroundColor=c0aede", rating: 5, comment: "Love the format! Half-court basketball is so much fun and really forces you to make smart plays.", date: "Mar 15, 2026" },
      { id: 3, user: "Emily Zhang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily&backgroundColor=ffd5dc", rating: 4, comment: "Great competition and good sportsmanship from all teams. Looking forward to the next session!", date: "Mar 15, 2026" },
    ],
  },
  {
    id: 7,
    title: "Doubles Match Practice",
    date: "Mar 12, 2026",
    duration: "75 min",
    score: 76,
    image: tennisImg,
    type: "Training",
    sport: "Tennis",
    description: "Focused doubles practice session with regular partner, preparing for upcoming club tournament. Session began with doubles-specific warm-up drills including quick volleys at the net and overhead practice. Main focus areas were: serving patterns and first volley positioning, return of serve strategies to create offensive opportunities, and poaching techniques at the net. Worked extensively on communication - calling switches, identifying when to stay/go, and providing encouragement. Played eight practice sets against two different opposing pairs to simulate variety in tournament play. Successfully implemented 'I-formation' serves on key points, which generated confusion and easy put-aways. The partner chemistry has improved dramatically over the past month, with better anticipation of each other's movements.",
    videoUrl: "https://www.youtube.com/embed/8CJHS5jz4j4",
    highlights: ["Improved net approach - won 72% of net points", "Better partner coordination with hand signals implemented", "Won 6 out of 8 practice sets against quality opposition", "Successful poaching on 8 service returns", "Developed effective serving patterns to create angles"],
    gallery: [tennisImg, "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800", "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800"],
    reviews: [
      { id: 1, user: "Jamie Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie&backgroundColor=b6e3f4", rating: 5, comment: "Great doubles practice! The drills really helped improve our communication and net play. Partner synergy is key!", date: "Mar 12, 2026" },
    ],
  },
  {
    id: 8,
    title: "Half Marathon Prep",
    date: "Mar 10, 2026",
    duration: "95 min",
    score: 78,
    image: runningImg,
    type: "Training",
    sport: "Running",
    description: "Long-distance training run as part of structured half marathon preparation program (race scheduled in 5 weeks). The route covered 15 kilometers through varied terrain including flat riverside paths, gentle hills, and park trails. Weather was ideal for long runs - overcast skies, 55°F, light humidity. Nutrition strategy included consuming an energy gel at the 7km mark and another at 12km to practice race-day fueling. Carried a handheld water bottle and took small sips every 2km. The run was structured with first 5km at easy conversational pace to properly warm up, middle 8km at goal half marathon pace (5:45/km), and final 2km at easy cooldown pace. Legs felt strong throughout, and the pacing strategy prevented the typical fatigue that comes from starting too fast on long runs.",
    videoUrl: "https://www.youtube.com/embed/2JqVxn2FZfw",
    highlights: ["Completed 15km - longest run in current training cycle", "Average pace: 5:50/km exactly as planned", "Great hydration strategy - no cramping issues", "Middle section maintained target half marathon pace", "Minimal fatigue post-run indicating good fitness progression"],
    gallery: [runningImg, "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800", "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800"],
  },
  {
    id: 9,
    title: "Basketball Shooting Drill",
    date: "Mar 8, 2026",
    duration: "40 min",
    score: 68,
    image: basketballImg,
    type: "AI Session",
    sport: "Basketball",
    description: "AI-powered shooting analysis session using motion capture technology and computer vision to evaluate shooting mechanics. The system tracked 17 key points on the body during each shot attempt to analyze form consistency. Started with 40 free throws to establish baseline mechanics, then moved through various spots on the court - corners, wings, top of key, and mid-range. Each shot was recorded and immediately analyzed for: shooting pocket consistency, elbow alignment under the ball, follow-through arc, leg drive, and balance on landing. The AI identified that elbow flare was inconsistent, particularly on shots from the right wing. Also noted excellent follow-through with good backspin generation. Received customized drills targeting form fixes and a video compilation showing side-by-side comparisons of good form vs. areas needing adjustment.",
    videoUrl: "https://www.youtube.com/embed/fJW7yalIDYo",
    highlights: ["Analyzed 120 shots from 8 different court locations", "65% shooting accuracy overall - baseline established", "Improved elbow alignment through real-time feedback", "Identified right wing as weakest shooting zone (52%)", "Corner three accuracy strong at 71%"],
    gallery: [basketballImg, "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=800"],
    aiReport: {
      sport: "Basketball",
      overallScore: 68,
      grade: "C+",
      sessionSummary: "120 shots from 8 court locations. 17-point motion capture + computer vision. Baseline session establishing form metrics.",
      breakdown: [
        { name: "Elbow Alignment", value: 58, status: "weak", note: "Flares on right side" },
        { name: "Shooting Pocket", value: 66, status: "moderate", note: "4–6 inch variance" },
        { name: "Arc Height", value: 72, status: "good", note: "45° avg launch angle" },
        { name: "Follow-Through", value: 76, status: "good", note: "Strong backspin" },
        { name: "Leg Drive", value: 65, status: "moderate", note: "Inconsistent power" },
        { name: "Balance on Landing", value: 70, status: "moderate", note: "Slight forward lean" },
      ],
      keyMetrics: [
        { label: "Overall Accuracy", value: "65%", sub: "120 shots total" },
        { label: "Best Zone", value: "71%", sub: "corner threes" },
        { label: "Weakest Zone", value: "52%", sub: "right wing 3pt" },
        { label: "Free Throw %", value: "80%", sub: "40 attempts" },
      ],
      zoneData: [
        { zone: "Corner Left 3", pct: 71 },
        { zone: "Corner Right 3", pct: 68 },
        { zone: "Left Wing 3", pct: 58 },
        { zone: "Right Wing 3", pct: 52 },
        { zone: "Top of Key 3", pct: 61 },
        { zone: "Mid-Range Left", pct: 78 },
        { zone: "Mid-Range Right", pct: 75 },
        { zone: "Free Throw Line", pct: 80 },
      ],
      faults: [
        { issue: "Elbow Flare on Right-Side Shots", severity: "high", detail: "Elbow deviates 12–18° outward on wing/corner shots from the right side, drastically reducing shot consistency." },
        { issue: "Inconsistent Shooting Pocket", severity: "medium", detail: "Ball set point varies 4–6 inches between shots, disrupting rhythm and release timing on pull-up jumpers." },
        { issue: "Fade-Away Tendency", severity: "low", detail: "Backward lean detected on 35% of shots, reducing power transfer and optimal 45° launch angle." },
      ],
      weeklyPlan: [
        { week: 1, focus: "Form Shooting (5 ft)", tasks: ["100 close-range form shots per day", "Elbow alignment guide band drill", "Film from front angle — check elbow path each session"] },
        { week: 2, focus: "Mid-Range Extension", tasks: ["Extend to 12ft while maintaining elbow form", "Right-wing reps doubled vs. left wing", "Shooting pocket consistency drill with floor marker"] },
        { week: 3, focus: "Three-Point Range", tasks: ["Wing three emphasis from both sides equally", "Full footwork integration: catch-and-shoot sequences", "Side-by-side elbow video comparison vs. Week 1"] },
        { week: 4, focus: "Game-Speed Reps", tasks: ["Off-screen shooting sequences with full movement", "Live defense closeout practice", "Re-measure zone accuracy vs. baseline session"] },
      ],
    },
    reviews: [
      { id: 1, user: "Chris Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris&backgroundColor=d1d4f9", rating: 5, comment: "The AI shooting analysis is game-changing! Instantly identified my form issues and the drills are helping fix them.", date: "Mar 8, 2026" },
      { id: 2, user: "Jordan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JordanL&backgroundColor=b6e3f4", rating: 5, comment: "Really impressed with the detailed feedback. The side-by-side video comparisons make it easy to see what needs work.", date: "Mar 8, 2026" },
    ],
  },
  {
    id: 10,
    title: "Sprint Interval Training",
    date: "Mar 5, 2026",
    duration: "35 min",
    score: 85,
    image: runningImg,
    type: "Training",
    sport: "Running",
    description: "High-intensity interval training session conducted at the local outdoor track with perfect running conditions. The workout structure was 8x400m repeats with 200m recovery jog between each interval. This session is designed to build both speed and aerobic capacity simultaneously - the foundation for faster race times. Started with a 10-minute easy warmup jog followed by dynamic stretching and 4 strides to prepare the body for high-intensity work. Target pace for the 400m intervals was 90 seconds (6:00/mile pace), which represents approximately 5K race effort. Successfully hit target pace on all 8 intervals, with splits ranging from 1:28 to 1:32. Heart rate spiked to 175-180 bpm during intervals and recovered to 140-145 during rest periods, indicating good cardiovascular fitness. Finished with 5-minute cooldown jog and thorough stretching routine.",
    videoUrl: "https://www.youtube.com/embed/2mWPfr87kNc",
    highlights: ["8x400m intervals - all completed at target pace", "Top speed reached: 18.5 km/h during fastest interval", "Full recovery between sets - heart rate dropped appropriately", "Perfect running form maintained even when fatigued", "Consistent splits: 1:28, 1:30, 1:31, 1:29, 1:32, 1:30, 1:28, 1:29"],
    gallery: [runningImg, "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800", "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800"],
  },
  {
    id: 11,
    title: "Tennis Backhand Workshop",
    date: "Mar 2, 2026",
    duration: "60 min",
    score: 71,
    image: tennisImg,
    type: "Training",
    sport: "Tennis",
    description: "Specialized workshop session focusing exclusively on single-handed backhand technique, led by a USPTA certified professional coach with 15 years of teaching experience. The workshop had 6 participants all working to refine this challenging but elegant stroke. Started with detailed discussion of backhand fundamentals: grip (eastern backhand), preparation, swing path, and contact point. Coach used video analysis to show professional players' backhand mechanics, highlighting key positions. Drills progressed from stationary hitting to movement-based patterns. Worked extensively on: shoulder turn and unit turn, linear swing path with slight upward trajectory for topspin, firm wrist through contact zone, and high finish. Partner feeding drills allowed for high repetition to ingrain proper technique. The coach provided individualized feedback, correcting my tendency to drop the racket head too early in the swing.",
    videoUrl: "https://www.youtube.com/embed/dI-dBG3w7IM",
    highlights: ["Single-handed backhand focus - 200+ repetitions", "Improved topspin generation through proper swing path", "Better stroke consistency - 78% of balls landing in court", "Corrected early racket drop issue", "Learned cross-court and down-the-line targeting"],
    gallery: [tennisImg, "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800", "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800"],
  },
  {
    id: 12,
    title: "Park Basketball Session",
    date: "Feb 28, 2026",
    duration: "50 min",
    score: null,
    image: basketballImg,
    type: "Activity",
    sport: "Basketball",
    description: "Casual yet competitive basketball session at Lincoln Park with a diverse group of players ranging from beginners to experienced athletes. The informal setting created a welcoming environment where everyone felt comfortable trying new moves and taking shots. Played four full-court games with teams rotating after each game to ensure balanced competition. The mixed skill levels actually enhanced the experience - more experienced players naturally took on mentoring roles, offering tips on footwork, defensive positioning, and shooting form to those newer to the game. Personally focused on improving ball handling in traffic and making better decisions when driving to the basket. Made several new friends including a college player home for break who shared great insights about reading defenses. The social aspect was just as valuable as the physical workout.",
    videoUrl: "https://www.youtube.com/embed/8j1Mn4ukzNs",
    highlights: ["Played 4 full games with rotating teams for fairness", "Made new basketball friends and connections", "Practiced ball handling with 85% success on drives", "Shared tips with newer players - teaching reinforces learning", "Great cardio workout averaging 145 bpm heart rate"],
    gallery: [basketballImg, "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800", "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800"],
    reviews: [
      { id: 1, user: "Sam Torres", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam&backgroundColor=d1d4f9", rating: 5, comment: "Love the inclusive vibe at this park! Players of all levels welcome and everyone helps each other improve. Community basketball at its best!", date: "Feb 28, 2026" },
      { id: 2, user: "Riley Morgan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley&backgroundColor=ffd5dc", rating: 4, comment: "Great spot for casual basketball. The rotating teams keep things fresh and you meet lots of cool people.", date: "Feb 28, 2026" },
    ],
  },
  {
    id: 13,
    title: "Golf Swing Analysis",
    date: "Feb 25, 2026",
    duration: "45 min",
    score: 81,
    image: golfImg,
    type: "AI Session",
    sport: "Golf",
    description: "Comprehensive AI-powered golf swing analysis using advanced motion capture technology and biomechanical assessment. The session utilized a multi-camera setup capturing swing footage at 240fps from face-on, down-the-line, and overhead perspectives. AI system analyzed over 30 key biomechanical markers throughout the entire swing sequence including: address position, takeaway, backswing plane, top of backswing position, transition, downswing sequence, impact position, follow-through, and finish. The detailed analysis evaluated grip pressure, posture angles, shoulder turn, hip rotation, weight shift, club path, face angle at impact, tempo, and swing plane consistency. Key findings revealed excellent posture setup and initial takeaway but identified an early extension pattern during the downswing causing inconsistent contact. Also noted a slight over-the-top move at transition reducing power efficiency by approximately 18%. Hip rotation was strong at 52 degrees in backswing but sequencing in downswing could be optimized for better energy transfer. Club face angle at impact averaged 2.3 degrees open, explaining the consistent fade pattern. Received a customized 6-week improvement program focusing on maintaining spine angle through impact, improving transition sequencing, and developing proper hip-shoulder separation. Program includes specific drills for each swing phase and pressure plate training to improve weight shift mechanics.",
    videoUrl: "https://www.youtube.com/embed/nAYBBC0VfPg",
    aiReport: {
      sport: "Golf",
      overallScore: 81,
      grade: "B+",
      sessionSummary: "48 full swings (driver, irons & wedges) at 240fps. Multi-camera + pressure plate system. 30+ biomechanical markers tracked.",
      breakdown: [
        { name: "Setup & Posture", value: 88, status: "excellent", note: "Textbook alignment" },
        { name: "Takeaway", value: 84, status: "good", note: "Wide arc, on-plane" },
        { name: "Backswing Plane", value: 79, status: "good", note: "Slight inside track" },
        { name: "Transition", value: 68, status: "moderate", note: "Over-the-top move" },
        { name: "Downswing Sequence", value: 71, status: "moderate", note: "Arms fire before hips" },
        { name: "Impact Position", value: 74, status: "moderate", note: "Early extension 78%" },
        { name: "Follow-Through", value: 85, status: "good", note: "Full extension" },
      ],
      keyMetrics: [
        { label: "Club Head Speed", value: "98 mph", sub: "driver average" },
        { label: "Face Angle @ Impact", value: "+2.3°", sub: "open → fade ball flight" },
        { label: "Swing Plane Dev.", value: "±4.2°", sub: "good consistency" },
        { label: "X-Factor Sep.", value: "42°", sub: "target: 50°+" },
        { label: "Tempo Ratio", value: "2.8:1", sub: "slightly fast transition" },
        { label: "Weight Shift", value: "65/35", sub: "back→through efficiency" },
      ],
      faults: [
        { issue: "Early Extension", severity: "high", detail: "Hip thrust toward the ball occurs in 78% of swings, causing posture breakdown and inconsistent ball striking at impact." },
        { issue: "Over-the-Top Transition", severity: "high", detail: "Club moves outside target line at transition, reducing power output by ~18% and producing a pull/fade tendency." },
        { issue: "Insufficient X-Factor Separation", severity: "medium", detail: "42° shoulder-hip separation vs. 50°+ recommended — limiting rotational power storage and downswing energy transfer." },
      ],
      weeklyPlan: [
        { week: 1, focus: "Spine Angle Maintenance", tasks: ["Wall drill: hold posture with back against wall through impact", "Trail glute squeeze cue at the start of downswing", "Short iron practice: focus on maintaining spine angle"] },
        { week: 2, focus: "Transition Sequencing", tasks: ["Hip bump drill with alignment rod between knees", "Pressure plate training: feel weight shift timing precisely", "Slow-motion transition video review with coach feedback"] },
        { week: 3, focus: "X-Factor Development", tasks: ["Upper/lower body separation stretches (10 min daily)", "Hip turn resistance band exercises against rotation", "Half-swing feel drill: emphasise maximum shoulder turn"] },
        { week: 4, focus: "Short Game Integration", tasks: ["Pitching & chipping with correct downswing sequence", "100-yard wedge control with tempo focus (3:1 ratio)", "Video comparison side-by-side vs. Week 1 baseline"] },
        { week: 5, focus: "Full Swing Integration", tasks: ["Driver tempo target: 3:1 backswing/downswing ratio", "Iron play on range — 50 balls, focus on impact position", "On-course 9-hole assessment with key swing thoughts"] },
        { week: 6, focus: "On-Course Application", tasks: ["18-hole round applying all trained swing cues", "Post-round video review with AI metric comparison", "Final session: re-measure all key metrics vs. baseline"] },
      ],
    },
    highlights: [
      "Analyzed 48 full swings with driver, irons, and wedges",
      "Identified early extension as primary swing fault - 78% of swings affected",
      "Club head speed averaged 98 mph - within target range for skill level",
      "Swing plane deviation averaged 4.2 degrees - good consistency",
      "Impact position face angle 2.3° open - explains ball flight pattern",
      "Hip rotation excellent at 52° backswing, 45° through impact",
      "Generated detailed 6-week improvement program with daily drills",
      "Pressure distribution analysis revealed 65/35 weight shift efficiency",
      "Tempo ratio measured at 2.8:1 (backswing:downswing) - slightly fast transition",
      "X-Factor (shoulder-hip separation) reached 42° - room for improvement to 50°+"
    ],
    gallery: [
      golfImg,
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800",
      "https://images.unsplash.com/photo-1593111774240-d529f12c8795?w=800"
    ],
    reviews: [
      {
        id: 1,
        user: "Casey Brooks",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey&backgroundColor=d1d4f9",
        rating: 5,
        comment: "This golf swing analysis is incredible! The AI caught issues my coach has been mentioning but now I can see exactly what's happening frame-by-frame. The early extension visualization really opened my eyes. Already working on the drills and feeling improvements!",
        date: "Feb 25, 2026"
      },
      {
        id: 2,
        user: "Avery Stone",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Avery&backgroundColor=ffd5dc",
        rating: 5,
        comment: "Mind-blowing detail in the analysis! The pressure plate data showing my weight shift was fascinating. Never realized how much I was hanging back. The 6-week program is perfectly structured with clear daily goals.",
        date: "Feb 25, 2026"
      },
      {
        id: 3,
        user: "Blake Anderson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blake&backgroundColor=b6e3f4",
        rating: 5,
        comment: "Best money I've spent on golf improvement! The multi-angle video analysis makes it so easy to understand the swing faults. Club face angle data explained why I've been fighting that slice. Highly recommend this to any serious golfer!",
        date: "Feb 25, 2026"
      }
    ],
  },
];

const typeColor: Record<string, string> = {
  Tournament: "bg-amber-50 text-amber-600",
  "AI Session": "bg-violet-50 text-violet-600",
  Training: "bg-blue-50 text-blue-600",
  Activity: "bg-[#00D26A]/10 text-[#00D26A]",
};

// Per-sport skill levels
const sportSkills = [
  {
    sport: "Tennis",
    emoji: "🎾",
    level: "Intermediate",
    levelColor: "bg-blue-50 text-blue-600 border-blue-200",
    score: 3.0,
    maxScore: 7.0,
    ratingSystem: "NTRP",
    color: "#3B82F6",
    skills: [
      { name: "Serve", value: 72 },
      { name: "Forehand", value: 78 },
      { name: "Backhand", value: 65 },
      { name: "Volley", value: 60 },
      { name: "Movement", value: 74 },
    ],
  },
  {
    sport: "Basketball",
    emoji: "🏀",
    level: "Beginner",
    levelColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    score: 5.0,
    maxScore: 10.0,
    ratingSystem: "Skill Rating",
    color: "#F59E0B",
    skills: [
      { name: "Dribbling", value: 55 },
      { name: "Shooting", value: 48 },
      { name: "Defense", value: 52 },
      { name: "Passing", value: 60 },
      { name: "Athleticism", value: 65 },
    ],
  },
  {
    sport: "Running",
    emoji: "🏃",
    level: "Intermediate",
    levelColor: "bg-blue-50 text-blue-600 border-blue-200",
    score: 4.5,
    maxScore: 10.0,
    ratingSystem: "Performance",
    color: "#00D26A",
    skills: [
      { name: "Endurance", value: 76 },
      { name: "Speed", value: 68 },
      { name: "Form", value: 72 },
      { name: "Recovery", value: 70 },
    ],
  },
];

const radarData = [
  { subject: "Technique", A: 82 },
  { subject: "Fitness", A: 74 },
  { subject: "Tactics", A: 68 },
  { subject: "Mental", A: 79 },
  { subject: "Social", A: 91 },
  { subject: "Consistency", A: 71 },
];

const followers = [
  { id: 1, name: "Jamie Lee", handle: "@jamielee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie&backgroundColor=b6e3f4", sport: "Tennis", mutual: true },
  { id: 2, name: "Chris Park", handle: "@chrispark", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris&backgroundColor=c0aede", sport: "Running", mutual: false },
  { id: 3, name: "Sam Torres", handle: "@sammy_t", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam&backgroundColor=d1d4f9", sport: "Basketball", mutual: true },
  { id: 4, name: "Riley Morgan", handle: "@riley_m", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley&backgroundColor=ffd5dc", sport: "Yoga", mutual: false },
  { id: 5, name: "Jordan White", handle: "@j_white", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan&backgroundColor=b6e3f4", sport: "Swimming", mutual: true },
  { id: 6, name: "Dana Kim", handle: "@danakim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dana&backgroundColor=c0aede", sport: "Tennis", mutual: false },
  { id: 7, name: "Casey Brooks", handle: "@casey_b", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey&backgroundColor=d1d4f9", sport: "Golf", mutual: true },
  { id: 8, name: "Avery Stone", handle: "@avery_s", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Avery&backgroundColor=ffd5dc", sport: "Cycling", mutual: false },
];

const following = [
  { id: 101, name: "Marcus Chen", handle: "@marcusc", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=b6e3f4", sport: "Tennis", isFollowing: true },
  { id: 102, name: "Emily Zhang", handle: "@emily_z", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily&backgroundColor=c0aede", sport: "Basketball", isFollowing: true },
  { id: 103, name: "Alex Rivera", handle: "@arivera", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexR&backgroundColor=d1d4f9", sport: "Running", isFollowing: true },
  { id: 104, name: "Taylor Swift", handle: "@taylor_fit", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor&backgroundColor=ffd5dc", sport: "Yoga", isFollowing: true },
  { id: 105, name: "Jordan Lee", handle: "@jlee_sports", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JordanL&backgroundColor=b6e3f4", sport: "Swimming", isFollowing: true },
  { id: 106, name: "Morgan Davis", handle: "@mdavis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan&backgroundColor=c0aede", sport: "Tennis", isFollowing: true },
  { id: 107, name: "Blake Anderson", handle: "@blake_a", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blake&backgroundColor=d1d4f9", sport: "Golf", isFollowing: true },
];

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  location: string;
  handle: string;
  sports: string[];
  displayedSportTags: string[];
}

interface BodyMetrics {
  heightCm: string;
  weightKg: string;
  chestCm: string;
  waistCm: string;
  hipCm: string;
  armSpanCm: string;
}

export function Profile() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showActivityDetail, setShowActivityDetail] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [followedBack, setFollowedBack] = useState<Set<number>>(new Set([1, 3, 5, 7]));
  const [followingUsers, setFollowingUsers] = useState<Set<number>>(new Set([101, 102, 103, 104, 105, 106, 107]));
  const { joinedActivities } = useAppContext();

  const [coverImage, setCoverImage] = useState({
    type: "gradient",
    value: "from-[#00D26A] via-emerald-400 to-teal-500"
  });

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Alex Chen",
    email: "alex.chen@email.com",
    bio: "Passionate tennis player and weekend basketball enthusiast. Always looking for new sports challenges and partners. AI coaching helped me improve my forehand by 20 points 🎾⚡",
    location: "San Francisco, CA",
    handle: "@alexchen",
    sports: ["🎾 Tennis", "🏀 Basketball", "🏃 Running"],
    displayedSportTags: ["🎾 Tennis", "🏀 Basketball", "🏃 Running"],
  });
  const [editDraft, setEditDraft] = useState<ProfileData>(profileData);
  const [bodyMetrics, setBodyMetrics] = useState<BodyMetrics>({
    heightCm: "",
    weightKg: "",
    chestCm: "",
    waistCm: "",
    hipCm: "",
    armSpanCm: "",
  });

  // Handle URL params to switch tabs
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "activities") setActiveTab("activities");
    else if (tab === "skills") setActiveTab("skills");
    else if (tab === "achievements") setActiveTab("achievements");
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setBodyMetrics({
      heightCm: localStorage.getItem("movematch.profile.body.height_cm") ?? "",
      weightKg: localStorage.getItem("movematch.profile.body.weight_kg") ?? "",
      chestCm: localStorage.getItem("movematch.profile.body.chest_cm") ?? "",
      waistCm: localStorage.getItem("movematch.profile.body.waist_cm") ?? "",
      hipCm: localStorage.getItem("movematch.profile.body.hip_cm") ?? "",
      armSpanCm: localStorage.getItem("movematch.profile.body.arm_span_cm") ?? "",
    });
  }, []);

  const totalActivities = 24 + joinedActivities.length;

  const profileStats = [
    { label: "Activities", value: String(totalActivities), color: "text-[#00D26A]", action: () => setActiveTab("activities") },
    { label: "Followers", value: "183", color: "text-blue-500", action: () => setShowFollowersModal(true) },
    { label: "Following", value: "97", color: "text-violet-500", action: () => setShowFollowingModal(true) },
    { label: "Streak", value: "12d", color: "text-amber-500", action: undefined },
  ];

  const allActivitiesDisplay = [
    ...joinedActivities.map((a) => ({
      id: a.id + 1000,
      title: a.title,
      date: a.joinedAt ? new Date(a.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently",
      duration: "-",
      score: null as number | null,
      image: a.image,
      type: "Activity" as string,
      sport: a.sport,
      isNew: true,
    })),
    ...historyActivities.map((a) => ({ ...a, isNew: false })),
  ];

  const handleSaveProfile = () => {
    setProfileData(editDraft);
    setShowEditModal(false);
    toast.success("Profile updated successfully!");
  };

  const handleCopyLink = () => {
    const profileUrl = `https://movematch.ai/profile/${profileData.handle.replace('@', '')}`;
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile link copied to clipboard!");
  };

  const handleBodyMetricChange = (key: keyof BodyMetrics, value: string) => {
    setBodyMetrics((prev) => ({ ...prev, [key]: value }));
    if (typeof window !== "undefined") {
      const storageMap: Record<keyof BodyMetrics, string> = {
        heightCm: "movematch.profile.body.height_cm",
        weightKg: "movematch.profile.body.weight_kg",
        chestCm: "movematch.profile.body.chest_cm",
        waistCm: "movematch.profile.body.waist_cm",
        hipCm: "movematch.profile.body.hip_cm",
        armSpanCm: "movematch.profile.body.arm_span_cm",
      };
      localStorage.setItem(storageMap[key], value);
    }
  };

  const coverPresets = [
    { type: "gradient", value: "from-[#00D26A] via-emerald-400 to-teal-500", name: "MoveMatch Green" },
    { type: "gradient", value: "from-blue-500 via-blue-400 to-cyan-400", name: "Ocean Blue" },
    { type: "gradient", value: "from-purple-500 via-pink-500 to-red-500", name: "Sunset" },
    { type: "gradient", value: "from-amber-400 via-orange-400 to-red-500", name: "Fire" },
    { type: "gradient", value: "from-gray-800 via-gray-700 to-gray-900", name: "Dark Mode" },
    { type: "gradient", value: "from-indigo-500 via-purple-500 to-pink-500", name: "Galaxy" },
    { type: "image", value: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200", name: "Basketball Court" },
    { type: "image", value: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=1200", name: "Tennis Action" },
    { type: "image", value: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200", name: "Running Track" },
    { type: "image", value: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200", name: "Sports Stadium" },
  ];

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: <Instagram className="w-7 h-7 text-white" />,
      color: "from-purple-500 to-pink-500",
      action: () => { toast.success("Opening Instagram..."); setShowShareModal(false); }
    },
    {
      name: "TikTok",
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="white"/>
        </svg>
      ),
      color: "from-gray-900 to-black",
      action: () => { toast.success("Opening TikTok..."); setShowShareModal(false); }
    },
    {
      name: "Xiaohongshu",
      icon: <img src={xiaohongshuLogo} alt="Xiaohongshu" className="w-full h-full object-cover rounded-xl" />,
      color: "from-white to-white",
      action: () => { toast.success("Opening Xiaohongshu..."); setShowShareModal(false); }
    },
    {
      name: "WeChat",
      icon: <img src={wechatLogo} alt="WeChat" className="w-full h-full object-cover rounded-xl" />,
      color: "from-white to-white",
      action: () => { toast.success("Opening WeChat..."); setShowShareModal(false); }
    },
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="white"/>
        </svg>
      ),
      color: "from-green-400 to-green-500",
      action: () => { toast.success("Opening WhatsApp..."); setShowShareModal(false); }
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
        </svg>
      ),
      color: "from-gray-900 to-black",
      action: () => { toast.success("Opening Twitter..."); setShowShareModal(false); }
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-7 h-7 text-white" fill="white" />,
      color: "from-blue-600 to-blue-700",
      action: () => { toast.success("Opening Facebook..."); setShowShareModal(false); }
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-7 h-7 text-white" fill="white" />,
      color: "from-blue-700 to-blue-800",
      action: () => { toast.success("Opening LinkedIn..."); setShowShareModal(false); }
    },
  ];

  return (
    <div className="w-full pb-24 md:pb-8">
      {/* Cover + Avatar */}
      <div className="relative">
        <div
          onClick={() => setShowCoverModal(true)}
          className={`h-36 md:h-44 relative overflow-hidden cursor-pointer group ${
            coverImage.type === "gradient" ? `bg-gradient-to-br ${coverImage.value}` : ""
          }`}
          style={coverImage.type === "image" ? {
            backgroundImage: `url(${coverImage.value})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          } : {}}
        >
          {coverImage.type === "gradient" && (
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
          )}
          {coverImage.type === "image" && (
            <div className="absolute inset-0 bg-black/20" />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
              <Camera className="w-4 h-4 text-white" />
              <span className="text-white" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Change Cover</span>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 max-w-5xl mx-auto">
          <div className="flex items-end justify-between -mt-12 mb-3">
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4"
                className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-gray-100"
                alt="Alex"
              />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#00D26A] rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="flex gap-2 pb-1">
              <button
                onClick={() => { setEditDraft(profileData); setShowEditModal(true); }}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
                style={{ fontSize: "0.8rem", fontWeight: 600 }}
              >
                <Edit className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#00D26A] text-white rounded-xl hover:bg-[#00B85E] transition-colors shadow-md shadow-[#00D26A]/20"
                style={{ fontSize: "0.8rem", fontWeight: 700 }}
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Profile
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.2rem" }}>{profileData.name}</h2>
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" />
              <span className="bg-violet-50 text-violet-600 border border-violet-100 px-2 py-0.5 rounded-full" style={{ fontSize: "0.62rem", fontWeight: 700 }}>AI Verified</span>
            </div>
            <p className="text-gray-500 mb-1" style={{ fontSize: "0.82rem" }}>{profileData.handle} · Tennis Enthusiast · Level 12</p>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400" style={{ fontSize: "0.78rem" }}>{profileData.location}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-3" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
            {profileData.bio}
          </p>

          <div className="flex gap-2 flex-wrap mb-4">
            {profileData.displayedSportTags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{tag}</span>
            ))}
          </div>

          {/* Clickable Stats */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {profileStats.map((s) => (
              <button
                key={s.label}
                onClick={s.action}
                className={`bg-white rounded-xl border border-gray-100 shadow-sm p-2.5 text-center transition-all ${s.action ? "hover:shadow-md hover:border-gray-200 cursor-pointer active:scale-95" : "cursor-default"}`}
              >
                <p className={`${s.color}`} style={{ fontWeight: 800, fontSize: "1.1rem" }}>{s.value}</p>
                <p className="text-gray-400" style={{ fontSize: "0.62rem" }}>{s.label}</p>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-700" />
              <span className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                Body Metrics
              </span>
            </div>
            <span className="text-gray-600" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
              H {bodyMetrics.heightCm || "--"}cm · W {bodyMetrics.weightKg || "--"}kg · Arm {bodyMetrics.armSpanCm || "--"}cm
            </span>
          </div>
        </div>
      </div>

      {/* Tabs + content */}
      <div className="max-w-5xl mx-auto px-3 md:px-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 mb-4 flex gap-1.5">
          {([
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "activities", label: "Activities", icon: "🏃" },
            { id: "skills", label: "Skills", icon: "⚡" },
            { id: "achievements", label: "Awards", icon: "🏆" },
          ] as const).map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl transition-all ${
                activeTab === id ? "bg-[#00D26A] text-white shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
              style={{ fontWeight: 700, fontSize: "0.82rem" }}
            >
              <span className="hidden sm:inline">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-[#00D26A]/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#00D26A]" />
                </div>
                <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Skill Progress</h3>
              </div>
              <ResponsiveContainer width="100%" height={170}>
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="skillGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D26A" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00D26A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} domain={[40, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 10 }} />
                  <Area type="monotone" dataKey="score" stroke="#00D26A" strokeWidth={2.5} fill="url(#skillGrad)" dot={{ fill: "#00D26A", r: 4, strokeWidth: 2, stroke: "#fff" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-500" />
                </div>
                <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Quick Stats</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "AI Score", value: "847", max: 1000, color: "#00D26A" },
                  { label: "Win Rate", value: "67", max: 100, suffix: "%", color: "#3B82F6" },
                  { label: "Sessions/month", value: "9", max: 20, color: "#F59E0B" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-500" style={{ fontSize: "0.78rem" }}>{s.label}</span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: s.color }}>{s.value}{s.suffix || ""}</span>
                    </div>
                    <div className="bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${(parseInt(s.value) / s.max) * 100}%`, backgroundColor: s.color }} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-1 bg-violet-50 rounded-xl px-3 py-2 border border-violet-100">
                  <span className="text-gray-600" style={{ fontSize: "0.78rem" }}>Primary Sport</span>
                  <span className="text-violet-600" style={{ fontSize: "0.82rem", fontWeight: 700 }}>🎾 Tennis · NTRP 3.0</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    Body Metrics
                  </h3>
                </div>
                <span className="text-gray-400" style={{ fontSize: "0.72rem" }}>
                  Used by AI Coach for personalized suggestions
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { key: "heightCm", label: "Height", suffix: "cm", value: bodyMetrics.heightCm },
                  { key: "weightKg", label: "Weight", suffix: "kg", value: bodyMetrics.weightKg },
                  { key: "chestCm", label: "Chest", suffix: "cm", value: bodyMetrics.chestCm },
                  { key: "waistCm", label: "Waist", suffix: "cm", value: bodyMetrics.waistCm },
                  { key: "hipCm", label: "Hip", suffix: "cm", value: bodyMetrics.hipCm },
                  { key: "armSpanCm", label: "Arm Span", suffix: "cm", value: bodyMetrics.armSpanCm },
                ].map((field) => (
                  <label key={field.key} className="block">
                    <span className="text-gray-500 mb-1 block" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                      {field.label}
                    </span>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={field.value}
                        onChange={(e) =>
                          handleBodyMetricChange(field.key as keyof BodyMetrics, e.target.value)
                        }
                        placeholder="--"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-gray-800 focus:outline-none focus:border-[#00D26A]/40 focus:bg-white"
                        style={{ fontSize: "0.82rem", fontWeight: 600 }}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: "0.72rem" }}>
                        {field.suffix}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-amber-500" />
                  </div>
                  <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Recent Activity</h3>
                </div>
                <button onClick={() => setActiveTab("activities")} className="flex items-center gap-1 text-[#00D26A] hover:underline" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {allActivitiesDisplay.slice(0, 4).map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      const activityData = historyActivities.find(h => h.id === a.id) || a;
                      setSelectedActivity(activityData);
                      setShowActivityDetail(true);
                    }}
                    className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="h-20 overflow-hidden relative">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      {a.isNew && (
                        <span className="absolute top-1 right-1 bg-[#00D26A] text-black px-1 py-0.5 rounded-full" style={{ fontSize: "0.55rem", fontWeight: 700 }}>NEW</span>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="text-gray-800 truncate" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{a.title}</p>
                      <p className="text-gray-400 truncate" style={{ fontSize: "0.65rem" }}>{a.date}</p>
                      {a.score && <p className="text-[#00D26A]" style={{ fontSize: "0.65rem", fontWeight: 700 }}>AI: {a.score}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ACTIVITIES ── */}
        {activeTab === "activities" && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <div className="w-14 h-14 bg-[#00D26A]/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#00D26A]/20">
                <Activity className="w-7 h-7 text-[#00D26A]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  {totalActivities} Activities Total
                  {joinedActivities.length > 0 && (
                    <span className="ml-2 bg-[#00D26A]/10 text-[#00D26A] px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                      +{joinedActivities.length} new
                    </span>
                  )}
                </p>
                <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.75rem" }}>Your complete sports activity history</p>
              </div>
            </div>

            {/* Newly joined activities */}
            {joinedActivities.length > 0 && (
              <div>
                <h3 className="text-gray-700 mb-2 px-1" style={{ fontWeight: 700, fontSize: "0.85rem" }}>Recently Joined</h3>
                <div className="space-y-2">
                  {joinedActivities.map((a, i) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        setSelectedActivity({
                          ...a,
                          description: `Joined this exciting ${a.sport} activity! Looking forward to connecting with fellow enthusiasts and improving my skills.`,
                          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                          highlights: [`Level: ${a.level}`, `Location: ${a.location}`, "Confirmed participation"],
                          gallery: [a.image],
                        });
                        setShowActivityDetail(true);
                      }}
                      className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden flex items-center hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                        <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 px-4 py-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-gray-800 truncate" style={{ fontWeight: 600, fontSize: "0.88rem" }}>{a.title}</h3>
                            <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>
                              {a.joinedAt ? new Date(a.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently"} · {a.location}
                            </p>
                          </div>
                          <span className="bg-[#00D26A]/10 text-[#00D26A] px-2 py-0.5 rounded-full flex-shrink-0" style={{ fontSize: "0.68rem", fontWeight: 700 }}>
                            Joined ✓
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[#00D26A] capitalize" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                            {a.sport.charAt(0).toUpperCase() + a.sport.slice(1)}
                          </span>
                          <span className="text-gray-300">·</span>
                          <span className="text-gray-500" style={{ fontSize: "0.72rem" }}>{a.level}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 mr-4 flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Past history */}
            <div>
              {joinedActivities.length > 0 && (
                <h3 className="text-gray-700 mb-2 px-1" style={{ fontWeight: 700, fontSize: "0.85rem" }}>Past History</h3>
              )}
              <div className="space-y-3">
                {historyActivities.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => {
                      setSelectedActivity(a);
                      setShowActivityDetail(true);
                    }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-center hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 px-4 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-800 truncate" style={{ fontWeight: 600, fontSize: "0.88rem" }}>{a.title}</h3>
                          <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{a.date} · {a.duration}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 font-bold ${typeColor[a.type]}`}>
                          {a.type}
                        </span>
                      </div>
                      {a.score && (
                        <div className="mt-1.5 inline-flex items-center gap-1.5 bg-[#00D26A]/10 text-[#00D26A] px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                          <Activity className="w-3 h-3" /> AI Score: {a.score}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 mr-4 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SKILLS ── */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            {/* Overall radar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-gray-800 mb-1" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Overall Skill Radar</h3>
              <p className="text-gray-500 mb-3" style={{ fontSize: "0.75rem" }}>Aggregated across all sports</p>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Radar name="Skills" dataKey="A" stroke="#00D26A" fill="#00D26A" fillOpacity={0.15} strokeWidth={2.5} dot={{ fill: "#00D26A", r: 4 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Per-sport skill cards */}
            <h3 className="text-gray-700 px-1" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Sport-Specific Levels</h3>
            <div className="space-y-4">
              {sportSkills.map((sport, i) => (
                <motion.div
                  key={sport.sport}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl">
                        {sport.emoji}
                      </div>
                      <div>
                        <h4 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1rem" }}>{sport.sport}</h4>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full border text-xs font-bold mt-0.5 ${sport.levelColor}`}>
                          {sport.level}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p style={{ fontWeight: 900, fontSize: "1.75rem", lineHeight: 1, color: sport.color }}>
                        {sport.score}
                      </p>
                      <p className="text-gray-400" style={{ fontSize: "0.68rem" }}>/{sport.maxScore} {sport.ratingSystem}</p>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(sport.score / sport.maxScore) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: sport.color }}
                    />
                  </div>

                  {/* Sub-skills */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {sport.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600" style={{ fontSize: "0.78rem" }}>{skill.name}</span>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: sport.color }}>{skill.value}/100</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.value}%` }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                            className="h-1.5 rounded-full"
                            style={{ backgroundColor: sport.color, opacity: 0.7 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-gray-600" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                💡 <span className="text-gray-800" style={{ fontWeight: 600 }}>AI Tip:</span> Your Tennis NTRP 3.0 shows intermediate skills. Focus on volley (60/100) to reach 3.5 faster. For Basketball, improving shooting mechanics will advance you from Beginner to Intermediate.
              </p>
            </div>
          </div>
        )}

        {/* ── ACHIEVEMENTS ── */}
        {activeTab === "achievements" && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-amber-100">
                <Trophy className="w-7 h-7 text-amber-500" fill="currentColor" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <p className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>4 of 8 Earned</p>
                  <p className="text-amber-500" style={{ fontWeight: 700, fontSize: "0.85rem" }}>50%</p>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: "50%" }} />
                </div>
                <p className="text-gray-400 mt-1" style={{ fontSize: "0.7rem" }}>4 more achievements to unlock</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className={`bg-white rounded-2xl border shadow-sm p-4 transition-all ${
                    ach.earned ? "border-amber-100 hover:border-amber-200 hover:shadow-md" : "border-gray-100 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${ach.earned ? "bg-amber-50 border border-amber-100" : "bg-gray-50 border border-gray-100"}`}>
                      {ach.earned ? ach.icon : "🔒"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className={`${ach.earned ? "text-gray-800" : "text-gray-400"} truncate`} style={{ fontWeight: 700, fontSize: "0.88rem" }}>
                          {ach.title}
                        </h3>
                        {ach.earned && <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" />}
                      </div>
                      <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{ach.desc}</p>
                      {ach.earned ? (
                        <p className="text-amber-500 mt-1" style={{ fontSize: "0.68rem", fontWeight: 600 }}>Earned {ach.date}</p>
                      ) : (
                        <div className="mt-2">
                          {ach.progress !== undefined && ach.progress > 0 ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: `${ach.progress}%` }} />
                              </div>
                              <span className="text-gray-400" style={{ fontSize: "0.65rem" }}>{ach.progress}%</span>
                            </div>
                          ) : (
                            <p className="text-gray-300" style={{ fontSize: "0.68rem" }}>Not started</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── FOLLOWERS MODAL ── */}
      <AnimatePresence>
        {showFollowersModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowFollowersModal(false); }}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.1rem" }}>Followers</h2>
                  <p className="text-gray-500" style={{ fontSize: "0.78rem" }}>183 people follow you</p>
                </div>
                <button
                  onClick={() => setShowFollowersModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-4 space-y-3">
                {followers.map((follower, i) => (
                  <motion.div
                    key={follower.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <img src={follower.avatar} alt={follower.name} className="w-11 h-11 rounded-full border-2 border-gray-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 truncate" style={{ fontWeight: 700, fontSize: "0.88rem" }}>{follower.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{follower.handle}</p>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-500" style={{ fontSize: "0.72rem" }}>{follower.sport}</span>
                      </div>
                    </div>
                    {follower.mutual ? (
                      <button
                        onClick={() => {
                          setFollowedBack((prev) => {
                            const next = new Set(prev);
                            if (next.has(follower.id)) next.delete(follower.id);
                            else next.add(follower.id);
                            return next;
                          });
                        }}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all ${
                          followedBack.has(follower.id)
                            ? "bg-[#00D26A]/10 text-[#00D26A] border-[#00D26A]/20"
                            : "bg-white text-gray-600 border-gray-200 hover:border-[#00D26A]/30"
                        }`}
                        style={{ fontSize: "0.72rem", fontWeight: 700 }}
                      >
                        {followedBack.has(follower.id) ? (
                          <><UserCheck className="w-3 h-3" /> Following</>
                        ) : (
                          <><UserPlus className="w-3 h-3" /> Follow Back</>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setFollowedBack((prev) => {
                            const next = new Set(prev);
                            next.add(follower.id);
                            return next;
                          });
                        }}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all ${
                          followedBack.has(follower.id)
                            ? "bg-[#00D26A]/10 text-[#00D26A] border-[#00D26A]/20"
                            : "bg-[#00D26A] text-black border-[#00D26A]"
                        }`}
                        style={{ fontSize: "0.72rem", fontWeight: 700 }}
                      >
                        {followedBack.has(follower.id) ? (
                          <><UserCheck className="w-3 h-3" /> Following</>
                        ) : (
                          <><UserPlus className="w-3 h-3" /> Follow</>
                        )}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── EDIT PROFILE MODAL ── */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowEditModal(false); }}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.1rem" }}>Edit Profile</h2>
                <button onClick={() => setShowEditModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4"
                      className="w-20 h-20 rounded-2xl border-4 border-gray-100"
                      alt="Avatar"
                    />
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#00D26A] rounded-full border-2 border-white flex items-center justify-center shadow-md">
                      <Camera className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Profile Photo</p>
                    <button className="text-[#00D26A] hover:underline mt-0.5" style={{ fontSize: "0.78rem", fontWeight: 600 }}>Change photo</button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-gray-700 mb-1.5" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Display Name</label>
                  <input
                    value={editDraft.name}
                    onChange={(e) => setEditDraft((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10"
                    style={{ fontSize: "0.88rem" }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-1.5" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Email</label>
                  <input
                    type="email"
                    value={editDraft.email}
                    onChange={(e) => setEditDraft((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10"
                    style={{ fontSize: "0.88rem" }}
                  />
                </div>

                {/* Handle */}
                <div>
                  <label className="block text-gray-700 mb-1.5" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Username</label>
                  <input
                    value={editDraft.handle}
                    onChange={(e) => setEditDraft((prev) => ({ ...prev, handle: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10"
                    style={{ fontSize: "0.88rem" }}
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gray-700 mb-1.5" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={editDraft.location}
                      onChange={(e) => setEditDraft((prev) => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10"
                      style={{ fontSize: "0.88rem" }}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-gray-700 mb-1.5" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Personal Profile</label>
                  <textarea
                    value={editDraft.bio}
                    onChange={(e) => setEditDraft((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10 resize-none"
                    style={{ fontSize: "0.88rem" }}
                  />
                  <p className="text-gray-400 mt-1 text-right" style={{ fontSize: "0.72rem" }}>{editDraft.bio.length}/200</p>
                </div>

                {/* Sport Tags for Homepage */}
                <div>
                  <label className="block text-gray-700 mb-1.5" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Sport Tags for Homepage</label>
                  <p className="text-gray-500 mb-2" style={{ fontSize: "0.72rem" }}>Select up to 3 tags to display on your profile</p>
                  <div className="flex gap-2 flex-wrap">
                    {editDraft.sports.map((sport) => {
                      const isSelected = editDraft.displayedSportTags.includes(sport);
                      return (
                        <button
                          key={sport}
                          onClick={() => {
                            if (isSelected) {
                              setEditDraft((prev) => ({
                                ...prev,
                                displayedSportTags: prev.displayedSportTags.filter((s) => s !== sport),
                              }));
                            } else if (editDraft.displayedSportTags.length < 3) {
                              setEditDraft((prev) => ({
                                ...prev,
                                displayedSportTags: [...prev.displayedSportTags, sport],
                              }));
                            }
                          }}
                          className={`px-3 py-1.5 rounded-full border transition-all ${
                            isSelected
                              ? "bg-[#00D26A]/10 text-[#00D26A] border-[#00D26A]/30"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}
                          style={{ fontSize: "0.78rem", fontWeight: 600 }}
                        >
                          {sport}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-gray-400 mt-2" style={{ fontSize: "0.7rem" }}>
                    {editDraft.displayedSportTags.length}/3 selected
                  </p>
                </div>

                {/* Favorite Sports */}
                <div>
                  <label className="block text-gray-700 mb-1.5" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Favorite Sports</label>
                  <p className="text-gray-500 mb-2" style={{ fontSize: "0.72rem" }}>Select all sports you enjoy</p>
                  <div className="flex gap-2 flex-wrap">
                    {["🎾 Tennis", "🏀 Basketball", "🏃 Running", "🏊 Swimming", "🧘 Yoga", "⛳ Golf", "⚽ Soccer", "🚴 Cycling"].map((sport) => {
                      const isSelected = editDraft.sports.includes(sport);
                      return (
                        <button
                          key={sport}
                          onClick={() => {
                            const newSports = isSelected
                              ? editDraft.sports.filter((s) => s !== sport)
                              : [...editDraft.sports, sport];

                            setEditDraft((prev) => ({
                              ...prev,
                              sports: newSports,
                              displayedSportTags: prev.displayedSportTags.filter((tag) => newSports.includes(tag)),
                            }));
                          }}
                          className={`px-3 py-1.5 rounded-full border transition-all ${
                            isSelected
                              ? "bg-[#00D26A]/10 text-[#00D26A] border-[#00D26A]/30"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}
                          style={{ fontSize: "0.78rem", fontWeight: 600 }}
                        >
                          {sport}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Save button */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                    style={{ fontWeight: 600, fontSize: "0.9rem" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 py-3 rounded-xl bg-[#00D26A] text-black hover:bg-[#00C060] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#00D26A]/20"
                    style={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FOLLOWING MODAL ── */}
      <AnimatePresence>
        {showFollowingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowFollowingModal(false); }}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.1rem" }}>Following</h2>
                  <p className="text-gray-500" style={{ fontSize: "0.78rem" }}>97 people you follow</p>
                </div>
                <button
                  onClick={() => setShowFollowingModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-4 space-y-3">
                {following.map((user, i) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <img src={user.avatar} alt={user.name} className="w-11 h-11 rounded-full border-2 border-gray-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 truncate" style={{ fontWeight: 700, fontSize: "0.88rem" }}>{user.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{user.handle}</p>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-500" style={{ fontSize: "0.72rem" }}>{user.sport}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFollowingUsers((prev) => {
                          const next = new Set(prev);
                          if (next.has(user.id)) {
                            next.delete(user.id);
                          } else {
                            next.add(user.id);
                          }
                          return next;
                        });
                      }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all ${
                        followingUsers.has(user.id)
                          ? "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          : "bg-[#00D26A] text-black border-[#00D26A] hover:bg-[#00B85E]"
                      }`}
                      style={{ fontSize: "0.72rem", fontWeight: 700 }}
                    >
                      {followingUsers.has(user.id) ? (
                        <>Following</>
                      ) : (
                        <><UserPlus className="w-3 h-3" /> Follow</>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SHARE PROFILE MODAL ── */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowShareModal(false); }}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.1rem" }}>Share Profile</h2>
                  <p className="text-gray-500" style={{ fontSize: "0.78rem" }}>Share your sports profile</p>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 hover:border-gray-300 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-[#00D26A]/30 transition-colors">
                    <Link2 className="w-5 h-5 text-gray-600 group-hover:text-[#00D26A] transition-colors" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.88rem" }}>Copy Link</p>
                    <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>Share your profile URL</p>
                  </div>
                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-[#00D26A] transition-colors" />
                </button>

                {/* Social Platforms */}
                <div>
                  <p className="text-gray-500 mb-3 px-1" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Share to social media</p>
                  <div className="grid grid-cols-4 gap-3">
                    {socialPlatforms.map((platform, i) => (
                      <motion.button
                        key={platform.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={platform.action}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                      >
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                          {platform.icon}
                        </div>
                        <p className="text-gray-700 text-center leading-tight" style={{ fontSize: "0.68rem", fontWeight: 600 }}>
                          {platform.name}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ACTIVITY DETAIL MODAL ── */}
      <AnimatePresence>
        {showActivityDetail && selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowActivityDetail(false); }}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-gray-900 truncate" style={{ fontWeight: 800, fontSize: "1.2rem" }}>
                      {selectedActivity.title}
                    </h2>
                    {selectedActivity.type && (
                      <span className={`px-2 py-0.5 rounded-full flex-shrink-0 ${typeColor[selectedActivity.type]}`} style={{ fontSize: "0.68rem", fontWeight: 700 }}>
                        {selectedActivity.type}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-gray-500" style={{ fontSize: "0.78rem" }}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedActivity.date}
                    </div>
                    {selectedActivity.duration && (
                      <>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {selectedActivity.duration}
                        </div>
                      </>
                    )}
                    {selectedActivity.score && (
                      <>
                        <span>·</span>
                        <div className="flex items-center gap-1 text-[#00D26A]" style={{ fontWeight: 700 }}>
                          <Activity className="w-3.5 h-3.5" />
                          AI: {selectedActivity.score}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowActivityDetail(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0 ml-3"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 p-5 space-y-5">
                {/* Video Section - Only for AI Sessions */}
                {selectedActivity.type === "AI Session" && selectedActivity.videoUrl && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Play className="w-4 h-4 text-[#00D26A]" />
                      <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>AI Analysis Video</h3>
                    </div>
                    <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video shadow-lg">
                      <iframe
                        src={`${selectedActivity.videoUrl}?rel=0&modestbranding=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title="AI Analysis Video"
                        frameBorder="0"
                      />
                    </div>
                  </div>
                )}

                {/* ── AI ANALYSIS REPORT ── */}
                {selectedActivity.type === "AI Session" && selectedActivity.aiReport && (() => {
                  const report = selectedActivity.aiReport;
                  const statusMeta = (status: string) => {
                    if (status === "excellent") return { color: "#10B981", bg: "bg-emerald-50 text-emerald-700", label: "Excellent" };
                    if (status === "good") return { color: "#3B82F6", bg: "bg-blue-50 text-blue-700", label: "Good" };
                    if (status === "moderate") return { color: "#F59E0B", bg: "bg-amber-50 text-amber-700", label: "Moderate" };
                    return { color: "#EF4444", bg: "bg-red-50 text-red-700", label: "Weak" };
                  };
                  const severityMeta = (sev: string) => {
                    if (sev === "high") return { ring: "border-red-200 bg-red-50", dot: "bg-red-500", text: "text-red-700", badge: "bg-red-100 text-red-600" };
                    if (sev === "medium") return { ring: "border-amber-200 bg-amber-50", dot: "bg-amber-500", text: "text-amber-700", badge: "bg-amber-100 text-amber-600" };
                    return { ring: "border-blue-200 bg-blue-50", dot: "bg-blue-400", text: "text-blue-700", badge: "bg-blue-100 text-blue-600" };
                  };
                  return (
                    <div className="space-y-4">
                      {/* Report Header */}
                      <div className="bg-gradient-to-br from-violet-50 via-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-6 h-6 bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <BarChart3 className="w-3.5 h-3.5 text-white" />
                              </div>
                              <h3 className="text-gray-900" style={{ fontWeight: 800, fontSize: "0.95rem" }}>AI Analysis Report</h3>
                              <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 700 }}>🤖 MoveMatch AI</span>
                            </div>
                            <p className="text-gray-500 leading-snug" style={{ fontSize: "0.75rem" }}>{report.sessionSummary}</p>
                          </div>
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-white border-4 border-violet-300 flex flex-col items-center justify-center shadow-md">
                              <span className="text-violet-700" style={{ fontWeight: 900, fontSize: "1.1rem", lineHeight: 1 }}>{report.grade}</span>
                            </div>
                            <p className="text-violet-600 mt-1" style={{ fontSize: "0.65rem", fontWeight: 700 }}>{report.overallScore}/100</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 bg-white/60 rounded-full h-2.5 overflow-hidden">
                            <div className="h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${report.overallScore}%` }} />
                          </div>
                          <span className="text-violet-700" style={{ fontSize: "0.72rem", fontWeight: 700 }}>{report.overallScore}%</span>
                        </div>
                      </div>

                      {/* Performance Breakdown */}
                      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                        <h4 className="text-gray-800 mb-3" style={{ fontWeight: 700, fontSize: "0.85rem" }}>📊 Performance Breakdown</h4>
                        <div className="space-y-3">
                          {report.breakdown.map((item: any, idx: number) => {
                            const meta = statusMeta(item.status);
                            return (
                              <div key={idx}>
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <span className="text-gray-700 truncate" style={{ fontSize: "0.8rem" }}>{item.name}</span>
                                    <span className={`px-1.5 py-0.5 rounded-full capitalize flex-shrink-0 ${meta.bg}`} style={{ fontSize: "0.58rem", fontWeight: 700 }}>{meta.label}</span>
                                  </div>
                                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                                    <span className="text-gray-400" style={{ fontSize: "0.68rem" }}>{item.note}</span>
                                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: meta.color, minWidth: 28, textAlign: "right" }}>{item.value}</span>
                                  </div>
                                </div>
                                <div className="bg-gray-100 rounded-full h-1.5">
                                  <div className="h-1.5 rounded-full" style={{ width: `${item.value}%`, backgroundColor: meta.color, transition: "width 0.6s ease" }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div>
                        <h4 className="text-gray-800 mb-2" style={{ fontWeight: 700, fontSize: "0.85rem" }}>📐 Key Metrics</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {report.keyMetrics.map((m: any, idx: number) => (
                            <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                              <p className="text-gray-400" style={{ fontSize: "0.67rem" }}>{m.label}</p>
                              <p className="text-gray-900" style={{ fontSize: "1.05rem", fontWeight: 900, lineHeight: 1.2 }}>{m.value}</p>
                              <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.63rem" }}>{m.sub}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Zone Accuracy — Basketball only */}
                      {report.zoneData && (
                        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                          <h4 className="text-gray-800 mb-3" style={{ fontWeight: 700, fontSize: "0.85rem" }}>🏀 Shot Zone Accuracy</h4>
                          <div className="space-y-2">
                            {report.zoneData.map((z: any, idx: number) => {
                              const zColor = z.pct >= 75 ? "#10B981" : z.pct >= 65 ? "#3B82F6" : z.pct >= 55 ? "#F59E0B" : "#EF4444";
                              const zLabel = z.pct >= 75 ? "Hot" : z.pct >= 65 ? "Good" : z.pct >= 55 ? "Avg" : "Weak";
                              return (
                                <div key={idx}>
                                  <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-gray-600" style={{ fontSize: "0.75rem" }}>{z.zone}</span>
                                    <div className="flex items-center gap-1.5">
                                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: zColor }}>{zLabel}</span>
                                      <span style={{ fontSize: "0.78rem", fontWeight: 800, color: zColor }}>{z.pct}%</span>
                                    </div>
                                  </div>
                                  <div className="bg-gray-100 rounded-full h-1.5">
                                    <div className="h-1.5 rounded-full" style={{ width: `${z.pct}%`, backgroundColor: zColor }} />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Identified Faults */}
                      <div>
                        <h4 className="text-gray-800 mb-2" style={{ fontWeight: 700, fontSize: "0.85rem" }}>⚠️ Identified Issues</h4>
                        <div className="space-y-2">
                          {report.faults.map((fault: any, idx: number) => {
                            const sm = severityMeta(fault.severity);
                            return (
                              <div key={idx} className={`border rounded-xl p-3.5 ${sm.ring}`}>
                                <div className="flex items-center gap-2 mb-1.5">
                                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${sm.dot}`} />
                                  <span className={`flex-1 ${sm.text}`} style={{ fontWeight: 700, fontSize: "0.82rem" }}>{fault.issue}</span>
                                  <span className={`px-2 py-0.5 rounded-full uppercase flex-shrink-0 ${sm.badge}`} style={{ fontSize: "0.58rem", fontWeight: 800 }}>{fault.severity}</span>
                                </div>
                                <p className="text-gray-600 leading-snug ml-4" style={{ fontSize: "0.77rem" }}>{fault.detail}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Weekly Training Plan */}
                      <div>
                        <h4 className="text-gray-800 mb-2" style={{ fontWeight: 700, fontSize: "0.85rem" }}>📅 {report.weeklyPlan.length}-Week Training Plan</h4>
                        <div className="space-y-2">
                          {report.weeklyPlan.map((w: any, wIdx: number) => (
                            <div key={wIdx} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                              <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                                <div className="w-8 h-8 rounded-full bg-[#00D26A]/10 border border-[#00D26A]/25 flex items-center justify-center flex-shrink-0">
                                  <span className="text-[#00D26A]" style={{ fontSize: "0.68rem", fontWeight: 900 }}>W{w.week}</span>
                                </div>
                                <p className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.82rem" }}>{w.focus}</p>
                              </div>
                              <div className="px-4 py-3 space-y-1.5">
                                {w.tasks.map((task: string, ti: number) => (
                                  <div key={ti} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D26A] mt-1.5 flex-shrink-0" />
                                    <p className="text-gray-600" style={{ fontSize: "0.78rem" }}>{task}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 bg-[#00D26A]/5 border border-[#00D26A]/20 rounded-xl px-4 py-3 flex items-start gap-2">
                          <span style={{ fontSize: "1rem" }}>💡</span>
                          <p className="text-gray-600" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                            <span className="text-gray-800" style={{ fontWeight: 700 }}>AI Recommendation: </span>
                            Follow this plan consistently and schedule a re-analysis session after Week {report.weeklyPlan.length} to measure your improvement vs. this baseline.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Description */}
                {selectedActivity.description && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Description</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed" style={{ fontSize: "0.88rem" }}>
                      {selectedActivity.description}
                    </p>
                  </div>
                )}

                {/* Highlights */}
                {selectedActivity.highlights && selectedActivity.highlights.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-amber-500" />
                      <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Highlights</h3>
                    </div>
                    <div className="space-y-2">
                      {selectedActivity.highlights.map((highlight: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                          <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" />
                          <p className="text-gray-700" style={{ fontSize: "0.85rem" }}>{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photo Gallery */}
                {selectedActivity.gallery && selectedActivity.gallery.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon className="w-4 h-4 text-violet-500" />
                      <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Photo Gallery</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedActivity.gallery.map((photo: string, idx: number) => (
                        <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow">
                          <img src={photo} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* User Reviews */}
                {selectedActivity.reviews && selectedActivity.reviews.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>User Reviews</h3>
                      <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>({selectedActivity.reviews.length})</span>
                    </div>
                    <div className="space-y-3">
                      {selectedActivity.reviews.map((review: any) => (
                        <div key={review.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                          <div className="flex items-start gap-3 mb-2">
                            <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <p className="text-gray-800 truncate" style={{ fontWeight: 700, fontSize: "0.85rem" }}>{review.user}</p>
                                <div className="flex items-center gap-0.5 flex-shrink-0">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3.5 h-3.5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-500 mb-2" style={{ fontSize: "0.7rem" }}>{review.date}</p>
                              <p className="text-gray-700 leading-relaxed" style={{ fontSize: "0.82rem" }}>
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sport Tag */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <span className="text-gray-500" style={{ fontSize: "0.78rem" }}>Sport:</span>
                  <span className="px-3 py-1 bg-[#00D26A]/10 text-[#00D26A] rounded-full border border-[#00D26A]/20" style={{ fontSize: "0.78rem", fontWeight: 700 }}>
                    {selectedActivity.sport}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── COVER IMAGE EDIT MODAL ── */}
      <AnimatePresence>
        {showCoverModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowCoverModal(false); }}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.1rem" }}>Change Cover Image</h2>
                  <p className="text-gray-500" style={{ fontSize: "0.78rem" }}>Choose a gradient or photo for your profile cover</p>
                </div>
                <button
                  onClick={() => setShowCoverModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 p-5 space-y-5">
                {/* Current Preview */}
                <div>
                  <p className="text-gray-700 mb-3" style={{ fontSize: "0.82rem", fontWeight: 700 }}>Current Cover</p>
                  <div
                    className={`h-32 rounded-xl overflow-hidden border-2 border-gray-200 ${
                      coverImage.type === "gradient" ? `bg-gradient-to-br ${coverImage.value}` : ""
                    }`}
                    style={coverImage.type === "image" ? {
                      backgroundImage: `url(${coverImage.value})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    } : {}}
                  >
                    {coverImage.type === "gradient" && (
                      <div className="h-full w-full opacity-20" style={{
                        backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }} />
                    )}
                  </div>
                </div>

                {/* Gradient Options */}
                <div>
                  <p className="text-gray-700 mb-3" style={{ fontSize: "0.82rem", fontWeight: 700 }}>Gradient Covers</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {coverPresets.filter(p => p.type === "gradient").map((preset, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          setCoverImage({ type: preset.type, value: preset.value });
                          toast.success(`Cover changed to ${preset.name}`);
                          setShowCoverModal(false);
                        }}
                        className={`h-24 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                          coverImage.type === "gradient" && coverImage.value === preset.value
                            ? "border-[#00D26A] ring-2 ring-[#00D26A]/20"
                            : "border-gray-200 hover:border-gray-300"
                        } bg-gradient-to-br ${preset.value} relative group`}
                      >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-left drop-shadow-lg" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                            {preset.name}
                          </p>
                        </div>
                        {coverImage.type === "gradient" && coverImage.value === preset.value && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-[#00D26A] rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" fill="currentColor" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Photo Options */}
                <div>
                  <p className="text-gray-700 mb-3" style={{ fontSize: "0.82rem", fontWeight: 700 }}>Photo Covers</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {coverPresets.filter(p => p.type === "image").map((preset, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          setCoverImage({ type: preset.type, value: preset.value });
                          toast.success(`Cover changed to ${preset.name}`);
                          setShowCoverModal(false);
                        }}
                        className={`h-24 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                          coverImage.type === "image" && coverImage.value === preset.value
                            ? "border-[#00D26A] ring-2 ring-[#00D26A]/20"
                            : "border-gray-200 hover:border-gray-300"
                        } relative group`}
                        style={{
                          backgroundImage: `url(${preset.value})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                      >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-left drop-shadow-lg" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                            {preset.name}
                          </p>
                        </div>
                        {coverImage.type === "image" && coverImage.value === preset.value && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-[#00D26A] rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" fill="currentColor" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Upload Custom */}
                <div className="pt-3 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all">
                    <Camera className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Upload Custom Image</span>
                  </button>
                  <p className="text-gray-400 text-center mt-2" style={{ fontSize: "0.7rem" }}>Recommended: 1200x400px, max 5MB</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
