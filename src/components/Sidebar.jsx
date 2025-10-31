import React, { useState } from "react";
import { useSidebar } from "../context/SidebarContext"; // ✅ import this
import {
  LayoutDashboard,
  Users,
  Settings,
  User,
  BookOpen,
  ShoppingCart,
  Folder,
  FileText,
  Share2,
  Home,
  ChevronRight,
  Dot
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [openItem, setOpenItem] = useState("Default");
  const { collapsed, toggleSidebar } = useSidebar(); // access context + toggle

  const toggleItem = (name) => {
    setOpenItem(openItem === name ? null : name);
  };

  const menuData = [
    {
      title: "Favorites",
      items: [
        { name: "Overview", icon: <Home size={16} />, link: "/overview" },
        { name: "Projects", icon: <Folder size={16} />, link: "/projects" },
      ],
    },
    {
      title: "Dashboard",
      items: [
        { name: "Default", icon: <LayoutDashboard size={16} />, link: "/dashboard" },
        {
          name: "eCommerce",
          icon: <ShoppingCart size={16} />,
          link: "/ecommerce",
          subItems: [
            { name: "Products", link: "/ecommerce/products" },
            { name: "Orders", link: "/ecommerce/orders" },
            { name: "Customers", link: "/ecommerce/customers" },
          ],
        },
        { name: "Projects", icon: <Folder size={16} />, link: "/dashboard-projects" },
        {
          name: "Online Courses",
          icon: <BookOpen size={16} />,
          link: "/courses",
          subItems: [
            { name: "My Courses", link: "/courses/my" },
            { name: "Enrollments", link: "/courses/enrollments" },
          ],
        },
      ],
    },
    {
      title: "Pages",
      items: [
        {
          name: "User Profile",
          icon: <User size={16} />,
          link: "/profile",
          subItems: [
            { name: "Edit Profile", link: "/profile/edit" },
            { name: "Activity", link: "/profile/activity" },
          ],
        },
        { name: "Account", icon: <Settings size={16} />, link: "/account" },
        { name: "Corporate", icon: <Users size={16} />, link: "/corporate" },
        { name: "Blog", icon: <FileText size={16} />, link: "/blog" },
        { name: "Social", icon: <Share2 size={16} />, link: "/social" },
      ],
    },
  ];

  return (
    <div
      className={`h-screen bg-sidebar text-primary p-4 border-r border-default flex flex-col transition-all duration-300 align-center  ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* (keep all your existing code inside this) */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src="https://i.pravatar.cc/40"
          alt="user avatar"
          className="w-10 h-10 rounded-full border border-default"
        />
        {
          !collapsed && ( // ✅ conditionally render
            <span className="font-semibold text-primary text-lg tracking-wide">
              ByeWind
            </span>
          )
        }
       
      </div>

      <nav className="flex-1 justify-center scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {menuData.map((section, index) => (
          <div key={index} className="mb-6">
            {
              !collapsed && ( // ✅ conditionally render
                <h3 className="text-secondary text-xs uppercase mb-2 select-none">
                  {section.title}
                </h3>
              )
            }
           
            <ul className="space-y-1 ">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <div
                    className={`flex gap-2 items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ${
                      openItem === item.name
                        ? "bg-card text-primary"
                        : "hover:bg-hover hover:text-primary text-secondary"
                    }`}
                    onClick={() => {
                      // If sidebar is collapsed, open it when any icon is clicked.
                      if (collapsed) {
                        toggleSidebar();
                        // If the item has subitems, open its submenu once expanded.
                        if (item.subItems) {
                          setOpenItem(item.name);
                        }
                        return;
                      }

                      // If not collapsed, handle submenu toggle as before.
                      if (item.subItems) {
                        toggleItem(item.name);
                      }
                    }}
                  >
                    
                   {
                    !collapsed && ( 
                      item.subItems ? (
                        <ChevronRight
                          size={14}
                          className={`transition-transform duration-300 ${
                            openItem === item.name ? "rotate-90" : ""
                          }`}
                        />
                      ) : (
                        <Dot size={14} />
                      )
                    )}
                    <div className="flex items-center gap-3 " >
                      {item.icon}

                      {
                        !collapsed && ( // ✅ conditionally render
                          <span>{item.name}</span>
                        )
                      }
                    </div>
                  </div>

                  {item.subItems && (
                    <ul
                      className={`pl-8 space-y-1 overflow-hidden transition-all duration-300 ${
                        openItem === item.name
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.subItems.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <NavLink
                            to={sub.link}
                            className={({ isActive }) =>
                              `block px-3 py-1.5 rounded-md text-sm transition-colors duration-200 ${
                                isActive
                                  ? "bg-card text-primary"
                                  : "text-secondary hover:text-primary hover:bg-hover"
                              }`
                            }
                          >
                            {sub.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
