import React from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { OfflineStatusBar } from "@/components/layout/OfflineStatusBar";
import { SafetyDirectivesFooter } from "@/components/layout/SafetyDirectivesFooter";
import { AuditWatchdog } from "@/components/alerts/AuditWatchdog";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050A12] text-[#F1F5F9] font-sans">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <TopNavbar />
        {/* Global Zero-Connectivity Pit Offline Banner */}
        <OfflineStatusBar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto relative z-10">
          {children}
        </main>
        {/* Live Statutory Safety Rules & Status Bar */}
        <SafetyDirectivesFooter />
      </div>

      {/* Global Real-Time Cryptographic Ledger Watchdog & Emergency Alert Modal */}
      <AuditWatchdog />
    </div>
  );
}
