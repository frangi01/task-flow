"use client";
import { CiGlobe, CiClock1, CiSettings, CiCalendar } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { FaHouse } from "react-icons/fa6";
import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import { TfiBlackboard } from "react-icons/tfi";
import { CgCodeSlash, CgList, CgShortcut } from "react-icons/cg";
import { BsClock } from "react-icons/bs";
import TabSummary from "@/components/projects/tabs/summary";
import React from "react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode | null;
  component: React.ReactNode | null;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("summary");
  const params = useParams();
  const id = params.id; // [id] from URL

const tabs: Tab[] = useMemo(() => [
  { id: "summary", label: "Summary", icon: <CiGlobe size={16} />, component: <TabSummary /> },
  { id: "timeline", label: "Timeline", icon: <BsClock size={16} />, component: null },
  { id: "backlog", label: "Backlog", icon: null, component: null },
  { id: "board", label: "Board", icon: <TfiBlackboard size={16} />, component: null },
  { id: "calendar", label: "Calendar", icon: <CiCalendar size={16} />, component: null },
  { id: "list", label: "List", icon: <CgList size={16} />, component: null },
  { id: "forms", label: "Forms", icon: null, component: null },
  { id: "goals", label: "Goals", icon: null, component: null },
  { id: "development", label: "Development", icon: null, component: null },
  { id: "code", label: "Code", icon: <CgCodeSlash size={16} />, component: null },
  { id: "security", label: "Security", icon: null, component: null },
  { id: "releases", label: "Releases", icon: null, component: null },
  { id: "deployments", label: "Deployments", icon: null, component: null },
  { id: "archive", label: "Archive", icon: null, component: null },
  { id: "pages", label: "Pages", icon: null, component: null },
  { id: "shortcuts", label: "Shortcuts", icon: <CgShortcut size={16} />, component: null },
  { id: "teams", label: "Teams", icon: <GoPeople size={16} />, component: null },
  { id: "Settings", label: "Settings", icon: <CiSettings size={16} />, component: null },
], []);


  const MORE_BUTTON_WIDTH = 80; // Reserve 80px for the "More +" button
  const tabsRef = useRef<HTMLUListElement>(null);

  const [hiddenTabs, setHiddenTabs] = useState<Tab[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const container = tabsRef.current;
      if (!container) return;

      const containerWidth = container.getBoundingClientRect().width;
      const children = Array.from(container.children) as HTMLElement[];

      let accumulatedWidth = 0;
      const visibleTabs: Tab[] = [];
      const hiddenTabs: Tab[] = [];

      tabs.forEach((tab, index) => {
        const childWidth = children[index]?.getBoundingClientRect().width || 0;
        accumulatedWidth += childWidth;

        if (accumulatedWidth <= containerWidth - MORE_BUTTON_WIDTH) {
          visibleTabs.push(tab);
        } else {
          hiddenTabs.push(tab);
        }
      });

      setHiddenTabs(hiddenTabs);
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // no dependency needed

  return (
    <div className="bg-gray-50 py-14 dark:bg-gray-900 min-h-screen">
      <div className="lg:px-8 overflow-hidden">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/dashboard"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <FaHouse className="mr-2" size={16} />
                Dashboard
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {id}
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mb-4 border-b border-gray-200 dark:border-gray-700 relative">
          <ul
            ref={tabsRef}
            className="flex flex-nowrap w-full -mb-px text-sm font-medium text-center"
            role="tablist"
          >
            {tabs
              .filter((tab) => !hiddenTabs.includes(tab))
              .map((tab) => (
                <li key={tab.id} className="flex-shrink-0" role="presentation">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center rounded-t-lg p-4 border-b-2 cursor-pointer transition-colors ${
                      activeTab === tab.id
                        ? "text-purple-600 border-purple-600 bg-gray-100 dark:bg-gray-800 dark:text-purple-500 dark:border-purple-500"
                        : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                  >
                    {tab.icon && <span className="mr-2">{tab.icon}</span>}
                    {tab.label}
                  </button>
                </li>
              ))}

            {hiddenTabs.length > 0 && (
              <li className="flex-shrink-0 relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="inline-flex items-center rounded-t-lg p-4 border-b-2 border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer"
                >
                  More +
                </button>

                {showDropdown && (
                  <ul className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10 min-w-max">
                    {hiddenTabs.map((tab) => (
                      <li key={tab.id}>
                        <button
                          onClick={() => {
                            setActiveTab(tab.id);
                            setShowDropdown(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          {tab.icon && <span className="mr-2">{tab.icon}</span>}
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 min-h-[200px]">
          {tabs.find((tab) => tab.id === activeTab)?.component || (
            <p className="text-gray-500 dark:text-gray-400">
              No content for this tab.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
