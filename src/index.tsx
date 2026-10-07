/*
 * Discord Tools - Un plugin Vencord complet
 * 
 * Ce plugin offre :
 * - Masquage avancé des badges avec interface graphique
 * - Personnalisation de l'UI Discord
 * - Outils de modération automatique
 * - Actions rapides et raccourcis clavier
 * 
 * Auteur : REFLEX60FPSMOBILE
 * Version : 2.0.0
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { React } from "@webpack/common";
import { FluxDispatcher } from "@webpack/common";

// Import des types
import type { 
    BadgeInfo, 
    UITheme, 
    UICustomization, 
    ModerationRule, 
    ModerationStats,
    QuickAction,
    PluginSettings 
} from "@types";

// Import des constantes et utilitaires
import { 
    BADGE_SELECTORS, 
    CUSTOM_ATTRS,
    PRESET_THEMES,
    DEFAULT_QUICK_ACTIONS,
    DEFAULT_MODERATION_RULES,
    DEFAULT_SHORTCUTS,
    MODERATION_ACTIONS 
} from "@utils/constants";

import { 
    generateBadgeKey, 
    getBadgeLabel, 
    resolveBadgeTarget, 
    setElementHidden, 
    isElementHidden,
    debounce,
    deepClone,
    generateId,
    waitForSelector 
} from "@utils/helpers";

// Import des composants
import SettingsPanel from "@components/SettingsPanel";

// ============================================================================
// DÉFINITION DES PARAMÈTRES
// ============================================================================

const settings = definePluginSettings({
    // Badges
    hideAllBadges: {
        type: OptionType.BOOLEAN,
        description: "Masquer TOUS les badges (ignore la liste ci-dessous)",
        default: false,
        onChange: () => applyAllBadgeSettings(),
    },
    badgeManager: {
        type: OptionType.COMPONENT,
        component: () => <SettingsPanel
            // Badges
            badgeCatalog={settings.store.badgeCatalog ?? {}}
            hiddenBadges={settings.store.hiddenBadges ?? {}}
            hideAllBadges={settings.store.hideAllBadges ?? false}
            onBadgeToggle={(key) => toggleBadge(key)}
            onBadgeToggleAll={(value) => setAllBadgesHidden(value)}
            onScanBadges={() => scanAllBadges()}
            onResetBadges={() => resetBadges()}
            
            // UI
            uiSettings={settings.store.uiSettings ?? getDefaultUISettings()}
            onUISettingsUpdate={(updates) => updateUISettings(updates)}
            
            // Moderation
            moderationRules={settings.store.moderationRules ?? [...DEFAULT_MODERATION_RULES]}
            moderationStats={settings.store.moderationStats ?? getDefaultModerationStats()}
            moderationEnabled={settings.store.moderationEnabled ?? false}
            onModerationToggle={() => toggleModeration()}
            onAddModerationRule={(rule) => addModerationRule(rule)}
            onUpdateModerationRule={(id, updates) => updateModerationRule(id, updates)}
            onRemoveModerationRule={(id) => removeModerationRule(id)}
            onResetModerationStats={() => resetModerationStats()}
            
            // Quick Actions
            quickActions={getQuickActions()}
            enabledQuickActions={settings.store.enabledQuickActions ?? {}}
            onQuickActionToggle={(id) => toggleQuickAction(id)}
            onQuickActionExecute={(id) => executeQuickAction(id)}
        />,
    },
}).withPrivateSettings<PluginSettings>();

// ============================================================================
// VALEURS PAR DÉFAUT
// ============================================================================

function getDefaultUISettings(): UICustomization {
    return {
        enabled: false,
        theme: PRESET_THEMES[0],
        hideMessageTimestamps: false,
        hideUserAvatars: false,
        compactMode: false,
        customCSS: "",
    };
}

function getDefaultModerationStats(): ModerationStats {
    return {
        totalMessages: 0,
        hiddenMessages: 0,
        warnedUsers: 0,
        blockedUsers: 0,
    };
}

function getQuickActions(): QuickAction[] {
    return Object.entries(DEFAULT_QUICK_ACTIONS).map(([id, config]) => ({
        id,
        name: config.name,
        description: config.description,
        category: config.category,
        icon: getIconForAction(id),
        action: () => executeQuickAction(id),
    }));
}

function getIconForAction(id: string): string {
    const icons: Record<string, string> = {
        toggleBadges: "🏷️",
        toggleAvatars: "👤",
        toggleTimestamps: "⏰",
        compactMode: "📐",
        clearCache: "🗑️",
        scanBadges: "🔍",
    };
    return icons[id] || "⚡";
}

// ============================================================================
// GESTION DES BADGES
// ============================================================================

let observer: MutationObserver | null = null;
let queue: Set<Element> = new Set();
let scheduled: boolean = false;

function flushBadgeQueue() {
    scheduled = false;
    const imgs = new Set<HTMLImageElement>();

    for (const el of queue) {
        if (!el.isConnected) continue;
        if (el.matches(BADGE_SELECTORS.IMG)) imgs.add(el as HTMLImageElement);
        el.querySelectorAll<HTMLImageElement>(BADGE_SELECTORS.IMG).forEach((i) => imgs.add(i));
    }
    queue = new Set();

    if (imgs.size) processBadgeImages(imgs);
}

function enqueueForBadgeProcessing(el: Element) {
    queue.add(el);
    if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(flushBadgeQueue);
    }
}

function processBadgeImages(imgs: Iterable<HTMLImageElement>) {
    const catalog = settings.store.badgeCatalog ?? {};
    const hidden = settings.store.hiddenBadges ?? {};
    const hideAll = settings.store.hideAllBadges ?? false;
    const found: Record<string, BadgeInfo> = {};

    for (const img of imgs) {
        if (!img.src) continue;
        
        const { key, kind } = generateBadgeKey(img);

        if (!catalog[key] && !found[key]) {
            found[key] = {
                key,
                kind,
                label: getBadgeLabel(img, key),
                src: img.currentSrc || img.src,
            };
        }

        // Masquer l'élément
        const target = resolveBadgeTarget(img);
        const shouldHide = hideAll || !!hidden[key];
        setElementHidden(target, shouldHide, CUSTOM_ATTRS.HIDDEN);
    }

    if (Object.keys(found).length) {
        settings.store.badgeCatalog = { ...catalog, ...found };
    }
}

function scanAllBadges() {
    processBadgeImages(document.querySelectorAll<HTMLImageElement>(BADGE_SELECTORS.IMG));
}

function toggleBadge(key: string) {
    const hidden = settings.store.hiddenBadges ?? {};
    const newHidden = { ...hidden, [key]: !hidden[key] };
    settings.store.hiddenBadges = newHidden;
    applyAllBadgeSettings();
}

function setAllBadgesHidden(value: boolean) {
    const catalog = settings.store.badgeCatalog ?? {};
    const newHidden: Record<string, boolean> = {};
    for (const key of Object.keys(catalog)) {
        newHidden[key] = value;
    }
    settings.store.hiddenBadges = newHidden;
    settings.store.hideAllBadges = value;
    applyAllBadgeSettings();
}

function resetBadges() {
    settings.store.badgeCatalog = {};
    settings.store.hiddenBadges = {};
    settings.store.hideAllBadges = false;
    scanAllBadges();
}

function applyAllBadgeSettings() {
    const hideAll = settings.store.hideAllBadges ?? false;
    const hidden = settings.store.hiddenBadges ?? {};
    
    document.querySelectorAll<HTMLElement>(`[${CUSTOM_ATTRS.HIDDEN}]`).forEach((el) => {
        const key = el.getAttribute(`data-badge-key`) || "";
        const shouldHide = hideAll || !!hidden[key];
        setElementHidden(el, shouldHide, CUSTOM_ATTRS.HIDDEN);
    });
    
    scanAllBadges();
}

// ============================================================================
// PERSONNALISATION UI
// ============================================================================

function getDefaultUISettings(): UICustomization {
    return {
        enabled: false,
        theme: PRESET_THEMES[0],
        hideMessageTimestamps: false,
        hideUserAvatars: false,
        compactMode: false,
        customCSS: "",
    };
}

function updateUISettings(updates: Partial<UICustomization>) {
    const current = settings.store.uiSettings ?? getDefaultUISettings();
    settings.store.uiSettings = { ...current, ...updates };
    applyUISettings();
}

function applyUISettings() {
    const uiSettings = settings.store.uiSettings ?? getDefaultUISettings();
    
    if (!uiSettings.enabled) {
        // Désactiver toutes les personnalisations
        removeCustomStyles();
        return;
    }
    
    // Appliquer le thème
    applyTheme(uiSettings.theme);
    
    // Appliquer les options
    if (uiSettings.hideMessageTimestamps) {
        applyHideTimestamps();
    } else {
        removeHideTimestamps();
    }
    
    if (uiSettings.hideUserAvatars) {
        applyHideAvatars();
    } else {
        removeHideAvatars();
    }
    
    if (uiSettings.compactMode) {
        applyCompactMode();
    } else {
        removeCompactMode();
    }
    
    // Appliquer le CSS personnalisé
    if (uiSettings.customCSS) {
        applyCustomCSS(uiSettings.customCSS);
    } else {
        removeCustomCSS();
    }
}

function applyTheme(theme: UITheme) {
    const style = document.getElementById("vc-discord-tools-theme");
    if (!style) {
        const newStyle = document.createElement("style");
        newStyle.id = "vc-discord-tools-theme";
        document.head.appendChild(newStyle);
    }
    
    const css = `
        :root {
            --vc-theme-primary: ${theme.colors.primary};
            --vc-theme-secondary: ${theme.colors.secondary};
            --vc-theme-accent: ${theme.colors.accent};
            --vc-theme-background: ${theme.colors.background};
            --vc-theme-text: ${theme.colors.text};
            --vc-theme-muted: ${theme.colors.muted};
        }
    `;
    
    if (style) {
        style.textContent = css;
    }
}

function applyHideTimestamps() {
    const style = document.getElementById("vc-hide-timestamps");
    if (!style) {
        const newStyle = document.createElement("style");
        newStyle.id = "vc-hide-timestamps";
        document.head.appendChild(newStyle);
    }
    
    const css = `
        .message-timestamp, .timestamp, [class*="timestamp"] {
            display: none !important;
        }
    `;
    
    if (style) {
        style.textContent = css;
    }
}

function removeHideTimestamps() {
    const style = document.getElementById("vc-hide-timestamps");
    if (style) {
        style.remove();
    }
}

function applyHideAvatars() {
    const style = document.getElementById("vc-hide-avatars");
    if (!style) {
        const newStyle = document.createElement("style");
        newStyle.id = "vc-hide-avatars";
        document.head.appendChild(newStyle);
    }
    
    const css = `
        .avatar, .user-avatar, [class*="avatar"] {
            display: none !important;
        }
    `;
    
    if (style) {
        style.textContent = css;
    }
}

function removeHideAvatars() {
    const style = document.getElementById("vc-hide-avatars");
    if (style) {
        style.remove();
    }
}

function applyCompactMode() {
    const style = document.getElementById("vc-compact-mode");
    if (!style) {
        const newStyle = document.createElement("style");
        newStyle.id = "vc-compact-mode";
        document.head.appendChild(newStyle);
    }
    
    const css = `
        .message, [class*="message"] {
            padding: 8px 12px !important;
            margin: 2px 0 !important;
        }
        .message-content, [class*="messageContent"] {
            gap: 4px !important;
        }
    `;
    
    if (style) {
        style.textContent = css;
    }
}

function removeCompactMode() {
    const style = document.getElementById("vc-compact-mode");
    if (style) {
        style.remove();
    }
}

function applyCustomCSS(css: string) {
    const style = document.getElementById("vc-custom-css");
    if (!style) {
        const newStyle = document.createElement("style");
        newStyle.id = "vc-custom-css";
        document.head.appendChild(newStyle);
    }
    
    if (style) {
        style.textContent = css;
    }
}

function removeCustomCSS() {
    const style = document.getElementById("vc-custom-css");
    if (style) {
        style.remove();
    }
}

function removeCustomStyles() {
    removeHideTimestamps();
    removeHideAvatars();
    removeCompactMode();
    removeCustomCSS();
}

// ============================================================================
// OUTILS DE MODÉRATION
// ============================================================================

function toggleModeration() {
    const enabled = settings.store.moderationEnabled ?? false;
    settings.store.moderationEnabled = !enabled;
    
    if (!enabled) {
        setupModerationObserver();
    } else {
        removeModerationObserver();
    }
}

function addModerationRule(rule: ModerationRule) {
    const rules = settings.store.moderationRules ?? [];
    settings.store.moderationRules = [...rules, rule];
}

function updateModerationRule(id: string, updates: Partial<ModerationRule>) {
    const rules = settings.store.moderationRules ?? [];
    const index = rules.findIndex((r) => r.id === id);
    if (index !== -1) {
        const newRules = [...rules];
        newRules[index] = { ...newRules[index], ...updates };
        settings.store.moderationRules = newRules;
    }
}

function removeModerationRule(id: string) {
    const rules = settings.store.moderationRules ?? [];
    settings.store.moderationRules = rules.filter((r) => r.id !== id);
}

function resetModerationStats() {
    settings.store.moderationStats = getDefaultModerationStats();
}

function getDefaultModerationStats(): ModerationStats {
    return {
        totalMessages: 0,
        hiddenMessages: 0,
        warnedUsers: 0,
        blockedUsers: 0,
    };
}

let moderationObserver: MutationObserver | null = null;

function setupModerationObserver() {
    if (moderationObserver) return;
    
    moderationObserver = new MutationObserver(debounce((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === "childList") {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        checkMessageForModeration(node as HTMLElement);
                    }
                }
            }
        }
    }, 500));
    
    moderationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

function removeModerationObserver() {
    if (moderationObserver) {
        moderationObserver.disconnect();
        moderationObserver = null;
    }
}

function checkMessageForModeration(element: HTMLElement) {
    const rules = settings.store.moderationRules ?? [];
    const enabledRules = rules.filter((r) => r.enabled);
    
    if (enabledRules.length === 0) return;
    
    // Vérifier si c'est un message
    if (!element.querySelector?.(".message-content, [class*='messageContent']")) return;
    
    const textContent = element.textContent?.toLowerCase() || "";
    
    for (const rule of enabledRules) {
        try {
            const regex = new RegExp(rule.pattern, "gi");
            if (regex.test(textContent)) {
                executeModerationAction(element, rule.action);
                break;
            }
        } catch (e) {
            console.error("Invalid regex pattern:", rule.pattern, e);
        }
    }
}

function executeModerationAction(element: HTMLElement, action: string) {
    const stats = settings.store.moderationStats ?? getDefaultModerationStats();
    
    switch (action) {
        case MODERATION_ACTIONS.HIDE:
            setElementHidden(element, true, CUSTOM_ATTRS.MODERATED);
            stats.hiddenMessages++;
            break;
            
        case MODERATION_ACTIONS.WARN:
            // Logique pour avertir l'utilisateur
            // Cela pourrait ouvrir une modale ou envoyer un message
            stats.warnedUsers++;
            break;
            
        case MODERATION_ACTIONS.BLOCK:
            // Logique pour bloquer l'utilisateur
            stats.blockedUsers++;
            break;
    }
    
    stats.totalMessages++;
    settings.store.moderationStats = stats;
}

// ============================================================================
// ACTIONS RAPIDES
// ============================================================================

function getQuickActions(): QuickAction[] {
    return Object.entries(DEFAULT_QUICK_ACTIONS).map(([id, config]) => ({
        id,
        name: config.name,
        description: config.description,
        category: config.category,
        icon: getIconForAction(id),
        action: () => executeQuickAction(id),
    }));
}

function toggleQuickAction(id: string) {
    const enabled = settings.store.enabledQuickActions ?? {};
    settings.store.enabledQuickActions = { ...enabled, [id]: !enabled[id] };
}

function executeQuickAction(id: string) {
    switch (id) {
        case "toggleBadges":
            const hideAll = settings.store.hideAllBadges ?? false;
            setAllBadgesHidden(!hideAll);
            break;
            
        case "toggleAvatars":
            const uiSettings = settings.store.uiSettings ?? getDefaultUISettings();
            updateUISettings({ hideUserAvatars: !uiSettings.hideUserAvatars });
            break;
            
        case "toggleTimestamps":
            const currentUISettings = settings.store.uiSettings ?? getDefaultUISettings();
            updateUISettings({ hideMessageTimestamps: !currentUISettings.hideMessageTimestamps });
            break;
            
        case "compactMode":
            const currentSettings = settings.store.uiSettings ?? getDefaultUISettings();
            updateUISettings({ compactMode: !currentSettings.compactMode });
            break;
            
        case "clearCache":
            resetBadges();
            break;
            
        case "scanBadges":
            scanAllBadges();
            break;
    }
}

// ============================================================================
// RACCURCIS CLAVIER
// ============================================================================

function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        const shortcuts = settings.store.keyboardShortcuts ?? DEFAULT_SHORTCUTS;
        
        for (const shortcut of shortcuts) {
            if (e.key.toUpperCase() === shortcut.key.toUpperCase() &&
                e.ctrlKey === shortcut.ctrl &&
                e.shiftKey === shortcut.shift &&
                e.altKey === shortcut.alt) {
                
                e.preventDefault();
                executeQuickAction(shortcut.id);
            }
        }
    });
}

// ============================================================================
// PLUGIN PRINCIPAL
// ============================================================================

export default definePlugin({
    name: "Discord Tools",
    description: "Un outil complet pour personnaliser et améliorer ton expérience Discord. Masque les badges, personnalise l'UI, modère automatiquement les messages, et plus encore.",
    authors: [
        { name: "REFLEX60FPSMOBILE", id: 0n },
    ],
    version: "2.0.0",
    settings,
    
    // Initialisation
    start() {
        // Initialiser les paramètres par défaut si nécessaire
        if (!settings.store.badgeCatalog) {
            settings.store.badgeCatalog = {};
        }
        if (!settings.store.hiddenBadges) {
            settings.store.hiddenBadges = {};
        }
        if (!settings.store.uiSettings) {
            settings.store.uiSettings = getDefaultUISettings();
        }
        if (!settings.store.moderationRules) {
            settings.store.moderationRules = [...DEFAULT_MODERATION_RULES];
        }
        if (!settings.store.moderationStats) {
            settings.store.moderationStats = getDefaultModerationStats();
        }
        if (!settings.store.enabledQuickActions) {
            settings.store.enabledQuickActions = {};
        }
        
        // Scanner les badges existants
        scanAllBadges();
        
        // Appliquer les paramètres UI
        applyUISettings();
        
        // Configurer les observateurs
        setupBadgeObserver();
        
        // Configurer les raccourcis clavier
        setupKeyboardShortcuts();
        
        // Configurer l'observateur de modération si activé
        if (settings.store.moderationEnabled) {
            setupModerationObserver();
        }
    },
    
    // Arrêt du plugin
    stop() {
        // Déconnecter les observateurs
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        
        if (moderationObserver) {
            moderationObserver.disconnect();
            moderationObserver = null;
        }
        
        // Réinitialiser les styles
        removeCustomStyles();
        
        // Réafficher tous les éléments masqués
        document.querySelectorAll<HTMLElement>(`[${CUSTOM_ATTRS.HIDDEN}]`).forEach((el) => {
            setElementHidden(el, false, CUSTOM_ATTRS.HIDDEN);
        });
        
        document.querySelectorAll<HTMLElement>(`[${CUSTOM_ATTRS.MODERATED}]`).forEach((el) => {
            setElementHidden(el, false, CUSTOM_ATTRS.MODERATED);
        });
        
        // Retirer les styles injectés
        const styles = [
            "vc-discord-tools-theme",
            "vc-hide-timestamps",
            "vc-hide-avatars",
            "vc-compact-mode",
            "vc-custom-css",
        ];
        
        for (const id of styles) {
            const style = document.getElementById(id);
            if (style) {
                style.remove();
            }
        }
    },
});

// ============================================================================
// OBSERVATEUR DES BADGES
// ============================================================================

function setupBadgeObserver() {
    if (observer) return;
    
    observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === "attributes") {
                enqueueForBadgeProcessing(mutation.target as Element);
            } else {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        enqueueForBadgeProcessing(node as Element);
                    }
                });
            }
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src", "class"],
    });
}
