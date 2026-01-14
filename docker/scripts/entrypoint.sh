#!/bin/sh
# ============================================
# Entrypoint Script
# ============================================

set -e

echo "🚀 Starting Help Digi School Frontend..."
echo "📦 Environment: ${NODE_ENV:-development}"
echo "🌐 API URL: ${NEXT_PUBLIC_API_URL:-not set}"

# Attendre que les services dépendants soient prêts (si nécessaire)
if [ -n "$WAIT_FOR_API" ]; then
    echo "⏳ Waiting for API at ${WAIT_FOR_API}..."
    ./docker/scripts/wait-for-it.sh ${WAIT_FOR_API} --timeout=60 --strict
fi

# Exécuter la commande passée en argument
exec "$@"