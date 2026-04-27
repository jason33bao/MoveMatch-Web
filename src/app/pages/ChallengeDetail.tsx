import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Send as ShareIcon,
  Users,
  Trophy,
  Upload,
  Star,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  Target,
  Play,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";

// Challenge data
const challengesData: Record<string, any> = {
  "1": {
    title: "30-Day Sprint Challenge",
    creator: "@runcoach_elite",
    creatorType: "KOL",
    description: "Transform your speed in just 30 days! This intensive sprint program combines high-intensity interval training with AI-powered form analysis to help you achieve your fastest times yet.",
    heroImage: "https://images.unsplash.com/photo-1774748855472-aee13a133fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc3ByaW50JTIwdHJhY2slMjBhdGhsZXRlfGVufDF8fHx8MTc3NTczMTAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    participants: 2847,
    maxParticipants: 5000,
    dateRange: "Apr 1-30, 2026",
    location: "Online - Anywhere",
    prize: "$500",
    prizeDetails: "Top 3 finishers win cash prizes",
    difficulty: "Intermediate",
    badge: { text: "🔥 Hot", color: "bg-[#FF3B30]" },
    kol: {
      name: "Coach Marcus Rodriguez",
      handle: "@runcoach_elite",
      avatar: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwY29hY2glMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzU3MzE2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Olympic sprint coach with 15+ years of experience. Trained 50+ athletes to national championships. Passionate about combining traditional technique with AI-powered analysis.",
      verified: true,
      followers: "245K",
      achievements: ["Olympic Coach 🏅", "15+ Years Experience", "50+ Champions"],
      introVideo: {
        thumbnail: "https://images.unsplash.com/photo-1690192336223-063c7197bd29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FjaCUyMGV4cGxhaW5pbmclMjB0ZWNobmlxdWUlMjB3aGl0ZWJvYXJkfGVufDF8fHx8MTc3NTczMTkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        duration: "3:45",
        title: "Welcome to the Sprint Challenge"
      },
      demoVideo: {
        thumbnail: "https://images.unsplash.com/photo-1516487200032-8532cb603261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbnQlMjBzdGFydGluZyUyMGJsb2NrcyUyMGF0aGxldGV8ZW58MXx8fHwxNzc1NzMxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        duration: "8:22",
        title: "Sprint Technique Demonstration"
      }
    },
    requirements: ["Running shoes", "Smartphone for recording", "Open space (100m minimum)"],
    objectives: [
      "Complete 20 sprint sessions in 30 days",
      "Achieve 15% improvement in average speed",
      "Maintain consistent form throughout challenge",
      "Upload video proof of at least 15 sessions"
    ],
    aiScoring: {
      title: "AI Performance Analysis",
      description: "Our AI Coach evaluates your sprinting technique:",
      criteria: [
        { name: "Stride Frequency", description: "Cadence, rhythm consistency, and turnover rate", weight: 30 },
        { name: "Body Posture", description: "Torso angle, head position, and core engagement", weight: 25 },
        { name: "Arm Movement", description: "Swing mechanics, coordination with leg drive", weight: 20 },
        { name: "Speed Progression", description: "Improvement over time and consistency", weight: 25 }
      ]
    },
    postImages: [
      "https://images.unsplash.com/photo-1758521959972-83d0bd10a152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uZXIlMjB0cmFpbmluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzc1NzMxMDIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1774748855472-aee13a133fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc3ByaW50JTIwdHJhY2slMjBhdGhsZXRlfGVufDF8fHx8MTc3NTczMTAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  "2": {
    title: "Mindful Yoga Journey",
    creator: "@zenmaster_flow",
    creatorType: "KOL",
    description: "A 21-day journey to inner peace and physical strength. Each day brings a new yoga flow designed to improve flexibility, balance, and mindfulness through AI-guided posture correction.",
    heroImage: "https://images.unsplash.com/photo-1639414302834-0fb9f594c2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc3NTY4Mzg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    participants: 1523,
    maxParticipants: 3000,
    dateRange: "Apr 5-25, 2026",
    location: "Online - Anywhere",
    prize: "Premium",
    prizeDetails: "1-year premium membership for top performers",
    difficulty: "All Levels",
    badge: { text: "Trending", color: "bg-purple-500" },
    kol: {
      name: "Aria Chen",
      handle: "@zenmaster_flow",
      avatar: "https://images.unsplash.com/photo-1758274535024-be3faa30f507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwaW5zdHJ1Y3RvciUyMHRlYWNoaW5nJTIwY2xhc3N8ZW58MXx8fHwxNzc1NzE0NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Certified yoga instructor and mindfulness coach. Specializing in integrating ancient practices with modern wellness technology to help you find balance in body and mind.",
      verified: true,
      followers: "180K",
      achievements: ["500-Hour RYT Certified", "Mindfulness Expert", "10+ Years Teaching"],
      introVideo: {
        thumbnail: "https://images.unsplash.com/photo-1572361874545-bf1ff1e21214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwaW5zdHJ1Y3RvciUyMGRlbW9uc3RyYXRpb24lMjBzdHVkaW98ZW58MXx8fHwxNzc1NzMxOTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        duration: "4:12",
        title: "Your 21-Day Journey Begins"
      },
      demoVideo: {
        thumbnail: "https://images.unsplash.com/photo-1611513929735-35a6a0c4ce73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMGNsb3NldXAlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzU3MzE5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        duration: "6:30",
        title: "Foundation Poses & Breathing"
      }
    },
    requirements: ["Yoga mat", "Comfortable clothing", "Quiet space"],
    objectives: [
      "Complete 21 daily yoga sessions",
      "Master 5 advanced poses by end of challenge",
      "Improve flexibility by measurable metrics",
      "Share your journey with the community"
    ],
    aiScoring: {
      title: "AI Form Analysis",
      description: "Our AI Coach evaluates your yoga practice:",
      criteria: [
        { name: "Pose Alignment", description: "Joint positioning, balance, and body symmetry", weight: 35 },
        { name: "Breathing Control", description: "Breath timing and depth coordination", weight: 20 },
        { name: "Flexibility Progress", description: "Range of motion improvements over time", weight: 25 },
        { name: "Consistency", description: "Daily practice adherence and completion rate", weight: 20 }
      ]
    },
    postImages: [
      "https://images.unsplash.com/photo-1717820822247-04ccb0ed40ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcHJhY3RpY2UlMjBwb3NlfGVufDF8fHx8MTc3NTczMTAyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1639414302834-0fb9f594c2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc3NTY4Mzg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  "3": {
    title: "Mountain Cycling Quest",
    creator: "@pedalpower_pro",
    creatorType: "Official",
    description: "Conquer 500km of elevation in 45 days! This cycling challenge takes you through virtual mountain routes with real-time AI coaching to optimize your climbing technique and endurance.",
    heroImage: "https://images.unsplash.com/photo-1720749407269-b92e86cffb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaW5nJTIwcm9hZCUyMGJpa2UlMjByYWNlfGVufDF8fHx8MTc3NTczMTAyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    participants: 892,
    maxParticipants: 2000,
    dateRange: "Apr 10 - May 25, 2026",
    location: "Online - Anywhere",
    prize: "$1000",
    prizeDetails: "Prize pool split among top 5 climbers",
    difficulty: "Advanced",
    badge: { text: "Elite", color: "bg-indigo-600" },
    requirements: ["Bicycle", "Cycling computer or smartphone", "Safety gear"],
    objectives: [
      "Complete 500km total elevation gain",
      "Log minimum 30 rides during challenge period",
      "Maintain average cadence above 80 RPM",
      "Complete at least 3 climbs over 1000m"
    ],
    aiScoring: {
      title: "AI Technique Evaluation",
      description: "Our AI Coach analyzes your cycling performance:",
      criteria: [
        { name: "Pedaling Efficiency", description: "Power distribution, cadence consistency", weight: 30 },
        { name: "Climbing Posture", description: "Body position, weight distribution on hills", weight: 25 },
        { name: "Endurance Metrics", description: "Heart rate zones, recovery patterns", weight: 25 },
        { name: "Progress Rate", description: "Improvement in elevation gain over time", weight: 20 }
      ]
    },
    postImages: [
      "https://images.unsplash.com/photo-1531578001713-f79d396f134f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaW5nJTIwY29tcGV0aXRpb24lMjBtb3VudGFpbnxlbnwxfHx8fDE3NzU3MzEwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1720749407269-b92e86cffb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaW5nJTIwcm9hZCUyMGJpa2UlMjByYWNlfGVufDF8fHx8MTc3NTczMTAyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  }
};

// Leaderboard participants
const leaderboardData = [
  { rank: 1, name: "Marcus J.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus1&backgroundColor=ffd700", score: 2847, progress: 95, badge: "👑" },
  { rank: 2, name: "Sarah C.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah1&backgroundColor=c0c0c0", score: 2654, progress: 88, badge: "🥈" },
  { rank: 3, name: "Alex R.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex1&backgroundColor=cd7f32", score: 2431, progress: 82, badge: "🥉" },
  { rank: 4, name: "Jordan K.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan1&backgroundColor=b6e3f4", score: 2205, progress: 76 },
  { rank: 5, name: "Taylor B.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor1&backgroundColor=ffd5dc", score: 2098, progress: 71 },
];

// Social Feed Posts
const socialPosts = [
  {
    id: 1,
    user: "Jordan Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan2&backgroundColor=74b9ff",
    caption: "Week 3 complete! My stride has never felt this strong. The AI feedback on my posture has been a game-changer 💪🏃‍♂️ #SprintChallenge #Progress",
    likes: 342,
    comments: 24,
    timeAgo: "2h ago",
  },
  {
    id: 2,
    user: "Emma Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma2&backgroundColor=fd79a8",
    caption: "Morning run done! Hit a new PR today. This challenge is pushing me in the best way 🔥 Who else is feeling the burn?",
    likes: 289,
    comments: 12,
    timeAgo: "4h ago",
  },
];

export function ChallengeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [joined, setJoined] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [uploadedResult, setUploadedResult] = useState(false);

  const challenge = challengesData[id || "1"] || challengesData["1"];

  // Get challenge-specific post images
  const challengePosts = socialPosts.map((post, idx) => ({
    ...post,
    photo: challenge.postImages[idx] || challenge.postImages[0]
  }));

  const handleJoin = () => {
    setJoined(true);
    toast.success("Successfully joined the challenge!");
  };

  const handleLike = (postId: number) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const handleUploadResult = () => {
    setUploadedResult(true);
    toast.success("Result uploaded! AI is analyzing your performance...");
  };

  return (
    <div className="w-full min-h-screen bg-white pb-24 md:pb-8 flex flex-col font-sans">
      
      {/* HERO SECTION */}
      <div className="relative h-[350px] md:h-[450px] w-full shrink-0">
        <img 
          src={challenge.heroImage} 
          alt={challenge.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        
        <button 
          onClick={() => navigate("/community", { state: { activeTab: "challenges" } })}
          className="absolute top-4 left-4 p-2.5 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end gap-4">
          <div className="flex-1">
            <span className={`inline-block ${challenge.badge.color} text-white text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wide shadow-md`}>
              {challenge.badge.text}
            </span>
            <h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight shadow-sm">
              {challenge.title}
            </h1>
            <p className="text-white/90 text-sm mt-2 font-medium">
              Created by {challenge.creator}
            </p>
          </div>
          
          {challenge.prize && (
            <div className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 px-4 py-3 rounded-xl text-center shadow-xl transform rotate-2 border-2 border-yellow-200 shrink-0">
              <p className="text-yellow-900 font-black text-2xl leading-none">{challenge.prize}</p>
              <p className="text-yellow-900 text-[10px] font-extrabold uppercase tracking-widest mt-1">Prize</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-2xl w-full mx-auto">
        
        {/* ACTION BAR */}
        <div className="px-6 mt-8">
          {!joined ? (
            <button 
              onClick={handleJoin}
              className="w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all bg-[#00D166] hover:bg-[#00B856] text-white hover:shadow-xl hover:-translate-y-0.5"
            >
              Join Challenge
            </button>
          ) : (
            <div className="flex gap-3">
              <button 
                disabled
                className="flex-1 py-4 rounded-xl font-bold text-lg shadow-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              >
                Joined ✓
              </button>
              <button 
                onClick={handleUploadResult}
                disabled={uploadedResult}
                className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                  uploadedResult
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-[#00D166] hover:bg-[#00B856] text-white hover:shadow-xl hover:-translate-y-0.5"
                }`}
              >
                {uploadedResult ? (
                  "Uploaded ✓"
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Progress
                  </span>
                )}
              </button>
            </div>
          )}
          
          <div className="flex items-center justify-center gap-4 mt-4 text-gray-500 text-sm font-medium flex-wrap">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {challenge.dateRange}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {challenge.participants.toLocaleString()} joined
            </span>
          </div>
        </div>

        {/* CHALLENGE DETAILS */}
        <div className="px-6 mt-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">About This Challenge</h2>
          <p className="text-gray-700 text-[15px] leading-relaxed mb-5">
            {challenge.description}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <MapPin className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-xs text-blue-700 font-semibold uppercase tracking-wide">Location</p>
              <p className="text-sm font-bold text-blue-900 mt-1">{challenge.location}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <Trophy className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-xs text-purple-700 font-semibold uppercase tracking-wide">Difficulty</p>
              <p className="text-sm font-bold text-purple-900 mt-1">{challenge.difficulty}</p>
            </div>
          </div>
        </div>

        {/* KOL SECTION - Only show for KOL challenges */}
        {challenge.creatorType === "KOL" && challenge.kol && (
          <div className="px-6 mt-10">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">Meet Your Coach</h2>
            
            {/* KOL Profile Card */}
            <div className="bg-gradient-to-br from-[#00D166]/5 via-emerald-50/50 to-teal-50/50 rounded-2xl p-6 border border-[#00D166]/20 shadow-sm mb-5">
              <div className="flex gap-4 items-start mb-4">
                <div className="relative">
                  <img 
                    src={challenge.kol.avatar} 
                    alt={challenge.kol.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  {challenge.kol.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-[#00D166] rounded-full p-1.5 border-2 border-white shadow-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-gray-900 text-lg">{challenge.kol.name}</h3>
                  <p className="text-[#00D166] text-sm font-semibold mb-1">{challenge.kol.handle}</p>
                  <p className="text-gray-600 text-xs font-medium flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {challenge.kol.followers} followers
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {challenge.kol.bio}
              </p>

              {/* Achievements */}
              <div className="flex flex-wrap gap-2">
                {challenge.kol.achievements.map((achievement: string, idx: number) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 bg-white rounded-full text-gray-700 font-semibold text-xs shadow-sm border border-gray-100"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>

            {/* Videos Section */}
            <div className="space-y-3">
              {/* Intro Video */}
              {challenge.kol.introVideo && (
                <div 
                  onClick={() => toast.info("Video player coming soon!")}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
                >
                  <img 
                    src={challenge.kol.introVideo.thumbnail}
                    alt={challenge.kol.introVideo.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-[#00D166] ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-white font-bold text-sm mb-1">{challenge.kol.introVideo.title}</p>
                        <p className="text-white/80 text-xs font-medium">Official Introduction</p>
                      </div>
                      <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-white text-xs font-bold">
                        {challenge.kol.introVideo.duration}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Video */}
              {challenge.kol.demoVideo && (
                <div 
                  onClick={() => toast.info("Video player coming soon!")}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
                >
                  <img 
                    src={challenge.kol.demoVideo.thumbnail}
                    alt={challenge.kol.demoVideo.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-[#00D166] ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-white font-bold text-sm mb-1">{challenge.kol.demoVideo.title}</p>
                        <p className="text-white/80 text-xs font-medium">Technique Demonstration</p>
                      </div>
                      <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-white text-xs font-bold">
                        {challenge.kol.demoVideo.duration}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* REQUIREMENTS */}
        <div className="px-6 mt-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">What You'll Need</h2>
          <div className="flex flex-wrap gap-2">
            {challenge.requirements.map((item: string, idx: number) => (
              <span 
                key={idx}
                className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold text-sm shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* CHALLENGE OBJECTIVES */}
        <div className="px-6 mt-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100 shadow-sm">
            <div className="flex gap-3 items-start mb-4">
              <div className="text-2xl bg-white p-2 rounded-xl shadow-sm">🎯</div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">Challenge Objectives</h3>
                <p className="text-gray-600 text-sm">Complete these goals to win</p>
              </div>
            </div>
            <ul className="space-y-3">
              {challenge.objectives.map((objective: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-green-100">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#00D166] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 text-[15px] leading-relaxed">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI SCORING CRITERIA */}
        <div className="px-6 mt-8">
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex gap-4 items-start mb-5">
              <div className="text-2xl bg-white p-2 rounded-xl shadow-sm">🤖</div>
              <div className="flex-1">
                <h3 className="font-extrabold text-gray-900 block mb-1">{challenge.aiScoring.title}</h3>
                <p className="text-gray-600 text-sm">{challenge.aiScoring.description}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {challenge.aiScoring.criteria.map((criterion: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 text-[15px]">{criterion.name}</h4>
                    <span className="text-[#00D166] font-extrabold text-sm bg-[#00D166]/10 px-2.5 py-1 rounded-full">
                      {criterion.weight}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {criterion.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRIZE DETAILS */}
        {challenge.prizeDetails && (
          <div className="px-6 mt-8">
            <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-yellow-200 shadow-md">
              <div className="flex gap-3 items-start">
                <Award className="w-6 h-6 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg mb-1">Prize Pool</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{challenge.prizeDetails}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LIVE LEADERBOARD */}
        <div className="px-6 mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-gray-900">Live Leaderboard</h2>
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#00D166] bg-[#00D166]/10 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              LIVE
            </span>
          </div>

          {/* Top 3 Podium */}
          <div className="flex justify-center items-end gap-4 mb-6">
            {leaderboardData.slice(0, 3).map((user) => (
              <motion.div 
                key={user.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: user.rank * 0.1 }}
                className={`flex flex-col items-center ${user.rank === 1 ? 'order-2' : user.rank === 2 ? 'order-1' : 'order-3'}`}
              >
                <span className="text-2xl mb-2">{user.badge}</span>
                <div className={`relative rounded-full p-1 bg-white border-2 shadow-lg ${
                  user.rank === 1 ? 'border-yellow-400 border-4' : 
                  user.rank === 2 ? 'border-gray-300' : 
                  'border-orange-300'
                }`}>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className={`rounded-full bg-gray-50 ${user.rank === 1 ? 'w-20 h-20' : 'w-14 h-14'}`}
                  />
                </div>
                <span className="text-sm font-bold text-gray-900 mt-3">{user.name}</span>
                <span className="text-xs font-semibold text-gray-500 mt-0.5">{user.score.toLocaleString()} pts</span>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-[#00D166] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${user.progress}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rest of leaderboard */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {leaderboardData.slice(3, 5).map((user, idx) => (
              <motion.div 
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (idx + 3) * 0.1 }}
                className="flex items-center gap-4 p-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-black text-gray-400 w-8">{user.rank}</span>
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200" />
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[120px]">
                      <div 
                        className="bg-[#00D166] h-1.5 rounded-full"
                        style={{ width: `${user.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{user.progress}%</span>
                  </div>
                </div>
                <span className="font-bold text-gray-700 text-sm">{user.score.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={() => toast.info("Full leaderboard coming soon!")}
            className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-semibold hover:border-[#00D166] hover:text-[#00D166] transition-colors text-sm"
          >
            View Full Leaderboard
          </button>
        </div>

        {/* SOCIAL FEED */}
        <div className="mt-10 bg-gray-50/50 pt-2 pb-6">
          <h2 className="text-xl font-extrabold text-gray-900 px-6 mb-4">Community Posts</h2>
          <div className="space-y-4">
            {challengePosts.map(post => (
              <div key={post.id} className="bg-white border-y md:border md:rounded-2xl border-gray-100 p-5 md:mx-6 shadow-sm">
                
                <div className="flex items-center gap-3 mb-4">
                  <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200" />
                  <div>
                    <p className="font-bold text-gray-900 text-[15px]">{post.user}</p>
                    <p className="text-[13px] text-gray-500 font-medium">{post.timeAgo}</p>
                  </div>
                </div>
                
                <p className="text-gray-800 text-[15px] leading-relaxed mb-4">
                  {post.caption}
                </p>
                
                <div className="rounded-xl overflow-hidden mb-4 bg-gray-100 border border-gray-100">
                  <img 
                    src={post.photo} 
                    alt="Post content" 
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                
                <div className="flex items-center gap-6 pt-1">
                   <button 
                     onClick={() => handleLike(post.id)}
                     className={`flex items-center gap-2 transition-colors ${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                   >
                     <Heart className={`w-[22px] h-[22px] ${likedPosts.has(post.id) ? 'fill-current' : ''}`} /> 
                     <span className="text-sm font-semibold">{likedPosts.has(post.id) ? post.likes + 1 : post.likes}</span>
                   </button>
                   
                   <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                     <MessageCircle className="w-[22px] h-[22px]"/> 
                     <span className="text-sm font-semibold">{post.comments}</span>
                   </button>
                   
                   <button 
                     onClick={() => toast.success("Link copied!")}
                     className="flex items-center gap-2 text-gray-400 ml-auto hover:text-[#00D166] transition-colors"
                   >
                     <ShareIcon className="w-5 h-5"/>
                   </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action to post */}
          <div className="px-6 mt-6">
            <button 
              onClick={() => toast.info("Post creation coming soon!")}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-semibold hover:border-[#00D166] hover:text-[#00D166] transition-colors"
            >
              Share Your Progress
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}