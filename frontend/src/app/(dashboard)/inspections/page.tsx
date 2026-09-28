"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchInspections } from "@/lib/api/inspections";
import { downloadInspectionDossierPdf } from "@/lib/api/reports";
import { offlineDb, PendingInspection } from "@/lib/db/offline-db";
import { useAuthStore } from "@/lib/store/auth-store";
import { Inspection, LocationType } from "@/lib/types/domain";
import { formatDate } from "@/lib/utils/dates";
import {
  ClipboardCheck,
  Plus,
  Compass,
  HardHat,
  ShieldAlert,
  CheckCircle,
  CloudUpload,
  ArrowRight,
  FileDown,
  Search,
} from "lucide-react";
import { TechnicalPanel, CommandMetric, StatutoryBadge } from "@/components/design-system";

export default function InspectionsPage() {
  const { activeMineSiteId, activeMineName, userRole } = useAuthStore();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [pendingLocal, setPendingLocal] = useState<PendingInspection[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInspections(activeMineSiteId).then(setInspections);
    offlineDb.pending_inspections
      .where("is_synced")
      .equals(0)
      .toArray()
      .then(setPendingLocal);
  }, [activeMineSiteId]);

  const filteredInspections = inspections.filter(
    (i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (i.gps_location && i.gps_location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 relative overflow-hidden shadow-2xl corner-ticks">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#00C896]/10 border border-[#00C896]/30 text-[10px] font-mono text-[#00C896] uppercase tracking-wider mb-2">
              <ClipboardCheck className="w-3.5 h-3.5" />
              STATUTORY DGMS FORM-IV FIELD AUDITS
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">
              Statutory Field Inspections &amp; Audit Logs
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Surface GPS &amp; Underground Seam checkpoints for <strong className="text-[#00C896] font-mono">{activeMineName}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/inspections/new"
              className="px-4 py-2.5 rounded-xl bg-[#00C896] hover:bg-[#08B98A] text-[#050A12] font-bold text-xs font-display shadow-lg shadow-[#00C896]/20 transition-all flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Field Inspection</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── OFFLINE QUEUE ALERT ──────────────────────────────────────────── */}
      {pendingLocal.length > 0 && (
        <div className="p-4 rounded-xl bg-[#F5B51B]/15 border border-[#F5B51B]/30 flex items-center justify-between text-xs text-amber-200 shadow-md font-mono">
          <div className="flex items-center gap-2.5">
            <CloudUpload className="w-5 h-5 text-[#F5B51B] shrink-0 animate-bounce" />
            <div>
              <strong className="text-white font-bold">Offline Queue:</strong> {pendingLocal.length} inspection(s) stored locally in IndexedDB pending edge sync.
            </div>
          </div>
          <span className="text-[10px] bg-black/40 px-2.5 py-1 rounded border border-[#F5B51B]/40 text-[#F5B51B] font-bold">
            Auto-Sync Ready
          </span>
        </div>
      )}

      {/* ── INSPECTIONS DOSSIER TABLE ────────────────────────────────────── */}
      <TechnicalPanel
        title="Statutory Inspection Records"
        badge="DGMS COMPLIANCE DOSSIERS"
        cornerTicks
        actionSlot={
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search title, station..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 rounded-lg bg-[#080D16] border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:border-[#00C896]"
            />
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#080D16] text-slate-400 uppercase text-[10px] border-b border-white/5">
              <tr>
                <th className="p-3">Inspection Title</th>
                <th className="p-3">Location Mode</th>
                <th className="p-3">Coordinates / Station</th>
                <th className="p-3">PostGIS Geofence</th>
                <th className="p-3">Inspection Date</th>
                <th className="p-3">Sync State</th>
                <th className="p-3 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {/* Local Pending Inspections */}
              {pendingLocal.map((local) => (
                <tr key={local.id} className="bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-white">{local.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{local.description}</div>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5">
                      {local.location_type === LocationType.SURFACE_GPS ? (
                        <>
                          <Compass className="w-3 h-3 text-[#00C896]" /> Surface GPS
                        </>
                      ) : (
                        <>
                          <HardHat className="w-3 h-3 text-[#F5B51B]" /> Underground
                        </>
                      )}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 text-[11px]">{local.gps_location || local.station_id || "-"}</td>
                  <td className="p-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      Pending Edge Sync
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 text-[11px]">{formatDate(local.inspection_date)}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-[#F5B51B] border border-amber-500/30">
                      <CloudUpload className="w-3 h-3" /> Offline (IndexedDB)
                    </span>
                  </td>
                  <td className="p-3 text-right text-slate-500 italic text-[10px]">Sync First</td>
                </tr>
              ))}

              {/* Server Synced Records */}
              {filteredInspections.map((insp) => (
                <tr key={insp.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-white">{insp.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{insp.description}</div>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5">
                      {insp.location_type === LocationType.SURFACE_GPS ? (
                        <>
                          <Compass className="w-3 h-3 text-[#00C896]" /> Surface GPS
                        </>
                      ) : (
                        <>
                          <HardHat className="w-3 h-3 text-[#F5B51B]" /> Underground
                        </>
                      )}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 text-[11px]">{insp.gps_location || insp.station_id || "-"}</td>
                  <td className="p-3">
                    {insp.is_geofence_breached ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-[#FF5C68] border border-rose-500/30">
                        <ShieldAlert className="w-3 h-3" /> BREACH DETECTED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-[#00C896] border border-emerald-500/30">
                        <CheckCircle className="w-3 h-3" /> VERIFIED IN LEASE
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-400 text-[11px]">{formatDate(insp.inspection_date)}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-[#00C896] border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" /> Synced (v{insp.version})
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => downloadInspectionDossierPdf(insp.id, insp.title)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00C896]/15 hover:bg-[#00C896]/30 text-[#00C896] font-bold text-[11px] border border-[#00C896]/30 transition-all shadow-sm active:scale-95"
                    >
                      <FileDown className="w-3 h-3" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TechnicalPanel>
    </div>
  );
}
