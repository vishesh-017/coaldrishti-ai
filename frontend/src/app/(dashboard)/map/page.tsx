"use client";

import React, { useState, useEffect } from "react";
import { DynamicLeaseholdMap, UndergroundLevel } from "@/components/geospatial";
import { fetchInspections } from "@/lib/api/inspections";
import { fetchUndergroundStations } from "@/lib/api/underground";
import { useAuthStore } from "@/lib/store/auth-store";
import { useTenantStore } from "@/lib/store/tenant-store";
import { Inspection, MineUndergroundStation } from "@/lib/types/domain";
import { Map, HardHat, Compass, ShieldAlert, Layers, CheckCircle, Radio, Sparkles } from "lucide-react";
import { TechnicalPanel, StatutoryBadge } from "@/components/design-system";

export default function GeospatialMapPage() {
  const { activeMineSiteId, activeMineName } = useAuthStore();
  const { selectedMine, selectedMineId } = useTenantStore();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [stations, setStations] = useState<MineUndergroundStation[]>([]);
  const [activeTab, setActiveTab] = useState<"SURFACE" | "UNDERGROUND">("SURFACE");
  const [selectedInspectionId, setSelectedInspectionId] = useState<string | null>(null);

  const effectiveMineId = selectedMineId || activeMineSiteId;
  const effectiveMineName = selectedMine?.name || activeMineName;

  useEffect(() => {
    fetchInspections(effectiveMineId).then(setInspections);
    fetchUndergroundStations(effectiveMineId).then(setStations);
  }, [effectiveMineId]);

  const breachCount = inspections.filter((i) => i.is_geofence_breached).length;

  return (
    <div className="space-y-6">
      {/* ── GEOSPATIAL COMMAND CENTER HEADER ─────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 relative overflow-hidden shadow-2xl corner-ticks">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#00C896]/10 border border-[#00C896]/30 text-[10px] font-mono text-[#00C896] uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              POSTGIS SPATIAL VERIFICATION &bull; GEOFENCE COMMAND
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">
              Geospatial Intelligence &amp; Leasehold Perimeter Map
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Sat-vector polygon boundary cross-checks, illegal mining breach detection &amp; underground seam galleries for{" "}
              <strong className="text-[#00C896] font-mono">{effectiveMineName}</strong>.
            </p>
          </div>

          {/* Mode Switcher: Surface vs Underground */}
          <div className="flex items-center gap-1.5 bg-[#080D16] p-1.5 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab("SURFACE")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "SURFACE"
                  ? "bg-[#00C896] text-[#050A12] shadow-md shadow-[#00C896]/20 font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Surface GPS Leasehold</span>
            </button>

            <button
              onClick={() => setActiveTab("UNDERGROUND")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "UNDERGROUND"
                  ? "bg-[#28B9C7] text-[#050A12] shadow-md shadow-[#28B9C7]/20 font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>Underground Seam Gallery</span>
            </button>
          </div>
        </div>
      </div>

      {/* Geofence Breach Banner if any */}
      {breachCount > 0 && activeTab === "SURFACE" && (
        <div className="p-4 rounded-xl bg-[#FF5C68]/15 border border-[#FF5C68]/40 flex items-center justify-between text-xs text-rose-200 shadow-xl font-mono animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-[#FF5C68] shrink-0" />
            <div>
              <strong className="text-white font-bold uppercase">Critical Geofence Breach Alert:</strong>{" "}
              {breachCount} audit observation(s) logged outside statutory PostGIS leasehold polygon!
            </div>
          </div>
          <span className="text-[10px] bg-rose-600 text-white font-bold px-2.5 py-0.5 rounded">
            CMR 2017 Reg 108
          </span>
        </div>
      )}

      {/* ── MAP CONTAINER ────────────────────────────────────────────────── */}
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#080D16] shadow-2xl">
        {activeTab === "SURFACE" ? (
          <DynamicLeaseholdMap
            inspections={inspections}
            selectedInspectionId={selectedInspectionId}
            onSelectInspection={(id) => setSelectedInspectionId(id)}
            activeMine={selectedMine}
          />
        ) : (
          <UndergroundLevel stations={stations} inspections={inspections} />
        )}
      </div>
    </div>
  );
}
