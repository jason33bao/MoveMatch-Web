import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams, Link, useNavigate } from "react-router";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Filter,
  Star,
  ChevronDown,
  Sliders,
  X,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Shield,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
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
import { toast } from "sonner";

const basketballImg = "https://images.unsplash.com/photo-1770042572491-0c3f1ca7d6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwdXJiYW4lMjBzdHJlZXQlMjBzcG9ydHxlbnwxfHx8fDE3NzQ5NTA2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const tennisImg = "https://images.unsplash.com/photo-1761286753856-2f39b4413c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBjb3VydCUyMGFjdGlvbnxlbnwxfHx8fDE3NzQ5NTA2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const runningImg = "https://images.unsplash.com/photo-1758586326115-d4e9052b8f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwbWFyYXRob24lMjByYWNlJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc0OTUwNjU5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const yogaImg = "https://images.unsplash.com/photo-1758274525887-d95d19269f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwZml0bmVzcyUyMGdyb3VwJTIwY2xhc3N8ZW58MXx8fHwxNzc0OTUwNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080";
const swimmingImg = "https://images.unsplash.com/photo-1572594505398-97a384b34ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBhdGhsZXRlfGVufDF8fHx8MTc3NDk1MDY2NHww&ixlib=rb-4.1.0&q=80&w=1080";
const golfImg = "https://images.unsplash.com/photo-1763917379121-91130139aca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xmJTIwc3dpbmclMjBjb3Vyc2V8ZW58MXx8fHwxNzc0OTUwNjY0fDA&ixlib=rb-4.1.0&q=80&w=1080";
const soccerImg = "https://images.unsplash.com/photo-1549923015-badf41b04831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMG1hdGNoJTIwc3RhZGl1bXxlbnwxfHx8fDE3NzQ5NTA2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const cyclingImg = "https://images.unsplash.com/photo-1720749407269-b92e86cffb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsaW5nJTIwYmlrZSUyMHJhY2UlMjBvdXRkb29yfGVufDF8fHx8MTc3NDk1MDY3MHww&ixlib=rb-4.1.0&q=80&w=1080";

const sportCategories = [
  { id: "all", label: "All Sports", emoji: "🏆" },
  { id: "basketball", label: "Basketball", emoji: "🏀" },
  { id: "tennis", label: "Tennis", emoji: "🎾" },
  { id: "running", label: "Running", emoji: "🏃" },
  { id: "swimming", label: "Swimming", emoji: "🏊" },
  { id: "yoga", label: "Yoga", emoji: "🧘" },
  { id: "golf", label: "Golf", emoji: "⛳" },
  { id: "soccer", label: "Soccer", emoji: "⚽" },
  { id: "cycling", label: "Cycling", emoji: "🚴" },
];

const levelColors: Record<string, string> = {
  Beginner: "#00D26A",
  Intermediate: "#3B82F6",
  Advanced: "#F59E0B",
  "All Levels": "#7C3AED",
};

const allActivities = [
  {
    id: 1,
    sport: "basketball",
    title: "3v3 Pickup Game",
    location: "Riverside Court",
    time: "Today, 4:00 PM",
    participants: 4,
    maxParticipants: 6,
    level: "Intermediate",
    image: basketballImg,
    distance: "0.8 km",
    rating: 4.8,
    reviews: 23,
    isVerified: true,
    tags: ["Casual", "Outdoors"],
    organizer: "Jordan M.",
  },
  {
    id: 2,
    sport: "tennis",
    title: "Singles Practice",
    location: "City Tennis Club",
    time: "Tomorrow, 9:00 AM",
    participants: 1,
    maxParticipants: 2,
    level: "Advanced",
    image: tennisImg,
    distance: "1.2 km",
    rating: 4.9,
    reviews: 67,
    isVerified: true,
    tags: ["Competitive"],
    organizer: "Sarah K.",
  },
  {
    id: 3,
    sport: "running",
    title: "Morning 5K Run",
    location: "Riverside Park",
    time: "Tomorrow, 7:00 AM",
    participants: 8,
    maxParticipants: 20,
    level: "All Levels",
    image: runningImg,
    distance: "0.4 km",
    rating: 4.7,
    reviews: 45,
    isVerified: false,
    tags: ["Beginner Friendly", "Group"],
    organizer: "Park Run Club",
  },
  {
    id: 4,
    sport: "yoga",
    title: "Sunrise Yoga Session",
    location: "Central Park Lawn",
    time: "Today, 6:30 AM",
    participants: 12,
    maxParticipants: 25,
    level: "Beginner",
    image: yogaImg,
    distance: "2.1 km",
    rating: 4.9,
    reviews: 89,
    isVerified: true,
    tags: ["Wellness", "Outdoor"],
    organizer: "ZenFlow Studio",
  },
  {
    id: 5,
    sport: "swimming",
    title: "Masters Swim Practice",
    location: "Aquatic Center",
    time: "Wed, 6:00 PM",
    participants: 6,
    maxParticipants: 12,
    level: "Advanced",
    image: swimmingImg,
    distance: "3.0 km",
    rating: 4.6,
    reviews: 31,
    isVerified: true,
    tags: ["Competitive", "Indoor"],
    organizer: "SwimMasters",
  },
  {
    id: 6,
    sport: "golf",
    title: "9-Hole Casual Round",
    location: "Green Valley Golf",
    time: "Sat, 10:00 AM",
    participants: 2,
    maxParticipants: 4,
    level: "Intermediate",
    image: golfImg,
    distance: "5.4 km",
    rating: 4.5,
    reviews: 14,
    isVerified: false,
    tags: ["Casual", "Weekend"],
    organizer: "GolfPro Dave",
  },
  {
    id: 7,
    sport: "soccer",
    title: "5v5 Weekend Match",
    location: "Sport Complex",
    time: "Sun, 2:00 PM",
    participants: 7,
    maxParticipants: 10,
    level: "Intermediate",
    image: soccerImg,
    distance: "1.8 km",
    rating: 4.7,
    reviews: 52,
    isVerified: true,
    tags: ["Team", "Competitive"],
    organizer: "FC United",
  },
  {
    id: 8,
    sport: "cycling",
    title: "City Cycling Tour",
    location: "Harbor Bike Path",
    time: "Sat, 8:00 AM",
    participants: 15,
    maxParticipants: 30,
    level: "All Levels",
    image: cyclingImg,
    distance: "2.3 km",
    rating: 4.8,
    reviews: 77,
    isVerified: true,
    tags: ["Scenic", "Group"],
    organizer: "CycleCity",
  },
];

export function Discover() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("distance");
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [pendingJoinId, setPendingJoinId] = useState<number | null>(null);
  const [detailActivityId, setDetailActivityId] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { isActivityJoined, joinActivity, leaveActivity } = useAppContext();

  // Handle URL params for sport filtering
  useEffect(() => {
    const sportParam = searchParams.get("sport");
    if (sportParam) {
      setSelectedSport(sportParam);
      toast.success(`Filtered by ${sportParam}`, {
        description: "Showing activities that match your interests",
        duration: 3000,
      });
    }
  }, [searchParams]);

  const filtered = allActivities.filter((act) => {
    const matchesSport = selectedSport === "all" || act.sport === selectedSport;
    const matchesSearch =
      !searchQuery ||
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel =
      selectedLevel === "all" || act.level.toLowerCase() === selectedLevel;
    return matchesSport && matchesSearch && matchesLevel;
  });

  const handleJoinClick = (id: number) => {
    if (isActivityJoined(id)) {
      leaveActivity(id);
      toast.info("Left activity");
      return;
    }
    setPendingJoinId(id);
    setJoinDialogOpen(true);
  };

  const confirmJoin = () => {
    if (pendingJoinId) {
      const act = allActivities.find(a => a.id === pendingJoinId);
      if (act) {
        joinActivity({
          id: act.id,
          title: act.title,
          sport: act.sport,
          location: act.location,
          time: act.time,
          date: (act as any).date || act.time,
          image: act.image,
          level: act.level,
          joinedAt: new Date().toISOString(),
        });
      }
      toast.success("Successfully joined!", {
        description: "You'll receive a confirmation email shortly.",
        duration: 4000,
      });
    }
    setJoinDialogOpen(false);
    setPendingJoinId(null);
  };

  const handleRefreshLocation = () => {
    setIsRefreshing(true);
    toast.info("Refreshing nearby activities...", {
      duration: 2000,
    });
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Location updated!", {
        description: `Found ${filtered.length} activities near you`,
        duration: 3000,
      });
    }, 1500);
  };

  const detailActivity = allActivities.find(act => act.id === detailActivityId);

  return (
    <div className="w-full px-3 md:px-6 py-4 md:py-6 max-w-7xl mx-auto pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-gray-900 mb-0.5 md:mb-1" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Discover Activities</h1>
        <p className="text-gray-600" style={{ fontSize: '0.75rem' }}>Find sports activities near you</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-2 mb-3 md:mb-5">
        <div className="flex-1 relative min-w-0">
          <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-500 pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 rounded-lg focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10 transition-all"
            style={{ fontSize: '0.75rem' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2">
              <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-2 md:py-2.5 rounded-lg border transition-all flex-shrink-0 ${
            showFilters
              ? "bg-[#00D26A]/10 border-[#00D26A]/30 text-[#00D26A]"
              : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
          }`}
          style={{ fontWeight: 600, fontSize: '0.75rem' }}
        >
          <Sliders className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 mb-3 md:mb-5 overflow-hidden shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-4">
              <div>
                <label className="text-gray-600 block mb-1.5 md:mb-2" style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Skill Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10"
                  style={{ fontSize: '0.75rem' }}
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="text-gray-600 block mb-1.5 md:mb-2" style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10"
                  style={{ fontSize: '0.75rem' }}
                >
                  <option value="distance">Nearest First</option>
                  <option value="time">Soonest First</option>
                  <option value="rating">Top Rated</option>
                  <option value="participants">Most Popular</option>
                </select>
              </div>
              <div>
                <label className="text-gray-600 block mb-1.5 md:mb-2" style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Distance</label>
                <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10" style={{ fontSize: '0.75rem' }}>
                  <option>Within 5 km</option>
                  <option>Within 10 km</option>
                  <option>Within 20 km</option>
                  <option>Any Distance</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sport Category Tabs */}
      <div className="overflow-x-auto mb-4 md:mb-6 scrollbar-hide">
        <div className="flex gap-1.5 md:gap-2 pb-1" style={{ width: 'max-content', minWidth: '100%' }}>
          {sportCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedSport(cat.id)}
              className={`flex items-center gap-1 md:gap-1.5 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg border transition-all ${
                selectedSport === cat.id
                  ? "bg-[#00D26A]/10 border-[#00D26A]/30 text-[#00D26A]"
                  : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm"
              }`}
              style={{ fontWeight: 600, fontSize: '0.7rem', whiteSpace: 'nowrap' }}
            >
              <span className="text-sm">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-600" style={{ fontSize: '0.75rem' }}>
          <span className="text-gray-900" style={{ fontWeight: 600 }}>{filtered.length}</span> found
        </p>
        <button
          onClick={handleRefreshLocation}
          disabled={isRefreshing}
          className="flex items-center gap-1 text-gray-600 hover:text-[#00D26A] transition-colors disabled:opacity-50"
          style={{ fontSize: '0.7rem' }}
        >
          <MapPin className="w-3 h-3 text-[#00D26A]" />
          <span className="hidden sm:inline">Current Location</span>
          <span className="sm:hidden">Nearby</span>
          <RefreshCw className={`w-3 h-3 ml-1 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((act, i) => (
            <motion.div
              key={act.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <Link
                to={`/activity/${act.id}`}
                className="block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] hover:border-[#00D26A]/30"
              >
                <div className="relative h-28 md:h-40 overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.sport}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    {act.isVerified && (
                      <span className="bg-[#00D26A]/90 text-black px-1.5 py-0.5 rounded-full" style={{ fontSize: '0.6rem', fontWeight: 700 }}>✓ Verified</span>
                    )}
                    <span
                      className="px-1.5 py-0.5 rounded-full text-black"
                      style={{ fontSize: '0.6rem', fontWeight: 700, backgroundColor: levelColors[act.level] || "#888" }}
                    >
                      {act.level}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded">
                    <MapPin className="w-2.5 h-2.5 text-[#00D26A]" />
                    <span className="text-white" style={{ fontSize: '0.65rem' }}>{act.distance}</span>
                  </div>
                </div>
                <div className="p-3 md:p-3.5">
                  <div className="flex items-start justify-between mb-1.5 md:mb-2 gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 truncate" style={{ fontWeight: 700, fontSize: '0.85rem' }}>{act.title}</h3>
                      <p className="text-gray-600 truncate" style={{ fontSize: '0.7rem' }}>by {act.organizer}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-[#F59E0B] flex-shrink-0">
                      <Star className="w-3 h-3" fill="currentColor" />
                      <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{act.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5 text-gray-600 mb-2">
                    <span className="flex items-center gap-0.5 min-w-0" style={{ fontSize: '0.65rem' }}>
                      <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                      <span className="truncate">{act.location}</span>
                    </span>
                    <span className="flex items-center gap-0.5" style={{ fontSize: '0.65rem' }}>
                      <Clock className="w-2.5 h-2.5 flex-shrink-0" />{act.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-0.5 text-gray-600 flex-shrink-0" style={{ fontSize: '0.65rem' }}>
                        <Users className="w-3 h-3 flex-shrink-0" />
                        {act.participants + (isActivityJoined(act.id) ? 1 : 0)}/{act.maxParticipants}
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-full h-1 min-w-0 max-w-[50px]">
                        <div
                          className="bg-[#00D26A] h-1 rounded-full"
                          style={{ width: `${((act.participants + (isActivityJoined(act.id) ? 1 : 0)) / act.maxParticipants) * 100}%` }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleJoinClick(act.id); }}
                      className={`px-3 md:px-3 py-1.5 rounded-xl border flex-shrink-0 transition-colors ${
                        isActivityJoined(act.id)
                          ? "bg-[#00D26A] text-black border-[#00D26A]"
                          : "bg-[#00D26A]/10 text-[#00D26A] border-[#00D26A]/20 hover:bg-[#00D26A]/20"
                      }`}
                      style={{ fontSize: '0.72rem', fontWeight: 700 }}
                    >
                      {isActivityJoined(act.id) ? "✓ Joined" : "Join"}
                    </button>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {act.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700" style={{ fontSize: '0.6rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 md:py-16 bg-white border border-gray-200 rounded-2xl">
          <div className="text-4xl md:text-5xl mb-3 md:mb-4">🔍</div>
          <h3 className="text-gray-900 mb-2" style={{ fontWeight: 600, fontSize: '1rem' }}>No activities found</h3>
          <p className="text-gray-600 mb-6" style={{ fontSize: '0.8rem' }}>
            {searchQuery || selectedSport !== "all" || selectedLevel !== "all"
              ? "Try adjusting your filters to see more activities"
              : "Check back later for new activities in your area"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => { setSelectedSport("all"); setSearchQuery(""); setSelectedLevel("all"); }}
              className="text-[#00D26A] bg-[#00D26A]/10 border border-[#00D26A]/20 px-6 py-2.5 rounded-xl hover:bg-[#00D26A]/20 transition-all shadow-sm"
              style={{ fontSize: '0.8rem', fontWeight: 600 }}
            >
              Clear All Filters
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-[#00D26A] text-black px-6 py-2.5 rounded-xl hover:bg-[#00C060] transition-all shadow-sm"
              style={{ fontSize: '0.8rem', fontWeight: 600 }}
            >
              Browse All Activities
            </button>
          </div>
        </div>
      )}

      {/* Join Confirmation Dialog */}
      <AlertDialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00D26A]" />
              Join Activity?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingJoinId && (
                <>
                  You're about to join <span className="font-semibold text-gray-900">{allActivities.find(a => a.id === pendingJoinId)?.title}</span>.
                  <br />
                  <br />
                  You'll receive confirmation details via email and can cancel up to 2 hours before the activity starts.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmJoin}
              className="bg-[#00D26A] text-black hover:bg-[#00C060]"
            >
              Confirm Join
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Activity Detail Dialog */}
      <Dialog open={detailActivityId !== null} onOpenChange={() => setDetailActivityId(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {detailActivity && (
            <>
              <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                <img
                  src={detailActivity.image}
                  alt={detailActivity.sport}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    {detailActivity.isVerified && (
                      <span className="bg-[#00D26A]/90 text-black px-2 py-1 rounded-full flex items-center gap-1" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                        <Shield className="w-3 h-3" /> Verified
                      </span>
                    )}
                    <span
                      className="px-2 py-1 rounded-full text-black"
                      style={{ fontSize: '0.7rem', fontWeight: 700, backgroundColor: levelColors[detailActivity.level] || "#888" }}
                    >
                      {detailActivity.level}
                    </span>
                  </div>
                  <h2 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{detailActivity.title}</h2>
                  <p className="text-white/90" style={{ fontSize: '0.85rem' }}>by {detailActivity.organizer}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#F59E0B]" fill="currentColor" />
                    <span className="text-gray-900" style={{ fontSize: '1rem', fontWeight: 700 }}>{detailActivity.rating}</span>
                    <span className="text-gray-500" style={{ fontSize: '0.85rem' }}>({detailActivity.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500" style={{ fontSize: '0.85rem' }}>
                    <MapPin className="w-4 h-4 text-[#00D26A]" />
                    {detailActivity.distance}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600" style={{ fontSize: '0.7rem', fontWeight: 600 }}>TIME</span>
                    </div>
                    <p className="text-gray-900" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{detailActivity.time}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600" style={{ fontSize: '0.7rem', fontWeight: 600 }}>LOCATION</span>
                    </div>
                    <p className="text-gray-900" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{detailActivity.location}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-900" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                        {detailActivity.participants}/{detailActivity.maxParticipants} Participants
                      </span>
                    </div>
                    <span className="text-gray-500" style={{ fontSize: '0.75rem' }}>
                      {detailActivity.maxParticipants - detailActivity.participants} spots left
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#00D26A] h-2 rounded-full transition-all"
                      style={{ width: `${(detailActivity.participants / detailActivity.maxParticipants) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2" style={{ fontSize: '0.9rem', fontWeight: 700 }}>About This Activity</h3>
                  <p className="text-gray-600" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Join us for an exciting {detailActivity.sport} session! This is a great opportunity to meet fellow enthusiasts, improve your skills, and have fun. All skill levels are welcome!
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {detailActivity.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => {
                      setDetailActivityId(null);
                      handleJoinClick(detailActivity.id);
                    }}
                    className={`flex-1 py-3 rounded-xl transition-all font-semibold ${
                      isActivityJoined(detailActivity.id)
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-[#00D26A] text-black hover:bg-[#00C060]"
                    }`}
                  >
                    {isActivityJoined(detailActivity.id) ? "Leave Activity" : "Join Activity"}
                  </button>
                  <button className="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}