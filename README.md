# Mon panier — liste de courses par rayon

Application web en français pour préparer ses courses chez Lidl ou E.Leclerc, utilisable sur téléphone et ordinateur. Aucun compte ni dépendance à installer.

## Utilisation

Ouvrir `index.html` dans un navigateur récent, ou servir ce dossier avec un serveur web statique. Pour GitHub Pages, sélectionner la branche `main` et le dossier `/ (root)` dans **Settings → Pages**.

- Ajouter des articles et leur quantité, avec suggestion automatique du rayon.
- Corriger le rayon de chaque article lorsque nécessaire.
- Choisir Lidl ou E.Leclerc et personnaliser séparément l’ordre des rayons avec les flèches.
- Cocher les achats, retirer les articles cochés, copier ou imprimer la liste.
- Retrouver sa liste grâce à la sauvegarde locale du navigateur.

Les parcours par défaut sont des exemples personnalisables, et non les plans officiels des enseignes. La liste d’articles est commune aux deux magasins ; seul le parcours change. Le classement automatique repose sur un petit dictionnaire local ; les produits inconnus sont placés dans « Autres articles ». La copie peut nécessiter HTTPS. Les données restent dans le navigateur, sans synchronisation entre appareils ; effacer les données du navigateur efface la sauvegarde.

Application indépendante, sans affiliation à Lidl ou E.Leclerc.

## Vérification

Avec Node.js : `node --test catalog.test.cjs`. Aucune installation nécessaire.
