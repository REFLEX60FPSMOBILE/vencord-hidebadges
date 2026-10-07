import React, { useCallback, useMemo } from "react";
import { QuickAction } from "@types";
import { CardStyles, ButtonStyles, ListStyles } from "@styles";
import { DiscordColors } from "@styles";

interface QuickActionsProps {
    actions: QuickAction[];
    enabledActions: Record<string, boolean>;
    onToggle: (id: string) => void;
    onExecute: (id: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
    actions,
    enabledActions,
    onToggle,
    onExecute,
}) => {
    const categories = useMemo(() => {
        const map: Record<string, QuickAction[]> = {};
        for (const action of actions) {
            if (!map[action.category]) {
                map[action.category] = [];
            }
            map[action.category].push(action);
        }
        return map;
    }, [actions]);

    const executeAction = useCallback((id: string) => {
        onExecute(id);
    }, [onExecute]);

    const toggleAction = useCallback((id: string) => {
        onToggle(id);
    }, [onToggle]);

    return (
        <div style={CardStyles.container}>
            <div style={CardStyles.header}>
                <div>
                    <h3 style={CardStyles.title}>Actions Rapides</h3>
                    <p style={CardStyles.description}>
                        Accès rapide à des fonctionnalités utiles
                    </p>
                </div>
            </div>

            <div style={ListStyles.container}>
                {Object.entries(categories).map(([category, categoryActions]) => (
                    <div key={category} style={{ marginBottom: "12px" }}>
                        <h4 style={{
                            color: DiscordColors.textNormal,
                            fontSize: "13px",
                            fontWeight: 600,
                            marginBottom: "6px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                        }}>
                            {category}
                        </h4>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "6px",
                        }}>
                            {categoryActions.map((action) => (
                                <div
                                    key={action.id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "8px",
                                        backgroundColor: DiscordColors.backgroundTertiary,
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        ":hover": {
                                            backgroundColor: DiscordColors.backgroundModifierHover,
                                        },
                                    }}
                                    onClick={() => executeAction(action.id)}
                                >
                                    <div style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "6px",
                                        backgroundColor: enabledActions[action.id]
                                            ? DiscordColors.success
                                            : DiscordColors.backgroundSecondary,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}>
                                        <span style={{ fontSize: "16px" }}>{action.icon || "⚡"}</span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            color: DiscordColors.textNormal,
                                            fontSize: "13px",
                                            fontWeight: 500,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}>
                                            {action.name}
                                        </div>
                                        <div style={{
                                            color: DiscordColors.textMuted,
                                            fontSize: "11px",
                                        }}>
                                            {action.description}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "4px",
                                            backgroundColor: enabledActions[action.id]
                                                ? DiscordColors.success
                                                : DiscordColors.backgroundSecondary,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleAction(action.id);
                                        }}
                                    >
                                        <span style={{ 
                                            fontSize: "12px",
                                            color: enabledActions[action.id] ? "#fff" : DiscordColors.textMuted
                                        }}>
                                            {enabledActions[action.id] ? "✓" : "✗"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Conseils */}
            <div style={{
                marginTop: "12px",
                padding: "12px",
                backgroundColor: "var(--background-tertiary)",
                borderRadius: "6px",
                fontSize: "12px",
                color: "var(--text-muted)",
            }}>
                <strong>Conseil : </strong>
                Active les actions que tu utilises souvent. Tu peux les exécuter rapidement depuis le menu ou avec des raccourcis clavier.
            </div>
        </div>
    );
};

export default QuickActions;
