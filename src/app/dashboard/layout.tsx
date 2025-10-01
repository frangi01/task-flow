import Navbar from "@/components/navbar";
import SidebarContent from "@/components/sidebar-content";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header></header>
      <main>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <Navbar />
        </nav>

        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
         <SidebarContent/>
        </aside>

        <div className="sm:ml-64 mt-5">{children}</div>
      </main>
      <footer></footer>
    </div>
  );
}
