'use client';
import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

const getScoreColorClass = (score: number) => {
  if (score < 50) return 'bg-[#e06c75]'; // Red
  if (score < 80) return 'bg-[#e5c07b]'; // Yellow
  return 'bg-[#98c379]'; // Green
};

const MetricProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { value: number }
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn('h-full w-full flex-1 transition-all', getScoreColorClass(value))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
MetricProgress.displayName = 'MetricProgress';

export { MetricProgress };
