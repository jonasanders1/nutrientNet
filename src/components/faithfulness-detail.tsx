'use client';
import { MetricDetails } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HighlightedContextProps {
  fullContext: string[];
  highlightedSentences: string[];
}

const HighlightedContext = ({ fullContext, highlightedSentences }: HighlightedContextProps) => {
  const highlightedSet = new Set(highlightedSentences);
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {fullContext.map((sentence, i) => (
        <p
          key={i}
          className={highlightedSet.has(sentence) ? 'bg-primary/20 rounded p-1' : 'opacity-60'}
        >
          {sentence}
        </p>
      ))}
    </div>
  );
};

export function FaithfulnessDetail({ details }: { details: MetricDetails }) {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Statement Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60%]">Statement</TableHead>
                    <TableHead className="text-center">Verdict</TableHead>
                    <TableHead className="text-right">Reasoning</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.statements.map((stmt, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-code text-sm">{stmt.text}</TableCell>
                      <TableCell className="text-center">
                        {stmt.supported ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="flex justify-end">
                         <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                             <button><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{stmt.explanation}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Supporting Context</CardTitle>
          </CardHeader>
          <CardContent>
             <HighlightedContext fullContext={details.context} highlightedSentences={details.extractedContextSentences} />
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
