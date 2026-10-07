# 🎮 Discord Tools - Plugin Vencord

![Discord Tools Banner](https://img.shields.io/badge/Vencord-Plugin-blue?style=for-the-badge&logo=discord)
![Version](https://img.shields.io/badge/Version-2.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-GPL--3.0-orange?style=for-the-badge)

**Discord Tools** est un plugin **Vencord** complet qui transforme ton expérience Discord. Plus qu'un simple masqueur de badges, c'est un outil tout-en-un pour la personnalisation, la modération et la productivité.

## ✨ Fonctionnalités

### 🏷️ Gestion des Badges
- **Détection automatique** des badges Discord, Vencord et personnalisés
- **Interface graphique** avec aperçu des icônes
- **Recherche et filtrage** par nom ou catégorie
- **Masquage sélectif** ou global de tous les badges
- **Scanner automatique** des nouveaux badges
- **Réinitialisation** du catalogue

### 🎨 Personnalisation UI
- **Thèmes prédéfinis** (Sombre, Clair, Vert, Rouge, etc.)
- **Thème personnalisé** avec éditeur de couleurs
- **Masquage des timestamps** des messages
- **Masquage des avatars** des utilisateurs
- **Mode compact** pour réduire l'espacement
- **CSS personnalisé** pour des modifications avancées

### 🛡️ Outils de Modération
- **Filtres par expressions régulières**
- **Actions automatiques** : Masquer, Avertir, Bloquer
- **Statistiques** en temps réel
- **Gestion des règles** (activation/désactivation)
- **Réinitialisation** des statistiques

### ⚡ Actions Rapides
- **Basculer les badges** d'un clic
- **Basculer les avatars** rapidement
- **Basculer les timestamps**
- **Mode compact** instantané
- **Effacer le cache** des badges
- **Scanner** les nouveaux badges

### ⌨️ Raccourcis Clavier
- **Ctrl + B** : Basculer les badges
- **Ctrl + U** : Basculer l'UI personnalisée
- **Ctrl + Shift + S** : Scanner les badges

## 📸 Captures d'écran

*Disponibles bientôt...*

## 📥 Installation

### Méthode 1 : Installation via Git (Recommandé)

1. **Installe Vencord** depuis les sources : [Documentation Vencord](https://docs.vencord.dev/installing/)
2. Crée le dossier `src/userplugins/` s'il n'existe pas
3. Clone ce dépôt dans le dossier des plugins :
   ```bash
   cd src/userplugins
   git clone https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges discordTools
   ```
4. Build et injecte :
   ```bash
   pnpm build
   pnpm inject
   ```
5. Recharge Discord (Ctrl+R)
6. Active **Discord Tools** dans : Paramètres → Vencord → Plugins

### Méthode 2 : Téléchargement direct

1. Télécharge le fichier ZIP depuis [les releases](https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/releases)
2. Extrait le contenu dans `src/userplugins/discordTools/`
3. Exécute :
   ```bash
   pnpm build
   pnpm inject
   ```
4. Recharge Discord et active le plugin

## 🚀 Utilisation

### Gestion des Badges

1. Ouvre un profil utilisateur ou une popout
2. Les badges détectés apparaissent dans l'onglet **Badges** des paramètres du plugin
3. Clique sur un badge pour le masquer/afficher
4. Utilise les boutons "Tout masquer", "Tout afficher", "Scanner" ou "Réinitialiser"

### Personnalisation UI

1. Va dans l'onglet **Personnalisation UI**
2. Choisis un thème prédéfini ou crée le tien
3. Active/désactive les options selon tes préférences
4. Ajoute du CSS personnalisé pour des modifications avancées

### Outils de Modération

1. Active la modération dans l'onglet **Modération**
2. Ajoute des règles avec des expressions régulières
3. Choisis l'action à effectuer (Masquer, Avertir, Bloquer)
4. Les statistiques sont mises à jour automatiquement

### Actions Rapides

1. Active les actions que tu utilises souvent
2. Exécute-les depuis l'onglet **Actions Rapides** ou avec des raccourcis clavier

## ⚙️ Configuration

Le plugin propose une interface de configuration complète accessible via :
```
Paramètres Discord → Vencord → Plugins → Discord Tools → ⚙️ Configurer
```

### Paramètres disponibles :

| Catégorie | Option | Description |
|-----------|--------|-------------|
| **Badges** | Masquer TOUS les badges | Active/désactive le masquage global |
| **UI** | Thème | Sélectionne un thème ou crée le tien |
| **UI** | Masquer les timestamps | Cache l'heure des messages |
| **UI** | Masquer les avatars | Cache les avatars |
| **UI** | Mode compact | Réduit l'espacement |
| **UI** | CSS personnalisé | Ajoute ton propre CSS |
| **Modération** | Activer la modération | Active/désactive le système |
| **Modération** | Règles | Gère les filtres automatiques |

## 🎯 Exemples de Règles de Modération

| Nom | Expression | Action | Description |
|-----|------------|--------|-------------|
| Liens de spam | `(http|https)://(bit\.ly|tinyurl|goo\.gl|t\.co)` | Masquer | Bloque les raccourcisseurs d'URL |
| Invitations Discord | `(discord\.gg|discord\.com/invite)` | Avertir | Détecte les invitations |
| Mots inappropriés | `(fuck|shit|bitch|asshole)` | Masquer | Filtre les insultes |
| Publicité | `(buy|cheap|discount|offer)` | Masquer | Bloque les messages publicitaires |

## 💡 Conseils

1. **Détection des badges** : Les badges apparaissent dans la liste seulement après avoir été affichés au moins une fois. Ouvre différents profils pour les détecter.

2. **Expressions régulières** : Pour des règles de modération plus avancées, utilise des expressions régulières. Teste tes patterns sur [Regex101](https://regex101.com/).

3. **CSS personnalisé** : Utilise l'inspecteur de ton navigateur (F12) pour trouver les sélecteurs CSS à modifier.

4. **Performance** : Si Discord est lent, désactive les options gourmandes comme le mode compact ou le CSS personnalisé.

5. **Mises à jour** : Discord change souvent ses classes CSS. Si un badge ne se masque plus, ouvre une issue sur GitHub.

## 🛠️ Développement

### Prérequis
- Node.js v16+
- pnpm
- Vencord installé

### Commandes
```bash
# Installation des dépendances
pnpm install

# Build du plugin
pnpm build

# Build en mode watch
pnpm dev

# Injection dans Discord
pnpm inject

# Vérification du code
pnpm lint
pnpm typecheck
```

### Structure du projet
```
.
├── src/
│   ├── index.tsx           # Point d'entrée du plugin
│   ├── components/         # Composants React
│   │   ├── BadgeManager.tsx
│   │   ├── UICustomization.tsx
│   │   ├── ModerationTools.tsx
│   │   ├── QuickActions.tsx
│   │   └── SettingsPanel.tsx
│   ├── types/              # Définitions TypeScript
│   │   └── index.ts
│   ├── utils/              # Utilitaires
│   │   ├── constants.ts
│   │   └── helpers.ts
│   └── styles/             # Styles et thèmes
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le dépôt
2. Crée une branche pour ta fonctionnalité (`git checkout -b feature/ta-fonctionnalité`)
3. **Commit** tes modifications (`git commit -m 'Ajout de ta fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/ta-fonctionnalité`)
5. Ouvre une **Pull Request**

### Règles de contribution
- Respecte le style de code existant
- Ajoute des commentaires pour expliquer le code complexe
- Teste tes modifications avant de committer
- Mets à jour la documentation si nécessaire

## 🐛 Signaler un bug

Si tu trouves un bug, merci de :

1. Vérifier que le bug n'a pas déjà été signalé
2. Ouvrir une **Issue** sur GitHub avec :
   - Une description claire du bug
   - Les étapes pour reproduire
   - Des captures d'écran si possible
   - Ta version de Vencord et de Discord
   - Ton système d'exploitation et navigateur

## 📜 Licence

Ce projet est sous licence **GPL-3.0-or-later**, comme Vencord.

```
Discord Tools - Un plugin Vencord par REFLEX60FPSMOBILE

Copyright (C) 2024 REFLEX60FPSMOBILE

Ce programme est un logiciel libre : tu peux le redistribuer et/ou le modifier
selon les termes de la Licence Publique Générale GNU telle que publiée par la
Free Software Foundation, soit la version 3 de la Licence, soit (à ton
option) toute version ultérieure.

Ce programme est distribué dans l'espoir qu'il sera utile, mais SANS AUCUNE
GARANTIE ; sans même la garantie implicite de COMMERCIALISABILITÉ ou de
CONFORMITÉ À UN USAGE PARTICULIER. Voir la Licence Publique Générale GNU pour
plus de détails.

Tu devrais avoir reçu une copie de la Licence Publique Générale GNU avec ce
programme. Si ce n'est pas le cas, voir <https://www.gnu.org/licenses/>.
```

## 📞 Support

- **GitHub Issues** : [https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/issues](https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/issues)
- **Discord** : Rejoins le serveur Vencord pour du support
- **Documentation Vencord** : [https://docs.vencord.dev](https://docs.vencord.dev)

## 🎉 Remerciements

- À l'équipe **Vencord** pour ce projet incroyable
- À tous les contributeurs et testeurs
- À la communauté Discord pour son support

---

**Discord Tools** - Améliore ton expérience Discord dès aujourd'hui ! 🚀
