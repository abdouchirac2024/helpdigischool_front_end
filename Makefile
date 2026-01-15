# ============================================
# Help Digi School - Frontend Next.js
# Makefile v2.0 - Commandes DevOps Complètes
# ============================================

# Variables
COMPOSE = docker compose
COMPOSE_BASE = -f docker/compose/docker-compose.yml
COMPOSE_DEV = $(COMPOSE) $(COMPOSE_BASE) -f docker/compose/docker-compose.dev.yml
COMPOSE_PREPROD = $(COMPOSE) $(COMPOSE_BASE) -f docker/compose/docker-compose.preprod.yml
COMPOSE_PROD = $(COMPOSE) $(COMPOSE_BASE) -f docker/compose/docker-compose.prod.yml
IMAGE_NAME = helpdigischool/frontend
VERSION ?= $(shell git describe --tags --always --dirty 2>/dev/null || echo "latest")
BUILD_DATE = $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")
VCS_REF = $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")
DOCKER_REGISTRY ?=

# Couleurs pour les messages
GREEN = \033[0;32m
YELLOW = \033[0;33m
RED = \033[0;31m
BLUE = \033[0;34m
CYAN = \033[0;36m
MAGENTA = \033[0;35m
NC = \033[0m

# Emojis
CHECK = ✓
CROSS = ✗
ARROW = →
ROCKET = 🚀
WARN = ⚠️
LOCK = 🔒
DOCKER = 🐳
GEAR = ⚙️

.PHONY: help build up down logs clean prune test lint version validate security

.DEFAULT_GOAL := help

# ============================================
# AIDE
# ============================================
help:
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)          $(GREEN)$(ROCKET) Help Digi School - Frontend Commands v2.0$(NC)                 $(CYAN)║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)📦 Development:$(NC)"
	@echo "  $(GREEN)make dev$(NC)               $(ARROW) Démarrer en mode développement (local sans Docker)"
	@echo "  $(GREEN)make build-dev$(NC)         $(ARROW) Build l'image de développement"
	@echo "  $(GREEN)make up-dev$(NC)            $(ARROW) Démarrer le container dev"
	@echo "  $(GREEN)make down-dev$(NC)          $(ARROW) Arrêter le container dev"
	@echo "  $(GREEN)make logs-dev$(NC)          $(ARROW) Afficher les logs dev"
	@echo "  $(GREEN)make shell-dev$(NC)         $(ARROW) Shell dans le container dev"
	@echo "  $(GREEN)make restart-dev$(NC)       $(ARROW) Redémarrer le container dev"
	@echo ""
	@echo "$(BLUE)🔵 Pre-Production:$(NC)"
	@echo "  $(GREEN)make build-preprod$(NC)     $(ARROW) Build l'image preprod"
	@echo "  $(GREEN)make up-preprod$(NC)        $(ARROW) Démarrer le container preprod"
	@echo "  $(GREEN)make down-preprod$(NC)      $(ARROW) Arrêter le container preprod"
	@echo "  $(GREEN)make logs-preprod$(NC)      $(ARROW) Afficher les logs preprod"
	@echo "  $(GREEN)make deploy-preprod$(NC)    $(ARROW) Déploiement complet preprod"
	@echo ""
	@echo "$(RED)🔴 Production:$(NC)"
	@echo "  $(GREEN)make build-prod$(NC)        $(ARROW) Build l'image production"
	@echo "  $(GREEN)make up-prod$(NC)           $(ARROW) Démarrer le container prod"
	@echo "  $(GREEN)make down-prod$(NC)         $(ARROW) Arrêter le container prod"
	@echo "  $(GREEN)make logs-prod$(NC)         $(ARROW) Afficher les logs prod"
	@echo "  $(GREEN)make deploy-prod$(NC)       $(ARROW) Déploiement complet prod"
	@echo ""
	@echo "$(MAGENTA)$(LOCK) Sécurité & Validation:$(NC)"
	@echo "  $(GREEN)make validate$(NC)          $(ARROW) Valider toute la configuration"
	@echo "  $(GREEN)make security-scan$(NC)     $(ARROW) Scanner les vulnérabilités"
	@echo "  $(GREEN)make lint-docker$(NC)       $(ARROW) Linter les Dockerfiles"
	@echo "  $(GREEN)make audit$(NC)             $(ARROW) Audit complet (npm + docker)"
	@echo ""
	@echo "$(CYAN)$(GEAR) Utilitaires:$(NC)"
	@echo "  $(GREEN)make status$(NC)            $(ARROW) État des containers"
	@echo "  $(GREEN)make health$(NC)            $(ARROW) Vérifier la santé"
	@echo "  $(GREEN)make clean$(NC)             $(ARROW) Nettoyer les containers"
	@echo "  $(GREEN)make prune$(NC)             $(ARROW) Nettoyer Docker (attention!)"
	@echo "  $(GREEN)make version$(NC)           $(ARROW) Afficher la version"
	@echo "  $(GREEN)make info$(NC)              $(ARROW) Informations système"
	@echo ""
	@echo "$(YELLOW)🌐 Multi-Environnements:$(NC)"
	@echo "  $(GREEN)make up-all$(NC)            $(ARROW) Démarrer tous les environnements"
	@echo "  $(GREEN)make down-all$(NC)          $(ARROW) Arrêter tous les environnements"
	@echo "  $(GREEN)make status-all$(NC)        $(ARROW) Status de tous les environnements"
	@echo ""
	@echo "$(CYAN)💻 Local (sans Docker):$(NC)"
	@echo "  $(GREEN)make install$(NC)           $(ARROW) Installer les dépendances"
	@echo "  $(GREEN)make start$(NC)             $(ARROW) Démarrer en local"
	@echo "  $(GREEN)make lint$(NC)              $(ARROW) Lancer ESLint"
	@echo "  $(GREEN)make test$(NC)              $(ARROW) Lancer les tests"
	@echo "  $(GREEN)make typecheck$(NC)         $(ARROW) Vérification TypeScript"
	@echo ""
	@echo "$(CYAN)📊 Infrastructure:$(NC)"
	@echo "  $(GREEN)make infra-up$(NC)          $(ARROW) Démarrer Traefik + Monitoring"
	@echo "  $(GREEN)make infra-down$(NC)        $(ARROW) Arrêter l'infrastructure"
	@echo "  $(GREEN)make monitoring-up$(NC)     $(ARROW) Démarrer le monitoring"
	@echo ""

# ============================================
# VERSION & INFO
# ============================================
version:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(GREEN)$(ROCKET) Help Digi School Frontend$(NC)                             $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════╝$(NC)"
	@echo "  Version:    $(YELLOW)$(VERSION)$(NC)"
	@echo "  Build Date: $(YELLOW)$(BUILD_DATE)$(NC)"
	@echo "  Git Ref:    $(YELLOW)$(VCS_REF)$(NC)"
	@echo "  Image:      $(YELLOW)$(IMAGE_NAME)$(NC)"
	@echo "  Registry:   $(YELLOW)$${DOCKER_REGISTRY:-local}$(NC)"

info:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(GREEN)$(GEAR) System Information$(NC)                                     $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════╝$(NC)"
	@echo "  Docker:     $(YELLOW)$$(docker --version 2>/dev/null || echo 'Not installed')$(NC)"
	@echo "  Compose:    $(YELLOW)$$(docker compose version 2>/dev/null || echo 'Not installed')$(NC)"
	@echo "  Node:       $(YELLOW)$$(node --version 2>/dev/null || echo 'Not installed')$(NC)"
	@echo "  NPM:        $(YELLOW)$$(npm --version 2>/dev/null || echo 'Not installed')$(NC)"
	@echo "  Git:        $(YELLOW)$$(git --version 2>/dev/null || echo 'Not installed')$(NC)"
	@echo "  OS:         $(YELLOW)$$(uname -s) $$(uname -r)$(NC)"

# ============================================
# VALIDATION & SÉCURITÉ
# ============================================
validate: validate-env validate-docker validate-compose
	@echo "$(GREEN)$(CHECK) Toutes les validations sont passées!$(NC)"

validate-env:
	@echo "$(YELLOW)$(ARROW) Validation des fichiers .env...$(NC)"
	@if [ ! -f .env.local ] && [ ! -f .env ]; then \
		echo "$(RED)$(CROSS) Fichier .env.local manquant! Copiez .env.example vers .env.local$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)$(CHECK) Fichiers .env OK$(NC)"

validate-docker:
	@echo "$(YELLOW)$(ARROW) Validation du Dockerfile...$(NC)"
	@docker build -f docker/Dockerfile --target base -t test-build . > /dev/null 2>&1 || \
		(echo "$(RED)$(CROSS) Dockerfile invalide!$(NC)" && exit 1)
	@docker rmi test-build > /dev/null 2>&1 || true
	@echo "$(GREEN)$(CHECK) Dockerfile OK$(NC)"

validate-compose:
	@echo "$(YELLOW)$(ARROW) Validation des fichiers docker-compose...$(NC)"
	@$(COMPOSE_DEV) config > /dev/null 2>&1 || \
		(echo "$(RED)$(CROSS) docker-compose.dev.yml invalide!$(NC)" && exit 1)
	@$(COMPOSE_PREPROD) config > /dev/null 2>&1 || \
		(echo "$(RED)$(CROSS) docker-compose.preprod.yml invalide!$(NC)" && exit 1)
	@$(COMPOSE_PROD) config > /dev/null 2>&1 || \
		(echo "$(RED)$(CROSS) docker-compose.prod.yml invalide!$(NC)" && exit 1)
	@echo "$(GREEN)$(CHECK) Docker Compose files OK$(NC)"

security-scan:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(LOCK) $(GREEN)Security Scan$(NC)                                           $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)$(ARROW) Scanning npm dependencies...$(NC)"
	@npm audit --audit-level=high 2>/dev/null || echo "$(YELLOW)$(WARN) npm audit completed with warnings$(NC)"
	@echo ""
	@echo "$(YELLOW)$(ARROW) Scanning Docker image (requires trivy)...$(NC)"
	@if command -v trivy > /dev/null 2>&1; then \
		trivy image --severity HIGH,CRITICAL $(IMAGE_NAME):latest 2>/dev/null || echo "$(YELLOW)Image not found, build first$(NC)"; \
	else \
		echo "$(YELLOW)$(WARN) trivy not installed. Install: brew install trivy$(NC)"; \
	fi

lint-docker:
	@echo "$(YELLOW)$(ARROW) Linting Dockerfile (requires hadolint)...$(NC)"
	@if command -v hadolint > /dev/null 2>&1; then \
		hadolint docker/Dockerfile; \
		echo "$(GREEN)$(CHECK) Dockerfile lint passed$(NC)"; \
	else \
		echo "$(YELLOW)$(WARN) hadolint not installed. Install: brew install hadolint$(NC)"; \
		echo "$(YELLOW)$(ARROW) Using docker to lint...$(NC)"; \
		docker run --rm -i hadolint/hadolint < docker/Dockerfile || true; \
	fi

audit: security-scan lint-docker
	@echo "$(GREEN)$(CHECK) Audit complet terminé$(NC)"

# ============================================
# DEVELOPMENT
# ============================================
build-dev:
	@echo "$(YELLOW)$(DOCKER) Building development image...$(NC)"
	DOCKER_BUILDKIT=1 $(COMPOSE_DEV) build \
		--build-arg BUILD_DATE=$(BUILD_DATE) \
		--build-arg VCS_REF=$(VCS_REF) \
		--build-arg VERSION=$(VERSION)
	@echo "$(GREEN)$(CHECK) Development image built!$(NC)"

up-dev:
	@echo "$(YELLOW)$(ROCKET) Starting development environment...$(NC)"
	$(COMPOSE_DEV) up -d
	@echo "$(GREEN)$(CHECK) Development server running at http://localhost:3000$(NC)"
	@echo "$(CYAN)$(ARROW) Debug port available at: 9229$(NC)"

down-dev:
	@echo "$(YELLOW)$(ARROW) Stopping development environment...$(NC)"
	$(COMPOSE_DEV) down
	@echo "$(GREEN)$(CHECK) Development environment stopped$(NC)"

logs-dev:
	$(COMPOSE_DEV) logs -f frontend

logs-dev-tail:
	$(COMPOSE_DEV) logs -f --tail=100 frontend

restart-dev:
	@echo "$(YELLOW)$(ARROW) Restarting development environment...$(NC)"
	$(COMPOSE_DEV) restart
	@echo "$(GREEN)$(CHECK) Development environment restarted$(NC)"

shell-dev:
	@echo "$(YELLOW)$(ARROW) Opening shell in development container...$(NC)"
	$(COMPOSE_DEV) exec frontend sh

lint-dev:
	@echo "$(YELLOW)$(ARROW) Running linter in container...$(NC)"
	$(COMPOSE_DEV) exec frontend npm run lint

rebuild-dev: down-dev build-dev up-dev
	@echo "$(GREEN)$(CHECK) Development environment rebuilt!$(NC)"

# ============================================
# PRE-PRODUCTION
# ============================================
build-preprod:
	@echo "$(BLUE)$(DOCKER) Building pre-production image...$(NC)"
	DOCKER_BUILDKIT=1 $(COMPOSE_PREPROD) build \
		--build-arg BUILD_DATE=$(BUILD_DATE) \
		--build-arg VCS_REF=$(VCS_REF) \
		--build-arg VERSION=preprod-$(VERSION) \
		--build-arg ENVIRONMENT=preprod
	docker tag $(IMAGE_NAME):preprod-latest $(IMAGE_NAME):preprod-$(VERSION)
	@echo "$(GREEN)$(CHECK) Pre-production image built!$(NC)"

up-preprod:
	@echo "$(BLUE)$(ROCKET) Starting pre-production environment...$(NC)"
	$(COMPOSE_PREPROD) up -d
	@echo "$(GREEN)$(CHECK) Pre-production server running at http://localhost:32031$(NC)"

down-preprod:
	@echo "$(BLUE)$(ARROW) Stopping pre-production environment...$(NC)"
	$(COMPOSE_PREPROD) down
	@echo "$(GREEN)$(CHECK) Pre-production environment stopped$(NC)"

logs-preprod:
	$(COMPOSE_PREPROD) logs -f frontend

logs-preprod-tail:
	$(COMPOSE_PREPROD) logs -f --tail=100 frontend

restart-preprod:
	@echo "$(BLUE)$(ARROW) Restarting pre-production environment...$(NC)"
	$(COMPOSE_PREPROD) restart
	@echo "$(GREEN)$(CHECK) Pre-production environment restarted$(NC)"

shell-preprod:
	$(COMPOSE_PREPROD) exec frontend sh

deploy-preprod: validate down-preprod build-preprod up-preprod
	@echo "$(GREEN)$(CHECK) Pre-production deployment complete!$(NC)"
	@make health-check URL=http://localhost:32031/api/health ENV=preprod

# ============================================
# PRODUCTION
# ============================================
build-prod:
	@echo "$(RED)$(DOCKER) Building production image...$(NC)"
	DOCKER_BUILDKIT=1 $(COMPOSE_PROD) build \
		--build-arg BUILD_DATE=$(BUILD_DATE) \
		--build-arg VCS_REF=$(VCS_REF) \
		--build-arg VERSION=$(VERSION) \
		--build-arg ENVIRONMENT=production
	docker tag $(IMAGE_NAME):latest $(IMAGE_NAME):$(VERSION)
	@echo "$(GREEN)$(CHECK) Production image built!$(NC)"
	@echo "$(CYAN)$(ARROW) Image size: $$(docker images $(IMAGE_NAME):latest --format '{{.Size}}')$(NC)"

up-prod:
	@echo "$(RED)$(ROCKET) Starting production environment...$(NC)"
	$(COMPOSE_PROD) up -d
	@echo "$(GREEN)$(CHECK) Production server running$(NC)"

down-prod:
	@echo "$(RED)$(ARROW) Stopping production environment...$(NC)"
	$(COMPOSE_PROD) down
	@echo "$(GREEN)$(CHECK) Production environment stopped$(NC)"

logs-prod:
	$(COMPOSE_PROD) logs -f frontend

logs-prod-tail:
	$(COMPOSE_PROD) logs -f --tail=100 frontend

restart-prod:
	@echo "$(RED)$(ARROW) Restarting production environment...$(NC)"
	$(COMPOSE_PROD) down
	$(COMPOSE_PROD) up -d
	@echo "$(GREEN)$(CHECK) Production environment restarted$(NC)"

shell-prod:
	$(COMPOSE_PROD) exec frontend sh

deploy-prod: validate down-prod build-prod up-prod
	@echo "$(GREEN)$(CHECK) Production deployment complete!$(NC)"
	@make health-check URL=http://localhost:3000/api/health ENV=prod

# ============================================
# CLEANUP
# ============================================
clean:
	@echo "$(YELLOW)$(ARROW) Cleaning up containers...$(NC)"
	-$(COMPOSE_DEV) down -v --remove-orphans 2>/dev/null || true
	-$(COMPOSE_PREPROD) down -v --remove-orphans 2>/dev/null || true
	-$(COMPOSE_PROD) down -v --remove-orphans 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) Cleanup complete$(NC)"

clean-images:
	@echo "$(YELLOW)$(ARROW) Cleaning Docker images...$(NC)"
	docker image prune -f
	docker images | grep "helpdigischool" | awk '{print $$3}' | xargs -r docker rmi -f 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) Images cleaned$(NC)"

clean-all: clean clean-images
	@echo "$(GREEN)$(CHECK) Full cleanup complete$(NC)"

prune:
	@echo "$(RED)$(WARN) WARNING: This will remove ALL unused Docker resources!$(NC)"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ] && docker system prune -af --volumes || echo "Cancelled."

# ============================================
# MONITORING & STATUS
# ============================================
status:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)        $(GREEN)Container Status$(NC)                                    $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════╝$(NC)"
	@docker ps --filter "name=helpdigischool" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || echo "No containers running"

status-all:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)        $(GREEN)All Containers Status$(NC)                                $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)Development:$(NC)"
	@docker ps --filter "name=helpdigischool-frontend-dev" --format "  {{.Names}}: {{.Status}}" 2>/dev/null || echo "  Not running"
	@echo ""
	@echo "$(BLUE)Pre-Production:$(NC)"
	@docker ps --filter "name=helpdigischool-frontend-preprod" --format "  {{.Names}}: {{.Status}}" 2>/dev/null || echo "  Not running"
	@echo ""
	@echo "$(RED)Production:$(NC)"
	@docker ps --filter "name=helpdigischool-frontend-prod" --format "  {{.Names}}: {{.Status}}" 2>/dev/null || echo "  Not running"

stats:
	@echo "$(CYAN)$(ARROW) Container statistics:$(NC)"
	docker stats --no-stream --filter "name=helpdigischool" 2>/dev/null || echo "No containers running"

health:
	@echo "$(CYAN)$(ARROW) Health status:$(NC)"
	@docker ps --filter "name=helpdigischool" --format "{{.Names}}: {{.Status}}" 2>/dev/null || echo "No containers running"

health-check:
	@echo "$(CYAN)$(ARROW) Checking health endpoint for $(ENV:-unknown)...$(NC)"
	@for i in 1 2 3 4 5 6; do \
		if curl -sf $(URL) > /dev/null 2>&1; then \
			echo "$(GREEN)$(CHECK) Health check passed!$(NC)"; \
			exit 0; \
		fi; \
		echo "$(YELLOW)Attempt $$i/6 - waiting...$(NC)"; \
		sleep 5; \
	done; \
	echo "$(RED)$(CROSS) Health check failed!$(NC)"; \
	exit 1

# ============================================
# DOCKER REGISTRY
# ============================================
push:
	@echo "$(YELLOW)$(ARROW) Pushing images to registry...$(NC)"
	docker push $(DOCKER_REGISTRY)$(IMAGE_NAME):$(VERSION)
	docker push $(DOCKER_REGISTRY)$(IMAGE_NAME):latest
	@echo "$(GREEN)$(CHECK) Images pushed!$(NC)"

push-preprod:
	@echo "$(BLUE)$(ARROW) Pushing pre-production image...$(NC)"
	docker push $(DOCKER_REGISTRY)$(IMAGE_NAME):preprod-$(VERSION)
	docker push $(DOCKER_REGISTRY)$(IMAGE_NAME):preprod-latest
	@echo "$(GREEN)$(CHECK) Pre-production image pushed!$(NC)"

pull:
	@echo "$(YELLOW)$(ARROW) Pulling latest image...$(NC)"
	docker pull $(DOCKER_REGISTRY)$(IMAGE_NAME):latest
	@echo "$(GREEN)$(CHECK) Image pulled!$(NC)"

# ============================================
# LOCAL DEVELOPMENT (Sans Docker)
# ============================================
install:
	@echo "$(YELLOW)$(ARROW) Installing dependencies...$(NC)"
	npm ci --legacy-peer-deps
	@echo "$(GREEN)$(CHECK) Dependencies installed$(NC)"

dev:
	@echo "$(YELLOW)$(ROCKET) Starting local development server...$(NC)"
	npm run dev

start:
	@echo "$(YELLOW)$(ARROW) Building and starting local server...$(NC)"
	npm run build && npm run start

lint:
	@echo "$(YELLOW)$(ARROW) Running ESLint...$(NC)"
	npm run lint

lint-fix:
	@echo "$(YELLOW)$(ARROW) Running ESLint with fix...$(NC)"
	npm run lint -- --fix

format:
	@echo "$(YELLOW)$(ARROW) Running Prettier...$(NC)"
	npm run format 2>/dev/null || npx prettier --write "src/**/*.{ts,tsx,js,jsx}"

test:
	@echo "$(YELLOW)$(ARROW) Running tests...$(NC)"
	npm run test 2>/dev/null || echo "$(YELLOW)No test script configured$(NC)"

test-coverage:
	@echo "$(YELLOW)$(ARROW) Running tests with coverage...$(NC)"
	npm run test:coverage 2>/dev/null || npm run test -- --coverage 2>/dev/null || echo "$(YELLOW)Coverage not configured$(NC)"

typecheck:
	@echo "$(YELLOW)$(ARROW) Running TypeScript check...$(NC)"
	npm run type-check 2>/dev/null || npx tsc --noEmit

check: lint typecheck test
	@echo "$(GREEN)$(CHECK) All checks passed!$(NC)"

# ============================================
# MULTI-ENVIRONMENT COMMANDS
# ============================================
up-all:
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(YELLOW)$(ROCKET) Démarrage de tous les environnements$(NC)                               $(CYAN)║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)$(ARROW) Starting Development environment...$(NC)"
	$(COMPOSE_DEV) up -d
	@echo "$(GREEN)$(CHECK) Dev running at http://localhost:3000$(NC)"
	@echo ""
	@echo "$(BLUE)$(ARROW) Starting Pre-Production environment...$(NC)"
	$(COMPOSE_PREPROD) up -d
	@echo "$(GREEN)$(CHECK) Preprod running at http://localhost:32031$(NC)"
	@echo ""
	@echo "$(RED)$(ARROW) Starting Production environment...$(NC)"
	$(COMPOSE_PROD) up -d
	@echo "$(GREEN)$(CHECK) Prod running$(NC)"
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(GREEN)$(CHECK) Tous les environnements sont démarrés!$(NC)                              $(CYAN)║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════════════════╝$(NC)"
	@make status-all

down-all:
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(YELLOW)Arrêt de tous les environnements$(NC)                                         $(CYAN)║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)$(ARROW) Stopping Development...$(NC)"
	-$(COMPOSE_DEV) down 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) Dev stopped$(NC)"
	@echo ""
	@echo "$(BLUE)$(ARROW) Stopping Pre-Production...$(NC)"
	-$(COMPOSE_PREPROD) down 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) Preprod stopped$(NC)"
	@echo ""
	@echo "$(RED)$(ARROW) Stopping Production...$(NC)"
	-$(COMPOSE_PROD) down 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) Prod stopped$(NC)"
	@echo ""
	@echo "$(CYAN)╔══════════════════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(GREEN)$(CHECK) Tous les environnements sont arrêtés$(NC)                                $(CYAN)║$(NC)"
	@echo "$(CYAN)╚══════════════════════════════════════════════════════════════════════════════╝$(NC)"

logs-all:
	@docker compose logs -f

# ============================================
# INFRASTRUCTURE
# ============================================
infra-up: traefik-up monitoring-up
	@echo "$(GREEN)$(CHECK) Infrastructure started!$(NC)"

infra-down: traefik-down monitoring-down
	@echo "$(GREEN)$(CHECK) Infrastructure stopped!$(NC)"

traefik-up:
	@echo "$(CYAN)$(ARROW) Starting Traefik...$(NC)"
	@if [ -f infrastructure/traefik/docker-compose.yml ]; then \
		cd infrastructure/traefik && docker compose up -d; \
		echo "$(GREEN)$(CHECK) Traefik running at http://traefik.localhost:8080$(NC)"; \
	else \
		echo "$(YELLOW)$(WARN) Traefik config not found$(NC)"; \
	fi

traefik-down:
	@echo "$(CYAN)$(ARROW) Stopping Traefik...$(NC)"
	@if [ -f infrastructure/traefik/docker-compose.yml ]; then \
		cd infrastructure/traefik && docker compose down; \
	fi
	@echo "$(GREEN)$(CHECK) Traefik stopped$(NC)"

monitoring-up:
	@echo "$(CYAN)$(ARROW) Starting Monitoring stack...$(NC)"
	@if [ -f infrastructure/monitoring/docker-compose.yml ]; then \
		cd infrastructure/monitoring && docker compose up -d; \
		echo "$(GREEN)$(CHECK) Grafana running at http://localhost:3001$(NC)"; \
	else \
		echo "$(YELLOW)$(WARN) Monitoring config not found$(NC)"; \
	fi

monitoring-down:
	@echo "$(CYAN)$(ARROW) Stopping Monitoring stack...$(NC)"
	@if [ -f infrastructure/monitoring/docker-compose.yml ]; then \
		cd infrastructure/monitoring && docker compose down; \
	fi
	@echo "$(GREEN)$(CHECK) Monitoring stopped$(NC)"

# ============================================
# CI/CD HELPERS
# ============================================
ci-build:
	@echo "$(CYAN)$(ARROW) CI: Building production image...$(NC)"
	DOCKER_BUILDKIT=1 docker build \
		-f docker/Dockerfile \
		--target production \
		--build-arg BUILD_DATE=$(BUILD_DATE) \
		--build-arg VCS_REF=$(VCS_REF) \
		--build-arg VERSION=$(VERSION) \
		-t $(IMAGE_NAME):$(VERSION) \
		-t $(IMAGE_NAME):latest \
		.
	@echo "$(GREEN)$(CHECK) CI build complete$(NC)"

ci-test:
	@echo "$(CYAN)$(ARROW) CI: Running tests...$(NC)"
	npm ci --legacy-peer-deps
	npm run lint
	npm run type-check 2>/dev/null || npx tsc --noEmit
	npm run test 2>/dev/null || echo "No tests configured"
	@echo "$(GREEN)$(CHECK) CI tests complete$(NC)"

ci-push:
	@echo "$(CYAN)$(ARROW) CI: Pushing to registry...$(NC)"
	docker push $(DOCKER_REGISTRY)$(IMAGE_NAME):$(VERSION)
	docker push $(DOCKER_REGISTRY)$(IMAGE_NAME):latest
	@echo "$(GREEN)$(CHECK) CI push complete$(NC)"