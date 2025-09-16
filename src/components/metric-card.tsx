import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface MetricCardProps {
  name: string;
  score: number;
  explanation: string;
  linkTo: string;
}

export function MetricCard({ name, score, explanation, linkTo }: MetricCardProps) {
  return (
    <Link href={linkTo} className="group">
      <Card className="hover:border-primary/50 hover:bg-secondary/50 transition-colors">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base font-medium">{name}</CardTitle>
              <CardDescription className="text-sm mt-1">{explanation}</CardDescription>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 flex-shrink-0 mt-1" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-headline tracking-tighter">
              {score.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">/ 1.00</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
