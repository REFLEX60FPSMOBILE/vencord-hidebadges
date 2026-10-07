import { BadgeInfo, BADGE_CATEGORIES } from "@types";
import { BADGE_SELECTORS, CUSTOM_ATTRS } from "./constants";

// Génère une clé unique pour un badge
export function generateBadgeKey(img: HTMLImageElement): { key: string; kind: string } {
    const src = img.currentSrc || img.src || "";
    
    // Badges Discord officiels
    const discordMatch = src.match(/badge-icons\/([a-zA-Z0-9_-]+)/);
    if (discordMatch) {
        return { key: `d:${discordMatch[1]}`, kind: BADGE_CATEGORIES.DISCORD };
    }
    
    // Badges Vencord
    if (img.classList.contains("vc-user-badge")) {
        const name = img.alt?.trim() || img.getAttribute("aria-label") || src.split("?")[0];
        return { key: `v:${name}`, kind: BADGE_CATEGORIES.VENCORD };
    }
    
    // Badges personnalisés ou autres
    const customName = img.alt?.trim() || img.getAttribute("aria-label") || "";
    if (customName) {
        return { key: `c:${customName}`, kind: BADGE_CATEGORIES.CUSTOM };
    }
    
    return { key: `o:${src.split("?")[0].slice(-80)}`, kind: BADGE_CATEGORIES.OTHER };
}

// Récupère le label d'un badge
export function getBadgeLabel(img: HTMLImageElement, key: string): string {
    const alt = img.alt?.trim();
    if (alt) return alt;
    
    const aria = img.closest("[aria-label]")?.getAttribute("aria-label")?.trim();
    if (aria) return aria;
    
    const title = img.title?.trim();
    if (title) return title;
    
    return `Badge ${key.slice(2, 10)}`;
}

// Remonte au wrapper du badge
export function resolveBadgeTarget(img: HTMLElement): HTMLElement {
    let target = img;
    for (let i = 0; i < 3; i++) {
        const parent = target.parentElement;
        if (!parent || parent.matches(BADGE_SELECTORS.CONTAINERS) || parent.childElementCount > 1) break;
        target = parent;
    }
    return target;
}

// Masque ou affiche un élément
export function setElementHidden(el: HTMLElement, hide: boolean, attr: string = CUSTOM_ATTRS.HIDDEN) {
    if (hide) {
        el.style.setProperty("display", "none", "important");
        el.setAttribute(attr, "1");
    } else if (el.hasAttribute(attr)) {
        el.style.removeProperty("display");
        el.removeAttribute(attr);
    }
}

// Vérifie si un élément est masqué
export function isElementHidden(el: HTMLElement, attr: string = CUSTOM_ATTRS.HIDDEN): boolean {
    return el.hasAttribute(attr);
}

// Formate une date pour l'affichage
export function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Génère un ID unique
export function generateId(prefix: string = ""): string {
    return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Debounce une fonction
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

// Throttle une fonction
export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void {
    let inThrottle = false;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Copie un objet profondément
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

// Fusionne des objets profondément
export function deepMerge<T extends object, U extends object>(target: T, source: U): T & U {
    const output = { ...target };
    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            output[key] = deepMerge(target[key], source[key]);
        } else {
            output[key] = source[key];
        }
    }
    return output as T & U;
}

// Vérifie si un élément est dans le viewport
export function isInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Attend qu'un sélecteur soit disponible dans le DOM
export function waitForSelector(selector: string, timeout: number = 5000): Promise<HTMLElement | null> {
    return new Promise((resolve) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (element) {
            resolve(element);
            return;
        }
        
        const observer = new MutationObserver(() => {
            const el = document.querySelector<HTMLElement>(selector);
            if (el) {
                observer.disconnect();
                resolve(el);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
        
        setTimeout(() => {
            observer.disconnect();
            resolve(null);
        }, timeout);
    });
}
