import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  MapPin,
  Clock,
  Users,
  Star,
  ArrowLeft,
  Shield,
  MessageSquare,
  Calendar,
  Share2,
  Send,
  ThumbsUp,
  Heart,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { useAppContext } from "../context/AppContext";

const basketballImg =
  "https://images.unsplash.com/photo-1770042572491-0c3f1ca7d6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwdXJiYW4lMjBzdHJlZXQlMjBzcG9ydHxlbnwxfHx8fDE3NzQ5NTA2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const tennisImg =
  "https://images.unsplash.com/photo-1761286753856-2f39b4413c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBjb3VydCUyMGFjdGlvbnxlbnwxfHx8fDE3NzQ5NTA2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const runningImg =
  "https://images.unsplash.com/photo-1758586326115-d4e9052b8f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwbWFyYXRob24lMjByYWNlJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc0OTUwNjU5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const yogaImg =
  "https://images.unsplash.com/photo-1758274525887-d95d19269f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwZml0bmVzcyUyMGdyb3VwJTIwY2xhc3N8ZW58MXx8fHwxNzc0OTUwNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080";
const swimmingImg =
  "https://images.unsplash.com/photo-1572594505398-97a384b34ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBhdGhsZXRlfGVufDF8fHx8MTc3NDk1MDY2NHww&ixlib=rb-4.1.0&q=80&w=1080";
const golfImg =
  "https://images.unsplash.com/photo-1763917379121-91130139aca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xmJTIwc3dpbmclMjBjb3Vyc2V8ZW58MXx8fHwxNzc0OTUwNjY0fDA&ixlib=rb-4.1.0&q=80&w=1080";
const soccerImg =
  "https://images.unsplash.com/photo-1549923015-badf41b04831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMG1hdGNoJTIwc3RhZGl1bXxlbnwxfHx8fDE3NzQ5NTA2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const cyclingImg =
  "https://images.unsplash.com/photo-1720749407269-b92e86cffb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaW5nJTIwYmlrZSUyMHJhY2UlMjBvdXRkb29yfGVufDF8fHx8MTc3NDk1MDY3MHww&ixlib=rb-4.1.0&q=80&w=1080";

const levelColors: Record<string, string> = {
  Beginner: "#00D26A",
  Intermediate: "#3B82F6",
  Advanced: "#F59E0B",
  "All Levels": "#7C3AED",
};

export const allActivities = [
  {
    id: 1,
    sport: "Basketball",
    title: "3v3 Pickup Game",
    location: "Riverside Court",
    address: "125 Riverside Dr, Brooklyn, NY 11201",
    time: "Today, 4:00 PM",
    date: "April 15, 2026",
    participants: 4,
    maxParticipants: 6,
    level: "Intermediate",
    image: basketballImg,
    distance: "0.8 km",
    rating: 4.8,
    reviews: 23,
    isVerified: true,
    tags: ["Casual", "Outdoors", "Beginner Friendly"],
    organizer: "Jordan M.",
    organizerId: 1,
    description:
      "Join us for a fun and energetic 3v3 basketball pickup game at Riverside Court! This is a casual game perfect for intermediate players looking to stay active, meet new people, and enjoy the sport. We'll be playing standard streetball rules with half-court setup. Bring your A-game and good vibes! All equipment provided, just bring yourself and some water.",
  },
  {
    id: 2,
    sport: "Tennis",
    title: "Singles Practice",
    location: "City Tennis Club",
    address: "450 Park Avenue, New York, NY 10022",
    time: "Tomorrow, 9:00 AM",
    date: "April 16, 2026",
    participants: 1,
    maxParticipants: 2,
    level: "Advanced",
    image: tennisImg,
    distance: "1.2 km",
    rating: 4.9,
    reviews: 67,
    isVerified: true,
    tags: ["Competitive", "1-on-1"],
    organizer: "Sarah K.",
    organizerId: 2,
    description:
      "Advanced singles practice session at City Tennis Club. Looking for a competitive player to rally with and work on match play. I'm NTRP 5.0 level and prefer fast-paced baseline rallies with emphasis on strategy and footwork. Court is reserved and ready to go. Let's push each other to improve!",
  },
  {
    id: 3,
    sport: "Running",
    title: "Morning 5K Run",
    location: "Riverside Park",
    address: "Riverside Park, West 72nd St, New York, NY 10023",
    time: "Tomorrow, 7:00 AM",
    date: "April 16, 2026",
    participants: 8,
    maxParticipants: 20,
    level: "All Levels",
    image: runningImg,
    distance: "0.4 km",
    rating: 4.7,
    reviews: 45,
    isVerified: false,
    tags: ["Beginner Friendly", "Group", "Social"],
    organizer: "Park Run Club",
    organizerId: 3,
    description:
      "Start your day right with our community 5K run through beautiful Riverside Park! This is a social run welcoming all paces and fitness levels. We'll meet at the main entrance and follow the scenic riverside path. Whether you're training for a race or just looking to stay active, you'll find supportive runners here. Post-run coffee meetup included!",
  },
  {
    id: 4,
    sport: "Yoga",
    title: "Sunrise Yoga Session",
    location: "Central Park Lawn",
    address: "Central Park, Sheep Meadow, New York, NY 10019",
    time: "Today, 6:30 AM",
    date: "April 15, 2026",
    participants: 12,
    maxParticipants: 25,
    level: "Beginner",
    image: yogaImg,
    distance: "2.1 km",
    rating: 4.9,
    reviews: 89,
    isVerified: true,
    tags: ["Wellness", "Outdoor", "Mindfulness"],
    organizer: "ZenFlow Studio",
    organizerId: 4,
    description:
      "Welcome the day with our peaceful sunrise yoga session in the heart of Central Park! This beginner-friendly class combines gentle Vinyasa flow with breathwork and meditation. Perfect for all levels, we provide yoga mats and props. Experience the magic of practicing outdoors as the city wakes up. Bring water and an open heart!",
  },
  {
    id: 5,
    sport: "Swimming",
    title: "Masters Swim Practice",
    location: "Aquatic Center",
    address: "340 Amsterdam Ave, New York, NY 10023",
    time: "Wed, 6:00 PM",
    date: "April 17, 2026",
    participants: 6,
    maxParticipants: 12,
    level: "Advanced",
    image: swimmingImg,
    distance: "3.0 km",
    rating: 4.6,
    reviews: 31,
    isVerified: true,
    tags: ["Competitive", "Indoor", "Technique"],
    organizer: "SwimMasters",
    organizerId: 5,
    description:
      "Join our advanced Masters swim practice for competitive swimmers looking to refine technique and build endurance. Our coached session includes structured interval sets, stroke drills, and video analysis. Swimmers should be comfortable with all four strokes and ready for high-intensity training. Bring your competitive spirit and swim gear!",
  },
  {
    id: 6,
    sport: "Golf",
    title: "9-Hole Casual Round",
    location: "Green Valley Golf",
    address: "1055 Golf Club Rd, Brooklyn, NY 11234",
    time: "Sat, 10:00 AM",
    date: "April 20, 2026",
    participants: 2,
    maxParticipants: 4,
    level: "Intermediate",
    image: golfImg,
    distance: "5.4 km",
    rating: 4.5,
    reviews: 14,
    isVerified: false,
    tags: ["Casual", "Weekend", "Social"],
    organizer: "GolfPro Dave",
    organizerId: 6,
    description:
      "Looking for friendly golfers to join a relaxed 9-hole round at Green Valley Golf Course! This is a casual outing focused on enjoying the game and beautiful scenery rather than competitive play. All skill levels welcome, but some experience preferred. Tee time is reserved, and we'll grab lunch at the clubhouse after. Bring your clubs and good humor!",
  },
  {
    id: 7,
    sport: "Soccer",
    title: "5v5 Weekend Match",
    location: "Sport Complex",
    address: "555 Sports Complex Dr, Queens, NY 11101",
    time: "Sun, 2:00 PM",
    date: "April 21, 2026",
    participants: 7,
    maxParticipants: 10,
    level: "Intermediate",
    image: soccerImg,
    distance: "1.8 km",
    rating: 4.7,
    reviews: 52,
    isVerified: true,
    tags: ["Team", "Competitive", "Outdoors"],
    organizer: "FC United",
    organizerId: 7,
    description:
      "Join FC United for an exciting 5v5 soccer match this Sunday! We're looking for skilled players to complete our roster for a friendly but competitive game. The field is booked for 2 hours, and we'll rotate players to keep everyone engaged. Shin guards required, cleats recommended. Come ready to play hard and have fun with a great community of soccer enthusiasts!",
  },
  {
    id: 8,
    sport: "Cycling",
    title: "City Cycling Tour",
    location: "Harbor Bike Path",
    address: "Hudson River Greenway, Pier 84, New York, NY 10036",
    time: "Sat, 8:00 AM",
    date: "April 20, 2026",
    participants: 15,
    maxParticipants: 30,
    level: "All Levels",
    image: cyclingImg,
    distance: "2.3 km",
    rating: 4.8,
    reviews: 77,
    isVerified: true,
    tags: ["Scenic", "Group", "Social"],
    organizer: "CycleCity",
    organizerId: 8,
    description:
      "Experience the beauty of NYC from two wheels! Our guided city cycling tour takes you along the stunning Harbor Bike Path and through scenic waterfront routes. This all-levels ride moves at a comfortable pace with plenty of stops for photos and refreshments. Bring your own bike or rent one nearby. Safety briefing included, helmets required. Perfect way to explore the city and meet fellow cycling enthusiasts!",
  },
];

const baseParticipantPool = [
  { id: 1, name: "Jordan M.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan&backgroundColor=c0aede" },
  { id: 2, name: "Taylor S.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor&backgroundColor=d1d4f9" },
  { id: 3, name: "Morgan K.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan&backgroundColor=ffd5dc" },
  { id: 4, name: "Casey R.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey&backgroundColor=b6e3f4" },
  { id: 5, name: "Riley P.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley&backgroundColor=c0aede" },
  { id: 6, name: "Sam T.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam&backgroundColor=d1d4f9" },
  { id: 7, name: "Dana W.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dana&backgroundColor=b6e3f4" },
  { id: 8, name: "Jamie L.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie&backgroundColor=ffd5dc" },
  { id: 9, name: "Avery N.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Avery&backgroundColor=c0aede" },
  { id: 10, name: "Parker J.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Parker&backgroundColor=d1d4f9" },
];

const currentUser = {
  id: 0,
  name: "Alex Chen (You)",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4",
};

const comments = [
  {
    id: 1,
    user: "Jordan M.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan&backgroundColor=c0aede",
    text: "Super excited for this! Been looking for a good pickup game. See you all there! 🏀",
    time: "2 hours ago",
    likes: 5,
  },
  {
    id: 2,
    user: "Taylor S.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor&backgroundColor=d1d4f9",
    text: "What's the skill level like? I'm intermediate but a bit rusty.",
    time: "1 hour ago",
    likes: 2,
  },
];

export function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isActivityJoined, joinActivity, leaveActivity } = useAppContext();
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showAllParticipants, setShowAllParticipants] = useState(false);

  const activity = allActivities.find((act) => act.id === Number(id));

  if (!activity) {
    return (
      <div className="w-full px-4 py-8 max-w-4xl mx-auto pb-24 md:pb-8">
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-gray-900 mb-2" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
            Activity Not Found
          </h2>
          <p className="text-gray-600 mb-6" style={{ fontSize: "0.95rem" }}>
            The activity you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 bg-[#00D26A] text-black px-6 py-3 rounded-xl hover:bg-[#00C060] transition-all"
            style={{ fontWeight: 700, fontSize: "0.9rem" }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Discover
          </button>
        </div>
      </div>
    );
  }

  const joined = isActivityJoined(activity.id);
  const currentParticipantCount = activity.participants + (joined ? 1 : 0);
  const fillPercent = Math.round((currentParticipantCount / activity.maxParticipants) * 100);
  const spotsLeft = activity.maxParticipants - currentParticipantCount;

  const displayParticipants = [
    ...baseParticipantPool.slice(0, activity.participants),
    ...(joined ? [currentUser] : []),
  ];

  const handleJoinClick = () => {
    setJoinDialogOpen(true);
  };

  const confirmJoin = () => {
    joinActivity({
      id: activity.id,
      title: activity.title,
      sport: activity.sport,
      location: activity.location,
      time: activity.time,
      date: activity.date,
      image: activity.image,
      level: activity.level,
      joinedAt: new Date().toISOString(),
    });
    toast.success("Successfully joined!", {
      description: "You'll receive a confirmation email shortly.",
      duration: 4000,
    });
    setJoinDialogOpen(false);
  };

  const handleLeave = () => {
    leaveActivity(activity.id);
    toast.info("Left activity");
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      toast.success("Comment posted!");
      setNewComment("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full pb-24 md:pb-8 bg-[#FAFAFA] min-h-screen"
    >
      {/* Hero Banner */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={activity.image} alt={activity.sport} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 md:top-6 left-4 md:left-6 bg-white/95 backdrop-blur-sm text-gray-900 p-2.5 md:p-3 rounded-full hover:bg-white transition-all shadow-lg hover:scale-110 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => toast.success("Link copied!", { description: "Activity link copied to clipboard" })}
          className="absolute top-4 md:top-6 right-4 md:right-6 bg-white/95 backdrop-blur-sm text-gray-900 p-2.5 md:p-3 rounded-full hover:bg-white transition-all shadow-lg hover:scale-110 active:scale-95"
        >
          <Share2 className="w-5 h-5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {activity.isVerified && (
                <span
                  className="bg-[#00D26A] text-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
                  style={{ fontSize: "0.75rem", fontWeight: 700 }}
                >
                  <Shield className="w-4 h-4" /> Verified Organizer
                </span>
              )}
              <span
                className="px-3 py-1.5 rounded-full text-white shadow-lg"
                style={{ fontSize: "0.75rem", fontWeight: 700, backgroundColor: levelColors[activity.level] || "#888" }}
              >
                {activity.level}
              </span>
              <span
                className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
                style={{ fontSize: "0.75rem", fontWeight: 700 }}
              >
                <MapPin className="w-4 h-4" /> {activity.distance}
              </span>
            </div>
            <h1
              className="text-white mb-2"
              style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, lineHeight: 1.1 }}
            >
              {activity.title}
            </h1>
            <p className="text-white/90 flex items-center gap-2 flex-wrap" style={{ fontSize: "1rem", fontWeight: 500 }}>
              <span className="bg-violet-500/30 backdrop-blur-sm px-2.5 py-1 rounded-lg">{activity.sport}</span>
              <span>•</span>
              <span>Organized by {activity.organizer}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Core Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-7"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-amber-500" fill="currentColor" />
                  <div>
                    <p className="text-gray-900" style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1 }}>
                      {activity.rating}
                    </p>
                    <p className="text-gray-500" style={{ fontSize: "0.8rem" }}>{activity.reviews} reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {activity.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                      style={{ fontSize: "0.75rem", fontWeight: 600 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-gray-600" style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Date & Time
                      </p>
                      <p className="text-gray-900" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{activity.time}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 pl-14" style={{ fontSize: "0.8rem" }}>{activity.date}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600" style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Venue
                      </p>
                      <p className="text-gray-900" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{activity.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 pl-14" style={{ fontSize: "0.8rem" }}>{activity.address}</p>
                </div>
              </div>

              {/* Participant Progress */}
              <div className="bg-gradient-to-br from-violet-50 to-violet-50/50 rounded-xl p-5 border border-violet-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-violet-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-gray-900" style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                        {currentParticipantCount}/{activity.maxParticipants}
                      </p>
                      <p className="text-gray-600" style={{ fontSize: "0.8rem" }}>participants joined</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-violet-600" style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: 1 }}>{fillPercent}%</p>
                    <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>full</p>
                  </div>
                </div>
                <div className="w-full bg-violet-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-violet-500 to-violet-600 h-3 rounded-full"
                    initial={{ width: `${(activity.participants / activity.maxParticipants) * 100}%` }}
                    animate={{ width: `${fillPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-violet-600 mt-3 text-center" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} remaining` : "Activity is full"}
                </p>
              </div>
            </motion.div>

            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-7"
            >
              <h2 className="text-gray-900 mb-4 flex items-center gap-2" style={{ fontSize: "1.4rem", fontWeight: 800 }}>
                <MessageSquare className="w-6 h-6 text-[#00D26A]" />
                Event Description
              </h2>
              <p className="text-gray-600 leading-relaxed" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                {activity.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-gray-100">
                {activity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                    style={{ fontSize: "0.85rem", fontWeight: 600 }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Participants Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-7"
            >
              <h2 className="text-gray-900 flex items-center gap-2 mb-5" style={{ fontSize: "1.4rem", fontWeight: 800 }}>
                <Users className="w-6 h-6 text-[#00D26A]" />
                Participants ({currentParticipantCount})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {displayParticipants.slice(0, showAllParticipants ? displayParticipants.length : 6).map((participant) => (
                  <div
                    key={participant.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      participant.id === 0
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`truncate ${participant.id === 0 ? "text-emerald-700" : "text-gray-900"}`}
                        style={{ fontSize: "0.85rem", fontWeight: 700 }}
                      >
                        {participant.name}
                      </p>
                      <p className="text-gray-500 truncate" style={{ fontSize: "0.7rem" }}>
                        {participant.id === 0 ? "Just joined" : "Participant"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {displayParticipants.length > 6 && (
                <button
                  onClick={() => setShowAllParticipants(!showAllParticipants)}
                  className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                  style={{ fontSize: "0.9rem", fontWeight: 700 }}
                >
                  {showAllParticipants ? "Show Less" : `See All Participants (${displayParticipants.length})`}
                </button>
              )}
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-7"
            >
              <h2 className="text-gray-900 mb-5 flex items-center gap-2" style={{ fontSize: "1.4rem", fontWeight: 800 }}>
                <MessageSquare className="w-6 h-6 text-[#00D26A]" />
                Comments ({comments.length})
              </h2>

              <div className="mb-6">
                <div className="flex gap-3">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4"
                    alt="You"
                    className="w-10 h-10 rounded-full border-2 border-[#00D26A]/30"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10 transition-all resize-none"
                      style={{ fontSize: "0.9rem" }}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handlePostComment}
                        disabled={!newComment.trim()}
                        className="flex items-center gap-2 bg-[#00D26A] text-black px-5 py-2.5 rounded-xl hover:bg-[#00C060] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        style={{ fontSize: "0.85rem", fontWeight: 700 }}
                      >
                        <Send className="w-4 h-4" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full border-2 border-white" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-gray-900" style={{ fontSize: "0.9rem", fontWeight: 700 }}>{comment.user}</p>
                        <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>{comment.time}</p>
                      </div>
                      <p className="text-gray-600 mb-3" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>{comment.text}</p>
                      <div className="flex items-center gap-4">
                        <button
                          className="flex items-center gap-1.5 text-gray-500 hover:text-[#00D26A] transition-colors"
                          style={{ fontSize: "0.8rem", fontWeight: 600 }}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          {comment.likes}
                        </button>
                        <button
                          className="text-gray-500 hover:text-violet-600 transition-colors"
                          style={{ fontSize: "0.8rem", fontWeight: 600 }}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Join CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6 sticky top-4"
            >
              <div className="text-center mb-5">
                <div
                  className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full mb-3"
                  style={{ fontSize: "0.75rem", fontWeight: 700 }}
                >
                  <TrendingUp className="w-4 h-4" />
                  {spotsLeft > 0 ? "Filling Fast" : "Activity Full"}
                </div>
                <p className="text-gray-900 mb-1" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                  {joined ? "You're in! 🎉" : "Don't miss out!"}
                </p>
                <p className="text-gray-600" style={{ fontSize: "0.85rem" }}>
                  {joined
                    ? "You successfully joined this activity"
                    : `Only ${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left`}
                </p>
              </div>

              {joined ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="text-emerald-700" style={{ fontWeight: 700, fontSize: "0.9rem" }}>You've joined!</p>
                      <p className="text-emerald-600" style={{ fontSize: "0.78rem" }}>Confirmation sent to your email</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLeave}
                    className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all"
                    style={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    Leave Activity
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleJoinClick}
                  disabled={spotsLeft === 0}
                  className="w-full py-4 rounded-xl bg-[#00D26A] text-black hover:bg-[#00C060] shadow-lg shadow-[#00D26A]/30 hover:scale-105 active:scale-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-3"
                  style={{ fontSize: "1.05rem", fontWeight: 700 }}
                >
                  Join Activity
                </button>
              )}

              {!joined && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toast.info("Message feature coming soon!")}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    <MessageSquare className="w-5 h-5 mx-auto" />
                  </button>
                  <button
                    onClick={() => toast.info("Add to calendar feature coming soon!")}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    <Calendar className="w-5 h-5 mx-auto" />
                  </button>
                  <button
                    onClick={() => toast.success("Saved to favorites!")}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-all"
                  >
                    <Heart className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Host Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6"
            >
              <h3 className="text-gray-900 mb-4" style={{ fontSize: "1.1rem", fontWeight: 800 }}>Hosted by</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.organizer}&backgroundColor=b6e3f4`}
                    alt={activity.organizer}
                    className="w-14 h-14 rounded-2xl border-2 border-gray-100"
                  />
                  {activity.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <Shield className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontWeight: 700, fontSize: "1rem" }}>{activity.organizer}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-500" fill="currentColor" />
                    <span className="text-gray-700" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{activity.rating}</span>
                    <span className="text-gray-500" style={{ fontSize: "0.75rem" }}>({activity.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toast.info("Message organizer coming soon!")}
                className="w-full py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                style={{ fontSize: "0.85rem", fontWeight: 600 }}
              >
                Message Organizer
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Join Confirmation Dialog */}
      <AlertDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00D26A]" />
              Join Activity?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You're about to join{" "}
              <span className="font-semibold text-gray-900">{activity.title}</span>.
              <br />
              <br />
              You'll receive confirmation details via email. You can cancel up to 2 hours before the activity starts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmJoin} className="bg-[#00D26A] text-black hover:bg-[#00C060]">
              Confirm Join
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
