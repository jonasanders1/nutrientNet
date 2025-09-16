'use client';
import { AppHeader } from '@/components/app-header';
import { ChatPanel } from '@/components/chat-panel';
import { MetricsPanel } from '@/components/metrics-panel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-1 grid md:grid-cols-[1fr,450px] gap-4 lg:gap-8 p-4 overflow-hidden">
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          <ChatPanel />
        </div>
        <div className="hidden md:flex flex-col gap-4 overflow-y-auto">
          <MetricsPanel />
        </div>
        <div className="md:hidden fixed bottom-4 right-4 z-20">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" className="rounded-full shadow-lg">
                <PanelRight className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] p-2">
              <MetricsPanel />
            </SheetContent>
          </Sheet>
        </div>
      </main>
    </div>
  );
}
