import { dashboardConfig } from "@/config/dashboard";
import { SideNav } from "./components/sidenav";
import { TopBar } from "./components/topbar";


const DashbourdPageLayout = ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen flex-col space-y-6 bg-gray-100 pb-8">
      <header className="sticky top-0 z-40 border-b bg-background">
      </header>
      <div className=" mx-4 grid flex-1 gap-12 md:grid-cols-[250px_1fr]">
        <aside className="hidden w-[250px] h-full flex-col md:flex bg-white rounded-xl p-10">
          <SideNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden bg-white rounded-xl">
          <TopBar />
          {children}
        </main>
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  );
}

export default DashbourdPageLayout;