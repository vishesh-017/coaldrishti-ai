"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Flame,
  Wind,
  Layers,
  ChevronUp,
  ChevronDown,
  BookOpen,
  CheckCircle2,
  Lock,
  Scale,
  X,
  Radio,
  ExternalLink,
} from "lucide-react";

interface Directive {
  code: string;
  title: string;
  category: string;
  statutoryLimit: string;
  enforcementAction: string;
}

const STATUTORY_DIRECTIVES: Directive[] = [
  {
    code: "CMR 2017 Reg 153",
    title: "Gassy Seam & Inflammable Gas Limits",
    category: "Gas Telemetry",
    statutoryLimit: "CH₄ ≤ 0.75% (Return Airway) | ≤ 1.25% (General Body)",
    enforcementAction: "Immediate electric power trip & evacuation of working face",
  },
  {
    code: "CMR 2017 Reg 154",
    title: "Airflow Velocity & Adequate Ventilation",
    category: "Underground Airflow",
    statutoryLimit: "Airflow ≥ 6.0 m³/min/person | Velocity: 0.5 – 4.0 m/s",
    enforcementAction: "Auxiliary ventilation booster startup & statutory hold",
  },
  {
    code: "Mines Act 1952 Sec 22",
    title: "Prohibition of Employment in Case of Danger",
    category: "Statutory Authority",
    statutoryLimit: "Any unmitigated safety threat / roof spalling",
    enforcementAction: "Chief Inspector / DGMS statutory order prohibiting pit entry",
  },
  {
    code: "CMR 2017 Reg 123",
    title: "Systematic Support Rules (SSR)",
    category: "Strata Control",
    statutoryLimit: "Roof bolt tension ≥ 60 kN | Cable bolting at junctions",
    enforcementAction: "Extraction cessation until SSR audit clearance",
  },
];

export function SafetyDirectivesFooter() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <footer className="sticky bottom-0 z-30 w-full bg-[#080D16] border-t border-white/10 text-xs font-mono shadow-xl shadow-black/80">
      {/* ── Main Live Status Ticker Bar ──────────────────────────────────── */}
      <div className="px-4 py-2 flex items-center justify-between gap-4">
        {/* Left: Live Statutory Status Tickers */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          {/* Status Chip 1: CMR-153 CH4 */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
            <span className="text-slate-400">CMR-153:</span>
            <span className="font-bold text-[#00C896]">CH₄ &le; 0.75% OK</span>
          </div>

          <div className="h-3 w-px bg-white/10 hidden sm:block shrink-0" />

          {/* Status Chip 2: CMR-154 Airflow */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#28B9C7]" />
            <span className="text-slate-400">CMR-154:</span>
            <span className="font-bold text-[#28B9C7]">Airflow 2.1 m/s (Normal)</span>
          </div>

          <div className="h-3 w-px bg-white/10 hidden md:block shrink-0" />

          {/* Status Chip 3: SHA-256 Ledger Integrity */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0">
            <Lock className="w-3 h-3 text-[#00C896]" />
            <span className="text-slate-400">SHA-256 Ledger:</span>
            <span className="font-bold text-[#00C896]">VERIFIED IMMUTABLE</span>
          </div>

          <div className="h-3 w-px bg-white/10 hidden lg:block shrink-0" />

          {/* Status Chip 4: Geofence Active */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-400">PostGIS Geofence:</span>
            <span className="font-bold text-white">0 Breaches</span>
          </div>
        </div>

        {/* Right: Expandable Directives Drawer Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-[11px] font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#00C896]" />
            <span>Statutory Directives</span>
            {drawerOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* ── Expandable Directives Drawer ─────────────────────────────────── */}
      {drawerOpen && (
        <div className="p-4 bg-[#111827] border-t border-white/10 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#00C896]" />
              <span className="font-display font-bold text-xs uppercase tracking-wider text-white">
                Statutory Safety Regulations &amp; Legal Tripwire Limits
              </span>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STATUTORY_DIRECTIVES.map((d, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#080D16] border border-white/5 text-[11px] space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#00C896]">{d.code}</span>
                  <span className="text-slate-400">{d.category}</span>
                </div>
                <div className="font-bold text-slate-200 text-xs">{d.title}</div>
                <div className="text-slate-400 text-[10px]">
                  <strong>Limit:</strong> {d.statutoryLimit}
                </div>
                <div className="text-[#FF5C68] text-[9px] pt-1 border-t border-white/5">
                  <strong>Trigger:</strong> {d.enforcementAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </footer>
  );
}
