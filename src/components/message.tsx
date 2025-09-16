import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  
  if (message.content === '...') { // Loading state
      return (
        <div className="flex items-start gap-4 animate-pulse">
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
    <div className={cn('flex items-start gap-4', isUser ? 'justify-end' : '')}>
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
