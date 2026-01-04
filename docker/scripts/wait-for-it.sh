#!/bin/sh
# ============================================
# Script d'attente de disponibilité d'un service
# Usage: wait-for-it.sh host:port [-t timeout] [-- command args]
# ============================================

TIMEOUT=30
QUIET=0
HOST=""
PORT=""

usage() {
    echo "Usage: $0 host:port [-t timeout] [-q] [-- command args]"
    echo "  -t TIMEOUT    Timeout en secondes (défaut: 30)"
    echo "  -q            Mode silencieux"
    echo "  -- COMMAND    Commande à exécuter après connexion"
    exit 1
}

wait_for() {
    if [ $QUIET -eq 0 ]; then
        echo "Attente de $HOST:$PORT..."
    fi

    elapsed=0
    while ! nc -z "$HOST" "$PORT" 2>/dev/null; do
        if [ $elapsed -ge $TIMEOUT ]; then
            echo "Timeout après ${TIMEOUT}s en attendant $HOST:$PORT"
            return 1
        fi
        sleep 1
        elapsed=$((elapsed + 1))
    done

    if [ $QUIET -eq 0 ]; then
        echo "$HOST:$PORT est disponible après ${elapsed}s"
    fi
    return 0
}

# Parse arguments
while [ $# -gt 0 ]; do
    case "$1" in
        *:* )
            HOST=$(echo "$1" | cut -d: -f1)
            PORT=$(echo "$1" | cut -d: -f2)
            shift
            ;;
        -t)
            TIMEOUT="$2"
            shift 2
            ;;
        -q)
            QUIET=1
            shift
            ;;
        --)
            shift
            break
            ;;
        *)
            usage
            ;;
    esac
done

if [ -z "$HOST" ] || [ -z "$PORT" ]; then
    usage
fi

wait_for
result=$?

if [ $result -ne 0 ]; then
    exit $result
fi

# Exécuter la commande si fournie
if [ $# -gt 0 ]; then
    exec "$@"
fi
