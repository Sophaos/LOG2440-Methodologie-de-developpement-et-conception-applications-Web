# TP3

Pour ce TP, le site web et ses tests unitaires ont été placés dans un projet différent (répertoire `site-web`) que les tests de bout en bout avec `Nightwatch` (répertoire `nightwatch`).

## Nightwatch sur Windows, Linux et macOS.

Pour faire fonctionner les tests Nightwatch sur Linux, vous devez simplement changer le "server_path" du "webdriver" à la ligne 11 du fichier nightwatch.json. Normalement, le path du chromedriver sur Linux devrait être: `node_modules/.bin/chromedriver`. Pour MacOs, il faut changer le même path pour: `node_modules/chromedriver/lib/chromedriver/chromedriver`. Pour le Windows, le path est `node_modules/chromedriver/lib/chromedriver/chromedriver.exe`.

La version du module `chromedriver` doit correspondre à la version de Chrome de votre machine. Par défaut, la version est **109**. Vous devez mettre à jour votre version de Chrome si elle n'est pas à jour avec **109** ou modifier la version dans `package.json` et relancer `npm install` si votre version de Chrome est supérieure à **109**.

### Sur MacOS

Pour les tests, vous devez également changer, dans le fichier `nightwatch.json`, la version du `launch_url` pour `"http://localhost:5001"` ou le port qui vous avez configuré dans **bs-config.json**.

## Exécution des tests

### Tests de bout en bout avec Nightwatch
Vous pouvez exécuter les tests automatisés avec les commandes `npm start` ou `npm run e2e` dans le répertoire `nightwatch`. Ceci exécutera les tests et produire un rapport dans votre terminal.

**Note** : comme le travail utilise les modules ES (**ESM**), les tests automatisés doivent être exécutés sur des pages Web servies par un vrai serveur HTTP. Vous devez avoir un serveur actif avant de pouvoir exécuter vos tests. Lancez votre déploiement local dans un autre terminal avant d'exécuter vos tests.