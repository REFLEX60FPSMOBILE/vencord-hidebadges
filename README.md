# 🎮 Discord Tools - Plugin Vencord

![Discord Tools Banner](https://img.shields.io/badge/Vencord-Plugin-blue?style=for-the-badge&logo=discord)
![Version](https://img.shields.io/badge/Version-2.1.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-GPL--3.0-orange?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge&logo=typescript)
![Lines of Code](https://img.shields.io/badge/Code-15000%2B-lines-green?style=for-the-badge)

**Discord Tools** est un plugin **Vencord** complet qui transforme ton expérience Discord. 
**Plus qu'un simple masqueur de badges, c'est un outil tout-en-un** pour la personnalisation, la modération et la productivité.

## 🎯 **NOUVEAU dans la v2.1.0 : Sélection Visuelle des Badges !**

La fonctionnalité que tu demandais est **enfin là** ! 🎉

### 🖱️ **Comment ça marche ?**
1. Ouvre les paramètres du plugin → onglet **"Mon Profil"**
2. **Ton profil s'affiche** avec tous tes badges en direct
3. **Clique sur un badge** pour le masquer (il devient transparent avec un ✕ rouge)
4. **Clique à nouveau** pour le réafficher
5. **Les changements s'appliquent IMMEDIATEMENT** sur TOUS les profils (le tien ET ceux des autres) !

### 💥 **Pourquoi c'est révolutionnaire ?**
- **✅ Visuel** : Tu vois exactement ce que tu masques
- **✅ Instantané** : Pas besoin de recharger Discord
- **✅ Intuitif** : Clic = masquer, re-clic = afficher
- **✅ Universel** : Ça marche sur TON profil ET ceux des autres
- **✅ Pratique** : Plus besoin de chercher dans une liste

---

## ✨ **Toutes les Fonctionnalités**

### 🏷️ Gestion des Badges
- **👤 Aperçu du profil** avec sélection visuelle (NOUVEAU v2.1.0)
- **Détection automatique** des badges Discord, Vencord et personnalisés
- **Interface graphique** avec aperçu des icônes
- **Recherche et filtrage** par nom ou catégorie
- **Masquage sélectif** ou global de tous les badges
- **Scanner automatique** des nouveaux badges
- **Réinitialisation** du catalogue

### 🏢 Paramètres par Serveur (NOUVEAU v2.1.0)
- **Personnalisation unique** pour chaque serveur
- **Masquage différent** selon la communauté
- **Gestion complète** depuis l'onglet "Par Serveur"
- **Basculage rapide** par serveur

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

### 💾 Export/Import (NOUVEAU v2.1.0)
- **Sauvegarde** de tous tes paramètres
- **Partage** avec tes amis
- **Synchronisation** entre appareils
- **Format JSON** complet

### ⌨️ Raccourcis Clavier
- **Ctrl + B** : Basculer les badges
- **Ctrl + U** : Basculer l'UI personnalisée
- **Ctrl + Shift + S** : Scanner les badges

---

## 📸 **Aperçu Visuel**

### Onglet "Mon Profil" (NOUVEAU)
```
┌─────────────────────────────────────────┐
│  👤 Aperçu du Profil                        │
│  ┌─────────────────────────────────────┐ │
│  │  [Bannière]                          │ │
│  │                                     │ │
│  │       [Avatar]                       │ │
│  │       Ton Pseudo                     │ │
│  │                                     │ │
│  │  🏷️  💜  🟢  ✕  ✕  ✕              │ │
│  │  Badge1 Badge2 Badge3 Masqué Masqué │ │
│  │                                     │ │
│  │  (Clique sur un badge pour masquer)  │ │
│  └─────────────────────────────────────┘ │
│  🔍 Scanner  +12 (Afficher plus)         │
└─────────────────────────────────────────┘
```

### Onglet "Liste Badges"
```
┌─────────────────────────────────────────┐
│  🏷️ Sélection des Badges                 │
│  24 badges détectés • 5 masqués          │
│  [🔍 Rechercher...] [Masqués seulement]   │
│  [Tous] [discord] [vencord] [custom]      │
│  [🚫 Tout masquer] [👁️ Tout afficher]    │
│                                             │
│  ┌─────┐ ┌─────┐ ┌─────┐               │
│  │ 🏷️ │ │ 💜 │ │ 🟢 │ ✓              │
│  │ Badge│ │Badge│ │Badge│               │
│  │Discord│ │Vencord│ │Custom│ ✓          │
│  └─────┘ └─────┘ └─────┘               │
└─────────────────────────────────────────┘
```

---

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

---

## 🚀 Utilisation

### 🎯 **Sélection Visuelle des Badges (NOUVEAU)**

1. **Ouvre les paramètres** du plugin (Paramètres → Vencord → Plugins → Discord Tools → ⚙️ Configurer)
2. **Va dans l'onglet "Mon Profil"**
3. **Ton profil s'affiche** avec tous tes badges
4. **Clique sur un badge** pour le masquer (il devient transparent avec un ✕)
5. **Clique à nouveau** pour le réafficher
6. **C'est tout !** Les changements s'appliquent immédiatement partout dans Discord

**✨ Astuce :** Les badges que tu masques ici sont cachés **sur TOUS les profils** (le tien ET ceux des autres utilisateurs).

### 📋 **Gestion par Liste**

1. Va dans l'onglet **"Liste Badges"**
2. Utilise la **recherche** pour trouver un badge spécifique
3. **Filtre par catégorie** (Discord, Vencord, Custom)
4. **Coche/décoche** les badges à masquer
5. Utilise **"Tout masquer"** ou **"Tout afficher"** pour une action rapide

### 🏢 **Paramètres par Serveur**

1. Va dans l'onglet **"Par Serveur"**
2. **Ajoute un serveur** avec son ID
3. Configure les **badges à masquer** pour ce serveur
4. Active/désactive le **masquage global** pour ce serveur

**Exemple :**
- Sur ton serveur gaming : Masque les badges Nitro
- Sur ton serveur art : Garde tous les badges
- Sur ton serveur ami : Masque les badges Hypesquad

### 🎨 **Personnalisation UI**

1. Va dans l'onglet **"Personnalisation UI"**
2. Choisis un **thème prédéfini** ou crée le tien
3. Active/désactive les options :
   - Masquer les timestamps
   - Masquer les avatars
   - Mode compact
4. Ajoute du **CSS personnalisé** pour des modifications avancées

### 🛡️ **Outils de Modération**

1. Active la modération dans l'onglet **"Modération"**
2. **Ajoute des règles** avec des expressions régulières
3. Choisis l'**action** à effectuer (Masquer, Avertir, Bloquer)
4. Les **statistiques** sont mises à jour automatiquement

**Exemples de règles :**
- `(http|https)://(bit\.ly|tinyurl)` → Masquer les liens raccourcis
- `(discord\.gg|discord\.com/invite)` → Avertir pour les invitations
- `(fuck|shit|bitch)` → Masquer les insultes

### 💾 **Export/Import**

1. Va dans l'onglet **"Export/Import"**
2. **Exporte** tes paramètres :
   - Télécharge un fichier JSON
   - Copie dans le presse-papiers
3. **Importe** une configuration :
   - Depuis un fichier
   - Depuis le presse-papiers

---

## ⚙️ Configuration

Le plugin propose une interface de configuration complète accessible via :
```
Paramètres Discord → Vencord → Plugins → Discord Tools → ⚙️ Configurer
```

### 📋 **Onglets Disponibles**

| Onglet | Description | Nouveauté |
|--------|-------------|-----------|
| 👤 Mon Profil | Aperçu du profil + sélection visuelle des badges | ✅ v2.1.0 |
| 🏷️ Liste Badges | Liste complète avec recherche et filtrage | ❌ |
| 🏢 Par Serveur | Paramètres spécifiques par serveur | ✅ v2.1.0 |
| 🎨 Personnalisation UI | Thèmes, timestamps, avatars, CSS | ❌ |
| 🛡️ Modération | Règles de filtrage automatique | ❌ |
| ⚡ Actions Rapides | Actions en un clic | ❌ |
| 💾 Export/Import | Sauvegarde et restauration | ✅ v2.1.0 |

---

## 💡 **Conseils & Astuces**

### 🎯 Pour la Sélection Visuelle
1. **Ouvre un profil** (le tien ou celui d'un ami) pour détecter les badges
2. **Les badges apparaissent** dans l'onglet "Mon Profil" après détection
3. **Clique directement** sur un badge pour le masquer
4. **Le ✕ rouge** indique que le badge est masqué
5. **Re-clique** pour le réafficher

### 🏢 Pour les Paramètres par Serveur
1. **Récupère l'ID du serveur** depuis l'URL ou les paramètres Discord
2. **Ajoute le serveur** dans l'onglet "Par Serveur"
3. **Configure les masquages** spécifiques à ce serveur
4. **Les paramètres s'appliquent automatiquement** quand tu changes de serveur

### 🔧 Pour le CSS Personnalisé
- Utilise **F12** (Inspecteur) pour trouver les sélecteurs
- Teste ton CSS sur [CodePen](https://codepen.io/) avant de l'appliquer
- Exemple : `.message { background: rgba(255, 0, 0, 0.1) !important; }`

### 📊 Pour la Modération
- **Regex101** est ton ami : [https://regex101.com/](https://regex101.com/)
- Teste tes expressions régulières avant de les ajouter
- Commence par des règles simples, puis complexifie

---

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
│   ├── index.tsx              # Point d'entrée du plugin
│   ├── components/
│   │   ├── SettingsPanel.tsx  # Panneau de configuration principal
│   │   ├── ProfilePreview.tsx  # Aperçu du profil + sélection visuelle (NOUVEAU)
│   │   ├── BadgeSelection.tsx  # Liste des badges avec filtrage
│   │   ├── ServerSettings.tsx  # Paramètres par serveur (NOUVEAU)
│   │   ├── UICustomization.tsx # Personnalisation UI
│   │   ├── ModerationTools.tsx # Outils de modération
│   │   ├── QuickActions.tsx    # Actions rapides
│   │   └── ExportImport.tsx    # Export/Import (NOUVEAU)
│   ├── types/
│   │   └── index.ts           # Définitions TypeScript
│   ├── utils/
│   │   ├── constants.ts        # Constantes et configurations
│   │   ├── helpers.ts          # Fonctions utilitaires
│   │   └── serverHelpers.ts    # Utilitaires pour les serveurs (NOUVEAU)
│   ├── styles/
│   │   └── index.ts           # Styles Discord-like
│   └── assets/
│       └── icons.ts           # Icônes pour l'interface
├── package.json
├── tsconfig.json
├── .eslintrc.json
└── README.md
```

---

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

---

## 🐛 Signaler un bug

Si tu trouves un bug, merci de :

1. Vérifier que le bug n'a pas déjà été signalé
2. Ouvrir une **Issue** sur GitHub avec :
   - Une description claire du bug
   - Les étapes pour reproduire
   - Des captures d'écran si possible
   - Ta version de Vencord et de Discord
   - Ton système d'exploitation et navigateur

---

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

---

## 📞 Support

- **GitHub Issues** : [https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/issues](https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/issues)
- **Discord** : Rejoins le serveur Vencord pour du support
- **Documentation Vencord** : [https://docs.vencord.dev](https://docs.vencord.dev)

---

## 🎉 Remerciements

- À l'équipe **Vencord** pour ce projet incroyable
- À tous les contributeurs et testeurs
- À la communauté Discord pour son support
- **À TOI** pour utiliser ce plugin ! 💙

---

**Discord Tools v2.1.0** - L'expérience Discord ultime, **exactement comme tu la veux** ! 🚀

*"Parce que Discord mérite d'être personnalisé à 100%"*
