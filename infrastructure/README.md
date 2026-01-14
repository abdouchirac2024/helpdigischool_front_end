# Infrastructure - Help Digi School

Ce dossier contient l'infrastructure partagee pour tous les projets Help Digi School.

## Structure

```
infrastructure/
├── traefik/                    # Reverse Proxy & Load Balancer
│   ├── docker-compose.yml      # Configuration de base
│   ├── docker-compose.dev.yml  # Override developpement
│   ├── docker-compose.preprod.yml
│   ├── docker-compose.prod.yml
│   ├── traefik.yml             # Configuration statique
│   ├── config/
│   │   ├── dynamic/            # Configuration dynamique
│   │   └── certs/              # Certificats SSL (si pas Let's Encrypt)
│   └── .env.example
├── monitoring/                 # Stack de monitoring
│   ├── docker-compose.yml      # Orchestration Loki/Grafana/Promtail
│   ├── loki/
│   │   └── loki-config.yml     # Configuration Loki
│   ├── promtail/
│   │   └── promtail-config.yml # Configuration Promtail
│   └── grafana/
│       └── provisioning/       # Auto-provisioning Grafana
│           ├── datasources/
│           └── dashboards/
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

Ajoutez le resultat dans `.env` sous `TRAEFIK_DASHBOARD_AUTH`.

---

## Monitoring Stack (Loki + Grafana + Promtail)

### Demarrage

```bash
cd monitoring
docker compose up -d
```

### Services

| Service | Port | URL | Credentials |
|---------|------|-----|-------------|
| Grafana | 3001 | http://localhost:3001 | admin / admin |
| Loki | 3100 | http://localhost:3100 | - |
| Promtail | - | - | - |
| Node Exporter | 9100 | http://localhost:9100 | - |

### Arret

```bash
cd monitoring
docker compose down
```

### Logs collectes

Promtail collecte automatiquement:
- Logs PM2 (`logs/pm2/*.log`)
- Logs Docker containers

### Dashboards pre-configures

- **Help Digi School - Logs**: Dashboard principal pour les logs applicatifs
- Filtrage par niveau (info, warn, error)
- Recherche full-text

### Configuration

- **Loki**: `monitoring/loki/loki-config.yml`
- **Promtail**: `monitoring/promtail/promtail-config.yml`
- **Grafana Datasources**: `monitoring/grafana/provisioning/datasources/`
- **Grafana Dashboards**: `monitoring/grafana/provisioning/dashboards/`