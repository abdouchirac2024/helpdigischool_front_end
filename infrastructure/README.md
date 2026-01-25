# Infrastructure - Help Digi School

Guide complet de l'infrastructure DevOps du projet Help Digi School.

---

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture](#architecture)
- [Frontend (Application)](#frontend-application)
- [Traefik (Reverse Proxy)](#traefik-reverse-proxy)
- [Monitoring (Grafana/Loki)](#monitoring-grafanaloki)
- [Commandes rapides](#commandes-rapides)
- [URLs de tous les services](#urls-de-tous-les-services)

---

## Vue d'ensemble

L'infrastructure se compose de 3 parties principales :

| Composant | Description | Dossier |
|-----------|-------------|---------|
| **Frontend** | Application Next.js | `/docker/` |
| **Traefik** | Reverse Proxy + SSL | `/infrastructure/traefik/` |
| **Monitoring** | Logs + Dashboards | `/infrastructure/monitoring/` |

---

## Architecture

```
                                    INTERNET
                                        │
                                        ▼
                            ┌───────────────────────┐
                            │       TRAEFIK         │
                            │    (Reverse Proxy)    │
                            │     Ports 80/443      │
                            └───────────┬───────────┘
                                        │
            ┌───────────────────────────┼───────────────────────────┐
            │                           │                           │
            ▼                           ▼                           ▼
    ┌───────────────┐           ┌───────────────┐           ┌───────────────┐
    │   FRONTEND    │           │   FRONTEND    │           │   FRONTEND    │
    │     (Dev)     │           │   (Preprod)   │           │    (Prod)     │
    │   Port 3000   │           │  Port 32031   │           │   Port 3000   │
    └───────────────┘           └───────────────┘           └───────────────┘
            │                           │                           │
            └───────────────────────────┼───────────────────────────┘
                                        │
                                        ▼
                            ┌───────────────────────┐
                            │      MONITORING       │
                            ├───────────────────────┤
                            │  Grafana    :3001     │
                            │  Loki       :3100     │
                            │  Promtail   (logs)    │
                            │  Node Exp.  :9100     │
                            └───────────────────────┘
```

---

## Structure des fichiers

```
infrastructure/
├── traefik/                        # Reverse Proxy & Load Balancer
│   ├── docker-compose.yml          # Configuration de base
│   ├── docker-compose.dev.yml      # Override développement
│   ├── docker-compose.preprod.yml  # Override pre-production
│   ├── docker-compose.prod.yml     # Override production
│   ├── traefik.yml                 # Configuration statique
│   ├── config/
│   │   ├── dynamic/                # Configuration dynamique
│   │   │   └── middlewares.yml     # Rate-limit, headers, etc.
│   │   └── certs/                  # Certificats SSL (si pas Let's Encrypt)
│   └── .env.example
├── monitoring/                     # Stack de monitoring
│   ├── docker-compose.yml          # Orchestration des services
│   ├── loki/
│   │   └── loki-config.yml         # Configuration Loki
│   ├── promtail/
│   │   └── promtail-config.yml     # Configuration collecte logs
│   └── grafana/
│       └── provisioning/
│           ├── datasources/        # Auto-config sources de données
│           └── dashboards/         # Dashboards pré-configurés
└── README.md
```

---

## Frontend (Application)

### Environnements

| Env | Dockerfile | Port | URL Locale |
|-----|------------|------|------------|
| Dev | `Dockerfile.dev` | 3000 | http://localhost:3000 |
| Preprod | `Dockerfile.preprod` | 32031 | http://localhost:32031 |
| Prod | `Dockerfile.prod` | 3000 | http://localhost:3000 |

### Commandes Frontend

```bash
# ═══════════════════════════════════════════════════════════════
# DÉVELOPPEMENT
# ═══════════════════════════════════════════════════════════════

# Démarrer (local sans Docker)
make dev

# Démarrer (avec Docker)
make up-dev

# Arrêter
make down-dev

# Voir les logs
make logs-dev

# Redémarrer
make restart-dev

# Shell dans le container
make shell-dev

# Rebuild complet
make rebuild-dev

# ═══════════════════════════════════════════════════════════════
# PRE-PRODUCTION
# ═══════════════════════════════════════════════════════════════

# Build l'image
make build-preprod

# Démarrer
make up-preprod

# Arrêter
make down-preprod

# Voir les logs
make logs-preprod

# Déploiement complet (build + up + health check)
make deploy-preprod

# ═══════════════════════════════════════════════════════════════
# PRODUCTION
# ═══════════════════════════════════════════════════════════════

# Build l'image
make build-prod

# Démarrer
make up-prod

# Arrêter
make down-prod

# Voir les logs
make logs-prod

# Déploiement complet
make deploy-prod

# ═══════════════════════════════════════════════════════════════
# MULTI-ENVIRONNEMENTS
# ═══════════════════════════════════════════════════════════════

# Démarrer TOUS les environnements
make up-all

# Arrêter TOUS les environnements
make down-all

# Status de tous les environnements
make status-all
```

---

## Traefik (Reverse Proxy)

### Informations

| Propriété | Valeur |
|-----------|--------|
| **Dossier** | `/infrastructure/traefik/` |
| **Port HTTP** | 8180 |
| **Port HTTPS** | 8443 |
| **Dashboard** | 8083 |
| **Image** | `traefik:v3.2` |

### URLs Traefik

| Environnement | URL Dashboard |
|---------------|---------------|
| Dev | http://localhost:8083 |
| Preprod | https://traefik.preprod.helpdigischool.com |
| Prod | https://traefik.helpdigischool.com |

### Commandes Traefik

```bash
# ═══════════════════════════════════════════════════════════════
# VIA MAKEFILE (depuis la racine du projet)
# ═══════════════════════════════════════════════════════════════

# Démarrer Traefik
make traefik-up

# Arrêter Traefik
make traefik-down

# ═══════════════════════════════════════════════════════════════
# VIA DOCKER COMPOSE (depuis /infrastructure/traefik/)
# ═══════════════════════════════════════════════════════════════

cd infrastructure/traefik

# Démarrer (développement)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Démarrer (preprod)
docker compose -f docker-compose.yml -f docker-compose.preprod.yml up -d

# Démarrer (production)
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Arrêter
docker compose down

# Voir les logs
docker compose logs -f traefik

# Redémarrer
docker compose restart

# Status
docker compose ps

# Supprimer (avec volumes)
docker compose down -v
```

### Génération mot de passe Dashboard

```bash
htpasswd -nb admin votre_mot_de_passe
```

Ajouter le résultat dans `.env` sous `TRAEFIK_DASHBOARD_AUTH`.

---

## Monitoring (Grafana/Loki)

### Services

| Service | Version | Port | URL | Credentials |
|---------|---------|------|-----|-------------|
| **Grafana** | 10.2.0 | 3001 | http://localhost:3001 | admin / admin |
| **Loki** | 3.3.2 | 3100 | http://localhost:3100 | - |
| **Promtail** | 3.3.2 | - | - | - |
| **Node Exporter** | 1.6.1 | 9100 | http://localhost:9100 | - |

### Architecture Monitoring

```
┌─────────────────────────────────────────────────────────────┐
│                    MONITORING STACK                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐     ┌─────────────────┐                │
│  │   PROMTAIL      │────▶│      LOKI       │                │
│  │ (Log Collector) │     │ (Log Storage)   │                │
│  │                 │     │   :3100         │                │
│  └─────────────────┘     └────────┬────────┘                │
│          │                        │                          │
│          │ Collecte:              │                          │
│          │ - Docker logs          │                          │
│          │ - PM2 logs             ▼                          │
│          │               ┌─────────────────┐                │
│          │               │    GRAFANA      │                │
│          │               │  (Dashboards)   │                │
│          │               │    :3001        │                │
│          │               └─────────────────┘                │
│          │                        ▲                          │
│          │               ┌────────┴────────┐                │
│          └──────────────▶│  NODE EXPORTER  │                │
│                          │ (System Metrics)│                │
│                          │    :9100        │                │
│                          └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Commandes Monitoring

```bash
# ═══════════════════════════════════════════════════════════════
# VIA MAKEFILE (depuis la racine du projet)
# ═══════════════════════════════════════════════════════════════

# Démarrer le monitoring complet
make monitoring-up

# Arrêter le monitoring
make monitoring-down

# Démarrer toute l'infrastructure (Traefik + Monitoring)
make infra-up

# ═══════════════════════════════════════════════════════════════
# VIA DOCKER COMPOSE (depuis /infrastructure/monitoring/)
# ═══════════════════════════════════════════════════════════════

cd infrastructure/monitoring

# Démarrer tous les services
docker compose up -d

# Arrêter tous les services
docker compose down

# Voir les logs
docker compose logs -f

# Status
docker compose ps
```

### Utilisation de Grafana

#### Accès
1. Ouvrir http://localhost:3001
2. Login: `admin` / `admin`

#### Voir les logs (Explore)
1. Aller dans **Explore** (icône boussole à gauche)
2. Sélectionner **Loki** comme datasource
3. Utiliser le **Label browser** ou écrire une requête LogQL

#### Requêtes LogQL utiles

```logql
# Tous les logs
{container=~".+"}

# Logs du frontend
{container="helpdigischool-frontend-dev"}

# Logs par niveau (error, warn, info)
{container=~".+"} |= "error"
{container=~".+"} |= "warn"

# Logs Loki
{service="loki"}

# Logs Grafana
{service="grafana"}

# Recherche de texte
{container=~".+"} |~ "(?i)error|exception|failed"

# Logs des 5 dernières minutes avec comptage
count_over_time({container=~".+"}[5m])
```

#### Créer un Dashboard

1. Aller dans **Dashboards** → **New** → **New Dashboard**
2. Ajouter un panneau **Logs**
3. Datasource: **Loki**
4. Query: `{container="helpdigischool-frontend-dev"}`
5. Sauvegarder

### Logs collectés

Promtail collecte automatiquement :

| Source | Labels | Description |
|--------|--------|-------------|
| Docker containers | `container`, `service` | Tous les containers avec label `service` |
| PM2 logs | `job=helpdigischool` | Logs stdout/stderr de l'app Next.js |
| System logs | `job=system` | Syslog (optionnel) |

### Rétention des logs

- **Durée** : 30 jours (configurable dans `loki-config.yml`)
- **Compaction** : Toutes les 10 minutes

---

## URLs de tous les services

### Développement (localhost)

| Service | URL | Port |
|---------|-----|------|
| **Frontend Dev** | http://localhost:3000 | 3000 |
| **Frontend Preprod** | http://localhost:32031 | 32031 |
| **Traefik Dashboard** | http://localhost:8083 | 8083 |
| **Grafana** | http://localhost:3001 | 3001 |
| **Loki** | http://localhost:3100 | 3100 |
| **Node Exporter** | http://localhost:9100 | 9100 |

### Avec Traefik (domaines locaux)

Ajouter dans `/etc/hosts` :
```
127.0.0.1 helpdigischool.localhost
127.0.0.1 traefik.localhost
```

| Service | URL |
|---------|-----|
| **Frontend** | http://helpdigischool.localhost:8180 |
| **Traefik** | http://localhost:8083 |

### Production

| Service | URL |
|---------|-----|
| **Frontend** | https://helpdigischool.com |
| **Preprod** | https://preprod.helpdigischool.com |
| **Traefik** | https://traefik.helpdigischool.com |

---

## Commandes rapides

### Tout démarrer

```bash
# Infrastructure complète (Traefik + Monitoring + App)
make infra-up && make up-dev
```

### Tout arrêter

```bash
# Arrêter tout
make down-all && make infra-down
```

### Nettoyage

```bash
# Nettoyer les containers
make clean

# Nettoyer les images
make clean-images

# Nettoyage complet Docker (ATTENTION!)
make prune
```

### Validation

```bash
# Valider toute la configuration
make validate

# Vérifier la santé des services
make health

# Status de tous les services
make status-all
```

---

## Résumé des commandes

| Action | Commande |
|--------|----------|
| **Aide** | `make help` |
| **Démarrer dev** | `make up-dev` |
| **Arrêter dev** | `make down-dev` |
| **Logs dev** | `make logs-dev` |
| **Démarrer preprod** | `make up-preprod` |
| **Déployer preprod** | `make deploy-preprod` |
| **Démarrer prod** | `make up-prod` |
| **Déployer prod** | `make deploy-prod` |
| **Traefik start** | `make traefik-up` |
| **Traefik stop** | `make traefik-down` |
| **Monitoring start** | `make monitoring-up` |
| **Monitoring stop** | `make monitoring-down` |
| **Tout démarrer** | `make up-all` |
| **Tout arrêter** | `make down-all` |
| **Status** | `make status-all` |
| **Validation** | `make validate` |
| **Nettoyage** | `make clean` |

---

## Dépannage

### Container ne démarre pas

```bash
# Vérifier les logs
make logs-dev

# Vérifier la config
make validate-compose
```

### Port déjà utilisé

```bash
# Trouver le processus
lsof -i :3000

# Tuer le processus
kill -9 <PID>
```

### Problème de réseau Docker

```bash
# Recréer les réseaux
docker network prune
make up-dev
```

### Reset complet

```bash
# Arrêter et supprimer tout
make clean
make prune  # Attention: supprime TOUT Docker!
```