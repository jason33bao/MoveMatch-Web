import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Flame,
  Trophy,
  Users,
  Video,
  ImageIcon,
  Upload,
  Lightbulb,
  X,
  ChevronDown,
  Sparkles,
  MapPin,
  Sliders,
  Film,
} from "lucide-react";

// Unique images - NO REPETITION
const hikingImg = "https://images.unsplash.com/photo-1748199866497-98739ad95701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const yogaImg = "https://images.unsplash.com/photo-1649738247362-4e43a2665a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const boxingImg = "https://images.unsplash.com/photo-1570312530820-d0f15f33a4a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const mealPrepImg = "https://images.unsplash.com/photo-1606859191214-25806e8e2423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const climbingImg = "https://images.unsplash.com/photo-1721885876144-25863108be60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const pilatesImg = "https://images.unsplash.com/photo-1717500251741-cdbc93342d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const stretchingImg = "https://images.unsplash.com/photo-1571726656333-2640ca759d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const smoothieImg = "https://images.unsplash.com/photo-1622818426027-8909055faae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const meditationImg = "https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const badmintonImg = "https://images.unsplash.com/photo-1708312604109-16c0be9326cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const weightliftingImg = "https://images.unsplash.com/photo-1770493895453-4f758c40d11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const crossfitImg = "https://images.unsplash.com/photo-1758875569612-94d5e0f1a35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const danceImg = "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const martialArtsImg = "https://images.unsplash.com/photo-1769095207072-0c84d9b7b9ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const parkWorkoutImg = "https://images.unsplash.com/photo-1773394018583-5ec5abcbb9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const bootcampImg = "https://images.unsplash.com/photo-1758875570256-6510adffb1de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const kettlebellImg = "https://images.unsplash.com/photo-1758875570127-b6ff35e42436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const ellipticalImg = "https://images.unsplash.com/photo-1758957646695-ec8bce3df462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const jumpRopeImg = "https://images.unsplash.com/photo-1770026136375-9b9d038300e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const runningImg = "https://images.unsplash.com/photo-1758586326115-d4e9052b8f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const tennisImg = "https://images.unsplash.com/photo-1761286753856-2f39b4413c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const basketballImg = "https://images.unsplash.com/photo-1770042572491-0c3f1ca7d6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const cyclingImg = "https://images.unsplash.com/photo-1720749407269-b92e86cffb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

// Additional unique images for missing categories
const physiotherapyImg = "https://images.unsplash.com/photo-1713711437257-0232e837f40c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const scienceLabImg = "https://images.unsplash.com/photo-1706806594828-318b9185ad0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const sleepRecoveryImg = "https://images.unsplash.com/photo-1683448372037-8a406e1a5a5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const wellnessSpaImg = "https://images.unsplash.com/photo-1767350510090-137a6ce252c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const localParkImg = "https://images.unsplash.com/photo-1758304481749-56fe042af8ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const outdoorParkImg = "https://images.unsplash.com/photo-1773394018583-5ec5abcbb9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const heartRateImg = "https://images.unsplash.com/photo-1762768736724-443ee6a18e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const hydrationImg = "https://images.unsplash.com/photo-1752681304950-cc5bc78064f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const supplementsImg = "https://images.unsplash.com/photo-1704650311135-93c2c0e202a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const mindsetImg = "https://images.unsplash.com/photo-1589953605483-a2964c38d415?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

type TabType = "forYou" | "following" | "challenges" | "explore";
type CategoryType = "all" | "nearby" | "training" | "science" | "nutrition" | "lifestyle";

// FOR YOU POSTS
const forYouPosts = [
  {
    id: 1,
    user: { name: "Jordan Li", handle: "@jordanli", avatar: "Jordan", location: "Hong Kong" },
    content: "Discovered an amazing hiking trail with 360° views! The climb was tough but the sunset made it worth every step. Anyone else into mountain hiking?",
    image: hikingImg,
    aiScore: 85,
    tags: ["#Hiking", "#Outdoor"],
    likes: 243, comments: 38, shares: 15,
    time: "2h ago",
    category: "training",
  },
  {
    id: 2,
    user: { name: "Sarah Williams", handle: "@sarahfit", avatar: "Sarah", location: "London" },
    content: "My morning yoga practice is evolving! Finally nailed the crow pose after 3 months of practice. Consistency is everything 🧘‍♀️",
    image: yogaImg,
    aiScore: 92,
    tags: ["#Yoga", "#Flexibility"],
    likes: 187, comments: 52, shares: 23,
    time: "3h ago",
    category: "training",
  },
  {
    id: 3,
    user: { name: "Marcus Park", handle: "@marcusp", avatar: "Marcus", location: "New York" },
    content: "Boxing training update: working on speed and precision. The heavy bag doesn't stand a chance! Who else trains combat sports?",
    image: boxingImg,
    aiScore: 78,
    tags: ["#Boxing", "#Strength"],
    likes: 312, comments: 67, shares: 41,
    time: "5h ago",
    category: "training",
  },
  {
    id: 4,
    user: { name: "Emma Rodriguez", handle: "@emmafit", avatar: "Emma", location: "Barcelona" },
    content: "Meal prep Sunday! High protein, low carb recipes for the week. Nutrition is 70% of the game. What's your favorite pre-workout meal?",
    image: mealPrepImg,
    aiScore: 88,
    tags: ["#Nutrition", "#MealPrep"],
    likes: 156, comments: 34, shares: 19,
    time: "7h ago",
    category: "nutrition",
  },
  {
    id: 5,
    user: { name: "David Chen", handle: "@davidclimbs", avatar: "David", location: "Singapore" },
    content: "Indoor climbing session complete! Just sent my first V6 route. The technique training is really paying off 💪🧗",
    image: climbingImg,
    aiScore: 95,
    tags: ["#Climbing", "#Challenge"],
    likes: 203, comments: 41, shares: 28,
    time: "8h ago",
    category: "training",
  },
  {
    id: 6,
    user: { name: "Sophie Martinez", handle: "@sophiemoves", avatar: "Sophie", location: "Toronto" },
    content: "Pilates reformer class absolutely destroyed me today (in the best way). Core strength is next level! 🔥",
    image: pilatesImg,
    aiScore: 87,
    tags: ["#Pilates", "#CoreStrength"],
    likes: 189, comments: 29, shares: 15,
    time: "10h ago",
    category: "training",
  },
  // NEARBY CATEGORY
  {
    id: 7,
    user: { name: "Alex Thompson", handle: "@alexlocal", avatar: "Alex", location: "Your City" },
    content: "Found an amazing outdoor park just 5 minutes away! Free calisthenics equipment and perfect for morning workouts. Who's nearby and wants to join?",
    image: localParkImg,
    aiScore: 82,
    tags: ["#Nearby", "#Community"],
    likes: 145, comments: 22, shares: 12,
    time: "4h ago",
    category: "nearby",
  },
  {
    id: 8,
    user: { name: "Maya Patel", handle: "@mayalocal", avatar: "Maya", location: "Your City" },
    content: "Local running group meets every Saturday at 7am! We've got beginners to advanced runners. Come join us at Central Park entrance 🏃‍♀️",
    image: outdoorParkImg,
    aiScore: 79,
    tags: ["#Nearby", "#Running"],
    likes: 198, comments: 31, shares: 18,
    time: "6h ago",
    category: "nearby",
  },
  // SPORTS SCIENCE CATEGORY
  {
    id: 9,
    user: { name: "Dr. Ryan Mitchell", handle: "@drryanfit", avatar: "Ryan", location: "Boston" },
    content: "New research: Injury prevention starts with proper warm-up techniques. Physiotherapy data shows 40% reduction in sports injuries with dynamic stretching!",
    image: physiotherapyImg,
    aiScore: 96,
    tags: ["#Science", "#InjuryPrevention"],
    likes: 267, comments: 48, shares: 34,
    time: "5h ago",
    category: "science",
  },
  {
    id: 10,
    user: { name: "Lily Chen", handle: "@lilyresearch", avatar: "Lily", location: "Stanford" },
    content: "Exercise science breakthrough: Heart rate variability training can improve athletic performance by up to 15%. The data from our lab study is fascinating! 📊",
    image: scienceLabImg,
    aiScore: 93,
    tags: ["#Science", "#Research"],
    likes: 234, comments: 42, shares: 29,
    time: "9h ago",
    category: "science",
  },
  {
    id: 11,
    user: { name: "Chris Anderson", handle: "@christech", avatar: "Chris", location: "San Francisco" },
    content: "Testing the new smart fitness tracker! Real-time heart rate monitoring and VO2 max estimation. Science meets wearable tech 💓",
    image: heartRateImg,
    aiScore: 88,
    tags: ["#Science", "#Technology"],
    likes: 189, comments: 35, shares: 21,
    time: "12h ago",
    category: "science",
  },
  // LIFESTYLE CATEGORY
  {
    id: 12,
    user: { name: "Isabella Martinez", handle: "@bellawellness", avatar: "Sophie", location: "Miami" },
    content: "Sleep is the ultimate recovery tool! Started tracking my sleep quality and noticed massive improvements in performance. 8 hours minimum for athletes 😴",
    image: sleepRecoveryImg,
    aiScore: 91,
    tags: ["#Lifestyle", "#Recovery"],
    likes: 212, comments: 37, shares: 24,
    time: "7h ago",
    category: "lifestyle",
  },
  {
    id: 13,
    user: { name: "Jake Wilson", handle: "@jakewellness", avatar: "Ryan", location: "Seattle" },
    content: "Wellness routine: Morning meditation, hydration check, and massage therapy. Your body is your temple - treat it right! 🧘‍♂️💆",
    image: wellnessSpaImg,
    aiScore: 85,
    tags: ["#Lifestyle", "#Wellness"],
    likes: 178, comments: 28, shares: 16,
    time: "11h ago",
    category: "lifestyle",
  },
  {
    id: 14,
    user: { name: "Nina Rodriguez", handle: "@ninalifestyle", avatar: "Emma", location: "Austin" },
    content: "Mindset is everything! Sports psychology session helped me overcome performance anxiety. Mental health = physical performance 🧠",
    image: mindsetImg,
    aiScore: 89,
    tags: ["#Lifestyle", "#Mindset"],
    likes: 201, comments: 33, shares: 19,
    time: "1d ago",
    category: "lifestyle",
  },
  // ADDITIONAL NUTRITION POSTS (to ensure at least 2)
  {
    id: 15,
    user: { name: "Tom Harris", handle: "@tomnutrition", avatar: "David", location: "Denver" },
    content: "Hydration game on point! Drinking 3L of water daily transformed my energy levels. Don't underestimate the power of H2O 💧",
    image: hydrationImg,
    aiScore: 84,
    tags: ["#Nutrition", "#Hydration"],
    likes: 167, comments: 25, shares: 14,
    time: "13h ago",
    category: "nutrition",
  },
  {
    id: 16,
    user: { name: "Olivia Kim", handle: "@oliviasupps", avatar: "Lily", location: "Portland" },
    content: "Supplement stack update: Vitamin D, Omega-3, and magnesium. Always consult with a nutritionist before starting! 💊",
    image: supplementsImg,
    aiScore: 86,
    tags: ["#Nutrition", "#Supplements"],
    likes: 193, comments: 30, shares: 17,
    time: "15h ago",
    category: "nutrition",
  },
];

// FOLLOWING POSTS - Each user has AT LEAST 2-3 posts
const followingPosts = [
  // Emma's posts (3 posts)
  {
    id: 101,
    user: { name: "Emma", handle: "@emmafit", avatar: "Emma", location: "Barcelona" },
    content: "Post-workout stretching is non-negotiable! I've noticed a huge difference in my recovery time since making this a daily habit. 15 minutes can change everything.",
    thumbnail: stretchingImg,
    tags: ["#Recovery", "#Stretching"],
    likes: 278, comments: 45, time: "1h ago",
  },
  {
    id: 102,
    user: { name: "Emma", handle: "@emmafit", avatar: "Emma", location: "Barcelona" },
    content: "My secret weapon: homemade protein smoothie with spinach, banana, almond butter and oats. Tastes like dessert but fuels like a champion! 💚",
    thumbnail: smoothieImg,
    tags: ["#Nutrition", "#Smoothie"],
    likes: 312, comments: 67, time: "4h ago",
  },
  {
    id: 103,
    user: { name: "Emma", handle: "@emmafit", avatar: "Emma", location: "Barcelona" },
    content: "Started incorporating 10 minutes of meditation before my workouts. The mental clarity and focus improvement is incredible. Mind-body connection is real!",
    thumbnail: meditationImg,
    tags: ["#Mindfulness", "#Wellness"],
    likes: 245, comments: 52, time: "1d ago",
  },
  
  // David's posts (3 posts)
  {
    id: 104,
    user: { name: "David", handle: "@davidclimbs", avatar: "David", location: "Singapore" },
    content: "Badminton doubles match tonight! Nothing beats the adrenaline rush of a close game. Looking for more players in Singapore 🏸",
    thumbnail: badmintonImg,
    tags: ["#Badminton", "#TeamSport"],
    likes: 167, comments: 28, time: "2h ago",
  },
  {
    id: 105,
    user: { name: "David", handle: "@davidclimbs", avatar: "David", location: "Singapore" },
    content: "Weightlifting PR today: 225 lbs deadlift! Been following progressive overload for 6 months and seeing real gains 💪",
    thumbnail: weightliftingImg,
    tags: ["#Weightlifting", "#Strength"],
    likes: 294, comments: 51, time: "5h ago",
  },
  {
    id: 106,
    user: { name: "David", handle: "@davidclimbs", avatar: "David", location: "Singapore" },
    content: "CrossFit WOD crushed me! AMRAP burpees, kettlebell swings, and box jumps. Community support here is unmatched 🔥",
    thumbnail: crossfitImg,
    tags: ["#CrossFit", "#HIIT"],
    likes: 201, comments: 39, time: "1d ago",
  },
  
  // Sophie's posts (3 posts)
  {
    id: 107,
    user: { name: "Sophie", handle: "@sophiemoves", avatar: "Sophie", location: "Toronto" },
    content: "Dance fitness class was AMAZING today! Zumba meets cardio - burned 600 calories while having the time of my life 💃",
    thumbnail: danceImg,
    tags: ["#Dance", "#Cardio"],
    likes: 189, comments: 34, time: "3h ago",
  },
  {
    id: 108,
    user: { name: "Sophie", handle: "@sophiemoves", avatar: "Sophie", location: "Toronto" },
    content: "Martial arts training update: finally earned my blue belt in Brazilian Jiu-Jitsu! 18 months of hard work paying off 🥋",
    thumbnail: martialArtsImg,
    tags: ["#BJJ", "#MartialArts"],
    likes: 256, comments: 48, time: "7h ago",
  },
  {
    id: 109,
    user: { name: "Sophie", handle: "@sophiemoves", avatar: "Sophie", location: "Toronto" },
    content: "Sunday park workout with the crew! Pull-ups, dips, and planks. Fresh air + bodyweight training = perfect combo ☀️",
    thumbnail: parkWorkoutImg,
    tags: ["#Calisthenics", "#Outdoor"],
    likes: 223, comments: 41, time: "2d ago",
  },
  
  // Alex's posts (2 posts)
  {
    id: 110,
    user: { name: "Alex", handle: "@alexfitness", avatar: "Alex", location: "Los Angeles" },
    content: "Boot camp training session complete! High-intensity drills, team motivation, and that post-workout endorphin rush 🚀",
    thumbnail: bootcampImg,
    tags: ["#Bootcamp", "#Intensity"],
    likes: 198, comments: 36, time: "4h ago",
  },
  {
    id: 111,
    user: { name: "Alex", handle: "@alexfitness", avatar: "Alex", location: "Los Angeles" },
    content: "Kettlebell swings are my new obsession! Full-body workout that builds power and endurance. 100 reps done ✓",
    thumbnail: kettlebellImg,
    tags: ["#Kettlebell", "#Functional"],
    likes: 234, comments: 43, time: "1d ago",
  },
  
  // Maya's posts (2 posts)
  {
    id: 112,
    user: { name: "Maya", handle: "@mayahealth", avatar: "Maya", location: "Dubai" },
    content: "Elliptical cardio session while catching up on podcasts. 45 minutes flew by! What's your favorite cardio machine?",
    thumbnail: ellipticalImg,
    tags: ["#Cardio", "#Elliptical"],
    likes: 176, comments: 29, time: "6h ago",
  },
  {
    id: 113,
    user: { name: "Maya", handle: "@mayahealth", avatar: "Maya", location: "Dubai" },
    content: "Jump rope challenge: 1000 skips in 15 minutes! Simple equipment, incredible workout. Anyone else into jump rope training?",
    thumbnail: jumpRopeImg,
    tags: ["#JumpRope", "#Cardio"],
    likes: 203, comments: 38, time: "1d ago",
  },
  
  // Ryan's posts (2 posts)
  {
    id: 114,
    user: { name: "Ryan", handle: "@ryanruns", avatar: "Ryan", location: "Melbourne" },
    content: "Early morning 10K run before sunrise! There's something magical about having the streets to yourself. Who else runs early?",
    thumbnail: runningImg,
    tags: ["#Running", "#Morning"],
    likes: 267, comments: 47, time: "5h ago",
  },
  {
    id: 115,
    user: { name: "Ryan", handle: "@ryanruns", avatar: "Ryan", location: "Melbourne" },
    content: "Hiking is my therapy! Conquered a 15km trail today with 800m elevation gain. Nature + fitness = perfection 🏔️",
    thumbnail: hikingImg,
    tags: ["#Hiking", "#Nature"],
    likes: 289, comments: 53, time: "2d ago",
  },
  
  // Lily's posts (2 posts)
  {
    id: 116,
    user: { name: "Lily", handle: "@lilyfit", avatar: "Lily", location: "Seoul" },
    content: "Boxing session was intense! Working on combinations and footwork. Nothing beats the feeling of hitting a heavy bag 🥊",
    thumbnail: boxingImg,
    tags: ["#Boxing", "#Combat"],
    likes: 221, comments: 39, time: "7h ago",
  },
  {
    id: 117,
    user: { name: "Lily", handle: "@lilyfit", avatar: "Lily", location: "Seoul" },
    content: "Yoga flow for flexibility and mindfulness. 60 minutes of peace and movement. Namaste 🧘‍♀️",
    thumbnail: yogaImg,
    tags: ["#Yoga", "#Mindfulness"],
    likes: 245, comments: 44, time: "1d ago",
  },
  
  // Chris's posts (2 posts)
  {
    id: 118,
    user: { name: "Chris", handle: "@chrisactive", avatar: "Chris", location: "Sydney" },
    content: "Meal prep game strong! Planning nutrition is half the battle. What's everyone's go-to protein source?",
    thumbnail: mealPrepImg,
    tags: ["#MealPrep", "#Nutrition"],
    likes: 198, comments: 36, time: "8h ago",
  },
  {
    id: 119,
    user: { name: "Chris", handle: "@chrisactive", avatar: "Chris", location: "Sydney" },
    content: "Rock climbing adventures continue! Just finished a challenging V5 route. Progress feels amazing 🧗",
    thumbnail: climbingImg,
    tags: ["#Climbing", "#Adventure"],
    likes: 212, comments: 40, time: "2d ago",
  },
];

const stories = [
  { id: 1, name: "Emma", avatar: "Emma", active: true },
  { id: 2, name: "David", avatar: "David", active: true },
  { id: 3, name: "Sophie", avatar: "Sophie", active: false },
  { id: 4, name: "Alex", avatar: "Alex", active: true },
  { id: 5, name: "Maya", avatar: "Maya", active: false },
  { id: 6, name: "Ryan", avatar: "Ryan", active: true },
  { id: 7, name: "Lily", avatar: "Lily", active: true },
  { id: 8, name: "Chris", avatar: "Chris", active: false },
];

const challenges = [
  {
    id: 1,
    title: "30-Day Sprint Challenge",
    creator: { name: "Nike Run Club", verified: true, type: "Official" },
    description: "Run 5km every day for 30 days. Upload your GPS track or time to participate.",
    sport: "Running", emoji: "🏃",
    participants: 2847, submissions: 8423,
    prize: "$500 Cash", daysLeft: 8, image: runningImg,
    topScore: 98, myScore: null,
    tags: ["Endurance", "30-Day"], isHot: true,
  },
  {
    id: 2,
    title: "Tennis Mastery Week",
    creator: { name: "Tennis Pro Academy", verified: true, type: "KOL" },
    description: "Perfect your serve technique with AI-powered feedback. Get scored on form, power, and accuracy.",
    sport: "Tennis", emoji: "🎾",
    participants: 1203, submissions: 3187,
    prize: "Merch + Feature", daysLeft: 3, image: tennisImg,
    topScore: 96, myScore: 74,
    tags: ["Technique", "AI Scored"], isHot: true,
  },
  {
    id: 3,
    title: "Cycling Century Club",
    creator: { name: "CycleCity", verified: false, type: "Community" },
    description: "Ride 100km in a single trip. Share your route and finish time.",
    sport: "Cycling", emoji: "🚴",
    participants: 456, submissions: 891,
    prize: "Monthly Crown", daysLeft: 21, image: cyclingImg,
    topScore: 100, myScore: null,
    tags: ["Distance", "Endurance"], isHot: false,
  },
];

const inventedSports = [
  {
    id: 1,
    title: "Reverse Basketball",
    creator: "@sportinnovator99",
    description: "Score in your own basket for double points! Flip the objective and master defensive offense.",
    participants: 234,
    image: basketballImg,
  },
  {
    id: 2,
    title: "Tennis Golf",
    description: "Hit targets around the court with as few shots as possible. Precision meets power in this hybrid game.",
    creator: "@courtcreator",
    participants: 178,
    image: tennisImg,
  },
];

const typeColors: Record<string, string> = {
  Official: "bg-blue-50 text-blue-600",
  KOL: "bg-violet-50 text-violet-600",
  Community: "bg-gray-100 text-gray-600",
};

const categories = [
  { id: "all" as const, label: "All" },
  { id: "nearby" as const, label: "Nearby" },
  { id: "training" as const, label: "Training/Skills" },
  { id: "science" as const, label: "Sports Science" },
  { id: "nutrition" as const, label: "Diet & Nutrition" },
  { id: "lifestyle" as const, label: "Lifestyle" },
];

export function Community() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("forYou");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [joinedChallenges, setJoinedChallenges] = useState<Set<number>>(new Set([2]));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInventModal, setShowInventModal] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [selectedUserFilter, setSelectedUserFilter] = useState<string | null>(null);

  // Handle navigation state to set active tab
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab as TabType);
      // Clear the state after using it
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const toggleLike = (id: number) => {
    setLikedPosts(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const filteredForYouPosts = activeCategory === "all" 
    ? forYouPosts 
    : forYouPosts.filter(post => post.category === activeCategory);

  return (
    <div className="w-full pb-24 md:pb-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden h-44 md:h-56">
        <img 
          src="https://images.unsplash.com/photo-1767809673585-78513a929f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
          alt="Community" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/40" />

        <div className="relative h-full max-w-5xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-6 md:pb-8">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex items-center gap-1.5 bg-[#00D166] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#00B855] transition-all"
              style={{ fontWeight: 700, fontSize: "0.85rem" }}
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
          </div>
          <span className="text-white/90 mb-1.5" style={{ fontSize: "0.78rem", fontWeight: 700 }}>
            Sports Community
          </span>
          <h1 className="text-white mb-2" style={{ fontWeight: 800, fontSize: "clamp(2rem, 6vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Community
          </h1>
          <p className="text-white/85 max-w-xl" style={{ fontSize: "0.95rem", fontWeight: 400, lineHeight: 1.5 }}>
            Connect, share, and grow through sports
          </p>
        </div>
      </div>

      {/* PRIMARY NAVIGATION */}
      <div className="bg-[#f6f7fb] -mt-1">
        <div className="max-w-5xl mx-auto px-4 md:px-8 pt-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center bg-white rounded-2xl p-1.5 shadow-sm border border-gray-200 overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
              {[
                { id: "forYou" as const, label: "For You" },
                { id: "following" as const, label: "Following" },
                { id: "challenges" as const, label: "Challenges" },
                { id: "explore" as const, label: "Explore Sports" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`relative px-3 md:px-4 py-2 rounded-full transition-all text-sm md:text-base ${
                    activeTab === id
                      ? "bg-[#00D166] text-white shadow-md"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={{ fontWeight: activeTab === id ? 700 : 400, fontSize: "0.875rem", borderRadius: "16px" }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCreateMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="fixed right-4 top-28 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50"
            style={{ borderRadius: "16px" }}
          >
            <button
              onClick={() => {
                setShowCreateMenu(false);
                setShowCreateModal(true);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Post Update</p>
                <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>Share your achievement</p>
              </div>
            </button>
            <button
              onClick={() => {
                setShowCreateMenu(false);
                setShowInventModal(true);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
            >
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-900" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Invent a Sport</p>
                <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>Create custom activity</p>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECONDARY NAVIGATION */}
      {activeTab === "forYou" && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-3">
            <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
              {categories.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`flex-shrink-0 px-3 md:px-4 py-1.5 rounded-full transition-all ${
                    activeCategory === id
                      ? "bg-[#00D166] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ fontWeight: activeCategory === id ? 600 : 500, fontSize: "0.8rem", borderRadius: "16px" }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-6">
        {/* FOR YOU FEED */}
        {activeTab === "forYou" && (
          <div className="space-y-4">
            {filteredForYouPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                style={{ borderRadius: "16px" }}
              >
                <div className="flex items-center px-4 md:px-6 pt-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user.avatar}&backgroundColor=b6e3f4`}
                        className="rounded-full"
                        style={{ width: "48px", height: "48px", display: "block", objectFit: "cover" }}
                        alt={post.user.name}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-900 truncate" style={{ fontWeight: 600, fontSize: "0.9rem" }}>{post.user.name}</p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{post.user.handle}</p>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="flex items-center gap-1 text-gray-500" style={{ fontSize: "0.7rem" }}>
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          IP: {post.user.location}
                        </div>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{post.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 md:px-6 pb-3">
                  <p className="text-gray-700" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{post.content}</p>
                </div>

                <div className="relative bg-gray-100">
                  <img src={post.image} alt="" className="w-full h-64 md:h-72 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="flex gap-2 px-4 md:px-6 pt-3">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 md:px-3 py-1 rounded-full bg-gray-100 text-gray-700" style={{ fontSize: "0.72rem", fontWeight: 500, borderRadius: "16px" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 px-4 md:px-6 pb-5 pt-3 border-t border-gray-50 mt-3">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                      likedPosts.has(post.id) ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-400 hover:bg-red-50"
                    }`}
                    style={{ fontSize: "0.8rem", borderRadius: "16px" }}
                  >
                    <Heart className="w-4 h-4" fill={likedPosts.has(post.id) ? "currentColor" : "none"} />
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors" style={{ fontSize: "0.8rem", borderRadius: "16px" }}>
                    <MessageCircle className="w-4 h-4" />{post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-[#00D166] hover:bg-[#00D166]/10 transition-colors" style={{ fontSize: "0.8rem", borderRadius: "16px" }}>
                    <Share2 className="w-4 h-4" />{post.shares}
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredForYouPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>No posts in this category yet</p>
                <button 
                  onClick={() => setActiveCategory("all")}
                  className="mt-3 text-[#00D166] hover:underline"
                  style={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  View all posts
                </button>
              </div>
            )}
          </div>
        )}

        {/* FOLLOWING FEED - FIXED AVATARS */}
        {activeTab === "following" && (
          <div>
            <div className="mb-6">
              <div className="flex gap-3 md:gap-4 overflow-x-auto py-2 px-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
                {stories.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => setSelectedUserFilter(selectedUserFilter === story.avatar ? null : story.avatar)}
                    className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div 
                      className={`relative rounded-full overflow-hidden flex-shrink-0 ${
                        selectedUserFilter === story.avatar 
                          ? 'ring-4 ring-[#00D166] ring-offset-2' 
                          : story.active 
                            ? 'ring-2 ring-[#00D166] ring-offset-2' 
                            : 'ring-2 ring-gray-200 ring-offset-2'
                      }`} 
                      style={{ width: "64px", height: "64px" }}
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.avatar}&backgroundColor=b6e3f4`}
                        className="w-full h-full object-cover"
                        style={{ display: "block", aspectRatio: "1/1" }}
                        alt={story.name}
                      />
                      {story.active && !selectedUserFilter && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#00D166] border-2 border-white rounded-full" />
                      )}
                      {selectedUserFilter === story.avatar && (
                        <div className="absolute inset-0 rounded-full bg-[#00D166]/10 border-2 border-[#00D166] flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-[#00D166] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className={`text-center ${selectedUserFilter === story.avatar ? 'text-[#00D166]' : 'text-gray-700'}`} style={{ fontSize: "0.72rem", fontWeight: selectedUserFilter === story.avatar ? 700 : 500 }}>{story.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {followingPosts
                .filter(post => !selectedUserFilter || post.user.avatar === selectedUserFilter)
                .map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                  style={{ borderRadius: "16px" }}
                >
                  <div className="flex items-start justify-between px-4 md:px-6 pt-5 pb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user.avatar}&backgroundColor=b6e3f4`}
                          className="rounded-full"
                          style={{ width: "48px", height: "48px", display: "block", objectFit: "cover", aspectRatio: "1/1" }}
                          alt={post.user.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 truncate" style={{ fontWeight: 600, fontSize: "0.9rem" }}>{post.user.name}</p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{post.user.handle}</p>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <div className="flex items-center gap-1 text-gray-500" style={{ fontSize: "0.7rem" }}>
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            IP: {post.user.location}
                          </div>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{post.time}</p>
                        </div>
                      </div>
                    </div>
                    <img 
                      src={post.thumbnail} 
                      alt="" 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover flex-shrink-0 ml-3"
                      style={{ borderRadius: "16px" }}
                    />
                  </div>

                  <div className="px-4 md:px-6 pb-3">
                    <p className="text-gray-700" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{post.content}</p>
                  </div>

                  <div className="flex gap-2 px-4 md:px-6 pt-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 md:px-3 py-1 rounded-full bg-gray-100 text-gray-700" style={{ fontSize: "0.72rem", fontWeight: 500, borderRadius: "16px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="px-4 md:px-6 pb-5 pt-3 border-t border-gray-50 mt-3">
                    <div className="flex items-center gap-1 mb-3">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                          likedPosts.has(post.id) ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-400 hover:bg-red-50"
                        }`}
                        style={{ fontSize: "0.8rem", borderRadius: "16px" }}
                      >
                        <Heart className="w-4 h-4" fill={likedPosts.has(post.id) ? "currentColor" : "none"} />
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors" style={{ fontSize: "0.8rem", borderRadius: "16px" }}>
                        <MessageCircle className="w-4 h-4" />{post.comments}
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-[#00D166] hover:bg-[#00D166]/10 transition-colors" style={{ fontSize: "0.8rem", borderRadius: "16px" }}>
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100" style={{ borderRadius: "16px" }}>
                      <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {selectedUserFilter && followingPosts.filter(post => post.user.avatar === selectedUserFilter).length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>No posts from this user yet</p>
                  <button 
                    onClick={() => setSelectedUserFilter(null)}
                    className="mt-3 text-[#00D166] hover:underline"
                    style={{ fontSize: "0.875rem", fontWeight: 600 }}
                  >
                    View all posts
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHALLENGES */}
        {activeTab === "challenges" && (
          <div className="space-y-4">
            {challenges.map((ch, i) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => navigate(`/challenge/${ch.id}`)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                style={{ borderRadius: "16px" }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={ch.image} alt={ch.sport} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {ch.isHot && (
                      <span className="flex items-center gap-1 bg-amber-400 text-amber-900 px-2 py-1 rounded-full" style={{ fontSize: "0.65rem", fontWeight: 800, borderRadius: "16px" }}>
                        <Flame className="w-3 h-3" fill="currentColor" /> Hot
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${typeColors[ch.creator.type]}`} style={{ borderRadius: "16px" }}>
                      {ch.creator.type}
                    </span>
                  </div>
                  {ch.myScore && (
                    <div className="absolute top-3 right-3 bg-[#00D166] text-white px-2.5 py-1 rounded-full" style={{ fontSize: "0.72rem", fontWeight: 800, borderRadius: "16px" }}>
                      My Score: {ch.myScore}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-amber-400 px-2.5 py-1 rounded-full" style={{ fontSize: "0.72rem", fontWeight: 700, borderRadius: "16px" }}>
                    🏆 {ch.prize}
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.05rem" }}>{ch.title}</h3>
                      <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>by {ch.creator.name}</p>
                    </div>
                    <div className="bg-red-50 text-red-500 px-2.5 py-1 rounded-full flex-shrink-0" style={{ fontSize: "0.68rem", fontWeight: 700, borderRadius: "16px" }}>
                      {ch.daysLeft}d left
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3" style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>{ch.description}</p>

                  <div className="flex items-center gap-3 md:gap-4 mb-3 flex-wrap">
                    <span className="flex items-center gap-1 text-gray-500" style={{ fontSize: "0.75rem" }}>
                      <Users className="w-3.5 h-3.5" />{ch.participants.toLocaleString()} joined
                    </span>
                    <span className="flex items-center gap-1 text-gray-500" style={{ fontSize: "0.75rem" }}>
                      <Video className="w-3.5 h-3.5" />{ch.submissions.toLocaleString()} submissions
                    </span>
                    <span className="flex items-center gap-1 text-amber-500" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                      <Trophy className="w-3.5 h-3.5" />Top: {ch.topScore}/100
                    </span>
                  </div>

                  <div className="flex gap-1.5 mb-4 flex-wrap">
                    {ch.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600" style={{ fontSize: "0.7rem", fontWeight: 500, borderRadius: "16px" }}>{t}</span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setJoinedChallenges(prev => { const n = new Set(prev); n.has(ch.id) ? n.delete(ch.id) : n.add(ch.id); return n; }); }}
                      className={`flex-1 py-2.5 rounded-xl transition-all active:scale-95 ${
                        joinedChallenges.has(ch.id)
                          ? "bg-amber-400 text-amber-900"
                          : "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
                      }`}
                      style={{ fontWeight: 700, fontSize: "0.875rem", borderRadius: "16px" }}
                    >
                      {joinedChallenges.has(ch.id) ? "✓ Joined!" : "Join Challenge"}
                    </button>
                    {joinedChallenges.has(ch.id) && (
                      <button onClick={(e) => e.stopPropagation()} className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-700 transition-colors" style={{ borderRadius: "16px" }}>
                        <Upload className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* EXPLORE SPORTS */}
        {activeTab === "explore" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl p-5 flex items-center gap-4 shadow-md" style={{ borderRadius: "16px" }}>
              <Sparkles className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Discover Invented Sports</p>
                <p className="text-purple-200" style={{ fontSize: "0.8rem" }}>User-created activities transforming how we play</p>
              </div>
            </div>

            {inventedSports.map((sport, i) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex cursor-pointer hover:shadow-md transition-shadow"
                style={{ borderRadius: "16px" }}
                onClick={() => navigate(`/sport/${sport.id}`)}
              >
                <div className="w-24 h-24 md:w-40 md:h-40 flex-shrink-0 overflow-hidden">
                  <img src={sport.image} alt={sport.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 p-3 md:p-4 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-gray-900 mb-1" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                      {sport.title}
                    </h3>
                    <p className="text-gray-500 mb-2" style={{ fontSize: "0.7rem" }}>
                      Created by {sport.creator}
                    </p>
                    <p className="text-gray-600 mb-3" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                      {sport.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 md:gap-3 flex-wrap">
                    <span className="flex items-center gap-1.5 text-gray-500" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                      <Users className="w-3.5 h-3.5" />
                      {sport.participants}+ Participants
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/sport/${sport.id}`);
                      }}
                      className="px-4 md:px-5 py-2 md:py-2.5 bg-[#00D166] text-white rounded-full hover:bg-[#00B855] transition-all shadow-md hover:shadow-lg flex-shrink-0" 
                      style={{ fontWeight: 700, fontSize: "0.8rem", borderRadius: "16px" }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="mt-6 border-2 border-dashed border-gray-200 hover:border-purple-300 rounded-2xl p-6 md:p-8 text-center cursor-pointer hover:bg-purple-50/50 transition-all" style={{ borderRadius: "16px" }}>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-gray-800 mb-2" style={{ fontWeight: 700, fontSize: "1.05rem" }}>Have a Creative Idea?</h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto" style={{ fontSize: "0.875rem" }}>Invent your own sport and share it with the community!</p>
              <button 
                onClick={() => setShowInventModal(true)}
                className="bg-purple-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-purple-700 transition-colors shadow-md" 
                style={{ fontWeight: 700, fontSize: "0.875rem", borderRadius: "16px" }}
              >
                Invent New Sport
              </button>
            </div>
          </div>
        )}
      </div>

      {/* POST UPDATE MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={e => e.stopPropagation()}
              style={{ borderRadius: "16px" }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Create Post</h3>
                <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors" style={{ borderRadius: "16px" }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4" className="w-12 h-12 rounded-full border-2 border-gray-100" alt="You" />
                  <div>
                    <p className="text-gray-900" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Alex Chen</p>
                    <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>@alexchen</p>
                  </div>
                </div>
                <textarea
                  placeholder="Share your sports moment, achievement or tip..."
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:border-[#00D166]/50 focus:ring-2 focus:ring-[#00D166]/10 resize-none"
                  rows={5}
                  style={{ fontSize: "0.9rem", borderRadius: "16px" }}
                />
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 flex-1 justify-center bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100 py-3 rounded-xl transition-colors" style={{ fontSize: "0.85rem", borderRadius: "16px" }}>
                    <ImageIcon className="w-4 h-4" /> Photo
                  </button>
                  <button className="flex items-center gap-2 flex-1 justify-center bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100 py-3 rounded-xl transition-colors" style={{ fontSize: "0.85rem", borderRadius: "16px" }}>
                    <Video className="w-4 h-4" /> Video
                  </button>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-full bg-[#00D166] text-white py-3.5 rounded-xl hover:bg-[#00B855] transition-colors shadow-md shadow-[#00D166]/20"
                  style={{ fontWeight: 700, fontSize: "0.95rem", borderRadius: "16px" }}
                >
                  Post to Community
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INVENT A SPORT MODAL */}
      <AnimatePresence>
        {showInventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInventModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
              style={{ borderRadius: "16px" }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-violet-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.2rem" }}>Create New Sport</h3>
                </div>
                <button onClick={() => setShowInventModal(false)} className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors shadow-sm" style={{ borderRadius: "16px" }}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div>
                  <label className="text-gray-700 mb-2 block" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                    Sport Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Reverse Basketball, Aqua Volleyball..."
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:border-[#00D166]/50 focus:ring-2 focus:ring-[#00D166]/10"
                    style={{ fontSize: "0.9rem", borderRadius: "16px" }}
                  />
                </div>

                <div>
                  <label className="text-gray-700 mb-2 block" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                    Rules & Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Describe how the sport is played, what makes it unique, and any special rules..."
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:border-[#00D166]/50 focus:ring-2 focus:ring-[#00D166]/10 resize-none"
                    rows={4}
                    style={{ fontSize: "0.9rem", borderRadius: "16px" }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-gray-700" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      <Sliders className="w-4 h-4 inline mr-1" />
                      Difficulty Level
                    </label>
                    <span className="text-[#00D166] px-2.5 py-1 rounded-full bg-[#00D166]/10" style={{ fontSize: "0.75rem", fontWeight: 700, borderRadius: "16px" }}>
                      Intermediate
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00D166]"
                  />
                  <div className="flex justify-between text-gray-400 mt-1" style={{ fontSize: "0.7rem" }}>
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 mb-2 block" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                    <Film className="w-4 h-4 inline mr-1" />
                    Demo Video (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#00D166] hover:bg-[#00D166]/5 transition-all" style={{ borderRadius: "16px" }}>
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-gray-600 mb-1" style={{ fontWeight: 600, fontSize: "0.85rem" }}>Upload Video</p>
                    <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>MP4, MOV, AVI • Max 50MB</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowInventModal(false)}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all shadow-lg shadow-purple-600/30"
                  style={{ fontWeight: 700, fontSize: "0.95rem", borderRadius: "16px" }}
                >
                  🚀 Publish Sport to Community
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
