'use client';
import { AppHeader } from '@/components/app-header';
import { ChatPanel } from '@/components/chat-panel';
import { MetricsPanel } from '@/components/metrics-panel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col h-screen text-foreground bg-[#11191d]">
      <AppHeader />
      <main className="flex-1 grid md:grid-cols-[1fr_auto] overflow-hidden">
        <div className="flex flex-col gap-4 overflow-y-auto p-4 pr-2">
          <ChatPanel />
        </div>
        <div className="hidden md:flex flex-col gap-6 overflow-y-auto border-l border-border w-[320px] p-4 bg-[#0f171b]">
          <MetricsPanel />
        </div>
        <div className="md:hidden fixed bottom-4 right-4 z-20">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" className="rounded-full shadow-lg">
                <PanelRight className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] p-2 bg-[#0f171b]">
              <MetricsPanel />
            </SheetContent>
          </Sheet>
        </div>
      </main>
    </div>
  );
}
