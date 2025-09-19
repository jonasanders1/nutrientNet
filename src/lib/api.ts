export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

import type {
  ChatRequest,
  ChatResponse,
  DocumentResponse,
  HealthResponse,
  Source,
} from "./types";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE_URL}/health`, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
    cache: "no-store",
  });
  return handleResponse<HealthResponse>(res);
}

export async function getSources(): Promise<Source[]> {
  const res = await fetch(`${API_BASE_URL}/sources`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const data = await handleResponse<DocumentResponse | DocumentResponse[]>(res);
  const list = Array.isArray(data) ? data : [data];
  return list.map((d) => ({
    name: d.name,
    filename: d.filename,
    path: d.path,
    type: d.type,
  }));
}

export async function postChat(
  payload: ChatRequest,
  signal?: AbortSignal
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  return handleResponse<ChatResponse>(res);
}
