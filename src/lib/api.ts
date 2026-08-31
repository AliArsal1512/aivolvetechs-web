/**
 * Resolves API paths for both Vercel production and local Express dev.
 * Set VITE_API_BASE_URL only if the API is hosted on a different origin.
 */
export function getApiUrl(path: string): string {
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? '';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export async function submitInquiry(payload: Record<string, string>): Promise<Response> {
  return fetch(getApiUrl('/api/inquiries'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
