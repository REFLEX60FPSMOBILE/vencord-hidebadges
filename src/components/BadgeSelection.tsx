import React, { useState, useEffect, useCallback } from "react";
import { BadgeInfo } from "@types";
import { CardStyles, ButtonStyles, ListStyles, InputStyles } from "@styles";
import { DiscordColors } from "@styles";

interface BadgeSelectionProps {
    catalog: Record<string, BadgeInfo>;
    hidden: Record<string, boolean>;
    onToggle: (key: string) => void;
    onToggleAll: (value: boolean) => void;
    onScan: () => void;
}

const BadgeSelection: React.FC<BadgeSelectionProps> = ({
    catalog,
    hidden,
    onToggle,
    onToggleAll,
    onScan,
}) => {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showOnlyHidden, setShowOnlyHidden] = useState(false);

    const allBadges = Object.values(catalog);
    const q = query.trim().toLowerCase();

    const filteredBadges = allBadges.filter((badge) => {
        if (selectedCategory && badge.kind !== selectedCategory) return false;
        if (showOnlyHidden && !hidden[badge.key]) return false;
        if (!q) return true;
        return (
            badge.label.toLowerCase().includes(q) ||
            badge.kind.toLowerCase().includes(q) ||
            badge.key.toLowerCase().includes(q)
        );
    });

    const categories = Array.from(new Set(allBadges.map((b) => b.kind)));

    const hiddenCount = Object.values(hidden).filter((h) => h).length;
    const totalCount = allBadges.length;

    const handleToggle = useCallback((key: string) => {
        onToggle(key);
    }, [onToggle]);

    const handleToggleAll = useCallback((value: boolean) => {
        onToggleAll(value);
    }, [onToggleAll]);

    const toggleCategory = useCallback((category: string | null) => {
        setSelectedCategory(prev => prev === category ? null : category);
    }, []);

    return (
        <div style={CardStyles.container}>
            <div style={CardStyles.header}>
                <div>
                    <h3 style={CardStyles.title}>🏷️ Sélection des Badges</h3>
                    <p style={CardStyles.description}>
                        {totalCount} badges détectés • {hiddenCount} masqués
                    </p>
                </div>
                <button
                    style={ButtonStyles.primary}
                    onClick={onScan}
                >
                    🔍 Scanner
                </button>
            </div>

            {/* Filtres */}
            <div style={{ 
                display: "flex", 
                gap: "8px", 
                flexWrap: "wrap", 
                marginBottom: "12px"
            }}>
                <input
                    style={{ ...InputStyles.text, flex: 1, minWidth: "200px" }}
                    placeholder="Rechercher un badge..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                
                <button
                    style={{
                        ...ButtonStyles.secondary,
                        backgroundColor: showOnlyHidden ? DiscordColors.primary : undefined,
                    }}
                    onClick={() => setShowOnlyHidden(!showOnlyHidden)}
                >
                    {showOnlyHidden ? "✕ Masqués" : "👁️‍🗨️ Masqués seulement"}
                </button>
            </div>

            {/* Catégories */}
            {categories.length > 0 && (
                <div style={{
                    display: "flex",
                    gap: "4px",
                    flexWrap: "wrap",
                    marginBottom: "12px",
                }}>
                    <button
                        style={{
                            ...ButtonStyles.ghost,
                            backgroundColor: !selectedCategory ? DiscordColors.backgroundModifierHover : undefined,
                            fontSize: "11px",
                            padding: "4px 8px",
                        }}
                        onClick={() => toggleCategory(null)}
                    >
                        Tous ({allBadges.length})
                    </button>
                    {categories.map((category) => {
                        const count = allBadges.filter((b) => b.kind === category).length;
                        const categoryHidden = allBadges.filter(
                            (b) => b.kind === category && hidden[b.key]
                        ).length;
                        return (
                            <button
                                key={category}
                                style={{
                                    ...ButtonStyles.ghost,
                                    backgroundColor: selectedCategory === category 
                                        ? DiscordColors.backgroundModifierHover 
                                        : undefined,
                                    fontSize: "11px",
                                    padding: "4px 8px",
                                    position: "relative",
                                }}
                                onClick={() => toggleCategory(category)}
                            >
                                {category} ({count - categoryHidden}/{count})
                                {selectedCategory === category && (
                                    <span style={{
                                        position: "absolute",
                                        top: "-2px",
                                        right: "-2px",
                                        width: "8px",
                                        height: "8px",
                                        backgroundColor: DiscordColors.primary,
                                        borderRadius: "50%",
                                    }} />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Actions rapides */}
            <div style={{
                display: "flex", 
                gap: "8px", 
                marginBottom: "12px",
                flexWrap: "wrap"
            }}>
                <button
                    style={ButtonStyles.primary}
                    onClick={() => handleToggleAll(true)}
                >
                    🚫 Tout masquer
                </button>
                <button
                    style={ButtonStyles.secondary}
                    onClick={() => handleToggleAll(false)}
                >
                    👁️ Tout afficher
                </button>
            </div>

            {/* Liste des badges */}
            {filteredBadges.length === 0 ? (
                <div style={{
                    ...ListStyles.container,
                    textAlign: "center",
                    padding: "20px",
                    color: DiscordColors.textMuted
                }}>
                    Aucun badge trouvé. Ouvre un profil utilisateur pour en détecter.
                </div>
            ) : (
                <div style={ListStyles.grid}>
                    {filteredBadges.map((badge) => {
                        const isHidden = !!hidden[badge.key];
                        
                        return (
                            <div
                                key={badge.key}
                                style={{
                                    ...ListStyles.item,
                                    border: `1px solid ${isHidden ? DiscordColors.danger : "transparent"}`,
                                    opacity: isHidden ? 0.6 : 1,
                                    cursor: "pointer",
                                }}
                                onClick={() => handleToggle(badge.key)}
                            >
                                {/* Icône du badge */}
                                <img
                                    src={badge.src}
                                    alt=""
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        objectFit: "contain",
                                        flexShrink: 0,
                                    }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://cdn.discordapp.com/attachments/1080804322713985024/1148900734501429248/unknown.png";
                                    }}
                                />
                                
                                {/* Informations */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        color: DiscordColors.textNormal,
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}>
                                        {badge.label}
                                    </div>
                                    <div style={{
                                        color: DiscordColors.textMuted,
                                        fontSize: "11px",
                                    }}>
                                        {badge.kind}
                                    </div>
                                </div>
                                
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={isHidden}
                                    onChange={() => handleToggle(badge.key)}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        ...InputStyles.checkbox,
                                        accentColor: DiscordColors.danger,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Conseils */}
            <div style={{
                marginTop: "12px",
                padding: "12px",
                backgroundColor: "var(--background-tertiary)",
                borderRadius: "6px",
                fontSize: "12px",
                color: "var(--text-muted)",
            }}>
                <strong>💡 Conseil : </strong>
                Les badges que tu masques ici seront cachés <strong>sur TOUS les profils</strong> 
                (le tien et ceux des autres). Ouvre un profil pour détecter de nouveaux badges.
            </div>
        </div>
    );
};

export default BadgeSelection;
