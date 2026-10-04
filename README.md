# HideBadgesGUI

Plugin **Vencord** (userplugin) qui masque les badges de profil de ton choix, avec une interface pour sélectionner chaque badge.

## Fonctionnalités
- Détection automatique des badges affichés (Discord, Vencord, autres)
- Liste avec aperçu de l'icône, recherche, clic pour masquer/afficher
- Boutons « Tout masquer », « Tout afficher », « Scanner », « Réinitialiser »
- Option « Masquer TOUS les badges »
- Application instantanée, sans recharger Discord

## Installation
1. Clone Vencord depuis les sources : https://docs.vencord.dev/installing/
2. Crée le dossier `src/userplugins/` s'il n'existe pas.
3. Copie ce dépôt dedans :
   ```bash
   cd src/userplugins
   git clone https://github.com/TON_PSEUDO/vencord-hidebadgesgui hideBadgesGUI
   ```
4. Build et injecte :
   ```bash
   pnpm build
   pnpm inject
   ```
5. Recharge Discord (Ctrl+R) et active **HideBadgesGUI** dans Paramètres → Vencord → Plugins.

## Utilisation
Ouvre un profil : les badges vus apparaissent dans les réglages du plugin. Clique sur un badge pour le masquer.

## Remarque
Les badges apparaissent dans la liste seulement après avoir été affichés au moins une fois. Discord change souvent ses classes CSS ; si un badge ne se masque plus, ouvre une issue.

## Licence
GPL-3.0-or-later (comme Vencord).
