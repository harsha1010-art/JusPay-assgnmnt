import React from "react";
import { Search, Sun, Moon, Bell, Settings, Star, PanelLeft } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { useTheme } from "../context/ThemeContext";
import { useNotifications } from "../context/NotificationContext";

const Navmenu = () => {
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const { toggleNotifications } = useNotifications();

  return (
    <div className="flex items-center justify-between bg-primary text-primary border-b border-default px-6 py-3">
      {/* Left - Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        {/* Sidebar toggle button (keyboard & screen reader accessible) */}
        <button
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
          className="text-secondary hover:text-primary transition p-1 rounded"
        >
          <PanelLeft size={16} aria-hidden="true" />
        </button>
        <Star size={14} className="text-yellow-500" />
        <span className="text-secondary">Dashboards</span>
        <span className="text-secondary">/</span>
        <span className="text-primary font-medium">Default</span>
      </div>

      {/* Right - Search + Icons */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-2 top-2.5 text-secondary"
          />
          <input
            type="text"
            placeholder="Search"
            aria-label="Search site"
            className="bg-card text-primary text-sm pl-8 pr-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-default placeholder:text-secondary w-44"
          />
        </div>

        {/* Theme toggle */}
        <button aria-label="Toggle theme" onClick={toggleTheme} className="p-1 rounded">
          {theme === "dark" ? (
            <Moon size={18} aria-hidden="true" className="text-secondary hover:text-primary" />
          ) : (
            <Sun size={18} aria-hidden="true" className="text-secondary hover:text-primary" />
          )}
        </button>

        {/* Notifications (opens the notification sidebar) */}
        <button aria-label="Open notifications" onClick={toggleNotifications} className="p-1 rounded">
          <Bell size={18} aria-hidden="true" className="text-secondary hover:text-primary" />
        </button>

        {/* Settings */}
        <button aria-label="Settings" className="p-1 rounded">
          <Settings size={18} aria-hidden="true" className="text-secondary hover:text-primary" />
        </button>
      </div>
    </div>
  );
};

export default Navmenu;
