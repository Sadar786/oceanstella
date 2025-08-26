import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import DashboardHome from "./DashboardHome";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("dashboard");

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    setTab(url.get("tab") || "dashboard");
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 text-slate-100">
      {/* sidebar */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 bg-slate-900/60">
        <DashSidebar activeTab={tab} />
      </aside>

      {/* main */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {tab === "dashboard" && <DashboardHome />}
        {/* next tabs we’ll add later:
          products, categories, case-studies, blog, leads, inquiries, users, settings
        */}
      </main>
    </div>
  );
}
