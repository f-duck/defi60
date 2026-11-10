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

- Défi 60 du 28/09/2026 au 31/12/2026, 4 Mixte + 1 sport libre par semaine, soit 5 séances à valider.
- 2 jokers maximum par semaine, non comptés.
- 6 familles de 6 exercices.
- Mixte 1/3 : 3 familles ; Mixte 2/4 : les 3 restantes.
- 2 exercices par famille, sans répétition avant la fin du cycle.
- Formats : EMOM 12, EMOM 18, AMRAP 15, Ladder 10→1, Pyramide 5-10-15-20-15-10-5 sur exercices étoilés, Challenge 6 × 1 min × 2 avec 1 min de pause.
- Le jour actif est sélectionnable dans la semaine ; Sport libre et Joker affichent leur icône sur le jour choisi.
- Cliquer sur la photo d’un exercice ouvre un exemple d’exécution et rappelle la dose active.
- La dose active choisit automatiquement le niveau le plus avancé renseigné pour l’exercice.
- Chaque ligne de l’historique peut être supprimée ; une séance supprimée est retirée du compteur et de la rotation quand ses détails sont disponibles.
- La semaine se réinitialise automatiquement le lundi : le compteur hebdomadaire et les jokers repartent à zéro, tandis que l’historique global est conservé.
- Un seul Joker et un seul Sport libre peuvent être enregistrés par jour.
- L’ordre des séances Mixte avance à la validation : M1 → M2 → M3 → M4, puis revient à M1. Tirer à nouveau une séance avant de la valider ne consomme pas l’étape suivante.
- Apple Santé/Fitness n’est pas connecté automatiquement dans cette PWA ; utiliser Apple Watch en « Entraînement fonctionnel » pour l’enregistrement Apple, puis valider la séance dans Défi 60.

## Widget iPhone avec Scriptable

Le script [scriptable/Defi60Widget.js](scriptable/Defi60Widget.js) affiche la progression de la semaine, les jours réalisés et la prochaine séance Mixte. L’application synchronise uniquement ce résumé (pas l’historique complet) vers un petit service privé utilisé par le widget.

1. Ouvrir le fichier du script depuis GitHub ou le télécharger.
2. Dans Scriptable, créer un nouveau script et coller son contenu.
3. Ajouter un widget Scriptable à l’écran d’accueil, choisir ce script et sélectionner la taille moyenne.
4. Taper le widget ouvre directement l’application Défi 60.

Le widget se met à jour quand l’application est enregistrée ou modifiée ; iOS décide ensuite du moment exact où il recharge le widget.
