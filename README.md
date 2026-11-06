# Défi 60 — PWA fitness

Application web responsive/PWA en français pour remplacer les fiches Apple Notes du programme Défi 60.

## Utiliser localement

Un serveur HTTP est recommandé pour activer le service worker et l'installation PWA :

```bash
python3 -m http.server 4173
```

Puis ouvrir http://localhost:4173. Pour tester sur un téléphone du même Wi-Fi, utiliser l'adresse IP du Mac à la place de `localhost`.

## Déployer

Le projet est un site statique : publier le contenu de ce dossier sur GitHub Pages, Netlify, Cloudflare Pages ou un hébergeur statique équivalent. Il doit être servi en HTTPS pour l'installation PWA. Cette version n'est pas hébergée publiquement.

## Données

Les niveaux, séances, commentaires et cycle sont sauvegardés dans le navigateur. Utiliser **Historique → Exporter** avant de changer d'appareil, puis **Importer un fichier** sur le nouvel appareil.

## Règles intégrées

- Défi 60 du 28/09/2026 au 31/12/2026, 4 Mixte + 1 sport libre par semaine.
- 2 jokers maximum par semaine, non comptés.
- 6 familles de 6 exercices.
- Mixte 1/3 : 3 familles ; Mixte 2/4 : les 3 restantes.
- 2 exercices par famille, sans répétition avant la fin du cycle.
- Formats : EMOM 12, EMOM 18, AMRAP 15, Ladder 10→1, Pyramide 5-10-15-20-15-10-5 sur exercices étoilés, Challenge 6 × 1 min × 2 avec 1 min de pause.
