'use client';
import { MetricDetails } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ContextRelevanceDetail({ details }: { details: MetricDetails }) {
  const totalSentences = details.context.length;
  const extractedCount = details.extractedContextSentences.length;
  
  const extractedSet = new Set(details.extractedContextSentences);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Context Usage Analysis</CardTitle>
          <CardDescription>
            Highlighted sentences were used to formulate the answer. Faded sentences were part of the retrieved context but were not used.
          </CardDescription>
          <div className="text-sm text-muted-foreground pt-2">
            <Badge variant="secondary" className="font-semibold">{extractedCount}</Badge> out of <Badge variant="secondary" className="font-semibold">{totalSentences}</Badge> context sentences were used.
          </div>
        </CardHeader>
        <CardContent className="space-y-3 font-code text-sm leading-relaxed">
          {details.context.map((sentence, i) => (
            <p key={i}>
              <span className={extractedSet.has(sentence) ? 'bg-primary/20 rounded p-1 transition-all' : 'opacity-50 transition-all'}>
                {sentence}
              </span>
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
