import { Outlet, NavLink, useLocation } from "react-router";
import {
  Compass,
  Users,
  Trophy,
  MessageCircle,
  User,
  Zap,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "./ui/sonner";

const navItems = [
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/coaches", label: "Coaches", icon: Users },
  { to: "/competitions", label: "Compete", icon: Trophy },
  { to: "/community", label: "Community", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: User },
];

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const currentPage = navItems.find(
    (item) =>
      item.to === location.pathname ||
      (item.to !== "/" && location.pathname.startsWith(item.to))
  );

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gray-50 text-gray-900 flex">
      <Toaster position="top-center" richColors />
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-40 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D26A] to-[#00A855] flex items-center justify-center shadow-lg shadow-[#00D26A]/20">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <span className="text-gray-900 tracking-tight" style={{ fontWeight: 700, fontSize: '1.1rem' }}>MoveMatch</span>
            <span className="text-[#00D26A] ml-1 tracking-tight" style={{ fontWeight: 700, fontSize: '1.1rem' }}>AI</span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-[#00D26A]/10 text-[#00D26A] border border-[#00D26A]/20"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-[#00D26A]" : ""}`}
                  />
                  <span style={{ fontWeight: 500 }}>{label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00D26A]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4"
              className="w-9 h-9 rounded-full border-2 border-[#00D26A]/30"
              alt="User"
            />
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 truncate" style={{ fontWeight: 600, fontSize: '0.875rem' }}>Alex Chen</p>
              <p className="text-[#00D26A] truncate" style={{ fontSize: '0.75rem' }}>Level 12 · Tennis</p>
            </div>
            <Bell className="w-4 h-4 text-gray-500 hover:text-gray-900 cursor-pointer flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
        {/* Top bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D26A] to-[#00A855] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-gray-900" style={{ fontWeight: 700 }}>MoveMatch <span className="text-[#00D26A]">AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-500" />
            <Bell className="w-5 h-5 text-gray-500" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/30 z-40"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="lg:hidden fixed right-0 top-0 h-full w-72 bg-white border-l border-gray-200 z-50 flex flex-col shadow-xl"
              >
                <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
                  <span className="text-gray-900" style={{ fontWeight: 700 }}>MoveMatch <span className="text-[#00D26A]">AI</span></span>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                  {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-[#00D26A]/10 text-[#00D26A] border border-[#00D26A]/20"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className={`w-5 h-5 ${isActive ? "text-[#00D26A]" : ""}`} />
                          <span style={{ fontWeight: 500 }}>{label}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>

        {/* Bottom Nav (mobile) */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-30 shadow-lg px-2 py-1.5 flex">
          {[
            navItems[0], // Discover
            navItems[1], // Coaches
            navItems[2], // Compete
            navItems[3], // Community
            navItems[4], // Profile
          ].map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-2xl text-xs transition-all ${
                  isActive
                    ? "text-[#00D26A] bg-[#00D26A]/10"
                    : "text-gray-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#00D26A]" : ""}`} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}