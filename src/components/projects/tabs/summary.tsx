import {
  ArcElement,
  CategoryScale,
  Chart,
  DoughnutController,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  Tooltip,
} from "chart.js";
import { title } from "process";
import { useEffect, useRef } from "react";
import { IoMdDoneAll } from "react-icons/io";

Chart.register(
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend,
  // opzionali / ereditati dal tuo snippet
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement
);

export default function TabSummary() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const data = {
    title: "asd",
    labels: ["In progress", "To do"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 3,
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  const config = {
    type: "doughnut",
    data: data,
  };

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;
    chartRef.current = new Chart(ctx, config);

    return () => chartRef.current?.destroy();
  }, []);

  const downloadPng = () => {
    const url = canvasRef.current!.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "chart.png";
    a.click();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="">
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:gap-x-3 md:gap-y-10">
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg border p-6">
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
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg border p-6">
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
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg border p-6">
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
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg border p-6">
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
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
          <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
            Status overview
          </h1>

          <div style={{ height: 300 }}>
            <canvas ref={canvasRef} />
            <button onClick={downloadPng}>Scarica PNG</button>
          </div>

          <a
            href="#"
            className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Read more
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <a
              href="#"
              className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2"
            >
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
              </svg>
              Design
            </a>
            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
              Start with Flowbite Design System
            </h2>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
              Static websites are now used to bootstrap lots of websites and are
              becoming the basis for a variety of tools that even influence both
              web designers and developers.
            </p>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
            >
              Read more
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <a
              href="#"
              className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2"
            >
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
                />
              </svg>
              Code
            </a>
            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
              Best react libraries around the web
            </h2>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
              Static websites are now used to bootstrap lots of websites and are
              becoming the basis for a variety of tools that even influence both
              web designers and developers.
            </p>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
            >
              Read more
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
