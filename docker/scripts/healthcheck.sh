#!/bin/sh
# ============================================
# Script de Healthcheck pour HelpDigiSchool
# ============================================

set -e

# Configuration
HEALTH_URL="${HEALTH_URL:-http://localhost:3000/api/health}"
TIMEOUT="${HEALTH_TIMEOUT:-5}"

# Vérification de la santé
response=$(wget --no-verbose --tries=1 --timeout="${TIMEOUT}" --spider "${HEALTH_URL}" 2>&1) || {
    echo "Healthcheck failed: ${response}"
    exit 1
}

echo "Healthcheck passed"
exit 0
