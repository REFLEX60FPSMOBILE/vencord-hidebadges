# Shoyz Tools - Suite d'outils complète pour Discord

![Plugin Vencord](https://img.shields.io/badge/Vencord-Plugin-blue?style=for-the-badge&logo=discord)
![Version](https://img.shields.io/badge/Version-1.0.0-green?style=for-the-badge)
![Licence](https://img.shields.io/badge/License-GPL--3.0--or--later-orange?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge&logo=typescript)

**Shoyz Tools** est un plugin **Vencord** complet qui transforme votre expérience Discord.
**Bien plus qu'un simple masqueur de badges, c'est une suite d'outils tout-en-un** pour la personnalisation, la modération, l'OSINT et la productivité.

📖 **[Read in English](README.md)**

## Fonctionnalités OSINT

Shoyz Tools inclut de puissantes capacités OSINT (Open Source Intelligence) inspirées par Void-Tools, conçues à des fins éducatives et pour l'analyse de données publiques uniquement.

### Renseignement utilisateur
- Affichage du nom complet et du pseudonyme
- Suivi de l'ID Discord
- Date de création et âge du compte
- Statut Nitro et badges
- Serveurs mutuels et nombre d'amis
- Système de notation des menaces (échelle 0-10)

### Analyse de serveur
- Nombre de membres et statut en ligne
- Analyse des salons et des rôles
- Évaluation des risques de sécurité
- Détection du niveau NSFW
- Analyse du niveau de vérification
- Indicateurs d'activité suspecte

### Analyse de messages
- Extraction de liens et analyse de sécurité
- Détection d'adresses e-mail
- Identification de numéros de téléphone
- Suivi des invitations Discord
- Avertissements pour les URL raccourcies
- Évaluation des menaces pour chaque découverte

---

## Toutes les fonctionnalités

### Gestion des badges
- **Aperçu visuel du profil** : Cliquez sur les badges pour les masquer/afficher instantanément
- **Détection automatique** : Détecte les badges Discord, Vencord et personnalisés
- **Interface graphique** : Aperçu des icônes de badge avant masquage
- **Recherche et filtre** : Recherchez des badges par nom ou catégorie
- **Masquage sélectif** : Masquez des badges spécifiques ou tous à la fois
- **Analyse automatique** : Détecte automatiquement les nouveaux badges
- **Réinitialisation** : Effacez le catalogue de badges et recommencez

### Paramètres par serveur
- **Personnalisation unique** : Paramètres différents pour chaque serveur
- **Masquage de badges spécifique au serveur** : Remplacez les paramètres globaux par serveur
- **Gestion complète** : Contrôle total depuis l'onglet « Par serveur »
- **Changement rapide** : Basculez facilement entre les configurations de serveur

### Personnalisation de l'interface
- **Thèmes prédéfinis** : Sombre, Clair, Vert, Rouge et plus
- **Thème personnalisé** : Créez votre propre palette de couleurs
- **Masquer les horodatages** : Nettoyez votre vue de discussion
- **Masquer les avatars** : Concentrez-vous sur le contenu
- **Mode compact** : Réduisez l'espacement pour plus de messages
- **CSS personnalisé** : Modifications avancées avec votre propre CSS

### Outils de modération
- **Filtres regex** : Correspondance de motifs puissante
- **Actions automatiques** : Masquer, Avertir ou Bloquer les messages
- **Statistiques en temps réel** : Suivez l'activité de modération
- **Gestion des règles** : Activez/désactivez les règles selon vos besoins
- **Réinitialisation des statistiques** : Effacez les statistiques de modération

### Actions rapides
- **Basculer les badges** : Visibilité des badges en un clic
- **Basculer les avatars** : Visibilité rapide des avatars
- **Basculer les horodatages** : Contrôle instantané des horodatages
- **Mode compact** : Basculer le mode espacement
- **Vider le cache** : Supprimer les données de badge en cache
- **Analyser les badges** : Détecter de nouveaux badges

### Export/Import
- **Sauvegarde complète** : Enregistrez tous vos paramètres
- **Partage** : Exportez les configurations pour les partager avec des amis
- **Synchronisation** : Transférez les paramètres entre les appareils
- **Format JSON** : Format de configuration complet

### Raccourcis clavier
- **Ctrl + B** : Basculer les badges
- **Ctrl + U** : Basculer l'interface personnalisée
- **Ctrl + Shift + S** : Analyser les badges

---

## Installation

### Méthode 1 : Installation Git (Recommandée)

1. **Installez Vencord** depuis les sources : [Documentation Vencord](https://docs.vencord.dev/installing/)
2. Accédez à votre installation Vencord et créez `src/userplugins/` s'il n'existe pas
3. Clonez ce dépôt dans le dossier userplugins :
   ```bash
   cd src/userplugins
   git clone https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges shoyz-tools
   ```
4. Depuis le répertoire racine de Vencord, compilez et injectez :
   ```bash
   pnpm build
   pnpm inject
   ```
5. Rechargez Discord (Ctrl+R)
6. Activez **Shoyz Tools** dans : Paramètres > Vencord > Plugins

### Méthode 2 : Téléchargement manuel

1. Téléchargez le code le plus récent depuis ce dépôt
2. Extrayez le contenu dans `[vencord-racine]/src/userplugins/shoyz-tools/`
3. Depuis le répertoire racine de Vencord :
   ```bash
   pnpm build
   pnpm inject
   ```
4. Rechargez Discord et activez le plugin

> **Note** : Ceci est un userplugin Vencord. Il doit être placé dans le répertoire `userplugins` de votre installation Vencord et compilé avec le système de build de Vencord.

---

## Utilisation

### Sélection visuelle des badges

1. **Ouvrez les paramètres du plugin** (Paramètres > Vencord > Plugins > Shoyz Tools > Configurer)
2. **Allez dans l'onglet « Mon profil »**
3. **Votre profil s'affiche** avec tous vos badges
4. **Cliquez sur un badge** pour le masquer (devient transparent avec une croix rouge)
5. **Cliquez à nouveau** pour l'afficher
6. **C'est tout !** Les changements s'appliquent immédiatement partout dans Discord

**Astuce** : Les badges que vous masquez ici sont masqués sur **TOUS les profils** (le vôtre ET ceux des autres utilisateurs).

### Gestion de la liste

1. Allez dans l'onglet **« Liste de badges »**
2. Utilisez la **recherche** pour trouver des badges spécifiques
3. **Filtrez par catégorie** (Discord, Vencord, Personnalisé)
4. **Cochez/décochez** les badges à masquer
5. Utilisez **« Tout masquer »** ou **« Tout afficher »** pour des actions rapides

### Paramètres par serveur

1. Allez dans l'onglet **« Par serveur »**
2. **Ajoutez un serveur** avec son ID
3. Configurez **les badges à masquer** pour ce serveur
4. Basculez **le masquage global** pour ce serveur

**Exemple** :
- Sur votre serveur de jeu : Masquer les badges Nitro
- Sur votre serveur artistique : Afficher tous les badges
- Sur votre serveur d'amis : Masquer les badges Hypesquad

### Personnalisation de l'interface

1. Allez dans l'onglet **« Personnalisation de l'interface »**
2. Choisissez un **thème prédéfini** ou créez le vôtre
3. Basculez les options :
   - Masquer les horodatages
   - Masquer les avatars
   - Mode compact
4. Ajoutez du **CSS personnalisé** pour des modifications avancées

### Outils de modération

1. Activez la modération dans l'onglet **« Modération »**
2. **Ajoutez des règles** avec des expressions régulières
3. Choisissez l'**action** à effectuer (Masquer, Avertir, Bloquer)
4. Les **statistiques** se mettent à jour automatiquement

**Exemples de règles** :
- `(http|https)://(bit\.ly|tinyurl)` -> Masquer les liens raccourcis
- `(discord\.gg|discord\.com/invite)` -> Avertir pour les invitations
- `(fuck|shit|bitch)` -> Masquer les grossièretés

### Export/Import

1. Allez dans l'onglet **« Export/Import »**
2. **Exportez** vos paramètres :
   - Télécharger un fichier JSON
   - Copier dans le presse-papiers
3. **Importez** une configuration :
   - Depuis un fichier
   - Depuis le presse-papiers

---

## Configuration

Accédez à l'interface de configuration complète via :
```
Paramètres Discord > Vencord > Plugins > Shoyz Tools > Configurer
```

### Onglets disponibles

| Onglet | Description | Ajouté |
|--------|-------------|--------|
| Mon profil | Aperçu du profil + sélection visuelle des badges | v1.0.0 |
| Liste de badges | Liste complète avec recherche et filtrage | v1.0.0 |
| Par serveur | Paramètres spécifiques au serveur | v1.0.0 |
| Personnalisation UI | Thèmes, horodatages, avatars, CSS | v1.0.0 |
| Modération | Règles de filtrage automatique | v1.0.0 |
| Actions rapides | Actions en un clic | v1.0.0 |
| Export/Import | Sauvegarde et restauration | v1.0.0 |
| OSINT | Outils de renseignement open source | v1.0.0 |

---

## Module OSINT

Le module OSINT (Open Source Intelligence) fournit des informations éducatives sur les données Discord accessibles publiquement. Toutes les informations affichées sont déjà visibles via l'API officielle de Discord.

### Dossier utilisateur
- **Nom complet** : Nom d'affichage et pseudonyme
- **ID Discord** : Identifiant unique
- **Âge du compte** : Quand le compte a été créé
- **Badges** : Tous les badges Discord
- **Serveurs mutuels** : Serveurs que vous partagez avec l'utilisateur
- **Amis mutuels** : Nombre d'amis partagés
- **Score de menace** : Échelle 0-10 basée sur divers facteurs
- **Indicateurs de risque** : Avertissements visuels pour les comptes suspects

### Évaluation de la sécurité du serveur
- **Analyse des membres** : Total et membres en ligne
- **Répartition des salons** : Salons textuels, vocaux et catégories
- **Hiérarchie des rôles** : Tous les rôles avec permissions
- **Score de sécurité** : Échelle 0-10 basée sur les paramètres du serveur
- **Facteurs de risque** : Préoccupations de sécurité identifiées
- **Recommandations** : Suggestions pour améliorer la sécurité

### Analyseur de messages
- **Extraction de liens** : Toutes les URL trouvées dans les messages
- **Analyse de sécurité** : Classification sûr/non sûr
- **Avertissements URL raccourcies** : Alertes pour bit.ly, tinyurl, etc.
- **Détection d'e-mails** : Adresses e-mail extraites
- **Détection de téléphones** : Numéros de téléphone extraits
- **Suivi d'invitations** : Invitations de serveurs Discord
- **Évaluation des menaces** : Niveau de risque pour chaque découverte

---

## Astuces et conseils

### Pour la sélection visuelle des badges
1. **Ouvrez un profil** (le vôtre ou celui d'un ami) pour détecter les badges
2. **Les badges apparaissent** dans l'onglet « Mon profil » après détection
3. **Cliquez directement** sur un badge pour le masquer
4. **Croix rouge** indique que le badge est masqué
5. **Cliquez à nouveau** pour l'afficher

### Pour les paramètres par serveur
1. **Obtenez l'ID du serveur** depuis l'URL ou les paramètres Discord
2. **Ajoutez le serveur** dans l'onglet « Par serveur »
3. **Configurez le masquage** spécifique à ce serveur
4. **Les paramètres s'appliquent automatiquement** quand vous changez de serveur

### Pour le CSS personnalisé
- Utilisez **F12** (Inspecteur) pour trouver les sélecteurs
- Testez votre CSS sur [CodePen](https://codepen.io/) avant de l'appliquer
- Exemple : `.message { background: rgba(255, 0, 0, 0.1) !important; }`

### Pour la modération
- **Regex101** est votre ami : [https://regex101.com/](https://regex101.com/)
- Testez vos expressions régulières avant de les ajouter
- Commencez par des règles simples, puis augmentez la complexité

---

## Développement

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour la configuration détaillée du développement et les directives.

### Démarrage rapide

```bash
# Installer les dépendances
pnpm install

# Vérification des types
pnpm typecheck

# Linting
pnpm lint

# Exécuter les tests
pnpm test

# Exécuter les tests en mode watch
pnpm test:watch
```

---

## Contribuer

Les contributions sont les bienvenues ! Veuillez lire [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails sur notre code de conduite et le processus de soumission des pull requests.

---

## Signaler des bugs

Vous avez trouvé un bug ? Veuillez utiliser notre [modèle de rapport de bug](.github/ISSUE_TEMPLATE/bug_report.yml) pour le signaler.

---

## Notice légale

**IMPORTANT** : Ce plugin est conçu à des fins éducatives et de personnalisation personnelle uniquement.

- Toutes les données affichées sont **accessibles publiquement** via l'API officielle de Discord
- Aucun **scraping** ou **collecte de données** au-delà de ce que Discord fournit
- Aucune **information privée** n'est accédée ou stockée
- Les fonctionnalités OSINT analysent uniquement les informations publiquement visibles
- À des **fins éducatives uniquement**

**Utilisez de manière responsable et à vos propres risques.** Les auteurs ne sont pas responsables de l'utilisation abusive de ce logiciel.

---

## Support

- **GitHub Issues** : [https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/issues](https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/issues)
- **Documentation Vencord** : [https://docs.vencord.dev](https://docs.vencord.dev)

---

## Crédits

- **Équipe Vencord** pour ce projet incroyable
- **Void-Tools** pour l'inspiration de présentation OSINT
- Tous les contributeurs et testeurs
- La communauté Discord pour le support
- **VOUS** pour utiliser ce plugin !

---

## Licence

Ce projet est sous licence GNU General Public License v3.0 ou ultérieure - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Shoyz Tools v1.0.0** - L'expérience Discord ultime, **exactement comme vous le souhaitez** !

*« Parce que Discord mérite d'être 100 % personnalisé »*
