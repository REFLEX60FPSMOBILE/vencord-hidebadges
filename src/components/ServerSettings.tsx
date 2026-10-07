import React, { useState, useCallback, useMemo } from "react";
import { CardStyles, ButtonStyles, InputStyles, ListStyles } from "@styles";
import { DiscordColors } from "@styles";

interface ServerSettingsProps {
    serverSettings: Record<string, {
        hideBadges: boolean;
        hiddenBadges: Record<string, boolean>;
    }>;
    currentServerId: string | null;
    onUpdateServerSettings: (serverId: string, updates: Partial<{
        hideBadges: boolean;
        hiddenBadges: Record<string, boolean>;
    }>) => void;
    onResetServer: (serverId: string) => void;
}

const ServerSettings: React.FC<ServerSettingsProps> = ({
    serverSettings,
    currentServerId,
    onUpdateServerSettings,
    onResetServer,
}) => {
    const [newServerId, setNewServerId] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredServers = useMemo(() => {
        const servers = Object.entries(serverSettings);
        const query = searchQuery.toLowerCase();
        return servers.filter(([id]) => id.toLowerCase().includes(query));
    }, [serverSettings, searchQuery]);

    const handleAddServer = useCallback(() => {
        if (!newServerId.trim()) return;
        onUpdateServerSettings(newServerId, {
            hideBadges: true,
            hiddenBadges: {},
        });
        setNewServerId("");
    }, [newServerId, onUpdateServerSettings]);

    const handleToggleGlobal = useCallback((value: boolean) => {
        if (currentServerId) {
            const current = serverSettings[currentServerId] || { hideBadges: false, hiddenBadges: {} };
            onUpdateServerSettings(currentServerId, {
                ...current,
                hideBadges: value,
            });
        }
    }, [currentServerId, serverSettings, onUpdateServerSettings]);

    const handleResetAll = useCallback(() => {
        for (const serverId of Object.keys(serverSettings)) {
            onResetServer(serverId);
        }
    }, [serverSettings, onResetServer]);

    return (
        <div style={CardStyles.container}>
            <div style={CardStyles.header}>
                <div>
                    <h3 style={CardStyles.title}>⚙️ Paramètres par Serveur</h3>
                    <p style={CardStyles.description}>
                        Personnalise les masquages de badges pour chaque serveur
                    </p>
                </div>
            </div>

            {/* Serveur actuel */}
            {currentServerId && (
                <div style={{
                    padding: "12px",
                    backgroundColor: DiscordColors.backgroundTertiary,
                    borderRadius: "6px",
                    marginBottom: "16px",
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                    }}>
                        <div>
                            <h4 style={{
                                color: DiscordColors.textNormal,
                                fontSize: "14px",
                                fontWeight: 600,
                            }}>
                                Serveur actuel: {currentServerId}
                            </h4>
                            <p style={{
                                color: DiscordColors.textMuted,
                                fontSize: "12px",
                            }}>
                                Paramètres appliqués à ce serveur
                            </p>
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "8px",
                        }}>
                            <button
                                style={ButtonStyles.secondary}
                                onClick={() => handleToggleGlobal(false)}
                            >
                                Activer
                            </button>
                            <button
                                style={ButtonStyles.secondary}
                                onClick={() => handleToggleGlobal(true)}
                            >
                                Désactiver
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Recherche */}
            <input
                style={{ ...InputStyles.text, marginBottom: "12px" }}
                placeholder="Rechercher un serveur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Liste des serveurs */}
            <div style={ListStyles.container}>
                {filteredServers.length === 0 ? (
                    <div style={{
                        textAlign: "center",
                        padding: "20px",
                        color: DiscordColors.textMuted,
                    }}>
                        Aucun paramètre par serveur. Ajoute un serveur ci-dessous.
                    </div>
                ) : (
                    filteredServers.map(([serverId, settings]) => (
                        <div
                            key={serverId}
                            style={{
                                ...ListStyles.item,
                                backgroundColor: serverId === currentServerId
                                    ? DiscordColors.backgroundModifierHover
                                    : DiscordColors.backgroundTertiary,
                                border: serverId === currentServerId
                                    ? `1px solid ${DiscordColors.primary}`
                                    : "none",
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    color: DiscordColors.textNormal,
                                    fontSize: "14px",
                                    fontWeight: 600,
                                }}>
                                    {serverId}
                                </div>
                                <div style={{
                                    color: DiscordColors.textMuted,
                                    fontSize: "11px",
                                }}>
                                    Badges masqués: {Object.values(settings.hiddenBadges || {}).filter(h => h).length}
                                    {settings.hideBadges ? " • TOUS masqués" : ""}
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                    style={ButtonStyles.ghost}
                                    onClick={() => onResetServer(serverId)}
                                >
                                    Réinitialiser
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Ajouter un serveur */}
            <div style={{
                display: "flex",
                gap: "8px",
                marginTop: "12px",
            }}>
                <input
                    style={{ ...InputStyles.text, flex: 1 }}
                    placeholder="ID du serveur (ex: 1234567890)"
                    value={newServerId}
                    onChange={(e) => setNewServerId(e.target.value)}
                />
                <button
                    style={ButtonStyles.primary}
                    onClick={handleAddServer}
                    disabled={!newServerId.trim()}
                >
                    Ajouter
                </button>
            </div>

            {/* Actions globales */}
            <div style={{
                display: "flex",
                gap: "8px",
                marginTop: "16px",
                justifyContent: "flex-end",
            }}>
                <button
                    style={ButtonStyles.danger}
                    onClick={handleResetAll}
                >
                    Réinitialiser tout
                </button>
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
                Les paramètres par serveur te permettent de masquer différents badges 
                selon le serveur sur lequel tu te trouves. Parfait pour adapter ton 
                expérience à chaque communauté !
            </div>
        </div>
    );
};

export default ServerSettings;
