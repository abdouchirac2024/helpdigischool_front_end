import { NextResponse } from 'next/server'

// Compteurs en memoire (reset au redemarrage)
const metrics = {
  httpRequestsTotal: 0,
  httpErrorsTotal: 0,
  startTime: Date.now(),
}

/**
 * GET /api/metrics
 * Endpoint Prometheus au format OpenMetrics/text
 */
export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - metrics.startTime) / 1000)

  // Metriques memoire Node.js
  const memUsage = process.memoryUsage()

  const body = [
    '# HELP helpdigischool_up Frontend is up',
    '# TYPE helpdigischool_up gauge',
    'helpdigischool_up 1',
    '',
    '# HELP helpdigischool_uptime_seconds Uptime in seconds',
    '# TYPE helpdigischool_uptime_seconds gauge',
    `helpdigischool_uptime_seconds ${uptimeSeconds}`,
    '',
    '# HELP helpdigischool_http_requests_total Total HTTP requests',
    '# TYPE helpdigischool_http_requests_total counter',
    `helpdigischool_http_requests_total ${metrics.httpRequestsTotal}`,
    '',
    '# HELP helpdigischool_http_errors_total Total HTTP errors',
    '# TYPE helpdigischool_http_errors_total counter',
    `helpdigischool_http_errors_total ${metrics.httpErrorsTotal}`,
    '',
    '# HELP helpdigischool_nodejs_heap_used_bytes Node.js heap used',
    '# TYPE helpdigischool_nodejs_heap_used_bytes gauge',
    `helpdigischool_nodejs_heap_used_bytes ${memUsage.heapUsed}`,
    '',
    '# HELP helpdigischool_nodejs_heap_total_bytes Node.js heap total',
    '# TYPE helpdigischool_nodejs_heap_total_bytes gauge',
    `helpdigischool_nodejs_heap_total_bytes ${memUsage.heapTotal}`,
    '',
    '# HELP helpdigischool_nodejs_rss_bytes Node.js RSS memory',
    '# TYPE helpdigischool_nodejs_rss_bytes gauge',
    `helpdigischool_nodejs_rss_bytes ${memUsage.rss}`,
    '',
    '# HELP helpdigischool_nodejs_external_bytes Node.js external memory',
    '# TYPE helpdigischool_nodejs_external_bytes gauge',
    `helpdigischool_nodejs_external_bytes ${memUsage.external}`,
    '',
  ].join('\n')

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
    },
  })
}
