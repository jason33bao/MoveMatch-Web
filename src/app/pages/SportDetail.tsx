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
  Play,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";

// Sport activities data
const sportsData: Record<string, any> = {
  "1": {
    title: "Reverse Basketball",
    creator: "@sportinnovator99",
    description: "Score in your own basket for double points! Flip the objective and master defensive offense. This unique twist on basketball challenges players to rethink traditional strategy.",
    heroImage: "https://images.unsplash.com/photo-1694437590805-cf944ceb41c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjB1cmJhbiUyMG91dGRvb3J8ZW58MXx8fHwxNzc1NzI5NTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    participants: 234,
    maxParticipants: 500,
    skillLevel: "Intermediate",
    equipment: ["Basketball", "Court shoes", "Water bottle"],
    venue: "Standard Basketball Court",
    venueDetails: "Indoor or outdoor court with regulation hoops and markings",
    badge: { text: "New", color: "bg-[#FF3B30]" },
    videos: [
      {
        thumbnail: "https://images.unsplash.com/photo-1659523809015-2b48ced5ebbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwZHJpYmJsaW5nJTIwc2tpbGxzJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzc1NzMxOTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        duration: "5:32",
        title: "How to Play Reverse Basketball",
        type: "Tutorial"
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1721750475973-4ced61c27d93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwanVtcCUyMHNob3QlMjBwZXJmZWN0JTIwZm9ybXxlbnwxfHx8fDE3NzU3MzE5Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        duration: "3:18",
        title: "Top 10 Plays - Week 1",
        type: "Highlights"
      }
    ],
    rules: [
      "Score in your own basket to earn double points",
      "Standard rules apply for fouls and violations",
      "Teams alternate possession every 2 minutes",
      "Winner determined by highest score in 20 minutes"
    ],
    aiScoring: {
      title: "AI Scoring Criteria",
      description: "Our AI Coach analyzes your performance based on:",
      criteria: [
        { name: "Ball Handling", description: "Dribbling control, speed variations, and hand positioning", weight: 25 },
        { name: "Shooting Form", description: "Follow-through, arc trajectory, and body balance", weight: 30 },
        { name: "Defensive Movement", description: "Footwork, positioning, and reaction time", weight: 25 },
        { name: "Strategic Thinking", description: "Decision-making and reverse scoring execution", weight: 20 }
      ]
    },
    postImages: [
      "https://images.unsplash.com/photo-1632436537545-fe9782af4cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwc2hvb3RpbmclMjBob29wfGVufDF8fHx8MTc3NTczMDIzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1762860799648-0a957a2e51a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3NTczMDIzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  "2": {
    title: "Tennis Golf",
    creator: "@courtcreator",
    description: "Hit targets around the court with as few shots as possible. Precision meets power in this hybrid game that combines tennis skills with golf strategy.",
    heroImage: "https://images.unsplash.com/photo-1602012846858-0727988e215b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMHBsYXllcnMlMjBhY3Rpb258ZW58MXx8fHwxNzc1NzI5NTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    participants: 178,
    maxParticipants: 300,
    skillLevel: "All Levels",
    equipment: ["Tennis racket", "Tennis balls", "Target markers"],
    venue: "Tennis Court",
    venueDetails: "Standard tennis court with space for 9 target placements",
    badge: { text: "Popular", color: "bg-purple-500" },
    videos: [
      {
        thumbnail: "https://images.unsplash.com/photo-1646651105426-e8c8ee9badde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBzZXJ2ZSUyMHRlY2huaXF1ZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzU3MzE5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        duration: "4:50",
        title: "Tennis Golf Rules & Strategy",
        type: "Tutorial"
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1618073193718-23a66109f4e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNvY2NlciUyMHNraWxscyUyMHRyYWluaW5nJTIwZHJpbGxzfGVufDF8fHx8MTc3NTczMTkzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        duration: "2:45",
        title: "Best Shots Compilation",
        type: "Highlights"
      }
    ],
    rules: [
      "9 targets placed around the court",
      "Hit each target with fewest shots possible",
      "Shots are counted like golf strokes",
      "Lowest score wins the round"
    ],
    aiScoring: {
      title: "AI Scoring Criteria",
      description: "Our AI Coach analyzes your performance based on:",
      criteria: [
        { name: "Shot Accuracy", description: "Precision in hitting targets, distance control", weight: 35 },
        { name: "Swing Technique", description: "Racket grip, backswing, and follow-through", weight: 25 },
        { name: "Power Control", description: "Ability to modulate force for different distances", weight: 20 },
        { name: "Efficiency", description: "Shots per target and strategic shot selection", weight: 20 }
      ]
    },
    postImages: [
      "https://images.unsplash.com/photo-1661474974389-2c1ad53c9ab0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBzZXJ2ZSUyMG1vdGlvbnxlbnwxfHx8fDE3NzU3MzAyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1759819599139-11dc50b241c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMHByYWN0aWNlJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzc1NzMwMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
};

// Participant avatars
const participants = [
  { name: "Alex M.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex1&backgroundColor=b6e3f4", score: 98 },
  { name: "Jordan K.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan1&backgroundColor=ffd5dc", score: 95 },
  { name: "Sam R.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam1&backgroundColor=c0c0c0", score: 92 },
  { name: "Taylor B.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor1&backgroundColor=d4f1f4", score: 90 },
  { name: "Morgan L.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan1&backgroundColor=ffeaa7", score: 88 },
  { name: "Casey P.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey1&backgroundColor=dfe6e9", score: 87 },
  { name: "Jamie W.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie1&backgroundColor=fab1a0", score: 85 },
  { name: "Drew C.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Drew1&backgroundColor=a29bfe", score: 83 },
];

// Social Feed Posts
const socialPosts = [
  {
    id: 1,
    user: "Marcus Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus2&backgroundColor=74b9ff",
    photo: "https://images.unsplash.com/photo-1775323005381-584af06d83d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMGZpdG5lc3MlMjBvdXRkb29yJTIwd29ya291dHxlbnwxfHx8fDE3NzU3Mjk1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    caption: "Just tried this sport and it's INSANE! 🏀 The reverse scoring mechanic completely changes the strategy. My brain hurts but I love it 😅",
    likes: 156,
    comments: 23,
    timeAgo: "1h ago",
  },
  {
    id: 2,
    user: "Sophia Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia2&backgroundColor=fd79a8",
    photo: "https://images.unsplash.com/photo-1710814824560-943273e8577e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBlcXVpcG1lbnQlMjBneW0lMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzU3Mjk1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    caption: "Training hard for this weekend! The inventor really created something special. Who else is competing? 💪",
    likes: 203,
    comments: 31,
    timeAgo: "3h ago",
  },
];

export function SportDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [joined, setJoined] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [uploadedResult, setUploadedResult] = useState(false);

  const sport = sportsData[id || "1"] || sportsData["1"];

  // Get sport-specific post images
  const sportPosts = socialPosts.map((post, idx) => ({
    ...post,
    photo: sport.postImages[idx] || sport.postImages[0]
  }));

  const handleJoin = () => {
    setJoined(true);
    toast.success("Successfully joined the activity!");
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
          src={sport.heroImage} 
          alt={sport.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        
        <button 
          onClick={() => navigate("/community", { state: { activeTab: "explore" } })}
          className="absolute top-4 left-4 p-2.5 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="absolute bottom-6 left-6 right-6">
          <span className={`inline-block ${sport.badge.color} text-white text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wide shadow-md`}>
            {sport.badge.text}
          </span>
          <h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight shadow-sm">
            {sport.title}
          </h1>
          <p className="text-white/90 text-sm mt-2 font-medium">
            Created by {sport.creator}
          </p>
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
              Join Activity
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
                    Upload Video
                  </span>
                )}
              </button>
            </div>
          )}
          <div className="flex items-center justify-center gap-4 mt-4 text-gray-500 text-sm font-medium flex-wrap">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {sport.participants}/{sport.maxParticipants} joined
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              {sport.skillLevel}
            </span>
          </div>
        </div>

        {/* ACTIVITY DETAILS */}
        <div className="px-6 mt-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">About This Sport</h2>
          <p className="text-gray-700 text-[15px] leading-relaxed">
            {sport.description}
          </p>
        </div>

        {/* WHAT YOU'LL NEED */}
        <div className="px-6 mt-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">What You'll Need</h2>
          
          {/* Equipment */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Required Equipment</h3>
            <div className="flex flex-wrap gap-2">
              {sport.equipment.map((item: string, idx: number) => (
                <span 
                  key={idx}
                  className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold text-sm shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Venue */}
          {sport.venue && (
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Suitable Venue</h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-800 font-semibold text-[15px]">{sport.venue}</p>
                {sport.venueDetails && (
                  <p className="text-gray-600 text-sm mt-1">{sport.venueDetails}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ACTIVITY RULES */}
        <div className="px-6 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 shadow-sm">
            <div className="flex gap-3 items-start mb-4">
              <div className="text-2xl bg-white p-2 rounded-xl shadow-sm">📋</div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">Activity Rules</h3>
                <p className="text-gray-600 text-sm">How to play and compete</p>
              </div>
            </div>
            <ul className="space-y-3">
              {sport.rules.map((rule: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-blue-100">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#00D166] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 text-[15px] leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* VIDEO DEMONSTRATIONS - Only show if videos exist */}
        {sport.videos && sport.videos.length > 0 && (
          <div className="px-6 mt-10">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">Video Demonstrations</h2>
            
            <div className="space-y-3">
              {sport.videos.map((video: any, idx: number) => (
                <div 
                  key={idx}
                  onClick={() => toast.info("Video player coming soon!")}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
                >
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
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
                        <p className="text-white font-bold text-sm mb-1">{video.title}</p>
                        <p className="text-white/80 text-xs font-medium">{video.type}</p>
                      </div>
                      <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-white text-xs font-bold">
                        {video.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI SCORING CRITERIA */}
        <div className="px-6 mt-8">
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex gap-4 items-start mb-5">
              <div className="text-2xl bg-white p-2 rounded-xl shadow-sm">🤖</div>
              <div className="flex-1">
                <h3 className="font-extrabold text-gray-900 block mb-1">{sport.aiScoring.title}</h3>
                <p className="text-gray-600 text-sm">{sport.aiScoring.description}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {sport.aiScoring.criteria.map((criterion: any, idx: number) => (
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

        {/* TOP PARTICIPANTS */}
        <div className="px-6 mt-10">
          <h2 className="text-xl font-extrabold text-gray-900 mb-6">Top Participants</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {participants.slice(0, 8).map((participant, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={participant.avatar} 
                  alt={participant.name}
                  className="w-16 h-16 rounded-full mx-auto mb-2 bg-gray-50 border-2 border-gray-200"
                />
                <p className="font-bold text-gray-900 text-sm truncate">{participant.name}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-semibold text-gray-500">{participant.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SOCIAL FEED */}
        <div className="mt-10 bg-gray-50/50 pt-2 pb-6">
          <h2 className="text-xl font-extrabold text-gray-900 px-6 mb-4">Community Posts</h2>
          <div className="space-y-4">
            {sportPosts.map(post => (
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
              Share Your Experience
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}