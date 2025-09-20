"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import type { Message, Source, ChatRequest } from "@/lib/types";
import { MOCK_CONVERSATION } from "@/lib/mock-data";
import { getHealth, postChat, getSources } from "@/lib/api";

interface AppState {
  messages: Message[];
  sources: Source[];
  isEvaluating: boolean;
  setIsEvaluating: React.Dispatch<React.SetStateAction<boolean>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  modelStatus: "Running" | "Stopped";
  modelName: string;
  sendMessage: (content: string) => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [modelStatus, setModelStatus] = useState<"Running" | "Stopped">(
    "Stopped"
  );
  const [modelName] = useState<string>("Llama 3.1 8B Instruct (Q4)");
  const [sources, setSources] = useState<Source[]>([]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(true);

  // Poll backend health
  useEffect(() => {
    let abort = new AbortController();
    let intervalId: number | undefined;
    const poll = async () => {
      try {
        const health = await getHealth(abort.signal);
        const sources = await getSources();
        setSources(sources);
        setModelStatus(health.model_loaded ? "Running" : "Stopped");
      } catch (_) {
        setModelStatus("Stopped");
      }
    };
    poll();
    // every 10s
    intervalId = window.setInterval(poll, 10000);
    return () => {
      abort.abort();
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      try {
        const base = Array.isArray(messages) ? messages : [];
        const payload: ChatRequest = {
          messages: [...base, userMessage],
          isEvaluating,
        };
        const { message } = await postChat(payload);
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        // On error, remove the optimistic user message
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
        throw error;
      }
    },
    [messages, isEvaluating]
  );

  const value = useMemo(
    () => ({
      messages,
      sources,
      isEvaluating,
      setIsEvaluating,
      setMessages,
      modelStatus,
      modelName,
      sendMessage,
    }),
    [messages, sources, isEvaluating, modelStatus, modelName, sendMessage]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
