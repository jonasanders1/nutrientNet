'use client';
import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export function ChatMessage({ message }: { message: Message }) {
  const { modelName } = useAppContext();
  const isUser = message.role === 'user';
  
  if (message.content === '...') { // Loading state
      return (
        <div className="flex flex-col gap-2 animate-pulse">
            <div className="font-semibold text-sm">{modelName}</div>
            <div className="flex-1 rounded-lg bg-secondary p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader className="animate-spin h-4 w-4" />
                    <span>Thinking...</span>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className={cn('flex flex-col gap-2', isUser ? 'items-end' : 'items-start')}>
       <div className="font-semibold text-sm">
        {isUser ? 'You' : modelName}
      </div>
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3 shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary'
        )}
      >
        <p className="whitespace-pre-wrap font-code text-sm leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};
