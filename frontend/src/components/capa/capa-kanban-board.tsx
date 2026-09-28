"use client";

import React, { useState } from "react";
import { ViolationCAPA, CAPAState, UserRole } from "@/lib/types/domain";
import { useAuthStore } from "@/lib/store/auth-store";
import { transitionCAPA } from "@/lib/api/violations";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Paperclip,
  ShieldCheck,
  UserCheck,
  RotateCcw,
  Building2,
  Calendar,
} from "lucide-react";

interface CAPAKanbanBoardProps {
  initialCapas: ViolationCAPA[];
}

const COLUMNS: { state: CAPAState; label: string; badgeColor: string }[] = [
  { state: CAPAState.REPORTED, label: "NEW", badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/30" },
  { state: CAPAState.NOTICE_ISSUED, label: "UNDER REVIEW", badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  { state: CAPAState.ASSIGNED, label: "ACTION ASSIGNED", badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
  { state: CAPAState.RECTIFICATION_SUBMITTED, label: "IN PROGRESS", badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
  { state: CAPAState.VERIFIED, label: "VERIFICATION", badgeColor: "text-teal-400 bg-teal-500/10 border-teal-500/30" },
  { state: CAPAState.CLOSED, label: "CLOSED", badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
];

export function CAPAKanbanBoard({ initialCapas }: CAPAKanbanBoardProps) {
  const [capas, setCapas] = useState<ViolationCAPA[]>(initialCapas);
  const { userRole, activeMineSiteId, activeMineName } = useAuthStore();
  const [isTransitioning, setIsTransitioning] = useState<string | null>(null);

  const canVerify =
    userRole === UserRole.DGMS_INSPECTOR ||
    userRole === UserRole.COLLIERY_MANAGER ||
    userRole === UserRole.MINISTRY_AUDITOR;

  const canReopen = userRole === UserRole.MINISTRY_AUDITOR;

  const getNextState = (current: CAPAState): CAPAState | null => {
    switch (current) {
      case CAPAState.REPORTED:
        return CAPAState.NOTICE_ISSUED;
      case CAPAState.NOTICE_ISSUED:
        return CAPAState.ASSIGNED;
      case CAPAState.ASSIGNED:
        return CAPAState.RECTIFICATION_SUBMITTED;
      case CAPAState.RECTIFICATION_SUBMITTED:
        return CAPAState.VERIFIED;
      case CAPAState.VERIFIED:
        return CAPAState.CLOSED;
      default:
        return null;
    }
  };

  const handleAdvance = async (capa: ViolationCAPA) => {
    const next = getNextState(capa.capa_state);
    if (!next) return;

    if (next === CAPAState.VERIFIED && !canVerify) {
      alert("Role Restriction: Only DGMS Inspector, Colliery Manager, or Ministry Auditor may verify CAPAs.");
      return;
    }

    setIsTransitioning(capa.id);
    try {
      const updated = await transitionCAPA({
        capa_id: capa.id,
        to_state: next,
        mine_site_id: activeMineSiteId,
      });

      setCapas((prev) => prev.map((c) => (c.id === capa.id ? updated : c)));
    } catch (err) {
      console.error("Transition error:", err);
      alert("Failed to advance CAPA status.");
    } finally {
      setIsTransitioning(null);
    }
  };

  const handleReopen = async (capa: ViolationCAPA) => {
    if (!canReopen) {
      alert("Role Restriction: Only Ministry Auditor may reopen closed CAPAs.");
      return;
    }
    setIsTransitioning(capa.id);
    try {
      const updated = await transitionCAPA({
        capa_id: capa.id,
        to_state: CAPAState.REPORTED,
        mine_site_id: activeMineSiteId,
      });
      setCapas((prev) => prev.map((c) => (c.id === capa.id ? updated : c)));
    } catch (err) {
      console.error("Reopen error:", err);
    } finally {
      setIsTransitioning(null);
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="grid grid-cols-6 gap-3.5 min-w-[1380px]">
        {COLUMNS.map((col) => {
          const items = capas.filter((c) => c.capa_state === col.state);

          return (
            <div
              key={col.state}
              className="flex flex-col bg-[#111827] border border-white/10 rounded-2xl p-3.5 shadow-xl h-[720px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-2 py-2 border-b border-white/5 mb-3">
                <span className="text-xs font-bold text-white tracking-wide font-display">
                  {col.label}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${col.badgeColor}`}
                >
                  {items.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {items.map((capa) => {
                  const nextState = getNextState(capa.capa_state);

                  return (
                    <div
                      key={capa.id}
                      className="p-3.5 rounded-xl border border-white/5 bg-[#080D16] hover:border-white/20 transition-all shadow-md space-y-2.5 font-mono text-xs"
                    >
                      {/* Top Row: Regulation & Version */}
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#00C896] font-bold bg-[#00C896]/10 px-1.5 py-0.2 rounded border border-[#00C896]/30">
                          {capa.rule_id || "CMR 2017 Reg 123"}
                        </span>
                        <span className="text-slate-500 font-bold">
                          Risk: <span className="text-[#FF5C68]">HIGH</span>
                        </span>
                      </div>

                      {/* Mine and Regulation Details */}
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                        <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{activeMineName}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs font-sans text-slate-200 line-clamp-3 leading-snug">
                        {capa.description}
                      </p>

                      {/* Evidence Attachment Badges */}
                      {capa.evidence_urls && capa.evidence_urls.length > 0 && (
                        <div className="flex items-center gap-1.5 text-[9px] text-[#28B9C7] bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/60">
                          <Paperclip className="w-3 h-3" />
                          <span>{capa.evidence_urls.length} Evidence Photo(s) Attached</span>
                        </div>
                      )}

                      {/* Metadata: Owner & Due Date */}
                      <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Owner:</span>
                          <span className="text-slate-200 truncate max-w-[120px]">
                            {capa.assigned_to || "Colliery Manager"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Due Date:</span>
                          <span className="text-[#F5B51B] font-bold">14 Days</span>
                        </div>
                      </div>

                      {/* Transition Button */}
                      <div className="pt-1 border-t border-white/5">
                        {nextState && (
                          <button
                            onClick={() => handleAdvance(capa)}
                            disabled={isTransitioning === capa.id}
                            className="w-full py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all bg-[#00C896]/15 hover:bg-[#00C896]/25 text-[#00C896] border border-[#00C896]/40"
                          >
                            <span>Advance to {COLUMNS.find((c) => c.state === nextState)?.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                        {capa.capa_state === CAPAState.CLOSED && canReopen && (
                          <button
                            onClick={() => handleReopen(capa)}
                            className="w-full py-1.5 px-2 rounded-lg text-[10px] font-semibold text-[#FF5C68] bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 flex items-center justify-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reopen to New</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {items.length === 0 && (
                  <div className="h-32 flex items-center justify-center text-[10px] text-slate-600 font-mono italic">
                    No active items in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
