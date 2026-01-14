#!/bin/sh
# ============================================
# Health Check Script
# ============================================

set -e

# Configuration
HEALTH_URL="${HEALTH_URL:-http://localhost:3000/api/health}"
TIMEOUT="${HEALTH_TIMEOUT:-5}"

# Vérification de la santé
response=$(wget --spider -q --timeout=${TIMEOUT} ${HEALTH_URL} 2>&1) || exit 1

exit 0