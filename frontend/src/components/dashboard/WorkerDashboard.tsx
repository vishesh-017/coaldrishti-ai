"use client";

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Clock,
  ShieldAlert,
  Wind,
  PhoneCall,
  Flame,
  CheckCircle2,
  AlertOctagon,
  HardHat,
  BookOpen,
  MapPin,
  AlertTriangle,
  Plus,
  Send,
  Camera,
  Layers,
  Sparkles,
  Check,
  Loader2,
  RefreshCw,
  Search,
  Radio,
  FileCheck,
  CalendarDays,
  X,
  Compass,
  ArrowRight,
  Activity,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";
import { WorkerIssueReport, WorkerIssueOut, WorkerLeave, WorkerLeaveRequest } from "@/lib/types/domain";
import { reportWorkerIssue, fetchMyWorkerIssues, submitWorkerLeave, fetchWorkerLeaves } from "@/lib/api/worker";
import { TechnicalPanel, CommandMetric, TelemetryCard } from "@/components/design-system";

interface WorkerDashboardProps {
  data: Record<string, any>;
  mineSiteName?: string;
}

const ISSUE_CATEGORIES = [
  {
    id: "VENTILATION_GAS",
    label: "Poor Ventilation / Gaseous Odors (CH₄/CO)",
    icon: Wind,
    color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    cmrRule: "CMR 2017 Reg 153 & 154",
  },
  {
    id: "ROOF_SUPPORT",
    label: "Loose Roof / Side Spalling / Strata Warning",
    icon: Layers,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    cmrRule: "CMR 2017 Reg 123 (SSR)",
  },
  {
    id: "EQUIPMENT_DEFECT",
    label: "Machine Brake / Cable Sheath / Conveyor Idler",
    icon: HardHat,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    cmrRule: "CMR 2017 Reg 130 & DGMS Tech Circ",
  },
  {
    id: "WATER_LOGGING",
    label: "Water Sump Inundation / Slurry Accumulation",
    icon: AlertOctagon,
    color: "text-teal-400 bg-teal-500/10 border-teal-500/30",
    cmrRule: "CMR 2017 Reg 145",
  },
  {
    id: "WELFARE",
    label: "Drinking Water / Illumination / PPE Shortage",
    icon: CheckCircle2,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    cmrRule: "Mines Act 1952 / Rule 29B",
  },
];

export function WorkerDashboard({ data, mineSiteName }: WorkerDashboardProps) {
  const { activeMineSiteId, activeMineName, userName } = useAuthStore();
  const [activePortalTab, setActivePortalTab] = useState<"HAZARDS" | "LEAVES">("HAZARDS");

  // Hazard Modal & Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [category, setCategory] = useState("VENTILATION_GAS");
  const [locationDesc, setLocationDesc] = useState("Level 3 Gallery 4 near Panel 7 Intake");
  const [description, setDescription] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");

  // Hazard Tracking List
  const [issues, setIssues] = useState<WorkerIssueOut[]>([]);
  const [loadingIssues, setLoadingIssues] = useState(true);

  // Leave Applications State
  const [leaves, setLeaves] = useState<WorkerLeave[]>([]);
  const [loadingLeaves, setLoadingLeaves] = useState(true);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [submittingLeave, setSubmittingLeave] = useState(false);
  const [leaveSuccessMsg, setLeaveSuccessMsg] = useState<string | null>(null);
  const [leaveErrorMsg, setLeaveErrorMsg] = useState<string | null>(null);

  // Leave Form State
  const [leaveType, setLeaveType] = useState<string>("EARNED_STATUTORY");
  const [leaveStartDate, setLeaveStartDate] = useState<string>("2026-09-15");
  const [leaveEndDate, setLeaveEndDate] = useState<string>("2026-09-18");
  const [leaveTotalDays, setLeaveTotalDays] = useState<number>(4);
  const [leaveReason, setLeaveReason] = useState<string>("");
  const [reliefWorkerId, setReliefWorkerId] = useState<string>("W-108");
  const [reliefWorkerName, setReliefWorkerName] = useState<string>("K. Shankaraiah (Mining Sirdar)");

  const profile = data.worker_profile || {
    worker_id: "W-104",
    worker_name: userName || "Rajesh Kumar Mandal",
    designation: "Certified Mining Sirdar / Gas Testing Overman",
    active_mine: mineSiteName || activeMineName || "Godavarikhani No. 11A Incline (GDK-11A) SCCL",
    assigned_zone: "Level 3 Return Airway (Panel 7)",
    shift: "Morning Shift (06:00 AM - 02:00 PM)",
    biometric_status: "VERIFIED_PRESENT",
    check_in_time: "06:00 AM",
    hours_logged_today: "5.5 hrs",
    overtime_hours_this_week: "1.5 hrs (Within statutory 8h limit)",
  };

  const gasLive = data.gas_telemetry_live || {
    ch4_methane_pct: 0.42,
    ch4_status: "SAFE",
    ch4_limit_pct: 1.25,
    co_carbon_monoxide_ppm: 8.5,
    co_status: "NORMAL",
    co_limit_ppm: 50.0,
    airflow_velocity_mps: 2.4,
    airflow_status: "ADEQUATE",
    ambient_temp_c: 27.8,
  };

  const sosProtocol = data.sos_protocol || {
    emergency_hotline: "Pit-Bottom Dial #101 / Control Room 07752-240101",
    refuge_chamber_location: "Refuge Chamber 3B (180m West of Panel 7 Intake)",
    evacuation_route: "Intake Airway (Green Beacon Marked Route) ➔ Shaft #2 Cage",
  };

  const loadIssues = async () => {
    setLoadingIssues(true);
    try {
      const list = await fetchMyWorkerIssues(activeMineSiteId);
      setIssues(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingIssues(false);
    }
  };

  const loadLeaves = async () => {
    setLoadingLeaves(true);
    try {
      const list = await fetchWorkerLeaves(activeMineSiteId, profile.worker_id);
      setLeaves(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLeaves(false);
    }
  };

  useEffect(() => {
    loadIssues();
    loadLeaves();
  }, [activeMineSiteId]);

  const handleSubmitLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) {
      setLeaveErrorMsg("Please state a reason for the leave application.");
      return;
    }

    setSubmittingLeave(true);
    setLeaveErrorMsg(null);
    setLeaveSuccessMsg(null);

    const payload: WorkerLeaveRequest = {
      mine_site_id: activeMineSiteId || "11111111-1111-4111-a111-111111111111",
      worker_id: profile.worker_id,
      worker_name: profile.worker_name,
      leave_type: leaveType,
      start_date: leaveStartDate,
      end_date: leaveEndDate,
      total_days: Number(leaveTotalDays) || 1,
      reason: leaveReason.trim(),
      relief_worker_id: reliefWorkerId,
      relief_worker_name: reliefWorkerName,
    };

    try {
      const created = await submitWorkerLeave(payload);
      setLeaveSuccessMsg("Statutory Leave Application submitted! Colliery Manager notified for shift relief verification.");
      setLeaveReason("");
      setLeaves((prev) => [created, ...prev]);

      setTimeout(() => {
        setLeaveModalOpen(false);
        setLeaveSuccessMsg(null);
      }, 2000);
    } catch (err: any) {
      setLeaveErrorMsg(err?.message || "Failed to submit leave application.");
    } finally {
      setSubmittingLeave(false);
    }
  };

  const handleSubmitIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setErrorMsg("Please provide a description of the hazard.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const payload: WorkerIssueReport = {
      mine_site_id: activeMineSiteId || "11111111-1111-4111-a111-111111111111",
      issue_category: category,
      location_description: locationDesc,
      description: description.trim(),
      urgency: isEmergency ? "EMERGENCY_STOP" : "HIGH",
      photo_evidence_url: photoUrl.trim() || undefined,
    };

    try {
      const created = await reportWorkerIssue(payload);
      setSuccessMsg(
        isEmergency
          ? "EMERGENCY STOP WARNING BROADCAST! Colliery Manager and Control Room notified immediately."
          : "Issue reported successfully. Logged to mine safety register & queued."
      );
      setDescription("");
      setIsEmergency(false);
      setPhotoUrl("");
      setIssues((prev) => [created, ...prev]);

      setTimeout(() => {
        setModalOpen(false);
        setSuccessMsg(null);
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to submit issue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── WORKER HERO: INDUSTRIAL OPERATIONS CONSOLE ───────────────────── */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 shadow-2xl relative overflow-hidden corner-ticks">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F5B51B]/15 border border-[#F5B51B]/40 text-[#F5B51B] flex items-center justify-center shrink-0 shadow-lg">
              <HardHat className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-[#F5B51B] bg-[#F5B51B]/15 px-2 py-0.5 rounded border border-[#F5B51B]/30">
                  {profile.worker_id}
                </span>
                <h1 className="text-xl md:text-2xl font-black text-white font-display">
                  {profile.worker_name}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#00C896] bg-[#00C896]/15 border border-[#00C896]/30 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  {profile.biometric_status.replace(/_/g, " ")}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                <span>{profile.designation}</span> &bull;{" "}
                <span className="text-white font-bold">{profile.active_mine}</span>
              </p>
            </div>
          </div>

          {/* Operational Shift & Hazard Emergency Action */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-[#080D16] border border-white/5 font-mono text-right">
              <div className="text-[9px] uppercase text-slate-400">Shift Allocation</div>
              <div className="text-xs font-bold text-white mt-0.5">{profile.shift}</div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#080D16] border border-white/5 font-mono text-right">
              <div className="text-[9px] uppercase text-slate-400">Hours Logged</div>
              <div className="text-xs font-bold text-[#F5B51B] mt-0.5">{profile.hours_logged_today}</div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#FF5C68] hover:bg-rose-500 text-white text-xs font-bold font-display shadow-lg shadow-rose-950 flex items-center gap-2 transition-all hover:scale-105"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>REPORT PIT HAZARD</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── SAFETY STATUS: 4 LARGE INDUSTRIAL TELEMETRY CARDS ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TelemetryCard
          label="Methane Concentration"
          value={gasLive.ch4_methane_pct}
          unit="%"
          sensorId="SEN-UG-CH4-01"
          statutoryLimit="≤ 0.75% Return"
          cmrReference="CMR 2017 Reg 153"
          status={gasLive.ch4_methane_pct >= 0.75 ? "CRITICAL" : "NORMAL"}
          icon={Flame}
          rateOfRise="+0.001 %/h"
        />

        <TelemetryCard
          label="Carbon Monoxide"
          value={gasLive.co_carbon_monoxide_ppm}
          unit="ppm"
          sensorId="SEN-UG-CO-02"
          statutoryLimit="≤ 50.0 ppm"
          cmrReference="CMR Spontaneous Limit"
          status={gasLive.co_carbon_monoxide_ppm >= 25 ? "WARNING" : "NORMAL"}
          icon={ShieldAlert}
          rateOfRise="+0.4 ppm/h"
        />

        <TelemetryCard
          label="Airflow Velocity"
          value={gasLive.airflow_velocity_mps}
          unit="m/s"
          sensorId="SEN-UG-VENT-03"
          statutoryLimit="0.5 – 4.0 m/s"
          cmrReference="CMR 2017 Reg 154"
          status="NORMAL"
          icon={Wind}
          rateOfRise="Stable"
        />

        <div className="p-4 rounded-xl bg-[#111827] border border-white/10 flex flex-col justify-between font-mono">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/5">
            <span className="font-bold text-white text-xs">Working Zone Telemetry</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              ACTIVE SEAM
            </span>
          </div>
          <div className="my-2">
            <div className="text-xs font-bold text-slate-200">{profile.assigned_zone}</div>
            <div className="text-2xl font-black text-white mt-1">{gasLive.ambient_temp_c}°C</div>
          </div>
          <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400 flex justify-between">
            <span>Air Temp Normal</span>
            <span className="text-[#00C896]">Max: 32.5°C</span>
          </div>
        </div>
      </div>

      {/* ── UNDERGROUND GALLERY MAP & REFUGE CHAMBERS ──────────────────────── */}
      <TechnicalPanel
        title="Underground Gallery Incline Map & Safety Stations"
        badge="GALLERY 4B • PANEL 7 INCLINE"
        cornerTicks
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Schematic SVG Map */}
          <div className="lg:col-span-8 bg-[#080D16] rounded-xl p-3 border border-white/5 relative overflow-hidden">
            <svg className="w-full h-56" viewBox="0 0 500 220" fill="none">
              {/* Mine galleries */}
              <rect x="20" y="20" width="460" height="180" rx="8" fill="#050A12" stroke="#202936" />
              
              {/* Tunnels */}
              <path d="M 60 40 L 60 180" stroke="#00C896" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
              <path d="M 60 100 L 440 100" stroke="#00C896" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
              <path d="M 240 100 L 240 180" stroke="#28B9C7" strokeWidth="5" strokeLinecap="round" />
              <path d="M 440 40 L 440 180" stroke="#28B9C7" strokeWidth="5" strokeLinecap="round" />

              {/* Refuge Chamber 3B */}
              <rect x="220" y="160" width="40" height="30" rx="4" fill="#00C896" />
              <text x="225" y="178" fill="#050A12" fontSize="8" fontWeight="bold" fontFamily="monospace">REFUGE</text>
              <text x="228" y="186" fill="#050A12" fontSize="7" fontWeight="bold" fontFamily="monospace">3B</text>

              {/* Worker Current Location Pin */}
              <circle cx="160" cy="100" r="7" fill="#F5B51B" className="animate-ping" />
              <circle cx="160" cy="100" r="5" fill="#F5B51B" />
              <text x="135" y="85" fill="#F5B51B" fontSize="9" fontWeight="bold" fontFamily="monospace">YOU (W-104)</text>

              {/* Face Station */}
              <rect x="420" y="85" width="30" height="30" rx="4" fill="#FF5C68" opacity="0.8" />
              <text x="424" y="103" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="monospace">FACE</text>

              {/* Incline Mouth */}
              <circle cx="60" cy="40" r="8" fill="#28B9C7" />
              <text x="75" y="44" fill="#94A3B8" fontSize="9" fontFamily="monospace">SHAFT #2 CAGE (SURFACE)</text>
            </svg>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-mono text-slate-400">
              Escort Route: Follow Green Reflective Beacons to Shaft #2
            </div>
          </div>

          {/* SOS Protocols */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#080D16] border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Pit-Bottom SOS Hotline</span>
              <span className="text-white font-bold text-xs mt-0.5 block">{sosProtocol.emergency_hotline}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#080D16] border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Nearest Refuge Chamber</span>
              <span className="text-[#00C896] font-bold text-xs mt-0.5 block">{sosProtocol.refuge_chamber_location}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#080D16] border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Statutory Evacuation Route</span>
              <span className="text-slate-300 text-xs mt-0.5 block">{sosProtocol.evacuation_route}</span>
            </div>
          </div>
        </div>
      </TechnicalPanel>

      {/* ── PORTAL TABS: HAZARDS / GRIEVANCES VS STATUTORY LEAVES ─────────── */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActivePortalTab("HAZARDS")}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-display transition-all flex items-center gap-2 ${
            activePortalTab === "HAZARDS"
              ? "bg-[#00C896] text-[#050A12] shadow-md shadow-[#00C896]/20"
              : "bg-[#111827] text-slate-400 hover:text-white border border-white/5"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Reported Pit Hazards ({issues.length})</span>
        </button>

        <button
          onClick={() => setActivePortalTab("LEAVES")}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-display transition-all flex items-center gap-2 ${
            activePortalTab === "LEAVES"
              ? "bg-[#00C896] text-[#050A12] shadow-md shadow-[#00C896]/20"
              : "bg-[#111827] text-slate-400 hover:text-white border border-white/5"
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Statutory Leave &amp; Shift Relief ({leaves.length})</span>
        </button>
      </div>

      {/* TAB 1: HAZARDS */}
      {activePortalTab === "HAZARDS" && (
        <TechnicalPanel
          title="On-Ground Pit Hazards &amp; Grievance Log"
          badge="LIVE DISPATCH"
          actionSlot={
            <div className="flex items-center gap-2">
              <button
                onClick={loadIssues}
                disabled={loadingIssues}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${loadingIssues ? "animate-spin text-[#00C896]" : ""}`} />
                <span>Sync</span>
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Hazard</span>
              </button>
            </div>
          }
        >
          {loadingIssues ? (
            <div className="space-y-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 rounded-xl bg-[#080D16] animate-pulse" />
              ))}
            </div>
          ) : issues.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-slate-400">
              No active hazards logged for this shift. All stations report normal.
            </div>
          ) : (
            <div className="space-y-2.5">
              {issues.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#080D16] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{item.issue_category}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                          item.urgency === "EMERGENCY_STOP"
                            ? "bg-rose-500/20 text-[#FF5C68] border border-rose-500/40"
                            : "bg-amber-500/20 text-[#F5B51B] border border-amber-500/40"
                        }`}
                      >
                        {item.urgency}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs font-sans">{item.description}</p>
                    <div className="text-[10px] text-slate-500">Location: {item.location_description}</div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#00C896]">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TechnicalPanel>
      )}

      {/* TAB 2: STATUTORY LEAVE */}
      {activePortalTab === "LEAVES" && (
        <TechnicalPanel
          title="Statutory Leave Register (Mines Rules 1955)"
          badge="SHIFT RELIEF MANDATORY"
          actionSlot={
            <button
              onClick={() => setLeaveModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Apply Leave</span>
            </button>
          }
        >
          {loadingLeaves ? (
            <div className="space-y-2">
              {[1, 2].map((n) => (
                <div key={n} className="h-16 rounded-xl bg-[#080D16] animate-pulse" />
              ))}
            </div>
          ) : leaves.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-slate-400">
              No leave applications recorded for this period.
            </div>
          ) : (
            <div className="space-y-2.5">
              {leaves.map((l) => (
                <div
                  key={l.id}
                  className="p-3.5 rounded-xl bg-[#080D16] border border-white/5 flex items-center justify-between text-xs font-mono"
                >
                  <div>
                    <div className="font-bold text-white text-xs">{l.leave_type.replace(/_/g, " ")}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {l.start_date} to {l.end_date} ({l.total_days} Days) &bull; Relief: {l.relief_worker_name}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-[#00C896] border border-emerald-500/20">
                    {l.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </TechnicalPanel>
      )}

      {/* ── HAZARD REPORTING MODAL ────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl corner-ticks">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#FF5C68]" />
                <h3 className="font-display font-bold text-white text-sm">
                  Log Underground Pit Hazard
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitIssue} className="space-y-3 font-mono text-xs">
              {errorMsg && <div className="p-2 rounded bg-rose-500/20 text-rose-300">{errorMsg}</div>}
              {successMsg && <div className="p-2 rounded bg-emerald-500/20 text-emerald-300">{successMsg}</div>}

              <div>
                <label className="text-slate-400 block mb-1">Hazard Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white"
                >
                  {ISSUE_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label} ({c.cmrRule})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Location / Gallery</label>
                <input
                  type="text"
                  value={locationDesc}
                  onChange={(e) => setLocationDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Hazard Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe observed cracks, gas odor, cable spark, or support failure..."
                  className="w-full p-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#FF5C68]/10 border border-[#FF5C68]/30 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="emergency-halt"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="w-4 h-4 text-[#FF5C68] rounded bg-[#080D16]"
                />
                <label htmlFor="emergency-halt" className="text-xs text-white cursor-pointer font-bold">
                  Declare Immediate Pit Halt / Emergency Stop
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#FF5C68] hover:bg-rose-500 text-white font-bold flex items-center gap-1.5"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Transmit Hazard</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── STATUTORY LEAVE MODAL ────────────────────────────────────────── */}
      {leaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl corner-ticks">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-[#00C896]" />
                <h3 className="font-display font-bold text-white text-sm">
                  Statutory Leave Application
                </h3>
              </div>
              <button onClick={() => setLeaveModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitLeave} className="space-y-3 font-mono text-xs">
              {leaveErrorMsg && <div className="p-2 rounded bg-rose-500/20 text-rose-300">{leaveErrorMsg}</div>}
              {leaveSuccessMsg && <div className="p-2 rounded bg-emerald-500/20 text-emerald-300">{leaveSuccessMsg}</div>}

              <div>
                <label className="text-slate-400 block mb-1">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white"
                >
                  <option value="EARNED_STATUTORY">Earned Statutory Leave (Mines Rules 1955)</option>
                  <option value="CASUAL_EMERGENCY">Casual Emergency Leave</option>
                  <option value="MEDICAL_DGMS">Statutory Medical / Injury Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={leaveStartDate}
                    onChange={(e) => setLeaveStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">End Date</label>
                  <input
                    type="date"
                    value={leaveEndDate}
                    onChange={(e) => setLeaveEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Designated Shift Relief Worker</label>
                <input
                  type="text"
                  value={reliefWorkerName}
                  onChange={(e) => setReliefWorkerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Reason for Leave</label>
                <textarea
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  rows={2}
                  placeholder="Medical, family exigency, or statutory rest cycle..."
                  className="w-full p-2.5 rounded-xl bg-[#080D16] border border-white/10 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setLeaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingLeave}
                  className="px-5 py-2 rounded-xl bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] font-bold flex items-center gap-1.5"
                >
                  {submittingLeave ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
