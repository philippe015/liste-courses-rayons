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

## Parcours Lidl Champigny

Le profil Lidl correspond au magasin du 1388 rue de Bernau à Champigny-sur-Marne. Il propose un trajet depuis l’entrée, par le côté droit et le fond, puis un retour par les allées centrales vers les caisses. La liste affichée, copiée et imprimée suit le même ordre.

Ordre proposé : pain → fruits et légumes → viande et charcuterie → poisson → produits frais et œufs → surgelés → boissons → épicerie salée → entretien → hygiène et bébé → animaux → épicerie sucrée → autres.

Source : [dossier pédagogique du concours général des métiers 2022, page 40](https://j4.cerpeg.fr/images/ConcoursDesMetiers/mcv-a/2022/CGM_BacPro-MCVA_2022_EpreuveOrale-SUJET.pdf#page=40). Il s’agit d’une interprétation du plan ancien, sans garantie de correspondance avec l’aménagement actuel. Le document précise que certaines données ont été modifiées pour confidentialité. Les positions des fruits et légumes et du poisson restent provisoires ; les grandes catégories de l’application regroupent parfois plusieurs emplacements du plan, notamment la viande et la charcuterie.

L’ancien parcours Lidl par défaut est automatiquement remplacé, sans supprimer les articles. Les parcours personnalisés sont conservés. Pour appliquer volontairement le nouveau parcours à une liste déjà personnalisée, ouvrir « Personnaliser le parcours des rayons », puis « Appliquer le parcours Champigny ».

## Vérification

Avec Node.js : `node --test catalog.test.cjs`. Aucune installation nécessaire.
