import React, { useState, useCallback } from "react";
import { UICustomization, UITheme, PRESET_THEMES } from "@types";
import { CardStyles, InputStyles, ButtonStyles, SwitchStyles } from "@styles";
import { DiscordColors } from "@styles";

interface UICustomizationProps {
    settings: UICustomization;
    onUpdate: (updates: Partial<UICustomization>) => void;
}

const UICustomizationPanel: React.FC<UICustomizationProps> = ({ settings, onUpdate }) => {
    const [customTheme, setCustomTheme] = useState<Partial<UITheme>>({
        colors: { ...settings.theme?.colors },
    });
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleThemeSelect = useCallback((theme: UITheme) => {
        onUpdate({ theme });
    }, [onUpdate]);

    const handleCustomColorChange = useCallback((color: string, value: string) => {
        setCustomTheme((prev) => ({
            ...prev,
            colors: {
                ...prev.colors,
                [color]: value,
            },
        }));
    }, []);

    const handleApplyCustomTheme = useCallback(() => {
        onUpdate({
            theme: {
                id: "custom",
                name: "Personnalisé",
                colors: customTheme.colors as UITheme["colors"],
            },
        });
    }, [onUpdate, customTheme]);

    const handleToggle = useCallback((key: keyof UICustomization) => {
        onUpdate({ [key]: !settings[key] } as Partial<UICustomization>);
    }, [settings, onUpdate]);

    return (
        <div style={CardStyles.container}>
            <div style={CardStyles.header}>
                <div>
                    <h3 style={CardStyles.title}>Personnalisation UI</h3>
                    <p style={CardStyles.description}>
                        Personnalise l'apparence de Discord
                    </p>
                </div>
                <button
                    style={ButtonStyles.ghost}
                    onClick={() => setShowAdvanced(!showAdvanced)}
                >
                    {showAdvanced ? "Masquer" : "Avancé"}
                </button>
            </div>

            {/* Thèmes prédéfinis */}
            <div style={{ marginBottom: "16px" }}>
                <h4 style={{ 
                    color: DiscordColors.textNormal, 
                    fontSize: "14px", 
                    fontWeight: 600, 
                    marginBottom: "8px"
                }}>
                    Thèmes prédéfinis
                </h4>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {PRESET_THEMES.map((theme) => (
                        <button
                            key={theme.id}
                            style={{
                                ...ButtonStyles.secondary,
                                padding: "6px 12px",
                                fontSize: "12px",
                                border: settings.theme?.id === theme.id 
                                    ? `2px solid ${DiscordColors.primary}`
                                    : "none",
                            }}
                            onClick={() => handleThemeSelect(theme)}
                        >
                            {theme.name}
                        </button>
                    ))}
                </div>
            </div>

            {showAdvanced && (
                <>
                    {/* Thème personnalisé */}
                    <div style={{ marginBottom: "16px" }}>
                        <h4 style={{ 
                            color: DiscordColors.textNormal, 
                            fontSize: "14px", 
                            fontWeight: 600, 
                            marginBottom: "8px"
                        }}>
                            Thème personnalisé
                        </h4>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                            {Object.entries(customTheme.colors || {}).map(([color, value]) => (
                                <div key={color} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <label style={{ 
                                        fontSize: "11px", 
                                        color: DiscordColors.textMuted,
                                        textTransform: "uppercase"
                                    }}>
                                        {color}
                                    </label>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                        <input
                                            type="color"
                                            value={value}
                                            onChange={(e) => handleCustomColorChange(color, e.target.value)}
                                            style={{ width: "40px", height: "30px", border: "none", cursor: "pointer" }}
                                        />
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleCustomColorChange(color, e.target.value)}
                                            style={{ ...InputStyles.text, flex: 1 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            style={{ ...ButtonStyles.primary, marginTop: "8px" }}
                            onClick={handleApplyCustomTheme}
                        >
                            Appliquer le thème
                        </button>
                    </div>

                    <div style={{ margin: "16px 0" }} />

                    {/* Options UI */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={SwitchStyles.container} onClick={() => handleToggle("hideMessageTimestamps")}>
                            <div style={SwitchStyles.track}>
                                <div style={{
                                    ...SwitchStyles.thumb,
                                    ...(settings.hideMessageTimestamps ? SwitchStyles.thumbChecked : {}),
                                }} />
                            </div>
                            <div>
                                <div style={SwitchStyles.label}>Masquer les timestamps des messages</div>
                                <div style={SwitchStyles.description}>
                                    Cache l'heure d'envoi des messages
                                </div>
                            </div>
                        </div>

                        <div style={SwitchStyles.container} onClick={() => handleToggle("hideUserAvatars")}>
                            <div style={SwitchStyles.track}>
                                <div style={{
                                    ...SwitchStyles.thumb,
                                    ...(settings.hideUserAvatars ? SwitchStyles.thumbChecked : {}),
                                }} />
                            </div>
                            <div>
                                <div style={SwitchStyles.label}>Masquer les avatars</div>
                                <div style={SwitchStyles.description}>
                                    Cache les avatars des utilisateurs dans les messages
                                </div>
                            </div>
                        </div>

                        <div style={SwitchStyles.container} onClick={() => handleToggle("compactMode")}>
                            <div style={SwitchStyles.track}>
                                <div style={{
                                    ...SwitchStyles.thumb,
                                    ...(settings.compactMode ? SwitchStyles.thumbChecked : {}),
                                }} />
                            </div>
                            <div>
                                <div style={SwitchStyles.label}>Mode compact</div>
                                <div style={SwitchStyles.description}>
                                    Réduit l'espacement entre les messages
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CSS personnalisé */}
                    <div style={{ marginTop: "16px" }}>
                        <h4 style={{ 
                            color: DiscordColors.textNormal, 
                            fontSize: "14px", 
                            fontWeight: 600, 
                            marginBottom: "8px"
                        }}>
                            CSS Personnalisé
                        </h4>
                        <textarea
                            value={settings.customCSS || ""}
                            onChange={(e) => onUpdate({ customCSS: e.target.value })}
                            style={{
                                ...InputStyles.text,
                                minHeight: "100px",
                                fontFamily: "monospace",
                                whiteSpace: "pre",
                            }}
                            placeholder={`/* Exemple: */
/* Masquer les réactions */
.reaction { display: none !important; }

/* Changer la couleur des messages */
.message { background: rgba(255, 0, 0, 0.1) !important; }`}
                        />
                    </div>
                </>
            )}

            {/* Actions */}
            <div style={{ 
                display: "flex", 
                gap: "8px", 
                justifyContent: "flex-end",
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: `1px solid ${DiscordColors.border}`
            }}>
                <button
                    style={ButtonStyles.secondary}
                    onClick={() => onUpdate({
                        theme: PRESET_THEMES[0],
                        hideMessageTimestamps: false,
                        hideUserAvatars: false,
                        compactMode: false,
                        customCSS: "",
                    })}
                >
                    Réinitialiser
                </button>
            </div>
        </div>
    );
};

export default UICustomizationPanel;
