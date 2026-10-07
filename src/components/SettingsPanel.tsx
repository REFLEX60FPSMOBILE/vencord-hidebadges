import React, { useState, useCallback, useMemo } from "react";
import { CardStyles, ButtonStyles, TabStyles } from "@styles";
import { DiscordColors } from "@styles";
import BadgeManager from "./BadgeManager";
import UICustomizationPanel from "./UICustomization";
import ModerationTools from "./ModerationTools";
import QuickActions from "./QuickActions";
import { BadgeInfo, UICustomization, ModerationRule, ModerationStats, QuickAction } from "@types";

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
}) => {
    const [activeTab, setActiveTab] = useState("badges");

    const tabs = useMemo(() => [
        { id: "badges", label: "Badges", icon: "🏷️" },
        { id: "ui", label: "Personnalisation UI", icon: "🎨" },
        { id: "moderation", label: "Modération", icon: "🛡️" },
        { id: "actions", label: "Actions Rapides", icon: "⚡" },
    ], []);

    const renderContent = useCallback(() => {
        switch (activeTab) {
            case "badges":
                return (
                    <BadgeManager
                        catalog={badgeCatalog}
                        hidden={hiddenBadges}
                        hideAll={hideAllBadges}
                        onToggle={onBadgeToggle}
                        onToggleAll={onBadgeToggleAll}
                        onScan={onScanBadges}
                        onReset={onResetBadges}
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
                Discord Tools v2.0.0 • Un plugin Vencord par REFLEX60FPSMOBILE
            </div>
        </div>
    );
};

export default SettingsPanel;
