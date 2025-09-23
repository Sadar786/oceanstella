import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // assuming you use Redux
import DashSidebar from "./DashSidebar";
import DashboardHome from "./DashboardHome";
import Profile from "./sections/Profile";
import ProductTab from "./sections/ProductsTab";
import Categories from "./sections/Categories";
import CaseStudies from "./sections/CaseStudies";
import Blog from "./sections/Blog";
import Leads from "./sections/Leads";
import Inquiries from "./sections/Inquiries";
import Media from "./sections/Media";
import Users from "./sections/Users";
import Settings from "./sections/Setting";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("dashboard");

  // get user from redux (or replace with context/localStorage)
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    setTab(url.get("tab") || "dashboard");
  }, [location.search]);

  // === VIEWER ONLY ACCESS ===
  const isViewer = user?.role === "viewer";
  const allowedTabs = isViewer ? ["profile", "logout"] : null;

  // If viewer tries to access any other tab, redirect to profile
  if (isViewer && tab !== "profile" && tab !== "logout") {
    return <Navigate to="/admin?tab=profile" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 bg-slate-900/60">
        <DashSidebar activeTab={tab} isViewer={isViewer} />
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {tab === "dashboard" && !isViewer && <DashboardHome />}
        {tab === "profile" && <Profile />}
        {tab === "products" && !isViewer && <ProductTab />}
        {tab === "categories" && !isViewer && <Categories />}
        {tab === "case-studies" && !isViewer && <CaseStudies />}
        {tab === "blog" && !isViewer && <Blog />}
        {tab === "leads" && !isViewer && <Leads />}
        {tab === "inquiries" && !isViewer && <Inquiries />}
        {tab === "media" && !isViewer && <Media />}
        {tab === "users" && !isViewer && <Users />}
        {tab === "settings" && !isViewer && <Settings />}
      </main>
    </div>
  );
}
