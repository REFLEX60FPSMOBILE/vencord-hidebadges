import { CSSProperties } from "react";

// Couleurs Discord
export const DiscordColors = {
    primary: "#5865f2",
    primaryHover: "#4752c4",
    primaryActive: "#3d47b8",
    secondary: "#4752c4",
    success: "#3ba55c",
    successHover: "#2e8b57",
    danger: "#ed4245",
    dangerHover: "#c73a3d",
    warning: "#faa61a",
    warningHover: "#e09500",
    info: "#7289da",
    backgroundPrimary: "var(--background-primary, #36393f)",
    backgroundSecondary: "var(--background-secondary, #2f3136)",
    backgroundTertiary: "var(--background-tertiary, #202225)",
    backgroundModifierHover: "var(--background-modifier-hover, rgba(255, 255, 255, 0.07))",
    backgroundModifierActive: "var(--background-modifier-active, rgba(255, 255, 255, 0.1))",
    textNormal: "var(--text-normal, #dcddde)",
    textMuted: "var(--text-muted, #72767d)",
    textLink: "var(--text-link, #00aff4)",
    border: "var(--border, rgba(255, 255, 255, 0.05))",
};

// Styles de base pour les composants
export const BaseStyles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "16px",
        backgroundColor: DiscordColors.backgroundSecondary,
        borderRadius: "8px",
        border: `1px solid ${DiscordColors.border}`,
    } as CSSProperties,
    
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
    } as CSSProperties,
    
    title: {
        color: DiscordColors.textNormal,
        fontSize: "18px",
        fontWeight: 700,
        margin: 0,
    } as CSSProperties,
    
    subtitle: {
        color: DiscordColors.textMuted,
        fontSize: "12px",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    } as CSSProperties,
    
    description: {
        color: DiscordColors.textMuted,
        fontSize: "14px",
        lineHeight: "1.4",
    } as CSSProperties,
};

// Styles pour les boutons
export const ButtonStyles = {
    primary: {
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        backgroundColor: DiscordColors.primary,
        color: "#fff",
        fontSize: "14px",
        fontWeight: 500,
        transition: "background-color 0.2s",
        ":hover": {
            backgroundColor: DiscordColors.primaryHover,
        },
        ":active": {
            backgroundColor: DiscordColors.primaryActive,
        },
    } as CSSProperties,
    
    secondary: {
        padding: "8px 16px",
        borderRadius: "4px",
        border: `1px solid ${DiscordColors.border}`,
        cursor: "pointer",
        backgroundColor: DiscordColors.backgroundTertiary,
        color: DiscordColors.textNormal,
        fontSize: "14px",
        fontWeight: 500,
        transition: "all 0.2s",
        ":hover": {
            backgroundColor: DiscordColors.backgroundModifierHover,
            borderColor: DiscordColors.primary,
        },
    } as CSSProperties,
    
    danger: {
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        backgroundColor: DiscordColors.danger,
        color: "#fff",
        fontSize: "14px",
        fontWeight: 500,
        transition: "background-color 0.2s",
        ":hover": {
            backgroundColor: DiscordColors.dangerHover,
        },
    } as CSSProperties,
    
    ghost: {
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "transparent",
        color: DiscordColors.textNormal,
        fontSize: "14px",
        fontWeight: 500,
        transition: "background-color 0.2s",
        ":hover": {
            backgroundColor: DiscordColors.backgroundModifierHover,
        },
    } as CSSProperties,
    
    icon: {
        padding: "8px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        backgroundColor: DiscordColors.backgroundTertiary,
        color: DiscordColors.textNormal,
        transition: "all 0.2s",
        ":hover": {
            backgroundColor: DiscordColors.backgroundModifierHover,
            color: DiscordColors.textNormal,
        },
    } as CSSProperties,
};

// Styles pour les inputs
export const InputStyles = {
    text: {
        flex: 1,
        padding: "8px 12px",
        borderRadius: "4px",
        border: `1px solid ${DiscordColors.border}`,
        backgroundColor: DiscordColors.backgroundTertiary,
        color: DiscordColors.textNormal,
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.2s",
        ":focus": {
            borderColor: DiscordColors.primary,
        },
    } as CSSProperties,
    
    checkbox: {
        width: "18px",
        height: "18px",
        accentColor: DiscordColors.primary,
        cursor: "pointer",
    } as CSSProperties,
    
    select: {
        padding: "8px 12px",
        borderRadius: "4px",
        border: `1px solid ${DiscordColors.border}`,
        backgroundColor: DiscordColors.backgroundTertiary,
        color: DiscordColors.textNormal,
        fontSize: "14px",
        outline: "none",
        cursor: "pointer",
    } as CSSProperties,
};

// Styles pour les cartes
export const CardStyles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "12px",
        backgroundColor: DiscordColors.backgroundTertiary,
        borderRadius: "6px",
        border: `1px solid ${DiscordColors.border}`,
        transition: "all 0.2s",
        ":hover": {
            backgroundColor: DiscordColors.backgroundModifierHover,
            borderColor: DiscordColors.primary,
        },
    } as CSSProperties,
    
    header: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "8px",
    } as CSSProperties,
    
    icon: {
        width: "32px",
        height: "32px",
        objectFit: "contain",
        flexShrink: 0,
    } as CSSProperties,
    
    content: {
        flex: 1,
        minWidth: 0,
    } as CSSProperties,
    
    title: {
        color: DiscordColors.textNormal,
        fontSize: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    } as CSSProperties,
    
    description: {
        color: DiscordColors.textMuted,
        fontSize: "12px",
        lineHeight: "1.4",
    } as CSSProperties,
    
    footer: {
        display: "flex",
        gap: "8px",
        marginTop: "auto",
    } as CSSProperties,
};

// Styles pour les listes
export const ListStyles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    } as CSSProperties,
    
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "8px",
        maxHeight: "400px",
        overflowY: "auto",
    } as CSSProperties,
    
    item: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        backgroundColor: DiscordColors.backgroundTertiary,
        borderRadius: "6px",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.2s",
        ":hover": {
            backgroundColor: DiscordColors.backgroundModifierHover,
        },
    } as CSSProperties,
    
    itemSelected: {
        border: `1px solid ${DiscordColors.primary}`,
        backgroundColor: DiscordColors.backgroundModifierHover,
    } as CSSProperties,
    
    itemDisabled: {
        opacity: 0.5,
        cursor: "not-allowed",
    } as CSSProperties,
};

// Styles pour les badges
export const BadgeStyles = {
    container: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 8px",
        borderRadius: "4px",
        backgroundColor: DiscordColors.backgroundTertiary,
        color: DiscordColors.textNormal,
        fontSize: "12px",
        fontWeight: 500,
    } as CSSProperties,
    
    icon: {
        width: "16px",
        height: "16px",
        objectFit: "contain",
    } as CSSProperties,
    
    hidden: {
        opacity: 0.5,
        textDecoration: "line-through",
    } as CSSProperties,
};

// Styles pour les notifications
export const NotificationStyles = {
    container: {
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "8px",
        marginBottom: "8px",
        animation: "slideIn 0.3s ease",
    } as CSSProperties,
    
    info: {
        backgroundColor: "rgba(114, 137, 218, 0.1)",
        border: `1px solid ${DiscordColors.info}`,
        color: DiscordColors.info,
    } as CSSProperties,
    
    success: {
        backgroundColor: "rgba(59, 165, 92, 0.1)",
        border: `1px solid ${DiscordColors.success}`,
        color: DiscordColors.success,
    } as CSSProperties,
    
    warning: {
        backgroundColor: "rgba(250, 166, 26, 0.1)",
        border: `1px solid ${DiscordColors.warning}`,
        color: DiscordColors.warning,
    } as CSSProperties,
    
    error: {
        backgroundColor: "rgba(237, 66, 69, 0.1)",
        border: `1px solid ${DiscordColors.danger}`,
        color: DiscordColors.danger,
    } as CSSProperties,
    
    icon: {
        width: "20px",
        height: "20px",
        flexShrink: 0,
    } as CSSProperties,
    
    content: {
        flex: 1,
    } as CSSProperties,
    
    title: {
        fontSize: "14px",
        fontWeight: 600,
        marginBottom: "4px",
    } as CSSProperties,
    
    message: {
        fontSize: "13px",
        lineHeight: "1.4",
    } as CSSProperties,
    
    timestamp: {
        fontSize: "11px",
        opacity: 0.7,
        marginTop: "4px",
    } as CSSProperties,
};

// Styles pour les onglets
export const TabStyles = {
    container: {
        display: "flex",
        gap: "4px",
        borderBottom: `1px solid ${DiscordColors.border}`,
        marginBottom: "12px",
    } as CSSProperties,
    
    tab: {
        padding: "8px 16px",
        border: "none",
        backgroundColor: "transparent",
        color: DiscordColors.textMuted,
        fontSize: "14px",
        fontWeight: 500,
        cursor: "pointer",
        borderBottom: `2px solid transparent`,
        transition: "all 0.2s",
        ":hover": {
            color: DiscordColors.textNormal,
            backgroundColor: DiscordColors.backgroundModifierHover,
        },
    } as CSSProperties,
    
    tabActive: {
        color: DiscordColors.primary,
        borderBottomColor: DiscordColors.primary,
        backgroundColor: "transparent",
    } as CSSProperties,
    
    content: {
        display: "none",
    } as CSSProperties,
    
    contentActive: {
        display: "block",
    } as CSSProperties,
};

// Styles pour les switchs
export const SwitchStyles = {
    container: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
    } as CSSProperties,
    
    track: {
        width: "40px",
        height: "20px",
        borderRadius: "10px",
        backgroundColor: DiscordColors.backgroundTertiary,
        position: "relative",
        transition: "background-color 0.2s",
    } as CSSProperties,
    
    trackChecked: {
        backgroundColor: DiscordColors.primary,
    } as CSSProperties,
    
    thumb: {
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: "#fff",
        position: "absolute",
        top: "2px",
        left: "2px",
        transition: "transform 0.2s",
    } as CSSProperties,
    
    thumbChecked: {
        transform: "translateX(20px)",
    } as CSSProperties,
    
    label: {
        color: DiscordColors.textNormal,
        fontSize: "14px",
        fontWeight: 500,
    } as CSSProperties,
    
    description: {
        color: DiscordColors.textMuted,
        fontSize: "12px",
        marginTop: "2px",
    } as CSSProperties,
};

// Styles pour les tooltips
export const TooltipStyles = {
    container: {
        position: "relative",
        display: "inline-block",
    } as CSSProperties,
    
    tooltip: {
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "6px 10px",
        backgroundColor: DiscordColors.backgroundPrimary,
        color: DiscordColors.textNormal,
        fontSize: "12px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        opacity: 0,
        visibility: "hidden",
        transition: "opacity 0.2s, visibility 0.2s",
    } as CSSProperties,
    
    tooltipVisible: {
        opacity: 1,
        visibility: "visible",
    } as CSSProperties,
};

// Styles pour les modales
export const ModalStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
    } as CSSProperties,
    
    container: {
        backgroundColor: DiscordColors.backgroundPrimary,
        borderRadius: "8px",
        padding: "24px",
        maxWidth: "600px",
        width: "90%",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    } as CSSProperties,
    
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px",
    } as CSSProperties,
    
    title: {
        color: DiscordColors.textNormal,
        fontSize: "20px",
        fontWeight: 700,
        margin: 0,
    } as CSSProperties,
    
    closeButton: {
        background: "none",
        border: "none",
        color: DiscordColors.textMuted,
        cursor: "pointer",
        fontSize: "20px",
        padding: "4px",
        ":hover": {
            color: DiscordColors.textNormal,
        },
    } as CSSProperties,
    
    content: {
        marginBottom: "20px",
    } as CSSProperties,
    
    footer: {
        display: "flex",
        gap: "12px",
        justifyContent: "flex-end",
    } as CSSProperties,
};

// Animation CSS
export const Animations = {
    fadeIn: `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`,
    slideIn: `@keyframes slideIn { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`,
    slideUp: `@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`,
    pulse: `@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`,
    spin: `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`,
};
