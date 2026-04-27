import { createContext, useContext, useState, ReactNode } from "react";

export interface BookedSession {
  id: string;
  coachId: number;
  coachName: string;
  coachTitle: string;
  coachImage: string;
  sport: string;
  date: string;
  time: string;
  sessionType: string;
  price: number;
  location: string;
  bookedAt: string;
}

export interface JoinedActivity {
  id: number;
  title: string;
  sport: string;
  location: string;
  time: string;
  date: string;
  image: string;
  level: string;
  joinedAt: string;
}

interface AppContextType {
  joinedActivityIds: Set<number>;
  joinedActivities: JoinedActivity[];
  joinActivity: (activity: JoinedActivity) => void;
  leaveActivity: (id: number) => void;
  isActivityJoined: (id: number) => boolean;
  bookedSessions: BookedSession[];
  addBookedSession: (session: BookedSession) => void;
  removeBookedSession: (id: string) => void;
  isCoachBooked: (coachId: number) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [joinedActivityIds, setJoinedActivityIds] = useState<Set<number>>(new Set());
  const [joinedActivities, setJoinedActivities] = useState<JoinedActivity[]>([]);
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([]);

  const joinActivity = (activity: JoinedActivity) => {
    setJoinedActivityIds((prev) => new Set([...prev, activity.id]));
    setJoinedActivities((prev) => {
      if (prev.find((a) => a.id === activity.id)) return prev;
      return [activity, ...prev];
    });
  };

  const leaveActivity = (id: number) => {
    setJoinedActivityIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setJoinedActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const isActivityJoined = (id: number) => joinedActivityIds.has(id);

  const addBookedSession = (session: BookedSession) => {
    setBookedSessions((prev) => [session, ...prev]);
  };

  const removeBookedSession = (id: string) => {
    setBookedSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const isCoachBooked = (coachId: number) =>
    bookedSessions.some((s) => s.coachId === coachId);

  return (
    <AppContext.Provider
      value={{
        joinedActivityIds,
        joinedActivities,
        joinActivity,
        leaveActivity,
        isActivityJoined,
        bookedSessions,
        addBookedSession,
        removeBookedSession,
        isCoachBooked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}