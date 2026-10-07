// Types pour les badges

export interface BadgeInfo {
    key: string;
    label: string;
    src: string;
    kind: "discord" | "vencord" | "autre" | "custom";
    category?: string;
    priority?: number;
}

// Types pour la personnalisation UI
export interface UITheme {
    id: string;
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
        muted: string;
    };
}

export interface UICustomization {
    enabled: boolean;
    theme: UITheme;
    hideMessageTimestamps: boolean;
    hideUserAvatars: boolean;
    compactMode: boolean;
    customCSS: string;
}

// Types pour les outils de modération
export interface ModerationRule {
    id: string;
    name: string;
    pattern: string;
    action: "hide" | "warn" | "block";
    enabled: boolean;
}

export interface ModerationStats {
    totalMessages: number;
    hiddenMessages: number;
    warnedUsers: number;
    blockedUsers: number;
}

// Types pour les raccourcis clavier
export interface Shortcut {
    id: string;
    name: string;
    key: string;
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    action: () => void;
}

// Types pour les paramètres du plugin
export interface PluginSettings {
    // Badges
    hideAllBadges: boolean;
    hiddenBadges: Record<string, boolean>;
    badgeCatalog: Record<string, BadgeInfo>;
    
    // UI Customization
    uiCustomization: UICustomization;
    
    // Moderation
    moderationRules: ModerationRule[];
    moderationEnabled: boolean;
    
    // Quick Actions
    quickActionsEnabled: boolean;
    quickActions: Record<string, boolean>;
    
    // Performance
    lowPerformanceMode: boolean;
}

// Types pour les actions rapides
export interface QuickAction {
    id: string;
    name: string;
    icon: string;
    action: () => void;
    description: string;
    category: string;
}

// Types pour les paramètres par serveur
export interface ServerSettings {
    hideBadges: boolean;
    hiddenBadges: Record<string, boolean>;
}

// Types pour l'export/import
export interface ExportData {
    version: string;
    timestamp: number;
    settings: {
        hideAllBadges: boolean;
        hiddenBadges: Record<string, boolean>;
        badgeCatalog: Record<string, BadgeInfo>;
        uiSettings: UICustomization;
        moderationRules: ModerationRule[];
        moderationStats: ModerationStats;
        enabledQuickActions: Record<string, boolean>;
    };
    serverSettings: Record<string, ServerSettings>;
}

// Types pour les notifications
export interface Notification {
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    timestamp: number;
}
