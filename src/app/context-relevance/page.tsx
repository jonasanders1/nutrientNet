"use client";
import { useAppContext } from "@/context/AppContext";
import { MetricDetailPage } from "@/components/metric-detail-page";
import { ContextRelevanceDetail } from "@/components/context-relevance-detail";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Scale } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContextRelevancePage() {
  const { messages } = useAppContext();
  const lastAssistantMessageWithMetrics = [...messages]
    .reverse()
    .find((msg) => msg.role === "assistant" && msg.metrics);

  if (
    !lastAssistantMessageWithMetrics ||
    !lastAssistantMessageWithMetrics.metrics
  ) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center p-4">
        <Card className="w-full max-w-md bg-secondary border-dashed">
          <CardHeader>
            <div className="mx-auto bg-muted p-3 rounded-full">
              <Scale className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg">No Data Available</CardTitle>
            <p className="text-muted-foreground mt-2">
              Generate a response in the chat to see metric details.
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Back to Chat</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { metrics } = lastAssistantMessageWithMetrics;
  const definition =
    "Measures how much of the provided context was actually used to formulate the answer. A low score might indicate that the context was not very useful for the given question.";

  return (
    <MetricDetailPage
      metricName="Context Relevance"
      score={metrics.contextRelevance}
      definition={definition}
    >
      <ContextRelevanceDetail details={metrics.details} />
    </MetricDetailPage>
  );
}
