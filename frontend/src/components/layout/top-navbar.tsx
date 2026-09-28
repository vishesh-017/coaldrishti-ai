"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { UserRole } from "@/lib/types/domain";
import { MineSelector } from "./MineSelector";
import { SyncStatusPill } from "../inspections/sync-status-pill";
import { NotificationCenterModal } from "../notifications/notification-center-modal";
import {
  HardHat,
  Shield,
  ShieldCheck,
  Bell,
  LogOut,
  ChevronDown,
  UserCheck,
  Sparkles,
  Radio,
  Clock,
  ExternalLink,
  Layers,
  Activity,
  Lock,
} from "lucide-react";

export function TopNavbar() {
  const [mounted, setMounted] = useState(false);
  const { userRole, userName, userEmail, switchRole, logout } = useAuthStore();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState("Just now");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const syncInterval = setInterval(() => {
      setLastSyncTime("Live (< 3s)");
    }, 15000);
    return () => clearInterval(syncInterval);
  }, []);

  const currentRole = mounted ? userRole : UserRole.MINISTRY_AUDITOR;
  const currentName = mounted ? userName : "Dr. R. K. Sharma";
  const currentEmail = mounted ? userEmail : "auditor.hq@coal.gov.in";

  const isDemoMode =
    mounted &&
    (process.env.NEXT_PUBLIC_DEMO_MODE === "true" ||
      (typeof window !== "undefined" && window.location.search.includes("demo=true")) ||
      true);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const roles = [
    { role: UserRole.MINISTRY_AUDITOR, label: "Ministry Auditor", scope: "Pan-India Macro Governance" },
    { role: UserRole.DGMS_INSPECTOR, label: "DGMS Inspector", scope: "Statutory Enforcement & Form-IV" },
    { role: UserRole.COLLIERY_MANAGER, label: "Colliery Manager", scope: "GDK 11A Mine Operations" },
    { role: UserRole.FIELD_WORKER, label: "Mining Sirdar", scope: "Kasipet Underground Seam" },
    { role: UserRole.CONTRACTOR_ADMIN, label: "Contractor Fleet Admin", scope: "Ramagundam HEMM Fleet" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#080D16]/95 backdrop-blur-md border-b border-white/10 px-4 md:px-6 flex items-center justify-between shadow-lg shadow-black/50">
      {/* ── LEFT: Logo & Mine Selector ────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        {/* Brand / Emblem */}
        <Link href="/overview" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00C896] to-[#28B9C7] flex items-center justify-center text-[#050A12] shadow-md shadow-[#00C896]/20 group-hover:scale-105 transition-transform">
            <HardHat className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="hidden sm:block">
            <div className="font-display font-extrabold text-xs tracking-tight text-white flex items-center gap-1.5">
              CoalDrishti AI
              <span className="text-[8px] font-mono font-bold px-1 rounded bg-[#00C896]/15 text-[#00C896] border border-[#00C896]/30">
                MOC
              </span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none mt-0.5">
              SIH26024 • Ministry of Coal
            </div>
          </div>
        </Link>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-white/10 hidden md:block" />

        {/* Dynamic Mine / Region Selector */}
        <MineSelector />
      </div>

      {/* ── CENTER / RIGHT: Telemetry Tickers & Role Card ─────────────────── */}
      <div className="flex items-center gap-3">
        {/* Real-Time Sync Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#111827] border border-white/5 text-[11px] font-mono text-slate-300">
          <SyncStatusPill />
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Sync: {lastSyncTime}</span>
        </div>

        {/* Statutory Notifications Bell */}
        <button
          onClick={() => setNotifOpen(true)}
          className="relative p-2 rounded-xl bg-[#111827] hover:bg-[#151D2B] border border-white/10 text-slate-300 hover:text-white transition-all"
          title="Statutory Notifications & Alert Dispatch"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00C896] rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00C896] rounded-full" />
        </button>

        {/* Role Identity Card with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#111827] border border-white/10 hover:border-[#00C896]/40 text-left transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#00C896]/10 border border-[#00C896]/30 flex items-center justify-center text-[#00C896] shrink-0">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[9px] font-mono font-bold text-[#00C896] uppercase tracking-wider leading-tight">
                {currentRole.replace(/_/g, " ")}
              </div>
              <div className="text-xs font-bold text-white truncate max-w-[130px] leading-tight">
                {currentName}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform shrink-0" />
          </button>

          {/* Role Switcher & Profile Dropdown */}
          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in duration-150">
              {/* Profile Card Header */}
              <div className="p-2.5 border-b border-white/5 mb-1.5">
                <div className="text-[10px] font-mono text-[#00C896] font-bold uppercase tracking-wider">
                  ACTIVE GOVERNANCE PROFILE
                </div>
                <div className="text-xs font-bold text-white mt-1">{currentName}</div>
                <div className="text-[10px] font-mono text-slate-400 truncate">{currentEmail}</div>
              </div>

              {/* Demo Persona Switching */}
              <div className="px-2 py-1 text-[9px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#00C896]" />
                <span>Switch Authority Persona</span>
              </div>

              <div className="space-y-1 max-h-56 overflow-y-auto mt-1">
                {roles.map((r) => {
                  const isCurrent = userRole === r.role;
                  return (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                        isCurrent
                          ? "bg-[#00C896]/15 border border-[#00C896]/40 text-[#00C896] font-bold"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{r.label}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{r.scope}</div>
                      </div>
                      {isCurrent && <UserCheck className="w-4 h-4 text-[#00C896] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Sign Out Action */}
              <div className="mt-2 pt-2 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="w-full p-2 rounded-xl text-xs font-bold text-[#FF5C68] hover:bg-[#FF5C68]/10 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Command Center</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Statutory Notification Center Modal */}
      <NotificationCenterModal isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </header>
  );
}
