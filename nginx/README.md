# Configuration Nginx

## Structure

```
nginx/
├── nginx.conf      # Configuration principale
├── ssl/            # Certificats SSL (non versionnés)
│   ├── fullchain.pem
│   └── privkey.pem
└── README.md
```

## Utilisation

### Avec Docker Compose (Production)

```bash
make up-prod-nginx
```

### Certificats SSL

#### Option 1: Let's Encrypt (recommandé)

```bash
# Sur le serveur de production
certbot certonly --webroot -w /var/www/certbot -d helpdigischool.com -d www.helpdigischool.com

# Copier les certificats
cp /etc/letsencrypt/live/helpdigischool.com/fullchain.pem nginx/ssl/
cp /etc/letsencrypt/live/helpdigischool.com/privkey.pem nginx/ssl/
```

#### Option 2: Certificats auto-signés (dev/test)

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/privkey.pem \
  -out nginx/ssl/fullchain.pem \
  -subj "/CN=localhost"
```

## Fonctionnalités

- Reverse proxy vers Next.js
- Compression Gzip
- Cache optimisé pour les assets statiques
- Headers de sécurité (HSTS, X-Frame-Options, etc.)
- Support HTTP/2
- Redirection HTTP → HTTPS
- Protection des fichiers sensibles
