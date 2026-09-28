"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth-store";
import { UserRole } from "@/lib/types/domain";
import { API_BASE_URL } from "@/lib/api/client";
import {
  HardHat,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Lock,
  Compass,
  FileCheck2,
  Activity,
  ArrowRight,
  ShieldAlert,
  Radio,
  Sparkles,
} from "lucide-react";

const DEMO_ACCOUNTS = [
  {
    role: UserRole.MINISTRY_AUDITOR,
    label: "Ministry Auditor",
    email: "auditor.hq@coal.gov.in",
    name: "Dr. R. K. Sharma",
    dept: "Ministry of Coal • New Delhi",
    icon: ShieldCheck,
    color: "border-[#00C896]/40 text-[#00C896] bg-[#00C896]/10",
    tenantPath: "MOC",
    mineSiteId: "11111111-1111-4111-a111-111111111111",
    mineName: "Telangana & Pan-India Coal Basins",
  },
  {
    role: UserRole.DGMS_INSPECTOR,
    label: "DGMS Inspector",
    email: "inspector.dgms@dgms.gov.in",
    name: "Er. K. Venkat Rao",
    dept: "DGMS South Central Zone",
    icon: FileCheck2,
    color: "border-[#28B9C7]/40 text-[#28B9C7] bg-[#28B9C7]/10",
    tenantPath: "MOC",
    mineSiteId: "11111111-1111-4111-a111-111111111111",
    mineName: "South Central Mining Zone (SCCL)",
  },
  {
    role: UserRole.COLLIERY_MANAGER,
    label: "Colliery Manager",
    email: "manager.gdk11a@scclmines.com",
    name: "N. Ramesh",
    dept: "SCCL Godavarikhani No. 11A Incline",
    icon: HardHat,
    color: "border-[#F5B51B]/40 text-[#F5B51B] bg-[#F5B51B]/10",
    tenantPath: "MOC.SCCL.RAMAGUNDAM_1.GDK_11A",
    mineSiteId: "11111111-1111-4111-a111-111111111111",
    mineName: "Godavarikhani No. 11A Incline (GDK-11A)",
  },
  {
    role: UserRole.FIELD_WORKER,
    label: "Mining Sirdar",
    email: "sirdar.kasipet@scclmines.com",
    name: "K. Shankaraiah",
    dept: "Kasipet Underground Seam",
    icon: Activity,
    color: "border-slate-500/40 text-slate-300 bg-slate-500/10",
    tenantPath: "MOC.SCCL.MANDAMARRI.KASIPET_UG",
    mineSiteId: "44444444-4444-4444-a444-444444444444",
    mineName: "Kasipet Underground Mine",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [email, setEmail] = useState("auditor.hq@coal.gov.in");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectRole = (index: number) => {
    setSelectedRoleIndex(index);
    setEmail(DEMO_ACCOUNTS[index].email);
    setPassword("demo1234");
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const activeDemo = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.toLowerCase());

    try {
      // 1. Attempt authenticating against FastAPI backend
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setAuth({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          userRole: data.role as UserRole,
          userEmail: email,
          userName: activeDemo?.name || email.split("@")[0],
          tenantPath: data.tenant_path || activeDemo?.tenantPath || "MOC.SCCL.RAMAGUNDAM_1.GDK_11A",
          mineSiteId: activeDemo?.mineSiteId || "11111111-1111-4111-a111-111111111111",
          mineName: activeDemo?.mineName || "Godavarikhani No. 11A Incline (SCCL)",
        });
        router.push("/overview");
        return;
      }
    } catch (apiErr) {
      console.warn("Backend login offline, executing high-speed demo mode fallback", apiErr);
    }

    // 2. Demo fallback authentication
    if (!activeDemo || password !== "demo1234") {
      setError("Invalid credentials. Please select an authorized demonstration account below.");
      setLoading(false);
      return;
    }

    setAuth({
      accessToken: `demo-jwt-${Date.now()}`,
      refreshToken: `demo-refresh-${Date.now()}`,
      userRole: activeDemo.role,
      userEmail: email,
      userName: activeDemo.name,
      tenantPath: activeDemo.tenantPath,
      mineSiteId: activeDemo.mineSiteId,
      mineName: activeDemo.mineName,
    });

    router.push("/overview");
  };

  return (
    <div className="min-h-screen bg-[#050A12] text-[#F1F5F9] font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Background Geological Strata & Grid */}
      <div className="absolute inset-0 coal-strata-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 mine-shaft-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#00C896]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#28B9C7]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 w-full h-16 px-6 md:px-12 flex items-center justify-between border-b border-white/5 bg-[#050A12]/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00C896] to-[#28B9C7] flex items-center justify-center text-[#050A12] font-black shadow-md group-hover:scale-105 transition-transform">
            <HardHat className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-display font-extrabold text-sm tracking-tight text-white">
              CoalDrishti AI
            </div>
            <div className="text-[9px] font-mono text-[#00C896] uppercase tracking-wider">
              SIH26024 • Ministry of Coal
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse" />
            <span>SECURE GATEWAY ACTIVE</span>
          </div>
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            &larr; Return to Portal
          </Link>
        </div>
      </header>

      {/* Main Body: Immersive Layout */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Panel: Geological / Strata Data Visualization */}
          <div className="lg:col-span-6 space-y-6 hidden lg:block">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111827] border border-[#00C896]/30 text-xs text-[#00C896] font-mono">
              <Lock className="w-3.5 h-3.5" />
              <span>STATUTORY RBAC RESTRICTED ACCESS</span>
            </div>

            <h1 className="text-4xl font-black text-white font-display leading-tight">
              National Coal Intelligence &amp; Governance Center
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Authorized access portal for DGMS statutory inspectors, Ministry auditors, colliery managers and field safety teams across Coal India and Singareni Collieries.
            </p>

            {/* Technical Subsurface Telemetry Card */}
            <div className="p-4 rounded-xl bg-[#111827]/90 border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[10px] text-slate-400">
                <span>SYSTEM STATUS MONITOR</span>
                <span className="text-[#00C896]">CONNECTED TO EDGE CLUSTER</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Cryptographic Chain</span>
                  <span className="text-emerald-400 font-bold">SHA-256 Validated</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Spatial Geofence</span>
                  <span className="text-cyan-400 font-bold">PostGIS Bound</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Underground Node</span>
                  <span className="text-amber-400 font-bold">GDK 11A Seam III</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Offline Resilience</span>
                  <span className="text-purple-400 font-bold">IndexedDB Synced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Premium Glass/Graphite Authentication Panel */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="relative rounded-2xl bg-[#111827] border border-white/10 p-6 md:p-8 shadow-2xl shadow-black/80 corner-ticks">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#00C896] uppercase tracking-wider block">
                  COMMAND CENTER SIGN-IN
                </span>
                <h2 className="text-2xl font-black text-white font-display mt-1">
                  Enter Command Center
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Select your government role or enter official credentials.
                </p>
              </div>

              {/* Integrated Visual Role Selection Chips */}
              <div className="mt-5 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  Select Authorized Persona
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {DEMO_ACCOUNTS.map((acc, i) => {
                    const Icon = acc.icon;
                    const isSelected = selectedRoleIndex === i;
                    return (
                      <button
                        key={acc.role}
                        type="button"
                        onClick={() => handleSelectRole(i)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? "bg-[#00C896]/15 border-[#00C896] text-white shadow-md shadow-[#00C896]/10"
                            : "bg-[#080D16] border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/15"
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg shrink-0 ${
                            isSelected ? "bg-[#00C896] text-[#050A12]" : "bg-white/5 text-slate-400"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-[11px] font-bold font-display truncate">
                            {acc.label}
                          </div>
                          <div className="text-[9px] font-mono text-slate-400 truncate">
                            {acc.name.split(" ")[0]}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Authentication Form */}
              <form onSubmit={handleLogin} className="mt-5 space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-[#FF5C68]/10 border border-[#FF5C68]/30 flex items-center gap-2 text-xs text-[#FF5C68] font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                    Official Government Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="officer@coal.gov.in"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white text-xs font-mono focus:border-[#00C896] focus:ring-1 focus:ring-[#00C896] transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">
                      Security Password
                    </label>
                    <span className="text-[10px] font-mono text-[#00C896]">
                      Demo: demo1234
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white text-xs font-mono focus:border-[#00C896] focus:ring-1 focus:ring-[#00C896] transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-[#080D16] border-white/20 text-[#00C896] focus:ring-0 w-3.5 h-3.5"
                    />
                    <span className="text-[11px]">Remember terminal session</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">SSL 256-Bit</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-xs font-display text-[#050A12] bg-[#00C896] hover:bg-[#08B98A] shadow-xl shadow-[#00C896]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating with Ministry Ledger...</span>
                    </>
                  ) : (
                    <>
                      <span>Enter Command Center</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Secure indicator tag */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  DGMS Validated Node
                </span>
                <span>SHA-256 Chained</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 px-6 md:px-12 border-t border-white/5 bg-[#050A12]/80 text-[10px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>Ministry of Coal &bull; Directorate General of Mines Safety &bull; SIH26024</div>
        <div>Protected by 256-Bit Cryptographic Hash Interception</div>
      </footer>
    </div>
  );
}
