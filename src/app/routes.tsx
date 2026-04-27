import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Discover } from "./pages/Discover";
import { Competitions } from "./pages/Competitions";
import { Community } from "./pages/Community";
import { Profile } from "./pages/Profile";
import { ActivityDetail } from "./pages/ActivityDetail";
import { ChallengeDetail } from "./pages/ChallengeDetail";
import { SportDetail } from "./pages/SportDetail";
import { CoachHub } from "./pages/CoachHub";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Discover },
      { path: "discover", Component: Discover },
      { path: "activity/:id", Component: ActivityDetail },
      { path: "challenge/:id", Component: ChallengeDetail },
      { path: "sport/:id", Component: SportDetail },
      { path: "coaching", Component: CoachHub },
      { path: "coaches", Component: CoachHub },
      { path: "competitions", Component: Competitions },
      { path: "community", Component: Community },
      { path: "profile", Component: Profile },
    ],
  },
]);