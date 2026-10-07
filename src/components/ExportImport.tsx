import React, { useState, useCallback } from "react";
import { CardStyles, ButtonStyles, InputStyles } from "@styles";
import { DiscordColors } from "@styles";
import { ExportData } from "@types";

interface ExportImportProps {
    onExport: () => ExportData;
    onImport: (data: ExportData) => void;
}

const ExportImport: React.FC<ExportImportProps> = ({ onExport, onImport }) => {
    const [importData, setImportData] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleExport = useCallback(() => {
        try {
            const data = onExport();
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `discord-tools-export-${data.timestamp}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            setSuccess("✅ Export réussi ! Le fichier a été téléchargé.");
            setError(null);
            
            setTimeout(() => setSuccess(null), 3000);
        } catch (e) {
            setError("❌ Erreur lors de l'export : " + (e as Error).message);
            setSuccess(null);
        }
    }, [onExport]);

    const handleImport = useCallback(() => {
        try {
            setError(null);
            setSuccess(null);
            
            if (!importData.trim()) {
                setError("❌ Veuillez coller vos données d'export.");
                return;
            }
            
            const data = JSON.parse(importData) as ExportData;
            
            // Validation basique
            if (!data.version || !data.settings || !data.timestamp) {
                setError("❌ Format de données invalide.");
                return;
            }
            
            onImport(data);
            setImportData("");
            setSuccess("✅ Import réussi ! Les paramètres ont été appliqués.");
            
            setTimeout(() => setSuccess(null), 3000);
        } catch (e) {
            setError("❌ Erreur lors de l'import : " + (e as Error).message);
            setSuccess(null);
        }
    }, [importData, onImport]);

    const handlePaste = useCallback(async () => {
        try {
            const text = await navigator.clipboard.readText();
            setImportData(text);
            setError(null);
        } catch (e) {
            setError("❌ Impossible de coller depuis le presse-papiers.");
        }
    }, []);

    const handleCopyExport = useCallback(() => {
        try {
            const data = onExport();
            const json = JSON.stringify(data, null, 2);
            navigator.clipboard.writeText(json);
            setSuccess("✅ Données copiées dans le presse-papiers !");
            setError(null);
            setTimeout(() => setSuccess(null), 3000);
        } catch (e) {
            setError("❌ Impossible de copier dans le presse-papiers.");
        }
    }, [onExport]);

    return (
        <div style={CardStyles.container}>
            <div style={CardStyles.header}>
                <div>
                    <h3 style={CardStyles.title}>💾 Export/Import</h3>
                    <p style={CardStyles.description}>
                        Sauvegarde et restaure tes paramètres
                    </p>
                </div>
            </div>

            {/* Export */}
            <div style={{
                padding: "12px",
                backgroundColor: DiscordColors.backgroundTertiary,
                borderRadius: "6px",
                marginBottom: "16px",
            }}>
                <h4 style={{
                    color: DiscordColors.textNormal,
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "8px",
                }}>
                    Exporter les paramètres
                </h4>
                <p style={{
                    color: DiscordColors.textMuted,
                    fontSize: "12px",
                    marginBottom: "12px",
                }}>
                    Exporte tous tes paramètres (badges, UI, modération, etc.) dans un fichier JSON.
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                        style={ButtonStyles.primary}
                        onClick={handleExport}
                    >
                        📥 Télécharger le fichier
                    </button>
                    <button
                        style={ButtonStyles.secondary}
                        onClick={handleCopyExport}
                    >
                        📋 Copier dans le presse-papiers
                    </button>
                </div>
            </div>

            {/* Import */}
            <div style={{
                padding: "12px",
                backgroundColor: DiscordColors.backgroundTertiary,
                borderRadius: "6px",
                marginBottom: "16px",
            }}>
                <h4 style={{
                    color: DiscordColors.textNormal,
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "8px",
                }}>
                    Importer les paramètres
                </h4>
                <p style={{
                    color: DiscordColors.textMuted,
                    fontSize: "12px",
                    marginBottom: "12px",
                }}>
                    Importe des paramètres depuis un fichier JSON ou depuis le presse-papiers.
                </p>
                <textarea
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    style={{
                        ...InputStyles.text,
                        minHeight: "100px",
                        fontFamily: "monospace",
                        whiteSpace: "pre",
                        marginBottom: "12px",
                    }}
                    placeholder={`{
  "version": "2.0.0",
  "timestamp": 1234567890,
  "settings": {
    "hideAllBadges": false,
    "hiddenBadges": {},
    "badgeCatalog": {},
    ...
  }
}`}
                />
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                        style={ButtonStyles.primary}
                        onClick={handleImport}
                        disabled={!importData.trim()}
                    >
                        📥 Importer
                    </button>
                    <button
                        style={ButtonStyles.secondary}
                        onClick={handlePaste}
                    >
                        📋 Coller depuis le presse-papiers
                    </button>
                    <button
                        style={ButtonStyles.ghost}
                        onClick={() => setImportData("")}
                    >
                        🗑️ Effacer
                    </button>
                </div>
            </div>

            {/* Messages d'erreur/succès */}
            {error && (
                <div style={{
                    padding: "12px",
                    backgroundColor: "rgba(237, 66, 69, 0.1)",
                    border: `1px solid ${DiscordColors.danger}`,
                    borderRadius: "6px",
                    color: DiscordColors.danger,
                    fontSize: "13px",
                }}>
                    {error}
                </div>
            )}
            
            {success && (
                <div style={{
                    padding: "12px",
                    backgroundColor: "rgba(59, 165, 92, 0.1)",
                    border: `1px solid ${DiscordColors.success}`,
                    borderRadius: "6px",
                    color: DiscordColors.success,
                    fontSize: "13px",
                }}>
                    {success}
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
                <strong>💡 Conseils : </strong>
                <ul style={{ margin: "8px 0 0 16px", padding: 0, listStyle: "disc" }}>
                    <li>Exporte tes paramètres avant de réinstaller Discord ou Vencord</li>
                    <li>Partage tes configurations avec tes amis (mais attention aux données sensibles)</li>
                    <li>L'import écrase les paramètres existants, fais une sauvegarde avant</li>
                </ul>
            </div>
        </div>
    );
};

export default ExportImport;
