"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/auth-store";
import { useTenantStore } from "@/lib/store/tenant-store";
import {
  fetchAtmosphericLogs,
  fetchWorkerMusterLogs,
  fetchMineCastLogs,
  attemptAtmosphericMutation,
  AtmosphericLogItem,
  WorkerMusterLogItem,
  MineCastLogItem,
} from "@/lib/api/logs";
import {
  Database,
  Flame,
  Users,
  Pickaxe,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  RefreshCw,
  Search,
  Lock,
  Wind,
  Truck,
  CheckCircle2,
  XCircle,
  Fingerprint,
  X,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { TechnicalPanel, CommandMetric, StatutoryBadge } from "@/components/design-system";

type TabType = "atmospheric" | "workers" | "mine_casts";

export default function DataLogsPage() {
  const [mounted, setMounted] = useState(false);
  const { activeMineSiteId, activeMineName } = useAuthStore();
  const { selectedMine, selectedMineId } = useTenantStore();
  const [activeTab, setActiveTab] = useState<TabType>("atmospheric");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLogForTamper, setSelectedLogForTamper] = useState<AtmosphericLogItem | null>(null);
  const [editValue, setEditValue] = useState<string>("18.0");
  const [isTampering, setIsTampering] = useState(false);
  const [tamperResult, setTamperResult] = useState<any>(null);

  const effectiveMineId = selectedMineId || activeMineSiteId;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Queries
  const atmosphericQuery = useQuery({
    queryKey: ["logs-atmospheric", effectiveMineId],
    queryFn: () => fetchAtmosphericLogs(effectiveMineId),
    refetchInterval: 30000,
  });

  const workersQuery = useQuery({
    queryKey: ["logs-workers", effectiveMineId],
    queryFn: () => fetchWorkerMusterLogs(effectiveMineId),
    refetchInterval: 30000,
  });

  const castsQuery = useQuery({
    queryKey: ["logs-mine-casts", effectiveMineId],
    queryFn: () => fetchMineCastLogs(effectiveMineId),
    refetchInterval: 30000,
  });

  const collieryTitle = mounted
    ? selectedMine?.name || activeMineName || "Godavarikhani No. 11A Incline (SCCL)"
    : "Godavarikhani No. 11A Incline (SCCL)";

  const handleTamperAttempt = async () => {
    if (!selectedLogForTamper) return;
    setIsTampering(true);
    setTamperResult(null);

    try {
      const res = await attemptAtmosphericMutation(
        selectedLogForTamper.id,
        "co_ppm",
        editValue,
        effectiveMineId
      );
      setTamperResult(res.error || res.data);
    } catch (err: any) {
      setTamperResult({ message: err.message || "Mutation rejected by statutory immutable guard (HTTP 403 Forbidden)." });
    } finally {
      setIsTampering(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 relative overflow-hidden shadow-2xl corner-ticks">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#00C896]/10 border border-[#00C896]/30 text-[10px] font-mono text-[#00C896] uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5" />
              IMMUTABLE STATUTORY VAULT &bull; CMR 2017 REGULATION 153
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">
              Colliery Shift Data Logs
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Raw time-series telemetry, biometric muster &amp; extraction logs for{" "}
              <strong className="text-[#00C896] font-mono">{collieryTitle}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                atmosphericQuery.refetch();
                workersQuery.refetch();
                castsQuery.refetch();
              }}
              className="px-3.5 py-2 rounded-xl bg-[#080D16] hover:bg-black/50 border border-white/10 text-slate-300 text-xs font-mono font-bold flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#00C896]" /> Refresh
            </button>
            <Link
              href="/audit-ledger"
              className="px-4 py-2 rounded-xl bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] text-xs font-bold font-display flex items-center gap-2 shadow-lg shadow-[#00C896]/20 transition-all"
            >
              <ShieldCheck className="w-4 h-4" /> Audit Ledger
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI OVERVIEW ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CommandMetric
          label="Telemetry Stream Baseline"
          value={`${atmosphericQuery.data?.length ?? 6} Stations`}
          subtext="100% Cryptographic Intact"
          icon={Flame}
          status="normal"
        />
        <CommandMetric
          label="Underground Shift Muster"
          value={`${workersQuery.data?.length ?? 6} Crew`}
          subtext="Biometric RFID & Overtime Monitored"
          icon={Users}
          status="normal"
        />
        <CommandMetric
          label="Daily Extraction Dispatched"
          value="8,990 MT"
          subtext="5 Benches Operational"
          icon={Pickaxe}
          status="info"
        />
      </div>

      {/* ── TRIPLE TABS NAVIGATION & SEARCH ───────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[#080D16] border border-white/10 max-w-fit">
          <button
            onClick={() => setActiveTab("atmospheric")}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-display transition-all flex items-center gap-2 ${
              activeTab === "atmospheric"
                ? "bg-[#00C896] text-[#050A12] shadow-md shadow-[#00C896]/20 font-extrabold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Tab 1: Atmospheric Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab("workers")}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-display transition-all flex items-center gap-2 ${
              activeTab === "workers"
                ? "bg-[#28B9C7] text-[#050A12] shadow-md shadow-[#28B9C7]/20 font-extrabold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Tab 2: Worker Muster</span>
          </button>

          <button
            onClick={() => setActiveTab("mine_casts")}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-display transition-all flex items-center gap-2 ${
              activeTab === "mine_casts"
                ? "bg-[#F5B51B] text-[#050A12] shadow-md shadow-[#F5B51B]/20 font-extrabold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Pickaxe className="w-3.5 h-3.5" />
            <span>Tab 3: Mine Extraction Casts</span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search records, stations, hashes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#080D16] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:border-[#00C896] font-mono"
          />
        </div>
      </div>

      {/* ── TAB 1: ATMOSPHERIC CONFIGURATION ──────────────────────────────── */}
      {activeTab === "atmospheric" && (
        <TechnicalPanel
          title="Continuous Underground Gas Sensor Readings (CMR 2017 Reg 153)"
          badge="AUTO-STREAMED TELEMETRY"
          cornerTicks
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#080D16] text-slate-400 uppercase text-[10px] border-b border-white/5">
                <tr>
                  <th className="p-3">Station / Location</th>
                  <th className="p-3">CH₄ (Methane)</th>
                  <th className="p-3">CO (PPM)</th>
                  <th className="p-3">O₂ (%)</th>
                  <th className="p-3">Air Velocity</th>
                  <th className="p-3">Air Temp</th>
                  <th className="p-3">SHA-256 Fingerprint</th>
                  <th className="p-3">Statutory Status</th>
                  <th className="p-3 text-right">Tamper Test</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {(atmosphericQuery.data || []).map((row) => (
                  <tr key={row.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">
                      <div>{row.station_code}</div>
                      <div className="text-[10px] text-slate-500">{row.location_name}</div>
                    </td>
                    <td className="p-3">
                      <span className={row.ch4_pct >= 0.75 ? "text-[#FF5C68] font-bold" : "text-[#00C896]"}>
                        {row.ch4_pct}%
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={row.co_ppm >= 25 ? "text-[#F5B51B] font-bold" : "text-white"}>
                        {row.co_ppm} ppm
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">{row.o2_pct}%</td>
                    <td className="p-3 text-[#28B9C7]">{row.velocity_ms} m/s</td>
                    <td className="p-3 text-slate-300">{row.temp_c}°C</td>
                    <td className="p-3 text-slate-400 text-[10px]">
                      <span className="font-mono bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                        {row.record_hash?.substring(0, 12)}...
                      </span>
                    </td>
                    <td className="p-3">
                      <StatutoryBadge
                        status={
                          row.status === "STATUTORY_BREACH"
                            ? "CRITICAL"
                            : row.status === "EXCURSION_WARNING"
                            ? "ATTENTION"
                            : "COMPLIANT"
                        }
                        label={row.status}
                      />
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedLogForTamper(row);
                          setTamperResult(null);
                        }}
                        className="px-2.5 py-1 rounded bg-[#FF5C68]/15 hover:bg-[#FF5C68]/25 text-[#FF5C68] border border-[#FF5C68]/30 text-[10px] font-bold transition-all"
                      >
                        Edit (Test 403)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TechnicalPanel>
      )}

      {/* ── TAB 2: WORKER MUSTER ─────────────────────────────────────────── */}
      {activeTab === "workers" && (
        <TechnicalPanel
          title="Underground Worker Biometric Shift Muster & Gas Exposure"
          badge="MINES ACT 1952"
          cornerTicks
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#080D16] text-slate-400 uppercase text-[10px] border-b border-white/5">
                <tr>
                  <th className="p-3">Worker ID &amp; Name</th>
                  <th className="p-3">Shift</th>
                  <th className="p-3">Incline Station</th>
                  <th className="p-3">Check-in Time</th>
                  <th className="p-3">Hours Logged</th>
                  <th className="p-3">Gas Exposure</th>
                  <th className="p-3">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {(workersQuery.data || []).map((w) => (
                  <tr key={w.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">
                      <div>{w.worker_name}</div>
                      <div className="text-[10px] text-slate-400">{w.worker_id} &bull; {w.designation}</div>
                    </td>
                    <td className="p-3 text-slate-300">{w.shift}</td>
                    <td className="p-3 text-slate-400">{w.station_id}</td>
                    <td className="p-3 text-slate-300">
                      {w.check_in_time ? new Date(w.check_in_time).toLocaleTimeString() : "-"}
                    </td>
                    <td className="p-3">
                      <span className={w.duration_hours > 8.0 ? "text-[#FF5C68] font-bold" : "text-white"}>
                        {w.duration_hours} hrs
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">{w.gas_exposure_ppm} ppm</td>
                    <td className="p-3">
                      <StatutoryBadge
                        status={w.is_overtime ? "ATTENTION" : "COMPLIANT"}
                        label={w.is_overtime ? "OVERTIME WARNING" : "NORMAL SHIFT"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TechnicalPanel>
      )}

      {/* ── TAB 3: MINE EXTRACTION CASTS ─────────────────────────────────── */}
      {activeTab === "mine_casts" && (
        <TechnicalPanel
          title="Opencast Bench Excavation & Dumper Dispatch Register"
          badge="PRODUCTION CLEARANCE"
          cornerTicks
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#080D16] text-slate-400 uppercase text-[10px] border-b border-white/5">
                <tr>
                  <th className="p-3">Bench ID &amp; Seam</th>
                  <th className="p-3">Excavation (MT)</th>
                  <th className="p-3">Target Quota %</th>
                  <th className="p-3">Dumper Trips</th>
                  <th className="p-3">Explosives (ANFO)</th>
                  <th className="p-3">Blasting Clearance</th>
                  <th className="p-3">SHA-256 Seal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {(castsQuery.data || []).map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">
                      <div>{c.bench_id}</div>
                      <div className="text-[10px] text-slate-500">{c.bench_name}</div>
                    </td>
                    <td className="p-3 font-bold text-[#00C896]">{c.extraction_tonnage} MT</td>
                    <td className="p-3 text-white">{c.quota_achievement_pct}%</td>
                    <td className="p-3 text-slate-300">{c.dumper_trips_count} trips</td>
                    <td className="p-3 text-slate-300">{c.explosives_used_kg} kg</td>
                    <td className="p-3">
                      <StatutoryBadge
                        status={c.blasting_clearance_status === "CLEARED" ? "COMPLIANT" : "ATTENTION"}
                        label={c.blasting_clearance_status}
                      />
                    </td>
                    <td className="p-3 text-slate-400 text-[10px]">
                      <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                        {c.record_hash?.substring(0, 10)}...
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TechnicalPanel>
      )}

      {/* ── TAMPER ATTEMPT MODAL (DEMONSTRATING IMMUTABILITY & 403) ───────── */}
      {selectedLogForTamper && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl corner-ticks">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#FF5C68]" />
                <h3 className="font-display font-bold text-white text-sm">
                  Test Statutory Record Immutability
                </h3>
              </div>
              <button
                onClick={() => setSelectedLogForTamper(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Attempting to retrospectively alter committed atmospheric records simulates a fraudulent database attack. The system will reject the update with <strong>HTTP 403 Forbidden</strong> and log an emergency tamper alert.
            </p>

            <div className="p-3 rounded-xl bg-[#080D16] border border-white/5 font-mono text-xs space-y-1.5">
              <div className="text-slate-400">Station: {selectedLogForTamper.station_code}</div>
              <div className="text-slate-400">Current CO: <strong className="text-white">{selectedLogForTamper.co_ppm} ppm</strong></div>
              <div className="text-slate-400">Hash: <span className="text-[#00C896]">{selectedLogForTamper.record_hash?.substring(0, 20)}...</span></div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Falsified Value to Inject (ppm):
              </label>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white font-mono text-xs focus:border-[#FF5C68]"
              />
            </div>

            {tamperResult && (
              <div className="p-3 rounded-xl bg-[#FF5C68]/15 border border-[#FF5C68]/30 text-[#FF5C68] font-mono text-xs">
                {typeof tamperResult === "string" ? tamperResult : JSON.stringify(tamperResult)}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedLogForTamper(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono"
              >
                Close
              </button>
              <button
                onClick={handleTamperAttempt}
                disabled={isTampering}
                className="px-4 py-2 rounded-xl bg-[#FF5C68] hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <span>{isTampering ? "Executing..." : "Attempt Mutation"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
