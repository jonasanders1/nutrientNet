'use client';

import { useAppContext } from '@/context/AppContext';
import { MetricCard } from './metric-card';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Scale } from 'lucide-react';

export function MetricsPanel() {
  const { messages } = useAppContext();
  const lastAssistantMessageWithMetrics = [...messages]
    .reverse()
    .find((msg) => msg.role === 'assistant' && msg.metrics);

  if (!lastAssistantMessageWithMetrics || !lastAssistantMessageWithMetrics.metrics) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-center bg-secondary border-dashed">
        <CardHeader>
          <div className="mx-auto bg-muted p-3 rounded-full">
            <Scale className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-lg">Awaiting Analysis</CardTitle>
          <p className="text-muted-foreground mt-2 max-w-xs">
            Metrics will appear here once a response is generated.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { metrics } = lastAssistantMessageWithMetrics;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Response Analysis</h2>
      <MetricCard
        name="Faithfulness"
        score={metrics.faithfulness}
        explanation="Does the answer contradict the source documents?"
        linkTo="/faithfulness"
      />
      <MetricCard
        name="Answer Relevance"
        score={metrics.answerRelevance}
        explanation="Is the answer relevant to the user's question?"
        linkTo="/answer-relevance"
      />
      <MetricCard
        name="Context Relevance"
        score={metrics.contextRelevance}
        explanation="Are retrieved documents relevant to the question?"
        linkTo="/context-relevance"
      />
    </div>
  );
}
