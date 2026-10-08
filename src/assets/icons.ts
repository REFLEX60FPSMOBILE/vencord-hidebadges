// Icons for Shoyz Tools plugin
// These icons are used in the plugin interface

// Category icons
export const CategoryIcons = {
    badges: "🏳️",
    ui: "🎨",
    moderation: "🛡️",
    actions: "⚡",
    settings: "⚙️",
};

// Action icons
export const ActionIcons = {
    toggle: "↔️",
    hide: "👈🔒",
    show: "👉",
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

// Badge type icons
export const BadgeTypeIcons = {
    discord: "💎",
    vencord: "💙",
    custom: "🌟",
    other: "⚫",
};

// Moderation icons
export const ModerationIcons = {
    hide: "🚫",
    warn: "⚠️",
    block: "🛑",
};

// Theme icons
export const ThemeIcons = {
    default: "🎨",
    dark: "🌙",
    light: "☀️",
    green: "🟢",
    red: "🔴",
    custom: "✨",
};

// UI options icons
export const UIIcons = {
    theme: "🎨",
    timestamps: "⏰",
    avatars: "👤",
    compact: "📄",
    css: "💻",
};

// Statistics icons
export const StatsIcons = {
    messages: "💬",
    hidden: "🚫",
    warned: "⚠️",
    blocked: "🛑",
};

// Tab icons
export const TabIcons = {
    badges: "🏳️",
    ui: "🎨",
    moderation: "🛡️",
    actions: "⚡",
};

// Notification icons
export const NotificationIcons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
};

// Export all icons
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

// Function to get a random icon
export function getRandomIcon(): string {
    const allIcons = Object.values(Icons);
    return allIcons[Math.floor(Math.random() * allIcons.length)];
}

// Function to get icon by ID
export function getIconById(id: string): string {
    const icons: Record<string, string> = {
        ...Icons,
        // Specific icons
        "toggle-badges": "🏳️",
        "toggle-avatars": "👤",
        "toggle-timestamps": "⏰",
        "compact-mode": "📄",
        "clear-cache": "🗑️",
        "scan-badges": "🔍",
    };
    return icons[id] || "⚡";
}
