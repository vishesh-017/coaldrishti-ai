"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  AlertTriangle,
  TrendingUp,
  FileCheck2,
  Layers,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Activity,
  DollarSign,
  TrendingDown,
  Lock,
  FileKey2,
  Scale,
  Sparkles,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "@/lib/api/notifications";
import { TechnicalPanel, CommandMetric, StatutoryBadge, SectionHeader } from "@/components/design-system";

interface GovtOfficialDashboardProps {
  data: Record<string, any>;
  mineSiteName?: string;
}

export function GovtOfficialDashboard({ data }: GovtOfficialDashboardProps) {
  const { data: notifications = [] } = useQuery({
    queryKey: ["gov-official-notifications"],
    queryFn: () => fetchNotifications(),
    refetchInterval: 5000,
  });

  const tamperAlert = notifications.find(
    (n) =>
      n.category === "STATUTORY_RECORD_TAMPER_ATTEMPT" ||
      n.title?.includes("STATUTORY TAMPER ALERT") ||
      (n.severity === "CRITICAL" && n.title?.toLowerCase().includes("tamper"))
  );

  const macroKpis = data.macro_kpis || {
    national_compliance_rate: 92.4,
    total_mines_monitored: 348,
    active_subsidiaries_count: 8,
    critical_hazard_sites_count: 4,
    pending_form_iv_returns: 12,
    unresolved_level3_escalations: 3,
    monthly_coal_dispatch_mt: "68.4 MT",
    compliance_downtime_hours: "14.2 hrs (Low)",
  };

  const heatmap = data.subsidiary_risk_heatmap || [];
  const auditLog = data.statutory_audit_log || [];
  const repeatIssues = data.high_risk_issues_matrix || [];
  const economic = data.economic_indicators || {
    quarterly_output_achieved_pct: 96.8,
    environmental_cess_collected_cr: "₹ 1,420 Cr",
    safety_capex_utilization_pct: 88.5,
    downtime_hours_by_cause: [
      { cause: "Statutory Inspection Hold", hours: 14.2 },
      { cause: "Equipment Preventive Maintenance", hours: 42.0 },
      { cause: "Weather / Monsoon Inundation", hours: 18.5 },
    ],
  };

  return (
    <div className="space-y-6">
      {/* ── HERO HEADER ──────────────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 relative overflow-hidden shadow-2xl corner-ticks">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#00C896]/10 border border-[#00C896]/30 text-[10px] font-mono text-[#00C896] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse" />
              MINISTRY OF COAL • APEX STATUTORY SURVEILLANCE
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">
              National Mine Governance Command Center
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Pan-India macro compliance, real-time subsidiary risk indices, and statutory enforcement oversight across 8 coal subsidiaries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/audit-ledger"
              className="px-4 py-2.5 rounded-xl bg-[#080D16] hover:bg-black/60 border border-white/10 hover:border-[#00C896]/40 text-xs font-mono text-slate-200 transition-all flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#00C896]" />
              <span>SHA-256 Ledger</span>
            </Link>
            <Link
              href="/analytics"
              className="px-4 py-2.5 rounded-xl bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] text-xs font-bold font-display shadow-lg shadow-[#00C896]/20 transition-all flex items-center gap-1.5"
            >
              <span>AI Risk Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Statutory Tamper Alert Banner for Ministry */}
      {tamperAlert && (
        <div className="p-4 rounded-xl bg-[#FF5C68]/10 border border-[#FF5C68]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF5C68]/20 text-[#FF5C68] flex items-center justify-center shrink-0 border border-[#FF5C68]/40">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-[#FF5C68] uppercase tracking-wider bg-[#FF5C68]/20 px-2 py-0.5 rounded border border-[#FF5C68]/30">
                  CRITICAL TAMPER INTERCEPTION
                </span>
                <span className="text-[9px] font-mono text-white bg-rose-600 px-2 py-0.5 rounded font-bold">
                  Escalation Level 3
                </span>
              </div>
              <p className="text-xs text-white font-bold mt-1 font-mono">
                {tamperAlert.title}: {tamperAlert.message}
              </p>
            </div>
          </div>
          <Link
            href="/audit-ledger"
            className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
          >
            <span>Inspect Cryptographic Divergence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* ── 4 INTELLIGENT METRIC BLOCKS ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CommandMetric
          label="National Compliance Rate"
          value={`${macroKpis.national_compliance_rate}%`}
          subtext="Across 8 Subsidiaries (CIL + SCCL)"
          trend="up"
          trendValue="+1.8% vs last month"
          icon={ShieldCheck}
          status="normal"
        />
        <CommandMetric
          label="Total Mine Coverage"
          value={macroKpis.total_mines_monitored}
          subtext="214 Opencast • 134 Underground"
          trend="neutral"
          trendValue="348 active leases"
          icon={Building2}
          status="info"
        />
        <CommandMetric
          label="Critical Escalations"
          value={macroKpis.unresolved_level3_escalations}
          subtext="Level 3 Directives Requiring Hold"
          trend="down"
          trendValue="-2 resolved this week"
          icon={AlertTriangle}
          status={macroKpis.unresolved_level3_escalations > 0 ? "critical" : "normal"}
        />
        <CommandMetric
          label="Monthly Coal Dispatch"
          value={macroKpis.monthly_coal_dispatch_mt}
          subtext={`Compliance downtime: ${macroKpis.compliance_downtime_hours}`}
          trend="up"
          trendValue="96.8% of national target"
          icon={TrendingUp}
          status="warning"
        />
      </div>

      {/* ── MAIN VISUALIZATION: SUBSIDIARY RISK HEATMAP & REPEAT ISSUES ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Macro Subsidiary Risk Heatmap */}
        <div className="lg:col-span-7">
          <TechnicalPanel
            title="Subsidiary-Level Compliance & Risk Heatmap"
            badge="CIL + SCCL PAN-INDIA"
            cornerTicks
            actionSlot={
              <Link
                href="/compliance"
                className="text-[11px] font-mono text-[#00C896] hover:underline flex items-center gap-1"
              >
                <span>Statutory Clearances</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            <div className="space-y-2.5">
              {heatmap.map((sub: any) => {
                const isHighRisk = sub.avg_risk_score > 50;
                const isLowRisk = sub.avg_risk_score < 30;

                return (
                  <div
                    key={sub.code}
                    className="p-3.5 rounded-xl border border-white/5 bg-[#080D16] hover:border-white/15 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-center font-black text-xs text-white font-mono">
                        {sub.code}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{sub.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({sub.mines_count} Mines)</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Compliance: <strong className="text-[#00C896] font-mono">{sub.compliance_rate}%</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-3">
                      <div>
                        <span
                          className={`text-xs font-mono font-black block ${
                            isHighRisk ? "text-[#FF5C68]" : isLowRisk ? "text-[#00C896]" : "text-[#F5B51B]"
                          }`}
                        >
                          Risk: {sub.avg_risk_score}/100
                        </span>
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                            isHighRisk
                              ? "bg-rose-500/10 text-[#FF5C68] border-rose-500/30"
                              : isLowRisk
                              ? "bg-emerald-500/10 text-[#00C896] border-emerald-500/30"
                              : "bg-amber-500/10 text-[#F5B51B] border-amber-500/30"
                          }`}
                        >
                          {sub.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TechnicalPanel>
        </div>

        {/* Right 5 Cols: High-Risk Repeated Issues Matrix */}
        <div className="lg:col-span-5">
          <TechnicalPanel
            title="High-Risk Violation Intelligence"
            badge="DGMS WARNING TRIPWIRES"
            badgeColor="text-[#FF5C68] bg-rose-500/10 border-rose-500/30"
            cornerTicks
            actionSlot={
              <Link
                href="/capa"
                className="text-[11px] font-mono text-[#FF5C68] hover:underline flex items-center gap-1"
              >
                <span>CAPA Remediation</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            <div className="space-y-3">
              {repeatIssues.map((issue: any, i: number) => (
                <div key={i} className="p-3.5 rounded-xl border border-white/5 bg-[#080D16]">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <span className="font-bold text-[#F5B51B]">{issue.rule}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-[10px] text-slate-400 uppercase">{issue.body}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#FF5C68]">{issue.violations_count} Pits</span>
                  </div>
                  <div className="text-xs text-slate-200 font-medium">{issue.category}</div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                    <span>Impact: <strong className="text-[#FF5C68]">{issue.impact}</strong></span>
                    <span>Trend: {issue.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </TechnicalPanel>
        </div>
      </div>

      {/* ── ECONOMIC & STATUTORY AUDIT SUMMARY ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Economic Impact Panel */}
        <div className="lg:col-span-5">
          <TechnicalPanel title="Economic & Production Impact Indicators" badge="MINISTRY FINANCE">
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#080D16] border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Quarterly Coal Target:</span>
                <span className="font-bold text-[#00C896] text-sm">{economic.quarterly_output_achieved_pct}%</span>
              </div>
              <div className="p-3 rounded-xl bg-[#080D16] border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Environmental Cess Collected:</span>
                <span className="font-bold text-white text-sm">{economic.environmental_cess_collected_cr}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#080D16] border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Safety CAPEX Utilization:</span>
                <span className="font-bold text-[#28B9C7] text-sm">{economic.safety_capex_utilization_pct}%</span>
              </div>

              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] text-slate-400 block mb-2">Downtime Causes Distribution:</span>
                {economic.downtime_hours_by_cause?.map((c: any, idx: number) => (
                  <div key={idx} className="flex justify-between py-1 text-[11px] text-slate-300">
                    <span>{c.cause}</span>
                    <span className="font-bold text-slate-200">{c.hours} hrs</span>
                  </div>
                ))}
              </div>
            </div>
          </TechnicalPanel>
        </div>

        {/* National Statutory Inspection Log */}
        <div className="lg:col-span-7">
          <TechnicalPanel
            title="National Statutory Inspection Dossiers"
            badge="DGMS FORM-IV AUDIT"
            actionSlot={
              <Link
                href="/inspections"
                className="text-[11px] font-mono text-[#00C896] hover:underline flex items-center gap-1"
              >
                <span>All Inspections</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {auditLog.map((log: any) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl border border-white/5 bg-[#080D16] flex flex-col justify-between font-mono"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="font-bold text-[#28B9C7] bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">
                        {log.subsidiary}
                      </span>
                      <span className="text-slate-500">{log.date}</span>
                    </div>
                    <div className="font-bold text-white text-xs mt-1">{log.mine}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{log.type}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Inspector: {log.inspector}</div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                    <span
                      className={`font-bold px-1.5 py-0.5 rounded ${
                        log.status === "COMPLETED"
                          ? "bg-emerald-500/10 text-[#00C896]"
                          : "bg-rose-500/10 text-[#FF5C68]"
                      }`}
                    >
                      {log.status}
                    </span>
                    <span className="text-slate-200 font-bold">Score: {log.score}</span>
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
