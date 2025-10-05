/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useMemo, useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { Chart } from "react-google-charts";

function ActivityRow() {
  return (
    <li>
      <a
        href="#"
        className="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <img
          className="w-12 h-12 mb-3 me-3 rounded-full sm:mb-0"
          src={`https://picsum.photos/200/300?random=${Math.random()}`}
          alt="Laura Romeros image"
        />
        <div className="text-gray-600 dark:text-gray-400">
          <div className="text-base font-normal">
            <span className="font-medium text-gray-900 dark:text-white">
              Laura Romeros
            </span>{" "}
            likes{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              Bonnie Green&apos;s
            </span>{" "}
            post in{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              How to start with Flowbite library
            </span>
          </div>
          <div className="text-sm font-normal">
            &quot;I wanted to share a webinar zeroheight.&quot;
          </div>
          <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
            <svg
              className="w-2.5 h-2.5 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z" />
              <path d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
              <path d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
            </svg>
            Private
          </span>
        </div>
      </a>
    </li>
  );
}

export default function TabSummary() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const data2 = [
    ["Task", "Number of task"],
    ["TODO", 11],
    ["Blocked", 2],
    ["Done", 2],
  ];

  const priorityOptions = useMemo(
    () => ({
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      titleTextStyle: { color: isDark ? "#fff" : "#111", fontSize: 18 },
      chartArea: { left: "10%", top: "10%", width: "80%", height: "70%" },
      animation: { duration: 0, startup: false },
      legend: {
        position: "bottom",
        textStyle: { color: isDark ? "#fff" : "#333" },
      },
      hAxis: {
        textStyle: { color: isDark ? "#fff" : "#333" },
      },
      vAxis: {
        textStyle: { color: isDark ? "#fff" : "#333" },
      },
    }),
    [isDark]
  );

  const options2 = {
    //title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false,
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    chartArea: { width: "90%", height: "80%" },
    titleTextStyle: { color: isDark ? "#fff" : "#111", fontSize: 18 },
    colors: ["#ffa500", "#ff0000", "#00ff00"],

    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: isDark ? "#fff" : "#333",
        fontSize: 12, // ← realistic size that actually renders
        bold: true,
      },
    },
  };

  const priority_data = [
    ["Element", "Task", { role: "style" }],
    ["Highest", 2, "color: #D32F2F"], // red 700
    ["High", 5, "color: #F57C00"], // orange 700
    ["Medium", 7, "color: #FBC02D"], // amber 700
    ["Low", 10, "color: #388E3C"], // green 700
    ["Lowest", 35, "color: #BDBDBD"], // gray 400
  ];

  const types_of_work_data = [
    ["Element", "Work", { role: "style" }],
    ["Task", 2, "color: #1976D2"], // blue 700
    ["Subtask", 5, "color: #00897B"], // teal 600
    ["Epic", 7, "color: #7B1FA2"], // purple 700
    ["Request", 10, "color: #F9A825"], // amber 800
    ["Bug", 5, "color: #D32F2F"], // red 700
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="">
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-3 md:gap-y-10">
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg border p-4">
                <div className="flex items-start gap-2.5">
                  <IoMdDoneAll size={32} className="rounded-full" />
                  <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        0 completed
                      </span>
                    </div>

                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      in the last 7days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg border p-4">
                <div className="flex items-start gap-2.5">
                  <IoMdDoneAll size={32} className="rounded-full" />
                  <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        0 updated
                      </span>
                    </div>

                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      in the last 7days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg border p-4">
                <div className="flex items-start gap-2.5">
                  <IoMdDoneAll size={32} className="rounded-full" />
                  <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        0 created
                      </span>
                    </div>

                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      in the last 7days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg border p-4">
                <div className="flex items-start gap-2.5">
                  <IoMdDoneAll size={32} className="rounded-full" />
                  <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        0 due soon
                      </span>
                    </div>

                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      in the last 7days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart Card - Fixed height */}
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 h-[448px]">
                {" "}
                {/* 400px + padding */}
                <div className="h-[400px]">
                  <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                    Status overview
                  </h2>
                  <Chart
                    chartType="PieChart"
                    width="100%"
                    height="90%"
                    data={data2}
                    options={options2}
                  />
                </div>
              </div>
            </div>

            {/* Activity Card - Same fixed height with scroll */}
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 h-[448px] flex flex-col">
                {/* Header */}
                <div className="flex items-start gap-2.5 mb-3 flex-shrink-0">
                  <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                    Activity
                  </h2>
                </div>

                {/* Scrollable Activity List */}
                <div className="flex-1 min-h-0 overflow-hidden">
                  <ol className="h-full overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 scrollbar-thin dark:scrollbar-thumb-gray-700/80 dark:scrollbar-track-gray-900 scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                    <ActivityRow />
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 aspect-[16/9] md:aspect-[21/9] max-h-[60vh]">
              <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                Priority breakdown
              </h2>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                Get a holistic view of how work is being prioritized.
              </p>
              {/* <Chart chartType="ColumnChart" width="100%" height="100%" data={priority_data} options={{backgroundColor: isDark ? "#1f2937" : "#ffffff", titleTextStyle: { color: isDark ? "#fff" : "#111", fontSize: 18 },}} /> */}
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="100%"
                data={priority_data}
                options={priorityOptions}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 aspect-[16/9] md:aspect-[21/9] max-h-[60vh]">
              <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                Types of work
              </h2>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                Get a breakdown of work items by their types. View all items
              </p>
              <Chart
                chartType="BarChart"
                width="100%"
                height="100%"
                data={types_of_work_data}
                options={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  titleTextStyle: {
                    color: isDark ? "#fff" : "#111",
                    fontSize: 18,
                  },
                  chartArea: {
                    left: "10%",
                    top: "10%",
                    width: "80%",
                    height: "70%",
                  },
                  animation: { duration: 0, startup: false },
                  legend: {
                    position: "bottom",
                    textStyle: { color: isDark ? "#fff" : "#333" },
                  },
                  hAxis: {
                    textStyle: { color: isDark ? "#fff" : "#333" },
                  },
                  vAxis: {
                    textStyle: { color: isDark ? "#fff" : "#333" },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
