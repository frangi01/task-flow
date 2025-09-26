"use client";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  return (
    <div className="bg-gray-50 py-14 dark:bg-gray-900 min-h-screen">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <p className="max-w-lg text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">
          Projects
        </p>

        <div className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Card />
          <Card2 />
          <Card />
          <Card2 />
          <Card />
          <Card2 />
          <Card />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="relative" onClick={()=> redirect('dashboard/projects/1')}>
      <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800 transition shadow-xl" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
        <div className="px-8 pt-8 sm:px-10 sm:pt-10">
          <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
            Security
          </p>
          <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">
            Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse
            semper morbi.
          </p>
        </div>
        <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
            className="h-[min(152px,40cqw)] object-cover dark:hidden"
          />
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png"
            className="h-[min(152px,40cqw)] object-cover not-dark:hidden"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15" />
    </div>
  );
}

function Card2() {
  return (
    <div className="relative">
      <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl dark:bg-gray-800" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
        <div className="px-8 pt-8 sm:px-10 sm:pt-10">
          <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
            Performance
          </p>
          <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores
            impedit.
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
            className="w-full max-lg:max-w-xs dark:hidden"
          />
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png"
            className="w-full not-dark:hidden max-lg:max-w-xs"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15" />
    </div>
  );
}
