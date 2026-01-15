#!/bin/bash
# ============================================
# Help Digi School - Infrastructure Validation Script
# ============================================
# Usage: ./docker/scripts/validate-infra.sh [env]
# env: dev | preprod | prod | all (default: all)
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Emojis
CHECK="✓"
CROSS="✗"
ARROW="→"
WARN="⚠️"

# Variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
ENV="${1:-all}"
ERRORS=0

# Functions
log_info() {
    echo -e "${CYAN}${ARROW}${NC} $1"
}

log_success() {
    echo -e "${GREEN}${CHECK}${NC} $1"
}

log_error() {
    echo -e "${RED}${CROSS}${NC} $1"
    ERRORS=$((ERRORS + 1))
}

log_warning() {
    echo -e "${YELLOW}${WARN}${NC} $1"
}

header() {
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}  ${GREEN}$1${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
}

# ============================================
# VALIDATION FUNCTIONS
# ============================================

validate_docker_installed() {
    header "Checking Docker Installation"

    if command -v docker &> /dev/null; then
        log_success "Docker installed: $(docker --version)"
    else
        log_error "Docker is not installed"
        return 1
    fi

    if command -v docker compose &> /dev/null; then
        log_success "Docker Compose installed: $(docker compose version)"
    else
        log_error "Docker Compose is not installed"
        return 1
    fi

    if docker info &> /dev/null; then
        log_success "Docker daemon is running"
    else
        log_error "Docker daemon is not running"
        return 1
    fi
}

validate_files_exist() {
    header "Checking Required Files"

    local files=(
        "docker/Dockerfile"
        "docker/compose/docker-compose.yml"
        "docker/compose/docker-compose.dev.yml"
        "docker/compose/docker-compose.preprod.yml"
        "docker/compose/docker-compose.prod.yml"
        "Makefile"
        "package.json"
    )

    for file in "${files[@]}"; do
        if [ -f "$PROJECT_ROOT/$file" ]; then
            log_success "Found: $file"
        else
            log_error "Missing: $file"
        fi
    done
}

validate_env_files() {
    header "Checking Environment Files"

    # Check for .env.example
    if [ -f "$PROJECT_ROOT/.env.example" ]; then
        log_success "Found: .env.example"
    else
        log_warning "Missing: .env.example (template)"
    fi

    # Check for environment-specific .env files
    case "$ENV" in
        dev|all)
            if [ -f "$PROJECT_ROOT/.env.local" ]; then
                log_success "Found: .env.local (development)"
            else
                log_warning "Missing: .env.local - Copy from .env.example"
            fi
            ;;
    esac

    case "$ENV" in
        preprod|all)
            if [ -f "$PROJECT_ROOT/.env.preprod" ]; then
                log_success "Found: .env.preprod"
            else
                log_warning "Missing: .env.preprod - Copy from .env.preprod.example"
            fi
            ;;
    esac

    case "$ENV" in
        prod|all)
            if [ -f "$PROJECT_ROOT/.env.production" ]; then
                log_success "Found: .env.production"
            else
                log_warning "Missing: .env.production - Copy from .env.production.example"
            fi
            ;;
    esac
}

validate_dockerfile() {
    header "Validating Dockerfile"

    local dockerfile="$PROJECT_ROOT/docker/Dockerfile"

    # Check if Dockerfile exists
    if [ ! -f "$dockerfile" ]; then
        log_error "Dockerfile not found"
        return 1
    fi

    # Check for required stages
    local stages=("base" "deps" "development" "builder" "production")
    for stage in "${stages[@]}"; do
        if grep -q "AS $stage" "$dockerfile"; then
            log_success "Stage found: $stage"
        else
            log_error "Missing stage: $stage"
        fi
    done

    # Check for security best practices
    if grep -q "USER" "$dockerfile"; then
        log_success "Non-root user configured"
    else
        log_warning "No non-root user found (security concern)"
    fi

    if grep -q "HEALTHCHECK" "$dockerfile"; then
        log_success "Healthcheck configured"
    else
        log_warning "No healthcheck found"
    fi
}

validate_compose_files() {
    header "Validating Docker Compose Files"

    local compose_dir="$PROJECT_ROOT/docker/compose"

    # Validate each compose file
    local files=("docker-compose.yml" "docker-compose.dev.yml" "docker-compose.preprod.yml" "docker-compose.prod.yml")

    for file in "${files[@]}"; do
        if [ -f "$compose_dir/$file" ]; then
            if docker compose -f "$compose_dir/docker-compose.yml" -f "$compose_dir/$file" config > /dev/null 2>&1; then
                log_success "Valid: $file"
            else
                log_error "Invalid: $file"
            fi
        fi
    done
}

validate_infrastructure() {
    header "Validating Infrastructure"

    local infra_dir="$PROJECT_ROOT/infrastructure"

    # Check Traefik
    if [ -d "$infra_dir/traefik" ]; then
        log_success "Traefik directory exists"
        if [ -f "$infra_dir/traefik/docker-compose.yml" ]; then
            log_success "Traefik compose file found"
        else
            log_warning "Traefik compose file missing"
        fi
    else
        log_warning "Traefik directory not found"
    fi

    # Check Monitoring
    if [ -d "$infra_dir/monitoring" ]; then
        log_success "Monitoring directory exists"
        if [ -f "$infra_dir/monitoring/docker-compose.yml" ]; then
            log_success "Monitoring compose file found"
        else
            log_warning "Monitoring compose file missing"
        fi
    else
        log_warning "Monitoring directory not found"
    fi
}

validate_network_ports() {
    header "Checking Network Ports"

    local ports=()
    case "$ENV" in
        dev)
            ports=(3000 9229)
            ;;
        preprod)
            ports=(32031)
            ;;
        prod)
            ports=(3000)
            ;;
        all)
            ports=(3000 32031 9229)
            ;;
    esac

    for port in "${ports[@]}"; do
        if lsof -i ":$port" > /dev/null 2>&1; then
            log_warning "Port $port is already in use"
        else
            log_success "Port $port is available"
        fi
    done
}

build_test() {
    header "Testing Docker Build (base stage only)"

    log_info "Building base stage..."
    if docker build -f "$PROJECT_ROOT/docker/Dockerfile" --target base -t helpdigischool-test:base "$PROJECT_ROOT" > /dev/null 2>&1; then
        log_success "Base stage builds successfully"
        docker rmi helpdigischool-test:base > /dev/null 2>&1 || true
    else
        log_error "Failed to build base stage"
    fi
}

# ============================================
# MAIN
# ============================================

main() {
    echo ""
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}      ${GREEN}🔍 Help Digi School - Infrastructure Validation${NC}                     ${CYAN}║${NC}"
    echo -e "${CYAN}║${NC}      ${YELLOW}Environment: $ENV${NC}                                                     ${CYAN}║${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    cd "$PROJECT_ROOT"

    validate_docker_installed
    echo ""

    validate_files_exist
    echo ""

    validate_env_files
    echo ""

    validate_dockerfile
    echo ""

    validate_compose_files
    echo ""

    validate_infrastructure
    echo ""

    validate_network_ports
    echo ""

    build_test
    echo ""

    # Summary
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    if [ $ERRORS -eq 0 ]; then
        echo -e "${CYAN}║${NC}      ${GREEN}${CHECK} Validation Complete - All checks passed!${NC}                       ${CYAN}║${NC}"
    else
        echo -e "${CYAN}║${NC}      ${RED}${CROSS} Validation Complete - $ERRORS error(s) found${NC}                        ${CYAN}║${NC}"
    fi
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    exit $ERRORS
}

main "$@"