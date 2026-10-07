import React, { useState, useCallback, useMemo } from "react";
import { CardStyles, ButtonStyles, TabStyles } from "@styles";
import { DiscordColors } from "@styles";
import ProfilePreview from "./ProfilePreview";
import BadgeSelection from "./BadgeSelection";
import UICustomizationPanel from "./UICustomization";
import ModerationTools from "./ModerationTools";
import QuickActions from "./QuickActions";
import ServerSettings from "./ServerSettings";
import ExportImport from "./ExportImport";
import { BadgeInfo, UICustomization, ModerationRule, ModerationStats, QuickAction, ServerSettings, ExportData } from "@types";

interface SettingsPanelProps {
    // Badges
    badgeCatalog: Record<string, BadgeInfo>;
    hiddenBadges: Record<string, boolean>;
    hideAllBadges: boolean;
    onBadgeToggle: (key: string) => void;
    onBadgeToggleAll: (value: boolean) => void;
    onScanBadges: () => void;
    onResetBadges: () => void;
    
    // UI Customization
    uiSettings: UICustomization;
    onUISettingsUpdate: (updates: Partial<UICustomization>) => void;
    
    // Moderation
    moderationRules: ModerationRule[];
    moderationStats: ModerationStats;
    moderationEnabled: boolean;
    onModerationToggle: () => void;
    onAddModerationRule: (rule: ModerationRule) => void;
    onUpdateModerationRule: (id: string, updates: Partial<ModerationRule>) => void;
    onRemoveModerationRule: (id: string) => void;
    onResetModerationStats: () => void;
    
    // Quick Actions
    quickActions: QuickAction[];
    enabledQuickActions: Record<string, boolean>;
    onQuickActionToggle: (id: string) => void;
    onQuickActionExecute: (id: string) => void;
    
    // Server Settings
    serverSettings: Record<string, ServerSettings>;
    currentServerId: string | null;
    onUpdateServerSettings: (serverId: string, updates: Partial<ServerSettings>) => void;
    onResetServer: (serverId: string) => void;
    
    // Export/Import
    onExport: () => ExportData;
    onImport: (data: ExportData) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
    // Badges
    badgeCatalog,
    hiddenBadges,
    hideAllBadges,
    onBadgeToggle,
    onBadgeToggleAll,
    onScanBadges,
    onResetBadges,
    
    // UI
    uiSettings,
    onUISettingsUpdate,
    
    // Moderation
    moderationRules,
    moderationStats,
    moderationEnabled,
    onModerationToggle,
    onAddModerationRule,
    onUpdateModerationRule,
    onRemoveModerationRule,
    onResetModerationStats,
    
    // Quick Actions
    quickActions,
    enabledQuickActions,
    onQuickActionToggle,
    onQuickActionExecute,
    
    // Server Settings
    serverSettings,
    currentServerId,
    onUpdateServerSettings,
    onResetServer,
    
    // Export/Import
    onExport,
    onImport,
}) => {
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = useMemo(() => [
        { id: "profile", label: "Mon Profil", icon: "👤" },
        { id: "badges", label: "Liste Badges", icon: "🏷️" },
        { id: "servers", label: "Par Serveur", icon: "🏢" },
        { id: "ui", label: "Personnalisation UI", icon: "🎨" },
        { id: "moderation", label: "Modération", icon: "🛡️" },
        { id: "actions", label: "Actions Rapides", icon: "⚡" },
        { id: "export", label: "Export/Import", icon: "💾" },
    ], []);

    const renderContent = useCallback(() => {
        switch (activeTab) {
            case "profile":
                return (
                    <ProfilePreview
                        catalog={badgeCatalog}
                        hidden={hiddenBadges}
                        onToggle={onBadgeToggle}
                        onScan={onScanBadges}
                    />
                );
            case "badges":
                return (
                    <BadgeSelection
                        catalog={badgeCatalog}
                        hidden={hiddenBadges}
                        onToggle={onBadgeToggle}
                        onToggleAll={onBadgeToggleAll}
                        onScan={onScanBadges}
                    />
                );
            
            case "servers":
                return (
                    <ServerSettings
                        serverSettings={serverSettings}
                        currentServerId={currentServerId}
                        onUpdateServerSettings={onUpdateServerSettings}
                        onResetServer={onResetServer}
                    />
                );
            
            case "ui":
                return (
                    <UICustomizationPanel
                        settings={uiSettings}
                        onUpdate={onUISettingsUpdate}
                    />
                );
            
            case "moderation":
                return (
                    <ModerationTools
                        rules={moderationRules}
                        stats={moderationStats}
                        enabled={moderationEnabled}
                        onToggle={onModerationToggle}
                        onAddRule={onAddModerationRule}
                        onUpdateRule={onUpdateModerationRule}
                        onRemoveRule={onRemoveModerationRule}
                        onResetStats={onResetModerationStats}
                    />
                );
            
            case "actions":
                return (
                    <QuickActions
                        actions={quickActions}
                        enabledActions={enabledQuickActions}
                        onToggle={onQuickActionToggle}
                        onExecute={onQuickActionExecute}
                    />
                );
            
            case "export":
                return (
                    <ExportImport
                        onExport={onExport}
                        onImport={onImport}
                    />
                );
            
            default:
                return null;
        }
    }, [
        activeTab,
        badgeCatalog,
        hiddenBadges,
        hideAllBadges,
        onBadgeToggle,
        onBadgeToggleAll,
        onScanBadges,
        onResetBadges,
        uiSettings,
        onUISettingsUpdate,
        moderationRules,
        moderationStats,
        moderationEnabled,
        onModerationToggle,
        onAddModerationRule,
        onUpdateModerationRule,
        onRemoveModerationRule,
        onResetModerationStats,
        quickActions,
        enabledQuickActions,
        onQuickActionToggle,
        onQuickActionExecute,
        serverSettings,
        currentServerId,
        onUpdateServerSettings,
        onResetServer,
        onExport,
        onImport,
    ]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
        }}>
            {/* En-tête du plugin */}
            <div style={{
                padding: "16px",
                backgroundColor: DiscordColors.backgroundPrimary,
                borderRadius: "8px",
                border: `1px solid ${DiscordColors.border}`,
            }}>
                <h2 style={{
                    color: DiscordColors.textNormal,
                    fontSize: "20px",
                    fontWeight: 700,
                    margin: 0,
                    marginBottom: "4px",
                }}>
                    Discord Tools
                </h2>
                <p style={{
                    color: DiscordColors.textMuted,
                    fontSize: "14px",
                    margin: 0,
                }}>
                    Un outil complet pour personnaliser et améliorer ton expérience Discord
                </p>
            </div>

            {/* Onglets */}
            <div style={TabStyles.container}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        style={{
                            ...TabStyles.tab,
                            ...(activeTab === tab.id ? TabStyles.tabActive : {}),
                        }}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span style={{ marginRight: "4px" }}>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Contenu */}
            <div style={TabStyles.contentActive}>
                {renderContent()}
            </div>

            {/* Pied de page */}
            <div style={{
                padding: "12px 16px",
                backgroundColor: DiscordColors.backgroundTertiary,
                borderRadius: "8px",
                fontSize: "12px",
                color: DiscordColors.textMuted,
                textAlign: "center",
            }}>
                Discord Tools v2.1.0 • Un plugin Vencord par REFLEX60FPSMOBILE
            </div>
        </div>
    );
};

export default SettingsPanel;
