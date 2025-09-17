"use client";
import { MetricDetails } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function AnswerRelevanceDetail({ details }: { details: MetricDetails }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generated Questions vs. Original Answer</CardTitle>
          <CardDescription>
            These questions were generated from the assistant's answer. Their
            similarity to your original question indicates relevance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Generated Question</TableHead>
                  <TableHead className="text-right">Similarity Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details.generatedQuestions.map((q, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-code text-sm">{q.q}</TableCell>
                    <TableCell className="text-right font-headline text-sm">
                      {(q.sim * 100).toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
