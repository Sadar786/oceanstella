import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  {tab === "profile" && <Profile />}
  {tab === "products" && <ProductTab />}
  {tab === "categories" && <Categories />}
  {tab === "case-studies" && <CaseStudies />}
  {tab === "blog" && <Blog />}
  {tab === "leads" && <Leads />}
  {tab === "inquiries" && <Inquiries />}
  {tab === "media" && <Media />}
  {tab === "users" && <Users />}
  {tab === "settings" && <Settings />}  
  
</main>
    </div>
  );
}
