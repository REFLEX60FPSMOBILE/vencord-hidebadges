import React, { useState, useCallback, useMemo } from "react";
import { ModerationRule, ModerationStats, MODERATION_ACTIONS } from "@types";
import { CardStyles, InputStyles, ButtonStyles, ListStyles, SwitchStyles } from "@styles";
import { DiscordColors } from "@styles";
import { deepClone, generateId } from "@utils/helpers";

interface ModerationToolsProps {
    rules: ModerationRule[];
    stats: ModerationStats;
    enabled: boolean;
    onToggle: () => void;
    onAddRule: (rule: ModerationRule) => void;
    onUpdateRule: (id: string, updates: Partial<ModerationRule>) => void;
    onRemoveRule: (id: string) => void;
    onResetStats: () => void;
}

const ACTION_LABELS = {
    [MODERATION_ACTIONS.HIDE]: "Masquer",
    [MODERATION_ACTIONS.WARN]: "Avertir",
    [MODERATION_ACTIONS.BLOCK]: "Bloquer",
};

const ACTION_COLORS = {
    [MODERATION_ACTIONS.HIDE]: DiscordColors.danger,
    [MODERATION_ACTIONS.WARN]: DiscordColors.warning,
    [MODERATION_ACTIONS.BLOCK]: DiscordColors.danger,
};

const ModerationTools: React.FC<ModerationToolsProps> = ({
    rules,
    stats,
    enabled,
    onToggle,
    onAddRule,
    onUpdateRule,
    onRemoveRule,
    onResetStats,
}) => {
    const [newRule, setNewRule] = useState<Omit<ModerationRule, "id" | "enabled">>({
        name: "",
        pattern: "",
        action: MODERATION_ACTIONS.HIDE,
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editRule, setEditRule] = useState<Partial<ModerationRule>>({});

    const handleAddRule = useCallback(() => {
        if (!newRule.name.trim() || !newRule.pattern.trim()) return;
        
        onAddRule({
            ...newRule,
            id: generateId("rule-"),
            enabled: true,
        });
        
        setNewRule({
            name: "",
            pattern: "",
            action: MODERATION_ACTIONS.HIDE,
        });
    }, [newRule, onAddRule]);

    const startEditing = useCallback((rule: ModerationRule) => {
        setEditingId(rule.id);
        setEditRule(deepClone(rule));
    }, []);

    const saveEdit = useCallback(() => {
        if (!editingId) return;
        onUpdateRule(editingId, editRule);
        setEditingId(null);
        setEditRule({});
    }, [editingId, editRule, onUpdateRule]);

    const cancelEdit = useCallback(() => {
        setEditingId(null);
        setEditRule({});
    }, []);

    const toggleRule = useCallback((id: string) => {
        const rule = rules.find((r) => r.id === id);
        if (rule) {
            onUpdateRule(id, { enabled: !rule.enabled });
        }
    }, [rules, onUpdateRule]);

    const formattedStats = useMemo(() => [
        { label: "Messages totaux", value: stats.totalMessages },
        { label: "Messages masqués", value: stats.hiddenMessages },
        { label: "Utilisateurs avertis", value: stats.warnedUsers },
        { label: "Utilisateurs bloqués", value: stats.blockedUsers },
    ], [stats]);

    return (
        <div style={CardStyles.container}>
            <div style={CardStyles.header}>
                <div>
                    <h3 style={CardStyles.title}>Outils de Modération</h3>
                    <p style={CardStyles.description}>
                        Filtre et modère automatiquement les messages
                    </p>
                </div>
                <div style={SwitchStyles.container} onClick={onToggle}>
                    <div style={SwitchStyles.track}>
                        <div style={{
                            ...SwitchStyles.thumb,
                            ...(enabled ? SwitchStyles.thumbChecked : {}),
                        }} />
                    </div>
                    <span style={SwitchStyles.label}>{enabled ? "Actif" : "Inactif"}</span>
                </div>
            </div>

            {/* Statistiques */}
            <div style={{
                display: "flex", 
                gap: "16px", 
                marginBottom: "16px",
                flexWrap: "wrap"
            }}>
                {formattedStats.map((stat) => (
                    <div
                        key={stat.label}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "12px",
                            backgroundColor: DiscordColors.backgroundTertiary,
                            borderRadius: "6px",
                            minWidth: "120px",
                        }}
                    >
                        <span style={{ 
                            fontSize: "20px", 
                            fontWeight: 700,
                            color: DiscordColors.primary
                        }}>
                            {stat.value}
                        </span>
                        <span style={{ 
                            fontSize: "11px", 
                            color: DiscordColors.textMuted,
                            textTransform: "uppercase"
                        }}>
                            {stat.label}
                        </span>
                    </div>
                ))}
                <button
                    style={{ ...ButtonStyles.ghost, marginLeft: "auto" }}
                    onClick={onResetStats}
                >
                    Réinitialiser
                </button>
            </div>

            {/* Règles existantes */}
            <div style={{ marginBottom: "16px" }}>
                <h4 style={{ 
                    color: DiscordColors.textNormal, 
                    fontSize: "14px", 
                    fontWeight: 600, 
                    marginBottom: "8px"
                }}>
                    Règles actives ({rules.filter(r => r.enabled).length}/{rules.length})
                </h4>
                
                {rules.length === 0 ? (
                    <div style={{
                        ...ListStyles.container,
                        textAlign: "center",
                        padding: "20px",
                        color: DiscordColors.textMuted
                    }}>
                        Aucune règle définie. Ajoute une règle ci-dessous.
                    </div>
                ) : (
                    <div style={ListStyles.container}>
                        {rules.map((rule) => (
                            editingId === rule.id ? (
                                <div
                                    key={rule.id}
                                    style={{
                                        ...ListStyles.item,
                                        backgroundColor: DiscordColors.backgroundTertiary,
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={editRule.name || ""}
                                        onChange={(e) => setEditRule({ ...editRule, name: e.target.value })}
                                        style={{ ...InputStyles.text, flex: 1 }}
                                        placeholder="Nom de la règle"
                                    />
                                    <select
                                        value={editRule.action || rule.action}
                                        onChange={(e) => setEditRule({ ...editRule, action: e.target.value as any })}
                                        style={InputStyles.select}
                                    >
                                        {Object.values(MODERATION_ACTIONS).map((action) => (
                                            <option key={action} value={action}>
                                                {ACTION_LABELS[action]}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        style={{ ...ButtonStyles.success, padding: "4px 8px", fontSize: "12px" }}
                                        onClick={saveEdit}
                                    >
                                        ✓
                                    </button>
                                    <button
                                        style={{ ...ButtonStyles.danger, padding: "4px 8px", fontSize: "12px" }}
                                        onClick={cancelEdit}
                                    >
                                        ✗
                                    </button>
                                </div>
                            ) : (
                                <div
                                    key={rule.id}
                                    style={{
                                        ...ListStyles.item,
                                        borderLeft: `4px solid ${ACTION_COLORS[rule.action]}`,
                                        opacity: rule.enabled ? 1 : 0.5,
                                    }}
                                >
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            color: DiscordColors.textNormal,
                                            fontSize: "14px",
                                            fontWeight: 600,
                                        }}>
                                            {rule.name}
                                        </div>
                                        <div style={{
                                            color: DiscordColors.textMuted,
                                            fontSize: "11px",
                                            marginTop: "2px",
                                        }}>
                                            {rule.pattern}
                                        </div>
                                    </div>
                                    <div style={{ 
                                        display: "flex", 
                                        gap: "8px", 
                                        alignItems: "center"
                                    }}>
                                        <span style={{
                                            color: ACTION_COLORS[rule.action],
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            textTransform: "uppercase"
                                        }}>
                                            {ACTION_LABELS[rule.action]}
                                        </span>
                                        <button
                                            style={ButtonStyles.ghost}
                                            onClick={() => startEditing(rule)}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            style={ButtonStyles.danger}
                                            onClick={() => onRemoveRule(rule.id)}
                                        >
                                            🗑️
                                        </button>
                                        <div style={SwitchStyles.container} onClick={(e) => { e.stopPropagation(); toggleRule(rule.id); }}>
                                            <div style={SwitchStyles.track}>
                                                <div style={{
                                                    ...SwitchStyles.thumb,
                                                    ...(rule.enabled ? SwitchStyles.thumbChecked : {}),
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>

            {/* Nouvelle règle */}
            <div style={{
                padding: "12px",
                backgroundColor: DiscordColors.backgroundTertiary,
                borderRadius: "6px",
                marginBottom: "16px"
            }}>
                <h4 style={{ 
                    color: DiscordColors.textNormal, 
                    fontSize: "14px", 
                    fontWeight: 600, 
                    marginBottom: "8px"
                }}>
                    Ajouter une règle
                </h4>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <input
                        type="text"
                        value={newRule.name}
                        onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                        style={{ ...InputStyles.text, flex: 1, minWidth: "150px" }}
                        placeholder="Nom de la règle"
                    />
                    <input
                        type="text"
                        value={newRule.pattern}
                        onChange={(e) => setNewRule({ ...newRule, pattern: e.target.value })}
                        style={{ ...InputStyles.text, flex: 1, minWidth: "200px" }}
                        placeholder="Expression régulière"
                    />
                    <select
                        value={newRule.action}
                        onChange={(e) => setNewRule({ ...newRule, action: e.target.value as any })}
                        style={InputStyles.select}
                    >
                        {Object.values(MODERATION_ACTIONS).map((action) => (
                            <option key={action} value={action}>
                                {ACTION_LABELS[action]}
                            </option>
                        ))}
                    </select>
                    <button
                        style={ButtonStyles.primary}
                        onClick={handleAddRule}
                        disabled={!newRule.name.trim() || !newRule.pattern.trim()}
                    >
                        Ajouter
                    </button>
                </div>
            </div>

            {/* Conseils */}
            <div style={{
                padding: "12px",
                backgroundColor: "var(--background-tertiary)",
                borderRadius: "6px",
                fontSize: "12px",
                color: "var(--text-muted)",
            }}>
                <strong>Conseils : </strong>
                Utilise des expressions régulières pour filtrer les messages. 
                Exemple : <code>(discord\.gg|invite)</code> pour bloquer les invitations Discord.
            </div>
        </div>
    );
};

export default ModerationTools;
