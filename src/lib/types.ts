export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metrics?: Metrics;
}

export interface Source {
  name: string;
  filename: string;
  path: string;
  type: string;
}

// Backend API types
export interface HealthResponse {
  status: string; // e.g., "healthy" | "model_not_loaded"
  model_loaded: boolean;
}

export interface DocumentResponse{
  name: string;
  filename: string;
  path: string;
  type: string;
}

export interface ChatRequest {
  messages: Message[];
  n_results?: number;
}

export interface ChatResponse {
  message: Message;
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
