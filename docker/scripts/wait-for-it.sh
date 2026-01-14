#!/bin/sh
# ============================================
# Wait-for-it Script (Alpine compatible)
# ============================================
# Attendre qu'un service soit disponible

TIMEOUT=30
QUIET=0
HOST=""
PORT=""

usage() {
    echo "Usage: $0 host:port [-t timeout] [-- command args]"
    exit 1
}

wait_for() {
    for i in $(seq $TIMEOUT); do
        nc -z "$HOST" "$PORT" > /dev/null 2>&1 && return 0
        sleep 1
    done
    return 1
}

while [ $# -gt 0 ]; do
    case "$1" in
        *:* )
            HOST=$(echo "$1" | cut -d: -f1)
            PORT=$(echo "$1" | cut -d: -f2)
            shift
            ;;
        -t|--timeout)
            TIMEOUT="$2"
            shift 2
            ;;
        -q|--quiet)
            QUIET=1
            shift
            ;;
        --strict)
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

if [ $QUIET -eq 0 ]; then
    echo "Waiting for $HOST:$PORT..."
fi

if wait_for; then
    if [ $QUIET -eq 0 ]; then
        echo "$HOST:$PORT is available"
    fi
    exec "$@"
else
    echo "Timeout waiting for $HOST:$PORT"
    exit 1
fi