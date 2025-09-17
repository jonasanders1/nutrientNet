"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { ArrowLeft } from "lucide-react";
import { MetricProgress } from "./metric-progress";
import RouterBreadcrumbs from "./ui/Breadcrumb";

interface MetricDetailPageProps {
  metricName: string;
  score: number;
  definition: string;
  children: React.ReactNode;
}

export function MetricDetailPage({
  metricName,
  score,
  definition,
  children,
}: MetricDetailPageProps) {
  const scorePercentage = Math.round(score * 100);

  return (
    <div className="min-h-screen bg-background text-foreground p-2 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="py-5">
          <RouterBreadcrumbs />
        </div>

        <div className="space-y-6">
          <header>
            <h3 className="text-3xl font-bold font-headline">{metricName}</h3>
            <div className="text-base pt-2">{definition}</div>
            <div className="flex items-center gap-4 pt-4">
              <span className="text-3xl font-bold font-headline">
                {scorePercentage}%
              </span>
              <MetricProgress value={scorePercentage} className="h-3 flex-1" />
            </div>
          </header>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
