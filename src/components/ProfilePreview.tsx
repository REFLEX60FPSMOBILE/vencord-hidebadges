import React, { useState, useEffect, useRef, useCallback } from "react";
import { BadgeInfo } from "@types";
import { CardStyles, ButtonStyles } from "@styles";
import { DiscordColors } from "@styles";
import { CUSTOM_ATTRS } from "@utils/constants";

interface ProfilePreviewProps {
    catalog: Record<string, BadgeInfo>;
    hidden: Record<string, boolean>;
    onToggle: (key: string) => void;
    onScan: () => void;
}

interface ProfileBadge {
    key: string;
    src: string;
    label: string;
    kind: string;
    isHidden: boolean;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({
    catalog,
    hidden,
    onToggle,
    onScan,
}) => {
    const [badges, setBadges] = useState<ProfileBadge[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [previewUser, setPreviewUser] = useState<{
        name: string;
        avatar: string;
        banner: string;
    }>({
        name: "Ton Profil",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
        banner: "",
    });
    const previewRef = useRef<HTMLDivElement>(null);

    // Charger les infos du profil utilisateur
    useEffect(() => {
        loadUserProfile();
        const interval = setInterval(loadUserProfile, 5000);
        return () => clearInterval(interval);
    }, []);

    // Charger les badges depuis le catalogue
    useEffect(() => {
        updateBadgesFromCatalog();
    }, [catalog, hidden]);

    const loadUserProfile = useCallback(() => {
        try {
            // Essayer de récupérer les infos du profil de l'utilisateur connecté
            const userElement = document.querySelector(".userProfileModal, [class*='userProfile']");
            if (userElement) {
                const name = userElement.querySelector("[class*='username'], [class*='name']")?.textContent?.trim() || "Ton Profil";
                const avatar = userElement.querySelector("img[class*='avatar'], img[class*='userAvatar']")?.src || 
                    "https://cdn.discordapp.com/embed/avatars/0.png";
                const banner = userElement.querySelector("[class*='banner'], [class*='profileBanner']")?.getAttribute("src") || "";
                
                setPreviewUser({ name, avatar, banner });
            }
        } catch (e) {
            // Utiliser les infos par défaut
            console.log("Impossible de charger le profil utilisateur", e);
        }
    }, []);

    const updateBadgesFromCatalog = useCallback(() => {
        const badgeList: ProfileBadge[] = [];
        
        for (const [key, info] of Object.entries(catalog)) {
            badgeList.push({
                key,
                src: info.src,
                label: info.label,
                kind: info.kind,
                isHidden: !!hidden[key],
            });
        }
        
        // Trier par type puis par nom
        badgeList.sort((a, b) => {
            const order = { discord: 0, vencord: 1, custom: 2, autre: 3 };
            return (order[a.kind] ?? 4) - (order[b.kind] ?? 4) || a.label.localeCompare(b.label);
        });
        
        setBadges(badgeList);
    }, [catalog, hidden]);

    const handleBadgeClick = useCallback((key: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onToggle(key);
    }, [onToggle]);

    const toggleShowAll = useCallback(() => {
        setShowAll(!showAll);
    }, [showAll]);

    const displayedBadges = showAll ? badges : badges.slice(0, 12);

    return (
        <div style={CardStyles.container}>
            <div style={CardStyles.header}>
                <div>
                    <h3 style={CardStyles.title}>👤 Aperçu du Profil</h3>
                    <p style={CardStyles.description}>
                        Clique sur les badges pour les masquer/afficher
                    </p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                    <button
                        style={ButtonStyles.secondary}
                        onClick={onScan}
                    >
                        🔍 Scanner
                    </button>
                    <button
                        style={ButtonStyles.ghost}
                        onClick={toggleShowAll}
                    >
                        {showAll ? "Moins" : `+${badges.length - 12}`}
                    </button>
                </div>
            </div>

            {/* Aperçu du profil */}
            <div
                ref={previewRef}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px",
                    backgroundColor: DiscordColors.backgroundTertiary,
                    borderRadius: "8px",
                    marginBottom: "16px",
                    position: "relative",
                    minHeight: "200px",
                }}
            >
                {/* Bannière */}
                {previewUser.banner && (
                    <div style={{
                        width: "100%",
                        height: "60px",
                        borderRadius: "8px 8px 0 0",
                        overflow: "hidden",
                        marginBottom: "12px",
                        background: `url(${previewUser.banner}) center/cover`,
                    }} />
                )}

                {/* Avatar */}
                <div style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `4px solid ${DiscordColors.backgroundPrimary}`,
                    marginBottom: "12px",
                }}>
                    <img
                        src={previewUser.avatar}
                        alt="Avatar"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://cdn.discordapp.com/embed/avatars/0.png";
                        }}
                    />
                </div>

                {/* Nom */}
                <h4 style={{
                    color: DiscordColors.textNormal,
                    fontSize: "18px",
                    fontWeight: 700,
                    margin: "0 0 8px 0",
                }}>
                    {previewUser.name}
                </h4>

                {/* Badges */}
                {displayedBadges.length > 0 ? (
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        justifyContent: "center",
                        width: "100%",
                        padding: "12px 0",
                    }}>
                        {displayedBadges.map((badge) => (
                            <div
                                key={badge.key}
                                style={{
                                    position: "relative",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    opacity: badge.isHidden ? 0.3 : 1,
                                    transform: badge.isHidden ? "scale(0.9)" : "scale(1)",
                                }}
                                onClick={(e) => handleBadgeClick(badge.key, e)}
                            >
                                {/* Badge */}
                                <img
                                    src={badge.src}
                                    alt={badge.label}
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        objectFit: "contain",
                                        borderRadius: "4px",
                                        backgroundColor: DiscordColors.backgroundPrimary,
                                        padding: "2px",
                                    }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://cdn.discordapp.com/attachments/1080804322713985024/1148900734501429248/unknown.png";
                                    }}
                                />
                                
                                {/* Overlay de masquage */}
                                {badge.isHidden && (
                                    <div style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: "rgba(237, 66, 69, 0.7)",
                                        borderRadius: "4px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <span style={{
                                            color: "white",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                        }}>
                                            ✕
                                        </span>
                                    </div>
                                )}
                                
                                {/* Tooltip */}
                                <div style={{
                                    position: "absolute",
                                    bottom: "100%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    backgroundColor: DiscordColors.backgroundPrimary,
                                    color: DiscordColors.textNormal,
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    fontSize: "11px",
                                    whiteSpace: "nowrap",
                                    opacity: 0,
                                    visibility: "hidden",
                                    transition: "opacity 0.2s, visibility 0.2s",
                                    zIndex: 10,
                                }}>
                                    {badge.label}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        color: DiscordColors.textMuted,
                        fontSize: "13px",
                        textAlign: "center",
                        padding: "20px",
                    }}>
                        Aucun badge détecté. Ouvre un profil pour en scanner.
                    </div>
                )}

                {/* Indicateur de badges masqués */}
                {badges.some(b => b.isHidden) && (
                    <div style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        backgroundColor: DiscordColors.danger,
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: 600,
                    }}>
                        {badges.filter(b => b.isHidden).length} masqué(s)
                    </div>
                )}
            </div>

            {/* Légende */}
            <div style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                fontSize: "12px",
                color: DiscordColors.textMuted,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ color: DiscordColors.primary }}>🏷️</span>
                    <span>Badge Discord</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ color: "#9b59b6" }}>💜</span>
                    <span>Badge Vencord</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ color: DiscordColors.success }}>🟢</span>
                    <span>Badge Personnalisé</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto" }}>
                    <span style={{ color: DiscordColors.danger }}>✕</span>
                    <span>Masqué</span>
                </div>
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
                <strong>💡 Conseil : </strong>
                Les badges que tu masques ici seront cachés <strong>partout</strong> : 
                sur ton profil ET sur les profils des autres utilisateurs.
            </div>
        </div>
    );
};

export default ProfilePreview;
