"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { UserRole } from "@/lib/types/domain";
import {
  LayoutDashboard,
  Map,
  ClipboardCheck,
  CalendarDays,
  Users,
  KanbanSquare,
  FileCheck2,
  FileKey2,
  HardHat,
  ShieldCheck,
  BarChart3,
  Truck,
  Bell,
  Activity,
  FolderLock,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Radio,
  Sparkles,
  Layers,
  Flame,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export function AppSidebar() {
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { userRole, userName } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    // Remember sidebar collapsed preference
    const saved = localStorage.getItem("coal_gov_sidebar_collapsed");
    if (saved === "true") setIsCollapsed(true);
  }, []);

  const toggleCollapsed = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("coal_gov_sidebar_collapsed", String(next));
  };

  const getNavItemsForRole = (role: UserRole): NavItem[] => {
    switch (role) {
      case UserRole.CONTRACTOR_ADMIN:
        return [
          { label: "Contractor Cockpit", href: "/overview", icon: LayoutDashboard, badge: "Fleet" },
          { label: "Production & Haul", href: "/contractor/production", icon: Truck, badge: "Tonnage" },
          { label: "Safety Scorecard", href: "/contractor/risk-score", icon: ShieldCheck },
          { label: "Active Cast Sites", href: "/contractor/mines", icon: Map, badge: "4 Mines" },
          { label: "Data Logs", href: "/data-logs", icon: FolderLock },
          { label: "Notifications", href: "/notifications", icon: Bell },
        ];

      case UserRole.DGMS_INSPECTOR:
      case UserRole.REGULATORY_OFFICER:
        return [
          { label: "Inspector Cockpit", href: "/overview", icon: LayoutDashboard, badge: "DGMS" },
          { label: "Statutory Audits", href: "/inspections", icon: ClipboardCheck, badge: "Form-IV" },
          { label: "New Form-IV Audit", href: "/inspections/new", icon: FileCheck2, badge: "GPS" },
          { label: "Audit Schedules", href: "/schedules", icon: CalendarDays },
          { label: "CAPA Directives", href: "/capa", icon: KanbanSquare, badge: "6-Stage" },
          { label: "AI Hazard Risk", href: "/analytics", icon: BarChart3, badge: "72h" },
          { label: "Audit Ledger", href: "/audit-ledger", icon: FileKey2, badge: "SHA-256" },
          { label: "GIS Mine Map", href: "/map", icon: Map, badge: "Sat" },
        ];

      case UserRole.COLLIERY_MANAGER:
      case UserRole.AREA_ADMIN:
        return [
          { label: "Colliery Cockpit", href: "/overview", icon: LayoutDashboard, badge: "Live" },
          { label: "AI Safety Analytics", href: "/analytics", icon: BarChart3, badge: "4-Pillar" },
          { label: "Immutable Data Logs", href: "/data-logs", icon: FolderLock, badge: "Audit" },
          { label: "CAPA Remediation", href: "/capa", icon: KanbanSquare, badge: "Action" },
          { label: "Worker Biometrics", href: "/attendance", icon: Users, badge: "Muster" },
          { label: "Cryptographic Ledger", href: "/audit-ledger", icon: FileKey2, badge: "SHA-256" },
          { label: "Underground GIS", href: "/map", icon: Map, badge: "Gallery" },
        ];

      case UserRole.MINISTRY_AUDITOR:
        return [
          { label: "Executive Scorecard", href: "/overview", icon: LayoutDashboard, badge: "National" },
          { label: "Cryptographic Ledger", href: "/audit-ledger", icon: FileKey2, badge: "SHA-256" },
          { label: "AI Hazard Forecasting", href: "/analytics", icon: BarChart3, badge: "72h" },
          { label: "Statutory Clearances", href: "/compliance", icon: FileCheck2, badge: "DGMS" },
          { label: "CAPA Governance", href: "/capa", icon: KanbanSquare },
          { label: "Pan-India GIS Map", href: "/map", icon: Map, badge: "Basins" },
          { label: "Immutable Logs", href: "/data-logs", icon: FolderLock },
        ];

      case UserRole.MINING_SIRDAR:
      case UserRole.FIELD_WORKER:
      default:
        return [
          { label: "Worker Shift Cockpit", href: "/overview", icon: LayoutDashboard, badge: "Telemetry" },
          { label: "Report Pit Hazard", href: "/worker/issues", icon: ShieldAlert, badge: "Urgent" },
          { label: "Biometric Shift Muster", href: "/attendance", icon: Users, badge: "Muster" },
          { label: "Gallery Incline Map", href: "/map", icon: Map, badge: "Stations" },
          { label: "Notifications", href: "/notifications", icon: Bell },
        ];
    }
  };

  const currentRole = mounted ? userRole : UserRole.MINISTRY_AUDITOR;
  const navItems = getNavItemsForRole(currentRole);

  return (
    <aside
      className={`bg-[#080D16] border-r border-white/10 flex flex-col justify-between shrink-0 min-h-screen transition-all duration-300 relative z-30 ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      <div>
        {/* Sidebar Brand Header & Toggle */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-3.5 bg-black/20">
          {!isCollapsed && (
            <Link href="/overview" className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00C896] to-[#28B9C7] flex items-center justify-center text-[#050A12] shadow-md shadow-[#00C896]/20 shrink-0">
                <HardHat className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="truncate">
                <span className="font-display font-extrabold text-xs tracking-tight text-white block">
                  COMMAND NAV
                </span>
                <span className="text-[9px] font-mono text-[#00C896] tracking-wider block">
                  DGMS / MOC SECURE
                </span>
              </div>
            </Link>
          )}

          {isCollapsed && (
            <div className="mx-auto">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00C896] to-[#28B9C7] flex items-center justify-center text-[#050A12] shadow-md shadow-[#00C896]/20">
                <HardHat className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          )}

          {/* Collapse / Expand Toggle Button */}
          <button
            onClick={toggleCollapsed}
            className={`p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors ${
              isCollapsed ? "hidden" : "block"
            }`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Collapsed Expand Quick Action */}
        {isCollapsed && (
          <div className="p-2 border-b border-white/5 flex justify-center">
            <button
              onClick={toggleCollapsed}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00C896]/20 text-slate-400 hover:text-[#00C896] transition-colors"
              title="Expand Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-2 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/overview" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={`relative flex items-center rounded-xl text-xs font-semibold transition-all group ${
                  isCollapsed ? "justify-center p-3" : "justify-between px-3 py-2.5"
                } ${
                  isActive
                    ? "bg-[#00C896]/15 text-[#00C896] border border-[#00C896]/30 shadow-md shadow-[#00C896]/5 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Active Green Indicator Line */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#00C896] rounded-r" />
                )}

                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-[#00C896]" : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                      isActive
                        ? "bg-[#00C896]/20 text-[#00C896] border-[#00C896]/40"
                        : "bg-black/40 text-slate-500 border-white/5"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer: Statutory Status & Ledger Check */}
      <div className="p-3 border-t border-white/10 bg-black/20">
        {!isCollapsed ? (
          <div className="p-2.5 rounded-xl bg-[#050A12] border border-white/5 space-y-1 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-[#00C896] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>CMR 2017 ACTIVE</span>
            </div>
            <p className="text-slate-400 text-[9px] leading-tight">
              SHA-256 cryptographic watchdog and statutory tripwires enabled.
            </p>
          </div>
        ) : (
          <div className="flex justify-center" title="CMR 2017 Compliance Watchdog Active">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C896] animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
}
