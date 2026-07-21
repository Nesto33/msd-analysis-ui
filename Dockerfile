FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
COPY --from=build /app/dist/msd-analysis-ui/browser /usr/share/nginx/html

# API_URL est lu au démarrage du conteneur (voir docker-entrypoint.sh) : pas besoin
# de rebuild l'image pour pointer vers une autre adresse d'API.
ENV API_URL=http://localhost:3000

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
