# TP3

Le but de ce travail pratique est de vous familiariser avec les tests unitaires et la validation et vérification de code JS à l'aide de la librairie `Jest`. Plus particulièrement, vous allez écrire les tests unitaires pour une version modifiée du TP2 ainsi que quelques nouvelles fonctionnalités ajoutées pour ce travail.ous pourrez aussi continuer à vous familiariser avec l’exécution de test de bout en bout avec la librairie `Nightwatch`.

Pour ce TP, le site web et ses tests unitaires ont été placés dans un projet différent (répertoire `site-web`) que les tests de bout en bout avec `Nightwatch` (répertoire `nightwatch`).

## Installation des librairies nécessaires

Pour pouvoir avoir les librairies nécessaires pour le TP, vous aurez besoin de l'environnement d'exécution NodeJS et le gestionnaire de paquet npm. Vous pouvez les installer sur votre machine à partir du [lien suivant](https://nodejs.org/en/download/). On vous recommande d'installer la version _LTS_.

Pour installer les dépendances nécessaires, lancez la commande `npm ci` dans les répertoires `site-web` et `nightwatch`. Ceci installera toutes les librairies définies dans le fichier `package-lock.json`. Vous pouvez par la suite utiliser les libraires de test et les scripts définis dans le même fichier.

## Exécution des tests

### Tests de bout en bout avec Nightwatch

Consultez le [README](./nightwatch/README.MD) pour les informations détaillées pour lancer les tests de bout en bout (_e2e_).

### Tests de bout en bout avec Jest

Vous pouvez exécuter les tests unitaires automatisés avec la commande `npm test`. Ceci exécutera les tests et produira un rapport dans votre terminal.

Vous pouvez calculer la couverture du code avec la commande `npm run coverage`. Ceci produira un rapport dans votre terminal ainsi que dans le répertoire coverage.

## Déploiement local

Vous pouvez faire un déploiement local de votre site avec l'outil `lite-server`. Si vous lancez la commande `npm start` dans la racine du projet, un serveur HTTP statique sera déployé sur votre machine et votre site sera accessible sur l'adresse `localhost:5000` ou `<votre-adresse-IP>:5000`. La sortie dans le terminal vous donnera l'adresse exacte d'accès.

### Sur MacOS

Si vous utilisez MacOS comme système d'exploitation, vous devez changer le port de 5000 à **5001** dans le fichier **bs-config.json** (le port 5000 est utilisé par [Airplay](https://developer.apple.com/forums/thread/682332)).
Notez que la correction des travaux ne se fera pas sur MacOS, assurez-vous donc du bon fonctionnement de votre code sur une machine Linux comme celles du local L-4714.

## Liste de chansons

Les fichiers des chansons initiales sont disponibles dans le répertoire `assets/media`. Les chansons sont libres de droits et obtenues du site [pixabay](https://pixabay.com/music/). Vous pouvez ajouter des chansons supplémentaires à votre remise si vous voulez en vous assurant de mettre à jour l'information des chansons dans le fichier `songs.js` dans le répertoire `assets/js`.

# Correction

Excellent ! Bravo !

Question de compréhension #3 : ajouter de la pagination ? Peut-être plus développer... car ce n'est pas la pagination, mais LIMIT au sein d'une query qui pourrait améliorer les performances.

| **Exigences**                                     | **Note** | **Points** |
| ------------------------------------------------- | :------: | :--------: |
| Recherche dans la bibliothèque                    |    3     |     3      |
| Tests dans _library.test.js_                      |    2     |     2      |
| Tests dans _player.test.js_                       |    3     |     3      |
| Tests dans _playlist\_editor.test.js_             |    3     |     3      |
| Tests dans _playlist.test.js_                     |    4     |     4      |
| Tests dans _storageManager.test.js_               |    1.93     |     2      |
| Qualité et clarté du code                         |    1     |     1      |
| Questions de compréhension                        |    1.75     |     2      |
| **Total**                                         | **19.68**    |   **20**   |