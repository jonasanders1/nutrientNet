"use client";

import { useAppContext } from "@/context/AppContext";
import { MetricCard } from "./metric-card";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Scale, Info } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MetricsPanel() {
  const { messages } = useAppContext();
  const lastAssistantMessageWithMetrics = [...messages]
    .reverse()
    .find((msg) => msg.role === "assistant" && msg.metrics);

  if (
    !lastAssistantMessageWithMetrics ||
    !lastAssistantMessageWithMetrics.metrics
  ) {
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
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold tracking-tight">Performance</h2>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Link href="https://arxiv.org/abs/2309.08655" target="_blank">
                <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Metrics based on the RAGAs paper.</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-3">
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
          <p className="text-xs text-muted-foreground">
            Based on the{" "}
            <a
              href="https://arxiv.org/abs/2309.08655"
              className="text-[#008cff] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ragas framework
            </a>
            , which provides automated evaluation metrics for RAG systems across
            retrieval quality, generation faithfulness, and overall response
            relevance.
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}
