"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Flame,
  Wind,
  Layers,
  MapPin,
  Activity,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  Radio,
  FileCheck2,
  HardHat,
  Compass,
  FileKey2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  BarChart3,
  ExternalLink,
  Users,
  Clock,
  Terminal,
} from "lucide-react";

export default function LandingPage() {
  const [activeTabRole, setActiveTabRole] = useState(0);
  const [sensorValues, setSensorValues] = useState({
    ch4: 0.28,
    co: 8.4,
    airflow: 2.1,
    temp: 27.6,
  });

  // Subtle real-time sensor fluctuation simulation for live feel
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorValues((prev) => ({
        ch4: Number((0.26 + Math.random() * 0.05).toFixed(2)),
        co: Number((8.1 + Math.random() * 0.7).toFixed(1)),
        airflow: Number((2.05 + Math.random() * 0.15).toFixed(2)),
        temp: Number((27.4 + Math.random() * 0.4).toFixed(1)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const roles = [
    {
      title: "Ministry Auditor",
      subtitle: "National Compliance & Macro Risk Governance",
      desc: "Pan-India subsidiary heatmaps, statutory return enforcement, economic cess tracking, and national safety trend analysis for Coal India & SCCL basins.",
      icon: Shield,
      badge: "Macro Authority",
      route: "/overview",
      metrics: [
        { label: "National Compliance", val: "92.4%" },
        { label: "Mines Monitored", val: "348 Sites" },
        { label: "Directives Closed", val: "94.2%" },
      ],
    },
    {
      title: "DGMS Inspector",
      subtitle: "Statutory Inspection & Enforcement",
      desc: "Mandatory Form-IV digital audits, GPS leasehold boundary enforcement, automated 6-stage CAPA notice issuance, and non-compliance statutory holds.",
      icon: FileCheck2,
      badge: "Regulator",
      route: "/overview",
      metrics: [
        { label: "Geofence Accuracy", val: "± 2.5m" },
        { label: "Form-IV Digitization", val: "100%" },
        { label: "Avg Resolution", val: "4.8 Days" },
      ],
    },
    {
      title: "Colliery Manager",
      subtitle: "Mine Operations & Proactive Remediation",
      desc: "Real-time atmospheric telemetry gauges, 72-hour predictive gas excursion warnings, biometric shift muster, and immutable production cast registers.",
      icon: HardHat,
      badge: "Colliery Operations",
      route: "/overview",
      metrics: [
        { label: "Pit Safety Score", val: "91.5 / 100" },
        { label: "Shift Extraction", val: "4,280 T" },
        { label: "Ventilation Index", val: "Normal" },
      ],
    },
    {
      title: "Field Mining Sirdar",
      subtitle: "Safety, Hazards & Pit Operations",
      desc: "Zero-connectivity PWA inspection logger, instant underground danger reporting, emergency pit evacuation triggers, and automated muster logging.",
      icon: Activity,
      badge: "Field Ops",
      route: "/overview",
      metrics: [
        { label: "Sync Offline Mode", val: "Dexie DB" },
        { label: "Pit Stop Response", val: "< 15s" },
        { label: "Hazard Alerts", val: "Instant SMS" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#050A12] text-[#F1F5F9] font-sans selection:bg-[#00C896]/20 selection:text-[#00C896]">
      {/* ── TOP NAV ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full h-16 bg-[#050A12]/90 backdrop-blur-md border-b border-white/5 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00C896] to-[#28B9C7] flex items-center justify-center text-[#050A12] font-black shadow-lg shadow-[#00C896]/20">
            <HardHat className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-display font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
              CoalDrishti AI
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#00C896]/15 text-[#00C896] border border-[#00C896]/30">
                SIH26024
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
              Ministry of Coal • Gov of India
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
          <a href="#capabilities" className="hover:text-[#00C896] transition-colors">
            Capabilities
          </a>
          <a href="#architecture" className="hover:text-[#00C896] transition-colors">
            How It Works
          </a>
          <a href="#intelligence" className="hover:text-[#00C896] transition-colors">
            Basin Map
          </a>
          <a href="#ai-safety" className="hover:text-[#00C896] transition-colors">
            AI Engine
          </a>
          <a href="#audit" className="hover:text-[#00C896] transition-colors">
            Audit Ledger
          </a>
          <a href="#pricing" className="hover:text-[#00C896] transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 rounded-xl text-xs font-bold text-[#050A12] bg-[#00C896] hover:bg-[#08B98A] shadow-lg shadow-[#00C896]/25 transition-all flex items-center gap-1.5 hover:scale-[1.02]"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ── SECTION 1 — HERO ──────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle background strata and grid */}
        <div className="absolute inset-0 mine-shaft-grid opacity-30 pointer-events-none" />
        <div className="absolute -top-40 right-0 w-[550px] h-[550px] bg-[#00C896]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111827] border border-[#00C896]/30 text-xs text-[#00C896] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
              <span>MINISTRY OF COAL • AI-POWERED MINE GOVERNANCE PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] font-display">
              Intelligent Governance for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C896] via-[#28B9C7] to-white">
                India&apos;s Coal Mines
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              AI-driven statutory compliance, spatial intelligence, predictive mine safety and
              tamper-evident audit infrastructure engineered for DGMS, Coal India &amp; SCCL collieries.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/login"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] shadow-xl shadow-[#00C896]/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Sign In to Platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#capabilities"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#111827] hover:bg-[#151D2B] text-slate-200 border border-white/10 hover:border-white/20 transition-all"
              >
                Explore Platform
              </a>
            </div>

            {/* Live Telemetry Tickers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              <div className="p-3 rounded-xl bg-[#111827]/80 border border-white/5">
                <div className="flex items-center gap-1.5 text-[#00C896] text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C896]" /> Monitored
                </div>
                <div className="text-xl font-black font-mono mt-1 text-white">348</div>
                <div className="text-[10px] text-slate-400">Coal Mine Leases</div>
              </div>

              <div className="p-3 rounded-xl bg-[#111827]/80 border border-white/5">
                <div className="flex items-center gap-1.5 text-[#28B9C7] text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28B9C7]" /> Compliance
                </div>
                <div className="text-xl font-black font-mono mt-1 text-white">92.4%</div>
                <div className="text-[10px] text-slate-400">DGMS / CMR Rate</div>
              </div>

              <div className="p-3 rounded-xl bg-[#111827]/80 border border-white/5">
                <div className="flex items-center gap-1.5 text-[#F5B51B] text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B51B]" /> AI Safety
                </div>
                <div className="text-xl font-black font-mono mt-1 text-white">72-Hour</div>
                <div className="text-[10px] text-slate-400">Hazard Forecasting</div>
              </div>

              <div className="p-3 rounded-xl bg-[#111827]/80 border border-white/5">
                <div className="flex items-center gap-1.5 text-[#00C896] text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C896]" /> Ledger
                </div>
                <div className="text-xl font-black font-mono mt-1 text-white">SHA-256</div>
                <div className="text-[10px] text-slate-400">Tamper Immutable</div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Underground Mine Visualization */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#111827] border border-white/10 p-5 shadow-2xl shadow-black/80 corner-ticks">
              {/* Header inside graphic */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00C896] animate-ping" />
                  <span className="text-slate-200 font-bold">PIT TELEMETRY • GDK 11A INCLINE</span>
                </div>
                <span className="text-[10px] text-[#00C896]">DEPTH -380M</span>
              </div>

              {/* Graphical Mine Cutaway SVG Diagram */}
              <div className="relative h-64 w-full my-3 bg-[#080D16] rounded-xl overflow-hidden border border-white/5 flex items-center justify-center p-2">
                <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
                  {/* Surface layer */}
                  <rect x="0" y="0" width="400" height="35" fill="#151D2B" opacity="0.6" />
                  <line x1="0" y1="35" x2="400" y2="35" stroke="#00C896" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="15" y="24" fill="#94A3B8" fontSize="10" fontFamily="monospace">SURFACE LEASEHOLD BOUNDARY (POSTGIS)</text>

                  {/* Strata Layers */}
                  <rect x="0" y="36" width="400" height="40" fill="#0B111C" opacity="0.9" />
                  <line x1="0" y1="76" x2="400" y2="76" stroke="#293241" strokeWidth="1" />
                  
                  {/* Coal Seam 1 (Overburden) */}
                  <rect x="0" y="77" width="400" height="45" fill="#111827" />
                  <line x1="0" y1="122" x2="400" y2="122" stroke="#00C896" strokeWidth="0.5" strokeOpacity="0.4" />
                  <text x="310" y="105" fill="#64748B" fontSize="9" fontFamily="monospace">SEAM III (GASSY)</text>

                  {/* Main Underground Mine Incline Shaft */}
                  <path d="M 40 35 L 140 150 L 360 150" stroke="#00C896" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 140 150 L 220 200 L 380 200" stroke="#28B9C7" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Ventilation Airflow arrows */}
                  <path d="M 50 42 L 130 142" stroke="#28B9C7" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 150 145 L 340 145" stroke="#28B9C7" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Sensor Nodes */}
                  {/* Sensor 1: Return Airway */}
                  <circle cx="210" cy="150" r="5" fill="#00C896" className="animate-pulse" />
                  <circle cx="210" cy="150" r="10" stroke="#00C896" strokeWidth="0.8" opacity="0.6" />

                  {/* Sensor 2: Working Face */}
                  <circle cx="340" cy="150" r="5" fill="#F5B51B" />
                  <circle cx="340" cy="150" r="9" stroke="#F5B51B" strokeWidth="0.8" opacity="0.6" />

                  {/* Sensor 3: Incline Station */}
                  <circle cx="280" cy="200" r="4.5" fill="#00C896" />

                  {/* Continuous Miner Machine */}
                  <rect x="330" y="138" width="22" height="10" rx="2" fill="#F5B51B" opacity="0.8" />

                  {/* Node Labels */}
                  <g transform="translate(160, 128)">
                    <rect x="0" y="0" width="95" height="18" rx="4" fill="#050A12" stroke="#00C896" strokeWidth="0.8" />
                    <text x="8" y="12" fill="#00C896" fontSize="8.5" fontFamily="monospace" fontWeight="bold">CH4: {sensorValues.ch4}% (NORM)</text>
                  </g>

                  <g transform="translate(265, 175)">
                    <rect x="0" y="0" width="105" height="18" rx="4" fill="#050A12" stroke="#28B9C7" strokeWidth="0.8" />
                    <text x="8" y="12" fill="#28B9C7" fontSize="8.5" fontFamily="monospace" fontWeight="bold">CO: {sensorValues.co} PPM • AIR: {sensorValues.airflow}M/S</text>
                  </g>
                </svg>

                {/* Subsurface coordinate tag */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 border border-white/5 text-[9px] font-mono text-slate-400">
                  LAT 18°45&apos;N • LONG 79°31&apos;E • GALLERY 4B
                </div>
              </div>

              {/* Dynamic Live Sensor Readouts */}
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-[9px] text-slate-400 block">CH₄ (Methane)</span>
                  <span className="text-sm font-bold text-[#00C896]">{sensorValues.ch4}%</span>
                  <span className="text-[8px] text-slate-400 block">CMR &le; 0.75%</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-[9px] text-slate-400 block">CO (Carbon Monoxide)</span>
                  <span className="text-sm font-bold text-slate-200">{sensorValues.co} ppm</span>
                  <span className="text-[8px] text-slate-400 block">CMR &le; 50 ppm</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-[9px] text-slate-400 block">Ventilation Velocity</span>
                  <span className="text-sm font-bold text-[#28B9C7]">{sensorValues.airflow} m/s</span>
                  <span className="text-[8px] text-slate-400 block">Req: 0.5 - 4.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — PLATFORM CAPABILITIES ────────────────────────────── */}
      <section id="capabilities" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/30 uppercase tracking-widest">
            ENGINEERED FOR STATUTORY AUTHORITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            One Intelligence Layer Across the Mining Ecosystem
          </h2>
          <p className="text-sm text-slate-400">
            Purpose-built architecture addressing the core governance, safety, audit and field operations challenges across Indian coalfields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Card 01 */}
          <div className="p-5 rounded-xl bg-[#111827] border border-white/10 hover:border-[#00C896]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-2xl font-black font-mono text-[#00C896]">01</span>
                <ShieldCheck className="w-5 h-5 text-[#00C896]" />
              </div>
              <h3 className="text-sm font-bold font-display text-white mt-4 uppercase tracking-wide">
                Statutory Compliance
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                DGMS, Mines Act 1952, &amp; Coal Mines Regulations (CMR 2017) rule engine with auto-alerts &amp; Form-IV validation.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 text-[10px] font-mono text-[#00C896]">
              &bull; 100% DGMS Coverage
            </div>
          </div>

          {/* Card 02 */}
          <div className="p-5 rounded-xl bg-[#111827] border border-white/10 hover:border-[#28B9C7]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-2xl font-black font-mono text-[#28B9C7]">02</span>
                <Compass className="w-5 h-5 text-[#28B9C7]" />
              </div>
              <h3 className="text-sm font-bold font-display text-white mt-4 uppercase tracking-wide">
                Spatial Intelligence
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                PostGIS spatial geofences for leasehold verification, illegal mining prevention, and satellite polygon boundary tracking.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 text-[10px] font-mono text-[#28B9C7]">
              &bull; GPS Polygon Enforcement
            </div>
          </div>

          {/* Card 03 */}
          <div className="p-5 rounded-xl bg-[#111827] border border-white/10 hover:border-[#00C896]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-2xl font-black font-mono text-[#00C896]">03</span>
                <Cpu className="w-5 h-5 text-[#00C896]" />
              </div>
              <h3 className="text-sm font-bold font-display text-white mt-4 uppercase tracking-wide">
                AI Safety Intelligence
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Isolation Forest ML anomaly detection and 72-hour sequence hazard forecasting with 95% confidence intervals.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 text-[10px] font-mono text-[#00C896]">
              &bull; Predictive Spontaneous Combustion
            </div>
          </div>

          {/* Card 04 */}
          <div className="p-5 rounded-xl bg-[#111827] border border-white/10 hover:border-[#F5B51B]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-2xl font-black font-mono text-[#F5B51B]">04</span>
                <HardHat className="w-5 h-5 text-[#F5B51B]" />
              </div>
              <h3 className="text-sm font-bold font-display text-white mt-4 uppercase tracking-wide">
                Field Operations
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Offline-first PWA for zero-connectivity underground pits, worker shift muster biometrics, and hazard reporting.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 text-[10px] font-mono text-[#F5B51B]">
              &bull; Zero-Connectivity Dexie DB
            </div>
          </div>

          {/* Card 05 */}
          <div className="p-5 rounded-xl bg-[#111827] border border-white/10 hover:border-[#28B9C7]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-2xl font-black font-mono text-[#28B9C7]">05</span>
                <FileKey2 className="w-5 h-5 text-[#28B9C7]" />
              </div>
              <h3 className="text-sm font-bold font-display text-white mt-4 uppercase tracking-wide">
                Audit Infrastructure
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Cryptographic SHA-256 block chain securing all telemetry, muster logs, and CAPA notices with live tamper sirens.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 text-[10px] font-mono text-[#28B9C7]">
              &bull; Immutable Ledger Blocks
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — HOW THE PLATFORM WORKS (PIPELINE) ────────────────── */}
      <section id="architecture" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#080D16]/50">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#28B9C7]/10 text-[#28B9C7] border border-[#28B9C7]/30 uppercase tracking-widest">
            DIGITAL GOVERNANCE WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            How CoalDrishti AI Operates
          </h2>
          <p className="text-xs text-slate-400">
            End-to-end data pipeline from physical underground pits to central Ministry policymaking.
          </p>
        </div>

        {/* Pipeline Nodes */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00C896] via-[#28B9C7] to-[#00C896] -translate-y-1/2 opacity-30 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
            {[
              {
                step: "01",
                title: "Field Data",
                desc: "Telemetry, biometrics, offline inspections",
                icon: Activity,
                color: "text-[#00C896]",
              },
              {
                step: "02",
                title: "Spatial Check",
                desc: "PostGIS geofence leasehold verification",
                icon: Compass,
                color: "text-[#28B9C7]",
              },
              {
                step: "03",
                title: "AI Risk Engine",
                desc: "72h sequence forecasting & anomaly detection",
                icon: Cpu,
                color: "text-[#00C896]",
              },
              {
                step: "04",
                title: "Rule Engine",
                desc: "CMR 2017 & statutory violation tripwires",
                icon: ShieldAlert,
                color: "text-[#F5B51B]",
              },
              {
                step: "05",
                title: "Audit Ledger",
                desc: "SHA-256 block hash & tamper interception",
                icon: FileKey2,
                color: "text-[#28B9C7]",
              },
              {
                step: "06",
                title: "Ministry Decision",
                desc: "National compliance, CAPA & emergency SMS",
                icon: ShieldCheck,
                color: "text-[#00C896]",
              },
            ].map((node, i) => {
              const Icon = node.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#111827] border border-white/10 hover:border-white/20 transition-all text-center flex flex-col items-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center mb-3">
                    <Icon className={`w-5 h-5 ${node.color}`} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                    STAGE {node.step}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1 uppercase tracking-wide font-display">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {node.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — MINE INTELLIGENCE (COAL BASIN COMMAND) ───────────── */}
      <section id="intelligence" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/30 uppercase tracking-widest">
              GEOSPATIAL INTELLIGENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display mt-2">
              National Coal Basin Governance
            </h2>
          </div>
          <Link
            href="/map"
            className="text-xs font-bold text-[#00C896] flex items-center gap-1.5 hover:underline"
          >
            <span>Open Interactive GIS Map</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Visualizer Panel */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-[#111827] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-slate-400">
              <span className="text-white font-bold">INDIA COAL BASIN &amp; SUBSIDIARY SURVEILLANCE</span>
              <span className="text-[#00C896]">8 SUBSIDIARIES ACTIVE</span>
            </div>

            {/* Basin Region Cards inside */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-5">
              {[
                { name: "Godavari Valley (SCCL)", state: "Telangana", mines: 42, compliance: "94.8%", risk: "LOW" },
                { name: "Raniganj Basin (ECL)", state: "West Bengal", mines: 76, compliance: "91.2%", risk: "MODERATE" },
                { name: "Jharia Basin (BCCL)", state: "Jharkhand", mines: 58, compliance: "88.6%", risk: "HIGH (FIRE)" },
                { name: "Singrauli Basin (NCL)", state: "MP / UP", mines: 34, compliance: "95.2%", risk: "LOW" },
                { name: "Korba Basin (SECL)", state: "Chhattisgarh", mines: 62, compliance: "93.4%", risk: "LOW" },
                { name: "Talcher Basin (MCL)", state: "Odisha", mines: 46, compliance: "92.0%", risk: "LOW" },
              ].map((basin, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#080D16] border border-white/5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{basin.state}</span>
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded ${
                        basin.risk.includes("HIGH")
                          ? "text-[#FF5C68] bg-rose-500/10"
                          : basin.risk.includes("MODERATE")
                          ? "text-[#F5B51B] bg-amber-500/10"
                          : "text-[#00C896] bg-emerald-500/10"
                      }`}
                    >
                      {basin.risk}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-white mt-1.5">{basin.name}</div>
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">{basin.mines} Active Leases</span>
                    <span className="text-[#00C896] font-bold">{basin.compliance}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
                <span>Automated leasehold boundary cross-checks via PostGIS ST_Contains()</span>
              </div>
              <span className="text-slate-300 font-bold">ZERO GEOFENCE DRIFT</span>
            </div>
          </div>

          {/* Side Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-[#111827] border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Statutory Return Status
              </h3>
              <div className="text-3xl font-extrabold font-mono text-white mt-2">
                98.2%
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Form-IV monthly production &amp; safety returns filed on time across 348 mines.
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Underground Collieries:</span>
                  <span className="font-mono font-bold text-white">182 Mines</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Opencast Excavations:</span>
                  <span className="font-mono font-bold text-white">144 Mines</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Mixed Operations:</span>
                  <span className="font-mono font-bold text-white">22 Mines</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#111827] border border-white/10">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                <AlertTriangle className="w-4 h-4" />
                <span>CMR REGULATORY HIGHLIGHTS</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Underground air velocities strictly monitored between <strong>0.5 m/s</strong> and <strong>4.0 m/s</strong> (CMR Reg 154) with automated aux-fan trigger escalation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — AI SAFETY (PREDICTIVE ENGINE) ────────────────────── */}
      <section id="ai-safety" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#080D16]/50">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/30 uppercase tracking-widest">
            PREDICTIVE AI SAFETY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            72-Hour Hazard Forecasting &amp; Anomaly Detection
          </h2>
          <p className="text-xs text-slate-400">
            Local Scikit-Learn IsolationForest + sequence regression modeling methane trends and spontaneous heating before dangerous tripwires are reached.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Dual-Line Chart Demonstration Graphic */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111827] border border-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
              <span className="text-white font-bold">METHANE (CH₄) &amp; CO PREDICTIVE TRAJECTORY</span>
              <span className="text-[#00C896] font-bold">95% CONFIDENCE BAND</span>
            </div>

            {/* Visual SVG Chart */}
            <div className="h-60 w-full my-4 bg-[#050A12] rounded-xl p-3 border border-white/5 relative">
              <svg className="w-full h-full" viewBox="0 0 500 200" fill="none">
                {/* Horizontal reference lines */}
                <line x1="40" y1="30" x2="480" y2="30" stroke="#FF5C68" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <text x="45" y="24" fill="#FF5C68" fontSize="8" fontFamily="monospace">CMR RETURN AIRWAY LIMIT: 0.75%</text>

                <line x1="40" y1="90" x2="480" y2="90" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="40" y1="150" x2="480" y2="150" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Division line between Historical and Forecast */}
                <line x1="260" y1="10" x2="260" y2="185" stroke="#28B9C7" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="200" y="195" fill="#94A3B8" fontSize="9" fontFamily="monospace">HISTORICAL (-72H)</text>
                <text x="270" y="195" fill="#00C896" fontSize="9" fontFamily="monospace">FORECAST (+72H)</text>

                {/* 95% Confidence Band Polygon */}
                <polygon
                  points="260,110 320,95 380,80 440,65 480,55 480,105 440,115 380,125 320,135 260,110"
                  fill="#00C896"
                  opacity="0.12"
                />

                {/* Historical CH4 Actual Line */}
                <polyline
                  points="40,140 80,135 120,138 160,128 200,125 260,110"
                  stroke="#28B9C7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Projected CH4 Trend Line */}
                <polyline
                  points="260,110 320,115 380,102 440,90 480,80"
                  stroke="#00C896"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                <circle cx="260" cy="110" r="4" fill="#FFFFFF" />
                <circle cx="480" cy="80" r="4" fill="#00C896" />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-400 block">+24h Projected CH₄</span>
                <span className="text-xs font-bold text-white">0.31%</span>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-400 block">+48h Projected CH₄</span>
                <span className="text-xs font-bold text-[#00C896]">0.36%</span>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-400 block">+72h Projected CH₄</span>
                <span className="text-xs font-bold text-[#F5B51B]">0.42% (Watch)</span>
              </div>
            </div>
          </div>

          {/* Explainability Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[#111827] border border-white/10">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold font-mono text-white">EXPLAINABLE AI ENGINE</span>
                <span className="text-[10px] font-mono text-[#00C896]">CMR 2017 WEIGHTED</span>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Gas Telemetry (CH₄ &amp; CO Excursions)</span>
                    <span className="font-mono font-bold text-[#00C896]">35% Weight</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00C896] rounded-full w-[35%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Ventilation &amp; Air Velocity Index</span>
                    <span className="font-mono font-bold text-[#28B9C7]">25% Weight</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#28B9C7] rounded-full w-[25%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Ground Stability &amp; Seam Depth</span>
                    <span className="font-mono font-bold text-amber-400">20% Weight</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full w-[20%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Workforce Overtime &amp; Incident History</span>
                    <span className="font-mono font-bold text-slate-400">20% Weight</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 rounded-full w-[20%]" />
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-black/50 border border-white/5 text-[11px] text-slate-300 leading-relaxed font-mono">
                <strong className="text-white">Why this risk?</strong> Methane slope +0.002%/hr correlated with drop in return airway velocity to 1.8 m/s. Triggers proactive ventilation fan adjustment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6 — TRUST & AUDIT (SHA-256 LEDGER) ───────────────────── */}
      <section id="audit" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/30 uppercase tracking-widest">
            CRYPTOGRAPHIC TRANSPARENCY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            SHA-256 Tamper-Evident Audit Chain
          </h2>
          <p className="text-xs text-slate-400">
            Immutable block-chained audit entries protecting statutory shift logs, biometric attendance, and CAPA remediations from retrospective tampering.
          </p>
        </div>

        {/* Visual Blockchain */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              seq: "001",
              title: "Inspection Completed",
              actor: "DGMS Inspector",
              hash: "7d4b9b940905e94b2811a76d8b2e5a6064f51950d87a4192b02444c11438914b",
              prev: "GENESIS_BLOCK",
            },
            {
              seq: "002",
              title: "Gas Excursion Logged",
              actor: "Colliery Manager",
              hash: "c2e8a7199c0dfb6c6b3e71d4a89645719918fb5974e626e2e58410294e1fb59a",
              prev: "7d4b9b94...914b",
            },
            {
              seq: "003",
              title: "CAPA Notice Issued",
              actor: "Ministry Auditor",
              hash: "9bf421aa08c3e66014e7a2b95ef91104e43e792c3a598fb87019623e1b782980",
              prev: "c2e8a719...b59a",
            },
            {
              seq: "004",
              title: "Rectification Verified",
              actor: "DGMS Inspector",
              hash: "3a8f110bc876541298d01ef674a2b91873491028741029487192837461928374",
              prev: "9bf421aa...2980",
            },
          ].map((blk, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[#111827] border border-[#00C896]/30 hover:border-[#00C896] transition-all font-mono text-xs space-y-2 relative"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-2 border-b border-white/5">
                <span className="text-[#00C896] font-bold">BLOCK #{blk.seq}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED
                </span>
              </div>
              <div className="font-bold text-white text-xs">{blk.title}</div>
              <div className="text-[10px] text-slate-400">Actor: {blk.actor}</div>
              <div className="pt-2 border-t border-white/5">
                <span className="text-[9px] text-slate-500 block">SHA-256 HASH</span>
                <span className="text-[10px] text-slate-200 font-semibold break-all">
                  {blk.hash.substring(0, 24)}...
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/audit-ledger"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111827] hover:bg-[#151D2B] border border-white/10 hover:border-[#00C896]/40 text-xs font-bold text-slate-200 transition-all"
          >
            <span>Explore Live Forensic Audit Ledger</span>
            <ArrowRight className="w-4 h-4 text-[#00C896]" />
          </Link>
        </div>
      </section>

      {/* ── SECTION 7 — ROLE-BASED PLATFORM ─────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#080D16]/50">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/30 uppercase tracking-widest">
            FOUR-TIER HIERARCHY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            Built for Every Stakeholder
          </h2>
          <p className="text-xs text-slate-400">
            Dedicated consoles tailored to specific statutory authority and day-to-day operations.
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {roles.map((r, i) => (
            <button
              key={i}
              onClick={() => setActiveTabRole(i)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold font-display transition-all ${
                activeTabRole === i
                  ? "bg-[#00C896] text-[#050A12] shadow-lg shadow-[#00C896]/20"
                  : "bg-[#111827] text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>

        {/* Active Role Card */}
        <div className="max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-[#111827] border border-white/10 relative corner-ticks">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#00C896] uppercase tracking-wider">
                {roles[activeTabRole].badge}
              </span>
              <h3 className="text-2xl font-black text-white font-display mt-1">
                {roles[activeTabRole].title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {roles[activeTabRole].subtitle}
              </p>
            </div>
            <Link
              href={roles[activeTabRole].route}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#050A12] bg-[#00C896] hover:bg-[#08B98A] transition-all flex items-center gap-1.5 self-start md:self-auto shrink-0"
            >
              <span>Launch {roles[activeTabRole].title} Cockpit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-sm text-slate-300 mt-6 leading-relaxed">
            {roles[activeTabRole].desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {roles[activeTabRole].metrics.map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#080D16] border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">{m.label}</span>
                <span className="text-xl font-bold font-mono text-white mt-1 block">{m.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8 — PRICING & DEPLOYMENT TIERS ───────────────────────── */}
      <section id="pricing" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/30 uppercase tracking-widest">
            COMMERCIAL &amp; STATUTORY DEPLOYMENT TIERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            Colliery &amp; Enterprise Governance Plans
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Transparent statutory compliance, real-time IoT edge telemetry, and tamper-evident SHA-256 Merkle infrastructure tailored for Indian coal mining operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Single Colliery Pilot */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#111827] border border-white/10 flex flex-col justify-between relative corner-ticks hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Pilot / Sandbox
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                  SIH &amp; Sandbox
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">Single Colliery Pilot</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Engineered for single underground incline or open-cast pit statutory evaluation.
                </p>
              </div>

              <div className="pt-2 pb-4 border-b border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black font-mono text-white">₹45,000</span>
                  <span className="text-xs font-mono text-slate-400">/ colliery / month</span>
                </div>
                <div className="text-[10px] font-mono text-[#00C896] mt-1">
                  * Free sandbox evaluation available for SIH &amp; DGMS circles
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>1 Mine Site leasehold &amp; underground gallery map</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Real-time atmospheric telemetry (CH₄, CO, O₂, Airflow, Temp)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Automated DGMS Form-IV generation &amp; CMR 153/154 checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Biometric worker shift muster &amp; fatigue tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Offline-first IndexedDB PWA edge sync</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>30-day SHA-256 cryptographic audit logs</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <Link
                href="/login"
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs font-display flex items-center justify-center gap-2 border border-white/10 transition-all"
              >
                <span>Sign In to Pilot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Area Command (Featured) */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#151D2B] to-[#111827] border-2 border-[#00C896] flex flex-col justify-between relative corner-ticks shadow-2xl shadow-[#00C896]/15 hover:shadow-[#00C896]/25 transition-all">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#00C896] text-[#050A12] text-[10px] font-mono font-black uppercase tracking-wider shadow-md">
              RECOMMENDED FOR SUBSIDIARIES
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#00C896] uppercase tracking-wider">
                  Subsidiary Area
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00C896]/15 text-[#00C896] border border-[#00C896]/30">
                  Full AI Stack
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">Area Command Hub</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Multi-mine command center for Colliery Agents, Area Safety Officers, &amp; DGMS circles.
                </p>
              </div>

              <div className="pt-2 pb-4 border-b border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black font-mono text-[#00C896]">₹1,85,000</span>
                  <span className="text-xs font-mono text-slate-400">/ area / month</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  Covers up to 15 contiguous colliery inclines &amp; OCPs
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Up to 15 Collieries &amp; Multi-Seam Geometries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span><strong>72-Hour Predictive Risk Engine</strong> (IsolationForest AI)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>PostGIS Leasehold boundaries &amp; buffer-zone breach alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Closed-loop 6-stage CAPA violation remediation kanban</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Automated DGMS emergency SMS broadcasting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Continuous Merkle tree cryptographic integrity proof</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <Link
                href="/login"
                className="w-full py-3.5 rounded-xl bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] font-black text-xs font-display flex items-center justify-center gap-2 shadow-lg shadow-[#00C896]/30 transition-all hover:scale-[1.01]"
              >
                <span>Deploy Area Command</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Apex Ministry Enterprise */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#111827] border border-white/10 flex flex-col justify-between relative corner-ticks hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Sovereign / National
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4F9CFF]/15 text-[#4F9CFF] border border-[#4F9CFF]/30">
                  National DGMS
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">Apex Ministry Enterprise</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Pan-India multi-subsidiary governance and sovereign oversight for Ministry of Coal.
                </p>
              </div>

              <div className="pt-2 pb-4 border-b border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black font-mono text-white">Custom Allocation</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  Government budgetary sanction / PSU enterprise procurement
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Unlimited Pan-India Collieries across all 8 CIL/SCCL subsidiaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>National subsidiary compliance heatmap &amp; repeat violation matrix</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Sovereign SHA-256 Merkle chain with national state anchoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>Real-time IoT edge cluster sync across 348+ active mine leases</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>24/7 DGMS statutory tripwire monitoring with priority SLA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896] shrink-0 mt-0.5" />
                  <span>On-premise air-gapped or Sovereign Gov-Cloud deployment</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <Link
                href="/login"
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs font-display flex items-center justify-center gap-2 border border-white/10 transition-all"
              >
                <span>Contact Ministry Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9 — FINAL CTA ────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 coal-strata-bg opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/30 uppercase tracking-widest">
            MINISTRY OF COAL • SIH26024
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight">
            From Mine Data to <br />
            <span className="text-[#00C896]">Government Intelligence.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            Experience the next-generation digital command platform for India&apos;s coal mining safety, compliance, and regulatory governance.
          </p>

          <div className="pt-4 flex justify-center items-center">
            <Link
              href="/login"
              className="px-8 py-4 rounded-xl font-bold text-sm bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] shadow-2xl shadow-[#00C896]/40 flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Sign In to CoalDrishti AI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 md:px-12 border-t border-white/5 bg-[#050A12] text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C896]" />
            <span className="text-slate-300 font-bold">Ministry of Coal &bull; Government of India</span>
            <span>&bull; Smart India Hackathon SIH26024</span>
          </div>
          <div>
            DGMS &bull; Coal Mines Regulations 2017 &bull; Mines Act 1952 Compliance
          </div>
        </div>
      </footer>
    </div>
  );
}
