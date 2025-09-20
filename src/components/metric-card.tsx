import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

interface MetricCardProps {
  name: string;
  score: number;
  explanation: string;
  linkTo: string;
}

export function MetricCard({
  name,
  score,
  explanation,
  linkTo,
}: MetricCardProps) {
  const { isEvaluating } = useAppContext();
  const disabled = !isEvaluating;

  const cardContent = (
    <Card
      className={`transition-colors ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:border-primary/50 bg-background hover:bg-background/50"
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-medium">{name}</CardTitle>
            <CardDescription className="text-sm mt-1">
              {explanation}
            </CardDescription>
          </div>
          {!disabled && (
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 flex-shrink-0 mt-1" />
          )}
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
  );

  if (disabled) {
    return <div className="group">{cardContent}</div>;
  }

  return (
    <Link href={linkTo} className="group">
      {cardContent}
    </Link>
  );
}
