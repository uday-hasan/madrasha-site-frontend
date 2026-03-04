/**
 * API Proxy Configuration
 *
 * When the Express backend is ready, add the following to next.config.ts:
 *
 * async rewrites() {
 *   return [
 *     {
 *       source: '/api/v1/:path*',
 *       destination: 'http://localhost:5000/api/v1/:path*',
 *     },
 *   ];
 * },
 *
 * This will proxy all /api/v1/* requests to the Express backend.
 * The frontend makes requests to /api/v1/... and Next.js proxies them.
 *
 * Benefits:
 * - No CORS issues
 * - Hides backend URL from client
 * - Works seamlessly in development and production
 */

export const PROXY_CONFIG = {
  source: "/api/v1/:path*",
  destination: "http://localhost:5000/api/v1/:path*",
} as const;
