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
    <div className="flex items-center justify-between bg-card text-primary border-b border-default px-6 py-3">
      {/* Left - Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <PanelLeft
          size={16}
          className="text-secondary cursor-pointer hover:text-primary transition"
          onClick={toggleSidebar} // ✅ collapses sidebar
        />
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
            className="bg-card text-primary text-sm pl-8 pr-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-default placeholder:text-secondary w-44"
          />
        </div>

        {theme === "dark" ? (
          <Moon
            size={18}
            className="cursor-pointer text-secondary hover:text-primary"
            onClick={toggleTheme}
          />
        ) : (
          <Sun
            size={18}
            className="cursor-pointer text-secondary hover:text-primary"
            onClick={toggleTheme}
          />
        )}

        <Bell 
          size={18} 
          className="cursor-pointer text-secondary hover:text-primary"
          onClick={toggleNotifications}
        />
        <Settings size={18} className="cursor-pointer text-secondary hover:text-primary" />
      </div>
    </div>
  );
};

export default Navmenu;
