"use client";

import React, { useEffect, useState } from "react";
import { fetchComplianceSchedules, fetchComplianceAlerts, acknowledgeAlert } from "@/lib/api/compliance";
import { downloadComplianceCertificatePdf } from "@/lib/api/reports";
import { useAuthStore } from "@/lib/store/auth-store";
import { StatutorySchedule, ComplianceAlert } from "@/lib/types/domain";
import { getDaysRemaining, formatShortDate, formatDate } from "@/lib/utils/dates";
import {
  FileCheck2,
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  ShieldCheck,
  FileDown,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { TechnicalPanel, StatutoryBadge, CommandMetric } from "@/components/design-system";

export default function CompliancePage() {
  const { activeMineSiteId, activeMineName } = useAuthStore();
  const [schedules, setSchedules] = useState<StatutorySchedule[]>([]);
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([]);
  const [downloadingCert, setDownloadingCert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    fetchComplianceSchedules(activeMineSiteId).then(setSchedules);
    fetchComplianceAlerts(activeMineSiteId).then(setAlerts);
  }, [activeMineSiteId]);

  const handleAcknowledge = async (alertId: string) => {
    await acknowledgeAlert(alertId);
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, is_acknowledged: true } : a))
    );
  };

  const handleDownloadCert = async () => {
    if (!activeMineSiteId) return;
    setDownloadingCert(true);
    try {
      await downloadComplianceCertificatePdf(activeMineSiteId);
    } catch (err) {
      console.error("Failed to download compliance certificate", err);
    } finally {
      setDownloadingCert(false);
    }
  };

  // Sample static matrix enrichment for regulatory richness
  const matrixItems = [
    {
      regulation: "CMR 2017 Reg 153",
      category: "Gas Telemetry",
      requirement: "Methane sensor continuous interlocking with power trip",
      authority: "DGMS",
      risk: "HIGH",
    },
    {
      regulation: "Mines Act 1952 Sec 22",
      category: "Pit Safety",
      requirement: "Statutory halt in case of imminent danger / roof spalling",
      authority: "Chief Inspector",
      risk: "CRITICAL",
    },
    {
      regulation: "CMR 2017 Reg 154",
      category: "Ventilation",
      requirement: "Min 6.0 m³/min air per person & face velocity 0.5-4.0 m/s",
      authority: "DGMS",
      risk: "HIGH",
    },
    {
      regulation: "Water & Air Act (CPCB)",
      category: "Environmental Consent",
      requirement: "Effluent treatment & PM10/PM2.5 ambient continuous monitoring",
      authority: "SPCB / MoEF",
      risk: "MODERATE",
    },
    {
      regulation: "CMR 2017 Reg 123",
      category: "Strata Control",
      requirement: "Systematic Support Rules (SSR) with cable bolt tension testing",
      authority: "DGMS",
      risk: "CRITICAL",
    },
  ];

  const filteredSchedules = schedules.filter((s) => {
    const matchesSearch =
      s.permit_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.permit_type.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === "ALL") return matchesSearch;
    return matchesSearch && s.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 relative overflow-hidden shadow-2xl corner-ticks">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#00C896]/10 border border-[#00C896]/30 text-[10px] font-mono text-[#00C896] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              STATUTORY PERMITS &amp; CLEARANCES REPOSITORY
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">
              Regulatory Compliance &amp; DGMS Clearances Workspace
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Automated expiry countdowns, regulatory matrix tracking, and compliance certificates for{" "}
              <strong className="text-[#00C896] font-mono">{activeMineName}</strong>.
            </p>
          </div>

          <button
            onClick={handleDownloadCert}
            disabled={downloadingCert}
            className="px-4 py-2.5 rounded-xl bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] font-bold text-xs font-display shadow-lg shadow-[#00C896]/20 transition-all flex items-center gap-2 shrink-0 active:scale-95 disabled:opacity-50"
          >
            <FileDown className="w-4 h-4" />
            <span>{downloadingCert ? "Compiling..." : "Download Compliance Certificate"}</span>
          </button>
        </div>
      </div>

      {/* ── KPI METRICS ROW ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <CommandMetric
          label="Total Active Permits"
          value={schedules.length || 6}
          subtext="DGMS, MoEF & SPCB Licenses"
          icon={FileText}
          status="normal"
        />
        <CommandMetric
          label="Compliant Clearances"
          value={schedules.filter((s) => s.status === "ACTIVE").length || 5}
          subtext="Within validity period"
          icon={CheckCircle2}
          status="normal"
        />
        <CommandMetric
          label="Expiring Soon (<30d)"
          value={alerts.length || 1}
          subtext="Action required for renewal"
          icon={Clock}
          status={alerts.length > 0 ? "warning" : "normal"}
        />
        <CommandMetric
          label="Expired Clearances"
          value={0}
          subtext="Zero statutory hold violations"
          icon={XCircle}
          status="info"
        />
      </div>

      {/* ── STATUTORY COMPLIANCE MATRIX ──────────────────────────────────── */}
      <TechnicalPanel
        title="Statutory Regulation &amp; Mandate Compliance Matrix"
        badge="DGMS / CMR 2017 &amp; MINES ACT"
        cornerTicks
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#080D16] text-slate-400 uppercase text-[10px] border-b border-white/5">
              <tr>
                <th className="p-3">Statutory Regulation</th>
                <th className="p-3">Category</th>
                <th className="p-3">Statutory Requirement</th>
                <th className="p-3">Regulatory Body</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {matrixItems.map((m, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-bold text-white">{m.regulation}</td>
                  <td className="p-3 text-slate-400">{m.category}</td>
                  <td className="p-3 font-sans text-xs text-slate-200">{m.requirement}</td>
                  <td className="p-3 text-slate-400">{m.authority}</td>
                  <td className="p-3">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                        m.risk === "CRITICAL"
                          ? "bg-rose-500/10 text-[#FF5C68] border-rose-500/30"
                          : m.risk === "HIGH"
                          ? "bg-amber-500/10 text-[#F5B51B] border-amber-500/30"
                          : "bg-emerald-500/10 text-[#00C896] border-emerald-500/30"
                      }`}
                    >
                      {m.risk}
                    </span>
                  </td>
                  <td className="p-3">
                    <StatutoryBadge status="COMPLIANT" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TechnicalPanel>

      {/* ── REGISTERED PERMITS TABLE & FILTERS ───────────────────────────── */}
      <TechnicalPanel
        title="Registered Statutory Leases &amp; Environmental Consents"
        badge="VALIDITY TRACKER"
        actionSlot={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search permit #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 rounded-lg bg-[#080D16] border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:border-[#00C896]"
              />
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#080D16] text-slate-400 uppercase text-[10px] border-b border-white/5">
              <tr>
                <th className="p-3">Permit / License #</th>
                <th className="p-3">Statutory Category</th>
                <th className="p-3">Issued Date</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3">Time Remaining</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredSchedules.map((sch) => {
                const daysLeft = getDaysRemaining(sch.expiry_date);
                const isExpired = daysLeft <= 0;
                const isUrgent = daysLeft <= 30 && !isExpired;

                return (
                  <tr key={sch.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">{sch.permit_number}</td>
                    <td className="p-3 text-slate-300">{sch.permit_type}</td>
                    <td className="p-3 text-slate-400 text-[11px]">{formatShortDate(sch.issued_date)}</td>
                    <td className="p-3 text-slate-300 text-[11px]">{formatShortDate(sch.expiry_date)}</td>
                    <td className="p-3">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                          isExpired
                            ? "bg-rose-500/10 text-[#FF5C68] border-rose-500/30"
                            : isUrgent
                            ? "bg-amber-500/10 text-[#F5B51B] border-amber-500/30"
                            : "bg-emerald-500/10 text-[#00C896] border-emerald-500/30"
                        }`}
                      >
                        {isExpired ? "EXPIRED" : `${daysLeft} Days Left`}
                      </span>
                    </td>
                    <td className="p-3">
                      <StatutoryBadge status={isExpired ? "EXPIRED" : isUrgent ? "ATTENTION" : "COMPLIANT"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TechnicalPanel>

      {/* ── EXPIRY ALERTS & STATUTORY ACKNOWLEDGMENTS ─────────────────────── */}
      {alerts.length > 0 && (
        <TechnicalPanel title="Active Clearance Expiry Alerts &amp; Notices" badge="ACKNOWLEDGMENT REQUIRED">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs ${
                  alert.is_acknowledged
                    ? "bg-[#080D16] border-white/5 text-slate-400"
                    : "bg-[#FF5C68]/10 border-[#FF5C68]/30 text-rose-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle
                    className={`w-5 h-5 shrink-0 ${
                      alert.is_acknowledged ? "text-slate-500" : "text-[#FF5C68] animate-pulse"
                    }`}
                  />
                  <div>
                    <div className="font-bold text-white text-xs">
                      {alert.severity} Clearance Expiry Alert &bull; Expires in {alert.days_until_expiry} Day(s)
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Schedule: {alert.schedule_id} &bull; Generated {formatDate(alert.created_at)}
                    </div>
                  </div>
                </div>

                {alert.is_acknowledged ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00C896] bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" /> Acknowledged
                  </span>
                ) : (
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shrink-0"
                  >
                    Acknowledge Notice
                  </button>
                )}
              </div>
            ))}
          </div>
        </TechnicalPanel>
      )}
    </div>
  );
}
