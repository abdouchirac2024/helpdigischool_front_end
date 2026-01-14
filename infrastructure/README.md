meme# Infrastructure - Help Digi School

Ce dossier contient l'infrastructure partagée pour tous les projets Help Digi School.

## Structure

```
infrastructure/
├── traefik/                    # Reverse Proxy & Load Balancer
│   ├── docker-compose.yml      # Configuration de base
│   ├── docker-compose.dev.yml  # Override développement
│   ├── docker-compose.preprod.yml
│   ├── docker-compose.prod.yml
│   ├── traefik.yml             # Configuration statique
│   ├── config/
│   │   ├── dynamic/            # Configuration dynamique
│   │   └── certs/              # Certificats SSL (si pas Let's Encrypt)
│   └── .env.example
└── README.md
```

## Démarrage

### Développement
```bash
cd traefik
cp .env.example .env
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

### Pre-Production
```bash
cd traefik
docker-compose -f docker-compose.yml -f docker-compose.preprod.yml up -d
```

### Production
```bash
cd traefik
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Dashboard

- **Dev**: http://traefik.localhost:8080
- **Preprod**: https://traefik.preprod.helpdigischool.com
- **Prod**: https://traefik.helpdigischool.com (IP whitelist requis)

## Génération du mot de passe Dashboard

```bash
htpasswd -nb admin votre_mot_de_passe
```

Ajoutez le résultat dans `.env` sous `TRAEFIK_DASHBOARD_AUTH`.