import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  MapPin,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Video,
  Calendar,
  Award,
  Clock,
  Users,
  Zap,
  List,
  Map,
  Sparkles,
  X,
  CalendarDays,
  CheckCircle2,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useAppContext, BookedSession } from "../context/AppContext";

const coachImg1 = "https://images.unsplash.com/photo-1750698545009-679820502908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc3BvcnRzJTIwY29hY2glMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzQ5NTA2Njl8MA&ixlib=rb-4.1.0&q=80&w=400";
const coachImg2 = "https://images.unsplash.com/photo-1589860518300-9eac95f784d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmaXRuZXNzJTIwY29hY2glMjBwb3J0cmFpdCUyMHNtaWxpbmd8ZW58MXx8fHwxNzc0OTUwNjY5fDA&ixlib=rb-4.1.0&q=80&w=400";
const trainerImg = "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMGZpdG5lc3MlMjB0cmFpbmVyJTIwY29hY2h8ZW58MXx8fHwxNzc0OTUwNjU5fDA&ixlib=rb-4.1.0&q=80&w=400";

const coaches = [
  {
    id: 1,
    name: "Marcus Chen",
    title: "Professional Tennis Coach",
    sports: ["Tennis"],
    rating: 4.9,
    reviews: 234,
    location: "Downtown Sports Hub",
    distance: "1.2 km",
    price: 85,
    experience: "12 years",
    verified: true,
    aiVerified: true,
    available: true,
    students: 847,
    image: coachImg1,
    badges: ["ATP Certified", "Ex-Pro", "Top Rated"],
    bio: "Former ATP-ranked professional with 12 years coaching experience. Specializes in technique refinement and mental game strategies for intermediate to advanced players.",
    availability: ["Mon", "Wed", "Fri", "Sat"],
    sessionTypes: ["1-on-1", "Group", "Online"],
  },
  {
    id: 2,
    name: "Sarah Williams",
    title: "Certified Fitness & Yoga Coach",
    sports: ["Yoga", "Fitness", "Swimming"],
    rating: 4.8,
    reviews: 189,
    location: "Zen Fitness Studio",
    distance: "2.4 km",
    price: 65,
    experience: "8 years",
    verified: true,
    aiVerified: true,
    available: true,
    students: 512,
    image: coachImg2,
    badges: ["200hr YTT", "NASM Certified", "Community Coach"],
    bio: "Holistic wellness coach combining yoga, mindfulness, and functional fitness. Known for creating safe, inclusive environments for beginners and adaptive sports.",
    availability: ["Tue", "Thu", "Sat", "Sun"],
    sessionTypes: ["Group", "Online", "Workshop"],
  },
  {
    id: 3,
    name: "Derek Johnson",
    title: "Basketball & Strength Coach",
    sports: ["Basketball", "Strength Training"],
    rating: 4.7,
    reviews: 156,
    location: "Elite Performance Center",
    distance: "3.1 km",
    price: 95,
    experience: "15 years",
    verified: true,
    aiVerified: false,
    available: false,
    students: 633,
    image: trainerImg,
    badges: ["NBA D-League", "CSCS", "High Performance"],
    bio: "Former NBA Development League player turned elite basketball coach. Specializes in athleticism development, vertical jump training, and position-specific skills.",
    availability: ["Mon", "Tue", "Thu"],
    sessionTypes: ["1-on-1", "Team Sessions"],
  },
  {
    id: 4,
    name: "Lisa Tanaka",
    title: "Community Swimming Coach",
    sports: ["Swimming"],
    rating: 4.6,
    reviews: 98,
    location: "Riverside Aquatic Center",
    distance: "1.8 km",
    price: 55,
    experience: "6 years",
    verified: true,
    aiVerified: true,
    available: true,
    students: 289,
    image: coachImg2,
    badges: ["SwimAustralia L2", "Community Coach", "AI Verified"],
    bio: "Passionate swimmer who transitioned into coaching after competing at national level. Focuses on stroke mechanics and building water confidence for all ages.",
    availability: ["Mon", "Wed", "Sat", "Sun"],
    sessionTypes: ["1-on-1", "Group", "Kids"],
  },
];

const spotlightFeatures = [
  { icon: Zap, label: "AI Verification", desc: "All coaches pass AI skill assessment", color: "#7C3AED" },
  { icon: Award, label: "Certified Pros", desc: "Professional credentials verified", color: "#F59E0B" },
  { icon: Users, label: "Community Coaches", desc: "Vetted local sports enthusiasts", color: "#00D26A" },
  { icon: Video, label: "Online Sessions", desc: "Coach from anywhere via video", color: "#3B82F6" },
];

const availableDates = [
  "Tomorrow, Apr 13",
  "Wed, Apr 14",
  "Thu, Apr 15",
  "Sat, Apr 17",
  "Sun, Apr 18",
  "Mon, Apr 20",
];

const availableTimes = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

type PageTab = "coaches" | "calendar";
type BookingStep = "select" | "confirm" | "success";

interface BookingState {
  coachId: number;
  date: string;
  time: string;
  sessionType: string;
}

const calendarMonthColors: Record<string, string> = {
  "Apr 13": "bg-blue-50 text-blue-700",
  "Apr 14": "bg-violet-50 text-violet-700",
  "Apr 15": "bg-emerald-50 text-emerald-700",
  "Apr 17": "bg-amber-50 text-amber-700",
};

export function Coaches() {
  const [pageTab, setPageTab] = useState<PageTab>("coaches");
  const [selectedSport, setSelectedSport] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoach, setSelectedCoach] = useState<typeof coaches[0] | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Booking flow
  const [bookingStep, setBookingStep] = useState<BookingStep | null>(null);
  const [bookingData, setBookingData] = useState<BookingState>({
    coachId: 0,
    date: "",
    time: "",
    sessionType: "",
  });

  const { bookedSessions, addBookedSession, removeBookedSession, isCoachBooked } = useAppContext();

  const filtered = coaches.filter((c) => {
    const matchSport = selectedSport === "all" || c.sports.some((s) => s.toLowerCase() === selectedSport);
    const matchSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSport && matchSearch;
  });

  const sports = ["all", "tennis", "yoga", "basketball", "swimming", "fitness"];

  const openBooking = (coachId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const coach = coaches.find((c) => c.id === coachId);
    if (!coach) return;
    setBookingData({
      coachId,
      date: "",
      time: "",
      sessionType: coach.sessionTypes[0] || "",
    });
    setBookingStep("select");
  };

  const proceedToConfirm = () => {
    if (!bookingData.date || !bookingData.time || !bookingData.sessionType) {
      toast.error("Please fill in all booking details");
      return;
    }
    setBookingStep("confirm");
  };

  const confirmBooking = () => {
    const coach = coaches.find((c) => c.id === bookingData.coachId);
    if (!coach) return;
    const session: BookedSession = {
      id: `booking-${Date.now()}`,
      coachId: coach.id,
      coachName: coach.name,
      coachTitle: coach.title,
      coachImage: coach.image,
      sport: coach.sports[0],
      date: bookingData.date,
      time: bookingData.time,
      sessionType: bookingData.sessionType,
      price: coach.price,
      location: coach.location,
      bookedAt: new Date().toISOString(),
    };
    addBookedSession(session);
    setBookingStep("success");
  };

  const finishBooking = () => {
    setBookingStep(null);
    setPageTab("calendar");
    toast.success("Session booked! Check your Calendar tab.", { duration: 4000 });
  };

  const bookingCoach = coaches.find((c) => c.id === bookingData.coachId);

  // Group sessions by date for calendar view
  const sessionsByDate = bookedSessions.reduce((acc, session) => {
    if (!acc[session.date]) acc[session.date] = [];
    acc[session.date].push(session);
    return acc;
  }, {} as Record<string, BookedSession[]>);

  return (
    <div className="px-3 md:px-6 py-3 md:py-6 max-w-7xl mx-auto pb-24 md:pb-6">
      {/* Page tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4 md:mb-6 max-w-xs">
        <button
          onClick={() => setPageTab("coaches")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all ${
            pageTab === "coaches" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
          style={{ fontWeight: 700, fontSize: "0.8rem" }}
        >
          <Users className="w-3.5 h-3.5" /> Coaches
        </button>
        <button
          onClick={() => setPageTab("calendar")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all relative ${
            pageTab === "calendar" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
          style={{ fontWeight: 700, fontSize: "0.8rem" }}
        >
          <CalendarDays className="w-3.5 h-3.5" /> Calendar
          {bookedSessions.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00D26A] text-black rounded-full flex items-center justify-center" style={{ fontSize: "0.6rem", fontWeight: 800 }}>
              {bookedSessions.length}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {pageTab === "coaches" ? (
          <motion.div
            key="coaches"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 md:mb-6">
              <h1 className="text-gray-900 mb-0.5 md:mb-1" style={{ fontWeight: 700, fontSize: "1.2rem" }}>Coaching Marketplace</h1>
              <p className="text-gray-600" style={{ fontSize: "0.75rem" }}>Find verified coaches near you</p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
              {spotlightFeatures.map((f) => (
                <div key={f.label} className="bg-white border border-gray-200 rounded-lg md:rounded-xl p-2.5 md:p-4 flex flex-col md:flex-row items-start gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${f.color}15` }}>
                    <f.icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: f.color }} />
                  </div>
                  <div>
                    <p className="text-gray-900" style={{ fontWeight: 600, fontSize: "0.7rem" }}>{f.label}</p>
                    <p className="text-gray-600 hidden md:block" style={{ fontSize: "0.65rem", lineHeight: 1.3 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 md:gap-3 mb-3 md:mb-5">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search coaches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-500 pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 rounded-lg md:rounded-xl focus:outline-none focus:border-[#00D26A]/50 focus:ring-2 focus:ring-[#00D26A]/10"
                  style={{ fontSize: "0.75rem" }}
                />
              </div>
              <button className="flex-shrink-0 flex items-center justify-center px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg md:rounded-xl bg-white hover:bg-gray-50 transition-colors text-gray-600">
                <Filter className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Sport Filter */}
            <div className="flex items-center justify-between mb-4 md:mb-6 gap-2">
              <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
                {sports.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSport(s)}
                    className={`flex-shrink-0 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border capitalize transition-all ${
                      selectedSport === s
                        ? "bg-[#00D26A]/10 border-[#00D26A]/30 text-[#00D26A]"
                        : "bg-white border-gray-200 text-gray-600 hover:text-gray-900"
                    }`}
                    style={{ fontWeight: 600, fontSize: "0.7rem", whiteSpace: "nowrap" }}
                  >
                    {s === "all" ? "All Sports" : s}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Match Banner */}
            <div className="mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#00D26A]/15 via-[#00D26A]/5 to-transparent border border-[#00D26A]/20 p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00D26A]/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#00D26A]" />
                </div>
                <div>
                  <h2 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Not sure who to pick?</h2>
                  <p className="text-gray-600" style={{ fontSize: "0.75rem" }}>Let AI find your perfect match based on your goals and playstyle.</p>
                </div>
              </div>
              <button className="w-full sm:w-auto px-5 py-2.5 bg-[#00D26A] hover:bg-[#00b85c] text-white rounded-lg md:rounded-xl transition-colors flex items-center justify-center gap-2 flex-shrink-0 shadow-sm" style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                Start AI Match <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Coach Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-5">
              {filtered.map((coach, i) => (
                <motion.div
                  key={coach.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 rounded-lg md:rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
                  onClick={() => setSelectedCoach(selectedCoach?.id === coach.id ? null : coach)}
                >
                  <div className="p-3 md:p-5">
                    <div className="flex items-start gap-2.5 md:gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={coach.image}
                          alt={coach.name}
                          className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl object-cover border-2 border-gray-100"
                        />
                        {coach.available && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-[#00D26A] border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                              <h3 className="text-gray-900 truncate" style={{ fontWeight: 700, fontSize: "0.85rem" }}>{coach.name}</h3>
                              {coach.verified && <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#3B82F6] flex-shrink-0" fill="currentColor" />}
                              {coach.aiVerified && (
                                <span className="bg-[#7C3AED]/10 text-[#7C3AED] px-1 py-0.5 rounded" style={{ fontSize: "0.6rem", fontWeight: 700 }}>AI ✓</span>
                              )}
                            </div>
                            <p className="text-gray-600 truncate" style={{ fontSize: "0.7rem" }}>{coach.title}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.85rem" }}>${coach.price}</p>
                            <p className="text-gray-600" style={{ fontSize: "0.65rem" }}>/session</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 mt-1.5 md:mt-2 flex-wrap">
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-[#F59E0B]" fill="currentColor" />
                            <span className="text-gray-900" style={{ fontSize: "0.7rem", fontWeight: 600 }}>{coach.rating}</span>
                            <span className="text-gray-500" style={{ fontSize: "0.65rem" }}>({coach.reviews})</span>
                          </div>
                          <span className="flex items-center gap-0.5 text-gray-600" style={{ fontSize: "0.65rem" }}>
                            <MapPin className="w-2.5 h-2.5" />{coach.distance}
                          </span>
                          <span className="hidden sm:flex items-center gap-0.5 text-gray-600" style={{ fontSize: "0.65rem" }}>
                            <Users className="w-2.5 h-2.5" />{coach.students}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1 mt-2 md:mt-3 flex-wrap">
                      {coach.badges.slice(0, 2).map((b) => (
                        <span key={b} className="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700" style={{ fontSize: "0.6rem" }}>{b}</span>
                      ))}
                    </div>
                    <div className="flex gap-1 mt-1.5 md:mt-2 flex-wrap">
                      {coach.sports.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded-full bg-[#00D26A]/10 text-[#00D26A] border border-[#00D26A]/20" style={{ fontSize: "0.65rem", fontWeight: 600 }}>{s}</span>
                      ))}
                    </div>

                    {/* Expanded Details */}
                    {selectedCoach?.id === coach.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200 space-y-2.5 md:space-y-3"
                      >
                        <p className="text-gray-600" style={{ fontSize: "0.75rem" }}>{coach.bio}</p>
                        <div>
                          <p className="text-gray-600 mb-1.5 md:mb-2" style={{ fontSize: "0.7rem" }}>Session Types:</p>
                          <div className="flex gap-1.5 md:gap-2 flex-wrap">
                            {coach.sessionTypes.map((t) => (
                              <span key={t} className="px-2 py-0.5 md:py-1 rounded-lg bg-gray-50 text-gray-900 border border-gray-200" style={{ fontSize: "0.7rem" }}>{t}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1.5 md:mb-2" style={{ fontSize: "0.7rem" }}>Available:</p>
                          <div className="flex gap-1 md:gap-1.5 flex-wrap">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                              <span
                                key={d}
                                className={`w-8 md:w-10 py-0.5 md:py-1 rounded-lg text-center ${
                                  coach.availability.includes(d)
                                    ? "bg-[#00D26A]/10 text-[#00D26A] border border-[#00D26A]/30"
                                    : "bg-gray-50 text-gray-400 border border-gray-100"
                                }`}
                                style={{ fontSize: "0.65rem", fontWeight: 600 }}
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-3 md:mt-4 space-y-2.5 md:space-y-3">
                      <div className="flex items-center gap-1.5 text-[#666666]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span style={{ fontSize: "0.7rem" }}>Next available: Tomorrow, 10:00 AM</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => openBooking(coach.id, e)}
                          className={`flex-1 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 md:gap-2 ${
                            isCoachBooked(coach.id)
                              ? "bg-[#00D26A] text-black"
                              : "bg-[#00D26A]/10 text-[#00D26A] border border-[#00D26A]/20 hover:bg-[#00D26A]/20"
                          }`}
                          style={{ fontWeight: 700, fontSize: "0.75rem" }}
                        >
                          <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          {isCoachBooked(coach.id) ? "Booked ✓" : "Book Session"}
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Video className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Become a Coach CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 md:mt-8 bg-gradient-to-r from-[#7C3AED]/10 to-[#5B21B6]/5 border border-[#7C3AED]/20 rounded-xl md:rounded-2xl p-5 md:p-6 text-center"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#7C3AED]/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-[#7C3AED]" />
              </div>
              <h3 className="text-gray-900 mb-1.5 md:mb-2" style={{ fontWeight: 700, fontSize: "1rem" }}>Become a Community Coach</h3>
              <p className="text-gray-600 mb-3 md:mb-4 mx-auto" style={{ fontSize: "0.75rem", maxWidth: 400 }}>
                Share your sports expertise and start earning by coaching others.
              </p>
              <button className="bg-[#7C3AED] text-white px-5 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl hover:bg-[#6D28D9] transition-colors" style={{ fontWeight: 700, fontSize: "0.8rem" }}>
                Apply to Coach →
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* ── CALENDAR TAB ── */
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 md:mb-6">
              <h1 className="text-gray-900 mb-0.5 md:mb-1" style={{ fontWeight: 700, fontSize: "1.2rem" }}>My Coaching Calendar</h1>
              <p className="text-gray-600" style={{ fontSize: "0.75rem" }}>All your booked coach sessions</p>
            </div>

            {bookedSessions.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-gray-900 mb-2" style={{ fontWeight: 700, fontSize: "1.1rem" }}>No sessions booked yet</h3>
                <p className="text-gray-500 mb-6" style={{ fontSize: "0.85rem" }}>Book a coach session to see it here</p>
                <button
                  onClick={() => setPageTab("coaches")}
                  className="inline-flex items-center gap-2 bg-[#00D26A] text-black px-5 py-2.5 rounded-xl hover:bg-[#00C060] transition-all"
                  style={{ fontWeight: 700, fontSize: "0.9rem" }}
                >
                  <ArrowLeft className="w-4 h-4" /> Find a Coach
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(sessionsByDate).map(([date, sessions]) => (
                  <div key={date}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#00D26A]" />
                      <h3 className="text-gray-700" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{date}</h3>
                      <div className="flex-1 h-px bg-gray-100" />
                    </div>
                    <div className="space-y-3">
                      {sessions.map((session) => (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
                        >
                          <div className="p-4 md:p-5">
                            <div className="flex items-start gap-4">
                              <img
                                src={session.coachImage}
                                alt={session.coachName}
                                className="w-14 h-14 rounded-xl object-cover border-2 border-gray-100 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h4 className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{session.coachName}</h4>
                                    <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>{session.coachTitle}</p>
                                  </div>
                                  <span className="bg-[#00D26A]/10 text-[#00D26A] border border-[#00D26A]/20 px-2.5 py-1 rounded-full flex-shrink-0" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                                    Confirmed ✓
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                  <div className="flex items-center gap-1.5">
                                    <CalendarDays className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                    <span className="text-gray-600 truncate" style={{ fontSize: "0.75rem" }}>{session.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                    <span className="text-gray-600" style={{ fontSize: "0.75rem" }}>{session.time}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                    <span className="text-gray-600 truncate" style={{ fontSize: "0.75rem" }}>{session.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                    <span className="text-gray-600" style={{ fontSize: "0.75rem" }}>{session.sessionType}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                                  <div className="flex items-center gap-2">
                                    <span className="bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 600 }}>{session.sport}</span>
                                    <span className="text-gray-500" style={{ fontSize: "0.75rem" }}>${session.price}/session</span>
                                  </div>
                                  <button
                                    onClick={() => {
                                      removeBookedSession(session.id);
                                      toast.info("Session cancelled");
                                    }}
                                    className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
                                    style={{ fontSize: "0.75rem", fontWeight: 600 }}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" /> Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOOKING DIALOG ── */}
      <AnimatePresence>
        {bookingStep && bookingCoach && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setBookingStep(null); }}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              {/* Step 1: Select Details */}
              {bookingStep === "select" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.2rem" }}>Book a Session</h2>
                    <button onClick={() => setBookingStep(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Coach preview */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-5">
                    <img src={bookingCoach.image} alt={bookingCoach.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <p className="text-gray-900" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{bookingCoach.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Star className="w-3 h-3 text-amber-500" fill="currentColor" />
                        <span className="text-gray-600" style={{ fontSize: "0.75rem" }}>{bookingCoach.rating} · ${bookingCoach.price}/session</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Date */}
                    <div>
                      <label className="block text-gray-700 mb-2" style={{ fontWeight: 700, fontSize: "0.85rem" }}>Select Date</label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableDates.map((d) => (
                          <button
                            key={d}
                            onClick={() => setBookingData((prev) => ({ ...prev, date: d }))}
                            className={`py-2 px-2 rounded-xl border text-center transition-all ${
                              bookingData.date === d
                                ? "bg-[#00D26A]/10 border-[#00D26A]/40 text-[#00D26A]"
                                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                            }`}
                            style={{ fontSize: "0.72rem", fontWeight: 600 }}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-gray-700 mb-2" style={{ fontWeight: 700, fontSize: "0.85rem" }}>Select Time</label>
                      <div className="grid grid-cols-4 gap-2">
                        {availableTimes.map((t) => (
                          <button
                            key={t}
                            onClick={() => setBookingData((prev) => ({ ...prev, time: t }))}
                            className={`py-2 rounded-xl border text-center transition-all ${
                              bookingData.time === t
                                ? "bg-[#00D26A]/10 border-[#00D26A]/40 text-[#00D26A]"
                                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                            }`}
                            style={{ fontSize: "0.72rem", fontWeight: 600 }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Session Type */}
                    <div>
                      <label className="block text-gray-700 mb-2" style={{ fontWeight: 700, fontSize: "0.85rem" }}>Session Type</label>
                      <div className="flex gap-2 flex-wrap">
                        {bookingCoach.sessionTypes.map((t) => (
                          <button
                            key={t}
                            onClick={() => setBookingData((prev) => ({ ...prev, sessionType: t }))}
                            className={`px-3 py-2 rounded-xl border transition-all ${
                              bookingData.sessionType === t
                                ? "bg-[#00D26A]/10 border-[#00D26A]/40 text-[#00D26A]"
                                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                            }`}
                            style={{ fontSize: "0.78rem", fontWeight: 600 }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setBookingStep(null)}
                      className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                      style={{ fontWeight: 600, fontSize: "0.9rem" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={proceedToConfirm}
                      className="flex-1 py-3 rounded-xl bg-[#00D26A] text-black hover:bg-[#00C060] transition-all shadow-md shadow-[#00D26A]/20"
                      style={{ fontWeight: 700, fontSize: "0.9rem" }}
                    >
                      Review Booking →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Confirm */}
              {bookingStep === "confirm" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <button
                      onClick={() => setBookingStep("select")}
                      className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
                      style={{ fontWeight: 600, fontSize: "0.85rem" }}
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button onClick={() => setBookingStep(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#00D26A]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-8 h-8 text-[#00D26A]" />
                    </div>
                    <h2 className="text-gray-900 mb-1" style={{ fontWeight: 800, fontSize: "1.2rem" }}>Confirm Your Booking</h2>
                    <p className="text-gray-500" style={{ fontSize: "0.85rem" }}>Please review your session details before confirming</p>
                  </div>

                  {/* Booking summary */}
                  <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 mb-5 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                      <img src={bookingCoach.image} alt={bookingCoach.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div>
                        <p className="text-gray-900" style={{ fontWeight: 700, fontSize: "1rem" }}>{bookingCoach.name}</p>
                        <p className="text-gray-500" style={{ fontSize: "0.78rem" }}>{bookingCoach.title}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="w-3 h-3 text-amber-500" fill="currentColor" />
                          <span style={{ fontSize: "0.72rem", color: "#6b7280" }}>{bookingCoach.rating} ({bookingCoach.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: CalendarDays, label: "Date", value: bookingData.date },
                        { icon: Clock, label: "Time", value: bookingData.time },
                        { icon: Users, label: "Session Type", value: bookingData.sessionType },
                        { icon: MapPin, label: "Location", value: bookingCoach.location },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="bg-white rounded-xl p-3 border border-gray-100">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Icon className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-gray-500" style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase" }}>{label}</span>
                          </div>
                          <p className="text-gray-900" style={{ fontSize: "0.8rem", fontWeight: 700 }}>{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-gray-600" style={{ fontSize: "0.85rem" }}>Total</span>
                      <span className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.1rem" }}>${bookingCoach.price}</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-center mb-5" style={{ fontSize: "0.78rem" }}>
                    You can cancel up to 24 hours before the session for a full refund.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setBookingStep("select")}
                      className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                      style={{ fontWeight: 600, fontSize: "0.9rem" }}
                    >
                      Edit Details
                    </button>
                    <button
                      onClick={confirmBooking}
                      className="flex-1 py-3 rounded-xl bg-[#00D26A] text-black hover:bg-[#00C060] transition-all shadow-md shadow-[#00D26A]/20"
                      style={{ fontWeight: 700, fontSize: "0.9rem" }}
                    >
                      Confirm Booking ✓
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {bookingStep === "success" && (
                <div className="p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-20 h-20 bg-[#00D26A] rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-gray-900 mb-2" style={{ fontWeight: 800, fontSize: "1.4rem" }}>Booking Confirmed! 🎉</h2>
                  <p className="text-gray-600 mb-2" style={{ fontSize: "0.9rem" }}>
                    Your session with <span className="text-gray-900 font-bold">{bookingCoach.name}</span> has been confirmed.
                  </p>
                  <p className="text-gray-500 mb-1" style={{ fontSize: "0.82rem" }}>
                    📅 {bookingData.date} at {bookingData.time}
                  </p>
                  <p className="text-gray-500 mb-6" style={{ fontSize: "0.82rem" }}>
                    📍 {bookingCoach.location}
                  </p>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-left">
                    <p className="text-emerald-700" style={{ fontWeight: 600, fontSize: "0.85rem" }}>✅ A confirmation has been sent to your email.</p>
                    <p className="text-emerald-600 mt-1" style={{ fontSize: "0.78rem" }}>Your session is now visible in the Calendar tab.</p>
                  </div>
                  <button
                    onClick={finishBooking}
                    className="w-full py-3.5 rounded-xl bg-[#00D26A] text-black hover:bg-[#00C060] transition-all shadow-md shadow-[#00D26A]/20"
                    style={{ fontWeight: 700, fontSize: "0.95rem" }}
                  >
                    View My Calendar →
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
