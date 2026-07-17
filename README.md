# MsdAnalysisUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.18.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Régénérer Tailwind (recrée compiled-tailwind.css ou met à jour le CSS) :
```bash
npx tailwindcss -i ./src/styles.css -o ./src/compiled-tailwind.css --minify
```

Redémarrer le serveur Angular (arrêter puis relancer) :
```bash
npx ng serve --port 4200
```

## Docker

```bash
docker compose up --build
```

Sert l'application sur `http://localhost:8080`. L'URL de l'API est configurable sans
reconstruire l'image via la variable d'environnement `API_URL` (par défaut
`http://localhost:3000`) :

```bash
API_URL=http://mon-serveur:3000 docker compose up --build
```

## Déploiement sur une machine du labo

Guide complet, pas à pas (prérequis, pare-feu, démarrage automatique, sauvegardes,
dépannage) : voir **[DEPLOYMENT.md dans msd-analysis-api](https://github.com/Nesto33/msd-analysis-api/blob/claude/nestjs-angular-migration-6xasgs/DEPLOYMENT.md)**
(lien vers la branche de travail actuelle — à mettre à jour vers `main` une fois le code fusionné)
— l'API et l'UI se déploient ensemble, sur la même machine.

En résumé, sur la **même machine** qui fait tourner `msd-analysis-api` :

```bash
API_URL=http://<ip-locale-de-la-machine>:3000 docker compose up -d --build
```

`API_URL` doit pointer vers une adresse joignable **depuis le navigateur du poste
client** (ce n'est pas une adresse réseau Docker interne), puisque c'est le navigateur,
pas le conteneur, qui appelle l'API.