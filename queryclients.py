import { QueryClient, QueryFunction } from "@tanstack/react-query";

/* ===============================
   Base API URL
================================ */
export function getApiUrl(): string {
  const host = process.env.EXPO_PUBLIC_DOMAIN;

  if (!host) {
    throw new Error("API domain is not configured");
  }

  return `https://${host}/`;
}

/* ===============================
   Error Handler
================================ */
async function handleResponse(res: Response) {
  if (!res.ok) {
    const message = (await res.text()) || res.statusText;
    throw new Error(`Error ${res.status}: ${message}`);
  }
}

/* ===============================
   Generic API Request
================================ */
export async function apiRequest(
  method: string,
  route: string,
  data?: unknown
): Promise<Response> {
  const baseUrl = getApiUrl();
  const url = new URL(route, baseUrl);

  const response = await fetch(url.toString(), {
    method,
    headers: data ? { "Content-Type": "application/json" } : undefined,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await handleResponse(response);
  return response;
}

/* ===============================
   React Query Fetch Function
================================ */
type UnauthorizedBehavior = "returnNull" | "throw";

export const createQueryFn =
  <T>({ on401 }: { on401: UnauthorizedBehavior }): QueryFunction<T> =>
  async ({ queryKey }) => {
    const baseUrl = getApiUrl();
    const url = new URL(queryKey.join("/") as string, baseUrl);

    const response = await fetch(url.toString(), {
      credentials: "include",
    });

    if (on401 === "returnNull" && response.status === 401) {
      return null as T;
    }

    await handleResponse(response);
    return response.json();
  };

/* ===============================
   Query Client Configuration
================================ */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: createQueryFn({ on401: "throw" }),
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});