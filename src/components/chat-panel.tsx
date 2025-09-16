'use client';
import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/components/message';
import { ArrowUp } from 'lucide-react';
import { MOCK_ASSISTANT_MESSAGE } from '@/lib/mock-data';
import { enhanceAnswerQualityWithCoT } from '@/ai/flows/enhance-answer-quality-cot';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@/lib/types';

export function ChatPanel() {
  const { messages, setMessages } = useAppContext();
  const [input, setInput] = useState('');
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

    setIsLoading(true);
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const enhanced = await enhanceAnswerQualityWithCoT({ userPrompt: input });
      
      if (enhanced.reasoning) {
        toast({
          title: "Prompt Enhanced",
          description: "Your prompt was rephrased for better results.",
        });
      }

      // Simulate API call
      setTimeout(() => {
        const assistantMessage: Message = {
          ...MOCK_ASSISTANT_MESSAGE,
          id: `assistant-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Error enhancing prompt or fetching response:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Could not get a response. Please try again.",
      });
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollAreaRef} className="flex-1 space-y-6 overflow-y-auto rounded-lg p-4 custom-scrollbar">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <ChatMessage message={{ id: 'loading', role: 'assistant', content: '...', timestamp: '' }} />}
      </div>
      <form onSubmit={handleSubmit} className="relative mt-4 flex-shrink-0">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about nutrition..."
          className="pr-16 py-3 text-base font-code bg-[#151b21] border-border"
          rows={2}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          disabled={isLoading || !input.trim()}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
