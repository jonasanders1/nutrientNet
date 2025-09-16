export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  metrics?: Metrics;
}

export interface Metrics {
  faithfulness: number;
  answerRelevance: number;
  contextRelevance: number;
  details: MetricDetails;
}

export interface StatementDetail {
  text: string;
  supported: boolean;
  explanation: string;
}

export interface GeneratedQuestionDetail {
  q: string;
  sim: number;
}

export interface MetricDetails {
  statements: StatementDetail[];
  generatedQuestions: GeneratedQuestionDetail[];
  extractedContextSentences: string[];
  context: string[];
}
