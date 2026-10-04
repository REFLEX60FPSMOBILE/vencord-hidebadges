/*
 * Vencord userplugin : HideBadgesGUI
 *
 * Masque les badges de profil de ton choix.
 * - Les badges sont détectés automatiquement quand ils s'affichent
 *   (ouvre un profil / une popout et ils apparaissent dans la liste).
 * - Une interface dans les paramètres du plugin permet de choisir
 *   lesquels masquer, avec aperçu de l'icône, recherche, etc.
 *
 * Installation : place le dossier "hideBadgesGUI" dans  src/userplugins/
 * puis  pnpm build  et recharge Discord (Ctrl+R).
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { React, useState } from "@webpack/common";

interface BadgeInfo {
    key: string;
    label: string;
    src: string;
    kind: "discord" | "vencord" | "autre";
}

// ───────────────────────────── Réglages ─────────────────────────────

const settings = definePluginSettings({
    hideAll: {
        type: OptionType.BOOLEAN,
        description: "Masquer TOUS les badges (ignore la liste ci-dessous)",
        default: false,
        onChange: () => scanAll(),
    },
    manager: {
        type: OptionType.COMPONENT,
        component: () => <BadgeManager />,
    },
}).withPrivateSettings<{
    catalog: Record<string, BadgeInfo>;
    hidden: Record<string, boolean>;
}>();

// ─────────────────────── Détection / masquage ───────────────────────

// Images de badges : badges Discord officiels, badges Vencord, et tout
// ce qui se trouve dans un conteneur de badges de profil.
const BADGE_IMG = [
    'img[src*="/badge-icons/"]',
    "img.vc-user-badge",
    '[class*="profileBadge"] img',
    '[class*="badgesContainer"] img',
    '[class*="userBadges"] img',
].join(",");

const CONTAINERS = [
    '[class*="profileBadges"]',
    '[class*="badgesContainer"]',
    '[class*="userBadges"]',
].join(",");

const HIDDEN_ATTR = "data-vc-hidebadge";

function getKey(img: HTMLImageElement): { key: string; kind: BadgeInfo["kind"]; } {
    const src = img.currentSrc || img.src || "";
    const m = src.match(/badge-icons\/([a-zA-Z0-9_-]+)/);
    if (m) return { key: "d:" + m[1], kind: "discord" };

    if (img.classList.contains("vc-user-badge")) {
        const name = img.alt?.trim() || img.getAttribute("aria-label") || src.split("?")[0];
        return { key: "v:" + name, kind: "vencord" };
    }

    return { key: "o:" + src.split("?")[0].slice(-80), kind: "autre" };
}

function getLabel(img: HTMLImageElement, key: string): string {
    const alt = img.alt?.trim();
    if (alt) return alt;
    const aria = img.closest("[aria-label]")?.getAttribute("aria-label")?.trim();
    if (aria) return aria;
    return "Badge " + key.slice(2, 10);
}

// Remonte au "wrapper" du badge (max 2 niveaux) pour masquer aussi
// l'espace occupé, sans jamais masquer tout le conteneur.
function resolveTarget(img: HTMLElement): HTMLElement {
    let t = img;
    for (let i = 0; i < 2; i++) {
        const p = t.parentElement;
        if (!p || p.matches(CONTAINERS) || p.childElementCount > 1) break;
        t = p;
    }
    return t;
}

function setHidden(el: HTMLElement, hide: boolean) {
    if (hide) {
        el.style.setProperty("display", "none", "important");
        el.setAttribute(HIDDEN_ATTR, "1");
    } else if (el.hasAttribute(HIDDEN_ATTR)) {
        el.style.removeProperty("display");
        el.removeAttribute(HIDDEN_ATTR);
    }
}

function processImages(imgs: Iterable<HTMLImageElement>) {
    const catalog = settings.store.catalog ?? {};
    const hidden = settings.store.hidden ?? {};
    const hideAll = settings.store.hideAll;
    const found: Record<string, BadgeInfo> = {};

    for (const img of imgs) {
        if (!img.src) continue;
        const { key, kind } = getKey(img);

        if (!catalog[key] && !found[key]) {
            found[key] = { key, kind, label: getLabel(img, key), src: img.currentSrc || img.src };
        }

        // Si l'image est déjà masquée via son wrapper, on retrouve le wrapper
        setHidden(resolveTarget(img), hideAll || !!hidden[key]);
    }

    if (Object.keys(found).length) {
        settings.store.catalog = { ...catalog, ...found };
    }
}

function scanAll() {
    processImages(document.querySelectorAll<HTMLImageElement>(BADGE_IMG));
    // Les éléments masqués (display:none) restent dans le DOM, donc ils sont
    // bien retrouvés ici et ré-affichés si l'utilisateur change d'avis.
}

// ─────────────────────── Observer du DOM ───────────────────────

let observer: MutationObserver | null = null;
let queue = new Set<Element>();
let scheduled = false;

function flush() {
    scheduled = false;
    const imgs = new Set<HTMLImageElement>();

    for (const el of queue) {
        if (!el.isConnected) continue;
        if (el.matches(BADGE_IMG)) imgs.add(el as HTMLImageElement);
        el.querySelectorAll<HTMLImageElement>(BADGE_IMG).forEach(i => imgs.add(i));
    }
    queue = new Set();

    if (imgs.size) processImages(imgs);
}

function enqueue(el: Element) {
    queue.add(el);
    if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(flush);
    }
}

// ─────────────────────── Interface (GUI) ───────────────────────

const css = {
    wrap: { display: "flex", flexDirection: "column", gap: "10px" } as React.CSSProperties,
    toolbar: { display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" } as React.CSSProperties,
    input: {
        flex: 1, minWidth: "140px", padding: "8px 10px", borderRadius: "4px",
        border: "1px solid var(--background-modifier-accent)",
        background: "var(--input-background, var(--background-secondary))",
        color: "var(--text-normal)",
    } as React.CSSProperties,
    btn: {
        padding: "7px 12px", borderRadius: "4px", border: "none", cursor: "pointer",
        background: "var(--brand-500, #5865f2)", color: "#fff", fontSize: "13px",
    } as React.CSSProperties,
    btnGrey: {
        padding: "7px 12px", borderRadius: "4px", border: "none", cursor: "pointer",
        background: "var(--background-modifier-accent, #4e5058)", color: "var(--text-normal)", fontSize: "13px",
    } as React.CSSProperties,
    list: {
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "8px",
        maxHeight: "380px", overflowY: "auto", paddingRight: "4px",
    } as React.CSSProperties,
    row: (off: boolean): React.CSSProperties => ({
        display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px",
        borderRadius: "6px", cursor: "pointer", userSelect: "none",
        background: "var(--background-secondary)",
        border: "1px solid " + (off ? "var(--status-danger, #ed4245)" : "transparent"),
        opacity: off ? 0.75 : 1,
    }),
    icon: { width: "28px", height: "28px", objectFit: "contain", flexShrink: 0 } as React.CSSProperties,
    label: { flex: 1, minWidth: 0, color: "var(--text-normal)", fontSize: "14px" } as React.CSSProperties,
    sub: { color: "var(--text-muted)", fontSize: "11px" } as React.CSSProperties,
    muted: { color: "var(--text-muted)", fontSize: "13px" } as React.CSSProperties,
};

function BadgeManager() {
    const { catalog, hidden, hideAll } = settings.use(["catalog", "hidden", "hideAll"]);
    const [query, setQuery] = useState("");

    const all = Object.values(catalog ?? {});
    const hiddenMap = hidden ?? {};
    const q = query.trim().toLowerCase();
    const entries = all
        .filter(b => !q || b.label.toLowerCase().includes(q) || b.kind.includes(q))
        .sort((a, b) => a.kind.localeCompare(b.kind) || a.label.localeCompare(b.label));

    const update = (next: Record<string, boolean>) => {
        settings.store.hidden = next;
        scanAll();
    };

    const toggle = (key: string) => update({ ...hiddenMap, [key]: !hiddenMap[key] });

    const setAll = (value: boolean) => {
        const next: Record<string, boolean> = {};
        for (const b of all) next[b.key] = value;
        update(next);
    };

    const forget = () => {
        settings.store.catalog = {};
        settings.store.hidden = {};
        scanAll();
    };

    return (
        <div style={css.wrap}>
            <div style={css.muted}>
                Coche les badges à <b>masquer</b>. Les badges apparaissent ici dès que tu les vois
                (ouvre ton profil ou celui de quelqu'un). {all.length} badge(s) détecté(s)
                {hideAll ? " — « Masquer TOUS » est activé, la liste est ignorée." : "."}
            </div>

            <div style={css.toolbar}>
                <input
                    style={css.input}
                    placeholder="Rechercher un badge…"
                    value={query}
                    onChange={e => setQuery(e.currentTarget.value)}
                />
                <button style={css.btn} onClick={() => setAll(true)}>Tout masquer</button>
                <button style={css.btnGrey} onClick={() => setAll(false)}>Tout afficher</button>
                <button style={css.btnGrey} onClick={scanAll}>Scanner</button>
                <button style={css.btnGrey} onClick={forget}>Réinitialiser</button>
            </div>

            {entries.length === 0 ? (
                <div style={css.muted}>
                    Aucun badge pour l'instant. Ouvre un profil utilisateur puis reviens ici.
                </div>
            ) : (
                <div style={css.list}>
                    {entries.map(b => {
                        const off = !!hiddenMap[b.key];
                        return (
                            <div key={b.key} style={css.row(off)} onClick={() => toggle(b.key)}>
                                <img src={b.src} alt="" style={css.icon} />
                                <div style={css.label}>
                                    <div>{b.label}</div>
                                    <div style={css.sub}>{b.kind}{off ? " · masqué" : ""}</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={off}
                                    onChange={() => toggle(b.key)}
                                    onClick={e => e.stopPropagation()}
                                    style={{ width: "18px", height: "18px", accentColor: "var(--status-danger, #ed4245)" }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ───────────────────────────── Plugin ─────────────────────────────

export default definePlugin({
    name: "HideBadgesGUI",
    description: "Masque les badges de profil de ton choix, avec une interface pour sélectionner chaque badge.",
    authors: [{ name: "Moi", id: 0n }],
    settings,

    start() {
        scanAll();

        observer = new MutationObserver(mutations => {
            for (const m of mutations) {
                if (m.type === "attributes") {
                    enqueue(m.target as Element);
                } else {
                    m.addedNodes.forEach(n => {
                        if (n.nodeType === 1) enqueue(n as Element);
                    });
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["src"],
        });
    },

    stop() {
        observer?.disconnect();
        observer = null;
        queue = new Set();

        document.querySelectorAll<HTMLElement>(`[${HIDDEN_ATTR}]`).forEach(el => setHidden(el, false));
    },
});
