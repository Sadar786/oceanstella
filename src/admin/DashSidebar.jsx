// src/admin/DashSidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiMenuAlt2,
  HiChartPie,
  HiTag,
  HiTemplate,
  HiDocumentText,
  HiBookOpen,
  HiUserGroup,
  HiClipboardList,
  HiPhotograph,
  HiCog,
  HiLogout,
  HiUser,
} from "react-icons/hi";

function cx(...cls) {
  return cls.filter(Boolean).join(" ");
}

const SECTIONS = [
  {
    title: "Overview",
    items: [
      { tab: "dashboard", icon: HiChartPie, label: "Dashboard" },
    ],
  },
  {
    title: "Catalog & Content",
    items: [
      { tab: "products", icon: HiTag, label: "Products" },
      { tab: "categories", icon: HiTemplate, label: "Categories" },
      { tab: "case-studies", icon: HiDocumentText, label: "Case Studies" },
      { tab: "blog", icon: HiBookOpen, label: "Blog" },
    ],
  },
  {
    title: "CRM",
    items: [
      { tab: "leads", icon: HiUserGroup, label: "Leads" },
      { tab: "inquiries", icon: HiClipboardList, label: "Inquiries" },
    ],
  },
  {
    title: "System",
    items: [
      { tab: "media", icon: HiPhotograph, label: "Media" },
      { tab: "users", icon: HiUser, label: "Users" },
      { tab: "settings", icon: HiCog, label: "Settings" },
    ],
  },
];

export default function DashSidebar({ activeTab }) {
  const nav = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // remember collapse state between visits
  useEffect(() => {
    const saved = localStorage.getItem("os_admin_sidebar_collapsed");
    if (saved != null) setCollapsed(saved === "1");
  }, []);
  useEffect(() => {
    localStorage.setItem("os_admin_sidebar_collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  const go = (tab) => `/admin?tab=${tab}`;

  async function handleSignOut() {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    nav("/auth/login");
  }

  return (
    <aside
      className={cx(
        "relative h-full",
        collapsed ? "w-20" : "w-64",
        "bg-slate-900/70 backdrop-blur border-r border-white/10"
      )}
    >
      {/* Brand / Collapse */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500/80 to-cyan-500/80 grid place-items-center text-white font-bold">
            OS
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-semibold text-slate-100">Ocean Stella</div>
              <div className="text-xs text-slate-400">Admin</div>
            </div>
          )}
        </div>
        <button
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((v) => !v)}
          className="p-2 rounded-lg hover:bg-white/10 text-slate-300"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <HiMenuAlt2 />
        </button>
      </div>

      {/* Scrollable nav */}
      <div className="p-3 space-y-5 overflow-y-auto h-[calc(100vh-58px)] scrollbar-thin scrollbar-thumb-slate-700/70">
        {SECTIONS.map((section) => (
          <div key={section.title} className="space-y-2">
            {!collapsed && (
              <div className="px-2 text-[11px] uppercase tracking-wide text-slate-400/80">
                {section.title}
              </div>
            )}
            <nav className="space-y-1">
              {section.items.map((it) => {
                const active = activeTab === it.tab;
                const Icon = it.icon;
                return (
                  <Link
                    key={it.tab}
                    to={go(it.tab)}
                    className={cx(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2",
                      "border border-transparent hover:border-white/10",
                      active
                        ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/10 text-white shadow-inner"
                        : "text-slate-300 hover:bg-white/5"
                    )}
                    title={collapsed ? it.label : undefined}
                  >
                    {/* active indicator */}
                    <span
                      className={cx(
                        "absolute left-0 h-5 w-1 rounded-r",
                        active ? "bg-purple-400" : "bg-transparent"
                      )}
                    />
                    <Icon className="shrink-0" />
                    {!collapsed && <span className="text-sm font-medium">{it.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Divider */}
        <div className="border-t border-white/10 pt-3 mt-2" />

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className={cx(
            "w-full group relative flex items-center gap-3 rounded-xl px-3 py-2",
            "text-slate-300 hover:bg-white/5 hover:border-white/10 border border-transparent"
          )}
          title={collapsed ? "Sign out" : undefined}
        >
          <HiLogout />
          {!collapsed && <span className="text-sm font-medium">Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
