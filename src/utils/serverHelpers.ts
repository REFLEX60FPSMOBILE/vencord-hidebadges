// Utilitaires pour la gestion des paramètres par serveur

import { BADGE_SELECTORS, CUSTOM_ATTRS } from "./constants";
import { generateBadgeKey, getBadgeLabel, resolveBadgeTarget, setElementHidden } from "./helpers";

// Récupère l'ID du serveur actuel
export function getCurrentServerId(): string | null {
    try {
        // Essayer de récupérer l'ID depuis l'URL
        const match = window.location.pathname.match(^/channels/(\d+)/|/channels/@me/(\d+)/|/guilds/(\d+)/);
        if (match) {
            return match[1] || match[2] || match[3] || null;
        }
        
        // Essayer de récupérer depuis les éléments du DOM
        const serverElement = document.querySelector("[class*='guild'], [class*='server']");
        if (serverElement) {
            const id = serverElement.getAttribute("data-guild-id") || 
                       serverElement.getAttribute("data-id") ||
                       serverElement.id;
            if (id) return id;
        }
        
        // Essayer de récupérer depuis le store Discord
        if (window.DiscordNative) {
            const guild = window.DiscordNative?.app?.guilds?.getCurrentGuild?.();
            if (guild?.id) return guild.id;
        }
        
        return null;
    } catch (e) {
        console.log("Impossible de récupérer l'ID du serveur", e);
        return null;
    }
}

// Récupère le nom du serveur actuel
export function getCurrentServerName(): string {
    try {
        const nameElement = document.querySelector("[class*='guildName'], [class*='serverName'], [class*='title']");
        if (nameElement) {
            return nameElement.textContent?.trim() || "Serveur inconnu";
        }
        return "Serveur inconnu";
    } catch (e) {
        return "Serveur inconnu";
    }
}

// Applique les paramètres de masquage pour un serveur spécifique
export function applyServerBadgeSettings(serverId: string, settings: {
    hideAll: boolean;
    hiddenBadges: Record<string, boolean>;
}) {
    const { hideAll, hiddenBadges } = settings;
    
    // Appliquer à tous les badges existants
    document.querySelectorAll<HTMLElement>(BADGE_SELECTORS.IMG).forEach((img) => {
        if (!img.src) return;
        
        const { key } = generateBadgeKey(img);
        const target = resolveBadgeTarget(img);
        const shouldHide = hideAll || !!hiddenBadges[key];
        
        setElementHidden(target, shouldHide, CUSTOM_ATTRS.HIDDEN);
        target.setAttribute("data-server-id", serverId);
    });
    
    // Observer les nouveaux badges
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node as HTMLElement;
                    const badges = element.querySelectorAll<HTMLImageElement>(BADGE_SELECTORS.IMG);
                    badges.forEach((img) => {
                        if (!img.src) return;
                        const { key } = generateBadgeKey(img);
                        const target = resolveBadgeTarget(img);
                        const shouldHide = hideAll || !!hiddenBadges[key];
                        setElementHidden(target, shouldHide, CUSTOM_ATTRS.HIDDEN);
                        target.setAttribute("data-server-id", serverId);
                    });
                }
            }
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
    
    return observer;
}

// Génère une clé unique pour les paramètres par serveur
export function getServerSettingsKey(serverId: string): string {
    return `server-${serverId}`;
}

// Récupère les paramètres pour un serveur
export function getServerSettings(
    serverId: string,
    globalSettings: {
        badgeCatalog: Record<string, any>;
        hiddenBadges: Record<string, boolean>;
        hideAllBadges: boolean;
    }
): {
    hideAll: boolean;
    hiddenBadges: Record<string, boolean>;
} {
    // Si pas de paramètres spécifiques au serveur, utiliser les paramètres globaux
    return {
        hideAll: globalSettings.hideAllBadges,
        hiddenBadges: globalSettings.hiddenBadges,
    };
}

// Fusionne les paramètres globaux et par serveur
export function mergeServerSettings(
    globalSettings: {
        badgeCatalog: Record<string, any>;
        hiddenBadges: Record<string, boolean>;
        hideAllBadges: boolean;
    },
    serverSettings: Record<string, {
        hideBadges: boolean;
        hiddenBadges: Record<string, boolean>;
    }>,
    serverId: string
): {
    badgeCatalog: Record<string, any>;
    hiddenBadges: Record<string, boolean>;
    hideAll: boolean;
} {
    const serverConfig = serverSettings[serverId] || {};
    
    return {
        badgeCatalog: globalSettings.badgeCatalog,
        hiddenBadges: {
            ...globalSettings.hiddenBadges,
            ...serverConfig.hiddenBadges,
        },
        hideAll: serverConfig.hideBadges !== undefined 
            ? serverConfig.hideBadges 
            : globalSettings.hideAllBadges,
    };
}

// Vérifie si on est dans un DM
export function isInDM(): boolean {
    try {
        const path = window.location.pathname;
        return path.includes("/channels/@me/") || path.includes("/channels/me/");
    } catch (e) {
        return false;
    }
}

// Vérifie si on est dans un appel
export function isInCall(): boolean {
    try {
        return document.querySelector("[class*='call'], [class*='voice']") !== null;
    } catch (e) {
        return false;
    }
}
