// Configuration runtime, régénérée par le conteneur Docker au démarrage
// (voir docker-entrypoint.sh) à partir de la variable d'environnement API_URL.
// En dev local (ng serve), cette valeur par défaut est utilisée telle quelle.
window.__env = {
  apiUrl: 'http://localhost:3000',
};
