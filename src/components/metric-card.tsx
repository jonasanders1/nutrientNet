import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MetricProgress } from '@/components/metric-progress';
import { ChevronRight } from 'lucide-react';

interface MetricCardProps {
  name: string;
  score: number;
  explanation: string;
  linkTo: string;
}

export function MetricCard({ name, score, explanation, linkTo }: MetricCardProps) {
  const scorePercentage = Math.round(score * 100);

  return (
    <Link href={linkTo} className="group">
      <Card className="hover:border-primary/50 hover:bg-secondary/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">{name}</CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
          <CardDescription className="text-sm">{explanation}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold font-headline">{scorePercentage}%</span>
            <MetricProgress value={scorePercentage} className="h-3 flex-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
