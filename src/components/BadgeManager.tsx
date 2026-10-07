import React, { useState, useMemo, useCallback } from "react";
import { BadgeInfo } from "@types";
import { CardStyles, InputStyles, ButtonStyles, ListStyles } from "@styles";
import { deepClone } from "@utils/helpers";

interface BadgeManagerProps {
    catalog: Record<string, BadgeInfo>;
    hidden: Record<string, boolean>;
    hideAll: boolean;
    onToggle: (key: string) => void;
    onToggleAll: (value: boolean) => void;
    onScan: () => void;
    onReset: () => void;
}

const BadgeManager: React.FC<BadgeManagerProps> = ({
    catalog,
    hidden,
    hideAll,
    onToggle,
    onToggleAll,
    onScan,
    onReset,
}) => {
    const [query, setQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

    const allBadges = useMemo(() => Object.values(catalog), [catalog]);
    const q = query.trim().toLowerCase();

    const filteredBadges = useMemo(() => {
        return allBadges
            .filter((badge) => {
                if (categoryFilter && badge.kind !== categoryFilter) return false;
                if (!q) return true;
                return (
                    badge.label.toLowerCase().includes(q) ||
                    badge.kind.toLowerCase().includes(q) ||
                    badge.key.toLowerCase().includes(q)
                );
            })
            .sort((a, b) => {
                // Trier par catégorie puis par nom
                const categoryOrder = { discord: 0, vencord: 1, custom: 2, autre: 3 };
                const aOrder = categoryOrder[a.kind] ?? 4;
                const bOrder = categoryOrder[b.kind] ?? 4;
                
                if (aOrder !== bOrder) return aOrder - bOrder;
                return a.label.localeCompare(b.label);
            });
    }, [allBadges, q, categoryFilter]);

    const categories = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const badge of allBadges) {
            counts[badge.kind] = (counts[badge.kind] || 0) + 1;
        }
        return counts;
    }, [allBadges]);

    const hiddenCount = useMemo(() => {
        return Object.values(hidden).filter((h) => h).length;
    }, [hidden]);

    const totalCount = useMemo(() => {
        return allBadges.length;
    }, [allBadges]);

    const handleToggle = useCallback((key: string) => {
        onToggle(key);
    }, [onToggle]);

    const handleToggleAll = useCallback((value: boolean) => {
        onToggleAll(value);
    }, [onToggleAll]);

    return (
        <div style={CardStyles.container}>
            {/* En-tête */}
            <div style={CardStyles.header}>
                <div>
                    <h3 style={CardStyles.title}>Gestion des Badges</h3>
                    <p style={CardStyles.description}>
                        {totalCount} badges détectés • {hiddenCount} masqués
                        {hideAll && <span style={{ color: "#ed4245", marginLeft: "8px" }}>
                            • TOUS masqués
                        </span>}
                    </p>
                </div>
            </div>

            {/* Filtres */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
                <input
                    style={{ ...InputStyles.text, flex: 1, minWidth: "200px" }}
                    placeholder="Rechercher un badge..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                
                <select
                    style={InputStyles.select}
                    value={categoryFilter || ""}
                    onChange={(e) => setCategoryFilter(e.target.value || null)}
                >
                    <option value="">Toutes catégories</option>
                    {Object.entries(categories).map(([kind, count]) => (
                        <option key={kind} value={kind}>
                            {kind} ({count})
                        </option>
                    ))}
                </select>
            </div>

            {/* Actions rapides */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                <button
                    style={ButtonStyles.primary}
                    onClick={() => handleToggleAll(true)}
                >
                    Tout masquer
                </button>
                <button
                    style={ButtonStyles.secondary}
                    onClick={() => handleToggleAll(false)}
                >
                    Tout afficher
                </button>
                <button
                    style={ButtonStyles.secondary}
                    onClick={onScan}
                >
                    Scanner
                </button>
                <button
                    style={ButtonStyles.danger}
                    onClick={onReset}
                >
                    Réinitialiser
                </button>
            </div>

            {/* Liste des badges */}
            {filteredBadges.length === 0 ? (
                <div style={{ 
                    ...ListStyles.container, 
                    textAlign: "center", 
                    padding: "20px",
                    color: "var(--text-muted)"
                }}>
                    Aucun badge trouvé. Ouvre un profil utilisateur pour en détecter.
                </div>
            ) : (
                <div style={ListStyles.grid}>
                    {filteredBadges.map((badge) => {
                        const isHidden = hidden[badge.key];
                        
                        return (
                            <div
                                key={badge.key}
                                style={{
                                    ...ListStyles.item,
                                    ...(isHidden ? ListStyles.itemSelected : {}),
                                    border: `1px solid ${isHidden ? "#ed4245" : "transparent"}`,
                                    opacity: isHidden ? 0.7 : 1,
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
                                
                                {/* Informations du badge */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        color: "var(--text-normal)",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}>
                                        {badge.label}
                                    </div>
                                    <div style={{
                                        color: "var(--text-muted)",
                                        fontSize: "11px",
                                        marginTop: "2px",
                                    }}>
                                        {badge.kind}
                                        {isHidden && <span style={{ marginLeft: "4px" }}>• masqué</span>}
                                    </div>
                                </div>
                                
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={!!isHidden}
                                    onChange={() => handleToggle(badge.key)}
                                    onClick={(e) => e.stopPropagation()}
                                    style={InputStyles.checkbox}
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
                <strong>Conseil : </strong>
                Ouvre un profil utilisateur ou une popout pour détecter automatiquement les badges.
                Les badges personnalisés peuvent être ajoutés manuellement.
            </div>
        </div>
    );
};

export default BadgeManager;
