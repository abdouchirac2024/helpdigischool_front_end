# Docker - Help Digi School

Configuration Docker pour le projet Help Digi School.

## Structure

```
docker/
├── Dockerfile              # Image Docker multi-stage
├── compose/
│   ├── docker-compose.yml      # Configuration de base
│   ├── docker-compose.dev.yml  # Développement
│   ├── docker-compose.preprod.yml
│   └── docker-compose.prod.yml
├── scripts/
│   ├── healthcheck.sh      # Script de vérification santé
│   ├── entrypoint.sh       # Point d'entrée
│   └── wait-for-it.sh      # Attente de services
└── README.md
```

## Commandes

### Développement

```bash
# Avec Make (recommandé)
make up-dev

# Sans Make
docker-compose -f docker/compose/docker-compose.yml \
               -f docker/compose/docker-compose.dev.yml up -d
```

### Pre-Production

```bash
make up-preprod
```

### Production

```bash
make up-prod
```

## Build

```bash
# Build dev
docker build -f docker/Dockerfile --target development -t helpdigischool/frontend:dev .

# Build prod
docker build -f docker/Dockerfile --target production -t helpdigischool/frontend:latest .
```

## Environnements

| Environnement | Port | Traefik Host |
|---------------|------|--------------|
| Dev | 3000 | helpdigischool.localhost |
| Preprod | 32031 | preprod.helpdigischool.com |
| Prod | 3000 | helpdigischool.com |

## Prérequis

Traefik doit être démarré depuis `~/infrastructure/traefik/` :
```bash
cd ~/infrastructure/traefik
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```