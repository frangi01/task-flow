"use client";

import { differenceInDays, format } from "date-fns";
import { useState } from "react";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdDragHandle,
} from "react-icons/md";

interface WorkItem {
  type: "feature" | "task" | "bug" | "story" | "request";
  id: string;
  name: string;
  status: "todo" | "in-progress" | "done";
  dueUntil: Date;
  storyPoint: number;
  priority: number;
  avatar: string;
}

interface Sprint {
  id: string;
  title: string;
  startAt: Date;
  endAt: Date;
  storyPoints: number;
  workItems: WorkItem[];
}
/*
<span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20">
        Badge
      </span>
      <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20">
        Badge
      </span>
      <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">
        Badge
      </span>
*/

export function formatDate(date: Date | string) {
  return format(new Date(date), "PPP"); // e.g. Oct 7th, 2025
}

export default function TabBacklog() {
  const workItems: WorkItem[] = [
    {
      type: "feature",
      id: "BLG-101",
      name: "Implement user authentication flow",
      status: "in-progress",
      dueUntil: new Date("2025-10-10"),
      storyPoint: 8,
      priority: 1,
      avatar: "https://picsum.photos/seed/1/100",
    },
    {
      type: "bug",
      id: "BLG-102",
      name: "Fix dashboard chart rendering issue",
      status: "todo",
      dueUntil: new Date("2025-10-12"),
      storyPoint: 3,
      priority: 2,
      avatar: "https://picsum.photos/seed/2/100",
    },
    {
      type: "request",
      id: "BLG-103",
      name: "Optimize API response times for user stats",
      status: "in-progress",
      dueUntil: new Date("2025-10-25"),
      storyPoint: 5,
      priority: 3,
      avatar: "https://picsum.photos/seed/3/100",
    },
    {
      type: "feature",
      id: "BLG-104",
      name: "Add dark mode toggle to settings page",
      status: "done",
      dueUntil: new Date("2025-09-30"),
      storyPoint: 2,
      priority: 4,
      avatar: "https://picsum.photos/seed/4/100",
    },
    {
      type: "task",
      id: "BLG-105",
      name: "Refactor notification service",
      status: "todo",
      dueUntil: new Date("2025-10-18"),
      storyPoint: 5,
      priority: 5,
      avatar: "https://picsum.photos/seed/5/100",
    },
    {
      type: "story",
      id: "SLG-200",
      name: "Test1234",
      status: "todo",
      dueUntil: new Date("2025-10-18"),
      storyPoint: 5,
      priority: 20,
      avatar: "https://picsum.photos/seed/10/100",
    },
  ];

  const backlog: WorkItem[] = workItems;
  const [sprints, setSprints] = useState<Sprint[]>([]);

  const newSprint = () => {
    const s: Sprint = {
      id: `SPRINT-${sprints.length + 1}`,
      title: "New Sprint",
      startAt: new Date(),
      endAt: new Date(),
      storyPoints: 0,
      workItems: [],
    };
    setSprints((prev) => [...prev, s]);
  };

  return (
    <section>
      {sprints.map(sprint => (
         <div key={sprint.id} className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="bg-white dark:bg-gray-800">
            <div className="w-full p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* sinistra */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {sprint.id + " - " + sprint.title}
                </span>
                <span className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  (0 work items)
                </span>
              </div>

              {/* destra */}
              <div className="flex flex-wrap items-center gap-2 sm:ms-auto">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                  TODO <code>3</code>
                </span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-purple-900 dark:text-purple-300">
                  PROGRESS <code>2</code>
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                  DONE <code>2</code>
                </span>

                <button
                  type="button"
                  className="ms-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                           font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700
                           focus:outline-none dark:focus:ring-blue-800"
                >
                  New
                </button>
                <button
                  type="button"
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300
                           font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700
                           focus:outline-none dark:focus:ring-purple-900"
                  onClick={newSprint}
                >
                  New Sprint
                </button>
                
              </div>
            </div>
          </caption>

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Work item
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Due until
              </th>
              <th scope="col" className="px-6 py-3">
                StoryPoint
              </th>
              <th scope="col" className="px-6 py-3">
                Priority
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
           
            {sprint.workItems.map((entry) => (
              <tr
                key={entry.id + " " + entry.name}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-table-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {entry.id} {entry.name}
                </th>
                <td className="px-6 py-4">{
                  entry.status === 'todo' ? 
                   (<span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                  TODO 3
                </span>) : (entry.status === 'in-progress' ?
                  (<span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-purple-900 dark:text-purple-300">
                  PROGRESS 2
                </span>
                ) : (entry.status === 'done') ? (<span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                  DONE 2
                </span>) : "N/D") }</td>

                <td className="px-6 py-4">
                  <ExpireBadge date={entry.dueUntil} />
                </td>

                <td className="px-6 py-4">
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm overflow-x-auto text-center">
                    <code>{entry.storyPoint}</code>
                  </pre>
                </td>

                <td className="px-6 py-4">
                  <Priority priority={entry.priority} />
                </td>

                <td className="px-6 py-4">
                  <img
                    className="size-10 rounded-full bg-gray-800"
                    src={entry.avatar}
                  />
                </td>

                <td className="px-6 py-4">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button"
                    data-drawer-target="drawer-bottom-example"
                    data-drawer-show="drawer-bottom-example"
                    data-drawer-placement="bottom"
                    aria-controls="drawer-bottom-example"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      ))}
     
      
      
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="bg-white dark:bg-gray-800">
            <div className="w-full p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* sinistra */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Backlog
                </span>
                <span className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  (0 work items)
                </span>
              </div>

              {/* destra */}
              <div className="flex flex-wrap items-center gap-2 sm:ms-auto">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                  TODO <code>3</code>
                </span>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-purple-900 dark:text-purple-300">
                  PROGRESS <code>2</code>
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                  DONE <code>2</code>
                </span>

                <button
                  type="button"
                  className="ms-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                           font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700
                           focus:outline-none dark:focus:ring-blue-800"
                >
                  New
                </button>
                <button
                  type="button"
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300
                           font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700
                           focus:outline-none dark:focus:ring-purple-900"
                  onClick={() => newSprint()}
                >
                  New Sprint
                </button>
                
              </div>
            </div>
          </caption>

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Work item
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Due until
              </th>
              <th scope="col" className="px-6 py-3">
                StoryPoint
              </th>
              <th scope="col" className="px-6 py-3">
                Priority
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {backlog.map((entry) => (
              <tr
                key={entry.id + " " + entry.name}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-table-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {entry.id} {entry.name}
                </th>
                <td className="px-6 py-4">{
                  entry.status === 'todo' ? 
                   (<span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                  TODO 3
                </span>) : (entry.status === 'in-progress' ?
                  (<span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-purple-900 dark:text-purple-300">
                  PROGRESS 2
                </span>
                ) : (entry.status === 'done') ? (<span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                  DONE 2
                </span>) : "N/D") }</td>

                <td className="px-6 py-4">
                  <ExpireBadge date={entry.dueUntil} />
                </td>

                <td className="px-6 py-4">
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm overflow-x-auto text-center">
                    <code>{entry.storyPoint}</code>
                  </pre>
                </td>

                <td className="px-6 py-4">
                  <Priority priority={entry.priority} />
                </td>

                <td className="px-6 py-4">
                  <img
                    className="size-10 rounded-full bg-gray-800"
                    src={entry.avatar}
                  />
                </td>

                <td className="px-6 py-4">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button"
                    data-drawer-target="drawer-bottom-example"
                    data-drawer-show="drawer-bottom-example"
                    data-drawer-placement="bottom"
                    aria-controls="drawer-bottom-example"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function Priority({ priority }: { priority: number }) {
  let icon;
  switch (priority) {
    case 1:
      icon = <MdKeyboardDoubleArrowDown size={24} />;
      break;
    case 2:
      icon = <MdKeyboardArrowDown size={24} />;
      break;
    case 4:
      icon = <MdKeyboardArrowUp size={24} />;
      break;
    case 5:
      icon = <MdKeyboardDoubleArrowUp size={24} />;
      break;
    default:
      icon = <MdDragHandle size={24} />;
      break;
  }

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1`}>
      {icon}
    </span>
  );
}

export function ExpireBadge({ date }: { date: Date | string }) {
  const now = new Date();
  const target = new Date(date);

  const diffDays = differenceInDays(target, now);
  let color = "";

  if (diffDays < 0) {
    // already expired
    color = "bg-gray-400/10 text-gray-400 inset-ring inset-ring-gray-400/20";
  } else if (diffDays <= 2) {
    color = "bg-red-400/10 text-red-400 inset-ring inset-ring-red-400/20";
  } else if (diffDays <= 5) {
    color =
      "bg-yellow-400/10 text-yellow-500 inset-ring inset-ring-yellow-400/20";
  } else {
    color = "bg-green-400/10 text-green-400 inset-ring inset-ring-green-500/20";
  }

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${color}`}
    >
      {formatDate(date)}
    </span>
  );
}
