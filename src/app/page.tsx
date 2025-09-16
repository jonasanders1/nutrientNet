"use client";
import { AppHeader } from "@/components/app-header";
import { ChatPanel } from "@/components/chat-panel";
import { MetricsPanel } from "@/components/metrics-panel";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PanelRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col h-screen text-foreground bg-background">
      <AppHeader />
      <main className="flex-1 grid md:grid-cols-[1fr_auto] overflow-hidden">
        <div className="flex flex-col gap-4 overflow-y-auto">
          <ChatPanel />
        </div>
        <div className="hidden md:flex flex-col gap-6 overflow-y-auto border-l border-border w-[320px] lg:w-[384px] p-4 bg-[#23262d]">
          <MetricsPanel />
        </div>
      </main>
    </div>
  );
}
