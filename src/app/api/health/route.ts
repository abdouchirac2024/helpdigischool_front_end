/**
 * Health Check Endpoint
 * Utilisé par Docker et les load balancers pour vérifier l'état de l'application
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'helpdigischool-frontend',
      version: process.env.npm_package_version || '1.0.0',
    },
    { status: 200 }
  );
}