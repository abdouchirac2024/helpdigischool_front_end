#!/bin/sh
# ============================================
# Entrypoint Script pour HelpDigiSchool
# ============================================

set -e

# Fonction de log
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Gestion des signaux pour arrêt gracieux
cleanup() {
    log "Signal reçu, arrêt gracieux..."
    kill -TERM "$child" 2>/dev/null
    wait "$child"
    exit 0
}

trap cleanup SIGTERM SIGINT SIGQUIT

# Affichage des informations de démarrage
log "=== HelpDigiSchool Frontend ==="
log "Environment: ${NODE_ENV:-development}"
log "Port: ${PORT:-3000}"
log "Hostname: ${HOSTNAME:-0.0.0.0}"

# Vérification des variables requises en production
if [ "$NODE_ENV" = "production" ]; then
    if [ -z "$NEXT_PUBLIC_API_URL" ]; then
        log "WARNING: NEXT_PUBLIC_API_URL n'est pas défini"
    fi
fi

# Attente optionnelle des dépendances
if [ -n "$WAIT_FOR_HOST" ] && [ -n "$WAIT_FOR_PORT" ]; then
    log "Attente de ${WAIT_FOR_HOST}:${WAIT_FOR_PORT}..."
    timeout=${WAIT_TIMEOUT:-30}
    elapsed=0
    while ! nc -z "$WAIT_FOR_HOST" "$WAIT_FOR_PORT" 2>/dev/null; do
        if [ $elapsed -ge $timeout ]; then
            log "ERROR: Timeout en attendant ${WAIT_FOR_HOST}:${WAIT_FOR_PORT}"
            exit 1
        fi
        sleep 1
        elapsed=$((elapsed + 1))
    done
    log "${WAIT_FOR_HOST}:${WAIT_FOR_PORT} est disponible"
fi

# Exécution de la commande principale
log "Démarrage de l'application..."
exec "$@" &
child=$!
wait "$child"
