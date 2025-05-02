import React, { useState, useRef, useEffect, type ReactNode } from "react";
import {
  Factory,
  Info,
  Bell,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// Accessible announcement component
const ScreenReaderAnnouncement = ({ message }: { message: string }) => {
  return (
    <div aria-live="polite" className="sr-only" role="status">
      {message}
    </div>
  );
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [hasEnoughSpace, setHasEnoughSpace] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const sidebarRef = useRef<HTMLElement>(null);

  // Check if there's enough space to expand the sidebar without overlay
  useEffect(() => {
    const checkSpace = () => {
      const minWidthForSidebar = 250; // Expanded sidebar width
      const minContentWidth = 600; // Minimum content width
      const totalWidth = window.innerWidth;
      setHasEnoughSpace(totalWidth >= minWidthForSidebar + minContentWidth);
    };

    checkSpace();
    window.addEventListener("resize", checkSpace);
    return () => window.removeEventListener("resize", checkSpace);
  }, []);

  // Handle escape key to close the sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expanded) {
        setExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expanded]);

  // Clear announcement after it's been read
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => {
        setAnnouncement("");
      }, 3000); // Clear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  const toggleSidebar = () => {
    const newState = !expanded;
    setExpanded(newState);
    setAnnouncement(newState ? "Sidebar expanded" : "Sidebar collapsed");
  };

  // Labels for navigation items
  const navItems = [
    { icon: <Factory />, label: "Dashboard", color: "bg-cyan-300" },
    { icon: <Info color="white" />, label: "Information", hover: true },
    { icon: <Bell color="white" />, label: "Notifications", hover: true },
    { icon: <FileText color="white" />, label: "Documents", hover: true },
    { icon: <Settings color="white" />, label: "Settings", hover: true },
  ];

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {announcement && <ScreenReaderAnnouncement message={announcement} />}
      <aside
        ref={sidebarRef}
        className={`transition-all duration-300 ease-in-out flex flex-col justify-between p-4 bg-indigo-900 group ${expanded ? "w-[240px]" : "w-[72px]"} ${!hasEnoughSpace && expanded ? "absolute z-10 h-full shadow-lg" : ""}`}
        aria-expanded={expanded}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="relative">
          <button
            onClick={toggleSidebar}
            className="absolute -right-7 top-20 bg-indigo-700 text-white rounded-full p-1 shadow-md transition-opacity opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 focus:outline-none"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            title={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <div className="flex flex-col gap-7 mt-2">
          <div></div>
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`${item.color || ""} ${item.hover ? "hover:bg-indigo-800" : ""} rounded-4xl flex items-center p-2 cursor-pointer transition-colors`}
              role="button"
              tabIndex={0}
              aria-label={item.label}
              onClick={() => console.log(`Clicked on ${item.label}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  console.log(`Activated ${item.label} with keyboard`);
                }
              }}
            >
              <div className="mr-4">{item.icon}</div>
              {expanded && (
                <span className="text-white whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-indigo-300 flex flex-col items-center">
          <button
            className="bg-indigo-800 text-white rounded-full p-2 hover:bg-indigo-700 flex items-center justify-center"
            aria-label="Logout"
          >
            <LogOut />
          </button>
          <div className="mt-2 flex items-center">
            <div className="w-9 h-9 bg-indigo-100 text-indigo-900 rounded-full flex items-center justify-center font-semibold text-base">
              EG
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col bg-white">
        <header className="h-14 flex flex-row justify-between items-center px-8 py-3 shadow-md bg-white">
          <span className="text-xl font-bold tracking-wide flex items-center">
            <span className="text-indigo-900">DataMind</span>
            <span className="text-blue-500 ml-0.5">AI</span>
          </span>
        </header>
        <main className="flex-1 bg-white overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
