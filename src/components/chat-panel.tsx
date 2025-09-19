"use client";
import { useState, useRef, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/message";
import { ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EmptyDisplayMessage from "./EmptyDisplayMessage";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export function ChatPanel() {
  const { messages, sendMessage, modelStatus, isEvaluating, setIsEvaluating } =
    useAppContext();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    if (modelStatus !== "Running") {
      toast({
        variant: "destructive",
        title: "Backend not available",
        description: "Model is not running. Check the RAG server.",
      });
      return;
    }

    setIsLoading(true);
    const currentInput = input;
    setInput("");
    try {
      await sendMessage(currentInput);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: "Chat failed",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {messages.length == 0 ? (
        <EmptyDisplayMessage />
      ) : (
        <div
          ref={scrollAreaRef}
          className="flex-1 space-y-6 overflow-y-auto rounded-lg md:p-3 lg:p-4"
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <ChatMessage
              message={{
                id: "loading",
                role: "assistant",
                content: "...",
                timestamp: "",
              }}
            />
          )}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="relative md:mt-4 flex-shrink-0 bg-[#23262d] border border-border rounded-lg focus-within:border-[#697077] m-2 md:m-3 lg:m-4"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about nutrition..."
          autoResize
          maxHeight={200}
          className="pr-12 py-3 text-base bg-transparent border-none resize-none overflow-hidden"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={isLoading}
        />
        <div className="flex justify-between p-3">
          <FormControlLabel
            control={
              <Switch
                onChange={() => setIsEvaluating((prev) => !prev)}
                checked={isEvaluating}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "hsl(var(--accent))",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "hsl(var(--accent))",
                    opacity: 0.3,
                  },
                }}
              />
            }
            label="RAG Evaluation"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.8rem",
                color: "hsl(var(--foreground))",
                opacity: 0.9,
              },
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-accent h-8 w-8 rounded-full"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
