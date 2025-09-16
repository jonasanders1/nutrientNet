'use client';

import { useAppContext } from '@/context/AppContext';

export function AppHeader() {
  const { modelName, modelStatus } = useAppContext();
  const isRunning = modelStatus === 'Running';

  return (
    <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-foreground">NutrientNet</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:inline">{modelName}</span>
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className={ `absolute inline-flex h-full w-full rounded-full ${isRunning ? 'bg-green-400' : 'bg-red-400'} opacity-75 animate-ping`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </div>
          <span className="text-sm font-medium">{modelStatus}</span>
        </div>
      </div>
    </header>
  );
}
