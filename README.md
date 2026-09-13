# The Ordinary Process — portfolio

Site statique : aucun build, aucune dépendance. Ouvre `index.html` dans un navigateur pour voir le site en local.

## Où mettre quoi

| Quoi | Où |
|---|---|
| Tes vidéos (mp4, vertical 9:16, H.264, < 20 Mo chacune) | `assets/videos/` |
| Les vignettes (jpg, 1080×1920) | `assets/posters/` |
| Un projet / une vidéo (titre, marque, objectif, livrables…) | `data/projects.js` |
| Email, Instagram, textes du hero, About, Services, preuves d'achat | `data/site.js` |
| Vidéo ou image du hero | `data/site.js` → `hero.video` / `hero.poster` |

### Ajouter une vidéo
1. Copie `ma-video.mp4` dans `assets/videos/` et `ma-video.jpg` dans `assets/posters/`.
2. Dans `data/projects.js`, copie un bloc `{ ... },` et remplace `video: "assets/videos/ma-video.mp4"`, `poster: "assets/posters/ma-video.jpg"`, et les textes.
3. Ou, si la vidéo est sur Google Drive : partage « Toute personne avec le lien », copie l'identifiant entre `/d/` et `/view`, et mets-le dans `driveId` (laisse `video: ""`).

### Compresser une vidéo (recommandé)
HandBrake (gratuit) → preset « Social 25 fps 1080p », ou iPhone → Réglages → Appareil photo → Formats → « Le plus compatible ».

### Formulaire de contact
Sans configuration, le bouton ouvre l'app mail avec les champs pré-remplis. Pour recevoir les demandes directement : crée un formulaire gratuit sur formspree.io, colle l'URL dans `data/site.js` → `formEndpoint`.

## Mise en ligne (GitHub Pages)
1. github.com → New repository → nom `ugc` (Public) → Create.
2. Add file → Upload files → glisse TOUT le contenu de ce dossier (index.html, styles.css, app.js, data/, assets/) → Commit.
3. Settings → Pages → Source « Deploy from a branch » → branche `main`, dossier `/ (root)` → Save.
4. Ton site : `https://TONPSEUDO.github.io/ugc/` (2–3 min). C'est cette URL qui va dans `{{portfolio_url}}` des templates n8n.

Pour mettre à jour : Upload files → glisse le fichier modifié → Commit. Le site se met à jour seul.
