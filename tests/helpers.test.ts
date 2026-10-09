import { describe, it, expect, beforeEach } from 'vitest';
import { 
  generateBadgeKey, 
  getBadgeLabel, 
  debounce, 
  throttle,
  deepClone,
  generateId
} from '../src/utils/helpers';

describe('Badge Utility Functions', () => {
  let testImg: HTMLImageElement;

  beforeEach(() => {
    testImg = document.createElement('img');
  });

  describe('generateBadgeKey', () => {
    it('should generate Discord badge key from badge-icons URL', () => {
      testImg.src = 'https://cdn.discordapp.com/badge-icons/hypesquad_house_1.png';
      const { key, kind } = generateBadgeKey(testImg);
      expect(key).toBe('d:hypesquad_house_1');
      expect(kind).toBe('discord');
    });

    it('should generate Vencord badge key for vc-user-badge class', () => {
      testImg.classList.add('vc-user-badge');
      testImg.alt = 'Vencord Contributor';
      const { key, kind } = generateBadgeKey(testImg);
      expect(key).toBe('v:Vencord Contributor');
      expect(kind).toBe('vencord');
    });

    it('should generate custom badge key from alt text', () => {
      testImg.alt = 'Custom Badge Name';
      testImg.src = 'https://example.com/custom.png';
      const { key, kind } = generateBadgeKey(testImg);
      expect(key).toBe('c:Custom Badge Name');
      expect(kind).toBe('custom');
    });

    it('should handle missing alt and aria-label', () => {
      testImg.src = 'https://example.com/unknown-badge.png';
      const { key, kind } = generateBadgeKey(testImg);
      expect(key).toMatch(/^o:/);
      expect(kind).toBe('other');
    });
  });

  describe('getBadgeLabel', () => {
    it('should prefer alt text when available', () => {
      testImg.alt = 'Alt Text Label';
      testImg.title = 'Title Label';
      const label = getBadgeLabel(testImg, 'd:test');
      expect(label).toBe('Alt Text Label');
    });

    it('should use title when alt is missing', () => {
      testImg.title = 'Title Label';
      const label = getBadgeLabel(testImg, 'd:test');
      expect(label).toBe('Title Label');
    });

    it('should fall back to key-based label', () => {
      const label = getBadgeLabel(testImg, 'd:hypesquad_1');
      expect(label).toBe('Badge hypesquad');
    });
  });
});

describe('Timing Utilities', () => {
  describe('debounce', () => {
    it('should delay function execution', async () => {
      let counter = 0;
      const increment = () => counter++;
      const debounced = debounce(increment, 50);

      debounced();
      debounced();
      debounced();
      
      expect(counter).toBe(0); // Not called yet
      
      await new Promise(resolve => setTimeout(resolve, 60));
      expect(counter).toBe(1); // Called once after delay
    });
  });

  describe('throttle', () => {
    it('should limit function calls', async () => {
      let counter = 0;
      const increment = () => counter++;
      const throttled = throttle(increment, 50);

      throttled(); // Called immediately
      throttled(); // Throttled
      throttled(); // Throttled
      
      expect(counter).toBe(1);
      
      await new Promise(resolve => setTimeout(resolve, 60));
      throttled(); // Can call again
      expect(counter).toBe(2);
    });
  });
});

describe('Utility Functions', () => {
  describe('deepClone', () => {
    it('should clone objects deeply', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
    });

    it('should handle arrays', () => {
      const original = [1, 2, { a: 3 }];
      const cloned = deepClone(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('should return same value for non-cloneable types', () => {
      const fn = () => 42;
      const cloned = deepClone(fn);
      expect(cloned).toBe(fn);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });

    it('should generate IDs without spaces or special chars', () => {
      const id = generateId();
      expect(id).toMatch(/^[a-z0-9]+$/);
    });
  });
});
