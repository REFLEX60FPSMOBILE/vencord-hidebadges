// Icônes pour le plugin Discord Tools
// Ces icônes sont utilisées dans l'interface du plugin

// Icônes des catégories
export const CategoryIcons = {
    badges: "🏷️",
    ui: "🎨",
    moderation: "🛡️",
    actions: "⚡",
    settings: "⚙️",
};

// Icônes des actions
export const ActionIcons = {
    toggle: "↔️",
    hide: "👁️‍🗨️",
    show: "👁️",
    scan: "🔍",
    reset: "🔄",
    delete: "🗑️",
    edit: "✏️",
    add: "➕",
    save: "💾",
    cancel: "❌",
    apply: "✅",
    warning: "⚠️",
    error: "❌",
    success: "✅",
    info: "ℹ️",
};

// Icônes des types de badges
export const BadgeTypeIcons = {
    discord: "💙",
    vencord: "💜",
    custom: "🟢",
    other: "⚪",
};

// Icônes des actions de modération
export const ModerationIcons = {
    hide: "🚫",
    warn: "⚠️",
    block: "🛑",
};

// Icônes des thèmes
export const ThemeIcons = {
    default: "🎨",
    dark: "🌙",
    light: "☀️",
    green: "🟢",
    red: "🔴",
    custom: "✨",
};

// Icônes des options UI
export const UIIcons = {
    theme: "🎨",
    timestamps: "⏰",
    avatars: "👤",
    compact: "📐",
    css: "💻",
};

// Icônes des statistiques
export const StatsIcons = {
    messages: "💬",
    hidden: "🚫",
    warned: "⚠️",
    blocked: "🛑",
};

// Icônes des onglets
export const TabIcons = {
    badges: "🏷️",
    ui: "🎨",
    moderation: "🛡️",
    actions: "⚡",
};

// Icônes pour les notifications
export const NotificationIcons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
};

// Export de toutes les icônes
export const Icons = {
    ...CategoryIcons,
    ...ActionIcons,
    ...BadgeTypeIcons,
    ...ModerationIcons,
    ...ThemeIcons,
    ...UIIcons,
    ...StatsIcons,
    ...TabIcons,
    ...NotificationIcons,
};

// Fonction pour obtenir une icône aléatoire
export function getRandomIcon(): string {
    const allIcons = Object.values(Icons);
    return allIcons[Math.floor(Math.random() * allIcons.length)];
}

// Fonction pour obtenir une icône basée sur un ID
export function getIconById(id: string): string {
    const icons: Record<string, string> = {
        ...Icons,
        // Ajouter des icônes spécifiques
        "toggle-badges": "🏷️",
        "toggle-avatars": "👤",
        "toggle-timestamps": "⏰",
        "compact-mode": "📐",
        "clear-cache": "🗑️",
        "scan-badges": "🔍",
    };
    return icons[id] || "⚡";
}
