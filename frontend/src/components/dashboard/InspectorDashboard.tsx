"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  MapPin,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Loader2,
  FileCheck2,
  ArrowRight,
  Plus,
  ShieldAlert,
} from "lucide-react";
import { downloadInspectionCertificatePdf } from "@/lib/api/reports";
import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "@/lib/api/notifications";
import { TechnicalPanel, CommandMetric, StatutoryBadge } from "@/components/design-system";

interface InspectorDashboardProps {
  data: Record<string, any>;
  mineSiteName?: string;
}

export function InspectorDashboard({ data, mineSiteName }: InspectorDashboardProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data: notifications = [] } = useQuery({
    queryKey: ["inspector-notifications"],
    queryFn: () => fetchNotifications(),
    refetchInterval: 5000,
  });

  const tamperAlert = notifications.find(
    (n) =>
      n.category === "STATUTORY_RECORD_TAMPER_ATTEMPT" ||
      n.title?.includes("STATUTORY TAMPER ALERT") ||
      (n.severity === "CRITICAL" && n.title?.toLowerCase().includes("tamper"))
  );

  const kpis = data.kpi || {
    assigned_sites_count: 4,
    inspections_completed_month: 18,
    pending_verifications: 3,
    compliance_pass_rate: 94.2,
  };

  const assignedSites = data.assigned_sites || [];
  const inspectedHistory = data.inspected_history || [];
  const statutoryAlerts = data.statutory_alerts || [];

  const handleDownloadFormIV = async (inspectionId: string, title: string) => {
    setDownloadingId(inspectionId);
    try {
      await downloadInspectionCertificatePdf(inspectionId, title);
    } catch (err) {
      console.error("Failed to download Form-IV:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 relative overflow-hidden shadow-2xl corner-ticks">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#28B9C7]/10 border border-[#28B9C7]/30 text-[10px] font-mono text-[#28B9C7] uppercase tracking-wider mb-2">
              <FileCheck2 className="w-3.5 h-3.5" />
              DGMS SOUTH CENTRAL ZONE &bull; STATUTORY ENFORCEMENT
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">
              DGMS Statutory Inspector Cockpit
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Field audit schedules, geofenced Form-IV returns, and statutory CAPA verification for assigned colliery sites.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/inspections/new"
              className="px-4 py-2.5 rounded-xl bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] font-bold text-xs font-display shadow-lg shadow-[#00C896]/20 transition-all flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Launch New Audit</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Statutory Tamper Alert Banner */}
      {tamperAlert && (
        <div className="p-4 rounded-xl bg-[#FF5C68]/15 border border-[#FF5C68]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-[#FF5C68] shrink-0" />
            <div>
              <span className="text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded">
                🚨 DGMS STATUTORY TAMPER ALERT
              </span>
              <p className="text-xs text-white font-bold mt-1">
                {tamperAlert.title}: {tamperAlert.message}
              </p>
            </div>
          </div>
          <Link
            href="/audit-ledger"
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
          >
            <span>Verify Ledger Divergence</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* ── 4 KPI CARDS ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CommandMetric
          label="Assigned Pit Leases"
          value={`${kpis.assigned_sites_count} Mines`}
          subtext="Telangana & SCCL Basin"
          icon={MapPin}
          status="normal"
        />
        <CommandMetric
          label="Audits This Month"
          value={kpis.inspections_completed_month}
          subtext="Form-IV Dossiers Filed"
          icon={FileCheck2}
          status="normal"
        />
        <CommandMetric
          label="Pending CAPA Verification"
          value={kpis.pending_verifications}
          subtext="Action Closure Required"
          icon={Clock}
          status={kpis.pending_verifications > 0 ? "warning" : "normal"}
        />
        <CommandMetric
          label="Compliance Pass Rate"
          value={`${kpis.compliance_pass_rate}%`}
          subtext="Statutory Benchmark"
          icon={ShieldCheck}
          status="normal"
        />
      </div>

      {/* ── ASSIGNED SITES & STATUTORY AUDIT HISTORY ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Inspected History */}
        <div className="lg:col-span-7">
          <TechnicalPanel
            title="Completed Statutory Inspections &amp; Form-IV Dossiers"
            badge="LEGAL ARCHIVE"
            cornerTicks
            actionSlot={
              <Link href="/inspections" className="text-[11px] font-mono text-[#00C896] hover:underline flex items-center gap-1">
                <span>All Inspections</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            <div className="space-y-3 font-mono text-xs">
              {inspectedHistory.map((item: any) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#080D16] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{item.title}</span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                          item.result === "PASS"
                            ? "bg-emerald-500/10 text-[#00C896] border border-emerald-500/20"
                            : "bg-rose-500/10 text-[#FF5C68] border border-rose-500/20"
                        }`}
                      >
                        {item.result}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {item.mine_name} &bull; Station: {item.station} &bull; {item.date}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadFormIV(item.id, item.title)}
                    disabled={downloadingId === item.id}
                    className="px-3 py-1.5 rounded-lg bg-[#00C896]/15 hover:bg-[#00C896]/25 text-[#00C896] border border-[#00C896]/30 font-bold text-xs flex items-center gap-1 self-start sm:self-auto shrink-0"
                  >
                    {downloadingId === item.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>Form-IV PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </TechnicalPanel>
        </div>

        {/* Right 5 Cols: Assigned Colliery Sites */}
        <div className="lg:col-span-5">
          <TechnicalPanel title="Assigned Mines Under Inspector Jurisdiction" badge="SCCL BASIN">
            <div className="space-y-3 font-mono text-xs">
              {assignedSites.map((site: any) => (
                <div key={site.id} className="p-3.5 rounded-xl bg-[#080D16] border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{site.name}</span>
                    <span className="text-[10px] text-[#00C896] bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                      {site.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    District: {site.district}, Telangana &bull; Seam: {site.seam_degree}
                  </div>
                  <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Next Due: {site.next_audit_due}</span>
                    <span className="text-slate-300 font-bold">Risk: {site.risk_index}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </TechnicalPanel>
        </div>
      </div>
    </div>
  );
}
