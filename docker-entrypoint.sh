#!/bin/sh
set -e

# Régénère env.js à partir de la variable d'environnement API_URL, pour pouvoir
# changer l'URL de l'API sans reconstruire l'image (utile en déploiement).
API_URL="${API_URL:-http://localhost:3000}"

cat > /usr/share/nginx/html/env.js <<EOF
window.__env = {
  apiUrl: '${API_URL}',
};
EOF

exec "$@"
