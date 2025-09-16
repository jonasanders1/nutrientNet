'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { MetricProgress } from './metric-progress';

interface MetricDetailPageProps {
  metricName: string;
  score: number;
  definition: string;
  children: React.ReactNode;
}

export function MetricDetailPage({ metricName, score, definition, children }: MetricDetailPageProps) {
  const scorePercentage = Math.round(score * 100);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button asChild variant="ghost" className="-ml-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chat
            </Link>
          </Button>
        </div>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline">{metricName}</CardTitle>
            <CardDescription className="text-base pt-2">{definition}</CardDescription>
            <div className="flex items-center gap-4 pt-4">
              <span className="text-3xl font-bold font-headline">{scorePercentage}%</span>
              <MetricProgress value={scorePercentage} className="h-3 flex-1" />
            </div>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
