# GeneArchives

## Description
GeneArchives est une extension Firefox qui permet aux utilisateurs de trouver rapidement la page d'archives numérisées d'état civil et/ou registres paroissiaux d'une commune. Pour la plupart des départements, la recherche sera pré-remplie sur la page des archives départementales.

## Installation

### Prérequis
- Node.js
- npm

### Instructions de build
1. Clonez le dépôt GitHub : `git clone https://github.com/flmartineau/France_GeneArchives.git`
2. Installez les dépendances : `npm install`
3. Construisez l'extension : `npm run build`
4. L'extension construite sera disponible dans le répertoire `dist`.


## Utilisation
1. Cliquez sur l'icône de l'extension dans la barre d'outils pour ouvrir la popup de recherche.
2. Saisissez le nom de la ville que vous recherchez.
3. Sélectionnez une ville dans les suggestions d'autocomplétion.
4. Cliquez sur le bouton "Recherche" pour être redirigé vers la page des archives départementales associée à la commune.

## Limitations
- Certains départements ne permettent pas de préciser la commune dans la barre de recherche.
- Les noms des anciennes communes ne sont pas encore supportées.


## Mises à jour futures
- Ajout des anciennes communes
- Ajout de filtres pour les années ainsi que le type de document (ex: Recensements)


## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
