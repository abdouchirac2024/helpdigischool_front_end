/**
 * Prometheus Metrics Endpoint
 * Expose les métriques pour le monitoring
 */

import { NextResponse } from 'next/server';

// Métriques simples en mémoire (pour production, utilisez prom-client)
const metrics = {
  requestCount: 0,
  errorCount: 0,
  startTime: Date.now(),
};

// Incrémenter le compteur de requêtes
metrics.requestCount++;

export async function GET() {
  const uptime = Math.floor((Date.now() - metrics.startTime) / 1000);

  // Format Prometheus
  const metricsOutput = `
# HELP helpdigischool_up Application status (1 = up, 0 = down)
# TYPE helpdigischool_up gauge
helpdigischool_up 1

# HELP helpdigischool_uptime_seconds Application uptime in seconds
# TYPE helpdigischool_uptime_seconds counter
helpdigischool_uptime_seconds ${uptime}

# HELP helpdigischool_requests_total Total number of requests
# TYPE helpdigischool_requests_total counter
helpdigischool_requests_total ${metrics.requestCount}

# HELP helpdigischool_errors_total Total number of errors
# TYPE helpdigischool_errors_total counter
helpdigischool_errors_total ${metrics.errorCount}

# HELP helpdigischool_nodejs_heap_size_bytes Node.js heap size in bytes
# TYPE helpdigischool_nodejs_heap_size_bytes gauge
helpdigischool_nodejs_heap_size_bytes ${process.memoryUsage().heapUsed}

# HELP helpdigischool_nodejs_external_bytes Node.js external memory in bytes
# TYPE helpdigischool_nodejs_external_bytes gauge
helpdigischool_nodejs_external_bytes ${process.memoryUsage().external}

# HELP helpdigischool_info Application information
# TYPE helpdigischool_info gauge
helpdigischool_info{version="${process.env.npm_package_version || '1.0.0'}",node_version="${process.version}",environment="${process.env.NODE_ENV || 'development'}"} 1
`.trim();

  return new NextResponse(metricsOutput, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
