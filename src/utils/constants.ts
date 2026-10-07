// Constantes pour le plugin

// Sélecteurs CSS pour les badges
export const BADGE_SELECTORS = {
    IMG: [
        'img[src*="/badge-icons/"]',
        "img.vc-user-badge",
        '[class*="profileBadge"] img',
        '[class*="badgesContainer"] img',
        '[class*="userBadges"] img',
        '[class*="badge"] img',
    ].join(","),
    
    CONTAINERS: [
        '[class*="profileBadges"]',
        '[class*="badgesContainer"]',
        '[class*="userBadges"]',
        '[class*="badgeContainer"]',
    ].join(","),
};

// Attributs personnalisés
export const CUSTOM_ATTRS = {
    HIDDEN: "data-vc-discord-tools-hidden",
    CUSTOM_THEME: "data-vc-custom-theme",
    MODERATED: "data-vc-moderated",
};

// Catégories de badges
export const BADGE_CATEGORIES = {
    DISCORD: "discord",
    VENCORD: "vencord",
    CUSTOM: "custom",
    OTHER: "autre",
};

// Actions de modération
export const MODERATION_ACTIONS = {
    HIDE: "hide",
    WARN: "warn",
    BLOCK: "block",
} as const;

// Thèmes prédéfinis
export const PRESET_THEMES = [
    {
        id: "default",
        name: "Par défaut",
        colors: {
            primary: "#5865f2",
            secondary: "#4752c4",
            accent: "#8994fa",
            background: "var(--background-primary)",
            text: "var(--text-normal)",
            muted: "var(--text-muted)",
        },
    },
    {
        id: "dark",
        name: "Sombre",
        colors: {
            primary: "#3a3f4a",
            secondary: "#2a2e3a",
            accent: "#5865f2",
            background: "#0e0e0e",
            text: "#ffffff",
            muted: "#808080",
        },
    },
    {
        id: "light",
        name: "Clair",
        colors: {
            primary: "#7289da",
            secondary: "#99aab5",
            accent: "#5865f2",
            background: "#ffffff",
            text: "#000000",
            muted: "#666666",
        },
    },
    {
        id: "green",
        name: "Vert",
        colors: {
            primary: "#3ba55c",
            secondary: "#2e8b57",
            accent: "#90ee90",
            background: "var(--background-primary)",
            text: "var(--text-normal)",
            muted: "var(--text-muted)",
        },
    },
    {
        id: "red",
        name: "Rouge",
        colors: {
            primary: "#ed4245",
            secondary: "#c73a3d",
            accent: "#ff6b6b",
            background: "var(--background-primary)",
            text: "var(--text-normal)",
            muted: "var(--text-muted)",
        },
    },
];

// Actions rapides par défaut
export const DEFAULT_QUICK_ACTIONS = {
    toggleBadges: {
        name: "Basculer les badges",
        description: "Affiche/masque tous les badges",
        category: "Badges",
    },
    toggleAvatars: {
        name: "Basculer les avatars",
        description: "Affiche/masque les avatars des utilisateurs",
        category: "UI",
    },
    toggleTimestamps: {
        name: "Basculer les timestamps",
        description: "Affiche/masque les horodatages des messages",
        category: "UI",
    },
    compactMode: {
        name: "Mode compact",
        description: "Active/désactive le mode compact",
        category: "UI",
    },
    clearCache: {
        name: "Effacer le cache",
        description: "Efface le cache des badges et des images",
        category: "Maintenance",
    },
    scanBadges: {
        name: "Scanner les badges",
        description: "Recherche de nouveaux badges dans le DOM",
        category: "Badges",
    },
};

// Règles de modération par défaut
export const DEFAULT_MODERATION_RULES = [
    {
        id: "spam-links",
        name: "Liens de spam",
        pattern: "(http|https)://(bit\\.ly|tinyurl|goo\\.gl|t\\.co)",
        action: "hide",
        enabled: false,
    },
    {
        id: "discord-invite",
        name: "Invitations Discord",
        pattern: "(discord\\.gg|discord\\.com/invite)",
        action: "warn",
        enabled: false,
    },
    {
        id: "bad-words",
        name: "Mots inappropriés",
        pattern: "(fuck|shit|bitch|asshole)",
        action: "hide",
        enabled: false,
    },
];

// Raccourcis clavier par défaut
export const DEFAULT_SHORTCUTS = [
    {
        id: "toggle-badges",
        name: "Basculer les badges",
        key: "B",
        ctrl: true,
        shift: false,
        alt: false,
    },
    {
        id: "toggle-ui",
        name: "Basculer l'UI personnalisée",
        key: "U",
        ctrl: true,
        shift: false,
        alt: false,
    },
    {
        id: "scan-badges",
        name: "Scanner les badges",
        key: "S",
        ctrl: true,
        shift: true,
        alt: false,
    },
];
