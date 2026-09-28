"use client";

import React, { useEffect, useState } from "react";
import { CAPAKanbanBoard } from "@/components/capa/capa-kanban-board";
import { fetchCAPAs } from "@/lib/api/violations";
import { useAuthStore } from "@/lib/store/auth-store";
import { ViolationCAPA } from "@/lib/types/domain";
import { KanbanSquare, ShieldAlert, CheckCircle2, Filter, AlertTriangle } from "lucide-react";
import { TechnicalPanel, CommandMetric } from "@/components/design-system";

export default function CAPAPage() {
  const { activeMineSiteId, activeMineName } = useAuthStore();
  const [capas, setCapas] = useState<ViolationCAPA[]>([]);

  useEffect(() => {
    fetchCAPAs(activeMineSiteId).then(setCapas);
  }, [activeMineSiteId]);

  return (
    <div className="space-y-6">
      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 relative overflow-hidden shadow-2xl corner-ticks">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#00C896]/10 border border-[#00C896]/30 text-[10px] font-mono text-[#00C896] uppercase tracking-wider mb-2">
              <KanbanSquare className="w-3.5 h-3.5" />
              STATUTORY REMEDIATION &bull; CLOSED-LOOP CAPA WORKFLOW
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">
              Corrective &amp; Preventive Action (CAPA) Board
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Hazard mitigation lifecycle: <strong className="text-white">New &rarr; Under Review &rarr; Action Assigned &rarr; In Progress &rarr; Verification &rarr; Closed</strong> for <strong className="text-[#00C896] font-mono">{activeMineName}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#080D16] px-3.5 py-2 rounded-xl border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
            <span>DGMS Verification Role-Gated</span>
          </div>
        </div>
      </div>

      {/* ── 6-STAGE WORKFLOW KANBAN BOARD ────────────────────────────────── */}
      <CAPAKanbanBoard initialCapas={capas} />
    </div>
  );
}
