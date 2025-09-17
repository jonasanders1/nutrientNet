"use client";
import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function ChatMessage({ message }: { message: Message }) {
  const { modelName } = useAppContext();
  const isUser = message.role === "user";

  return (
    <div className={cn("flex flex-col gap-1 p-3 md:p-0")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
          isUser
            ? "bg-secondary text-primary-foreground self-end"
            : "bg-secondary/30 self-start"
        )}
      >
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <div className="font-semibold text-sm">
            {isUser ? "You" : modelName}
          </div>
          <div
            className={cn(
              "text-xs",
              isUser ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {message.timestamp}
          </div>
        </div>
        <p
          className={cn(
            "whitespace-pre-wrap text-sm md:text-md leading-relaxed text-foreground"
          )}
        >
          {message.content === "..." ? (
            <div className="flex items-center gap-2 text-sm animate-pulse">
              <Loader className="animate-spin h-4 w-4" />
              <span className="">Thinking...</span>
            </div>
          ) : (
            <span>{message.content}</span>
          )}
        </p>
      </div>
    </div>
  );
}
