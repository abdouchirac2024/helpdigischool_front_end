# Help Digi School - Monitoring Stack

Stack de monitoring basee sur Loki, Grafana et Promtail pour l'agregation et la visualisation des logs.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Application   │     │    Promtail     │     │      Loki       │
│   (Next.js)     │────▶│  (Collecteur)   │────▶│  (Agregation)   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                                ┌─────────────────┐
                                                │    Grafana      │
                                                │ (Visualisation) │
                                                │                 │
                                                └─────────────────┘
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| Grafana | 3001 | Interface de visualisation |
| Loki | 3100 | Serveur d'agregation des logs |
| Promtail | 9080 | Agent de collecte des logs |
| Node Exporter | 9100 | Metriques systeme (optionnel) |

## Demarrage rapide

### 1. Demarrer le stack

```bash
cd monitoring
docker compose up -d
```

### 2. Verifier le statut

```bash
docker compose ps
```

### 3. Acceder a Grafana

- URL: http://localhost:3001
- Utilisateur: `admin`
- Mot de passe: `admin`

## Configuration

### Loki (`loki/loki-config.yml`)

Configuration du serveur d'agregation des logs:
- Retention: 30 jours
- Schema: v11 avec BoltDB Shipper
- Limites: 16MB/s ingestion rate

### Promtail (`promtail/promtail-config.yml`)

Configuration de l'agent de collecte:
- Logs PM2: `/var/log/helpdigischool/pm2/*.log`
- Logs Docker: via Docker socket
- Pipeline: parsing JSON, extraction de labels

### Grafana

#### Data Sources (`grafana/provisioning/datasources/`)

- Loki (par defaut)

#### Dashboards (`grafana/provisioning/dashboards/`)

- **Application Logs**: Visualisation des logs de l'application

## Utilisation

### Requetes Loki communes

```logql
# Tous les logs de l'application
{job="helpdigischool"}

# Logs d'erreur uniquement
{job="helpdigischool"} |~ "(?i)error"

# Logs par niveau
{job="helpdigischool", level="error"}

# Recherche de texte specifique
{job="helpdigischool"} |= "login"

# Logs des dernieres 24h avec comptage
sum(count_over_time({job="helpdigischool"}[24h]))
```

### Alertes

Pour configurer des alertes:
1. Aller dans Grafana > Alerting > Alert rules
2. Creer une nouvelle regle basee sur les logs Loki
3. Configurer les notifications (email, Slack, etc.)

## Maintenance

### Nettoyage des anciens logs

Les logs sont automatiquement supprimes apres 30 jours (configurable dans `loki-config.yml`).

### Sauvegarde

```bash
# Sauvegarder les donnees Grafana
docker run --rm -v helpdigischool-monitoring_grafana-data:/data -v $(pwd):/backup alpine tar czf /backup/grafana-backup.tar.gz /data

# Sauvegarder les donnees Loki
docker run --rm -v helpdigischool-monitoring_loki-data:/data -v $(pwd):/backup alpine tar czf /backup/loki-backup.tar.gz /data
```

### Mise a jour

```bash
# Mettre a jour les images
docker compose pull

# Redemarrer avec les nouvelles images
docker compose up -d
```

## Troubleshooting

### Loki ne demarre pas

```bash
# Verifier les logs
docker compose logs loki

# Verifier les permissions
ls -la loki/
```

### Pas de logs dans Grafana

1. Verifier que Promtail collecte les logs:
```bash
docker compose logs promtail
```

2. Verifier la connexion a Loki:
```bash
curl http://localhost:3100/ready
```

3. Verifier les chemins des logs dans `promtail-config.yml`

### Performances

Pour ameliorer les performances:
- Augmenter la memoire de Loki
- Ajuster les limites d'ingestion
- Activer la compression

## Structure des fichiers

```
monitoring/
├── docker-compose.yml          # Configuration Docker Compose
├── README.md                   # Cette documentation
├── loki/
│   └── loki-config.yml        # Configuration Loki
├── promtail/
│   └── promtail-config.yml    # Configuration Promtail
└── grafana/
    └── provisioning/
        ├── datasources/
        │   └── datasources.yml # Sources de donnees
        └── dashboards/
            ├── dashboards.yml  # Config provisioning
            └── helpdigischool-logs.json # Dashboard logs
```

## Ressources

- [Documentation Loki](https://grafana.com/docs/loki/latest/)
- [Documentation Promtail](https://grafana.com/docs/loki/latest/clients/promtail/)
- [Documentation Grafana](https://grafana.com/docs/grafana/latest/)
- [LogQL Reference](https://grafana.com/docs/loki/latest/logql/)