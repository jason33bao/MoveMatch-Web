import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Users,
  MapPin,
  Calendar,
  ChevronRight,
  Star,
  Award,
  Clock,
  TrendingUp,
  Crown,
  Medal,
  Zap,
  Shield,
  CheckCircle,
  Flame,
  X,
  Info,
  User,
  Mail,
  Phone,
  CreditCard,
  FileText,
  List,
  Gift,
  CalendarDays,
  Building2,
  AlertCircle,
  UserMinus,
  Navigation,
  Car,
  ClipboardList,
  Target,
  Flag,
  BarChart2,
} from "lucide-react";

const trophyImg =
  "https://images.unsplash.com/photo-1762345127396-ac4a970436c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB0cm9waHklMjBhd2FyZCUyMGNvbXBldGl0aW9uJTIwd2lubmVyfGVufDF8fHx8MTc3NDk1MDY2OXww&ixlib=rb-4.1.0&q=80&w=1080";
const runningImg =
  "https://images.unsplash.com/photo-1758586326115-d4e9052b8f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwbWFyYXRob24lMjByYWNlJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc0OTUwNjU5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const tennisImg =
  "https://images.unsplash.com/photo-1761286753856-2f39b4413c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBjb3VydCUyMGFjdGlvbnxlbnwxfHx8fDE3NzQ5NTA2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const soccerImg =
  "https://images.unsplash.com/photo-1549923015-badf41b04831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMG1hdGNoJTIwc3RhZGl1bXxlbnwxfHx8fDE3NzQ5NTA2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const basketballChallengeImg =
  "https://images.unsplash.com/photo-1770042572491-0c3f1ca7d6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwdXJiYW4lMjBzdHJlZXQlMjBzcG9ydHxlbnwxfHx8fDE3NzQ5NTA2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const yogaImg =
  "https://images.unsplash.com/photo-1666043428335-9278302bdd36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwZmxleGliaWxpdHklMjBjaGFsbGVuZ2UlMjBmaXRuZXNzfGVufDF8fHx8MTc3NTk4MTc0Mnww&ixlib=rb-4.1.0&q=80&w=1080";
const tennisMatchImg =
  "https://images.unsplash.com/photo-1766255604833-6920695481e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBtYXRjaCUyMGNvdXJ0JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTgxNzQyfDA&ixlib=rb-4.1.0&q=80&w=1080";
const cyclingImg =
  "https://images.unsplash.com/photo-1525284837422-f027637f3ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaW5nJTIwcmFjZSUyMGdyYW5kJTIwcHJpeCUyMHNwb3J0fGVufDF8fHx8MTc3NTk4MTc0M3ww&ixlib=rb-4.1.0&q=80&w=1080";
const swimmingImg =
  "https://images.unsplash.com/photo-1560090970-feef7ff6e339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMGNoYW1waW9uc2hpcCUyMHBvb2wlMjByYWNlfGVufDF8fHx8MTc3NTk4MTc0NHww&ixlib=rb-4.1.0&q=80&w=1080";
const basketballTourneyImg =
  "https://images.unsplash.com/photo-1775362914221-20ab89370042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwM3gzJTIwc3RyZWV0YmFsbCUyMHVyYmFufGVufDF8fHx8MTc3NTk4MTc0M3ww&ixlib=rb-4.1.0&q=80&w=1080";
const crossfitImg =
  "https://images.unsplash.com/photo-1758875569612-94d5e0f1a35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9zc2ZpdCUyMHdvcmtvdXQlMjBjaGFsbGVuZ2UlMjBneW0lMjBhdGhsZXRlfGVufDF8fHx8MTc3NTk4MTc0OHww&ixlib=rb-4.1.0&q=80&w=1080";

// ─── Mock logged-in user ───────────────────────────────────────────
const currentUser = {
  name: "Alex Chen",
  email: "alex.chen@movematch.io",
  phone: "+1 (555) 234-5678",
  skillLevel: "Intermediate",
  memberSince: "Jan 2024",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexChen&backgroundColor=b6e3f4",
  wins: 12,
  sport: "Tennis",
};

// ─── Dynamic days-left helper ──────────────────────────────────────
function calcDaysLeft(endDateStr: string): number {
  const end = new Date(endDateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

type TabType = "upcoming" | "leaderboard" | "myTournaments";

// ─── Challenges ────────────────────────────────────────────────────
const challengesBase = [
  {
    id: 1,
    title: "30-Day Sprint Challenge",
    creator: "Nike Run Club",
    baseParticipants: 2847,
    prize: "$500",
    endDate: "2026-05-12",
    type: "Official",
    image: runningImg,
    description:
      "Push your limits with Nike Run Club's signature 30-day sprint program. Log daily runs, hit pace targets, and compete on the global leaderboard. All distances count — every step brings you closer to the prize.",
    rules: [
      "Log at least one run per day to stay active",
      "Minimum 1km per session to qualify",
      "GPS tracking required via any fitness app",
      "Final score = total distance × average pace score",
    ],
    prizes: ["🥇 $500 cash", "🥈 $200 Nike gift card", "🥉 $100 Nike gift card", "Top 10: Exclusive Nike merch kit"],
    format: "Individual · Distance-based leaderboard · 30 days",
  },
  {
    id: 2,
    title: "Basketball Trick Shot",
    creator: "HoopKing",
    baseParticipants: 1203,
    prize: "Merch Bundle",
    endDate: "2026-05-01",
    type: "Trending",
    image: basketballChallengeImg,
    description:
      "Show off your most creative, jaw-dropping trick shots! Submit a short video clip of your best shot. Community votes + judge panel decide the winner. From half-court bombs to blindfolded layups — anything goes.",
    rules: [
      "Submit one video per entry (max 60 seconds)",
      "Shot must be from at least 5 meters away",
      "No video editing tricks — real shots only",
      "Must use a regulation basketball",
    ],
    prizes: ["🥇 Full HoopKing Merch Bundle (est. $300)", "🥈 HoopKing Pro Jersey", "🥉 Signed basketball"],
    format: "Video submission · Public voting + judges · 3 rounds",
  },
  {
    id: 3,
    title: "Summer Swim Marathon",
    creator: "AquaSports Pro",
    baseParticipants: 856,
    prize: "$200",
    endDate: "2026-04-27",
    type: "Trending",
    image: swimmingImg,
    description:
      "Dive into summer early with AquaSports Pro's open-water swimming challenge. Track your laps, open-water swims, and pool sessions. Longest cumulative distance in 2 weeks wins. Beginners and pros welcome.",
    rules: [
      "All swimming styles count (freestyle, breaststroke, etc.)",
      "Pool, lake, and ocean swims all qualify",
      "Verified via fitness tracker or coach sign-off",
      "Minimum 500m per logged session",
    ],
    prizes: ["🥇 $200 cash", "🥈 AquaSports Pro swim kit", "🥉 $50 store credit"],
    format: "Individual · Cumulative distance · 15 days",
  },
  {
    id: 4,
    title: "Yoga Flexibility Master",
    creator: "MindBody Studio",
    baseParticipants: 1540,
    prize: "$300 + Gear",
    endDate: "2026-05-20",
    type: "Official",
    image: yogaImg,
    description:
      "Challenge your body and mind with our 21-day flexibility program. Submit daily pose videos, earn points from certified yoga judges, and climb the global flexibility leaderboard. Suitable for all levels.",
    rules: [
      "Submit one video per day showing your best pose",
      "Each pose scored 1–10 by certified judges",
      "Minimum 15 days of submissions to qualify for prizes",
      "Original music or no music only — no copyrighted tracks",
    ],
    prizes: ["🥇 $300 cash + premium yoga gear set", "🥈 MindBody Studio 6-month subscription", "🥉 $75 store credit + mat"],
    format: "Individual · Judge-scored · 21 days",
  },
  {
    id: 5,
    title: "Tennis Ace Blitz",
    creator: "CourtMasters",
    baseParticipants: 672,
    prize: "$250 + Racket",
    endDate: "2026-04-22",
    type: "Trending",
    image: tennisMatchImg,
    description:
      "Fastest serve, sharpest volleys — who reigns supreme on the court? Submit clips of your best serves and winning rally moments. CourtMasters judges score your technique, speed, and placement accuracy.",
    rules: [
      "Submit up to 3 video clips per entry (max 90 seconds each)",
      "Clips must be filmed from a clear angle showing full court",
      "Only regulation tennis balls and rackets allowed",
      "Scored on speed, accuracy, and technique",
    ],
    prizes: ["🥇 $250 cash + Pro Babolat racket", "🥈 CourtMasters training kit", "🥉 $50 gear voucher"],
    format: "Video submission · Expert judging · 10 days",
  },
];

// ─── Tournaments ───────────────────────────────────────────────────
const tournamentsBase = [
  {
    id: 1,
    title: "City Tennis Open 2026",
    sport: "Tennis",
    emoji: "🎾",
    type: "Singles",
    level: "Intermediate",
    image: tennisImg,
    prize: "$2,500",
    baseParticipants: 32,
    maxParticipants: 64,
    location: "City Tennis Complex",
    date: "Apr 28–May 3, 2026",
    registrationEnd: "Apr 25",
    organizer: "City Sports Federation",
    status: "Registration Open",
    rounds: ["Quarters", "Semis", "Finals"],
    entryFee: 25,
    sponsors: ["Nike", "Wilson"],
    description:
      "The premier annual tennis event for intermediate players in the city. Compete in structured singles brackets across 5 days on our professional clay courts.",
    schedule: [
      { phase: "Check-in & Draw", date: "Apr 28, 8:00 AM" },
      { phase: "Round of 64", date: "Apr 28–29" },
      { phase: "Quarterfinals", date: "Apr 30–May 1" },
      { phase: "Semifinals", date: "May 2, 10:00 AM" },
      { phase: "Grand Final", date: "May 3, 2:00 PM" },
    ],
    rules: [
      "Best of 3 sets, tie-break at 6-6 in all sets",
      "USTA intermediate rating (3.0–4.0) required",
      "Own racket required; balls provided",
      "No coaching during match play",
    ],
    prizeBreakdown: ["🥇 Winner: $1,500", "🥈 Runner-up: $600", "🥉 Semifinalists: $200 each"],
    facilities: "6 clay courts, locker rooms, pro shop, café",
    contact: "citytennis@sportsfedn.org",
  },
  {
    id: 2,
    title: "Summer Run Festival 10K",
    sport: "Running",
    emoji: "🏃",
    type: "Individual",
    level: "All Levels",
    image: runningImg,
    prize: "$800 + Medals",
    baseParticipants: 214,
    maxParticipants: 600,
    location: "Riverside Park Boulevard",
    date: "May 10, 2026",
    registrationEnd: "May 5",
    organizer: "Park Run Club",
    status: "Registration Open",
    rounds: ["Race"],
    entryFee: 20,
    sponsors: ["Adidas", "Gatorade"],
    description:
      "A scenic 10K road race through Riverside Park Boulevard. Chip-timed, flat course, and open to all paces. Finisher medal and race t-shirt for every participant.",
    schedule: [
      { phase: "Bib Pickup & Check-in", date: "May 10, 7:00 AM" },
      { phase: "Warm-up Ceremony", date: "May 10, 8:30 AM" },
      { phase: "Race Start", date: "May 10, 9:00 AM" },
      { phase: "Awards Ceremony", date: "May 10, 11:00 AM" },
    ],
    rules: [
      "Must stay on designated course",
      "Chip timing — must wear provided bib",
      "No pets or bikes on course during race",
      "Minimum age: 14 years old",
    ],
    prizeBreakdown: [
      "🥇 Overall Winner: $400",
      "🥈 2nd Place: $250",
      "🥉 3rd Place: $150",
      "All finishers: Medal + race t-shirt",
    ],
    facilities: "Flat certified course, water stations every 2km, medical team on site",
    contact: "hello@parkrunclub.org",
  },
  {
    id: 3,
    title: "5v5 Soccer League",
    sport: "Soccer",
    emoji: "⚽",
    type: "Team",
    level: "Intermediate",
    image: soccerImg,
    prize: "Trophy + Jerseys",
    baseParticipants: 9,
    maxParticipants: 12,
    location: "FC United Sports Complex",
    date: "May 3–31, 2026",
    registrationEnd: "Apr 30",
    organizer: "FC United",
    status: "Almost Full",
    rounds: ["Group Stage", "Knockouts", "Final"],
    entryFee: 60,
    sponsors: [],
    description:
      "A month-long 5v5 indoor soccer league for intermediate teams. Register as a full team of 5–7 players. Custom jerseys provided for all registered teams.",
    schedule: [
      { phase: "Team Check-in & Draw", date: "May 3, 10:00 AM" },
      { phase: "Group Stage Matches", date: "May 3–17 (weekends)" },
      { phase: "Quarterfinals", date: "May 20–21" },
      { phase: "Semifinals", date: "May 27" },
      { phase: "Grand Final", date: "May 31, 4:00 PM" },
    ],
    rules: [
      "Teams must register with 5–7 players",
      "Each match is 2×20 min halves",
      "No slide tackles on turf surface",
      "Minimum 3 players required to avoid forfeit",
    ],
    prizeBreakdown: ["🏆 Champions: Trophy + Custom Jerseys + $300 team voucher", "🥈 Runners-up: Medals + FC United kit"],
    facilities: "Indoor turf pitch, team benches, changing rooms, live score updates",
    contact: "league@fcunited.sport",
  },
  {
    id: 4,
    title: "Basketball 3×3 Open",
    sport: "Basketball",
    emoji: "🏀",
    type: "Team (3v3)",
    level: "All Levels",
    image: basketballTourneyImg,
    prize: "$1,200 + Trophies",
    baseParticipants: 18,
    maxParticipants: 32,
    location: "Downtown Arena Courts",
    date: "May 17–18, 2026",
    registrationEnd: "May 10",
    organizer: "HoopCity League",
    status: "Registration Open",
    rounds: ["Pool Play", "Knockouts", "Final"],
    entryFee: 40,
    sponsors: ["Jordan Brand", "Gatorade"],
    description:
      "The city's biggest 3×3 basketball tournament returns! Register a team of 3–4 players and compete across two action-packed days on outdoor courts in Downtown Arena. Fast-paced, high-energy, winner-takes-all format.",
    schedule: [
      { phase: "Team Registration & Court Draw", date: "May 17, 9:00 AM" },
      { phase: "Pool Stage Games", date: "May 17, 10:00 AM – 6:00 PM" },
      { phase: "Knockout Rounds", date: "May 18, 9:00 AM" },
      { phase: "Final & Awards", date: "May 18, 4:00 PM" },
    ],
    rules: [
      "Teams of 3 players + 1 substitute max",
      "Games are played to 21 points (2-point shots, 1-point inside arc)",
      "12-minute time cap per game",
      "FIBA 3×3 officiating rules apply",
    ],
    prizeBreakdown: ["🥇 Champions: $600 + Trophies per player", "🥈 Runners-up: $350 + Medals", "🥉 3rd Place: $250"],
    facilities: "4 outdoor courts, scoreboard, live DJ, food stalls",
    contact: "info@hoopcityleague.com",
  },
  {
    id: 5,
    title: "Aqua Sprint Championship",
    sport: "Swimming",
    emoji: "🏊",
    type: "Individual",
    level: "Competitive",
    image: swimmingImg,
    prize: "$3,000",
    baseParticipants: 41,
    maxParticipants: 80,
    location: "Olympic Aquatic Centre",
    date: "Jun 7–8, 2026",
    registrationEnd: "May 28",
    organizer: "AquaFed Regional",
    status: "Registration Open",
    rounds: ["Heats", "Semis", "Finals"],
    entryFee: 35,
    sponsors: ["Speedo", "Arena"],
    description:
      "Regional competitive swimming championship featuring 50m, 100m, and 200m freestyle and butterfly events. Sanctioned by AquaFed — results count toward regional rankings.",
    schedule: [
      { phase: "Warm-up & Officials Briefing", date: "Jun 7, 7:30 AM" },
      { phase: "Heats — All Events", date: "Jun 7, 9:00 AM – 5:00 PM" },
      { phase: "Semifinals", date: "Jun 8, 9:00 AM" },
      { phase: "Finals & Medal Ceremony", date: "Jun 8, 2:00 PM" },
    ],
    rules: [
      "FINA competition swimwear regulations apply",
      "False start = immediate disqualification",
      "Each athlete may enter up to 3 events",
      "Qualifying times required for 100m & 200m events",
    ],
    prizeBreakdown: ["🥇 Per-event Winner: $300", "🥈 Per-event Runner-up: $150", "🥉 3rd Place: $75", "Overall MVP: $500 bonus"],
    facilities: "50m Olympic pool, electronic timing, live leaderboard, spectator stands",
    contact: "events@aquafedregional.org",
  },
  {
    id: 6,
    title: "Cycling Grand Prix",
    sport: "Cycling",
    emoji: "🚴",
    type: "Individual",
    level: "Advanced",
    image: cyclingImg,
    prize: "$5,000",
    baseParticipants: 55,
    maxParticipants: 120,
    location: "Mountain Ridge Circuit",
    date: "Jun 14–15, 2026",
    registrationEnd: "Jun 5",
    organizer: "VeloSport Racing",
    status: "Registration Open",
    rounds: ["Time Trial", "Stage Race", "Final Sprint"],
    entryFee: 50,
    sponsors: ["Trek", "Shimano", "Garmin"],
    description:
      "The region's most prestigious cycling event, featuring a gruelling mountain circuit time trial, a 3-stage road race, and a final criterium sprint. For serious cyclists only — UCI Cat 3 license or equivalent required.",
    schedule: [
      { phase: "Rider Registration & Bike Check", date: "Jun 14, 7:00 AM" },
      { phase: "Time Trial", date: "Jun 14, 9:00 AM" },
      { phase: "Stage Race (Stages 1–2)", date: "Jun 14, 2:00 PM" },
      { phase: "Final Stage & Sprint", date: "Jun 15, 10:00 AM" },
      { phase: "Podium & Awards", date: "Jun 15, 3:00 PM" },
    ],
    rules: [
      "UCI Cat 3 racing license or equivalent required",
      "Approved helmet mandatory — no exceptions",
      "Drafting permitted in stage race, not in time trial",
      "Race commissaire decisions are final",
    ],
    prizeBreakdown: ["🥇 Overall Winner: $2,500", "🥈 2nd Place: $1,500", "🥉 3rd Place: $700", "Stage Winners: $100 each"],
    facilities: "Mountain circuit + city criterium loop, neutral support vehicles, live GPS tracking",
    contact: "race@velosportracing.com",
  },
];

const leaderboard = [
  { rank: 1, name: "Jordan Li", sport: "Tennis", score: 2840, wins: 18, trend: "+120" },
  { rank: 2, name: "Maya Rodriguez", sport: "Running", score: 2615, wins: 15, trend: "+85" },
  { rank: 3, name: "Chris Park", sport: "Basketball", score: 2490, wins: 22, trend: "+45" },
  { rank: 4, name: "Alex Chen", sport: "Tennis", score: 2280, wins: 12, trend: "+60", isMe: true },
  { rank: 5, name: "Sam Wilson", sport: "Soccer", score: 2150, wins: 9, trend: "+30" },
  { rank: 6, name: "Taylor Kim", sport: "Swimming", score: 2020, wins: 11, trend: "+15" },
  { rank: 7, name: "Jamie Chen", sport: "Cycling", score: 1890, wins: 7, trend: "+22" },
  { rank: 8, name: "Morgan Lee", sport: "Golf", score: 1740, wins: 5, trend: "-10" },
];

// Static completed history (past events)
const completedHistory = [
  {
    id: 2, title: "Spring 5K Challenge", sport: "Running", emoji: "🏃",
    status: "Completed" as const, date: "Mar 22, 2026", location: "Riverside Park",
    result: "4th Place", time: "22:14", personalBest: true,
  },
];

// Per-tournament next match details (for tournaments with a scheduled upcoming match)
const nextMatchInfo: Record<number, { nextMatch: string; opponent: string; round: string }> = {
  1: { nextMatch: "Apr 15, 10:00 AM", opponent: "Jordan Li", round: "Quarter Final" },
  3: { nextMatch: "May 3, 10:00 AM", opponent: "FC Rivals", round: "Group Stage" },
};

const statusStyle: Record<string, string> = {
  "Registration Open": "bg-[#00D26A]/10 text-[#00D26A] border-[#00D26A]/20",
  "Almost Full": "bg-amber-50 text-amber-600 border-amber-200",
  Closed: "bg-red-50 text-red-500 border-red-200",
};

const medalEmoji = ["🥇", "🥈", "🥉"];

// ─── Shared profile rows ───────────────────────────────────────────
function ProfileRows() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
      {[
        { icon: User, label: "Full Name", value: currentUser.name },
        { icon: Mail, label: "Email", value: currentUser.email },
        { icon: Phone, label: "Phone", value: currentUser.phone },
        { icon: Trophy, label: "Skill Level", value: currentUser.skillLevel },
      ].map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-400" style={{ fontSize: "0.65rem" }}>{label}</p>
            <p className="text-gray-800 truncate" style={{ fontSize: "0.85rem", fontWeight: 600 }}>{value}</p>
          </div>
          <CheckCircle className="w-4 h-4 text-[#00D26A] flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

// ─── Shared modal wrapper ──────────────────────────────────────────
function SlideModal({ onBackdropClick, children, wide = false }: {
  onBackdropClick?: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onBackdropClick}
      />
      <motion.div
        className={`relative bg-white w-full ${wide ? "sm:max-w-lg" : "sm:max-w-md"} rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col`}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Success screen ────────────────────────────────────────────────
function SuccessScreen({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-8 text-center">
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-[#00D26A]/10 flex items-center justify-center mb-5"
      >
        <CheckCircle className="w-10 h-10 text-[#00D26A]" fill="currentColor" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <h2 className="text-gray-900 mb-2" style={{ fontWeight: 800, fontSize: "1.3rem" }}>{emoji} {title}</h2>
        <p className="text-gray-500" style={{ fontSize: "0.88rem" }}>{subtitle}</p>
      </motion.div>
    </div>
  );
}

// ─── Agree checkbox ────────────────────────────────────────────────
function AgreeCheckbox({ agreed, onToggle }: { agreed: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="flex items-start gap-3 w-full text-left">
      <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${agreed ? "bg-[#00D26A] border-[#00D26A]" : "border-gray-300 bg-white"}`}>
        {agreed && <CheckCircle className="w-3.5 h-3.5 text-white" fill="currentColor" />}
      </div>
      <p className="text-gray-500" style={{ fontSize: "0.78rem" }}>
        I agree to the rules, code of conduct, and MoveMatch{" "}
        <span className="text-amber-500 underline">Terms of Service</span>
      </p>
    </button>
  );
}

// ─── Tournament Registration Modal ────────────────────────────────
function RegistrationModal({
  tournament, onConfirm, onCancel,
}: {
  tournament: (typeof tournamentsBase)[0];
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<"review" | "success">("review");

  const handleConfirm = () => {
    if (!agreed) return;
    setStep("success");
    setTimeout(onConfirm, 1600);
  };

  return (
    <SlideModal onBackdropClick={step === "review" ? onCancel : undefined}>
      {step === "success" ? (
        <SuccessScreen
          emoji="🎉"
          title="You're In!"
          subtitle={`Successfully registered for ${tournament.title}. Confirmation sent to ${currentUser.email}`}
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
            <div>
              <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.05rem" }}>Confirm Registration</h2>
              <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>Please review your details</p>
            </div>
            <button onClick={onCancel} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
            {/* Tournament summary */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50 overflow-hidden">
              <div className="relative h-24 overflow-hidden">
                <img src={tournament.image} alt={tournament.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <p className="text-white" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                    {tournament.emoji} {tournament.title}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3">
                {[
                  { label: "Date", value: tournament.date },
                  { label: "Location", value: tournament.location },
                  { label: "Format", value: `${tournament.type} · ${tournament.level}` },
                  { label: "Entry Fee", value: `$${tournament.entryFee}` },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-amber-600" style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</p>
                    <p className="text-gray-800" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile */}
            <div>
              <p className="text-gray-500 mb-2 flex items-center gap-1.5" style={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                <User className="w-3.5 h-3.5" /> Your Profile
              </p>
              <ProfileRows />
            </div>

            {/* Payment summary */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <p className="text-gray-600" style={{ fontWeight: 700, fontSize: "0.8rem" }}>Payment Summary</p>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "Entry Fee", val: `$${tournament.entryFee}.00` },
                  { label: "Platform Fee", val: "$2.00" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500" style={{ fontSize: "0.8rem" }}>{label}</span>
                    <span className="text-gray-800" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-1.5 flex justify-between">
                  <span className="text-gray-900" style={{ fontSize: "0.85rem", fontWeight: 700 }}>Total</span>
                  <span className="text-amber-500" style={{ fontSize: "0.95rem", fontWeight: 800 }}>${tournament.entryFee + 2}.00</span>
                </div>
              </div>
            </div>

            <AgreeCheckbox agreed={agreed} onToggle={() => setAgreed(v => !v)} />
          </div>

          <div className="flex gap-3 px-5 py-4 border-t border-gray-100 flex-shrink-0">
            <button onClick={onCancel} className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!agreed}
              className={`flex-1 py-3 rounded-2xl transition-all active:scale-95 ${agreed ? "bg-amber-400 text-amber-900 hover:bg-amber-500 shadow-md shadow-amber-100" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              style={{ fontWeight: 700, fontSize: "0.88rem" }}
            >
              Confirm & Pay ${tournament.entryFee + 2}
            </button>
          </div>
        </>
      )}
    </SlideModal>
  );
}

// ─── Challenge Join Modal ──────────────────────────────────────────
function ChallengeJoinModal({
  challenge, onConfirm, onCancel,
}: {
  challenge: (typeof challengesBase)[0];
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<"review" | "success">("review");
  const daysLeft = calcDaysLeft(challenge.endDate);

  const handleConfirm = () => {
    if (!agreed) return;
    setStep("success");
    setTimeout(onConfirm, 1600);
  };

  return (
    <SlideModal onBackdropClick={step === "review" ? onCancel : undefined}>
      {step === "success" ? (
        <SuccessScreen
          emoji="🔥"
          title="You're In!"
          subtitle={`Successfully joined ${challenge.title}. ${daysLeft}d left on the clock — good luck!`}
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
            <div>
              <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.05rem" }}>Confirm Join</h2>
              <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>Review your details before joining</p>
            </div>
            <button onClick={onCancel} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
            {/* Challenge summary card */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50 overflow-hidden">
              <div className="relative h-28 overflow-hidden">
                <img src={challenge.image} alt={challenge.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute top-2 left-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-white ${challenge.type === "Official" ? "bg-blue-500" : "bg-amber-500"}`}
                    style={{ fontWeight: 700, fontSize: "0.65rem" }}
                  >
                    {challenge.type === "Official" ? <Zap className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
                    {challenge.type}
                  </span>
                </div>
                <div className="absolute bottom-2 left-3">
                  <p className="text-white" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{challenge.title}</p>
                  <p className="text-white/70" style={{ fontSize: "0.72rem" }}>by {challenge.creator}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3">
                {[
                  { label: "Prize", value: challenge.prize },
                  { label: "Days Left", value: daysLeft > 0 ? `${daysLeft}d remaining` : "Ended" },
                  { label: "Entry Fee", value: "Free" },
                  { label: "Format", value: challenge.type === "Official" ? "Official" : "Community" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-amber-600" style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</p>
                    <p className="text-gray-800" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile */}
            <div>
              <p className="text-gray-500 mb-2 flex items-center gap-1.5" style={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                <User className="w-3.5 h-3.5" /> Your Profile
              </p>
              <ProfileRows />
            </div>

            {/* Free badge */}
            <div className="flex items-center gap-3 bg-[#00D26A]/5 border border-[#00D26A]/20 rounded-2xl p-3.5">
              <div className="w-9 h-9 bg-[#00D26A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Gift className="w-4.5 h-4.5 text-[#00D26A]" />
              </div>
              <div>
                <p className="text-[#00D26A]" style={{ fontWeight: 700, fontSize: "0.82rem" }}>Free to Join — No Entry Fee</p>
                <p className="text-gray-500" style={{ fontSize: "0.72rem" }}>Compete and win prizes at no cost</p>
              </div>
            </div>

            <AgreeCheckbox agreed={agreed} onToggle={() => setAgreed(v => !v)} />
          </div>

          <div className="flex gap-3 px-5 py-4 border-t border-gray-100 flex-shrink-0">
            <button onClick={onCancel} className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!agreed}
              className={`flex-1 py-3 rounded-2xl transition-all active:scale-95 ${agreed ? "bg-amber-400 text-amber-900 hover:bg-amber-500 shadow-md shadow-amber-100" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              style={{ fontWeight: 700, fontSize: "0.88rem" }}
            >
              🔥 Join Challenge
            </button>
          </div>
        </>
      )}
    </SlideModal>
  );
}

// ─── Cancel Confirmation Modal ─────────────────────────────────────
function CancelModal({
  itemTitle,
  type,
  onConfirm,
  onClose,
}: {
  itemTitle: string;
  type: "tournament" | "challenge";
  onConfirm: () => void;
  onClose: () => void;
}) {
  const isTournament = type === "tournament";

  return (
    <SlideModal onBackdropClick={onClose}>
      <div className="px-6 pt-7 pb-2 flex flex-col items-center text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.05 }}
          className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4"
        >
          <UserMinus className="w-7 h-7 text-red-400" />
        </motion.div>

        <h2 className="text-gray-900 mb-1" style={{ fontWeight: 800, fontSize: "1.1rem" }}>
          Cancel {isTournament ? "Registration" : "Participation"}?
        </h2>
        <p className="text-gray-600 mb-1" style={{ fontSize: "0.88rem", fontWeight: 600 }}>
          {itemTitle}
        </p>
        <p className="text-gray-400" style={{ fontSize: "0.78rem" }}>
          {isTournament
            ? "You joined this tournament — are you sure you want to withdraw?"
            : "You're currently participating in this challenge — are you sure you want to leave?"}
        </p>
      </div>

      {/* Warning banner */}
      <div className="mx-6 mt-4 mb-2 bg-red-50 border border-red-100 rounded-2xl p-3.5">
        <p className="text-red-500 text-center" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
          ⚠️{" "}
          {isTournament
            ? "Your spot will be released. Entry fee refunds are subject to tournament policy."
            : "Your progress and spot in this challenge will be permanently removed."}
        </p>
      </div>

      {/* What you'll lose */}
      <div className="mx-6 mt-3 mb-5 space-y-2">
        {(isTournament
          ? ["Reserved bracket slot", "Early-bird status", "Confirmed opponent match"]
          : ["Accumulated challenge points", "Leaderboard position", "Prize eligibility"]
        ).map((item) => (
          <div key={item} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0" />
            <p className="text-gray-500" style={{ fontSize: "0.78rem" }}>{item}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 px-6 pb-7">
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          style={{ fontWeight: 700, fontSize: "0.88rem" }}
        >
          Keep My Spot
        </button>
        <button
          onClick={() => { onConfirm(); onClose(); }}
          className="flex-1 py-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition-colors active:scale-95 shadow-md shadow-red-100"
          style={{ fontWeight: 700, fontSize: "0.88rem" }}
        >
          Yes, Cancel
        </button>
      </div>
    </SlideModal>
  );
}

// ─── Tournament Intro Modal ────────────────────────────────────────
function TournamentIntroModal({
  tournament, onClose,
}: {
  tournament: (typeof tournamentsBase)[0];
  onClose: () => void;
}) {
  return (
    <SlideModal onBackdropClick={onClose} wide>
      <div className="relative h-40 flex-shrink-0">
        <img src={tournament.image} alt={tournament.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-4 left-4">
          <p className="text-white/80" style={{ fontSize: "0.72rem", fontWeight: 600 }}>{tournament.organizer}</p>
          <h2 className="text-white" style={{ fontWeight: 800, fontSize: "1.2rem", lineHeight: 1.2 }}>
            {tournament.emoji} {tournament.title}
          </h2>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">
        <div className="flex flex-wrap gap-2">
          {[
            { icon: Calendar, text: tournament.date },
            { icon: MapPin, text: tournament.location },
            { icon: Users, text: `${tournament.type} · ${tournament.level}` },
            { icon: Trophy, text: tournament.prize },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
              <Icon className="w-3.5 h-3.5 text-gray-400" />{text}
            </span>
          ))}
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-gray-900 mb-2" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
            <FileText className="w-4 h-4 text-amber-500" /> About this Tournament
          </h3>
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: "0.83rem" }}>{tournament.description}</p>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
            <CalendarDays className="w-4 h-4 text-blue-500" /> Schedule
          </h3>
          <div className="space-y-2">
            {tournament.schedule.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <div className="flex-1 flex items-center justify-between gap-2">
                  <span className="text-gray-700" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{s.phase}</span>
                  <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>{s.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
            <List className="w-4 h-4 text-[#00D26A]" /> Rules & Format
          </h3>
          <div className="space-y-2">
            {tournament.rules.map((r, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#00D26A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#00D26A]" style={{ fontSize: "0.6rem", fontWeight: 800 }}>{i + 1}</span>
                </div>
                <p className="text-gray-600" style={{ fontSize: "0.8rem" }}>{r}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
            <Gift className="w-4 h-4 text-amber-500" /> Prize Breakdown
          </h3>
          <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4 space-y-1.5">
            {tournament.prizeBreakdown.map((p, i) => (
              <p key={i} className="text-gray-700" style={{ fontSize: "0.82rem", fontWeight: i === 0 ? 700 : 500 }}>{p}</p>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="text-gray-400" style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Organized by</p>
            <p className="text-gray-800" style={{ fontSize: "0.88rem", fontWeight: 700 }}>{tournament.organizer}</p>
            <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{tournament.contact}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
        <button onClick={onClose} className="w-full py-3 rounded-2xl bg-amber-400 text-amber-900 hover:bg-amber-500 transition-colors shadow-md shadow-amber-100" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
          Got it — Back to Tournaments
        </button>
      </div>
    </SlideModal>
  );
}

// ─── Challenge Intro Modal ─────────────────────────────────────────
function ChallengeIntroModal({
  challenge, onClose,
}: {
  challenge: (typeof challengesBase)[0];
  onClose: () => void;
}) {
  const daysLeft = calcDaysLeft(challenge.endDate);
  return (
    <SlideModal onBackdropClick={onClose} wide>
      <div className="relative h-36 flex-shrink-0">
        <img src={challenge.image} alt={challenge.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-4 left-4">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-white mb-1 ${challenge.type === "Official" ? "bg-blue-500" : "bg-amber-500"}`}
            style={{ fontWeight: 700, fontSize: "0.65rem" }}
          >
            {challenge.type === "Official" ? <Zap className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
            {challenge.type}
          </span>
          <h2 className="text-white" style={{ fontWeight: 800, fontSize: "1.1rem" }}>{challenge.title}</h2>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
            <Users className="w-3.5 h-3.5 text-gray-400" /> {challenge.baseParticipants.toLocaleString()} joined
          </span>
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${daysLeft <= 3 ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-600"}`} style={{ fontSize: "0.75rem", fontWeight: 600 }}>
            <Clock className="w-3.5 h-3.5" /> {daysLeft > 0 ? `${daysLeft}d left` : "Ended"}
          </span>
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
            <Gift className="w-3.5 h-3.5" /> {challenge.prize}
          </span>
        </div>
        <p className="text-gray-500" style={{ fontSize: "0.78rem" }}>
          Created by <span style={{ fontWeight: 700, color: "#111" }}>{challenge.creator}</span>
        </p>

        <div>
          <h3 className="flex items-center gap-2 text-gray-900 mb-2" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
            <FileText className="w-4 h-4 text-amber-500" /> About this Challenge
          </h3>
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: "0.83rem" }}>{challenge.description}</p>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
            <List className="w-4 h-4 text-[#00D26A]" /> Rules
          </h3>
          <div className="space-y-2">
            {challenge.rules.map((r, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#00D26A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#00D26A]" style={{ fontSize: "0.6rem", fontWeight: 800 }}>{i + 1}</span>
                </div>
                <p className="text-gray-600" style={{ fontSize: "0.8rem" }}>{r}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
            <Gift className="w-4 h-4 text-amber-500" /> Prizes
          </h3>
          <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4 space-y-1.5">
            {challenge.prizes.map((p, i) => (
              <p key={i} className="text-gray-700" style={{ fontSize: "0.82rem", fontWeight: i === 0 ? 700 : 500 }}>{p}</p>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <div>
            <p className="text-gray-400" style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Format</p>
            <p className="text-gray-700" style={{ fontSize: "0.83rem", fontWeight: 600 }}>{challenge.format}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
        <button onClick={onClose} className="w-full py-3 rounded-2xl bg-amber-400 text-amber-900 hover:bg-amber-500 transition-colors shadow-md shadow-amber-100" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
          Got it — Back to Challenges
        </button>
      </div>
    </SlideModal>
  );
}

// ─── Match Detail Data ─────────────────────────────────────────────
const matchData = {
  tournament: "City Tennis Open 2026",
  round: "Quarter Final",
  date: "Apr 15, 2026",
  time: "10:00 AM",
  court: "Court 3",
  surface: "Clay",
  estimatedDuration: "~90 min",
  format: "Best of 3 Sets · Tie-break at 6-6",
  venue: {
    name: "City Tennis Complex",
    address: "123 Sports Boulevard",
    district: "Downtown District",
    city: "City Center, CA 90210",
    parking: "Gate B — Free for registered participants",
    transport: "Bus lines 14 & 22 stop at Sports Blvd",
    phone: "+1 (555) 800-4321",
  },
  opponent: {
    name: "Jordan Li",
    age: 24,
    hometown: "San Francisco, CA",
    rank: 1,
    wins: 18,
    losses: 4,
    score: 2840,
    style: "Aggressive Baseliner",
    dominantHand: "Right-handed",
    favoriteSurface: "Clay",
    bio: "Jordan is the current season #1 player — known for powerful groundstrokes and excellent court coverage. Tends to dictate from the baseline with heavy topspin forehands.",
    recentForm: ["W", "W", "W", "L", "W"] as string[],
  },
  headToHead: { you: 0, opponent: 2, lastMeeting: "Feb 2026 — Jordan won 6-3, 6-1" },
  checklist: [
    "Bring your own racket (no rental available)",
    "Valid photo ID + tournament confirmation email",
    "Water bottle & towel (vending on-site)",
    "Arrive at least 30 min before match time",
    "Warm-up courts open from 9:00 AM",
  ],
};

// ─── Match Detail Modal ────────────────────────────────────────────
function MatchDetailModal({ onClose }: { onClose: () => void }) {
  const [section, setSection] = useState<"overview" | "opponent" | "venue">("overview");

  const formColor = (r: string) =>
    r === "W" ? "bg-[#00D26A] text-white" : "bg-red-400 text-white";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[94vh] flex flex-col"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
      >
        {/* ── Hero header ── */}
        <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 px-5 pt-5 pb-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Round badge + tournament */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1" style={{ fontSize: "0.68rem", fontWeight: 700 }}>
              <Shield className="w-3 h-3" /> {matchData.round}
            </span>
            <span className="text-blue-200" style={{ fontSize: "0.68rem" }}>{matchData.tournament}</span>
          </div>

          {/* VS block */}
          <div className="flex items-center justify-between gap-3 mb-4">
            {/* You */}
            <div className="flex-1 text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-2 overflow-hidden ring-2 ring-white/50">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-white" style={{ fontWeight: 700, fontSize: "0.82rem" }}>{currentUser.name}</p>
              <p className="text-blue-200" style={{ fontSize: "0.65rem" }}>Rank #4 · You</p>
            </div>

            {/* VS badge */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <span style={{ fontWeight: 900, fontSize: "0.75rem", color: "white" }}>VS</span>
              </div>
              <p className="text-blue-200" style={{ fontSize: "0.6rem" }}>{matchData.court}</p>
            </div>

            {/* Opponent */}
            <div className="flex-1 text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-2 overflow-hidden ring-2 ring-amber-400/60">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${matchData.opponent.name}&backgroundColor=ffd5dc,ffdfbf`}
                  alt={matchData.opponent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white" style={{ fontWeight: 700, fontSize: "0.82rem" }}>{matchData.opponent.name}</p>
              <div className="flex items-center justify-center gap-1">
                <Crown className="w-3 h-3 text-amber-300" fill="currentColor" />
                <p className="text-amber-300" style={{ fontSize: "0.65rem" }}>Rank #1</p>
              </div>
            </div>
          </div>

          {/* Date / time / court quick row */}
          <div className="flex items-center justify-center gap-3 bg-white/10 rounded-2xl py-2.5 px-3 flex-wrap">
            {[
              { icon: Calendar, text: matchData.date },
              { icon: Clock, text: matchData.time },
              { icon: Flag, text: `${matchData.court} · ${matchData.surface}` },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-3 h-3 text-blue-200 flex-shrink-0" />
                <span className="text-white" style={{ fontSize: "0.7rem", fontWeight: 600 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section tabs ── */}
        <div className="flex border-b border-gray-100 flex-shrink-0 bg-white">
          {(["overview", "opponent", "venue"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`flex-1 py-3 transition-all ${section === s ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:text-gray-600"}`}
              style={{ fontWeight: 700, fontSize: "0.78rem" }}
            >
              {s === "overview" ? "📋 Overview" : s === "opponent" ? "🎾 Opponent" : "📍 Venue"}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        <div className="overflow-y-auto flex-1 px-5 py-4">
          <AnimatePresence mode="wait">

            {/* OVERVIEW */}
            {section === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                {/* Match details grid */}
                <div>
                  <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
                    <ClipboardList className="w-4 h-4 text-blue-500" /> Match Details
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Date", value: matchData.date },
                      { label: "Tee Time", value: matchData.time },
                      { label: "Court", value: matchData.court },
                      { label: "Surface", value: matchData.surface },
                      { label: "Est. Duration", value: matchData.estimatedDuration },
                      { label: "Format", value: "Best of 3 Sets" },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-gray-400 mb-0.5" style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                        <p className="text-gray-800" style={{ fontSize: "0.82rem", fontWeight: 600 }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Head-to-head */}
                <div>
                  <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
                    <BarChart2 className="w-4 h-4 text-amber-500" /> Head-to-Head
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 via-gray-50 to-amber-50 rounded-2xl border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-center">
                        <p className="text-blue-600" style={{ fontWeight: 900, fontSize: "1.8rem", lineHeight: 1 }}>{matchData.headToHead.you}</p>
                        <p className="text-gray-400" style={{ fontSize: "0.68rem" }}>You</p>
                      </div>
                      <div className="text-gray-300" style={{ fontWeight: 700, fontSize: "1.2rem" }}>:</div>
                      <div className="text-center">
                        <p className="text-amber-500" style={{ fontWeight: 900, fontSize: "1.8rem", lineHeight: 1 }}>{matchData.headToHead.opponent}</p>
                        <p className="text-gray-400" style={{ fontSize: "0.68rem" }}>{matchData.opponent.name.split(" ")[0]}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-2.5 border border-gray-100">
                      <p className="text-gray-400 text-center" style={{ fontSize: "0.72rem" }}>
                        Last: <span className="text-gray-600" style={{ fontWeight: 600 }}>{matchData.headToHead.lastMeeting}</span>
                      </p>
                    </div>
                    <p className="text-amber-600 text-center mt-2" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                      💡 Jordan leads the series — time to change that!
                    </p>
                  </div>
                </div>

                {/* Pre-match checklist */}
                <div>
                  <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
                    <CheckCircle className="w-4 h-4 text-[#00D26A]" /> Pre-Match Checklist
                  </h3>
                  <div className="space-y-2">
                    {matchData.checklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                        <div className="w-5 h-5 rounded-full bg-[#00D26A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[#00D26A]" style={{ fontSize: "0.6rem", fontWeight: 800 }}>{i + 1}</span>
                        </div>
                        <p className="text-gray-600" style={{ fontSize: "0.8rem" }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* OPPONENT */}
            {section === "opponent" && (
              <motion.div
                key="opponent"
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                {/* Opponent hero card */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${matchData.opponent.name}&backgroundColor=ffd5dc,ffdfbf`}
                        alt={matchData.opponent.name}
                        className="w-16 h-16 rounded-2xl border-2 border-amber-200"
                      />
                      <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center border-2 border-white">
                        <Crown className="w-3 h-3 text-white" fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.05rem" }}>{matchData.opponent.name}</h3>
                      <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>{matchData.opponent.hometown} · Age {matchData.opponent.age}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                          Rank #{matchData.opponent.rank}
                        </span>
                        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                          {matchData.opponent.score.toLocaleString()} pts
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: "Wins", value: matchData.opponent.wins },
                      { label: "Losses", value: matchData.opponent.losses },
                      { label: "Win Rate", value: `${Math.round((matchData.opponent.wins / (matchData.opponent.wins + matchData.opponent.losses)) * 100)}%` },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white rounded-xl p-2.5 border border-amber-100 text-center">
                        <p className="text-gray-900" style={{ fontWeight: 800, fontSize: "1rem" }}>{value}</p>
                        <p className="text-gray-400" style={{ fontSize: "0.62rem" }}>{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent form */}
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500 flex-shrink-0" style={{ fontSize: "0.72rem", fontWeight: 600 }}>Recent form:</p>
                    <div className="flex gap-1">
                      {matchData.opponent.recentForm.map((r, i) => (
                        <span key={i} className={`w-6 h-6 rounded-full flex items-center justify-center ${formColor(r)}`} style={{ fontSize: "0.65rem", fontWeight: 800 }}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Playing style */}
                <div>
                  <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
                    <Target className="w-4 h-4 text-blue-500" /> Playing Style
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { label: "Style", value: matchData.opponent.style },
                      { label: "Dominant Hand", value: matchData.opponent.dominantHand },
                      { label: "Best Surface", value: matchData.opponent.favoriteSurface },
                      { label: "Threat Level", value: "🔴 High" },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-gray-400 mb-0.5" style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                        <p className="text-gray-800" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
                    <p className="text-blue-700 mb-1" style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Scouting Notes</p>
                    <p className="text-gray-600 leading-relaxed" style={{ fontSize: "0.8rem" }}>{matchData.opponent.bio}</p>
                  </div>
                </div>

                {/* AI coaching tip */}
                <div className="bg-[#00D26A]/5 border border-[#00D26A]/20 rounded-2xl p-4">
                  <p className="text-[#00D26A]" style={{ fontWeight: 700, fontSize: "0.82rem" }}>💡 AI Coaching Tip</p>
                  <p className="text-gray-600 mt-1" style={{ fontSize: "0.78rem" }}>
                    Attack Jordan's backhand with wide slice shots and approach net early. Vary pace — Jordan struggles with low, skidding balls on clay. Avoid long baseline rallies where they have the edge.
                  </p>
                </div>
              </motion.div>
            )}

            {/* VENUE */}
            {section === "venue" && (
              <motion.div
                key="venue"
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                {/* Map placeholder + address */}
                <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="h-36 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative flex items-center justify-center overflow-hidden">
                    {/* Stylised map grid */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(8)].map((_, i) => (
                        <div key={`v-${i}`} className="absolute border-blue-300" style={{ borderLeftWidth: 1, left: `${i * 14}%`, top: 0, bottom: 0, width: 0 }} />
                      ))}
                      {[...Array(6)].map((_, i) => (
                        <div key={`h-${i}`} className="absolute border-blue-300" style={{ borderTopWidth: 1, top: `${i * 18}%`, left: 0, right: 0, height: 0 }} />
                      ))}
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 mb-2">
                        <MapPin className="w-6 h-6 text-white" fill="currentColor" />
                      </div>
                      <span className="bg-white text-blue-700 px-3 py-1 rounded-full shadow-sm" style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                        {matchData.venue.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-gray-900 mb-0.5" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{matchData.venue.name}</p>
                      <p className="text-gray-500" style={{ fontSize: "0.8rem" }}>{matchData.venue.address}</p>
                      <p className="text-gray-500" style={{ fontSize: "0.8rem" }}>{matchData.venue.district}</p>
                      <p className="text-gray-500" style={{ fontSize: "0.8rem" }}>{matchData.venue.city}</p>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-100" style={{ fontWeight: 700, fontSize: "0.82rem" }}>
                      <Navigation className="w-4 h-4" /> Get Directions
                    </button>
                  </div>
                </div>

                {/* Getting there */}
                <div>
                  <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
                    <Car className="w-4 h-4 text-gray-500" /> Getting There
                  </h3>
                  <div className="space-y-2">
                    {[
                      { icon: Car, label: "Parking", value: matchData.venue.parking, color: "text-blue-500", bg: "bg-blue-50" },
                      { icon: Navigation, label: "Transit", value: matchData.venue.transport, color: "text-[#00D26A]", bg: "bg-[#00D26A]/5" },
                      { icon: Phone, label: "Venue Phone", value: matchData.venue.phone, color: "text-amber-500", bg: "bg-amber-50" },
                    ].map(({ icon: Icon, label, value, color, bg }) => (
                      <div key={label} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
                        <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Icon className={`w-4 h-4 ${color}`} />
                        </div>
                        <div>
                          <p className="text-gray-400" style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
                          <p className="text-gray-700" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* On-site facilities */}
                <div>
                  <h3 className="flex items-center gap-2 text-gray-900 mb-3" style={{ fontWeight: 700, fontSize: "0.88rem" }}>
                    <Building2 className="w-4 h-4 text-blue-500" /> On-Site Facilities
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { emoji: "🎾", label: "6 Clay Courts" },
                      { emoji: "🚿", label: "Locker Rooms" },
                      { emoji: "🏪", label: "Pro Shop" },
                      { emoji: "☕", label: "Café & Snack Bar" },
                      { emoji: "🩺", label: "Medical Team" },
                      { emoji: "📶", label: "Free Wi-Fi" },
                    ].map(({ emoji, label }) => (
                      <div key={label} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                        <span style={{ fontSize: "1rem" }}>{emoji}</span>
                        <p className="text-gray-600" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrival notice */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                  <p className="text-amber-600" style={{ fontWeight: 700, fontSize: "0.8rem" }}>⏰ Arrival Reminder</p>
                  <p className="text-gray-600 mt-1" style={{ fontSize: "0.78rem" }}>
                    Check-in closes <span style={{ fontWeight: 700 }}>15 minutes before match time</span>. Late arrivals may result in a walkover. Warm-up courts open from 9:00 AM.
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
            style={{ fontWeight: 700, fontSize: "0.88rem" }}
          >
            Got it — I'm Ready 🎾
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────
export function Competitions() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  // Participant counts (live)
  const [tournamentParticipants, setTournamentParticipants] = useState<Record<number, number>>(
    Object.fromEntries(tournamentsBase.map(t => [t.id, t.baseParticipants]))
  );
  const [challengeParticipants, setChallengeParticipants] = useState<Record<number, number>>(
    Object.fromEntries(challengesBase.map(c => [c.id, c.baseParticipants]))
  );

  // Join / register state
  const [registeredIds, setRegisteredIds] = useState<Set<number>>(new Set([1]));
  const [joinedChallenges, setJoinedChallenges] = useState<Set<number>>(new Set());

  // ── Explore-all modals ───────────────────────────────────────────
  const [exploreChallengesOpen, setExploreChallengesOpen] = useState(false);
  const [exploreTournamentsOpen, setExploreTournamentsOpen] = useState(false);

  // ── Modal state ──────────────────────────────────────────────────
  const [registerModal, setRegisterModal] = useState<(typeof tournamentsBase)[0] | null>(null);
  const [challengeJoinModal, setChallengeJoinModal] = useState<(typeof challengesBase)[0] | null>(null);
  const [tournamentIntro, setTournamentIntro] = useState<(typeof tournamentsBase)[0] | null>(null);
  const [challengeIntro, setChallengeIntro] = useState<(typeof challengesBase)[0] | null>(null);
  const [cancelModal, setCancelModal] = useState<{
    type: "tournament" | "challenge";
    id: number;
    title: string;
  } | null>(null);
  const [matchDetailOpen, setMatchDetailOpen] = useState(false);

  // ── Handlers ─────────────────────────────────────────────────────
  const handleTournamentClick = (t: (typeof tournamentsBase)[0]) => {
    if (registeredIds.has(t.id)) {
      // Already registered → open cancel flow
      setCancelModal({ type: "tournament", id: t.id, title: t.title });
    } else {
      setRegisterModal(t);
    }
  };

  const handleRegisterConfirm = () => {
    if (!registerModal) return;
    const id = registerModal.id;
    setRegisteredIds(prev => new Set([...prev, id]));
    setTournamentParticipants(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setTimeout(() => setRegisterModal(null), 2000);
  };

  const handleChallengeClick = (ch: (typeof challengesBase)[0]) => {
    if (calcDaysLeft(ch.endDate) === 0) return;
    if (joinedChallenges.has(ch.id)) {
      // Already joined → open cancel flow
      setCancelModal({ type: "challenge", id: ch.id, title: ch.title });
    } else {
      setChallengeJoinModal(ch);
    }
  };

  const handleChallengeJoinConfirm = () => {
    if (!challengeJoinModal) return;
    const id = challengeJoinModal.id;
    setJoinedChallenges(prev => new Set([...prev, id]));
    setChallengeParticipants(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setTimeout(() => setChallengeJoinModal(null), 2000);
  };

  const handleCancelConfirm = () => {
    if (!cancelModal) return;
    const { type, id } = cancelModal;
    if (type === "tournament") {
      setRegisteredIds(prev => { const n = new Set(prev); n.delete(id); return n; });
      setTournamentParticipants(prev => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
    } else {
      setJoinedChallenges(prev => { const n = new Set(prev); n.delete(id); return n; });
      setChallengeParticipants(prev => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
    }
  };

  // Auto days left per challenge
  const challengeDaysLeft = useMemo(
    () => Object.fromEntries(challengesBase.map(c => [c.id, calcDaysLeft(c.endDate)])),
    []
  );

  // Dynamic "Mine" list — registered tournaments + completed history
  const myMineList = useMemo(() => {
    const registered = tournamentsBase
      .filter(t => registeredIds.has(t.id))
      .map(t => ({
        id: t.id,
        title: t.title,
        sport: t.sport,
        emoji: t.emoji,
        date: t.date,
        location: t.location,
        status: "Registered" as const,
        ...(nextMatchInfo[t.id] ?? {}),
      }));
    return [...registered, ...completedHistory];
  }, [registeredIds]);

  return (
    <div className="w-full pb-24 md:pb-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden h-44 md:h-56">
        <img src={trophyImg} alt="Competitions" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative z-10 px-4 md:px-8 h-full flex flex-col justify-end pb-5 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-amber-400" fill="currentColor" />
            <span className="text-amber-300" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Competition Hub</span>
          </div>
          <h1 className="text-white" style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 5vw, 2.2rem)", lineHeight: 1.15 }}>
            Compete, Win,<br />Be Legendary
          </h1>
          <p className="text-amber-200 mt-1" style={{ fontSize: "0.85rem" }}>From local leagues to regional championships</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-3 md:px-8 mt-4">

        {/* Stats Row — active counts are dynamic */}
        {(() => {
          const activeChallengesCount = challengesBase.filter(c => calcDaysLeft(c.endDate) > 0).length;
          const activeTournamentsCount = tournamentsBase.filter(t => t.status !== "Closed").length;
          const totalActive = activeChallengesCount + activeTournamentsCount;
          return (
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Active Events", value: String(totalActive), icon: Trophy, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
                { label: "Participants", value: "12.4K", icon: Users, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
                { label: "Prize Pool", value: "$85K", icon: Award, color: "text-[#00D26A]", bg: "bg-[#00D26A]/10", border: "border-[#00D26A]/20" },
              ].map(s => (
                <div key={s.label} className={`bg-white rounded-2xl border ${s.border} shadow-sm p-3 text-center`}>
                  <div className={`w-8 h-8 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-1.5`}>
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <p className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.1rem" }}>{s.value}</p>
                  <p className="text-gray-400" style={{ fontSize: "0.6rem" }}>{s.label}</p>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 mb-4 flex gap-1">
          {([
            { id: "upcoming", label: "Tournaments", icon: "🏆" },
            { id: "leaderboard", label: "Leaderboard", icon: "📊" },
            { id: "myTournaments", label: "Mine", icon: "⭐" },
          ] as const).map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all ${activeTab === id ? "bg-amber-400 text-amber-900 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
              style={{ fontWeight: 700, fontSize: "0.78rem" }}
            >
              <span>{icon}</span>
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* ── TOURNAMENTS TAB ── */}
        {activeTab === "upcoming" && (
          <div className="space-y-4">

            {/* Hot Challenges */}
            {(() => {
              const openChallenges = [...challengesBase]
                .filter(c => challengeDaysLeft[c.id] > 0)
                .sort((a, b) => challengeDaysLeft[a.id] - challengeDaysLeft[b.id]);
              const visibleChallenges = openChallenges.slice(0, 3);

              return (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Flame className="w-4 h-4 text-amber-500" />
                      </div>
                      <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.05rem" }}>Hot Challenges</h2>
                      {openChallenges.length > 0 && (
                        <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full" style={{ fontWeight: 700, fontSize: "0.65rem" }}>
                          {openChallenges.length} open
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Trending Now 🔥</span>
                  </div>

                  {openChallenges.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Flame className="w-5 h-5 text-gray-300" />
                      </div>
                      <p className="text-gray-500" style={{ fontWeight: 600, fontSize: "0.88rem" }}>No active challenges right now</p>
                      <p className="text-gray-400 mt-1" style={{ fontSize: "0.75rem" }}>Check back soon for new challenges</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        {visibleChallenges.map((ch, i) => {
                          const daysLeft = challengeDaysLeft[ch.id];
                          const joined = joinedChallenges.has(ch.id);
                          const count = challengeParticipants[ch.id];

                          return (
                            <motion.div
                              key={ch.id}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden"
                            >
                              <div className="relative h-32 overflow-hidden">
                                <img src={ch.image} alt={ch.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                                <div className="absolute top-2 left-2">
                                  <span
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-white ${ch.type === "Official" ? "bg-blue-500" : "bg-amber-500"}`}
                                    style={{ fontWeight: 700, fontSize: "0.65rem" }}
                                  >
                                    {ch.type === "Official" ? <Zap className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
                                    {ch.type}
                                  </span>
                                </div>
                                <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-lg" style={{ fontWeight: 700, fontSize: "0.7rem" }}>
                                  {ch.prize}
                                </div>
                                {joined && (
                                  <div className="absolute bottom-2 right-2 bg-[#00D26A] text-white px-2 py-0.5 rounded-lg flex items-center gap-1" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                                    <CheckCircle className="w-3 h-3" /> Joined
                                  </div>
                                )}
                                {daysLeft <= 3 && (
                                  <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-lg flex items-center gap-1" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                                    <Clock className="w-2.5 h-2.5" /> {daysLeft}d left
                                  </div>
                                )}
                              </div>
                              <div className="p-3">
                                <h3 className="text-gray-900 mb-1 line-clamp-1" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{ch.title}</h3>
                                <p className="text-gray-500 mb-2" style={{ fontSize: "0.7rem" }}>by {ch.creator}</p>
                                <div className="flex items-center justify-between mb-3">
                                  <span className="flex items-center gap-1 text-gray-500" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                                    <Users className="w-3.5 h-3.5" />
                                    <motion.span key={count} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                                      {count.toLocaleString()}
                                    </motion.span>
                                  </span>
                                  <span className={`flex items-center gap-1 ${daysLeft <= 3 ? "text-red-500" : "text-amber-500"}`} style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                                    <Clock className="w-3.5 h-3.5" />
                                    {daysLeft}d left
                                  </span>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setChallengeIntro(ch)}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex-shrink-0"
                                    style={{ fontWeight: 700, fontSize: "0.72rem" }}
                                  >
                                    <Info className="w-3 h-3" /> Intro
                                  </button>
                                  <button
                                    onClick={() => handleChallengeClick(ch)}
                                    className={`flex-1 py-1.5 rounded-xl transition-all active:scale-95 ${
                                      joined
                                        ? "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100"
                                        : "bg-amber-400 text-amber-900 hover:bg-amber-500"
                                    }`}
                                    style={{ fontWeight: 700, fontSize: "0.78rem" }}
                                  >
                                    {joined ? "✓ Joined · Cancel?" : "Join Now"}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Explore More Challenges button */}
                      <button
                        onClick={() => setExploreChallengesOpen(true)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/60 text-amber-600 hover:bg-amber-100 hover:border-amber-300 transition-all mb-4"
                        style={{ fontWeight: 700, fontSize: "0.82rem" }}
                      >
                        <Flame className="w-4 h-4" />
                        Explore More Challenges
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <div className="h-px bg-gray-200 mb-6" />
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.05rem" }}>Tournaments</h2>
                      <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full" style={{ fontWeight: 700, fontSize: "0.65rem" }}>
                        {tournamentsBase.filter(t => t.status !== "Closed").length} open
                      </span>
                    </div>
                    <span className="text-gray-500" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Register Now 🏆</span>
                  </div>
                </div>
              );
            })()}

            {/* Tournament cards — expired/closed ones removed */}
            {(() => {
              const openTournaments = tournamentsBase.filter(t => t.status !== "Closed");
              const visibleTournaments = openTournaments.slice(0, 3);

              return (
                <>
                  {openTournaments.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-5 h-5 text-gray-300" />
                      </div>
                      <p className="text-gray-500" style={{ fontWeight: 600, fontSize: "0.88rem" }}>No open tournaments right now</p>
                      <p className="text-gray-400 mt-1" style={{ fontSize: "0.75rem" }}>New tournaments will be listed here soon</p>
                    </div>
                  ) : (
                    <>
                      {/* Tournament count badge next to heading */}
                      {openTournaments.length > 0 && (
                        <div className="flex items-center gap-2 -mt-3 mb-3">
                          <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full" style={{ fontWeight: 700, fontSize: "0.65rem" }}>
                            {openTournaments.length} available
                          </span>
                        </div>
                      )}

                      <div className="space-y-4">
                        {visibleTournaments.map((t, i) => {
                          const count = tournamentParticipants[t.id];
                          const isRegistered = registeredIds.has(t.id);
                          return (
                            <motion.div
                              key={t.id}
                              layout
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                            >
                              <div className="flex flex-col md:flex-row">
                                <div className="md:w-48 h-36 md:h-auto relative overflow-hidden flex-shrink-0">
                                  <img src={t.image} alt={t.sport} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/30 to-transparent" />
                                  <div className="absolute top-3 left-3">
                                    <span className={`px-2.5 py-1 rounded-full border text-xs font-bold ${statusStyle[t.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                      {t.status}
                                    </span>
                                  </div>
                                  <div className="absolute bottom-3 left-3 text-2xl">{t.emoji}</div>
                                </div>

                                <div className="flex-1 p-4">
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                        <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{t.title}</h3>
                                        {t.sponsors.length > 0 && (
                                          <span className="flex items-center gap-1 text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-full" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                                            <Star className="w-2.5 h-2.5" fill="currentColor" />Sponsored
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{t.organizer} · {t.type} · {t.level}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <p className="text-amber-500" style={{ fontWeight: 800, fontSize: "1.05rem" }}>{t.prize}</p>
                                      <p className="text-gray-400" style={{ fontSize: "0.65rem" }}>Prize</p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-1.5 mb-3">
                                    {[
                                      { icon: Calendar, text: t.date },
                                      { icon: MapPin, text: t.location },
                                      { icon: Users, text: null, custom: (
                                        <span className="flex items-center gap-1">
                                          <motion.span key={count} initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }}>{count}</motion.span>/{t.maxParticipants}
                                        </span>
                                      )},
                                      { icon: Clock, text: `Reg. by ${t.registrationEnd}` },
                                    ].map(({ icon: Icon, text, custom }, idx) => (
                                      <div key={idx} className="flex items-center gap-1.5 text-gray-500" style={{ fontSize: "0.72rem" }}>
                                        <Icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                        <span className="truncate">{custom ?? text}</span>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="mb-3">
                                    <div className="flex justify-between mb-1">
                                      <span className="text-gray-400" style={{ fontSize: "0.65rem" }}>Registrations</span>
                                      <span className="text-gray-500" style={{ fontSize: "0.65rem" }}>{Math.round((count / t.maxParticipants) * 100)}% full</span>
                                    </div>
                                    <div className="bg-gray-100 h-1.5 rounded-full">
                                      <motion.div
                                        className="h-1.5 rounded-full bg-amber-400"
                                        animate={{ width: `${(count / t.maxParticipants) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                      />
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 mb-3 overflow-x-auto scrollbar-hide">
                                    {t.rounds.map((r, ri) => (
                                      <div key={r} className="flex items-center gap-1 flex-shrink-0">
                                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600" style={{ fontSize: "0.65rem", fontWeight: 500 }}>{r}</span>
                                        {ri < t.rounds.length - 1 && <ChevronRight className="w-3 h-3 text-gray-300" />}
                                      </div>
                                    ))}
                                  </div>

                                  <div className="flex items-center justify-between gap-2">
                                    <p className="text-gray-500" style={{ fontSize: "0.78rem" }}>
                                      Entry: <span className="text-gray-800" style={{ fontWeight: 600 }}>${t.entryFee}</span>
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => setTournamentIntro(t)}
                                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                        style={{ fontWeight: 700, fontSize: "0.78rem" }}
                                      >
                                        <Info className="w-3.5 h-3.5" /> Intro
                                      </button>
                                      <button
                                        onClick={() => handleTournamentClick(t)}
                                        className={`px-4 py-2 rounded-xl transition-all active:scale-95 ${
                                          isRegistered
                                            ? "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100"
                                            : "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
                                        }`}
                                        style={{ fontWeight: 700, fontSize: "0.82rem" }}
                                      >
                                        {isRegistered ? "✓ Registered · Cancel?" : "Register Now"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Explore Tournaments button */}
                      <motion.button
                        layout
                        onClick={() => setExploreTournamentsOpen(true)}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/60 text-amber-600 hover:bg-amber-100 hover:border-amber-300 transition-all"
                        style={{ fontWeight: 700, fontSize: "0.82rem" }}
                      >
                        <Trophy className="w-4 h-4" />
                        Explore Tournaments
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* ── LEADERBOARD TAB ── */}
        {activeTab === "leaderboard" && (
          <div>
            {/* Podium: 2nd · 1st · 3rd */}
            <div className="grid grid-cols-3 gap-3 mb-4 items-end">
              {[leaderboard[1], leaderboard[0], leaderboard[2]].map((p, i) => {
                const isFirst = p.rank === 1;
                const borderClass = p.rank === 1 ? "border-amber-300 shadow-amber-100" : p.rank === 2 ? "border-gray-200" : "border-orange-100";
                return (
                  <motion.div
                    key={p.rank}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-white rounded-2xl border shadow-sm text-center ${borderClass} ${isFirst ? "py-5 px-3" : "py-4 px-3"}`}
                  >
                    <div className={`mb-2 ${isFirst ? "text-3xl" : "text-2xl"}`}>{medalEmoji[p.rank - 1]}</div>
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}&backgroundColor=b6e3f4,c0aede`}
                      className={`rounded-full border-2 mx-auto mb-2 ${isFirst ? "w-14 h-14 border-amber-300" : "w-11 h-11 border-gray-100"}`}
                      alt={p.name}
                    />
                    <p className="text-gray-800 truncate" style={{ fontWeight: 700, fontSize: isFirst ? "0.82rem" : "0.75rem" }}>{p.name.split(" ")[0]}</p>
                    <p className="text-gray-400" style={{ fontSize: "0.62rem" }}>{p.sport}</p>
                    <p className={`mt-1 ${isFirst ? "text-amber-500" : "text-gray-500"}`} style={{ fontWeight: 800, fontSize: isFirst ? "1rem" : "0.85rem" }}>{p.score.toLocaleString()}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Global Leaderboard</h3>
                  <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>Updated weekly · Season 2026 Q2</p>
                </div>
                <TrendingUp className="w-4 h-4 text-gray-300" />
              </div>
              <div className="divide-y divide-gray-50">
                {leaderboard.map((player, i) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${player.isMe ? "bg-[#00D26A]/5 border-l-4 border-[#00D26A]" : ""}`}
                  >
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}&backgroundColor=b6e3f4,c0aede`} className="w-9 h-9 rounded-full border-2 border-gray-100 flex-shrink-0" alt={player.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className={`truncate ${player.isMe ? "text-[#00D26A]" : "text-gray-800"}`} style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                          {player.name} {player.isMe && <span className="text-xs">(You)</span>}
                        </p>
                        {player.rank === 1 && <Crown className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" fill="currentColor" />}
                      </div>
                      <p className="text-gray-400" style={{ fontSize: "0.7rem" }}>{player.sport} · {player.wins} wins</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-10 flex-shrink-0">
                      {player.rank <= 3 ? (
                        <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>{medalEmoji[player.rank - 1]}</span>
                      ) : (
                        <span className="text-gray-400" style={{ fontWeight: 800, fontSize: "0.88rem" }}>#{player.rank}</span>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{player.score.toLocaleString()}</p>
                      <p className={player.trend.startsWith("+") ? "text-[#00D26A]" : "text-red-400"} style={{ fontSize: "0.7rem", fontWeight: 600 }}>{player.trend} pts</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MY TOURNAMENTS TAB ── */}
        {activeTab === "myTournaments" && (
          <div className="space-y-4">
            {myMineList.length === 0 && joinedChallenges.size === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Trophy className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p style={{ fontSize: "0.9rem" }}>Nothing here yet — join a tournament or challenge to get started!</p>
              </div>
            )}
            {myMineList.map((t, i) => {
              const hasMatch = "nextMatch" in t;
              const isCompleted = t.status === "Completed";
              return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.emoji}</span>
                    <div>
                      <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.title}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{t.sport}</p>
                        <span className="text-gray-300">·</span>
                        <p className="text-gray-400 flex items-center gap-1" style={{ fontSize: "0.72rem" }}>
                          <Calendar className="w-3 h-3" /> {(t as any).date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold flex-shrink-0 ${
                    isCompleted
                      ? "bg-[#00D26A]/10 text-[#00D26A] border-[#00D26A]/20"
                      : "bg-blue-50 text-blue-600 border-blue-200"
                  }`}>
                    {t.status}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-4">
                  {isCompleted ? (
                    /* ── Completed result card ── */
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Medal className="w-8 h-8 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-gray-800 mb-0.5" style={{ fontWeight: 800, fontSize: "1.1rem" }}>{(t as any).result}</p>
                          <p className="text-gray-500 mb-1" style={{ fontSize: "0.8rem" }}>
                            Finish time: <span style={{ fontWeight: 600 }}>{(t as any).time}</span>
                          </p>
                          {(t as any).personalBest && (
                            <span className="flex items-center gap-1 text-[#00D26A]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                              <CheckCircle className="w-3.5 h-3.5" fill="currentColor" /> New Personal Best!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : hasMatch ? (
                    /* ── Registered with known match info ── */
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-blue-400 mb-1" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        Next Match
                      </p>
                      <p className="text-gray-800 mb-0.5" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                        {(t as any).round} vs{" "}
                        <span className="text-blue-600">{(t as any).opponent}</span>
                      </p>
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-gray-500 flex items-center gap-1" style={{ fontSize: "0.8rem" }}>
                          <Clock className="w-3.5 h-3.5 text-gray-400" /> {(t as any).nextMatch}
                        </p>
                        <p className="text-gray-500 flex items-center gap-1" style={{ fontSize: "0.8rem" }}>
                          <MapPin className="w-3.5 h-3.5 text-gray-400" /> {(t as any).location}
                        </p>
                      </div>
                      <button
                        onClick={() => setMatchDetailOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-100 active:scale-95"
                        style={{ fontSize: "0.8rem", fontWeight: 600 }}
                      >
                        <Shield className="w-3.5 h-3.5" /> View Match Details
                      </button>
                    </div>
                  ) : (
                    /* ── Registered, schedule TBD ── */
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#00D26A]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-5 h-5 text-[#00D26A]" fill="currentColor" />
                        </div>
                        <div>
                          <p className="text-gray-800 mb-0.5" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Registration Confirmed!</p>
                          <p className="text-gray-500 mb-2" style={{ fontSize: "0.78rem" }}>
                            Your spot is secured. Match schedule and opponent will be announced closer to the event date.
                          </p>
                          <div className="flex items-center gap-3">
                            <p className="text-gray-400 flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                              <Calendar className="w-3.5 h-3.5" /> {(t as any).date}
                            </p>
                            <p className="text-gray-400 flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                              <MapPin className="w-3.5 h-3.5" /> {(t as any).location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              );
            })}

            {/* ── My Challenges section ── */}
            {joinedChallenges.size > 0 && (() => {
              const myChallenges = challengesBase.filter(ch => joinedChallenges.has(ch.id));
              return (
                <>
                  <div className="flex items-center gap-2 mt-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <h3 className="text-gray-900" style={{ fontWeight: 800, fontSize: "0.95rem" }}>My Challenges</h3>
                  </div>
                  {myChallenges.map((ch, i) => {
                    const daysLeft = challengeDaysLeft[ch.id];
                    const ended = daysLeft === 0;
                    return (
                      <motion.div
                        key={`ch-mine-${ch.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🔥</span>
                            <div>
                              <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{ch.title}</h3>
                              <div className="flex items-center gap-2 mt-0.5">
                                <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{ch.creator}</p>
                                <span className="text-gray-300">·</span>
                                <p className="text-gray-400 flex items-center gap-1" style={{ fontSize: "0.72rem" }}>
                                  <Calendar className="w-3 h-3" /> Ends {ch.endDate}
                                </p>
                              </div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full border text-xs flex-shrink-0 ${
                            ended
                              ? "bg-gray-100 text-gray-400 border-gray-200"
                              : "bg-amber-50 text-amber-600 border-amber-200"
                          }`} style={{ fontWeight: 700 }}>
                            {ended ? "Ended" : `${daysLeft}d left`}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="p-4">
                          {ended ? (
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Medal className="w-5 h-5 text-gray-400" />
                              </div>
                              <div>
                                <p className="text-gray-700 mb-0.5" style={{ fontWeight: 700, fontSize: "0.88rem" }}>Challenge Ended</p>
                                <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>
                                  Prize: <span style={{ fontWeight: 600 }}>{ch.prize}</span> · Results being tallied
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <Flame className="w-5 h-5 text-amber-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-gray-800 mb-0.5" style={{ fontWeight: 700, fontSize: "0.88rem" }}>You're In — Keep Going!</p>
                                  <p className="text-gray-500 mb-2" style={{ fontSize: "0.75rem" }}>
                                    Prize: <span className="text-amber-600" style={{ fontWeight: 600 }}>{ch.prize}</span>
                                    <span className="mx-1.5 text-gray-300">·</span>
                                    {ch.type} Challenge
                                  </p>
                                  <div className="flex items-center gap-1.5">
                                    <div className="flex-1 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-amber-500 rounded-full"
                                        style={{ width: `${Math.round((1 - daysLeft / 30) * 100)}%` }}
                                      />
                                    </div>
                                    <span className="text-amber-600" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                                      {Math.round((1 - daysLeft / 30) * 100)}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </>
              );
            })()}

            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-5 text-center shadow-lg shadow-amber-100">
              <Trophy className="w-10 h-10 text-white mx-auto mb-3" fill="currentColor" />
              <h3 className="text-white mb-1" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Ready for More?</h3>
              <p className="text-amber-100 mb-4" style={{ fontSize: "0.8rem" }}>Browse upcoming tournaments and register now</p>
              <button onClick={() => setActiveTab("upcoming")} className="bg-white text-amber-600 px-6 py-2.5 rounded-xl hover:bg-amber-50 transition-colors shadow-md" style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                Browse Tournaments
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {registerModal && (
          <RegistrationModal
            tournament={registerModal}
            onConfirm={handleRegisterConfirm}
            onCancel={() => setRegisterModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {challengeJoinModal && (
          <ChallengeJoinModal
            challenge={challengeJoinModal}
            onConfirm={handleChallengeJoinConfirm}
            onCancel={() => setChallengeJoinModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cancelModal && (
          <CancelModal
            itemTitle={cancelModal.title}
            type={cancelModal.type}
            onConfirm={handleCancelConfirm}
            onClose={() => setCancelModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tournamentIntro && (
          <TournamentIntroModal
            tournament={tournamentIntro}
            onClose={() => setTournamentIntro(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {challengeIntro && (
          <ChallengeIntroModal
            challenge={challengeIntro}
            onClose={() => setChallengeIntro(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {matchDetailOpen && (
          <MatchDetailModal onClose={() => setMatchDetailOpen(false)} />
        )}
      </AnimatePresence>

      {/* ── EXPLORE ALL CHALLENGES MODAL ── */}
      <AnimatePresence>
        {exploreChallengesOpen && (() => {
          const allOpen = [...challengesBase]
            .filter(c => calcDaysLeft(c.endDate) > 0)
            .sort((a, b) => calcDaysLeft(a.endDate) - calcDaysLeft(b.endDate));
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4"
              onClick={() => setExploreChallengesOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                onClick={e => e.stopPropagation()}
                className="bg-gray-50 w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col"
                style={{ maxHeight: "90vh" }}
              >
                {/* Header */}
                <div className="bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Flame className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1rem" }}>All Active Challenges</h2>
                      <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{allOpen.length} challenges available</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setExploreChallengesOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1 p-4 space-y-3">
                  {allOpen.map((ch, i) => {
                    const daysLeft = calcDaysLeft(ch.endDate);
                    const joined = joinedChallenges.has(ch.id);
                    const count = challengeParticipants[ch.id];
                    return (
                      <motion.div
                        key={ch.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                      >
                        <div className="flex gap-3 p-3">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={ch.image} alt={ch.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <span
                              className={`absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md text-white ${ch.type === "Official" ? "bg-blue-500" : "bg-amber-500"}`}
                              style={{ fontWeight: 700, fontSize: "0.55rem" }}
                            >
                              {ch.type}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="text-gray-900 line-clamp-1" style={{ fontWeight: 700, fontSize: "0.88rem" }}>{ch.title}</h3>
                              <span className="bg-amber-400 text-amber-900 px-2 py-0.5 rounded-lg flex-shrink-0" style={{ fontWeight: 700, fontSize: "0.65rem" }}>{ch.prize}</span>
                            </div>
                            <p className="text-gray-400 mb-2" style={{ fontSize: "0.68rem" }}>by {ch.creator}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 text-gray-500" style={{ fontSize: "0.68rem" }}>
                                  <Users className="w-3 h-3" /> {count.toLocaleString()}
                                </span>
                                <span className={`flex items-center gap-1 ${daysLeft <= 3 ? "text-red-500" : "text-amber-500"}`} style={{ fontSize: "0.68rem", fontWeight: 600 }}>
                                  <Clock className="w-3 h-3" /> {daysLeft}d left
                                </span>
                              </div>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => { setExploreChallengesOpen(false); setChallengeIntro(ch); }}
                                  className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                  style={{ fontWeight: 700, fontSize: "0.68rem" }}
                                >
                                  Intro
                                </button>
                                <button
                                  onClick={() => { setExploreChallengesOpen(false); handleChallengeClick(ch); }}
                                  className={`px-2.5 py-1 rounded-lg transition-all ${
                                    joined
                                      ? "bg-red-50 text-red-500 border border-red-200"
                                      : "bg-amber-400 text-amber-900 hover:bg-amber-500"
                                  }`}
                                  style={{ fontWeight: 700, fontSize: "0.68rem" }}
                                >
                                  {joined ? "✓ Joined" : "Join Now"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* ── EXPLORE ALL TOURNAMENTS MODAL ── */}
      <AnimatePresence>
        {exploreTournamentsOpen && (() => {
          const allOpen = tournamentsBase.filter(t => t.status !== "Closed");
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4"
              onClick={() => setExploreTournamentsOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                onClick={e => e.stopPropagation()}
                className="bg-gray-50 w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col"
                style={{ maxHeight: "90vh" }}
              >
                {/* Header */}
                <div className="bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1rem" }}>All Tournaments</h2>
                      <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{allOpen.length} tournaments open for registration</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setExploreTournamentsOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1 p-4 space-y-3">
                  {allOpen.map((t, i) => {
                    const count = tournamentParticipants[t.id];
                    const isRegistered = registeredIds.has(t.id);
                    return (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                      >
                        <div className="flex gap-3 p-3">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={t.image} alt={t.sport} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <span className="absolute bottom-1 left-1 text-base">{t.emoji}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-0.5">
                              <h3 className="text-gray-900 line-clamp-1" style={{ fontWeight: 700, fontSize: "0.88rem" }}>{t.title}</h3>
                              <span className="text-amber-500 flex-shrink-0" style={{ fontWeight: 800, fontSize: "0.82rem" }}>{t.prize}</span>
                            </div>
                            <p className="text-gray-400 mb-1.5" style={{ fontSize: "0.68rem" }}>{t.organizer} · {t.type} · {t.level}</p>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="flex items-center gap-1 text-gray-500" style={{ fontSize: "0.65rem" }}>
                                <Calendar className="w-3 h-3" /> {t.date}
                              </span>
                              <span className="flex items-center gap-1 text-gray-500" style={{ fontSize: "0.65rem" }}>
                                <Users className="w-3 h-3" /> {count}/{t.maxParticipants}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded-full border text-xs font-bold ${statusStyle[t.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                {t.status}
                              </span>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => { setExploreTournamentsOpen(false); setTournamentIntro(t); }}
                                  className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                  style={{ fontWeight: 700, fontSize: "0.68rem" }}
                                >
                                  Intro
                                </button>
                                <button
                                  onClick={() => { setExploreTournamentsOpen(false); handleTournamentClick(t); }}
                                  className={`px-2.5 py-1 rounded-lg transition-all ${
                                    isRegistered
                                      ? "bg-red-50 text-red-500 border border-red-200"
                                      : "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
                                  }`}
                                  style={{ fontWeight: 700, fontSize: "0.68rem" }}
                                >
                                  {isRegistered ? "✓ Registered" : "Register"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
