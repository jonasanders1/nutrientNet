'use client';

import { useAppContext } from '@/context/AppContext';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { MetricsPanel } from './metrics-panel';
import { PanelRight } from 'lucide-react';


export function AppHeader() {
  const { modelName, modelStatus } = useAppContext();
  const isRunning = modelStatus === 'Running';

  return (
    <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
      <div className="flex flex-col items-start">
        <h1 className="text-xl font-bold text-foreground">NutrientNet</h1>
        <span className="text-sm text-muted-foreground inline md:hidden">{modelName}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden md:inline">{modelName}</span>
        <div className="md:items-center gap-2 hidden md:flex">
          <div className="relative flex h-3 w-3">
            <span className={ `absolute inline-flex h-full w-full rounded-full ${isRunning ? 'bg-green-400' : 'bg-red-400'} opacity-75 animate-ping`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </div>
          <span className="text-sm font-medium">{modelStatus}</span>
        </div>
      </div>
      <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" className="rounded-md bg-accent">
                <PanelRight className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] p-2 bg-[#0f171b]">
              <MetricsPanel />
            </SheetContent>
          </Sheet>
        </div>
    </header>
  );
}
