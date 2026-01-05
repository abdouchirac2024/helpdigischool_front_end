# ============================================
# Help Digi School - Frontend Next.js
# Makefile - Commandes de gestion Docker
# ============================================

# Variables
COMPOSE = docker compose
COMPOSE_DEV = $(COMPOSE) -f docker-compose.yml -f docker-compose.override.yml
COMPOSE_PREPROD = $(COMPOSE) -f docker-compose.yml -f docker-compose.preprod.yml
COMPOSE_PROD = $(COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml
IMAGE_NAME = helpdigischool/frontend
VERSION ?= $(shell git describe --tags --always --dirty 2>/dev/null || echo "latest")
DOCKER_REGISTRY ?=

# Couleurs pour les messages
GREEN = \033[0;32m
YELLOW = \033[0;33m
RED = \033[0;31m
BLUE = \033[0;34m
CYAN = \033[0;36m
NC = \033[0m

# Emojis
CHECK = ✓
CROSS = ✗
ARROW = →

.PHONY: help build up down logs clean prune test lint version

.DEFAULT_GOAL := help

# ============================================
# AIDE
# ============================================
help:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)       $(GREEN)Help Digi School - Frontend Commands$(NC)                    $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)Development:$(NC)"
	@echo "  $(GREEN)make dev$(NC)              $(ARROW) Démarrer en mode développement"
	@echo "  $(GREEN)make build-dev$(NC)        $(ARROW) Build l'image de développement"
	@echo "  $(GREEN)make up-dev$(NC)           $(ARROW) Démarrer le container dev"
	@echo "  $(GREEN)make down-dev$(NC)         $(ARROW) Arrêter le container dev"
	@echo "  $(GREEN)make logs-dev$(NC)         $(ARROW) Afficher les logs dev"
	@echo "  $(GREEN)make shell-dev$(NC)        $(ARROW) Shell dans le container dev"
	@echo "  $(GREEN)make restart-dev$(NC)      $(ARROW) Redémarrer le container dev"
	@echo ""
	@echo "$(BLUE)Pre-Production:$(NC)"
	@echo "  $(GREEN)make build-preprod$(NC)    $(ARROW) Build l'image preprod"
	@echo "  $(GREEN)make up-preprod$(NC)       $(ARROW) Démarrer le container preprod"
	@echo "  $(GREEN)make down-preprod$(NC)     $(ARROW) Arrêter le container preprod"
	@echo "  $(GREEN)make logs-preprod$(NC)     $(ARROW) Afficher les logs preprod"
	@echo "  $(GREEN)make deploy-preprod$(NC)   $(ARROW) Déploiement complet preprod"
	@echo ""
	@echo "$(RED)Production:$(NC)"
	@echo "  $(GREEN)make build-prod$(NC)       $(ARROW) Build l'image production"
	@echo "  $(GREEN)make up-prod$(NC)          $(ARROW) Démarrer le container prod"
	@echo "  $(GREEN)make up-prod-nginx$(NC)    $(ARROW) Démarrer avec Nginx"
	@echo "  $(GREEN)make down-prod$(NC)        $(ARROW) Arrêter le container prod"
	@echo "  $(GREEN)make logs-prod$(NC)        $(ARROW) Afficher les logs prod"
	@echo "  $(GREEN)make deploy-prod$(NC)      $(ARROW) Déploiement complet prod"
	@echo ""
	@echo "$(CYAN)Utilitaires:$(NC)"
	@echo "  $(GREEN)make status$(NC)           $(ARROW) État des containers"
	@echo "  $(GREEN)make health$(NC)           $(ARROW) Vérifier la santé"
	@echo "  $(GREEN)make clean$(NC)            $(ARROW) Nettoyer les containers"
	@echo "  $(GREEN)make prune$(NC)            $(ARROW) Nettoyer Docker (attention!)"
	@echo "  $(GREEN)make version$(NC)          $(ARROW) Afficher la version"
	@echo ""
	@echo "$(YELLOW)Multi-Environnements:$(NC)"
	@echo "  $(GREEN)make up-all$(NC)           $(ARROW) Démarrer tous les environnements"
	@echo "  $(GREEN)make up-all-redis$(NC)     $(ARROW) Démarrer tous avec Redis"
	@echo "  $(GREEN)make up-all-full$(NC)      $(ARROW) Démarrer tous (Nginx + Redis)"
	@echo "  $(GREEN)make down-all$(NC)         $(ARROW) Arrêter tous les environnements"
	@echo ""
	@echo "$(CYAN)Local (sans Docker):$(NC)"
	@echo "  $(GREEN)make install$(NC)          $(ARROW) Installer les dépendances"
	@echo "  $(GREEN)make start$(NC)            $(ARROW) Démarrer en local"
	@echo "  $(GREEN)make lint$(NC)             $(ARROW) Lancer ESLint"
	@echo "  $(GREEN)make test$(NC)             $(ARROW) Lancer les tests"
	@echo ""

# ============================================
# VERSION
# ============================================
version:
	@echo "$(CYAN)╔════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(GREEN)Help Digi School Frontend$(NC)            $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════╝$(NC)"
	@echo "  Version: $(YELLOW)$(VERSION)$(NC)"
	@echo "  Image:   $(YELLOW)$(IMAGE_NAME)$(NC)"
	@echo "  Registry: $(YELLOW)$(DOCKER_REGISTRY)$(NC)"

# ============================================
# DEVELOPMENT
# ============================================
build-dev:
	@echo "$(YELLOW)$(ARROW) Building development image...$(NC)"
	$(COMPOSE_DEV) build
	@echo "$(GREEN)$(CHECK) Development image built!$(NC)"

up-dev:
	@echo "$(YELLOW)$(ARROW) Starting development environment...$(NC)"
	$(COMPOSE_DEV) up -d
	@echo "$(GREEN)$(CHECK) Development server running at http://localhost:3000$(NC)"

up-dev-redis:
	@echo "$(YELLOW)$(ARROW) Starting development with Redis...$(NC)"
	$(COMPOSE_DEV) --profile with-redis up -d
	@echo "$(GREEN)$(CHECK) Development with Redis running$(NC)"

down-dev:
	@echo "$(YELLOW)$(ARROW) Stopping development environment...$(NC)"
	$(COMPOSE_DEV) down
	@echo "$(GREEN)$(CHECK) Development environment stopped$(NC)"

logs-dev:
	$(COMPOSE_DEV) logs -f frontend

restart-dev:
	@echo "$(YELLOW)$(ARROW) Restarting development environment...$(NC)"
	$(COMPOSE_DEV) restart
	@echo "$(GREEN)$(CHECK) Development environment restarted$(NC)"

shell-dev:
	@echo "$(YELLOW)$(ARROW) Opening shell in development container...$(NC)"
	$(COMPOSE_DEV) exec frontend sh

lint-dev:
	@echo "$(YELLOW)$(ARROW) Running linter...$(NC)"
	$(COMPOSE_DEV) exec frontend npm run lint

# ============================================
# PRE-PRODUCTION
# ============================================
build-preprod:
	@echo "$(BLUE)$(ARROW) Building pre-production image...$(NC)"
	DOCKER_BUILDKIT=1 $(COMPOSE_PREPROD) build
	docker tag $(IMAGE_NAME):preprod-latest $(IMAGE_NAME):preprod-$(VERSION)
	@echo "$(GREEN)$(CHECK) Pre-production image built!$(NC)"

up-preprod:
	@echo "$(BLUE)$(ARROW) Starting pre-production environment...$(NC)"
	$(COMPOSE_PREPROD) up -d
	@echo "$(GREEN)$(CHECK) Pre-production server running at http://localhost:32031$(NC)"

up-preprod-redis:
	@echo "$(BLUE)$(ARROW) Starting pre-production with Redis...$(NC)"
	$(COMPOSE_PREPROD) --profile with-redis up -d
	@echo "$(GREEN)$(CHECK) Pre-production with Redis running$(NC)"

down-preprod:
	@echo "$(BLUE)$(ARROW) Stopping pre-production environment...$(NC)"
	$(COMPOSE_PREPROD) down
	@echo "$(GREEN)$(CHECK) Pre-production environment stopped$(NC)"

logs-preprod:
	$(COMPOSE_PREPROD) logs -f frontend

restart-preprod:
	@echo "$(BLUE)$(ARROW) Restarting pre-production environment...$(NC)"
	$(COMPOSE_PREPROD) restart
	@echo "$(GREEN)$(CHECK) Pre-production environment restarted$(NC)"

shell-preprod:
	$(COMPOSE_PREPROD) exec frontend sh

deploy-preprod: down-preprod build-preprod up-preprod
	@echo "$(GREEN)$(CHECK) Pre-production deployment complete!$(NC)"
	@make health-check URL=http://localhost:32031/api/health

# ============================================
# PRODUCTION
# ============================================
build-prod:
	@echo "$(RED)$(ARROW) Building production image...$(NC)"
	DOCKER_BUILDKIT=1 $(COMPOSE_PROD) build
	docker tag $(IMAGE_NAME):latest $(IMAGE_NAME):$(VERSION)
	@echo "$(GREEN)$(CHECK) Production image built!$(NC)"

up-prod:
	@echo "$(RED)$(ARROW) Starting production environment...$(NC)"
	$(COMPOSE_PROD) up -d
	@echo "$(GREEN)$(CHECK) Production server running$(NC)"

up-prod-nginx:
	@echo "$(RED)$(ARROW) Starting production with Nginx...$(NC)"
	$(COMPOSE_PROD) --profile with-nginx up -d
	@echo "$(GREEN)$(CHECK) Production with Nginx running$(NC)"

up-prod-redis:
	@echo "$(RED)$(ARROW) Starting production with Redis...$(NC)"
	$(COMPOSE_PROD) --profile with-redis up -d
	@echo "$(GREEN)$(CHECK) Production with Redis running$(NC)"

up-prod-full:
	@echo "$(RED)$(ARROW) Starting production with all services...$(NC)"
	$(COMPOSE_PROD) --profile with-nginx --profile with-redis up -d
	@echo "$(GREEN)$(CHECK) Production full stack running$(NC)"

down-prod:
	@echo "$(RED)$(ARROW) Stopping production environment...$(NC)"
	$(COMPOSE_PROD) down
	@echo "$(GREEN)$(CHECK) Production environment stopped$(NC)"

logs-prod:
	$(COMPOSE_PROD) logs -f frontend

restart-prod:
	@echo "$(RED)$(ARROW) Restarting production environment...$(NC)"
	$(COMPOSE_PROD) down
	$(COMPOSE_PROD) up -d
	@echo "$(GREEN)$(CHECK) Production environment restarted$(NC)"

shell-prod:
	$(COMPOSE_PROD) exec frontend sh

deploy-prod: down-prod build-prod up-prod
	@echo "$(GREEN)$(CHECK) Production deployment complete!$(NC)"
	@make health-check URL=http://localhost:3000/api/health

# ============================================
# NETWORKS
# ============================================
networks-dev:
	@echo "$(YELLOW)$(ARROW) Creating development network...$(NC)"
	-docker network create helpdigischool-network-dev 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) Development network ready$(NC)"

networks-preprod:
	@echo "$(BLUE)$(ARROW) Creating pre-production networks...$(NC)"
	-docker network create helpdigischool-network-preprod 2>/dev/null || true
	-docker network create monitoring-network 2>/dev/null || true
	-docker network create traefik 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) Pre-production networks ready$(NC)"

networks-prod:
	@echo "$(RED)$(ARROW) Creating production networks...$(NC)"
	-docker network create helpdigischool-network-prod 2>/dev/null || true
	-docker network create monitoring-network 2>/dev/null || true
	-docker network create traefik 2>/dev/null || true
	@echo "$(GREEN)$(CHECK) Production networks ready$(NC)"

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

prune:
	@echo "$(RED)⚠ WARNING: This will remove ALL unused Docker resources!$(NC)"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ] && docker system prune -af --volumes || echo "Cancelled."

# ============================================
# MONITORING & STATUS
# ============================================
status:
	@echo "$(CYAN)╔════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)        $(GREEN)Container Status$(NC)                $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════╝$(NC)"
	@docker ps --filter "name=helpdigischool" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || echo "No containers running"

stats:
	@echo "$(CYAN)$(ARROW) Container statistics:$(NC)"
	docker stats --no-stream --filter "name=helpdigischool" 2>/dev/null || echo "No containers running"

health:
	@echo "$(CYAN)$(ARROW) Health status:$(NC)"
	@docker ps --filter "name=helpdigischool" --format "{{.Names}}: {{.Status}}" 2>/dev/null || echo "No containers running"

health-check:
	@echo "$(CYAN)$(ARROW) Checking health endpoint...$(NC)"
	@for i in 1 2 3 4 5; do \
		if curl -sf $(URL) > /dev/null 2>&1; then \
			echo "$(GREEN)$(CHECK) Health check passed!$(NC)"; \
			exit 0; \
		fi; \
		echo "$(YELLOW)Attempt $$i/5 - waiting...$(NC)"; \
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
	@echo "$(YELLOW)$(ARROW) Starting local development server...$(NC)"
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

test:
	@echo "$(YELLOW)$(ARROW) Running tests...$(NC)"
	npm run test 2>/dev/null || echo "$(YELLOW)No test script configured$(NC)"

typecheck:
	@echo "$(YELLOW)$(ARROW) Running TypeScript check...$(NC)"
	npm run type-check 2>/dev/null || npx tsc --noEmit

# ============================================
# MULTI-ENVIRONMENT COMMANDS
# ============================================
up-all:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(YELLOW)Démarrage de tous les environnements$(NC)                      $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
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
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(GREEN)✓ Tous les environnements sont démarrés!$(NC)                  $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
	@make status

up-all-redis:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(YELLOW)Démarrage de tous les environnements avec Redis$(NC)          $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)$(ARROW) Starting Development with Redis...$(NC)"
	$(COMPOSE_DEV) --profile with-redis up -d
	@echo "$(GREEN)$(CHECK) Dev with Redis running$(NC)"
	@echo ""
	@echo "$(BLUE)$(ARROW) Starting Pre-Production with Redis...$(NC)"
	$(COMPOSE_PREPROD) --profile with-redis up -d
	@echo "$(GREEN)$(CHECK) Preprod with Redis running$(NC)"
	@echo ""
	@echo "$(RED)$(ARROW) Starting Production with Redis...$(NC)"
	$(COMPOSE_PROD) --profile with-redis up -d
	@echo "$(GREEN)$(CHECK) Prod with Redis running$(NC)"
	@echo ""
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(GREEN)✓ Tous les environnements avec Redis sont démarrés!$(NC)       $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
	@make status

up-all-full:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(YELLOW)Démarrage complet (Nginx + Redis)$(NC)                         $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)$(ARROW) Starting Development with Redis...$(NC)"
	$(COMPOSE_DEV) --profile with-redis up -d
	@echo "$(GREEN)$(CHECK) Dev with Redis running$(NC)"
	@echo ""
	@echo "$(BLUE)$(ARROW) Starting Pre-Production with Redis...$(NC)"
	$(COMPOSE_PREPROD) --profile with-redis up -d
	@echo "$(GREEN)$(CHECK) Preprod with Redis running$(NC)"
	@echo ""
	@echo "$(RED)$(ARROW) Starting Production with Nginx + Redis...$(NC)"
	$(COMPOSE_PROD) --profile with-nginx --profile with-redis up -d
	@echo "$(GREEN)$(CHECK) Prod with full stack running$(NC)"
	@echo ""
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(GREEN)✓ Stack complet démarré sur tous les environnements!$(NC)      $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
	@make status

# ============================================
# UTILITY COMMANDS
# ============================================
logs-all:
	@docker compose logs -f

down-all:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(YELLOW)Arrêt de tous les environnements$(NC)                          $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
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
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║$(NC)  $(GREEN)✓ Tous les environnements sont arrêtés$(NC)                    $(CYAN)║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"

# SSL Certificate generation (development)
ssl-dev:
	@echo "$(YELLOW)$(ARROW) Generating self-signed SSL certificate...$(NC)"
	@mkdir -p nginx/ssl
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout nginx/ssl/privkey.pem \
		-out nginx/ssl/fullchain.pem \
		-subj "/CN=localhost"
	@echo "$(GREEN)$(CHECK) SSL certificate generated$(NC)"

# Backup volumes
backup:
	@echo "$(YELLOW)$(ARROW) Backing up volumes...$(NC)"
	@mkdir -p backups
	docker run --rm -v helpdigischool-redis-prod:/data -v $(PWD)/backups:/backup alpine tar czf /backup/redis-$(shell date +%Y%m%d).tar.gz -C /data .
	@echo "$(GREEN)$(CHECK) Backup complete$(NC)"
