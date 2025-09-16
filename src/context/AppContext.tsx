'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { Message } from '@/lib/types';
import { MOCK_CONVERSATION } from '@/lib/mock-data';

interface AppState {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  modelStatus: 'Running' | 'Stopped';
  modelName: string;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(MOCK_CONVERSATION);
  const modelStatus = 'Running';
  const modelName = 'gemini-pro-nutri';

  const value = useMemo(() => ({
    messages,
    setMessages,
    modelStatus,
    modelName,
  }), [messages, modelStatus, modelName]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
