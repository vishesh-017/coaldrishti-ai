"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Flame,
  Wind,
  Layers,
  Activity,
  AlertTriangle,
  HardHat,
  Radio,
  FileKey2,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Info,
  ChevronRight,
  Database,
  Lock,
} from "lucide-react";
import { UserRole } from "@/lib/types/domain";

// ── 1. TechnicalPanel ──────────────────────────────────────────────────────────
export interface TechnicalPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "active" | "subtle" | "critical" | "warning";
  cornerTicks?: boolean;
  className?: string;
  headerSlot?: React.ReactNode;
  actionSlot?: React.ReactNode;
  title?: string;
  badge?: string;
  badgeColor?: string;
}

export function TechnicalPanel({
  children,
  variant = "default",
  cornerTicks = false,
  className = "",
  headerSlot,
  actionSlot,
  title,
  badge,
  badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  ...props
}: TechnicalPanelProps) {
  const variantStyles = {
    default: "bg-[#111827] border border-white/10 shadow-lg shadow-black/40",
    active: "bg-[#111827] border border-[#00C896]/40 shadow-xl shadow-[#00C896]/10",
    subtle: "bg-[#0B111C] border border-white/5",
    critical: "bg-[#111827] border border-[#FF5C68]/40 shadow-xl shadow-[#FF5C68]/15",
    warning: "bg-[#111827] border border-[#F5B51B]/40 shadow-xl shadow-[#F5B51B]/15",
  }[variant];

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all ${variantStyles} ${
        cornerTicks ? "corner-ticks" : ""
      } ${className}`}
      {...props}
    >
      {(title || headerSlot || actionSlot) && (
        <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between bg-black/20">
          {headerSlot ? (
            headerSlot
          ) : (
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-display">
                {title}
              </h3>
              {badge && (
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase tracking-widest font-semibold ${badgeColor}`}
                >
                  {badge}
                </span>
              )}
            </div>
          )}
          {actionSlot && <div className="flex items-center gap-2">{actionSlot}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

// ── 2. CommandMetric ──────────────────────────────────────────────────────────
export interface CommandMetricProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ElementType;
  status?: "normal" | "warning" | "critical" | "info";
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CommandMetric({
  label,
  value,
  subtext,
  trend,
  trendValue,
  icon: Icon,
  status = "normal",
  prefix,
  suffix,
  className = "",
}: CommandMetricProps) {
  const statusColors = {
    normal: {
      text: "text-[#00C896]",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/5",
      icon: "text-[#00C896]",
    },
    warning: {
      text: "text-[#F5B51B]",
      border: "border-amber-500/20",
      bg: "bg-amber-500/5",
      icon: "text-[#F5B51B]",
    },
    critical: {
      text: "text-[#FF5C68]",
      border: "border-rose-500/20",
      bg: "bg-rose-500/5",
      icon: "text-[#FF5C68]",
    },
    info: {
      text: "text-[#28B9C7]",
      border: "border-cyan-500/20",
      bg: "bg-cyan-500/5",
      icon: "text-[#28B9C7]",
    },
  }[status];

  return (
    <div
      className={`relative p-4 rounded-xl bg-[#111827] border ${statusColors.border} hover:border-white/20 transition-all ${className}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-display">
          {label}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg ${statusColors.bg} ${statusColors.icon}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        {prefix && <span className="text-sm font-bold text-slate-400">{prefix}</span>}
        <span className={`text-2xl md:text-3xl font-extrabold tracking-tight font-mono ${statusColors.text}`}>
          {value}
        </span>
        {suffix && <span className="text-xs font-semibold text-slate-400">{suffix}</span>}
      </div>

      {(subtext || trendValue) && (
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
          <span>{subtext}</span>
          {trendValue && (
            <span
              className={`flex items-center gap-1 font-mono font-medium ${
                trend === "up"
                  ? "text-rose-400"
                  : trend === "down"
                  ? "text-emerald-400"
                  : "text-slate-400"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : trend === "down" ? (
                <TrendingDown className="w-3 h-3" />
              ) : null}
              {trendValue}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ── 3. TelemetryCard ──────────────────────────────────────────────────────────
export interface TelemetryCardProps {
  label: string;
  value: number | string;
  unit: string;
  sensorId?: string;
  statutoryLimit: string;
  cmrReference: string;
  status: "NORMAL" | "WATCH" | "WARNING" | "CRITICAL";
  icon?: React.ElementType;
  rateOfRise?: string;
  historyMini?: number[];
}

export function TelemetryCard({
  label,
  value,
  unit,
  sensorId = "SEN-UG-01",
  statutoryLimit,
  cmrReference,
  status,
  icon: Icon = Activity,
  rateOfRise,
}: TelemetryCardProps) {
  const statusConfig = {
    NORMAL: {
      color: "text-[#00C896]",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      badge: "NORMAL",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    WATCH: {
      color: "text-[#28B9C7]",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      badge: "MONITORING",
      badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    },
    WARNING: {
      color: "text-[#F5B51B]",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      badge: "EXCURSION WATCH",
      badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    },
    CRITICAL: {
      color: "text-[#FF5C68]",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      badge: "STATUTORY BREACH",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse",
    },
  }[status];

  return (
    <div
      className={`relative p-4 rounded-xl bg-[#111827] border ${statusConfig.border} transition-all hover:shadow-lg`}
    >
      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${statusConfig.bg} ${statusConfig.color}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-slate-200 block text-xs">{label}</span>
            <span className="text-[10px] font-mono text-slate-400">{sensorId}</span>
          </div>
        </div>
        <span
          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${statusConfig.badgeColor}`}
        >
          {statusConfig.badge}
        </span>
      </div>

      <div className="my-3 flex items-baseline justify-between">
        <div>
          <span className={`text-3xl font-extrabold font-mono tracking-tight ${statusConfig.color}`}>
            {value}
          </span>
          <span className="text-xs font-bold text-slate-400 ml-1.5">{unit}</span>
        </div>
        {rateOfRise && (
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-mono">Rate of Rise</span>
            <span className="text-xs font-mono font-bold text-slate-200">{rateOfRise}</span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span>Limit: {statutoryLimit}</span>
        <span className="text-emerald-400/80">{cmrReference}</span>
      </div>
    </div>
  );
}

// ── 4. RiskGauge ──────────────────────────────────────────────────────────────
export interface RiskGaugeProps {
  score: number;
  maxScore?: number;
  level: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  pillars?: {
    gas: number;
    ventilation: number;
    ground: number;
    workforce: number;
  };
  size?: "sm" | "md" | "lg";
}

export function RiskGauge({
  score,
  maxScore = 100,
  level,
  pillars = { gas: 28, ventilation: 22, ground: 18, workforce: 14 },
  size = "md",
}: RiskGaugeProps) {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  const strokeDashoffset = 283 - (283 * (percentage * 0.75)) / 100;

  const color =
    score >= 70
      ? "#FF5C68"
      : score >= 50
      ? "#F5B51B"
      : score >= 30
      ? "#28B9C7"
      : "#00C896";

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full -rotate-135 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="transparent"
            stroke="#1B2433"
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset="70.75"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Composite Risk
          </span>
          <span className="text-4xl font-extrabold font-mono tracking-tight" style={{ color }}>
            {score.toFixed(1)}
          </span>
          <span
            className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full mt-1 border"
            style={{
              color,
              borderColor: `${color}40`,
              backgroundColor: `${color}15`,
            }}
          >
            {level} RISK
          </span>
        </div>
      </div>

      {pillars && (
        <div className="grid grid-cols-4 gap-2 w-full mt-3 text-center">
          <div className="p-2 rounded bg-black/30 border border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase font-mono">Gas</span>
            <span className="text-xs font-mono font-bold text-slate-200">{pillars.gas}%</span>
          </div>
          <div className="p-2 rounded bg-black/30 border border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase font-mono">Vent</span>
            <span className="text-xs font-mono font-bold text-slate-200">{pillars.ventilation}%</span>
          </div>
          <div className="p-2 rounded bg-black/30 border border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase font-mono">Ground</span>
            <span className="text-xs font-mono font-bold text-slate-200">{pillars.ground}%</span>
          </div>
          <div className="p-2 rounded bg-black/30 border border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase font-mono">Crew</span>
            <span className="text-xs font-mono font-bold text-slate-200">{pillars.workforce}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── 5. HashBlock ──────────────────────────────────────────────────────────────
export interface HashBlockProps {
  hash: string;
  prevHash?: string;
  seqNumber?: number;
  timestamp?: string;
  actor?: string;
  isVerified?: boolean;
  className?: string;
}

export function HashBlock({
  hash,
  prevHash,
  seqNumber = 1,
  timestamp,
  actor,
  isVerified = true,
  className = "",
}: HashBlockProps) {
  return (
    <div
      className={`p-3.5 rounded-xl bg-[#111827] border ${
        isVerified ? "border-[#00C896]/30 hover:border-[#00C896]/60" : "border-[#FF5C68]/50"
      } font-mono transition-all text-xs ${className}`}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/50 text-[#00C896] border border-[#00C896]/30">
            BLOCK #{seqNumber}
          </span>
          {timestamp && <span className="text-[10px] text-slate-400">{timestamp}</span>}
        </div>
        <span
          className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
            isVerified
              ? "bg-[#00C896]/10 text-[#00C896] border-[#00C896]/30"
              : "bg-[#FF5C68]/10 text-[#FF5C68] border-[#FF5C68]/30"
          }`}
        >
          {isVerified ? "VERIFIED SHA-256" : "TAMPER DETECTED"}
        </span>
      </div>

      <div className="mt-2.5 space-y-1.5">
        <div>
          <span className="text-[9px] text-slate-500 uppercase block">Current Block Hash</span>
          <span className="text-[11px] text-slate-200 font-semibold break-all select-all">
            {hash}
          </span>
        </div>
        {prevHash && (
          <div>
            <span className="text-[9px] text-slate-500 uppercase block">Previous Block Hash</span>
            <span className="text-[10px] text-slate-400 break-all select-all">{prevHash}</span>
          </div>
        )}
      </div>

      {actor && (
        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
          <span>Actor: {actor}</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Immutable
          </span>
        </div>
      )}
    </div>
  );
}

// ── 6. StatutoryBadge ─────────────────────────────────────────────────────────
export function StatutoryBadge({
  status,
  label,
  className = "",
}: {
  status: "COMPLIANT" | "ATTENTION" | "NON-COMPLIANT" | "EXPIRED" | "CRITICAL";
  label?: string;
  className?: string;
}) {
  const configs = {
    COMPLIANT: "bg-[#00C896]/10 text-[#00C896] border-[#00C896]/30",
    ATTENTION: "bg-[#F5B51B]/10 text-[#F5B51B] border-[#F5B51B]/30",
    "NON-COMPLIANT": "bg-[#FF5C68]/15 text-[#FF5C68] border-[#FF5C68]/40",
    EXPIRED: "bg-slate-800 text-slate-400 border-slate-700",
    CRITICAL: "bg-[#FF5C68]/20 text-[#FF5C68] border-[#FF5C68]/50 animate-pulse",
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${configs} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label || status}
    </span>
  );
}

// ── 7. SectionHeader ──────────────────────────────────────────────────────────
export function SectionHeader({
  title,
  subtitle,
  action,
  tag,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  tag?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
      <div>
        <div className="flex items-center gap-2">
          {tag && (
            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/30 uppercase tracking-widest">
              {tag}
            </span>
          )}
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-100 font-display">
            {title}
          </h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
    </div>
  );
}

// ── 8. StatusIndicator ────────────────────────────────────────────────────────
export function StatusIndicator({
  state = "active",
  label,
  pulse = true,
}: {
  state?: "active" | "standby" | "warning" | "alert";
  label?: string;
  pulse?: boolean;
}) {
  const stateColor = {
    active: "bg-[#00C896]",
    standby: "bg-[#28B9C7]",
    warning: "bg-[#F5B51B]",
    alert: "bg-[#FF5C68]",
  }[state];

  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs">
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${stateColor}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${stateColor}`} />
      </span>
      {label && <span className="text-slate-300 font-medium text-[11px]">{label}</span>}
    </div>
  );
}
