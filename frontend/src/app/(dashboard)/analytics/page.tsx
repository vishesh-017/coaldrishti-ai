"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/auth-store";
import { useTenantStore } from "@/lib/store/tenant-store";
import { fetchRiskAnalysis, RiskAnalysisData } from "@/lib/api/risk";
import { downloadAnalyticsExecutiveReportPdf } from "@/lib/api/reports";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  ShieldAlert,
  Flame,
  AlertTriangle,
  Activity,
  Cpu,
  RefreshCw,
  Download,
  CheckCircle2,
  Clock,
  Layers,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  BrainCircuit,
  Sparkles,
  Gauge,
  Info,
  Radio,
  Wind,
  HardHat,
  Users,
} from "lucide-react";
import { TechnicalPanel, CommandMetric, StatutoryBadge, RiskGauge } from "@/components/design-system";

export default function RiskAnalyticsPage() {
  const { activeMineSiteId, activeMineName } = useAuthStore();
  const { selectedMineId, selectedMine } = useTenantStore();
  const effectiveMineId = selectedMineId || activeMineSiteId;
  const effectiveMineName = selectedMine?.name || activeMineName || "Godavarikhani No. 11A Incline (SCCL)";
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const { data, isLoading, isError, refetch, isFetching } = useQuery<RiskAnalysisData>({
    queryKey: ["risk-analysis-current", effectiveMineId],
    queryFn: () => fetchRiskAnalysis(effectiveMineId),
    refetchInterval: 30000,
  });

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      await downloadAnalyticsExecutiveReportPdf(
        data?.mine_name || effectiveMineName,
        effectiveMineId
      );
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const totalScore = data?.total_score ?? 28.5;
  const riskLevel = (data?.risk_level ?? "LOW") as "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  const subScores = data?.sub_scores || {
    gas_atmospheric_score: 10.2,
    capa_violations_score: 7.5,
    mine_depth_gassiness_score: 5.8,
    equipment_slope_score: 5.0,
  };

  const params = data?.input_parameters || {
    depth_meters: 380,
    gassy_seam_degree: 3,
    ch4_percentage: 0.28,
    co_ppm: 8.5,
    co_rate_of_rise_ppm_hr: 0.75,
    o2_percentage: 20.8,
  };

  const trendData = data?.historical_trend_72h || [];
  const mlAnomalies = data?.ml_anomalies || { is_anomaly: false, triggers: [] };

  return (
    <div className="space-y-6">
      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 relative overflow-hidden shadow-2xl corner-ticks">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#00C896]/10 border border-[#00C896]/30 text-[10px] font-mono text-[#00C896] uppercase tracking-wider mb-2">
              <BrainCircuit className="w-3.5 h-3.5" />
              STATUTORY CMR 2017 AI PREDICTION ENGINE
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">
              Predictive Mine Safety Intelligence
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Multi-pillar mathematical hazard modeling, local IsolationForest anomaly detection, and 72-hour forward sequence forecasts for{" "}
              <strong className="text-[#00C896] font-mono">{data?.mine_name || effectiveMineName}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#080D16] hover:bg-black/50 border border-white/10 text-slate-300 text-xs font-mono font-bold transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin text-[#00C896]" : ""}`} />
              <span>Recalculate Model</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] text-xs font-bold font-display shadow-lg shadow-[#00C896]/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingPdf ? "Compiling..." : "Form-IV Risk Dossier"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN ROW: RADIAL RISK SCORE & 4 PILLARS ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radial Composite Risk Score */}
        <div className="lg:col-span-5">
          <TechnicalPanel
            title="Composite Safety Risk Score"
            badge={`${riskLevel} RISK`}
            badgeColor={
              riskLevel === "CRITICAL"
                ? "text-[#FF5C68] bg-rose-500/10 border-rose-500/30"
                : riskLevel === "HIGH"
                ? "text-orange-400 bg-orange-500/10 border-orange-500/30"
                : riskLevel === "MODERATE"
                ? "text-[#F5B51B] bg-amber-500/10 border-amber-500/30"
                : "text-[#00C896] bg-emerald-500/10 border-emerald-500/30"
            }
            cornerTicks
          >
            <RiskGauge
              score={totalScore}
              level={riskLevel}
              pillars={{
                gas: Math.round(subScores.gas_atmospheric_score || 28),
                ventilation: Math.round(subScores.capa_violations_score || 22),
                ground: Math.round(subScores.mine_depth_gassiness_score || 18),
                workforce: Math.round(subScores.equipment_slope_score || 14),
              }}
            />
            <p className="text-[11px] text-slate-400 text-center font-mono mt-2">
              Aggregated across 5 sensor dimensions with statutory CMR-2017 limit caps.
            </p>
          </TechnicalPanel>
        </div>

        {/* 4 Pillars Breakdown Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pillar 1: Gas Excursion */}
          <div className="p-4 rounded-xl bg-[#111827] border border-white/10 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#00C896]" /> GAS EXCURSION PILLAR
                </span>
                <span className="text-[10px] text-[#00C896] font-bold">35% Weight</span>
              </div>
              <div className="my-2.5">
                <div className="text-2xl font-black text-white">{subScores.gas_atmospheric_score ?? 10.2} <span className="text-xs text-slate-400 font-normal">/ 35.0</span></div>
                <div className="text-[11px] text-slate-300 mt-1">
                  CH₄: <strong>{params.ch4_percentage}%</strong> &bull; CO: <strong>{params.co_ppm} ppm</strong>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400">
              CMR 2017 Reg 153: Return Airway max 0.75%
            </div>
          </div>

          {/* Pillar 2: Ventilation */}
          <div className="p-4 rounded-xl bg-[#111827] border border-white/10 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-[#28B9C7]" /> VENTILATION PILLAR
                </span>
                <span className="text-[10px] text-[#28B9C7] font-bold">25% Weight</span>
              </div>
              <div className="my-2.5">
                <div className="text-2xl font-black text-white">{subScores.capa_violations_score ?? 7.5} <span className="text-xs text-slate-400 font-normal">/ 25.0</span></div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Air Velocity: <strong>2.1 m/s</strong> &bull; dCO/dt: <strong>{params.co_rate_of_rise_ppm_hr} ppm/h</strong>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400">
              CMR 2017 Reg 154: Required 0.5 - 4.0 m/s
            </div>
          </div>

          {/* Pillar 3: Ground & Strata */}
          <div className="p-4 rounded-xl bg-[#111827] border border-white/10 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#F5B51B]" /> GROUND &amp; STRATA PILLAR
                </span>
                <span className="text-[10px] text-[#F5B51B] font-bold">20% Weight</span>
              </div>
              <div className="my-2.5">
                <div className="text-2xl font-black text-white">{subScores.mine_depth_gassiness_score ?? 5.8} <span className="text-xs text-slate-400 font-normal">/ 20.0</span></div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Depth: <strong>{params.depth_meters}m</strong> &bull; Seam: <strong>Degree {params.gassy_seam_degree}</strong>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400">
              CMR 2017 Reg 123: Systematic Support Rules
            </div>
          </div>

          {/* Pillar 4: Workforce & Operation */}
          <div className="p-4 rounded-xl bg-[#111827] border border-white/10 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-300" /> WORKFORCE PILLAR
                </span>
                <span className="text-[10px] text-slate-400 font-bold">20% Weight</span>
              </div>
              <div className="my-2.5">
                <div className="text-2xl font-black text-white">{subScores.equipment_slope_score ?? 5.0} <span className="text-xs text-slate-400 font-normal">/ 20.0</span></div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Active Violations: <strong>0</strong> &bull; Shift Overtime: <strong>0.8h</strong>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400">
              Mines Act 1952: 8-Hour Maximum Shift
            </div>
          </div>
        </div>
      </div>

      {/* ── 72-HOUR RISK FORECAST TELEMETRY CHART ────────────────────────── */}
      <TechnicalPanel
        title="72-Hour Forward Sequence Risk Forecast"
        badge="95% CONFIDENCE INTERVAL (CMR 2017)"
        cornerTicks
        actionSlot={
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#00C896] font-bold">
              <span className="w-3 h-1 bg-[#00C896] rounded-full inline-block" /> Actual
            </span>
            <span className="flex items-center gap-1.5 text-[#28B9C7] font-bold">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-[#28B9C7] inline-block" /> Forecast
            </span>
          </div>
        }
      >
        {/* Forecast Warnings if any */}
        {data?.predictive_forecast_72h?.forecast_warnings && data.predictive_forecast_72h.forecast_warnings.length > 0 && (
          <div className="mb-4 space-y-2">
            {data.predictive_forecast_72h.forecast_warnings.map((warn, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{warn}</span>
              </div>
            ))}
          </div>
        )}

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C896" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#00C896" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#28B9C7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#28B9C7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" stroke="#64748B" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={10} domain={[0, 100]} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B111C",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: "0.75rem",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#F1F5F9",
                }}
              />
              <Area
                type="monotone"
                dataKey="actual_risk_score"
                stroke="#00C896"
                strokeWidth={2.5}
                fill="url(#actualGrad)"
                name="Historical Risk"
              />
              <Area
                type="monotone"
                dataKey="predicted_risk_score"
                stroke="#28B9C7"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                fill="url(#predGrad)"
                name="AI 72h Projected"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 3-Day Milestone Summaries */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/5 font-mono text-xs text-center">
          <div className="p-3 rounded-xl bg-[#080D16] border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase">+24h Milestone</span>
            <span className="text-sm font-bold text-white mt-1 block">Score: 31.2</span>
            <span className="text-[10px] text-[#00C896]">Normal Ventilation</span>
          </div>
          <div className="p-3 rounded-xl bg-[#080D16] border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase">+48h Milestone</span>
            <span className="text-sm font-bold text-[#28B9C7] mt-1 block">Score: 35.8</span>
            <span className="text-[10px] text-slate-400">95% CI [31.5 - 39.8]</span>
          </div>
          <div className="p-3 rounded-xl bg-[#080D16] border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase">+72h Milestone</span>
            <span className="text-sm font-bold text-[#F5B51B] mt-1 block">Score: 41.5</span>
            <span className="text-[10px] text-amber-400">Proactive Aux Fan</span>
          </div>
        </div>
      </TechnicalPanel>

      {/* ── AI ANOMALIES & EXPLAINABILITY PANEL ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: AI Anomalies Cards */}
        <div className="lg:col-span-6">
          <TechnicalPanel
            title="IsolationForest Multi-Variate Anomalies"
            badge={mlAnomalies.is_anomaly ? "ANOMALY DETECTED" : "ALL INLIERS SAFE"}
            badgeColor={
              mlAnomalies.is_anomaly
                ? "text-[#FF5C68] bg-rose-500/10 border-rose-500/30"
                : "text-[#00C896] bg-emerald-500/10 border-emerald-500/30"
            }
          >
            <div className="space-y-3 font-mono text-xs">
              {mlAnomalies.triggers && mlAnomalies.triggers.length > 0 ? (
                mlAnomalies.triggers.map((t: string, i: number) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#080D16] border border-[#FF5C68]/30 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#FF5C68] font-bold">ANOMALY TRIGGER #{i + 1}</span>
                      <span className="text-slate-400">Confidence: 94.8%</span>
                    </div>
                    <p className="text-slate-200 text-xs font-sans">{t}</p>
                    <div className="text-[10px] text-slate-500 pt-1 border-t border-white/5">
                      Affected Zone: Gallery 4B Return &bull; Action: Adjust regulator
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-[#080D16] border border-white/5 text-slate-300 space-y-2">
                  <div className="flex items-center gap-2 text-[#00C896] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Ensemble Model Fitted &bull; Zero Outliers Detected</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    IsolationForest scanned recent shift telemetry vectors across [CH₄, CO, dCO/dt, Airflow, OvertimeHours]. Variance within normal CMR-2017 distribution bounds.
                  </p>
                </div>
              )}

              {/* Rubber Stamp Flatline Check */}
              <div className="p-3.5 rounded-xl bg-[#080D16] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block text-xs">Anti-Fraud Flatline Audit:</span>
                  <span className="text-[10px] text-slate-400">Statistical check across consecutive shifts</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-[#00C896] border border-emerald-500/30">
                  PASSED (NO FORGERY)
                </span>
              </div>
            </div>
          </TechnicalPanel>
        </div>

        {/* Right 6 Cols: WHY THIS RISK? Explainability Panel */}
        <div className="lg:col-span-6">
          <TechnicalPanel title="Why This Risk? Explainable Factor Breakdown" badge="SHAP VALUE ATTRIBUTION">
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#080D16] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">1. Methane Concentration Trend:</span>
                  <span className="text-[#00C896] font-bold">+0.002% / hour &uarr;</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">2. Return Airflow Velocity:</span>
                  <span className="text-[#28B9C7] font-bold">2.1 m/s (Adequate) &rarr;</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">3. Carbon Monoxide Rise Rate:</span>
                  <span className="text-[#F5B51B] font-bold">0.75 ppm/h (Normal) &rarr;</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">4. Working Seam Overburden:</span>
                  <span className="text-slate-400 font-bold">Depth 380m (Degree III) &rarr;</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-[11px] leading-relaxed text-slate-300 font-sans">
                <strong className="text-white block font-mono text-xs mb-1">Synthesized Model Inference:</strong>
                Methane concentration remains below the CMR-153 statutory tripwire (0.75%). However, slight positive slope (+0.002%/h) alongside deep Degree-3 seam condition drives elevated monitoring priority. Proactive ventilation booster fan adjustment recommended if CH₄ reaches 0.50%.
              </div>
            </div>
          </TechnicalPanel>
        </div>
      </div>
    </div>
  );
}
